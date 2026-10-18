'use client';
import { Children, useCallback, useEffect, useRef, useState } from 'react';

/** Carrusel horizontal con flechas. Las flechas se desactivan cuando no hay nada más que desplazar. */
export function Carousel({ children, label, basis, arrowClass = 'top-1/2' }: { children: React.ReactNode; label: string; basis: string; arrowClass?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [can, setCan] = useState({ l: false, r: false });
  const update = useCallback(() => {
    const el = ref.current;
    if (el) setCan({ l: el.scrollLeft > 4, r: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  }, []);
  useEffect(() => {
    update();
    const el = ref.current;
    el?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { el?.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [update]);
  const go = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: 'smooth' });
  const btn = `absolute z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg transition disabled:opacity-45 ${arrowClass}`;
  return (
    <div className="relative">
      <ul ref={ref} tabIndex={0} aria-label={label} className="no-scrollbar flex snap-x gap-5 overflow-x-auto scroll-smooth">
        {Children.map(children, (c) => <li className={`shrink-0 snap-start ${basis}`}>{c}</li>)}
      </ul>
      <button type="button" aria-label="Anterior" disabled={!can.l} onClick={() => go(-1)} className={`${btn} -left-3 md:-left-5`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <button type="button" aria-label="Siguiente" disabled={!can.r} onClick={() => go(1)} className={`${btn} -right-3 md:-right-5`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}
