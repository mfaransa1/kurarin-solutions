import Link from 'next/link';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth/current-profile';
import { updateEnquiryStatusAction } from '../actions/management';

export const metadata = { title: 'Contact enquiries | Kurarin CMS', robots: { index: false, follow: false } };

async function EnquiriesContent({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string }> }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const profile = await getCurrentProfile();
  if (!profile || !['admin', 'editor'].includes(profile.role)) redirect('/admin/login?error=unauthorized');
  const [{ data }, params] = await Promise.all([
    supabase.from('contact_submissions').select('id,name,email,phone,service,message,status,created_at').order('created_at', { ascending: false }).limit(200),
    searchParams,
  ]);
  const enquiries = data ?? [];
  const { error, saved } = params;
  return <main className="cms-shell"><header className="cms-topbar"><Link className="cms-brand" href="/">KURARIN <span>SOLUTIONS</span></Link><nav className="cms-user"><Link className="cms-outline-button" href="/admin">Dashboard</Link><Link className="cms-outline-button" href="/admin/categories">Categories</Link><Link className="cms-outline-button" href="/admin/media">Media</Link></nav></header>
    <div className="cms-content"><p className="cms-kicker">CUSTOMER CARE / INBOX</p><div className="cms-heading-row"><div><h1>Contact enquiries</h1><p className="cms-muted">Review and track messages stored by the website contact endpoint.</p></div><Link className="cms-outline-button" href="/admin">← Dashboard</Link></div>
      {saved && <p className="cms-success" role="status">Enquiry status updated.</p>}
      {error && <p className="cms-alert" role="alert">The enquiry status could not be updated. Check database permissions and try again.</p>}
      <section className="cms-panel"><div className="cms-panel-heading"><div><p className="cms-kicker">INBOX</p><h2>{enquiries.length} recent enquiries</h2></div><span className="cms-chip">Latest 200</span></div>
        {enquiries.length ? <div className="cms-enquiry-list">{enquiries.map((item) => <article className="cms-enquiry-card" key={item.id}><div className="cms-enquiry-head"><div><h3>{item.name}</h3><a href={`mailto:${item.email}`}>{item.email}</a>{item.phone && <a href={`tel:${item.phone}`}>{item.phone}</a>}</div><span className={`cms-status ${item.status === 'resolved' ? 'cms-status-published' : item.status === 'spam' ? 'cms-status-archived' : 'cms-status-draft'}`}>{item.status.replace('_', ' ')}</span></div><p className="cms-enquiry-meta">{item.service || 'General enquiry'} · {new Date(item.created_at).toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' })}</p><p className="cms-enquiry-message">{item.message}</p><form action={updateEnquiryStatusAction} className="cms-enquiry-action"><input type="hidden" name="id" value={item.id} /><label>Status<select name="status" defaultValue={item.status}><option value="new">New</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option><option value="spam">Spam</option></select></label><button className="cms-publish-button" type="submit">Update status</button></form></article>)}</div> : <p className="cms-empty">No contact enquiries found. Confirm the contact form is configured to store submissions in Supabase.</p>}
      </section>
    </div></main>;
}


export default function EnquiriesPage({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string }> }) {
  return (
    <Suspense fallback={<main className="cms-shell"><div className="cms-content"><p className="cms-muted">Loading contact enquiries…</p></div></main>}>
      <EnquiriesContent searchParams={searchParams} />
    </Suspense>
  );
}
