import { cache } from 'react';
import { site } from '@/data/site';

/**
 * CMS (Supabase): cada sección del sitio es una fila de la tabla `content` (key + data en JSON).
 * Lo que no esté guardado en Supabase, o si Supabase no responde, se toma de estos valores por defecto,
 * así que el sitio nunca se queda vacío. Los cambios del panel se ven en máximo 60 s (o al instante al guardar).
 */

export interface General {
  /** WhatsApp tal como se muestra, ej. "+52 221 213 9031" (los enlaces usan solo los dígitos). */
  whatsapp: string;
  email: string;
  hours: string;
  social: { instagram: string; facebook: string; tiktok: string; youtube: string };
  /** Mensaje que se envía al tocar el botón flotante de WhatsApp. */
  floatingMessage: string;
  /** Mensaje del botón "Reserva tu experiencia" del encabezado y la portada. */
  reserveMessage: string;
  /** Token del asistente de ClienteAI (vacío = sin chat). */
  clienteaiToken: string;
  /** Muestra el aviso "Texto de ejemplo" mientras el contenido no sea el definitivo. */
  exampleContent: boolean;
}

export const defaults: { general: General } = {
  general: {
    whatsapp: site.whatsappDisplay,
    email: site.email,
    hours: site.hours,
    social: { instagram: site.social.instagram ?? '', facebook: site.social.facebook ?? '', tiktok: site.social.tiktok ?? '', youtube: site.social.youtube ?? '' },
    floatingMessage: 'Hola, quisiera información sobre sus tours en Puebla.',
    reserveMessage: 'Hola, quiero reservar una experiencia con Tour Barushh.',
    clienteaiToken: site.clienteaiToken,
    exampleContent: site.exampleContent,
  },
};
export type Content = typeof defaults;
export type ContentKey = keyof Content;

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const cmsEnabled = Boolean(URL_ && KEY);
export const CMS_REVALIDATE = 60;

/** Combina lo guardado con los valores por defecto: solo acepta campos conocidos y del mismo tipo. */
function merge<T>(base: T, saved: unknown): T {
  if (saved === undefined || saved === null) return base;
  if (Array.isArray(base)) return (Array.isArray(saved) ? saved : base) as T;
  if (typeof base === 'object' && base !== null) {
    if (typeof saved !== 'object' || Array.isArray(saved)) return base;
    const out = { ...(base as Record<string, unknown>) };
    for (const k of Object.keys(out)) out[k] = merge(out[k], (saved as Record<string, unknown>)[k]);
    return out as T;
  }
  return (typeof saved === typeof base ? saved : base) as T;
}

/** Lee todas las filas de una vez (una sola consulta por página). */
const loadRows = cache(async (): Promise<Record<string, unknown>> => {
  if (!cmsEnabled) return {};
  try {
    const res = await fetch(`${URL_}/rest/v1/content?select=key,data`, {
      headers: { apikey: KEY as string },
      next: { revalidate: CMS_REVALIDATE, tags: ['cms'] },
    });
    if (!res.ok) return {};
    const rows = (await res.json()) as { key: string; data: unknown }[];
    return Object.fromEntries(rows.map((r) => [r.key, r.data]));
  } catch {
    return {};
  }
});

export async function getContent<K extends ContentKey>(key: K): Promise<Content[K]> {
  const rows = await loadRows();
  return merge(defaults[key], rows[key]);
}

export const getGeneral = () => getContent('general');

export { waDigits, waLink } from '@/lib/wa';
