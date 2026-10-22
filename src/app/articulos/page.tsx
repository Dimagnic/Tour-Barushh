import type { Metadata } from 'next';
import Link from 'next/link';
import { Photo } from '@/components/Photo';
import { articles } from '@/data/articles';
import { wa } from '@/data/site';
import { goldBtn, h2, label, wrap } from '@/lib/ui';

export const metadata: Metadata = {
  title: 'Artículos: las bellezas de Puebla',
  description: 'Historias, consejos y guías sobre el centro histórico de Puebla, Cholula, los pueblos mágicos, la gastronomía y la Talavera.',
  alternates: { canonical: '/articulos' },
};

export default function Articulos() {
  const [first, ...rest] = articles;
  return (
    <>
      <section className="paper relative pb-24 pt-36 text-ink">
        <div className={wrap}>
          <p className={`${label} text-brown`}>Artículos</p>
          <h1 className={h2}>Las bellezas de Puebla</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink/80">Historias, consejos y rincones para planear tu viaje, escritos por quienes recorren Puebla todos los días.</p>

          <Link href={`/articulos/${first.slug}`} className="group mt-12 grid overflow-hidden rounded-3xl bg-[#fffdf8] shadow-[0_14px_44px_rgba(60,40,10,.16)] lg:grid-cols-[1.15fr_1fr]">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px]"><Photo id={first.cover} sizes="(min-width:1024px) 55vw, 100vw" className="vivid transition duration-500 group-hover:scale-105" /></div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-terra">{first.category} · {first.minutes} min de lectura</p>
              <h2 className="mt-3 font-display text-[2.2rem] leading-[1.1]">{first.title}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink/75">{first.excerpt}</p>
              <span className="mt-6 font-semibold text-cobalt">Leer artículo →</span>
            </div>
          </Link>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((a) => (
              <Link key={a.slug} href={`/articulos/${a.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-[#fffdf8] shadow-[0_8px_28px_rgba(60,40,10,.12)]">
                <div className="relative aspect-[4/3] overflow-hidden"><Photo id={a.cover} thumb sizes="(min-width:1280px) 30vw, (min-width:768px) 45vw, 100vw" className="vivid transition duration-500 group-hover:scale-105" /></div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-terra">{a.category} · {a.minutes} min</p>
                  <h2 className="mt-2 font-title text-[1.2rem] font-bold leading-snug">{a.title}</h2>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink/70">{a.excerpt}</p>
                  <span className="mt-4 font-semibold text-cobalt">Leer artículo →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 rounded-3xl bg-ink p-8 text-center text-white md:p-12">
            <h2 className="font-display text-[2.2rem] leading-tight md:text-[2.8rem]">¿Quieres vivirlo con un guía local?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">Cuéntanos qué te gustaría conocer y armamos el recorrido a tu medida.</p>
            <a href={wa('Hola, leí sus artículos y quisiera cotizar un tour.')} target="_blank" rel="noopener noreferrer" className={`${goldBtn} mt-6`}>Cotiza por WhatsApp →</a>
          </div>
        </div>
      </section>
    </>
  );
}
