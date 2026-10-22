import type { Metadata } from 'next';
import { Photo } from '@/components/Photo';
import { Icon } from '@/components/Icon';
import { Torn } from '@/components/Torn';
import { BellezaCatalog } from '@/components/BellezaCatalog';
import { ExampleNote } from '@/components/ExampleNote';
import { wa } from '@/data/site';
import { ingredients } from '@/data/belleza';
import { goldBtn, h2, label, wrap } from '@/lib/ui';

export const metadata: Metadata = {
  title: 'Artículos de belleza naturales y artesanales',
  description: 'Jabones, cremas, bálsamos y más, hechos a mano con ingredientes naturales. Pregunta por WhatsApp y coordinamos tu pedido.',
  alternates: { canonical: '/belleza' },
};

const pillars = [
  { icon: 'flower' as const, t: 'Naturales', d: 'Ingredientes de origen vegetal como aloe, avena, miel, cacao y flores, elegidos por su aroma y su suavidad.' },
  { icon: 'culture' as const, t: 'Artesanales', d: 'Elaborados a mano en lotes pequeños, con el cuidado de quien conoce cada receta.' },
  { icon: 'seal' as const, t: 'Con historia', d: 'Nacen del origen de José Carranza, que empezó entre productos naturales y artesanales antes de ser guía.' },
];
const steps = ['Elige tu producto en el catálogo.', 'Escríbenos por WhatsApp y confirmamos disponibilidad y precio.', 'Coordinamos la entrega o la recolección contigo.'];

export default function Belleza() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#06182a] pb-24 pt-40 text-white">
        <Photo id="cascada-lejana" sizes="100vw" className="vivid object-[50%_40%]" />
        <div className="absolute inset-0 bg-[#0b4a7a]/40 mix-blend-color" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,19,33,.94),rgba(4,28,46,.7),rgba(4,28,46,.4))]" />
        <div className={wrap}>
          <p className={`${label} text-gold`}>Hecho a mano</p>
          <h1 className="max-w-3xl font-display text-[2.8rem] leading-[1.05] md:text-[4.2rem]">Artículos de belleza naturales y artesanales</h1>
          <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/90">Jabones, cremas, bálsamos y aromas elaborados a mano, con ingredientes naturales y mucho cariño.</p>
          <div className="mt-8"><a href={wa('Hola, quisiera conocer el catálogo de artículos de belleza.')} target="_blank" rel="noopener noreferrer" className={goldBtn}>Pedir el catálogo por WhatsApp →</a></div>
        </div>
      </section>

      <section className="paper relative z-10 -mt-10 text-ink">
        <Torn className="paper" />
        <div className={`${wrap} pb-8 pt-28`}>
          <p className={`${label} text-brown`}>Nuestra forma de hacerlo</p>
          <h2 className={h2}>Lo natural, a su ritmo</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.t} className="rounded-3xl bg-[#fffdf8] p-7 shadow-[0_8px_28px_rgba(60,40,10,.1)]">
                <Icon name={p.icon} className="size-11 text-brown" />
                <h3 className="mt-3 font-display text-[1.7rem]">{p.t}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink/75">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
        <div id="catalogo" className={`${wrap} pb-20 pt-16`}>
          <p className={`${label} text-brown`}>Catálogo</p>
          <h2 className={h2}>Nuestros productos</h2>
          <ExampleNote className="mt-4" />
          <div className="mt-8"><BellezaCatalog /></div>
        </div>
      </section>

      <section className="relative z-20 -mt-10 text-white">
        <Torn b className="bg-[#06182a]" />
        <div className={`${wrap} grid gap-12 pb-24 pt-28 lg:grid-cols-2`}>
          <div>
            <p className={`${label} text-gold`}>Ingredientes</p>
            <h2 className={h2}>Lo que usamos</h2>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {ingredients.map((i) => <li key={i} className="rounded-full border border-white/25 px-4 py-2 text-[14px]">{i}</li>)}
            </ul>
            <p className="mt-6 max-w-lg text-[14px] leading-relaxed text-white/70">Son cosméticos artesanales. Si tienes piel sensible o alergias, revisa los ingredientes y prueba primero en una zona pequeña. Si dudas, consulta a un profesional de la salud.</p>
          </div>
          <div>
            <p className={`${label} text-gold`}>Cómo pedir</p>
            <h2 className={h2}>Sin compra en línea</h2>
            <ol className="mt-8 space-y-5">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4"><span className="font-script text-4xl leading-none text-gold">0{i + 1}</span><p className="pt-1 text-[17px] leading-relaxed text-white/90">{s}</p></li>
              ))}
            </ol>
            <a href={wa('Hola, quisiera hacer un pedido de artículos de belleza.')} target="_blank" rel="noopener noreferrer" className={`${goldBtn} mt-8`}>Hacer mi pedido por WhatsApp →</a>
          </div>
        </div>
      </section>
    </>
  );
}
