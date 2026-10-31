-- WordPress migration provenance fields. Safe to apply after the initial CMS migration.
alter table public.posts add column if not exists wordpress_post_id text;
alter table public.posts add column if not exists wordpress_source_url text;
alter table public.posts add column if not exists wordpress_modified_at timestamptz;
alter table public.posts add column if not exists migration_content_sha256 text;

create unique index if not exists posts_wordpress_post_id_unique
  on public.posts (wordpress_post_id)
  where wordpress_post_id is not null;

create index if not exists posts_wordpress_source_url_idx
  on public.posts (wordpress_source_url)
  where wordpress_source_url is not null;

comment on column public.posts.wordpress_post_id is 'Original WordPress post ID, retained for migration reconciliation.';
comment on column public.posts.wordpress_source_url is 'Original WordPress URL captured at import time.';
comment on column public.posts.wordpress_modified_at is 'Original WordPress modified timestamp captured at import time.';
comment on column public.posts.migration_content_sha256 is 'SHA-256 of the original WordPress body captured during export.';
