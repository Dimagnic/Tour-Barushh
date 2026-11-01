'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError('');
    const { error: err } = await supabaseBrowser().auth.signInWithPassword({ email: email.trim(), password });
    if (err) {
      setError(err.code === 'invalid_credentials' || /invalid/i.test(err.message) ? 'Correo o contraseña incorrectos.' : err.code === 'email_not_confirmed' ? 'El correo no está confirmado. Confírmalo en Supabase.' : 'No se pudo iniciar sesión. Inténtalo de nuevo.');
      setBusy(false);
      return;
    }
    const next = params.get('next');
    router.replace(next && next.startsWith('/admin') ? next : '/admin');
    router.refresh();
  };

  if (!configured) return <p className="mt-6 rounded-xl bg-terra/10 p-4 text-[14px] text-terra">El panel todavía no está conectado a Supabase (faltan las variables de entorno).</p>;
  const input = 'w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-[16px] outline-none focus:border-gold';
  return (
    <form onSubmit={submit} className="mt-7 space-y-4">
      <div><label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-ink/75">Correo</label>
        <input id="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} /></div>
      <div><label htmlFor="password" className="mb-1.5 block text-[13px] font-semibold text-ink/75">Contraseña</label>
        <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={input} /></div>
      {error ? <p role="alert" className="text-[14px] font-medium text-terra">{error}</p> : null}
      <button type="submit" disabled={busy} className="w-full rounded-full bg-gold px-6 py-3.5 text-[15px] font-semibold text-ink hover:brightness-95 disabled:opacity-60">{busy ? 'Entrando…' : 'Entrar'}</button>
    </form>
  );
}
