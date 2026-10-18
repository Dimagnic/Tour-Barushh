import Link from 'next/link';
import { Photo } from '@/components/Photo';
import { Icon } from '@/components/Icon';
import { wa } from '@/data/site';
import { ctaList, essence, experiences, gallery, heroFeatures, living, testimonials } from '@/data/content';

const h2 = 'font-display text-4xl font-bold leading-[1.05] md:text-5xl';
const label = 'mb-3 text-[13px] font-bold uppercase tracking-[0.22em]';
const goldBtn = 'inline-block rounded-full bg-gold px-7 py-3.5 font-bold text-ink hover:brightness-95';
const navyBtn = 'inline-block rounded-full bg-ink px-7 py-3.5 font-bold text-white hover:brightness-125';

export default function Home() {
  return (
    <>
      <section id="inicio" className="relative flex min-h-[620px] flex-col overflow-hidden text-white md:h-[92svh]">
        <Photo id="plaza-valquirico" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink/85 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-14">
          <h1 className="max-w-2xl font-display text-5xl font-bold leading-[1.02] md:text-7xl">Más que un tour, <em className="text-gold">una experiencia</em> que se vive.</h1>
          <p className="mt-6 max-w-lg text-lg text-white/90 md:text-xl">Conoce Puebla y sus alrededores de la mano de guías locales que aman su tierra, su historia y su gente.</p>
          <div className="mt-8"><a href={wa('Hola, quiero reservar una experiencia con Barushh.')} target="_blank" rel="noopener noreferrer" className={goldBtn}>Reserva tu experiencia →</a></div>
          <p className="absolute bottom-6 right-5 hidden -rotate-6 font-script text-4xl text-white/90 md:block">Descubre.<br />Vive.<br />Conecta.</p>
        </div>
        <ul className="relative mx-auto mb-8 grid w-full max-w-7xl grid-cols-2 gap-5 px-5 sm:grid-cols-3 lg:grid-cols-5">
          {heroFeatures.map((f) => (
            <li key={f.t} className="flex items-center gap-3 text-sm font-semibold leading-tight text-white/90"><Icon name={f.icon} className="size-9 shrink-0 text-gold" />{f.t}</li>
          ))}
        </ul>
      </section>

      <section id="experiencias" className="paper torn relative z-10 text-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-10 pt-20 md:grid-cols-2">
          <div>
            <p className={`${label} text-terra`}>Experiencias únicas</p>
            <h2 className={h2}>Tours que cuentan historias</h2>
            <p className="mt-5 max-w-md text-lg text-ink/80">Recorre pueblos mágicos, paisajes increíbles, tradiciones vivas y una gastronomía que enamora.</p>
            <Link href="/#experiencias-lista" className={`${navyBtn} mt-7`}>Ver todas las experiencias →</Link>
          </div>
          <div className="relative grid grid-cols-2 gap-4 md:block md:h-[400px]">
            <figure className="polaroid relative -rotate-3 md:absolute md:left-0 md:top-0 md:w-[58%]"><div className="relative aspect-[4/3]"><Photo id="grupo-mural" sizes="(min-width:768px) 28vw, 45vw" /></div></figure>
            <figure className="polaroid relative rotate-3 md:absolute md:bottom-0 md:right-0 md:w-[52%]"><div className="relative aspect-[4/3]"><Photo id="grupo-mirador" sizes="(min-width:768px) 26vw, 45vw" /></div></figure>
            <p className="col-span-2 font-script text-2xl text-ink/70 md:absolute md:bottom-6 md:left-2 md:max-w-[200px]">Puebla y sus alrededores como nunca los has visto</p>
          </div>
        </div>
        <div id="experiencias-lista" className="mx-auto grid max-w-7xl gap-5 px-5 pb-24 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((e) => (
            <article key={e.title} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md">
              <div className="relative aspect-[4/3]"><Photo id={e.photo} thumb sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 100vw" /></div>
              <div className="flex flex-1 flex-col p-5">
                <p className="-mt-9 mb-3 w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink shadow">{e.place}</p>
                <h3 className="font-display text-2xl font-bold leading-tight">{e.title}</h3>
                <p className="mt-2 flex-1 text-ink/75">{e.text}</p>
                <a href={wa(`Hola, quiero información sobre: ${e.title}.`)} target="_blank" rel="noopener noreferrer" className="mt-4 w-fit rounded-full border border-ink/30 px-5 py-2 text-sm font-bold hover:border-cobalt hover:text-cobalt">Ver más →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="torn relative z-20 overflow-hidden bg-ink text-white">
        <Photo id="cascada-mirador" sizes="100vw" className="opacity-20" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2">
          <div>
            <p className={`${label} text-gold`}>Vive la experiencia</p>
            <h2 className={h2}>Lugares increíbles, historias inolvidables</h2>
            <p className="mt-5 max-w-md text-lg text-white/85">Te llevamos a descubrir la riqueza cultural, natural y gastronómica de nuestra región, con experiencias diseñadas para conectar de verdad con cada destino.</p>
            <a href={wa('Hola, quiero reservar un tour con Barushh.')} target="_blank" rel="noopener noreferrer" className={`${goldBtn} mt-7`}>Reserva tu tour →</a>
            <ul className="mt-9 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {living.map((l) => <li key={l.t} className="flex flex-col items-start gap-2 text-sm font-semibold"><Icon name={l.icon} className="size-9 text-gold" />{l.t}</li>)}
            </ul>
          </div>
          <div className="relative">
            <figure className="polaroid rotate-2"><div className="relative aspect-[4/3]"><Photo id="calle-pueblo-grupo" sizes="(min-width:768px) 45vw, 100vw" /></div></figure>
            <p className="mt-4 -rotate-3 font-script text-3xl text-white/90">Viaja en buena compañía</p>
          </div>
        </div>
      </section>

      <section id="nosotros" className="paper torn relative z-30 text-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl"><Photo id="iglesia-barroca" sizes="(min-width:768px) 50vw, 100vw" /></div>
          <div>
            <p className={`${label} text-terra`}>Nuestra esencia</p>
            <h2 className={h2}>Personas que hacen la diferencia</h2>
            <p className="mt-5 max-w-lg text-lg text-ink/80">Somos un equipo de guías apasionados por compartir la historia, la cultura y la belleza de Puebla. Cada tour está pensado para que vivas una experiencia auténtica, segura y llena de momentos especiales.</p>
            <a href={wa('Hola, me gustaría hablar con un guía de Barushh.')} target="_blank" rel="noopener noreferrer" className={`${navyBtn} mt-7`}>Habla con un guía →</a>
            <ul className="mt-9 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {essence.map((l) => <li key={l.t} className="flex flex-col items-start gap-2 text-sm font-semibold"><Icon name={l.icon} className="size-9 text-terra" />{l.t}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="galeria" className="torn relative z-40 bg-ink text-white">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="flex flex-wrap items-end gap-x-6">
            <h2 className={h2}>Momentos que se quedan</h2>
            <p className="-rotate-2 font-script text-3xl text-gold">Experiencias reales</p>
          </div>
          <ul tabIndex={0} aria-label="Galería de fotos, desplázate horizontalmente" className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-color:#e8b23a_transparent]">
            {gallery.map((id) => (
              <li key={id} className="relative aspect-[4/5] w-64 shrink-0 snap-start overflow-hidden rounded-xl sm:w-72"><Photo id={id} thumb sizes="288px" /></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="testimonios" className="paper torn relative z-50 text-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-24 lg:grid-cols-[1fr_2.4fr]">
          <div>
            <p className={`${label} text-terra`}>Testimonios</p>
            <h2 className={h2}>Viajeros que viven y recomiendan</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-2xl bg-white p-6 shadow-md">
                <p aria-label="5 de 5 estrellas" className="text-xl tracking-widest text-gold">★★★★★</p>
                <blockquote className="mt-3 flex-1 text-ink/85">“{t.text}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 font-semibold"><span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-cobalt text-white">{t.name[0]}</span>{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="torn relative z-[60] bg-ink text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <h2 className={h2}>¿Listo para vivir esta experiencia?</h2>
            <p className="mt-4 max-w-md text-lg text-white/85">Cuéntanos qué tipo de tour te interesa y te ayudamos a planear un viaje inolvidable.</p>
            <a href={wa('Hola, quisiera cotizar un tour con Barushh.')} target="_blank" rel="noopener noreferrer" className={`${goldBtn} mt-7`}>Cotiza por WhatsApp →</a>
          </div>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl lg:block"><Photo id="vista-pueblo-iglesia" thumb sizes="25vw" /></div>
          <ul className="space-y-4">
            {ctaList.map((c) => <li key={c.t} className="flex items-center gap-3 font-semibold"><Icon name={c.icon} className="size-7 shrink-0 text-gold" />{c.t}</li>)}
          </ul>
        </div>
        <div aria-hidden="true" className="tile h-4" />
      </section>
    </>
  );
}
