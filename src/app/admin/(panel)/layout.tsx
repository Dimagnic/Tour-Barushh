import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAdmin } from '@/lib/supabase/server';
import { signOut } from '../actions';
import { AdminNav } from './AdminNav';

export const metadata: Metadata = { title: { default: 'Panel', template: '%s | Panel Tour Barushh' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = await getAdmin();
  if (!user) redirect('/admin/login');
  const out = (
    <form action={signOut}><button type="submit" className="w-full rounded-full border border-white/25 px-4 py-2.5 text-[14px] font-medium text-white/85 hover:border-gold hover:text-gold">Cerrar sesión</button></form>
  );
  if (!isAdmin) {
    return (
      <section className="grid min-h-screen place-items-center bg-ink px-5 text-white">
        <div className="max-w-md text-center">
          <h1 className="font-display text-[2.2rem]">Sin permisos</h1>
          <p className="mt-3 text-white/75">La cuenta {user.email} no es administradora de este sitio. Pide al administrador que te agregue.</p>
          <div className="mx-auto mt-6 max-w-[220px]">{out}</div>
        </div>
      </section>
    );
  }
  return (
    <div className="min-h-screen bg-cream text-ink lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="bg-ink px-5 py-6 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <Link href="/admin" className="block leading-none">
          <span className="block font-display text-[24px] uppercase">Tour Barushh</span>
          <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.3em] text-gold">Panel de administración</span>
        </Link>
        <AdminNav />
        <div className="mt-6 space-y-3 lg:mt-auto">
          <a href="/" target="_blank" rel="noopener noreferrer" className="block rounded-full bg-gold px-4 py-2.5 text-center text-[14px] font-semibold text-ink hover:brightness-95">Ver el sitio ↗</a>
          {out}
          <p className="truncate text-center text-[12px] text-white/50" title={user.email ?? ''}>{user.email}</p>
        </div>
      </aside>
      <main className="px-5 py-8 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
