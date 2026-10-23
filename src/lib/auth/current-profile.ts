import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Profile } from '@/lib/supabase/database.types';

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (error || !data) return null;
  return data as Profile;
}
