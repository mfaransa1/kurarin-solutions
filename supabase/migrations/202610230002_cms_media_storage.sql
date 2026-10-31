-- Run after 202610230001_initial_cms.sql.
-- Public read is intentional because the public blog needs to display published media.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cms-media', 'cms-media', true, 5242880, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "CMS editors upload media" on storage.objects;
create policy "CMS editors upload media"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'cms-media'
  and (select public.is_editor_or_admin())
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "CMS editors update own media" on storage.objects;
create policy "CMS editors update own media"
on storage.objects for update to authenticated
using (
  bucket_id = 'cms-media'
  and (select public.is_editor_or_admin())
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'cms-media'
  and (select public.is_editor_or_admin())
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "CMS editors delete own media" on storage.objects;
create policy "CMS editors delete own media"
on storage.objects for delete to authenticated
using (
  bucket_id = 'cms-media'
  and (select public.is_editor_or_admin())
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Public reads CMS media" on storage.objects;
create policy "Public reads CMS media"
on storage.objects for select to anon, authenticated
using (bucket_id = 'cms-media');
