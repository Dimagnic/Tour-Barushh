import Link from 'next/link';
import { getAdmin } from '@/lib/supabase/server';

export default async function Dashboard() {
  const { sb } = await getAdmin();
  const { data } = await sb.from('content').select('key, updated_at').order('updated_at', { ascending: false });
  const last = data?.[0];
  const cards: [string, string, string][] = [
    ['/admin/general', 'Datos generales', 'WhatsApp, correo, horario, redes sociales, mensajes y asistente virtual.'],
    ['/admin/tarjeta', 'Tarjeta de presentación', 'Descarga tu tarjeta en PDF o imagen, con código QR.'],
  ];
  return (
    <div className="max-w-4xl">
      <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-brown">Bienvenido</p>
      <h1 className="mt-2 font-display text-[2.6rem] leading-tight">Panel de Tour Barushh</h1>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink/75">Desde aquí actualizas la información del sitio. Al guardar, los cambios se publican al instante. El diseño, los colores y el acomodo están protegidos para que el sitio siempre se vea bien.</p>
      {last ? <p className="mt-2 text-[13px] text-ink/55">Último cambio: {new Date(last.updated_at).toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short', timeZone: 'America/Mexico_City' })}</p> : null}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {cards.map(([href, t, d]) => (
          <Link key={href} href={href} className="rounded-2xl bg-[#fffdf8] p-6 shadow-[0_8px_26px_rgba(60,40,10,.1)] transition hover:-translate-y-0.5">
            <h2 className="font-title text-[1.2rem] font-bold">{t}</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-ink/70">{d}</p>
            <span className="mt-4 inline-block font-semibold text-cobalt">Editar →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
