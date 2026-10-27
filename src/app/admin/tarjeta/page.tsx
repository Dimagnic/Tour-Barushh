import type { Metadata } from 'next';
import { CardStudio } from '@/components/CardStudio';
import { label, wrap } from '@/lib/ui';

export const metadata: Metadata = { title: 'Tarjeta de presentación', robots: { index: false, follow: false } };

export default function TarjetaPage() {
  return (
    <section className="paper relative pb-24 pt-36 text-ink">
      <div className={wrap}>
        <p className={`${label} text-brown`}>Espacio del administrador</p>
        <h1 className="font-display text-[2.5rem] leading-tight md:text-[3.3rem]">Tarjeta de presentación</h1>
        <p className="mt-3 font-title text-[1.35rem] italic leading-snug text-ink/85 md:text-[1.6rem]">Más que un tour, <span className="text-brown">una experiencia</span> que se vive.</p>
        <p className="mb-10 mt-4 max-w-2xl text-[17px] leading-relaxed text-ink/80">Edita los datos, descarga la tarjeta en PDF o imagen, imprímela o envíala por WhatsApp o correo, con su código QR.</p>
        <p className="mb-10 w-fit rounded-lg border border-brown/40 bg-[#fffdf8] px-4 py-2 text-[13px] text-ink/70">Esta página no aparece en el menú ni en Google y solo muestra datos públicos de contacto. El acceso con contraseña llegará con el panel administrativo.</p>
        <CardStudio />
      </div>
    </section>
  );
}
