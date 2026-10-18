'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { nav, wa } from '@/data/site';

export function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  const cta = wa('Hola, quiero reservar una experiencia con Tour Barushh.');
  return (
    <header className={`fixed inset-x-0 top-0 z-40 text-white transition-colors ${solid ? 'border-b border-white/10 bg-ink/90 backdrop-blur' : 'bg-gradient-to-b from-black/45 to-transparent'}`}>
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between gap-4 px-5 lg:px-8">
        <Link href="/" className="leading-none" aria-label="Tour Barushh, guías de turismo">
          <span className="block font-display text-[26px] font-semibold uppercase tracking-tight">Tour Barushh</span>
          <span className="mt-1 block text-[8px] font-medium uppercase tracking-[0.3em] text-white/80">Guías de turismo</span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {nav.map(([href, label], i) => (
            <Link key={href} href={href} className={`border-b-2 py-1 text-[14px] font-medium hover:text-gold ${i === 0 ? 'border-gold text-gold' : 'border-transparent text-white'}`}>{label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={cta} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-gold px-6 py-3 text-[14px] font-semibold text-ink hover:brightness-95 sm:block">Reserva tu experiencia →</a>
          <details className="relative lg:hidden">
            <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-full border border-white/40" aria-label="Menú">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </summary>
            <div className="absolute right-0 top-14 w-64 rounded-2xl border border-white/10 bg-ink p-3 shadow-xl">
              {nav.map(([href, label]) => <Link key={href} href={href} className="block rounded-lg px-3 py-3 font-medium hover:bg-white/10">{label}</Link>)}
              <a href={cta} target="_blank" rel="noopener noreferrer" className="mt-2 block rounded-full bg-gold px-4 py-3 text-center font-semibold text-ink">Reserva tu experiencia →</a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
