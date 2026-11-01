'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ready: [string, string][] = [
  ['/admin', 'Inicio'], ['/admin/general', 'Datos generales'], ['/admin/portada', 'Encabezado y portada'],
  ['/admin/experiencias', 'Experiencias'], ['/admin/vive', 'Vive la experiencia'], ['/admin/esencia', 'Nuestra esencia'], ['/admin/galeria', 'Galería'],
  ['/admin/testimonios', 'Testimonios'], ['/admin/contacto', 'Contacto'], ['/admin/nosotros', 'Nosotros'], ['/admin/privacidad', 'Aviso de privacidad'],
  ['/admin/terminos', 'Términos y condiciones'], ['/admin/tarjeta', 'Tarjeta de presentación'],
];
const soon = ['Belleza', 'Artículos', 'SEO'];

export function AdminNav() {
  const path = usePathname();
  return (
    <nav aria-label="Panel" className="mt-8 lg:-mx-2 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:px-2">
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
