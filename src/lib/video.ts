/**
 * Convierte el enlace que se pega en site.ts en algo reproducible:
 * YouTube (watch, youtu.be, shorts, embed), Vimeo o un archivo de video (.mp4/.webm, propio o externo).
 */
export function videoSource(url: string): { kind: 'iframe' | 'file'; src: string } | null {
  const u = url.trim();
  if (!u) return null;
  const yt = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1` };
  const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { kind: 'iframe', src: `https://player.vimeo.com/video/${vm[1]}?autoplay=1&dnt=1` };
  if (/\.(mp4|webm|mov)(\?|#|$)/i.test(u)) return { kind: 'file', src: u };
  return null;
}
