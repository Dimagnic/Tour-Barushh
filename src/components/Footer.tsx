import Image from 'next/image';
import Link from 'next/link';
import { nav, site } from '@/data/site';
import { experiences } from '@/data/content';

const icons: Record<string, React.ReactNode> = {
  instagram: <g fill="none" stroke="currentColor" strokeWidth="1.800"><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.800" /><circle cx="17" cy="7" r=".6" fill="currentColor" /></g>,
  facebook: <path d="M14 8h2V5h-2.500C11 5 10 6.600 10 8.700V11H8v3h2v6h3v-6h2.300l.4-3H13V9c0-.6.3-1 1-1z" fill="currentColor" />,
  tiktok: <path d="M16 3c.3 2.200 1.700 3.600 4 3.800v3c-1.500 0-2.900-.5-4-1.300V15a6 6 0 1 1-6-6v3.100a3 3 0 1 0 3 2.900V3z" fill="currentColor" />,
  youtube: <g fill="none" stroke="currentColor" strokeWidth="1.800"><path d="M3 8c0-2 1-3 3-3h12c2 0 3 1 3 3v8c0 2-1 3-3 3H6c-2 0-3-1-3-3z" /><path d="M10 9.500v5l4.500-2.500z" fill="currentColor" /></g>,
};

export function Footer() {
  const head = 'mb-5 text-sm font-bold uppercase tracking-[0.14em] text-gold';
  const link = 'block py-1.5 hover:text-white';
  return (
    <footer className="bg-ink text-white/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1fr_1.2fr]">
        <div>
          <Image src="/brand/logo.webp" alt="Tour Barushh, guías de turismo en Puebla" width={112} height={112} className="size-28" />
          <p className="mt-5 max-w-xs leading-relaxed">Guías de turismo en Puebla, México: tours culturales, pueblos mágicos y viajes para grupos.</p>
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-bold text-[#4ade80] hover:underline">WhatsApp: {site.whatsappDisplay}</a>
          {site.email ? <a href={`mailto:${site.email}`} className="mt-1 block hover:text-white">{site.email}</a> : null}
          {site.hours ? <p className="mt-1">{site.hours}</p> : null}
          <div className="mt-5 flex gap-3">
            {Object.keys(icons).map((k) => {
              const url = site.social[k];
              const cls = 'grid size-10 place-items-center rounded-full border border-white/20';
              const svg = <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">{icons[k]}</svg>;
              return url ? (
                <a key={k} href={url} target="_blank" rel="noopener noreferrer" aria-label={k} className={`${cls} hover:border-gold hover:text-gold`}>{svg}</a>
              ) : (
                <span key={k} title="Próximamente" aria-label={`${k}: próximamente`} className={`${cls} opacity-50`}>{svg}</span>
              );
            })}
          </div>
        </div>
        <nav aria-label="Navegación">
          <h2 className={head}>Navegación</h2>
          {nav.map(([href, label]) => <Link key={href} className={link} href={href}>{label}</Link>)}
        </nav>
        <div>
          <h2 className={head}>Experiencias</h2>
          {experiences.map((e) => <Link key={e.title} className={link} href="/#experiencias">{e.title}</Link>)}
        </div>
        <div>
          <h2 className={head}>Legal</h2>
          <Link className={link} href="/legal/privacy">Aviso de privacidad</Link>
          <Link className={link} href="/legal/terms">Términos y condiciones</Link>
        </div>
        <div>
          <h2 className={head}>Asistente virtual</h2>
          <Image src="/brand/qr-clienteai.png" alt="Código QR del asistente virtual ClienteAI" width={190} height={222} className="h-auto w-[190px] rounded-xl" />
          <p className="mt-4 max-w-[190px]">Escanea el código y chatea con nuestro asistente.</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 pb-12 pt-6 text-sm">
          <p className="max-w-[15rem] sm:max-w-none">© {new Date().getFullYear()} Tour Barushh. Todos los derechos reservados.</p>
          <p className="flex items-center gap-3">
            <span className="font-bold uppercase tracking-[0.14em]">Diseñado por</span>
            <a href={site.ceroUrl} target="_blank" rel="noopener noreferrer" aria-label="Cero+, sitio de quien diseñó esta página" className="rounded-lg bg-white px-3 py-1.5 transition hover:brightness-95"><Image src="/brand/cero.webp" alt="Cero+" width={96} height={30} className="h-[26px] w-auto" /></a>
          </p>
        </div>
      </div>
    </footer>
  );
}
