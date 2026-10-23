import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  blogPosts as legacyPosts,
  type BlogPost,
} from "@/config/blog";

type RelatedCategory = { name: string; slug: string };
type RelatedPostCategory = { categories: RelatedCategory | RelatedCategory[] | null };
type SupabasePost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  status: "draft" | "published" | "archived";
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  published_at: string | null;
  created_at: string;
  post_categories?: RelatedPostCategory[] | null;
};

function dateOnly(value: string | null | undefined): string {
  const candidate = value || new Date().toISOString();
  return candidate.slice(0, 10);
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function normalizePost(row: SupabasePost): BlogPost & { id: string; content: string; seoTitle?: string; seoDescription?: string; canonicalUrl?: string } {
  const linkedCategories = (row.post_categories ?? [])
    .flatMap((item) => item.categories ? (Array.isArray(item.categories) ? item.categories : [item.categories]) : []);
  const firstCategory = linkedCategories[0];
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    category: firstCategory?.name || "Technology",
    date: dateOnly(row.published_at || row.created_at),
    readMinutes: readingTime(row.content || row.excerpt || ""),
    image: row.featured_image_url || "/images/blog/blog-default.jpg",
    featured: false,
    status: "published",
    sourceUrl: undefined,
    content: row.content || "",
    seoTitle: row.seo_title || undefined,
    seoDescription: row.seo_description || undefined,
    canonicalUrl: row.canonical_url || undefined,
  };
}

/**
 * Public content adapter. Supabase's public RLS policy only exposes published
 * posts to anonymous visitors. Legacy archive metadata remains visible until
 * each original WordPress article has been migrated and editorially reviewed.
 */
export async function getPublicBlogPosts(): Promise<BlogPost[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return legacyPosts;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("posts")
      .select(`
        id,title,slug,excerpt,content,featured_image_url,status,
        seo_title,seo_description,canonical_url,published_at,created_at,
        post_categories(categories(name,slug))
      `)
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("[blog] Supabase read failed; using legacy archive inventory.", error?.message);
      return legacyPosts;
    }

    const published = (data as unknown as SupabasePost[]).map(normalizePost);
    const publishedSlugs = new Set(published.map((post) => post.slug));
    const remainingLegacy = legacyPosts.filter((post) => !publishedSlugs.has(post.slug));
    return [...published, ...remainingLegacy];
  } catch (error) {
    console.error("[blog] Supabase is unavailable; using legacy archive inventory.", error);
    return legacyPosts;
  }
}

export async function getPublicBlogPostBySlug(slug: string) {
  const posts = await getPublicBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
