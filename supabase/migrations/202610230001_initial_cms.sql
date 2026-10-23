-- Kurarin Solutions CMS foundation
-- Run in Supabase SQL Editor or with `supabase db push` after linking the project.
create extension if not exists pgcrypto;

do $$ begin
  create type public.app_role as enum ('user', 'editor', 'admin');
exception when duplicate_object then null; end $$;
do $$ begin
  create type public.post_status as enum ('draft', 'published', 'archived');
exception when duplicate_object then null; end $$;

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role public.app_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)), 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null default '',
  featured_image_url text,
  status public.post_status not null default 'draft',
  seo_title text,
  seo_description text,
  canonical_url text,
  author_id uuid references public.profiles(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists posts_status_published_at_idx on public.posts(status, published_at desc);
create index if not exists posts_author_id_idx on public.posts(author_id);

create table if not exists public.post_categories (
  post_id uuid not null references public.posts(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  primary key (post_id, category_id)
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  public_url text,
  alt_text text not null default '',
  caption text,
  mime_type text,
  file_size_bytes bigint check (file_size_bytes is null or file_size_bytes >= 0),
  uploaded_by uuid references public.profiles(id) on delete set null,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  description text,
  is_public boolean not null default false,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'resolved', 'spam')),
  created_at timestamptz not null default now()
);
create index if not exists contact_submissions_status_created_idx on public.contact_submissions(status, created_at desc);

create table if not exists public.cms_audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Helpers are SECURITY DEFINER to avoid recursive RLS lookups on profiles.
create or replace function public.current_app_role()
returns public.app_role language sql stable security definer set search_path = '' as $$
  select role from public.profiles where id = (select auth.uid())
$$;
create or replace function public.is_editor_or_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce(public.current_app_role() in ('editor'::public.app_role, 'admin'::public.app_role), false)
$$;
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce(public.current_app_role() = 'admin'::public.app_role, false)
$$;
revoke all on function public.current_app_role() from public;
revoke all on function public.is_editor_or_admin() from public;
revoke all on function public.is_admin() from public;
grant execute on function public.current_app_role() to authenticated;
grant execute on function public.is_editor_or_admin() to authenticated;
grant execute on function public.is_admin() to authenticated;

-- Keep updated_at consistent.
do $$ declare t text; begin
  foreach t in array array['profiles','categories','posts','site_settings'] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute procedure public.set_updated_at()', t);
  end loop;
end $$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.post_categories enable row level security;
alter table public.media_assets enable row level security;
alter table public.site_settings enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.cms_audit_log enable row level security;

-- Profiles: users may read/update their own non-role fields; only admins can manage roles.
drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile" on public.profiles for select to authenticated using (id = (select auth.uid()) or public.is_editor_or_admin());
drop policy if exists "Users update own profile fields" on public.profiles;
create policy "Users update own profile fields" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()) and role = (select public.current_app_role()));
drop policy if exists "Admins manage profiles" on public.profiles;
create policy "Admins manage profiles" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Public visitors can only see published posts; authenticated editors/admins manage content.
drop policy if exists "Anyone reads published posts" on public.posts;
create policy "Anyone reads published posts" on public.posts for select to anon, authenticated using (status = 'published' or public.is_editor_or_admin());
drop policy if exists "Editors create posts" on public.posts;
create policy "Editors create posts" on public.posts for insert to authenticated with check (public.is_editor_or_admin() and (author_id is null or author_id = (select auth.uid())));
drop policy if exists "Editors update posts" on public.posts;
create policy "Editors update posts" on public.posts for update to authenticated using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());
drop policy if exists "Editors delete posts" on public.posts;
create policy "Editors delete posts" on public.posts for delete to authenticated using (public.is_editor_or_admin());

drop policy if exists "Public reads categories" on public.categories;
create policy "Public reads categories" on public.categories for select to anon, authenticated using (true);
drop policy if exists "Editors manage categories" on public.categories;
create policy "Editors manage categories" on public.categories for all to authenticated using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());

drop policy if exists "Public reads published post categories" on public.post_categories;
create policy "Public reads published post categories" on public.post_categories for select to anon, authenticated using (exists (select 1 from public.posts p where p.id = post_id and p.status = 'published') or public.is_editor_or_admin());
drop policy if exists "Editors manage post categories" on public.post_categories;
create policy "Editors manage post categories" on public.post_categories for all to authenticated using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());

drop policy if exists "Public reads public media" on public.media_assets;
create policy "Public reads public media" on public.media_assets for select to anon, authenticated using (is_public or public.is_editor_or_admin());
drop policy if exists "Editors manage media" on public.media_assets;
create policy "Editors manage media" on public.media_assets for all to authenticated using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());

drop policy if exists "Public reads public site settings" on public.site_settings;
create policy "Public reads public site settings" on public.site_settings for select to anon, authenticated using (is_public or public.is_admin());
drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Contact form submissions can be inserted by visitors but never publicly read.
drop policy if exists "Visitors submit contact messages" on public.contact_submissions;
create policy "Visitors submit contact messages" on public.contact_submissions for insert to anon, authenticated with check (length(trim(name)) between 2 and 120 and length(trim(email)) between 5 and 254 and length(trim(message)) between 10 and 5000);
drop policy if exists "Editors read contact submissions" on public.contact_submissions;
create policy "Editors read contact submissions" on public.contact_submissions for select to authenticated using (public.is_editor_or_admin());
drop policy if exists "Editors update contact submissions" on public.contact_submissions;
create policy "Editors update contact submissions" on public.contact_submissions for update to authenticated using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());

drop policy if exists "Admins read audit log" on public.cms_audit_log;
create policy "Admins read audit log" on public.cms_audit_log for select to authenticated using (public.is_admin());
drop policy if exists "Editors append audit log" on public.cms_audit_log;
create policy "Editors append audit log" on public.cms_audit_log for insert to authenticated with check (public.is_editor_or_admin() and actor_id = (select auth.uid()));

-- A starter category set. Safe to re-run.
insert into public.categories (name, slug, description) values
 ('Business & Technology', 'business-technology', 'Technology insights for growing businesses.'),
 ('Web Development & Design', 'web-development-design', 'Websites, design, accessibility and performance.'),
 ('IT Services', 'it-services', 'IT operations, support and infrastructure.'),
 ('Technology', 'technology', 'Practical updates on emerging technology.'),
 ('Digital & AI', 'digital-ai', 'Digital transformation, data and artificial intelligence.')
on conflict (slug) do nothing;

-- IMPORTANT: first authenticated account defaults to role=user. Promote the chosen owner manually
-- in the Supabase SQL Editor after signing up, e.g.:
-- update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'YOUR_OWNER_EMAIL');
