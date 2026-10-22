'use client';
import { useState } from 'react';
import { categories, products } from '@/data/belleza';
import { wa } from '@/data/site';
import { ProductArt } from './ProductArt';

export function BellezaCatalog() {
  const [cat, setCat] = useState<string>('Todos');
  const list = cat === 'Todos' ? products : products.filter((p) => p.category === cat);
  return (
    <div>
      <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2.5">
        {['Todos', ...categories].map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
            className={`rounded-full border px-5 py-2.5 text-[14px] font-medium transition ${cat === c ? 'border-ink bg-ink text-white' : 'border-brown/40 hover:border-ink'}`}>{c}</button>
        ))}
      </div>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <li key={p.id} className="flex flex-col overflow-hidden rounded-2xl bg-[#fffdf8] shadow-[0_8px_28px_rgba(60,40,10,.12)]">
            <div className="relative aspect-[5/4]" style={{ background: p.bg }}>
              <ProductArt kind={p.kind} fg={p.fg} />
              <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-ink/70">Foto pendiente</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-terra">{p.category}</p>
              <h3 className="mt-1 font-title text-[1.2rem] font-bold leading-snug">{p.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{p.desc}</p>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Ingredientes">
                {p.ingredients.map((i) => <li key={i} className="rounded-full bg-brown/10 px-3 py-1 text-[12px] font-medium text-brown">{i}</li>)}
              </ul>
              <div className="mt-auto pt-5">
                <a href={wa(`Hola, quisiera información y precio de: ${p.name}.`)} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border border-brown/50 px-5 py-2.5 text-[14px] font-semibold hover:border-ink">Preguntar por WhatsApp →</a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
