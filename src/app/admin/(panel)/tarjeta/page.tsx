import type { Metadata } from 'next';
import { CardStudio } from '@/components/CardStudio';
import { getContent, getGeneral } from '@/lib/cms';
import { label } from '@/lib/ui';

export const metadata: Metadata = { title: 'Tarjeta de presentación' };

export default async function TarjetaPage() {
  const [g, about] = await Promise.all([getGeneral(), getContent('about')]);
  return (
    <section className="text-ink">
      <div>
        <p className={`${label} text-brown`}>Espacio del administrador</p>
        <h1 className="font-display text-[2.5rem] leading-tight md:text-[3.3rem]">Tarjeta de presentación</h1>
        <p className="mt-3 font-title text-[1.35rem] italic leading-snug text-ink/85 md:text-[1.6rem]">Más que un tour, <span className="text-brown">una experiencia</span> que se vive.</p>
        <p className="mb-10 mt-4 max-w-2xl text-[17px] leading-relaxed text-ink/80">Edita los datos, descarga la tarjeta en PDF o imagen, imprímela o envíala por WhatsApp o correo, con su código QR.</p>
        <CardStudio phone={g.whatsapp} email={g.email} name={about.guideName} role={about.guideRole} />
      </div>
    </section>
  );
}
