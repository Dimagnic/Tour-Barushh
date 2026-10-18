import Link from 'next/link';
import { nav, wa } from '@/data/site';

export function Header() {
  const cta = wa('Hola, quiero reservar una experiencia con Barushh.');
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/88 text-white backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-5">
        <Link href="/" className="leading-none" aria-label="Barushh Guías de Turismo">
          <span className="block font-display text-[28px] font-bold tracking-wide">BARUSHH</span>
          <span className="block text-[9px] font-semibold uppercase tracking-[0.28em] text-white/70">Guías de turismo</span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {nav.map(([href, label], i) => (
            <Link key={href} href={href} className={`border-b-2 py-1 text-[15px] font-semibold hover:text-gold ${i === 0 ? 'border-gold text-gold' : 'border-transparent text-white/90'}`}>{label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={cta} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink hover:brightness-95 sm:block">Reserva tu experiencia</a>
          <details className="relative lg:hidden">
            <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-full border border-white/30" aria-label="Menú">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </summary>
            <div className="absolute right-0 top-14 w-64 rounded-2xl border border-white/10 bg-ink p-3 shadow-xl">
              {nav.map(([href, label]) => <Link key={href} href={href} className="block rounded-lg px-3 py-3 font-semibold hover:bg-white/10">{label}</Link>)}
              <a href={cta} target="_blank" rel="noopener noreferrer" className="mt-2 block rounded-full bg-gold px-4 py-3 text-center font-bold text-ink">Reserva tu experiencia</a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
