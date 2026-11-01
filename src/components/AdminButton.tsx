'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * Acceso fijo al panel (abajo a la izquierda, lejos de la pila de WhatsApp/chat de la derecha).
 * Cualquiera lo ve, pero solo entra quien tenga cuenta de administrador: /admin pide iniciar sesión.
 * Si ya hay una sesión abierta en este navegador, cambia a "Ir al panel" con un punto verde.
 */
export function AdminButton() {
  const [session, setSession] = useState(false);
  useEffect(() => {
    try { setSession(/(?:^|;\s*)sb-[^=]*-auth-token(?:\.0)?=/.test(document.cookie)); } catch { /* sin cookies */ }
  }, []);
  const label = session ? 'Ir al panel' : 'Administrar';
  return (
    <Link href="/admin" prefetch={false} aria-label={`${label} (solo administradores)`} title="Solo administradores"
      className="group fixed bottom-6 left-6 z-[99998] flex h-11 items-center rounded-full border border-gold/60 bg-ink/85 pl-[11px] pr-[11px] text-white shadow-lg backdrop-blur transition-all duration-300 hover:border-gold hover:bg-ink focus-visible:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60">
      <span className="relative grid size-5 shrink-0 place-items-center text-gold">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
          <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
          <circle cx="12" cy="15.5" r="1.3" fill="currentColor" stroke="none" />
        </svg>
        {session ? <span className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-ink bg-[#25D366]" /> : null}
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-semibold tracking-wide opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[120px] group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-[120px] group-focus-visible:opacity-100">
        {label}
      </span>
    </Link>
  );
}
