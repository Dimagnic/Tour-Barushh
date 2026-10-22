import type { Kind } from '@/data/belleza';

/** Ilustración sencilla del tipo de producto (sustituye a la foto mientras el cliente no la entregue). */
export function ProductArt({ kind, fg }: { kind: Kind; fg: string }) {
  const stroke = { stroke: fg, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  const leaf = <path d="M0 0c10-12 24-12 30 0-8 12-22 12-30 0zM0 0l30 0" {...stroke} transform="translate(86 76) rotate(-25)" />;
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" role="img" aria-label="Ilustración del producto">
      {kind === 'soap' && <g><rect x="52" y="48" width="96" height="64" rx="16" fill={fg} opacity=".16" /><rect x="52" y="48" width="96" height="64" rx="16" {...stroke} />{leaf}</g>}
      {kind === 'jar' && <g><rect x="64" y="52" width="72" height="62" rx="12" fill={fg} opacity=".16" /><rect x="64" y="52" width="72" height="62" rx="12" {...stroke} /><rect x="58" y="36" width="84" height="20" rx="8" {...stroke} /><path d="M86 84c6-8 16-8 22 0-6 8-16 8-22 0z" {...stroke} /></g>}
      {kind === 'bottle' && <g><rect x="76" y="62" width="48" height="64" rx="14" fill={fg} opacity=".16" /><rect x="76" y="62" width="48" height="64" rx="14" {...stroke} /><path d="M90 62V46h20v16M94 46V30h12v16" {...stroke} /><path d="M92 92h16" {...stroke} /></g>}
      {kind === 'tin' && <g><ellipse cx="100" cy="92" rx="50" ry="26" fill={fg} opacity=".16" /><ellipse cx="100" cy="92" rx="50" ry="26" {...stroke} /><ellipse cx="100" cy="82" rx="50" ry="26" {...stroke} /><path d="M88 82c6-8 18-8 24 0-6 8-18 8-24 0z" {...stroke} /></g>}
      {kind === 'spray' && <g><rect x="72" y="66" width="56" height="62" rx="14" fill={fg} opacity=".16" /><rect x="72" y="66" width="56" height="62" rx="14" {...stroke} /><path d="M92 66V50h16v16M88 50h28l6-8h-18" {...stroke} /><path d="M126 36l12-6M128 46l14 0" {...stroke} /></g>}
      {kind === 'bowl' && <g><path d="M48 78h104c0 30-22 48-52 48S48 108 48 78z" fill={fg} opacity=".16" /><path d="M48 78h104c0 30-22 48-52 48S48 108 48 78z" {...stroke} /><circle cx="84" cy="66" r="5" {...stroke} /><circle cx="104" cy="58" r="6" {...stroke} /><circle cx="122" cy="68" r="4" {...stroke} /></g>}
    </svg>
  );
}
