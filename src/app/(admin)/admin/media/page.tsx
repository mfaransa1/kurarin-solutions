import Link from 'next/link';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth/current-profile';
import { uploadMediaAction } from '../actions/management';

export const metadata = { title: 'Media library | Kurarin CMS', robots: { index: false, follow: false } };

export default function MediaPage({ searchParams }: { searchParams: Promise<{ error?: string; uploaded?: string }> }) {
  return (
    <Suspense fallback={<main className="cms-shell"><div className="cms-content"><p className="cms-kicker">CONTENT / ASSETS</p><h1>Loading media library…</h1></div></main>}>
      <MediaPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function MediaPageContent({ searchParams }: { searchParams: Promise<{ error?: string; uploaded?: string }> }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const profile = await getCurrentProfile();
  if (!profile || !['admin', 'editor'].includes(profile.role)) redirect('/admin/login?error=unauthorized');
  const [{ data: mediaData }, params] = await Promise.all([
    supabase.from('media_assets').select('id,public_url,storage_path,alt_text,caption,mime_type,file_size_bytes,created_at').order('created_at', { ascending: false }).limit(100),
    searchParams,
  ]);
  const media = mediaData ?? [];
  const { error, uploaded } = params;
  return <main className="cms-shell"><header className="cms-topbar"><Link className="cms-brand" href="/">KURARIN <span>SOLUTIONS</span></Link><nav className="cms-user"><Link className="cms-outline-button" href="/admin">Dashboard</Link><Link className="cms-outline-button" href="/admin/categories">Categories</Link><Link className="cms-outline-button" href="/admin/enquiries">Enquiries</Link></nav></header>
    <div className="cms-content"><p className="cms-kicker">CONTENT / ASSETS</p><div className="cms-heading-row"><div><h1>Media library</h1><p className="cms-muted">Upload optimised image assets and copy their URLs into article featured-image fields.</p></div><Link className="cms-outline-button" href="/admin">← Dashboard</Link></div>
      {uploaded && <p className="cms-success" role="status">Image uploaded and media record saved.</p>}
      {error && <p className="cms-alert" role="alert">{error === 'file-size' ? 'Choose an image under 5 MB.' : error === 'file-type' ? 'Use JPEG, PNG, WebP, or AVIF images only.' : error === 'alt-required' ? 'Alternative text is required for accessibility.' : error === 'bucket-missing' ? 'The cms-media storage bucket has not been created. Follow the setup instructions.' : error === 'metadata-failed' ? 'The file uploaded but its metadata could not be saved. Check database permissions.' : 'The image upload failed. Check your Supabase Storage configuration.'}</p>}
      <div className="cms-grid"><section className="cms-panel"><p className="cms-kicker">UPLOAD IMAGE</p><h2>Add a media asset</h2><p className="cms-muted">Allowed: JPEG, PNG, WebP and AVIF. Maximum 5 MB. Provide descriptive alt text.</p>
        <form action={uploadMediaAction} className="cms-form" encType="multipart/form-data"><label>Image file<input type="file" name="file" accept="image/jpeg,image/png,image/webp,image/avif" required /></label><label>Alternative text<input name="alt_text" required maxLength={180} placeholder="Describe the meaningful content of the image" /></label><label>Caption (optional)<input name="caption" maxLength={240} /></label><button className="cms-primary-button" type="submit">Upload image <span aria-hidden="true">↗</span></button></form>
        <p className="cms-small-note">Uploads are public assets. Never upload confidential documents, personal records, or images you do not have permission to publish.</p>
      </section><section className="cms-panel"><p className="cms-kicker">STORAGE SETUP</p><h2>Before the first upload</h2><p className="cms-muted">Create a public Supabase Storage bucket named <code>cms-media</code> with a 5 MB file limit and image-only MIME types. Add the authenticated upload policy described in INSTALL.md. Do not use a service-role key in browser code.</p></section></div>
      <section className="cms-panel cms-media-library"><div className="cms-panel-heading"><div><p className="cms-kicker">RECENT ASSETS</p><h2>Media records</h2></div><span className="cms-chip">{media.length} shown</span></div>
        {media.length ? <div className="cms-media-grid">{media.map((asset) => <article className="cms-media-card" key={asset.id}>{asset.public_url && <img src={asset.public_url} alt={asset.alt_text || ''} loading="lazy" />}<div><strong>{asset.alt_text}</strong><p>{asset.caption || 'No caption'}</p><small>{asset.mime_type || 'Unknown type'} · {asset.file_size_bytes ? `${Math.round(Number(asset.file_size_bytes) / 1024)} KB` : 'Size unavailable'}</small>{asset.public_url && <a href={asset.public_url} target="_blank" rel="noreferrer">Open asset ↗</a>}<code>{asset.public_url}</code></div></article>)}</div> : <p className="cms-empty">No media has been uploaded yet.</p>}
      </section>
    </div></main>;
}
