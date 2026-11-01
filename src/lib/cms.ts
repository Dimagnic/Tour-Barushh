import { cache } from 'react';
import { site } from '@/data/site';
import { experiences, gallery, heroFeatures, testimonials, type IconName } from '@/data/content';

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

/** Una foto: id de la biblioteca del sitio (src/data/photos.json) o URL de una foto subida al panel. */
export type ImageRef = string;
export interface Feature { icon: IconName; t: string }
export interface Hero { line1: string; highlight: string; line3: string; subtitle: string; ctaLabel: string; photo: ImageRef; videoUrl: string; features: Feature[] }
export interface Experience { place: string; title: string; text: string; photo: ImageRef }
export interface Experiences { label: string; title: string; text: string; script: string; photoA: ImageRef; photoB: ImageRef; items: Experience[] }
export interface GalleryItem { photo: ImageRef; alt: string }
export interface Gallery { label: string; title: string; script: string; items: GalleryItem[] }
export interface Testimonial { name: string; text: string }
export interface Testimonials { visible: boolean; label: string; title: string; items: Testimonial[] }

export const defaults = {
  general: {
    whatsapp: site.whatsappDisplay,
    email: site.email,
    hours: site.hours,
    social: { instagram: site.social.instagram ?? '', facebook: site.social.facebook ?? '', tiktok: site.social.tiktok ?? '', youtube: site.social.youtube ?? '' },
    floatingMessage: 'Hola, quisiera información sobre sus tours en Puebla.',
    reserveMessage: 'Hola, quiero reservar una experiencia con Tour Barushh.',
    clienteaiToken: site.clienteaiToken,
    exampleContent: site.exampleContent,
  } as General,
  hero: {
    line1: 'Más que un tour,', highlight: 'una experiencia', line3: 'que se vive.',
    subtitle: 'Conoce Puebla y sus alrededores de la mano de guías locales que aman su tierra, su historia y su gente.',
    ctaLabel: 'Reserva tu experiencia', photo: 'vista-pueblo-iglesia', videoUrl: site.videoUrl,
    features: heroFeatures,
  } as Hero,
  experiences: {
    label: 'Experiencias únicas', title: 'Tours que\ncuentan historias',
    text: 'Recorre pueblos mágicos, paisajes increíbles, tradiciones vivas y una gastronomía que enamora.',
    script: 'Puebla y sus alrededores como nunca los has visto', photoA: 'grupo-mural', photoB: 'grupo-mirador',
    items: experiences,
  } as Experiences,
  gallery: {
    label: 'Galería', title: 'Momentos\nque se quedan', script: 'Experiencias\nreales',
    items: gallery.map((photo) => ({ photo, alt: '' })),
  } as Gallery,
  testimonials: {
    visible: true, label: 'Testimonios', title: 'Viajeros que\nviven y recomiendan',
    items: testimonials,
  } as Testimonials,
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
  if (Array.isArray(base)) {
    if (!Array.isArray(saved)) return base;
    if (base.length === 0) return saved as T;
    return saved.filter((x) => x !== null && x !== undefined).map((x) => merge(base[0], x)) as T;
  }
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

/** Lo guardado combinado con los valores por defecto (lo usa el panel para mostrar el formulario). */
export function withDefaults<K extends ContentKey>(key: K, saved: unknown): Content[K] {
  return merge(defaults[key], saved);
}

export async function getContent<K extends ContentKey>(key: K): Promise<Content[K]> {
  const rows = await loadRows();
  return merge(defaults[key], rows[key]);
}

export const getGeneral = () => getContent('general');

export { waDigits, waLink } from '@/lib/wa';
