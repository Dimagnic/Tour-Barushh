'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { videoSource } from '@/lib/video';

/** Botón (cualquier contenido) que abre el video en una ventana flotante sobre toda la página (portal a <body>). Esc o clic fuera la cierran. */
export function VideoModal({ url, title, className = '', children }: { url: string; title: string; className?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const source = videoSource(url);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); trigger.current?.focus(); };
  }, [open]);

  if (!source) return null;
  return (
    <>
      <button ref={trigger} type="button" onClick={() => setOpen(true)} className={className} aria-haspopup="dialog">{children}</button>
      {open ? createPortal(
        <div role="dialog" aria-modal="true" aria-label={title} onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100001] grid place-items-center bg-[#031321]/90 p-4 backdrop-blur-sm sm:p-8">
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button ref={closeBtn} type="button" onClick={() => setOpen(false)} aria-label="Cerrar video"
              className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full border border-white/40 text-white hover:border-gold hover:text-gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              {source.kind === 'iframe' ? (
                <iframe src={source.src} title={title} className="size-full" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
              ) : (
                <video src={source.src} title={title} className="size-full" controls autoPlay playsInline preload="metadata" />
              )}
            </div>
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
