import Link from 'next/link';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth/current-profile';
import { createDraftAction, publishPostAction } from './actions/posts';
import { signOutAction } from './actions/auth';
import type { CmsPost } from '@/lib/supabase/database.types';

export const metadata = { title: 'CMS Dashboard | Kurarin Solutions', robots: { index: false, follow: false } };

type AdminDashboardProps = {
  searchParams: Promise<{ error?: string; created?: string; published?: string }>;
};

/**
 * Keep the route shell static and isolate request-time Supabase/cookie access
 * inside a Suspense boundary for Next.js Cache Components.
 */
export default function AdminDashboard(props: AdminDashboardProps) {
  return (
    <Suspense
      fallback={
        <main className="cms-shell">
          <div className="cms-content" role="status" aria-live="polite">
            <p className="cms-kicker">WORKSPACE / OVERVIEW</p>
            <h1>Loading content dashboard…</h1>
            <p className="cms-muted">Checking your session and loading CMS data.</p>
          </div>
        </main>
      }
    >
      <AdminDashboardContent searchParams={props.searchParams} />
    </Suspense>
  );
}

async function AdminDashboardContent({ searchParams }: AdminDashboardProps) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const profile = await getCurrentProfile();
  if (!profile || !['admin', 'editor'].includes(profile.role)) redirect('/admin/login?error=unauthorized');

  const [{ data: postsData }, { count: categoryCount }, { count: contactCount }, params] = await Promise.all([
    supabase.from('posts').select('id,title,slug,status,updated_at,published_at,author_id,excerpt,content,featured_image_url,seo_title,seo_description,canonical_url,created_at').order('updated_at', { ascending: false }).limit(8),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    searchParams,
  ]);
  const posts = (postsData ?? []) as CmsPost[];
  const { error, created, published } = params;

  return (
    <main className="cms-shell">
      <header className="cms-topbar">
        <Link className="cms-brand" href="/">KURARIN <span>SOLUTIONS</span></Link>
        <div className="cms-user"><span>{profile.display_name || user.email}</span><span className="cms-role">{profile.role}</span><form action={signOutAction}><button className="cms-quiet-button" type="submit">Sign out</button></form></div>
      </header>
      <div className="cms-content">
        <p className="cms-kicker">WORKSPACE / OVERVIEW</p>
        <div className="cms-heading-row"><div><h1>Content dashboard</h1><p className="cms-muted">Manage your publishing pipeline and prepare the WordPress migration.</p></div><div className="cms-dashboard-links"><Link href="/blog" className="cms-outline-button">View public blog ↗</Link><Link href="/admin/categories" className="cms-outline-button">Categories</Link><Link href="/admin/media" className="cms-outline-button">Media library</Link><Link href="/admin/enquiries" className="cms-outline-button">Enquiries</Link></div></div>
        {created && <p className="cms-success" role="status">Draft created successfully.</p>}
        {published && <p className="cms-success" role="status">Post published. It is now available in the CMS database.</p>}
        {error && <p className="cms-alert" role="alert">{error === 'slug-exists' ? 'That slug is already in use. Choose a unique slug.' : error === 'validation' ? 'Enter a title of 3–180 characters and some article content.' : error === 'publish-failed' ? 'Publishing failed. Check your database permissions and try again.' : 'The action could not be completed. Please review the entry and try again.'}</p>}
        <section className="cms-stats" aria-label="Content overview">
          <article className="cms-stat"><span>Recent posts</span><strong>{posts.length}</strong><small>Latest 8 records</small></article>
          <article className="cms-stat"><span>Categories</span><strong>{categoryCount ?? 0}</strong><small>Available taxonomy</small></article>
          <article className="cms-stat"><span>New enquiries</span><strong>{contactCount ?? 0}</strong><small>Awaiting review</small></article>
        </section>
        <div className="cms-grid">
          <section className="cms-panel"><div className="cms-panel-heading"><div><p className="cms-kicker">PUBLISHING</p><h2>Recent articles</h2></div><span className="cms-chip">Supabase</span></div>
            {posts.length ? <div className="cms-post-list">{posts.map((post) => <article className="cms-post-row" key={post.id}><div className="cms-post-main"><strong>{post.title}</strong><span>/{post.slug}/</span></div><span className={`cms-status cms-status-${post.status}`}>{post.status}</span><Link className="cms-quiet-button" href={`/admin/posts/${post.id}`}>Edit</Link>{post.status === 'draft' && <form action={publishPostAction}><input type="hidden" name="id" value={post.id} /><button className="cms-publish-button" type="submit">Publish</button></form>}</article>)}</div> : <p className="cms-empty">No CMS posts yet. Create a draft to begin.</p>}
          </section>
          <section className="cms-panel cms-create-panel"><p className="cms-kicker">QUICK ACTION</p><h2>Create a draft</h2><p className="cms-muted">Save an initial article to the CMS. You can publish it when the content is ready.</p>
            <form action={createDraftAction} className="cms-form">
              <label>Article title<input name="title" minLength={3} maxLength={180} required placeholder="e.g. Digital growth for Kenyan SMEs" /></label>
              <label>Slug (optional)<input name="slug" maxLength={120} placeholder="digital-growth-kenya" /></label>
              <label>Short excerpt<textarea name="excerpt" rows={2} maxLength={320} placeholder="A concise introduction for the archive." /></label>
              <label>Article content<textarea name="content" rows={6} required placeholder="Write the article content here…" /></label>
              <button className="cms-primary-button" type="submit">Save draft <span aria-hidden="true">↗</span></button>
            </form>
          </section>
        </div>
        <section className="cms-next-steps"><div><p className="cms-kicker">NEXT IN THE BUILD</p><h2>Foundation first. Migration second.</h2><p>Manage article copy and SEO, assign categories, upload media, and triage contact enquiries here. Import legacy WordPress articles only after checking their original text, images, dates, and canonical URLs.</p></div><div className="cms-quick-links"><span>Planned modules</span><p>Article editor · Categories · Media library · Contact inbox · SEO fields · WordPress migration review</p></div></section>
      </div>
    </main>
  );
}
