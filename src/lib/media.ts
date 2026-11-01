import photos from '@/data/photos.json';

/** Biblioteca de fotos del sitio (public/photos) y fotos subidas desde el panel (Supabase Storage, carpeta media). */
export interface LibraryPhoto { id: string; cat: string; src: string; thumb: string; w: number; h: number; es: string }
export const library = photos as LibraryPhoto[];

export const MEDIA_PREFIX = `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''}/storage/v1/object/public/media/`;
export const isUpload = (v: string) => /^https?:\/\//.test(v) && v.includes('/storage/v1/object/public/media/');
export const findPhoto = (id: string) => library.find((p) => p.id === id);
/** Una foto es válida si existe en la biblioteca o fue subida al almacenamiento de este proyecto. */
export const isValidImage = (v: string) => Boolean(findPhoto(v)) || (MEDIA_PREFIX.length > 40 && v.startsWith(MEDIA_PREFIX));
/** Miniatura para el panel. */
export const previewSrc = (v: string) => findPhoto(v)?.thumb ?? (isUpload(v) ? v : '');
/** Ruta o URL completa de una foto (para metadatos y datos estructurados). */
export const imageUrl = (v: string) => findPhoto(v)?.src ?? v;
