'use client';
import { useState, useTransition } from 'react';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/data/content';
import { ICONS, schemas, type Field, type SectionKey } from '@/lib/cms-schema';
import { saveSection, type SaveState } from '../../actions';
import { ImagePicker } from './ImagePicker';

type Obj = Record<string, unknown>;
const input = 'w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-[15px] outline-none focus:border-gold';
const lab = 'mb-1.5 block text-[13px] font-semibold text-ink/75';
const hint = 'mt-1 text-[12px] text-ink/55';
const small = 'grid size-9 place-items-center rounded-full border border-ink/20 text-[14px] hover:border-ink disabled:opacity-30';

function FieldView({ f, value, onChange, id }: { f: Field; value: unknown; onChange: (v: unknown) => void; id: string }) {
  if (f.kind === 'text') {
    const v = typeof value === 'string' ? value : '';
    const common = { id, value: v, maxLength: f.max, placeholder: f.placeholder, className: input };
    return (
      <div>
        <label htmlFor={id} className={lab}>{f.label}{f.required ? '' : ' (opcional)'}</label>
        {f.multiline
          ? <textarea {...common} rows={f.max >= 2000 ? 16 : Math.min(6, Math.max(2, Math.ceil(f.max / 70)))} onChange={(e) => onChange(e.target.value)} />
          : <input {...common} onChange={(e) => onChange(e.target.value)} />}
        <p className={hint}>{f.help ? `${f.help} · ` : ''}{v.length}/{f.max}</p>
      </div>
    );
  }
  if (f.kind === 'image') {
    return (
      <div>
        <ImagePicker label={f.label + (f.optional ? ' (opcional)' : '')} value={String(value ?? '')} onChange={onChange} />
        {f.optional && value ? <button type="button" onClick={() => onChange('')} className="mt-2 text-[13px] font-medium text-terra hover:underline">Quitar foto</button> : null}
        {f.help ? <p className={hint}>{f.help}</p> : null}
      </div>
    );
  }
  if (f.kind === 'number') {
    return (
      <div>
        <label htmlFor={id} className={lab}>{f.label}</label>
        <input id={id} type="number" min={f.min} max={f.max} value={typeof value === 'number' ? value : ''} onChange={(e) => onChange(e.target.value === '' ? f.min : Number(e.target.value))} className={`${input} max-w-[160px]`} />
        {f.help ? <p className={hint}>{f.help}</p> : null}
      </div>
    );
  }
  if (f.kind === 'icon') {
    return (
      <div>
        <label htmlFor={id} className={lab}>{f.label}</label>
        <div className="flex items-center gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink text-white"><Icon name={value as IconName} className="size-8" /></span>
          <select id={id} value={String(value)} onChange={(e) => onChange(e.target.value)} className={input}>
            {ICONS.map(([k, t]) => <option key={k} value={k}>{t}</option>)}
          </select>
        </div>
      </div>
    );
  }
  if (f.kind === 'toggle') {
    return (
      <label className="flex items-start gap-3 text-[14px]">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="mt-1 size-4 accent-[#8a6d3b]" />
        <span>{f.label}{f.help ? <span className="block text-[12px] text-ink/55">{f.help}</span> : null}</span>
      </label>
    );
  }
  // Lista: agregar, quitar y reordenar elementos
  return <ListField f={f} value={value} onChange={onChange} id={id} />;
}

function ListField({ f, value, onChange, id }: { f: Extract<Field, { kind: 'list' }>; value: unknown; onChange: (v: unknown) => void; id: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const items = (Array.isArray(value) ? value : []) as Obj[];
  const set = (next: Obj[]) => onChange(next);
  const move = (i: number, d: number) => { const n = [...items]; [n[i], n[i + d]] = [n[i + d], n[i]]; set(n); };
  return (
    <div>
      <div className="space-y-4">
        {items.map((it, i) => (
          <div key={i} className="rounded-xl border border-ink/15 bg-white/60 p-4">
            <div className="mb-3 flex items-center gap-2">
              <p className="mr-auto truncate text-[14px] font-semibold">{i + 1}. {String(it[f.itemTitle] || 'Sin título')}</p>
              {f.collapsible ? <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="rounded-full border border-ink/20 px-4 py-1.5 text-[13px] font-medium hover:border-cobalt hover:text-cobalt">{open === i ? 'Cerrar' : 'Editar'}</button> : null}
              <button type="button" className={small} aria-label="Subir" disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
              <button type="button" className={small} aria-label="Bajar" disabled={i === items.length - 1} onClick={() => move(i, 1)}>↓</button>
              <button type="button" className={`${small} hover:border-terra hover:text-terra`} aria-label="Eliminar" disabled={items.length <= f.min}
                onClick={() => { if (confirm('¿Eliminar este elemento? El cambio se aplica al guardar.')) set(items.filter((_, j) => j !== i)); }}>✕</button>
            </div>
            {!f.collapsible || open === i ? <div className="space-y-4">
              {f.fields.map((sub) => <FieldView key={sub.key} f={sub} id={`${id}-${i}-${sub.key}`} value={it[sub.key]} onChange={(v) => set(items.map((x, j) => (j === i ? { ...x, [sub.key]: v } : x)))} />)}
            </div> : null}
          </div>
        ))}
      </div>
      <button type="button" disabled={items.length >= f.max} onClick={() => { set([...items, { ...f.empty }]); if (f.collapsible) setOpen(items.length); }}
        className="mt-4 rounded-full border border-dashed border-ink/40 px-5 py-2.5 text-[14px] font-medium hover:border-cobalt hover:text-cobalt disabled:opacity-40">
        + Agregar ({items.length}/{f.max})
      </button>
    </div>
  );
}

export function SectionEditor({ section, values }: { section: SectionKey; values: Obj }) {
  const schema = schemas[section];
  const [data, setData] = useState<Obj>(values);
  const [dirty, setDirty] = useState(false);
  const [state, setState] = useState<SaveState>(null);
  const [pending, start] = useTransition();
  const update = (k: string, v: unknown) => { setData((d) => ({ ...d, [k]: v })); setDirty(true); setState(null); };
  const save = () => start(async () => { const r = await saveSection(section, data); setState(r); if (r?.ok) setDirty(false); });

  return (
    <div className="max-w-3xl">
      <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-brown">Contenido</p>
      <h1 className="mt-2 font-display text-[2.4rem] leading-tight">{schema.title}</h1>
      <p className="mt-2 text-[15px] text-ink/70">{schema.intro}</p>
      <div className="mt-8 space-y-6">
        {schema.groups.map((g) => (
          <section key={g.title} className="space-y-4 rounded-2xl bg-[#fffdf8] p-6 shadow-[0_8px_26px_rgba(60,40,10,.08)]">
            <div><h2 className="font-title text-[1.15rem] font-bold">{g.title}</h2>{g.help ? <p className="mt-1 text-[13px] text-ink/60">{g.help}</p> : null}</div>
            {g.fields.map((f) => <FieldView key={f.key} f={f} id={`${section}-${f.key}`} value={data[f.key]} onChange={(v) => update(f.key, v)} />)}
          </section>
        ))}
      </div>
      <div className="sticky bottom-0 -mx-1 mt-6 flex flex-wrap items-center gap-4 bg-cream/95 px-1 py-4 backdrop-blur">
        <button type="button" onClick={save} disabled={pending} className="rounded-full bg-gold px-8 py-3.5 text-[15px] font-semibold text-ink shadow hover:brightness-95 disabled:opacity-60">{pending ? 'Guardando…' : 'Guardar cambios'}</button>
        {state ? <p role="status" className={`text-[14px] font-medium ${state.ok ? 'text-[#2f7d4a]' : 'text-terra'}`}>{state.message}</p>
          : dirty ? <p className="text-[14px] text-ink/60">Tienes cambios sin guardar.</p> : null}
      </div>
    </div>
  );
}
