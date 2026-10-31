import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth/current-profile';
import { updatePostAction } from '../../actions/management';
import type { CmsPost, CmsCategory } from '@/lib/supabase/database.types';

export const metadata = { title: 'Edit article | Kurarin CMS', robots: { index: false, follow: false } };

import { Suspense } from 'react';

export default function EditPostPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string; error?: string }> }) {
  return (
    <Suspense fallback={<main className="cms-shell"><div className="cms-content"><p className="cms-kicker">CONTENT / EDITOR</p><h1>Loading article editor…</h1></div></main>}>
      <EditPostContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function EditPostContent({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string; error?: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const profile = await getCurrentProfile();
  if (!profile || !['admin', 'editor'].includes(profile.role)) redirect('/admin/login?error=unauthorized');
  const [{ data: postData }, { data: categoryData }, paramsData, { data: linkData }] = await Promise.all([
    supabase.from('posts').select('*').eq('id', id).maybeSingle(),
    supabase.from('categories').select('*').order('name'),
    searchParams,
    supabase.from('post_categories').select('category_id').eq('post_id', id).limit(1).maybeSingle(),
  ]);
  if (!postData) notFound();
  const post = postData as CmsPost;
  const categories = (categoryData ?? []) as CmsCategory[];
  const selectedCategory = linkData?.category_id ?? '';
  const { saved, error } = paramsData;

  return <main className="cms-shell"><header className="cms-topbar"><Link className="cms-brand" href="/">KURARIN <span>SOLUTIONS</span></Link><nav className="cms-user"><Link className="cms-outline-button" href="/admin">Dashboard</Link><Link className="cms-outline-button" href="/admin/categories">Categories</Link><Link className="cms-outline-button" href="/admin/media">Media</Link></nav></header>
    <div className="cms-content"><p className="cms-kicker">CONTENT / EDITOR</p><div className="cms-heading-row"><div><h1>Edit article</h1><p className="cms-muted">Edit content, assign a category, and manage search metadata.</p></div><Link className="cms-outline-button" href="/admin">← Dashboard</Link></div>
      {saved && <p className="cms-success" role="status">Changes saved successfully.</p>}
      {error && <p className="cms-alert" role="alert">{error === 'slug-exists' ? 'That URL slug is already used by another article.' : error === 'validation' ? 'Check the title, slug, content, status, image URL, and canonical URL fields.' : error === 'category-save-failed' ? 'The article was saved but category assignment failed. Please retry the category selection.' : 'The article could not be saved. Check your database and try again.'}</p>}
      <section className="cms-panel cms-editor-panel"><form action={updatePostAction} className="cms-form cms-editor-form">
        <input type="hidden" name="id" value={post.id} />
        <div className="cms-editor-two"><label>Article title<input name="title" required minLength={3} maxLength={180} defaultValue={post.title} /></label><label>URL slug<input name="slug" required defaultValue={post.slug} maxLength={120} /></label></div>
        <label>Excerpt<textarea name="excerpt" rows={3} maxLength={320} defaultValue={post.excerpt ?? ''} /></label>
        <label>Article content<textarea name="content" rows={16} required defaultValue={post.content} /></label>
        <div className="cms-editor-two"><label>Category<select name="category_id" defaultValue={selectedCategory}><option value="">No category</option>{categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}</select><small>One primary category is supported by this editor for now.</small></label><label>Publication status<select name="status" defaultValue={post.status}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label></div>
        <div className="cms-editor-two"><label>Featured image URL<input name="featured_image_url" type="url" placeholder="https://…" defaultValue={post.featured_image_url ?? ''} /><small>Upload an image in Media, then copy its public URL here.</small></label><label>Canonical URL<input name="canonical_url" type="url" placeholder="https://…" defaultValue={post.canonical_url ?? ''} /></label></div>
        <div className="cms-editor-two"><label>SEO title<input name="seo_title" maxLength={180} defaultValue={post.seo_title ?? ''} /></label><label>SEO description<textarea name="seo_description" rows={3} maxLength={320} defaultValue={post.seo_description ?? ''} /></label></div>
        <button className="cms-primary-button" type="submit">Save article <span aria-hidden="true">↗</span></button>
      </form></section>
    </div>
  </main>;
}
