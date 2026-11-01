import type { IconName } from '@/data/content';

/**
 * Qué se puede editar en cada sección y con qué límites. Lo usan el panel (formularios)
 * y el servidor (validación al guardar), así ambos aplican exactamente las mismas reglas.
 */
export type Field =
  | { kind: 'text'; key: string; label: string; help?: string; max: number; multiline?: boolean; required?: boolean; placeholder?: string }
  | { kind: 'image'; key: string; label: string; help?: string }
  | { kind: 'icon'; key: string; label: string }
  | { kind: 'toggle'; key: string; label: string; help?: string }
  | { kind: 'list'; key: string; label: string; help?: string; min: number; max: number; fields: Field[]; itemTitle: string; empty: Record<string, unknown> };

export interface Schema { title: string; intro: string; groups: { title: string; help?: string; fields: Field[] }[] }

export const ICONS: [IconName, string][] = [
  ['person', 'Persona'], ['seal', 'Sello con corazón'], ['group', 'Grupo'], ['truck', 'Transporte'], ['shield', 'Escudo'],
  ['culture', 'Cultura'], ['mountain', 'Montaña'], ['food', 'Comida'], ['flower', 'Flor'], ['route', 'Ruta'], ['pin', 'Ubicación'], ['whatsapp', 'WhatsApp'],
];

const lineHelp = 'Presiona Enter para cortar la línea donde quieras.';

export type SectionKey = 'hero' | 'experiences' | 'gallery' | 'testimonials';

export const schemas: Record<SectionKey, Schema> = {
  hero: {
    title: 'Encabezado y portada',
    intro: 'Lo primero que ve el visitante al entrar al sitio.',
    groups: [
      { title: 'Título principal', help: 'Se muestra en tres renglones; el del medio va en dorado y cursiva.', fields: [
        { kind: 'text', key: 'line1', label: 'Primer renglón', max: 40, required: true },
        { kind: 'text', key: 'highlight', label: 'Renglón dorado', max: 40, required: true },
        { kind: 'text', key: 'line3', label: 'Tercer renglón', max: 40, required: true },
        { kind: 'text', key: 'subtitle', label: 'Texto debajo del título', max: 220, multiline: true, required: true },
        { kind: 'text', key: 'ctaLabel', label: 'Texto del botón dorado', max: 30, required: true, help: 'El mensaje que se envía por WhatsApp se cambia en Datos generales.' },
      ] },
      { title: 'Foto y video', fields: [
        { kind: 'image', key: 'photo', label: 'Foto de fondo', help: 'Mejor horizontal y de buena resolución (al menos 1800 px de ancho).' },
        { kind: 'text', key: 'videoUrl', label: 'Video “Conoce Tour Barushh en 1 minuto”', max: 300, placeholder: 'https://www.youtube.com/watch?v=…', help: 'Enlace de YouTube, Vimeo o .mp4. Vacío = el botón no aparece. Si Nosotros no tiene video propio, también se usa ahí.' },
      ] },
      { title: 'Ventajas', help: 'Los íconos con texto debajo del botón.', fields: [
        { kind: 'list', key: 'features', label: 'Ventajas', min: 1, max: 5, itemTitle: 't', empty: { icon: 'seal', t: '' }, fields: [
          { kind: 'icon', key: 'icon', label: 'Ícono' },
          { kind: 'text', key: 't', label: 'Texto', max: 40, required: true },
        ] },
      ] },
    ],
  },
  experiences: {
    title: 'Experiencias',
    intro: 'La sección “Tours que cuentan historias” y el carrusel de experiencias. Los títulos también aparecen en el pie de página.',
    groups: [
      { title: 'Textos', fields: [
        { kind: 'text', key: 'label', label: 'Etiqueta superior', max: 40, required: true },
        { kind: 'text', key: 'title', label: 'Título', max: 60, multiline: true, required: true, help: lineHelp },
        { kind: 'text', key: 'text', label: 'Descripción', max: 220, multiline: true, required: true },
        { kind: 'text', key: 'script', label: 'Frase manuscrita', max: 70, help: 'La frase en letra de mano junto a las fotos.' },
      ] },
      { title: 'Fotos tipo polaroid', fields: [
        { kind: 'image', key: 'photoA', label: 'Foto grande' },
        { kind: 'image', key: 'photoB', label: 'Foto pequeña' },
      ] },
      { title: 'Tarjetas del carrusel', help: 'El botón “Ver más” de cada tarjeta abre WhatsApp preguntando por esa experiencia.', fields: [
        { kind: 'list', key: 'items', label: 'Experiencias', min: 1, max: 12, itemTitle: 'title', empty: { place: '', title: '', text: '', photo: 'calle-empedrada' }, fields: [
          { kind: 'image', key: 'photo', label: 'Foto' },
          { kind: 'text', key: 'place', label: 'Lugar (etiqueta)', max: 30, required: true },
          { kind: 'text', key: 'title', label: 'Título', max: 60, required: true },
          { kind: 'text', key: 'text', label: 'Descripción corta', max: 140, multiline: true, required: true },
        ] },
      ] },
    ],
  },
  gallery: {
    title: 'Galería',
    intro: 'El carrusel “Momentos que se quedan”. Se ven 4 fotos a la vez en computadora.',
    groups: [
      { title: 'Textos', fields: [
        { kind: 'text', key: 'label', label: 'Etiqueta superior', max: 40, required: true },
        { kind: 'text', key: 'title', label: 'Título', max: 60, multiline: true, required: true, help: lineHelp },
        { kind: 'text', key: 'script', label: 'Frase manuscrita', max: 40, multiline: true, help: lineHelp },
      ] },
      { title: 'Fotos', help: 'Las fotos se recortan en formato horizontal 4:3.', fields: [
        { kind: 'list', key: 'items', label: 'Fotos', min: 1, max: 24, itemTitle: 'alt', empty: { photo: 'calle-empedrada', alt: '' }, fields: [
          { kind: 'image', key: 'photo', label: 'Foto' },
          { kind: 'text', key: 'alt', label: 'Descripción (para lectores de pantalla y Google)', max: 120, placeholder: 'Ej. Grupo de viajeros en Cholula' },
        ] },
      ] },
    ],
  },
  testimonials: {
    title: 'Testimonios',
    intro: 'Opiniones de viajeros. Publica solo testimonios reales y con permiso de quien los escribió.',
    groups: [
      { title: 'Sección', fields: [
        { kind: 'toggle', key: 'visible', label: 'Mostrar la sección de testimonios en el sitio' },
        { kind: 'text', key: 'label', label: 'Etiqueta superior', max: 40, required: true },
        { kind: 'text', key: 'title', label: 'Título', max: 60, multiline: true, required: true, help: lineHelp },
      ] },
      { title: 'Testimonios', help: 'En computadora se ven 3 por fila.', fields: [
        { kind: 'list', key: 'items', label: 'Testimonios', min: 0, max: 12, itemTitle: 'name', empty: { name: '', text: '' }, fields: [
          { kind: 'text', key: 'name', label: 'Nombre', max: 40, required: true, placeholder: 'Ej. Ana L.' },
          { kind: 'text', key: 'text', label: 'Testimonio', max: 320, multiline: true, required: true },
        ] },
      ] },
    ],
  },
};
export const isSectionKey = (k: string): k is SectionKey => k in schemas;

/** Revisa los datos contra el esquema. Devuelve el primer problema en lenguaje sencillo, o null si todo está bien. */
export function validate(fields: Field[], data: Record<string, unknown>, isImage: (v: string) => boolean, where = ''): string | null {
  for (const f of fields) {
    const v = data[f.key];
    const name = `${where}${f.label}`;
    if (f.kind === 'text') {
      const s = typeof v === 'string' ? v.trim() : '';
      if (f.required && !s) return `Falta llenar: ${name}.`;
      if (s.length > f.max) return `${name} es muy largo (máximo ${f.max} caracteres).`;
      if (f.key.toLowerCase().includes('url') && s && !/^(https:\/\/|\/)\S+$/i.test(s)) return `${name} debe ser un enlace que empiece con https://`;
    } else if (f.kind === 'image') {
      if (typeof v !== 'string' || !isImage(v)) return `Elige una foto válida en: ${name}.`;
    } else if (f.kind === 'icon') {
      if (!ICONS.some(([id]) => id === v)) return `Elige un ícono en: ${name}.`;
    } else if (f.kind === 'list') {
      const arr = Array.isArray(v) ? v : [];
      if (arr.length < f.min) return `${name}: agrega al menos ${f.min}.`;
      if (arr.length > f.max) return `${name}: máximo ${f.max}.`;
      for (let i = 0; i < arr.length; i++) {
        const err = validate(f.fields, (arr[i] ?? {}) as Record<string, unknown>, isImage, `${f.label} ${i + 1} · `);
        if (err) return err;
      }
    }
  }
  return null;
}
