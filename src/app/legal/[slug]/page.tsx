import { notFound } from 'next/navigation';

const titles: Record<string, string> = { privacy: 'Aviso de privacidad', terms: 'Términos y condiciones' };
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(titles).map((slug) => ({ slug }));
}
export const metadata = { robots: { index: false } };

export default async function Legal({ params }: Props) {
  const { slug } = await params;
  const title = titles[slug];
  if (!title) notFound();
  return (
    <section className="bg-cream pb-24 pt-36">
      <div className="mx-auto max-w-3xl px-5">
        <h1 className="font-display text-5xl font-bold">{title}</h1>
        <p className="mt-5 text-lg text-ink/75">Este documento está en preparación y se publicará antes del lanzamiento.</p>
      </div>
    </section>
  );
}
