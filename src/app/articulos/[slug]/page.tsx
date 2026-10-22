import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Photo, getPhoto } from '@/components/Photo';
import { articles, getArticle, slugify } from '@/data/articles';
import { site, wa } from '@/data/site';
import { goldBtn, label } from '@/lib/ui';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title, description: a.excerpt, alternates: { canonical: `/articulos/${a.slug}` },
    openGraph: { title: a.title, description: a.excerpt, type: 'article', images: [getPhoto(a.cover).src] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const heads = a.blocks.filter((b): b is { h: string } => 'h' in b);
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.excerpt, inLanguage: 'es', image: `${site.url}${getPhoto(a.cover).src}`, author: { '@type': 'Organization', name: site.name }, publisher: { '@type': 'Organization', name: site.name } };
  let firstP = true;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="relative h-[58svh] min-h-[420px] bg-ink text-white">
        <Photo id={a.cover} priority sizes="100vw" className="vivid" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/30" />
        <div className="relative mx-auto flex h-full max-w-[900px] flex-col justify-end px-5 pb-12">
          <p className="text-[13px]"><Link href="/articulos" className="text-white/80 hover:text-gold">← Artículos</Link></p>
          <p className="mt-4 w-fit rounded-full bg-gold px-4 py-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink">{a.category}</p>
          <h1 className="mt-4 font-display text-[2.4rem] leading-[1.08] md:text-[3.6rem]">{a.title}</h1>
          <p className="mt-3 text-[14px] text-white/80">{a.minutes} min de lectura</p>
        </div>
      </section>

      <article className="paper text-ink">
        <div className="mx-auto max-w-[760px] px-5 py-16">
          <p className="text-[19px] leading-8 text-ink/70">{a.excerpt}</p>
          {heads.length > 2 ? (
            <nav aria-label="En este artículo" className="my-10 rounded-2xl border border-brown/30 bg-[#fffdf8] p-6">
              <p className={`${label} !mb-3 text-brown`}>En este artículo</p>
              <ol className="list-decimal space-y-1.5 pl-5 marker:text-gold">
                {heads.map((h) => <li key={h.h}><a href={`#${slugify(h.h)}`} className="hover:text-cobalt hover:underline">{h.h}</a></li>)}
              </ol>
            </nav>
          ) : null}
          {a.blocks.map((b, i) => {
            if ('h' in b) return <h2 key={i} id={slugify(b.h)} className="mb-3 mt-12 font-display text-[2rem] leading-tight md:text-[2.3rem]">{b.h}</h2>;
            if ('q' in b) return <blockquote key={i} className="my-10 border-l-4 border-gold pl-6 font-title text-[1.5rem] italic leading-snug text-ink">“{b.q}”</blockquote>;
            if ('ul' in b) return <ul key={i} className="my-5 space-y-2.5 text-[18px] leading-8 text-ink/85">{b.ul.map((li) => <li key={li} className="flex gap-3 before:mt-3 before:size-2 before:shrink-0 before:rounded-full before:bg-gold">{li}</li>)}</ul>;
            const drop = firstP; firstP = false;
            return <p key={i} className={`mt-5 text-[18px] leading-8 text-ink/85 ${drop ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[4.6rem] first-letter:leading-[0.8] first-letter:text-brown' : ''}`}>{b.p}</p>;
          })}

          <div className="mt-14 rounded-3xl bg-ink p-8 text-center text-white">
            <h2 className="font-display text-[2rem] leading-tight">¿Quieres vivirlo con un guía local?</h2>
            <p className="mt-2 text-white/80">Armamos el recorrido a tu medida, con transporte y atención personalizada.</p>
            <a href={wa(`Hola, leí el artículo "${a.title}" y quisiera cotizar un tour.`)} target="_blank" rel="noopener noreferrer" className={`${goldBtn} mt-5`}>Cotiza por WhatsApp →</a>
          </div>
        </div>

        <div className="mx-auto max-w-[1200px] px-5 pb-24">
          <h2 className="font-display text-[2rem]">Sigue leyendo</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/articulos/${r.slug}`} className="group overflow-hidden rounded-2xl bg-[#fffdf8] shadow-[0_8px_28px_rgba(60,40,10,.12)]">
                <div className="relative aspect-[4/3] overflow-hidden"><Photo id={r.cover} thumb sizes="(min-width:768px) 30vw, 100vw" className="vivid transition duration-500 group-hover:scale-105" /></div>
                <div className="p-5"><p className="text-[12px] font-medium uppercase tracking-[0.2em] text-terra">{r.category}</p><h3 className="mt-1 font-title text-[1.1rem] font-bold leading-snug">{r.title}</h3></div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
