'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { nav, wa } from '@/data/site';

/**
 * Secciones de la pagina de inicio, en orden, y la pestana del menu que corresponde a cada una.
 * `nosotros` es el bloque "Nuestra esencia": no tiene pestana propia en Inicio (la pestana lleva a /nosotros).
 */
const SECTIONS: [id: string, href: string | null][] = [
  ['inicio', '/'], ['experiencias', '/#experiencias'], ['nosotros', null],
  ['galeria', '/#galeria'], ['testimonios', '/#testimonios'], ['contacto', '/#contacto'],
];
/** Linea de lectura: una seccion es la actual cuando su borde superior pasa por debajo del header (76px) mas un margen. */
const READ_LINE = 120;

export function Header() {
  const [solid, setSolid] = useState(false);
  const [current, setCurrent] = useState<string | null>('/');
  const path = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  // Mientras dura el desplazamiento de un clic, el calculo por scroll se pausa para que la pestana elegida no parpadee.
  const lock = useRef(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const releaseLater = (ms: number) => {
    clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => { lock.current = false; }, ms);
  };
  const lockFor = (ms: number) => { lock.current = true; releaseLater(ms); };

  /** Calcula que seccion esta a la vista (solo en Inicio). */
  const spy = useCallback(() => {
    if (lock.current) return;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) { setCurrent('/#contacto'); return; }
    let found: string | null = '/';
    for (const [id, href] of SECTIONS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= READ_LINE) found = href;
    }
    setCurrent(found);
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      setSolid(window.scrollY > 40);
      if (lock.current) { releaseLater(160); return; } // el desplazamiento del clic sigue en curso
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(spy);
    };
    setSolid(window.scrollY > 40);
    if (path === '/') {
      const hash = window.location.hash;
      if (hash && SECTIONS.some(([, href]) => href === `/${hash}`)) { setCurrent(`/${hash}`); lockFor(1000); }
      else spy();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(lockTimer.current);
    };
  }, [path, spy]);

  const active = (href: string) =>
    path === '/' ? href === current : !href.includes('#') && href !== '/' && path.startsWith(href);

  /** En Inicio, los enlaces a secciones se desplazan aqui mismo y la pestana queda marcada. */
  const go = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (menu.current) menu.current.open = false;
    if (path !== '/' || !(href === '/' || href.startsWith('/#'))) return; // otras paginas: navegacion normal de Next
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // abrir en pestana nueva, etc.
    const target = href === '/' ? null : document.getElementById(href.slice(2));
    if (href !== '/' && !target) return;
    e.preventDefault();
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    setCurrent(href);
    lockFor(1000);
    if (target) target.scrollIntoView({ behavior, block: 'start' });
    else window.scrollTo({ top: 0, behavior });
    if (window.location.pathname + window.location.hash !== href) window.history.pushState(null, '', href);
  };

  const cta = wa('Hola, quiero reservar una experiencia con Tour Barushh.');
  return (
    <header className={`fixed inset-x-0 top-0 z-[90] text-white transition-colors ${solid || path !== '/' ? 'border-b border-white/10 bg-ink/90 backdrop-blur' : 'bg-gradient-to-b from-black/45 to-transparent'}`}>
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between gap-4 px-5 lg:px-8">
        <Link href="/" onClick={go('/')} className="leading-none" aria-label={'Tour Barushh, gu\u00edas de turismo'}>
          <span className="block font-display text-[27px] uppercase tracking-tight">Tour Barushh</span>
          <span className="mt-1 block text-[8px] font-medium uppercase tracking-[0.3em] text-white/80">Gu{'\u00ed'}as de turismo</span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-6 2xl:gap-8 xl:flex">
          {nav.map(([href, label]) => (
            <Link key={href} href={href} onClick={go(href)} aria-current={active(href) ? 'page' : undefined} className={`border-b-2 py-1 text-[14px] font-medium hover:text-gold ${active(href) ? 'border-gold text-gold' : 'border-transparent text-white'}`}>{label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={cta} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-gold px-6 py-3 text-[14px] font-semibold text-ink hover:brightness-95 sm:block">Reserva tu experiencia {'\u2192'}</a>
          <details ref={menu} className="relative xl:hidden">
            <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-full border border-white/40" aria-label={'Men\u00fa'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </summary>
            <div className="absolute right-0 top-14 w-64 rounded-2xl border border-white/10 bg-ink p-3 shadow-xl">
              {nav.map(([href, label]) => <Link key={href} href={href} onClick={go(href)} aria-current={active(href) ? 'page' : undefined} className="block rounded-lg px-3 py-3 font-medium hover:bg-white/10">{label}</Link>)}
              <a href={cta} target="_blank" rel="noopener noreferrer" className="mt-2 block rounded-full bg-gold px-4 py-3 text-center font-semibold text-ink">Reserva tu experiencia {'\u2192'}</a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
