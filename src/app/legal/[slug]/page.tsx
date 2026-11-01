import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/RichText';
import { getContent } from '@/lib/cms';

const docs = { privacy: 'Aviso de privacidad', terms: 'Términos y condiciones' } as const;
type Slug = keyof typeof docs;
type Props = { params: Promise<{ slug: string }> };
const isSlug = (s: string): s is Slug => s in docs;

export function generateStaticParams() {
  return Object.keys(docs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  const doc = await getContent(slug);
  return { title: docs[slug], alternates: { canonical: `/legal/${slug}` }, robots: { index: Boolean(doc.body) } };
}

export default async function Legal({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();
  const doc = await getContent(slug);
  return (
    <section className="bg-cream pb-24 pt-36">
      <div className="mx-auto max-w-3xl px-5">
        <h1 className="font-display text-5xl font-bold">{docs[slug]}</h1>
        {doc.updated ? <p className="mt-2 text-[14px] text-ink/60">Última actualización: {doc.updated}</p> : null}
        {doc.body
          ? <RichText text={doc.body} className="mt-6 text-[17px] leading-relaxed text-ink/85" />
          : <p className="mt-5 text-lg text-ink/75">Este documento está en preparación y se publicará antes del lanzamiento.</p>}
      </div>
    </section>
  );
}
