'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ready: [string, string][] = [['/admin', 'Inicio'], ['/admin/general', 'Datos generales'], ['/admin/tarjeta', 'Tarjeta de presentación']];
const soon = ['Encabezado y portada', 'Experiencias', 'Galería', 'Testimonios', 'Nosotros', 'Belleza', 'Artículos', 'Textos legales', 'SEO'];

export function AdminNav() {
  const path = usePathname();
  return (
    <nav aria-label="Panel" className="mt-8">
      <ul className="space-y-1">
        {ready.map(([href, label]) => {
          const on = href === '/admin' ? path === '/admin' : path.startsWith(href);
          return <li key={href}><Link href={href} aria-current={on ? 'page' : undefined} className={`block rounded-lg px-3 py-2.5 text-[14px] font-medium ${on ? 'bg-white/10 text-gold' : 'text-white/85 hover:bg-white/5'}`}>{label}</Link></li>;
        })}
      </ul>
      <p className="mb-2 mt-6 px-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">Próximamente</p>
      <ul className="space-y-1">
        {soon.map((s) => <li key={s} className="px-3 py-1.5 text-[13px] text-white/35">{s}</li>)}
      </ul>
    </nav>
  );
}
