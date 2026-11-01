import type { Metadata } from 'next';
import { Suspense } from 'react';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = { title: 'Iniciar sesión', robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <section className="paper grid min-h-screen place-items-center px-5 py-16 text-ink">
      <div className="w-full max-w-md rounded-3xl bg-[#fffdf8] p-8 shadow-[0_14px_44px_rgba(60,40,10,.16)] sm:p-10">
        <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-brown">Panel de administración</p>
        <h1 className="mt-2 font-display text-[2.4rem] leading-tight">Tour Barushh</h1>
        <p className="mt-2 text-[15px] text-ink/70">Entra con el correo y la contraseña de administrador.</p>
        <Suspense><LoginForm /></Suspense>
      </div>
    </section>
  );
}
