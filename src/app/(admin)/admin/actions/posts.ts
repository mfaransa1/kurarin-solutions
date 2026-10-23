'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth/current-profile';

function makeSlug(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 90);
}

export async function createDraftAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile || !['admin', 'editor'].includes(profile.role)) redirect('/admin/login?error=unauthorized');
  const title = String(formData.get('title') ?? '').trim();
  const excerpt = String(formData.get('excerpt') ?? '').trim();
  const content = String(formData.get('content') ?? '').trim();
  const slugInput = String(formData.get('slug') ?? '').trim();
  const slug = makeSlug(slugInput || title);
  if (title.length < 3 || title.length > 180 || slug.length < 3 || content.length < 1) redirect('/admin?error=validation');

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('posts').insert({ title, slug, excerpt: excerpt || null, content, status: 'draft', author_id: profile.id });
  if (error) redirect(`/admin?error=${encodeURIComponent(error.code === '23505' ? 'slug-exists' : 'save-failed')}`);
  revalidatePath('/admin');
  redirect('/admin?created=1');
}

export async function publishPostAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile || !['admin', 'editor'].includes(profile.role)) redirect('/admin/login?error=unauthorized');
  const id = String(formData.get('id') ?? '');
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect('/admin?error=invalid-id');
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('posts').update({ status: 'published', published_at: new Date().toISOString() }).eq('id', id);
  if (error) redirect('/admin?error=publish-failed');
  revalidatePath('/admin');
  revalidatePath('/blog');
  redirect('/admin?published=1');
}
