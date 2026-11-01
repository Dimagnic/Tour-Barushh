import { Fragment } from 'react';
import { slugify } from '@/data/articles';

/**
 * Texto con formato sencillo escrito en el panel (sin HTML, así es seguro):
 * línea en blanco = párrafo nuevo · "## " = subtítulo · líneas con "- " = lista.
 */
export function RichText({ text, className = '' }: { text: string; className?: string }) {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className={className}>
      {blocks.map((b, i) => {
        if (b.startsWith('## ')) return <h2 key={i} id={slugify(b.slice(3))} className="mb-3 mt-10 font-display text-[1.8rem] leading-tight">{b.slice(3)}</h2>;
        const lines = b.split('\n');
        if (lines.every((l) => /^\s*-\s+/.test(l))) {
          return <ul key={i} className="my-4 list-disc space-y-1.5 pl-6 marker:text-gold">{lines.map((l, j) => <li key={j}>{l.replace(/^\s*-\s+/, '')}</li>)}</ul>;
        }
        return <p key={i} className="mt-4">{lines.map((l, j) => <Fragment key={j}>{j > 0 ? <br /> : null}{l}</Fragment>)}</p>;
      })}
    </div>
  );
}
