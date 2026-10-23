export type AppRole = 'user' | 'editor' | 'admin';
export type PostStatus = 'draft' | 'published' | 'archived';

export type Profile = {
  id: string;
  display_name: string | null;
  role: AppRole;
  created_at: string;
  updated_at: string;
};

export type CmsPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  status: PostStatus;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type CmsCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};
