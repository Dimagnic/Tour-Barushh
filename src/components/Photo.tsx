import Image from 'next/image';
import photos from '@/data/photos.json';

interface PhotoData { id: string; cat: string; src: string; thumb: string; w: number; h: number; es: string; en: string }
const list = photos as PhotoData[];

export function getPhoto(id: string): PhotoData {
  const p = list.find((x) => x.id === id);
  if (!p) throw new Error(`Foto no encontrada: ${id}`);
  return p;
}

/** Rellena el contenedor padre (que debe ser `relative` y tener proporción definida). */
export function Photo({ id, sizes, priority, thumb, className = '' }: {
  id: string; sizes: string; priority?: boolean; thumb?: boolean; className?: string;
}) {
  const p = getPhoto(id);
  return <Image src={thumb ? p.thumb : p.src} alt={p.es} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />;
}
