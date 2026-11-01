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

export type SectionKey = 'hero' | 'experiences' | 'gallery' | 'testimonials' | 'living' | 'essence' | 'contact' | 'about' | 'privacy' | 'terms';

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
        { kind: 'toggle', key: 'visible', label: 'Mostrar esta sección en el sitio' },
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
        { kind: 'toggle', key: 'visible', label: 'Mostrar esta sección en el sitio' },
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
  living: {
    title: 'Vive la experiencia',
    intro: 'La sección azul con la foto tipo polaroid, después de Experiencias.',
    groups: [
      { title: 'Textos', fields: [
        { kind: 'toggle', key: 'visible', label: 'Mostrar esta sección en el sitio' },
        { kind: 'text', key: 'label', label: 'Etiqueta superior', max: 40, required: true },
        { kind: 'text', key: 'title', label: 'Título', max: 70, multiline: true, required: true, help: lineHelp },
        { kind: 'text', key: 'text', label: 'Descripción', max: 260, multiline: true, required: true },
        { kind: 'text', key: 'ctaLabel', label: 'Texto del botón', max: 30, required: true },
        { kind: 'text', key: 'ctaMessage', label: 'Mensaje de WhatsApp del botón', max: 160, required: true },
        { kind: 'text', key: 'script', label: 'Frase manuscrita', max: 40 },
      ] },
      { title: 'Foto', fields: [{ kind: 'image', key: 'photo', label: 'Foto tipo polaroid' }] },
      { title: 'Íconos', help: 'Hasta 4, debajo del botón.', fields: [{ kind: 'list', key: 'items', label: 'Íconos', min: 0, max: 4, itemTitle: 't', empty: { icon: 'seal', t: '' }, fields: [
          { kind: 'icon', key: 'icon', label: 'Ícono' },
          { kind: 'text', key: 't', label: 'Texto', max: 40, required: true },
        ] }] },
    ],
  },
  essence: {
    title: 'Nuestra esencia',
    intro: 'La sección “Personas que hacen la diferencia”, con la foto de bordes rasgados.',
    groups: [
      { title: 'Textos', help: 'La descripción se arma con tres partes; la del medio se resalta en un tono más oscuro.', fields: [
        { kind: 'toggle', key: 'visible', label: 'Mostrar esta sección en el sitio' },
        { kind: 'text', key: 'label', label: 'Etiqueta superior', max: 40, required: true },
        { kind: 'text', key: 'title', label: 'Título', max: 70, multiline: true, required: true, help: lineHelp },
        { kind: 'text', key: 'text', label: 'Descripción: inicio', max: 200, multiline: true, required: true },
        { kind: 'text', key: 'highlight', label: 'Descripción: parte resaltada', max: 120 },
        { kind: 'text', key: 'text2', label: 'Descripción: final', max: 260, multiline: true },
        { kind: 'text', key: 'ctaLabel', label: 'Texto del botón (lleva a Nosotros)', max: 30, required: true },
      ] },
      { title: 'Foto', fields: [{ kind: 'image', key: 'photo', label: 'Foto de la sección' }] },
      { title: 'Íconos', help: 'Hasta 4.', fields: [{ kind: 'list', key: 'items', label: 'Íconos', min: 0, max: 4, itemTitle: 't', empty: { icon: 'seal', t: '' }, fields: [
          { kind: 'icon', key: 'icon', label: 'Ícono' },
          { kind: 'text', key: 't', label: 'Texto', max: 40, required: true },
        ] }] },
    ],
  },
  contact: {
    title: 'Contacto (llamada final)',
    intro: 'La franja azul al final de Inicio con el botón de WhatsApp.',
    groups: [
      { title: 'Textos', fields: [
        { kind: 'text', key: 'title', label: 'Título', max: 70, multiline: true, required: true, help: lineHelp },
        { kind: 'text', key: 'text', label: 'Descripción', max: 200, multiline: true, required: true },
        { kind: 'text', key: 'ctaLabel', label: 'Texto del botón', max: 30, required: true },
        { kind: 'text', key: 'ctaMessage', label: 'Mensaje de WhatsApp del botón', max: 160, required: true },
      ] },
      { title: 'Foto', fields: [{ kind: 'image', key: 'photo', label: 'Foto central' }] },
      { title: 'Beneficios', help: 'Hasta 4, a la derecha.', fields: [{ kind: 'list', key: 'items', label: 'Íconos', min: 0, max: 4, itemTitle: 't', empty: { icon: 'seal', t: '' }, fields: [
          { kind: 'icon', key: 'icon', label: 'Ícono' },
          { kind: 'text', key: 't', label: 'Texto', max: 40, required: true },
        ] }] },
    ],
  },
  about: {
    title: 'Nosotros',
    intro: 'La página /nosotros. Al terminar con la información real, desmarca el aviso “Texto de ejemplo” en Datos generales.',
    groups: [
      { title: 'El guía', help: 'El nombre y el cargo también se usan en la tarjeta de presentación y en los datos para Google.', fields: [
        { kind: 'text', key: 'guideName', label: 'Nombre', max: 60, required: true },
        { kind: 'text', key: 'guideRole', label: 'Cargo', max: 60, required: true },
        { kind: 'image', key: 'photo', label: 'Foto principal (vertical)' },
        { kind: 'image', key: 'photo2', label: 'Foto pequeña (vertical)' },
      ] },
      { title: 'Biografía', fields: [
        { kind: 'text', key: 'title', label: 'Título', max: 100, multiline: true, required: true },
        { kind: 'text', key: 'bio', label: 'Biografía', max: 3000, multiline: true, required: true, help: 'Deja una línea en blanco entre párrafos.' },
      ] },
      { title: 'Video institucional', fields: [
        { kind: 'text', key: 'videoUrl', label: 'Enlace del video', max: 300, placeholder: 'https://www.youtube.com/watch?v=…', help: 'Vacío = usa el video de la portada; si tampoco hay, muestra “Video próximamente”.' },
        { kind: 'image', key: 'videoPoster', label: 'Foto de portada del video' },
        { kind: 'text', key: 'videoTitle', label: 'Título', max: 60, required: true },
        { kind: 'text', key: 'videoText', label: 'Texto', max: 220, multiline: true, required: true },
      ] },
      { title: 'Trayectoria', help: 'Las etapas numeradas de “Cómo llegamos hasta aquí”.', fields: [
        { kind: 'list', key: 'timeline', label: 'Etapas', min: 1, max: 8, itemTitle: 't', empty: { t: '', d: '' }, fields: [
          { kind: 'text', key: 't', label: 'Título', max: 60, required: true },
          { kind: 'text', key: 'd', label: 'Descripción', max: 220, multiline: true, required: true },
        ] },
      ] },
      { title: 'Misión, visión y valores', fields: [
        { kind: 'text', key: 'mission', label: 'Misión', max: 500, multiline: true, required: true },
        { kind: 'text', key: 'vision', label: 'Visión', max: 500, multiline: true, required: true },
        { kind: 'list', key: 'values', label: 'Valores', min: 0, max: 10, itemTitle: 'v', empty: { v: '' }, fields: [
          { kind: 'text', key: 'v', label: 'Valor', max: 40, required: true },
        ] },
      ] },
      { title: 'Política de la empresa', fields: [
        { kind: 'list', key: 'policy', label: 'Puntos', min: 1, max: 9, itemTitle: 't', empty: { t: '', d: '' }, fields: [
          { kind: 'text', key: 't', label: 'Título', max: 60, required: true },
          { kind: 'text', key: 'd', label: 'Descripción', max: 300, multiline: true, required: true },
        ] },
      ] },
    ],
  },
  privacy: {
    title: 'Aviso de privacidad',
    intro: 'La página /legal/privacy. Es obligatoria porque el sitio recibe datos personales por WhatsApp y por el chat.',
    groups: [
      { title: 'Documento', help: 'Formato sencillo: deja una línea en blanco entre párrafos; empieza una línea con ## para un subtítulo y con - para una lista.', fields: [
        { kind: 'text', key: 'updated', label: 'Fecha de última actualización', max: 40, placeholder: 'Ej. 1 de noviembre de 2026' },
        { kind: 'text', key: 'body', label: 'Texto completo', max: 30000, multiline: true, help: 'Vacío = la página dice que el documento está en preparación.' },
      ] },
    ],
  },
  terms: {
    title: 'Términos y condiciones',
    intro: 'La página /legal/terms: reservas, pagos, cancelaciones y responsabilidades.',
    groups: [
      { title: 'Documento', help: 'Formato sencillo: deja una línea en blanco entre párrafos; empieza una línea con ## para un subtítulo y con - para una lista.', fields: [
        { kind: 'text', key: 'updated', label: 'Fecha de última actualización', max: 40, placeholder: 'Ej. 1 de noviembre de 2026' },
        { kind: 'text', key: 'body', label: 'Texto completo', max: 30000, multiline: true, help: 'Vacío = la página dice que el documento está en preparación.' },
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
