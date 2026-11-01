'use client';
import { useCallback, useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { library, previewSrc } from '@/lib/media';

const MAX_MB = 8;
const TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/** Elegir una foto: de la biblioteca del sitio, de las ya subidas, o subir una nueva. */
export function ImagePicker({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  const [open, setOpen] = useState(false);
  const src = previewSrc(value);
  return (
    <div>
      <p className="mb-1.5 text-[13px] font-semibold text-ink/75">{label}</p>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-ink/10">
          {src ? <img src={src} alt="" className="size-full object-cover" /> : <span className="grid size-full place-items-center text-[11px] text-ink/50">Sin foto</span>}
        </div>
        <button type="button" onClick={() => setOpen(true)} className="rounded-full border border-ink/25 px-5 py-2.5 text-[14px] font-medium hover:border-cobalt hover:text-cobalt">Cambiar foto</button>
      </div>
      {open ? <PickerDialog current={value} onClose={() => setOpen(false)} onPick={(v) => { onChange(v); setOpen(false); }} /> : null}
    </div>
  );
}

function PickerDialog({ current, onClose, onPick }: { current: string; onClose: () => void; onPick: (v: string) => void }) {
  const [tab, setTab] = useState<'subidas' | 'sitio'>('sitio');
  const [uploads, setUploads] = useState<{ url: string; name: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const loadUploads = useCallback(async () => {
    const sb = supabaseBrowser();
    const { data } = await sb.storage.from('media').list('images', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });
    setUploads((data ?? []).filter((f) => f.id).map((f) => ({ name: f.name, url: sb.storage.from('media').getPublicUrl(`images/${f.name}`).data.publicUrl })));
  }, []);
  useEffect(() => { loadUploads(); }, [loadUploads]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const upload = async (file: File) => {
    setMsg('');
    if (!TYPES.includes(file.type)) return setMsg('Formato no permitido. Usa JPG, PNG o WebP.');
    if (file.size > MAX_MB * 1024 * 1024) return setMsg(`La foto pesa más de ${MAX_MB} MB. Redúcela antes de subirla.`);
    setBusy(true);
    const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
    const base = file.name.replace(/\.[^.]+$/, '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) || 'foto';
    const path = `images/${Date.now()}-${base}.${ext}`;
    const sb = supabaseBrowser();
    const { error } = await sb.storage.from('media').upload(path, file, { cacheControl: '31536000', contentType: file.type, upsert: false });
    setBusy(false);
    if (error) return setMsg('No se pudo subir la foto. Revisa tu conexión e inténtalo de nuevo.');
    onPick(sb.storage.from('media').getPublicUrl(path).data.publicUrl);
  };

  const tile = (key: string, value: string, src: string, title: string) => (
    <button key={key} type="button" title={title} onClick={() => onPick(value)}
      className={`relative block w-full overflow-hidden rounded-lg border-2 bg-ink/5 pt-[75%] ${value === current ? 'border-gold' : 'border-transparent hover:border-cobalt'}`}>
      <img src={src} alt={title} loading="lazy" className="absolute inset-0 size-full object-cover" />
    </button>
  );

  return (
    <div role="dialog" aria-modal="true" aria-label="Elegir foto" onClick={onClose} className="fixed inset-0 z-50 grid place-items-center bg-ink/70 p-4">
      <div onClick={(e) => e.stopPropagation()} className="flex max-h-[88vh] w-full max-w-4xl flex-col rounded-2xl bg-[#fffdf8] shadow-2xl">
        <div className="flex flex-wrap items-center gap-3 border-b border-ink/10 p-4">
          <h2 className="mr-auto font-title text-[1.2rem] font-bold">Elegir foto</h2>
          <label className={`cursor-pointer rounded-full bg-gold px-5 py-2.5 text-[14px] font-semibold text-ink hover:brightness-95 ${busy ? 'pointer-events-none opacity-60' : ''}`}>
            {busy ? 'Subiendo…' : 'Subir foto nueva'}
            <input type="file" accept={TYPES.join(',')} className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }} />
          </label>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="grid size-10 place-items-center rounded-full border border-ink/20 hover:border-ink">✕</button>
        </div>
        {msg ? <p role="alert" className="mx-4 mt-3 rounded-lg bg-terra/10 px-4 py-2 text-[14px] text-terra">{msg}</p> : null}
        <div className="flex gap-2 px-4 pt-3">
          {([['sitio', `Fotos del sitio (${library.length})`], ['subidas', `Subidas (${uploads.length})`]] as const).map(([k, t]) => (
            <button key={k} type="button" onClick={() => setTab(k)} className={`rounded-full px-4 py-2 text-[13px] font-medium ${tab === k ? 'bg-ink text-white' : 'border border-ink/20'}`}>{t}</button>
          ))}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4"><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {tab === 'sitio'
            ? library.map((p) => tile(p.id, p.id, p.thumb, p.es))
            : uploads.length
              ? uploads.map((u) => tile(u.name, u.url, u.url, u.name))
              : <p className="col-span-full py-10 text-center text-[14px] text-ink/60">Todavía no has subido fotos. Usa “Subir foto nueva”.</p>}
        </div>
        </div>
      </div>
    </div>
  );
}
