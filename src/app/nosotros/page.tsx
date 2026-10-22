import type { Metadata } from 'next';
import { Photo } from '@/components/Photo';
import { Icon } from '@/components/Icon';
import { Torn } from '@/components/Torn';
import { ExampleNote } from '@/components/ExampleNote';
import { site, wa } from '@/data/site';
import { bio, mission, policy, timeline, values, vision } from '@/data/about';
import { darkBtn, goldBtn, h2, label, wrap } from '@/lib/ui';

export const metadata: Metadata = {
  title: 'Nosotros: historia, misión, visión y política',
  description: 'Conoce al guía fundador de Tour Barushh, su historia, la misión y visión de la empresa y nuestra política de servicio.',
  alternates: { canonical: '/nosotros' },
};

export default function Nosotros() {
  return (
    <>
      {/* BIOGRAFÍA */}
      <section id="historia" className="paper relative overflow-x-clip pb-24 pt-36 text-ink">
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]`}>
          <div className="relative mx-auto h-[460px] w-full max-w-[460px] sm:h-[560px]">
            <figure className="polaroid absolute left-0 top-0 w-[78%] -rotate-3">
              <div className="relative aspect-[3/4]"><Photo id={site.guide.photo} sizes="(min-width:1024px) 34vw, 70vw" className="vivid object-[50%_30%]" /></div>
              <figcaption className="pt-3 text-center font-script text-[1.45rem] leading-none text-ink/80">{site.guide.name}</figcaption>
            </figure>
            <figure className="polaroid absolute -right-2 bottom-0 w-[46%] rotate-6 sm:-right-8">
              <div className="relative aspect-[3/4]"><Photo id={site.guide.photo2} thumb sizes="22vw" className="vivid" /></div>
            </figure>
          </div>
          <div>
            <p className={`${label} text-brown`}>Conoce al guía</p>
            <h1 className={h2}>De los productos artesanales a guiar a viajeros de todo el mundo</h1>
            <ExampleNote className="mt-5" />
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink/80">
              {bio.map((p) => <p key={p}>{p}</p>)}
            </div>
            <p className="mt-6 font-display text-[1.6rem] text-ink">{site.guide.name}</p>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-brown">{site.guide.role}</p>
            <a href={wa('Hola, me gustaría hablar con el guía de Tour Barushh.')} target="_blank" rel="noopener noreferrer" className={`${darkBtn} mt-7`}>Habla con un guía →</a>
          </div>
        </div>
      </section>

      {/* TRAYECTORIA */}
      <section className="relative z-10 -mt-10 text-white">
        <Torn className="bg-[#06182a]" />
        <div className={`${wrap} pb-24 pt-28`}>
          <p className={`${label} text-gold`}>Su camino</p>
          <h2 className={h2}>Cómo llegamos hasta aquí</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-5">
            {timeline.map((s, i) => (
              <li key={s.t} className="relative border-t border-white/25 pt-6">
                <span className="absolute -top-[9px] left-0 size-[17px] rounded-full bg-gold" aria-hidden="true" />
                <p className="font-script text-3xl text-gold">0{i + 1}</p>
                <h3 className="mt-1 font-title text-[1.15rem] font-bold">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section id="mision" className="paper relative z-20 -mt-10 text-ink">
        <Torn b className="paper" />
        <div className={`${wrap} pb-24 pt-28`}>
          <p className={`${label} text-brown`}>Quiénes somos</p>
          <h2 className={h2}>Misión y visión</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[{ t: 'Misión', d: mission, icon: 'pin' as const }, { t: 'Visión', d: vision, icon: 'mountain' as const }].map((c) => (
              <article key={c.t} className="rounded-3xl bg-[#fffdf8] p-8 shadow-[0_10px_34px_rgba(60,40,10,.12)]">
                <Icon name={c.icon} className="size-12 text-brown" />
                <h3 className="mt-4 font-display text-[2rem]">{c.t}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-ink/80">{c.d}</p>
              </article>
            ))}
          </div>
          <ul className="mt-10 flex flex-wrap gap-3" aria-label="Valores">
            {values.map((v) => <li key={v} className="rounded-full border border-brown/40 px-5 py-2 text-[14px] font-medium">{v}</li>)}
          </ul>
        </div>
      </section>

      {/* POLÍTICA */}
      <section id="politica" className="relative z-30 -mt-10 text-white">
        <Torn className="bg-[#06182a]" />
        <div className={`${wrap} pb-24 pt-28`}>
          <p className={`${label} text-gold`}>Nuestro compromiso</p>
          <h2 className={h2}>Política de la empresa</h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {policy.map((p, i) => (
              <li key={p.t} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <p className="font-script text-3xl text-gold">0{i + 1}</p>
                <h3 className="mt-1 font-title text-[1.15rem] font-bold">{p.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">{p.d}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12"><a href={wa('Hola, quisiera cotizar un tour con Tour Barushh.')} target="_blank" rel="noopener noreferrer" className={goldBtn}>Cotiza por WhatsApp →</a></div>
        </div>
      </section>
    </>
  );
}
