import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { signInAction } from '../actions/auth';

export const metadata = { title: 'CMS Login | Kurarin Solutions' };

import { Suspense } from 'react';

export default function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return (
    <Suspense fallback={<main className="cms-login-shell"><section className="cms-login-card" aria-label="Loading sign-in"><p className="cms-kicker">CONTENT MANAGEMENT</p><p className="cms-muted">Loading sign-in…</p></section></main>}>
      <AdminLoginContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminLoginContent({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect('/admin');
  const { error } = await searchParams;
  return (
    <main className="cms-login-shell">
      <section className="cms-login-card" aria-labelledby="cms-login-title">
        <Link className="cms-eyebrow" href="/">KURARIN SOLUTIONS</Link>
        <p className="cms-kicker">CONTENT MANAGEMENT</p>
        <h1 id="cms-login-title">Sign in to your workspace.</h1>
        <p className="cms-muted">Use an approved editor or administrator account.</p>
        {error && <p className="cms-alert" role="alert">{error === 'invalid' ? 'Email or password is incorrect.' : error === 'unauthorized' ? 'Your account does not have CMS access.' : 'Please enter your email and password.'}</p>}
        <form action={signInAction} className="cms-form">
          <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
          <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
          <button type="submit" className="cms-primary-button">Sign in <span aria-hidden="true">↗</span></button>
        </form>
        <p className="cms-small-note">Public sign-up is intentionally disabled. Create staff accounts through Supabase Auth, then assign their CMS role securely.</p>
      </section>
    </main>
  );
}
