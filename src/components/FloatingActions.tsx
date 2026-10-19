'use client';
import { useEffect, useState } from 'react';

/**
 * Pila de botones a la derecha, de abajo hacia arriba:
 * ClienteAI (su widget se sube a bottom:96px desde globals.css) → WhatsApp → subir.
 */
export function FloatingActions({ wa, msg, topLabel }: { wa: string; msg: string; topLabel: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <>
      <a href={`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        className="fixed bottom-[164px] right-6 z-[99998] grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2zm5.800 14.200c-.2.700-1.400 1.300-2 1.400-.5.100-1.100.100-1.800-.100-.4-.1-.9-.3-1.600-.6-2.800-1.200-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800 0-1.300.7-2 1-2.300.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.9 2.100c.1.200.1.400 0 .5l-.3.500-.4.400c-.1.200-.3.300-.1.600.2.300.7 1.200 1.500 1.900 1 .9 1.900 1.200 2.200 1.300.3.100.4.100.6-.1l.8-1c.2-.3.400-.2.600-.1l2 1c.3.100.5.200.5.300.1.200.1.800-.1 1.500z" /></svg>
      </a>
      {show ? (
        <button type="button" aria-label={topLabel} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-[232px] right-[28px] z-[99998] grid size-12 place-items-center rounded-full border border-white/30 bg-ink text-white shadow-lg hover:border-gold">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </button>
      ) : null}
    </>
  );
}
