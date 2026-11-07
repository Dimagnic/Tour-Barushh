'use client';
import { useEffect, useState } from 'react';

/**
 * Botón ES | EN del encabezado. Traduce todo el sitio público al inglés con el traductor de Google
 * (también lo que el cliente cambie en el panel) y regresa al español al instante, sin recargar.
 * El script de Google solo se descarga cuando alguien elige EN; quien navega en español no lo carga.
 * La elección se recuerda en este navegador. La barra y los avisos de Google van ocultos (globals.css).
 */
type Lang = 'es' | 'en';
const KEY = 'tb-lang';
const SCRIPT = 'https://translate.google.com/translate_a/element.js?cb=__tbGtInit';

declare global {
  interface Window {
    __tbGtInit?: () => void;
    __tbGt?: Promise<void>;
    google?: { translate?: { TranslateElement: new (o: object, id: string) => unknown } };
  }
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Google cambia los textos de la página por los suyos; si después React intenta mover o quitar un texto
 * que ya no está donde lo dejó, el navegador lanza un error y la página se rompe. Esto lo vuelve inofensivo.
 */
function guardReactDom() {
  const w = window as unknown as { __tbDomGuard?: boolean };
  if (w.__tbDomGuard) return;
  w.__tbDomGuard = true;
  const remove = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return remove.call(this, child) as T;
  };
  const insert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return node;
    return insert.call(this, node, ref) as T;
  };
}

/** Carga el traductor una sola vez y espera a que su selector interno exista. */
function loadGoogle(): Promise<void> {
  if (window.__tbGt) return window.__tbGt;
  guardReactDom();
  window.__tbGt = new Promise<void>((resolve, reject) => {
    let box = document.getElementById('tb-gt');
    if (!box) {
      box = document.createElement('div');
      box.id = 'tb-gt';
      box.setAttribute('aria-hidden', 'true');
      box.style.display = 'none';
      document.body.appendChild(box);
    }
    window.__tbGtInit = () => {
      new window.google!.translate!.TranslateElement({ pageLanguage: 'es', includedLanguages: 'en,es', autoDisplay: false }, 'tb-gt');
      void (async () => {
        for (let i = 0; i < 60; i++) {
          if (document.querySelector('select.goog-te-combo')) return resolve();
          await wait(150);
        }
        reject(new Error('translator'));
      })();
    };
    const s = document.createElement('script');
    s.src = SCRIPT;
    s.async = true;
    s.onerror = () => { window.__tbGt = undefined; reject(new Error('translator')); };
    document.head.appendChild(s);
  });
  return window.__tbGt;
}

/** Elige el idioma en el selector oculto de Google (dos veces: la primera a veces no la toma). */
async function apply(lang: Lang) {
  const combo = document.querySelector<HTMLSelectElement>('select.goog-te-combo');
  if (!combo) return;
  for (let i = 0; i < 2; i++) {
    combo.value = lang;
    combo.dispatchEvent(new Event('change'));
    await wait(700);
  }
}

function clearGoogleCookie() {
  const past = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie = `googtrans=; ${past}`;
  document.cookie = `googtrans=; ${past}; domain=${location.hostname}`;
  document.cookie = `googtrans=; ${past}; domain=.${location.hostname}`;
}

export function LangToggle({ className = '' }: { className?: string }) {
  const [lang, setLang] = useState<Lang>('es');
  const [busy, setBusy] = useState(false);

  const choose = async (next: Lang, remember = true) => {
    setLang(next);
    if (remember) {
      try { if (next === 'en') localStorage.setItem(KEY, 'en'); else localStorage.removeItem(KEY); } catch { /* sin almacenamiento */ }
    }
    document.documentElement.lang = next;
    if (next === 'es' && !window.__tbGt) { clearGoogleCookie(); return; }
    setBusy(true);
    try {
      await loadGoogle();
      await apply(next);
    } catch {
      setLang('es');
      document.documentElement.lang = 'es';
    } finally {
      if (next === 'es') clearGoogleCookie();
      setBusy(false);
    }
  };

  // Al abrir el sitio: si la última vez eligió inglés, lo vuelve a aplicar.
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch { /* sin almacenamiento */ }
    if (saved === 'en') void choose('en', false);
    else clearGoogleCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const btn = (code: Lang, label: string, title: string) => (
    <button type="button" onClick={() => lang !== code && !busy && void choose(code)} aria-pressed={lang === code} title={title} lang={code}
      className={`rounded-full px-2.5 py-1 text-[12px] font-bold tracking-wide transition-colors ${lang === code ? 'bg-gold text-ink' : 'text-white/80 hover:text-gold'}`}>
      {label}
    </button>
  );

  return (
    <div role="group" aria-label="Idioma / Language" translate="no"
      className={`notranslate flex items-center gap-0.5 rounded-full border border-white/40 p-[3px] ${busy ? 'animate-pulse' : ''} ${className}`}>
      {btn('es', 'ES', 'Ver en español')}
      {btn('en', 'EN', 'View in English')}
    </div>
  );
}
