import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth/current-profile';
import { createCategoryAction, deleteCategoryAction } from '../actions/management';
import type { CmsCategory } from '@/lib/supabase/database.types';

export const metadata = { title: 'Categories | Kurarin CMS', robots: { index: false, follow: false } };

type CategoriesPageProps = { searchParams: Promise<{ error?: string; created?: string; deleted?: string }> };

function CategoriesLoading() {
  return <main className="cms-shell"><div className="cms-content"><p className="cms-kicker">CONTENT / TAXONOMY</p><h1>Loading categories…</h1></div></main>;
}

export default function CategoriesPage(props: CategoriesPageProps) {
  // With cacheComponents enabled, request-time auth/database work must be
  // below a Suspense boundary rather than executed during route prerendering.
  return <Suspense fallback={<CategoriesLoading />}><CategoriesContent searchParams={props.searchParams} /></Suspense>;
}

async function CategoriesContent({ searchParams }: CategoriesPageProps) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const profile = await getCurrentProfile();
  if (!profile || !['admin', 'editor'].includes(profile.role)) redirect('/admin/login?error=unauthorized');
  const [{ data }, params] = await Promise.all([
    supabase.from('categories').select('*').order('name'),
    searchParams,
  ]);
  const categories = (data ?? []) as CmsCategory[];
  const { error, created, deleted } = params;
  return <main className="cms-shell"><header className="cms-topbar"><Link className="cms-brand" href="/">KURARIN <span>SOLUTIONS</span></Link><nav className="cms-user"><Link className="cms-outline-button" href="/admin">Dashboard</Link><Link className="cms-outline-button" href="/admin/media">Media</Link><Link className="cms-outline-button" href="/admin/enquiries">Enquiries</Link></nav></header>
    <div className="cms-content"><p className="cms-kicker">CONTENT / TAXONOMY</p><div className="cms-heading-row"><div><h1>Categories</h1><p className="cms-muted">Organise articles so readers can browse related topics.</p></div><Link className="cms-outline-button" href="/admin">← Dashboard</Link></div>
      {created && <p className="cms-success" role="status">Category created.</p>}{deleted && <p className="cms-success" role="status">Category deleted.</p>}
      {error && <p className="cms-alert" role="alert">{error === 'duplicate' ? 'A category with that name or slug already exists.' : error === 'validation' ? 'Enter a category name and valid slug.' : error === 'delete-failed' ? 'Category could not be deleted. Check whether it is in use.' : 'The category action could not be completed.'}</p>}
      <div className="cms-grid"><section className="cms-panel"><div className="cms-panel-heading"><div><p className="cms-kicker">AVAILABLE TOPICS</p><h2>{categories.length} categories</h2></div></div>
        {categories.length ? categories.map((category) => <article className="cms-category-row" key={category.id}><div><strong>{category.name}</strong><span>/{category.slug}/</span>{category.description && <p>{category.description}</p>}</div>{profile.role === 'admin' && <form action={deleteCategoryAction}><input type="hidden" name="id" value={category.id} /><button className="cms-quiet-button" type="submit">Delete</button></form>}</article>) : <p className="cms-empty">No categories yet.</p>}
        {profile.role !== 'admin' && <p className="cms-small-note">Only administrators can delete categories.</p>}
      </section>
      <section className="cms-panel"><p className="cms-kicker">NEW CATEGORY</p><h2>Add a topic</h2><form action={createCategoryAction} className="cms-form"><label>Name<input name="name" required minLength={2} maxLength={80} placeholder="Web Development & Design" /></label><label>Slug (optional)<input name="slug" maxLength={90} placeholder="web-development-design" /></label><label>Description<textarea name="description" rows={3} maxLength={300} placeholder="What belongs in this category?" /></label><button className="cms-primary-button" type="submit">Create category <span aria-hidden="true">↗</span></button></form></section></div>
    </div></main>;
}
