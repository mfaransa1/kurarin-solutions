'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth/current-profile';

function slugify(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 90);
}
async function requireEditor() {
  const profile = await getCurrentProfile();
  if (!profile || !['admin', 'editor'].includes(profile.role)) redirect('/admin/login?error=unauthorized');
  return profile;
}
async function requireAdmin() {
  const profile = await requireEditor();
  if (profile.role !== 'admin') redirect('/admin?error=admin-required');
  return profile;
}

export async function updatePostAction(formData: FormData) {
  const profile = await requireEditor();
  const id = String(formData.get('id') ?? '');
  const title = String(formData.get('title') ?? '').trim();
  const slug = slugify(String(formData.get('slug') ?? title).trim());
  const excerpt = String(formData.get('excerpt') ?? '').trim();
  const content = String(formData.get('content') ?? '').trim();
  const seoTitle = String(formData.get('seo_title') ?? '').trim();
  const seoDescription = String(formData.get('seo_description') ?? '').trim();
  const canonicalUrl = String(formData.get('canonical_url') ?? '').trim();
  const image = String(formData.get('featured_image_url') ?? '').trim();
  const categoryId = String(formData.get('category_id') ?? '').trim();
  const status = String(formData.get('status') ?? 'draft');
  if (!/^[0-9a-f-]{36}$/i.test(id) || title.length < 3 || title.length > 180 || slug.length < 3 || !content) redirect(`/admin/posts/${id}?error=validation`);
  if (!['draft', 'published', 'archived'].includes(status)) redirect(`/admin/posts/${id}?error=validation`);
  if (canonicalUrl && !/^https:\/\/\S+$/i.test(canonicalUrl)) redirect(`/admin/posts/${id}?error=validation`);
  if (image && !/^https:\/\/\S+$/i.test(image) && !image.startsWith('/')) redirect(`/admin/posts/${id}?error=validation`);

  const supabase = await createSupabaseServerClient();
  const update: Record<string, unknown> = {
    title, slug, excerpt: excerpt || null, content,
    seo_title: seoTitle || null, seo_description: seoDescription || null,
    canonical_url: canonicalUrl || null, featured_image_url: image || null,
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  };
  const { error } = await supabase.from('posts').update(update).eq('id', id);
  if (error) redirect(`/admin/posts/${id}?error=${encodeURIComponent(error.code === '23505' ? 'slug-exists' : 'save-failed')}`);

  await supabase.from('post_categories').delete().eq('post_id', id);
  if (categoryId) {
    const { error: categoryError } = await supabase.from('post_categories').insert({ post_id: id, category_id: categoryId });
    if (categoryError) redirect(`/admin/posts/${id}?error=category-save-failed`);
  }
  await supabase.from('cms_audit_log').insert({ actor_id: profile.id, action: 'update_post', entity_type: 'post', entity_id: id, details: { status, slug } });
  revalidatePath('/admin');
  revalidatePath('/admin/categories');
  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  redirect(`/admin/posts/${id}?saved=1`);
}

export async function createCategoryAction(formData: FormData) {
  const profile = await requireEditor();
  const name = String(formData.get('name') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const slug = slugify(String(formData.get('slug') ?? name).trim());
  if (name.length < 2 || name.length > 80 || slug.length < 2) redirect('/admin/categories?error=validation');
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('categories').insert({ name, slug, description: description || null });
  if (error) redirect(`/admin/categories?error=${encodeURIComponent(error.code === '23505' ? 'duplicate' : 'save-failed')}`);
  await supabase.from('cms_audit_log').insert({ actor_id: profile.id, action: 'create_category', entity_type: 'category', details: { name, slug } });
  revalidatePath('/admin/categories');
  revalidatePath('/admin');
  revalidatePath('/blog');
  redirect('/admin/categories?created=1');
}

export async function deleteCategoryAction(formData: FormData) {
  const profile = await requireAdmin();
  const id = String(formData.get('id') ?? '');
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect('/admin/categories?error=validation');
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) redirect('/admin/categories?error=delete-failed');
  await supabase.from('cms_audit_log').insert({ actor_id: profile.id, action: 'delete_category', entity_type: 'category', entity_id: id });
  revalidatePath('/admin/categories');
  revalidatePath('/blog');
  redirect('/admin/categories?deleted=1');
}

export async function updateEnquiryStatusAction(formData: FormData) {
  const profile = await requireEditor();
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '');
  if (!/^[0-9a-f-]{36}$/i.test(id) || !['new', 'in_progress', 'resolved', 'spam'].includes(status)) redirect('/admin/enquiries?error=validation');
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('contact_submissions').update({ status }).eq('id', id);
  if (error) redirect('/admin/enquiries?error=save-failed');
  await supabase.from('cms_audit_log').insert({ actor_id: profile.id, action: 'update_enquiry_status', entity_type: 'contact_submission', entity_id: id, details: { status } });
  revalidatePath('/admin/enquiries');
  revalidatePath('/admin');
  redirect('/admin/enquiries?saved=1');
}

export async function uploadMediaAction(formData: FormData) {
  const profile = await requireEditor();
  const file = formData.get('file');
  const altText = String(formData.get('alt_text') ?? '').trim();
  const caption = String(formData.get('caption') ?? '').trim();
  if (!(file instanceof File) || file.size === 0 || file.size > 5 * 1024 * 1024) redirect('/admin/media?error=file-size');
  const allowed = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
  if (!allowed.has(file.type)) redirect('/admin/media?error=file-type');
  if (!altText || altText.length > 180) redirect('/admin/media?error=alt-required');

  const supabase = await createSupabaseServerClient();
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, '-').replace(/^-|-$/g, '').slice(-90) || 'image';
  const path = `${profile.id}/${crypto.randomUUID()}-${safeName}`;
  const { error: storageError } = await supabase.storage.from('cms-media').upload(path, file, { contentType: file.type, upsert: false });
  if (storageError) redirect(`/admin/media?error=${encodeURIComponent(storageError.message.includes('Bucket not found') ? 'bucket-missing' : 'upload-failed')}`);
  const { data: publicData } = supabase.storage.from('cms-media').getPublicUrl(path);
  const { error: dbError } = await supabase.from('media_assets').insert({
    storage_path: path, public_url: publicData.publicUrl, alt_text: altText,
    caption: caption || null, mime_type: file.type, file_size_bytes: file.size,
    uploaded_by: profile.id, is_public: true,
  });
  if (dbError) {
    await supabase.storage.from('cms-media').remove([path]);
    redirect('/admin/media?error=metadata-failed');
  }
  await supabase.from('cms_audit_log').insert({ actor_id: profile.id, action: 'upload_media', entity_type: 'media_asset', details: { path, mime_type: file.type, file_size_bytes: file.size } });
  revalidatePath('/admin/media');
  redirect('/admin/media?uploaded=1');
}
