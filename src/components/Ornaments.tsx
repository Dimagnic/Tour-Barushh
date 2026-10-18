/** Elementos decorativos de la propuesta: sellos, flechas a mano y hojas. */
export function Stamp({ text, id, className = '', children }: { text: string; id: string; className?: string; children?: React.ReactNode }) {
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.200">
      <defs><path id={id} d="M70 70m-54 0a54 54 0 1 1 108 0a54 54 0 1 1-108 0" /></defs>
      <circle cx="70" cy="70" r="66" /><circle cx="70" cy="70" r="41" />
      <text fontSize="9.500" letterSpacing="3.200" fill="currentColor" stroke="none" fontFamily="Poppins, sans-serif"><textPath href={`#${id}`}>{text}</textPath></text>
      {children}
    </svg>
  );
}
export const Mandala = () => (
  <g>{Array.from({ length: 12 }).map((_, i) => <path key={i} d="M70 70V36" transform={`rotate(${i * 30} 70 70)`} />)}<circle cx="70" cy="70" r="12" /><circle cx="70" cy="70" r="26" /></g>
);
export const MountainMark = () => (<g><path d="M38 86l22-32 14 18 10-12 18 26z" fill="currentColor" opacity=".35" /><path d="M38 86l22-32 14 18 10-12 18 26z" /></g>);

export function CurvedArrow({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 90 60" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M6 8c4 28 30 44 74 40" /><path d="M68 40l13 8-11 9" />
    </svg>
  );
}
export function Leaves({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 200" className={className} aria-hidden="true" fill="#c9983a">
      <path d="M60 195c0-60 0-110 14-180" stroke="#a97b2a" strokeWidth="2" fill="none" />
      <path d="M62 150c-30-4-48-24-50-50 28 2 46 22 50 50zM66 110c30-6 46-28 46-54-28 4-44 26-46 54zM70 60c-22-6-32-24-30-44 22 6 30 24 30 44z" opacity=".9" />
    </svg>
  );
}
