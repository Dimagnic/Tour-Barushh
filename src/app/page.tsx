import Link from 'next/link';
import { Photo } from '@/components/Photo';
import { Icon } from '@/components/Icon';
import { Carousel } from '@/components/Carousel';
import { CurvedArrow, Leaves, Mandala, MountainMark, Stamp } from '@/components/Ornaments';
import { Torn } from '@/components/Torn';
import { VideoModal } from '@/components/VideoModal';
import { Lines } from '@/components/Lines';
import { getContent, getGeneral, waLink } from '@/lib/cms';
import { darkBtn as dark, goldBtn as gold, h2Home as h2, label, wrap } from '@/lib/ui';

export default async function Home() {
  const [g, hero, exp, gal, tes, liv, ess, con] = await Promise.all([
    getGeneral(), getContent('hero'), getContent('experiences'), getContent('gallery'), getContent('testimonials'),
    getContent('living'), getContent('essence'), getContent('contact'),
  ]);
  const wa = waLink(g.whatsapp);
  const reserve = wa(g.reserveMessage);
  return (
    <>
      {/* PORTADA */}
      <section id="inicio" className="relative z-0 flex min-h-[720px] flex-col overflow-hidden bg-[#031321] text-white lg:h-[100svh] lg:max-h-[880px]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[70%] lg:[-webkit-mask-image:linear-gradient(90deg,transparent,#000_32%)] lg:[mask-image:linear-gradient(90deg,transparent,#000_32%)]"><Photo id={hero.photo} priority sizes="70vw" className="vivid object-[50%_30%]" /></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#031321_0%,rgba(3,19,33,.93)_28%,rgba(3,19,33,.4)_56%,rgba(3,19,33,0)_80%)]" />
        <div className="absolute inset-0 bg-ink/45 lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#031321]/85 to-transparent" />
        <div className={`${wrap} flex w-full flex-1 flex-col justify-center pb-6 pt-32`}>
          <h1 className="max-w-[640px] font-display text-[3rem] leading-[1.08] sm:text-[3.9rem] lg:text-[4.5rem]">
            {hero.line1}<br /><em className="font-title font-normal italic text-gold">{hero.highlight}</em><br />{hero.line3}
          </h1>
          <p className="mt-6 max-w-[440px] text-[17px] leading-relaxed text-white/95">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-7">
            <a href={reserve} target="_blank" rel="noopener noreferrer" className={gold}>{hero.ctaLabel} →</a>
            {hero.videoUrl ? (
              <VideoModal url={hero.videoUrl} title="Conoce Tour Barushh en 1 minuto" className="flex items-center gap-3 text-left text-[13px] font-medium leading-tight hover:text-gold">
                <span className="grid size-12 place-items-center rounded-full border-2 border-gold text-gold"><Icon name="play" className="size-5" /></span>Conoce Tour Barushh<br />en 1 minuto
              </VideoModal>
            ) : null}
          </div>
          <div className="pointer-events-none absolute right-[13%] top-[50%] hidden -rotate-[8deg] font-script text-[2.9rem] leading-[1.05] text-white lg:block">Descubre<br />&nbsp;&nbsp;Vive<br />&nbsp;&nbsp;&nbsp;Conecta<CurvedArrow className="absolute -right-16 -top-2 w-16 text-white" /></div>
        </div>
        <ul className={`${wrap} mb-24 grid w-full grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:mb-28 lg:max-w-[1400px] lg:grid-cols-5 lg:pr-[34%]`}>
          {hero.features.map((f) => (
            <li key={f.t} className="flex flex-col items-start gap-3 text-[12px] font-medium leading-snug text-white/95"><Icon name={f.icon} className="size-11 text-white" />{f.t}</li>
          ))}
        </ul>
      </section>

      {/* EXPERIENCIAS ÚNICAS */}
      {exp.visible ? (
      <section id="experiencias" className="relative z-10 -mt-14 overflow-x-clip pb-24 text-ink">
        <Torn className="paper" />
        <div aria-hidden="true" className="talavera absolute left-0 top-[330px] hidden h-44 w-14 rounded-r-[60px] opacity-95 lg:block" />
        <div className={`${wrap} pt-24 lg:pt-28`}>
          <div className="grid items-start gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative">
              <p className={`${label} text-brown`}>{exp.label}</p>
              <h2 className={h2}><Lines text={exp.title} /></h2>
              <Stamp id="st1" text="EXPERIENCIAS · ÚNICAS · PUEBLA · " className="absolute right-0 top-8 hidden size-[104px] text-ink/70 xl:block"><Mandala /></Stamp>
              <p className="mt-6 max-w-[440px] text-[17px] leading-relaxed text-ink/85">{exp.text}</p>
              <Link href="/#experiencias-lista" className={`${dark} mt-8`}>Ver todas las experiencias →</Link>
            </div>
            <div className="relative h-[330px] sm:h-[420px] lg:-mt-40 lg:h-[470px]">
              <figure className="polaroid absolute left-[2%] top-[8%] w-[62%] -rotate-[4deg]"><div className="relative aspect-[4/3]"><Photo id={exp.photoA} sizes="(min-width:1024px) 30vw, 60vw" className="vivid" /></div></figure>
              <figure className="polaroid absolute -right-[4%] top-0 w-[47%] rotate-[7deg]"><div className="relative aspect-[4/3]"><Photo id={exp.photoB} sizes="(min-width:1024px) 24vw, 45vw" className="vivid" /></div></figure>
              <p className="absolute -left-2 bottom-2 hidden max-w-[190px] -rotate-6 font-script text-[1.55rem] leading-tight text-ink/80 sm:block lg:-left-24 lg:bottom-4">{exp.script}<CurvedArrow className="mt-1 w-14 text-ink/70" /></p>
            </div>
          </div>
          <div id="experiencias-lista" className="relative mt-14 rounded-[28px] bg-[#fbf8f0]/90 p-4 shadow-[0_12px_40px_rgba(60,40,10,.14)] sm:p-5">
            <Carousel label="Experiencias" basis="basis-[82%] sm:basis-[calc(50%-10px)] lg:basis-[calc(25%-15px)]" arrowClass="top-[34%]">
              {exp.items.map((e, i) => (
                <article key={`${e.title}-${i}`} className="relative flex h-full flex-col">
                  <div className="relative">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl"><Photo id={e.photo} thumb alt={e.title} sizes="(min-width:1024px) 22vw, 80vw" className="vivid" /></div>
                    <span className="absolute -bottom-4 left-4 z-10 flex items-center gap-1.5 rounded-full border border-gold/60 bg-[#fffdf8] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] shadow-sm"><Icon name="pin" className="size-3.5" />{e.place}</span>
                  </div>
                  <div className="flex flex-1 flex-col rounded-b-2xl bg-[#fffdf8] p-5 pt-8 shadow-sm">
                    <h3 className="font-title text-[1.15rem] font-bold leading-snug">{e.title}</h3>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink/70">{e.text}</p>
                    <a href={wa(`Hola, quiero información sobre: ${e.title}.`)} target="_blank" rel="noopener noreferrer" className="mt-4 w-fit rounded-full border border-brown/50 px-5 py-2 text-[13px] font-medium hover:border-ink">Ver más →</a>
                  </div>
                </article>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      ) : null}

      {/* VIVE LA EXPERIENCIA */}
      {liv.visible ? (
      <section className="relative z-20 -mt-12 overflow-x-clip text-white">
        <Torn b className="bg-[#06182a]">
          <Photo id="cascada-lejana" sizes="100vw" className="vivid object-[50%_30%]" />
          <div className="absolute inset-0 bg-[#0b4a7a]/45 mix-blend-color" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,19,33,.93),rgba(4,28,46,.55)_50%,rgba(4,28,46,.12))]" />
        </Torn>
        <div className={`${wrap} grid items-center gap-12 pb-24 pt-28 lg:grid-cols-[1fr_1.05fr]`}>
          <div className="relative">
            <p className={`${label} text-gold`}>{liv.label}</p>
            <h2 className={h2}><Lines text={liv.title} /></h2>
            <p className="mt-6 max-w-[470px] text-[17px] leading-relaxed text-white/90">{liv.text}</p>
            <a href={wa(liv.ctaMessage)} target="_blank" rel="noopener noreferrer" className={`${gold} mt-8`}>{liv.ctaLabel} →</a>
            <ul className="mt-10 grid max-w-[560px] grid-cols-2 gap-6 sm:grid-cols-4">
              {liv.items.map((l, i) => <li key={`${l.t}-${i}`} className="flex flex-col items-center gap-3 text-center text-[12px] font-medium"><Icon name={l.icon} className="size-11" />{l.t}</li>)}
            </ul>
          </div>
          <div className="relative">
            <CurvedArrow className="absolute -left-14 -top-14 hidden w-24 -rotate-12 text-gold lg:block" />
            <figure className="polaroid -rotate-[3deg] lg:-mr-16"><div className="relative aspect-[4/3]"><Photo id={liv.photo} sizes="(min-width:1024px) 52vw, 100vw" className="vivid" /></div></figure>
            <p className="absolute -left-4 bottom-10 hidden max-w-[150px] -rotate-6 font-script text-[1.6rem] leading-tight text-white lg:block">{liv.script}</p>
          </div>
        </div>
      </section>

      ) : null}

      {/* NUESTRA ESENCIA */}
      {ess.visible ? (
      <section id="nosotros" className="relative z-30 -mt-12 overflow-x-clip text-ink">
        <Torn className="paper" />
        <div className="relative grid items-center lg:grid-cols-[1fr_1fr]">
          <div className="relative h-[380px] sm:h-[480px] lg:h-[620px]"><div className="torn-photo absolute inset-0 top-10 overflow-hidden"><Photo id={ess.photo} sizes="(min-width:1024px) 50vw, 100vw" className="vivid object-[50%_30%]" /></div></div>
          <div className="relative max-w-[680px] px-5 py-20 lg:px-14">
            <Stamp id="st2" text="CULTURA · NATURALEZA · GASTRONOMÍA · GENTE · " className="absolute right-6 top-10 hidden size-[118px] text-ink/45 xl:block"><MountainMark /></Stamp>
            <Leaves className="absolute -right-5 bottom-24 hidden h-44 opacity-80 lg:block" />
            <p className={`${label} text-brown`}>{ess.label}</p>
            <h2 className={h2}><Lines text={ess.title} /></h2>
            <p className="mt-6 max-w-[500px] text-[17px] leading-relaxed text-ink/75">{ess.text}{ess.highlight ? <> <span className="text-ink">{ess.highlight}</span></> : null}{ess.text2 ? ` ${ess.text2}` : null}</p>
            <Link href="/nosotros" className={`${dark} mt-8`}>{ess.ctaLabel} →</Link>
            <ul className="mt-10 grid max-w-[560px] grid-cols-2 gap-6 sm:grid-cols-4">
              {ess.items.map((l, i) => <li key={`${l.t}-${i}`} className="flex flex-col items-center gap-3 text-center text-[12px] font-medium"><Icon name={l.icon} className="size-11" />{l.t}</li>)}
            </ul>
          </div>
        </div>
      </section>

      ) : null}

      {/* GALERÍA */}
      {gal.visible ? (
      <section id="galeria" className="relative z-40 -mt-10 overflow-x-clip text-white">
        <Torn b className="bg-[#06182a]">
          <Photo id="cascada-lejana" sizes="100vw" className="vivid object-[50%_70%]" />
          <div className="absolute inset-0 bg-[#0b4a7a]/45 mix-blend-color" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,19,33,.5),rgba(3,19,33,.82))]" />
        </Torn>
        <div className={`${wrap} pb-24 pt-24`}>
          <p className={`${label} text-gold`}>{gal.label}</p>
          <div className="flex flex-wrap items-end gap-x-10">
            <h2 className={h2}><Lines text={gal.title} /></h2>
            <p className="mb-2 -rotate-6 font-script text-[1.8rem] leading-tight text-white"><Lines text={gal.script} /><CurvedArrow flip className="ml-2 inline-block w-12 text-gold" /></p>
          </div>
          <div className="mt-10">
            <Carousel label="Galería de fotos" basis="basis-[82%] sm:basis-[calc(50%-10px)] lg:basis-[calc(25%-15px)]" arrowClass="top-1/2">
              {gal.items.map((it, i) => <div key={`${it.photo}-${i}`} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20"><Photo id={it.photo} alt={it.alt} thumb sizes="(min-width:1024px) 24vw, 80vw" className="vivid" /></div>)}
            </Carousel>
          </div>
        </div>
      </section>

      ) : null}

      {/* TESTIMONIOS */}
      {tes.visible && tes.items.length ? (
      <section id="testimonios" className="relative z-50 -mt-10 text-ink">
        <Torn b className="paper" />
        <div className={`${wrap} grid items-center gap-10 pb-24 pt-28 lg:grid-cols-[1fr_2.6fr]`}>
          <div>
            <p className={`${label} text-brown`}>{tes.label}</p>
            <h2 className={h2}><Lines text={tes.title} /></h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {tes.items.map((t, i) => (
              <figure key={`${t.name}-${i}`} className="flex flex-col rounded-3xl bg-[#fffdf8] p-6 shadow-[0_8px_26px_rgba(60,40,10,.1)]">
                <p aria-label="5 de 5 estrellas" className="text-[17px] tracking-[0.2em] text-gold">★★★★★</p>
                <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-ink/75">“{t.text}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 text-[13px] text-ink/70"><span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-cobalt font-semibold text-white">{t.name[0]}</span>{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      ) : null}

      {/* LLAMADA FINAL */}
      <section id="contacto" className="relative z-[60] grid bg-navy text-white lg:grid-cols-[120px_1.45fr_0.9fr_1.05fr]">
        <div aria-hidden="true" className="talavera h-16 lg:h-auto" />
        <div className="px-6 py-14 lg:px-12 lg:py-16">
          <h2 className="font-display text-[2.4rem] leading-tight md:text-[3rem]"><Lines text={con.title} /></h2>
          <p className="mt-4 max-w-[420px] text-[15px] text-white/85">{con.text}</p>
          <a href={wa(con.ctaMessage)} target="_blank" rel="noopener noreferrer" className={`${gold} mt-7`}><Icon name="whatsapp" className="size-6" />{con.ctaLabel} →</a>
        </div>
        <div className="relative min-h-[260px]"><Photo id={con.photo} thumb sizes="(min-width:1024px) 25vw, 100vw" className="vivid object-[50%_72%]" /></div>
        <ul className="flex flex-col justify-center gap-6 px-6 py-12 lg:px-10">
          {con.items.map((c, i) => <li key={`${c.t}-${i}`} className="flex items-center gap-4 text-[14px] font-medium"><Icon name={c.icon} className="size-9 shrink-0" />{c.t}</li>)}
        </ul>
      </section>
    </>
  );
}
