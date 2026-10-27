'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { site } from '@/data/site';

const W = 1063; // 90 mm a 300 dpi
const H = 591; // 50 mm a 300 dpi
const NAVY = '#041623', GOLD = '#e8b23a', CREAM = '#f5efe2', BROWN = '#8a6d3b', COBALT = '#1f4fa3';
const KEY = 'barushh-tarjeta-v2'; // v2: numero de WhatsApp nuevo (los datos guardados con v1 traian el anterior)

type Info = { name: string; role: string; phone: string; email: string; web: string };
type QrMode = 'web' | 'vcard' | 'whatsapp';

const DEFAULTS: Info = { name: site.guide.name, role: site.guide.role, phone: site.whatsappDisplay, email: site.email, web: site.url.replace(/^https?:\/\//, '') };
const digits = (s: string) => { const d = s.replace(/\D/g, ''); return d.length === 10 ? `52${d}` : d; };

function qrPayload(i: Info, mode: QrMode) {
  if (mode === 'whatsapp') return `https://wa.me/${digits(i.phone)}`;
  if (mode === 'vcard') {
    return ['BEGIN:VCARD', 'VERSION:3.0', `FN:${i.name}`, 'ORG:Tour Barushh', `TITLE:${i.role}`, `TEL;TYPE=CELL:+${digits(i.phone)}`, i.email ? `EMAIL:${i.email}` : '', `URL:https://${i.web.replace(/^https?:\/\//, '')}`, 'END:VCARD'].filter(Boolean).join('\n');
  }
  return `https://${i.web.replace(/^https?:\/\//, '')}`;
}

type Ctx = CanvasRenderingContext2D;
function spaced(c: Ctx, text: string, x: number, y: number, sp: number) {
  let cx = x;
  for (const ch of text) { c.fillText(ch, cx, y); cx += c.measureText(ch).width + sp; }
}
function fit(c: Ctx, text: string, font: (px: number) => string, maxW: number, start: number, min: number) {
  let px = start; c.font = font(px);
  while (c.measureText(text).width > maxW && px > min) { px -= 2; c.font = font(px); }
}
function strip(c: Ctx, y: number, h: number) {
  c.fillStyle = '#f6efe0'; c.fillRect(0, y, W, h);
  for (let x = 0; x < W + h; x += h) {
    c.fillStyle = COBALT; c.beginPath(); c.arc(x + h / 2, y + h / 2, h * 0.36, 0, Math.PI * 2); c.fill();
    c.fillStyle = GOLD; c.beginPath(); c.arc(x + h / 2, y + h / 2, h * 0.14, 0, Math.PI * 2); c.fill();
  }
}
function tile(c: Ctx, x: number, y: number, s: number, r: number) {
  c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + s, y, x + s, y + s, r); c.arcTo(x + s, y + s, x, y + s, r); c.arcTo(x, y + s, x, y, r); c.arcTo(x, y, x + s, y, r); c.closePath();
}
const loadImg = (src: string) => new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });

async function qrCanvas(text: string, size: number) {
  const QR = (await import('qrcode')).default;
  const cv = document.createElement('canvas');
  await QR.toCanvas(cv, text, { width: size, margin: 1, errorCorrectionLevel: 'M', color: { dark: NAVY, light: '#ffffff' } });
  return cv;
}

async function drawFront(cv: HTMLCanvasElement) {
  const c = cv.getContext('2d')!; const logo = await loadImg('/brand/logo-badge.png');
  c.fillStyle = NAVY; c.fillRect(0, 0, W, H);
  c.strokeStyle = GOLD; c.lineWidth = 3; c.strokeRect(28, 28, W - 56, H - 56 - 34);
  c.drawImage(logo, 74, (H - 34 - 400) / 2, 400, 400);
  c.fillStyle = '#fff'; c.textBaseline = 'alphabetic';
  c.font = '400 60px "Libre Caslon Display", Georgia, serif'; spaced(c, 'TOUR', 540, 235, 14);
  fit(c, 'BARUSHH', (p) => `400 ${p}px "Libre Caslon Display", Georgia, serif`, 440, 112, 60); c.fillText('BARUSHH', 536, 335);
  c.fillStyle = GOLD; c.fillRect(540, 368, 120, 3);
  c.font = '500 24px "DM Sans", sans-serif'; spaced(c, 'GUÍAS DE TURISMO', 540, 418, 6);
  c.fillStyle = 'rgba(255,255,255,.75)'; c.font = '500 21px "DM Sans", sans-serif'; spaced(c, 'PUEBLA · MÉXICO', 540, 456, 5);
  strip(c, H - 34, 34);
}

async function drawBack(cv: HTMLCanvasElement, i: Info, mode: QrMode) {
  const c = cv.getContext('2d')!;
  c.fillStyle = CREAM; c.fillRect(0, 0, W, H);
  c.fillStyle = NAVY; c.textBaseline = 'alphabetic';
  fit(c, i.name, (p) => `400 ${p}px "Libre Caslon Display", Georgia, serif`, 560, 66, 34); c.fillText(i.name, 70, 150);
  c.fillStyle = BROWN; c.font = '500 22px "DM Sans", sans-serif'; spaced(c, i.role.toUpperCase(), 72, 196, 3);
  c.fillStyle = GOLD; c.fillRect(72, 222, 90, 4);
  const rows: [string, string][] = [['WhatsApp', i.phone], ['Web', i.web.replace(/^https?:\/\//, '')], ...(i.email ? ([['Correo', i.email]] as [string, string][]) : [])];
  rows.forEach(([k, v], n) => {
    const y = 296 + n * 76;
    c.fillStyle = BROWN; c.font = '600 17px "DM Sans", sans-serif'; spaced(c, k.toUpperCase(), 72, y, 4);
    c.fillStyle = NAVY; fit(c, v, (p) => `500 ${p}px "DM Sans", sans-serif`, 520, 31, 20); c.fillText(v, 72, y + 36);
  });
  const qs = 270; const qx = 710, qy = 88;
  c.save(); c.shadowColor = 'rgba(11,31,58,.25)'; c.shadowBlur = 24; c.shadowOffsetY = 8; c.fillStyle = '#fff'; tile(c, qx, qy, qs + 36, 18); c.fill(); c.restore();
  c.drawImage(await qrCanvas(qrPayload(i, mode), qs), qx + 18, qy + 18, qs, qs);
  c.fillStyle = NAVY; c.font = '500 21px "DM Sans", sans-serif';
  const cap = mode === 'vcard' ? 'Escanea y guarda mi contacto' : mode === 'whatsapp' ? 'Escríbeme por WhatsApp' : 'Escanea y visita nuestra web';
  c.textAlign = 'center'; c.fillText(cap, qx + (qs + 36) / 2, qy + qs + 36 + 38); c.textAlign = 'left';
  strip(c, H - 34, 34);
}

const toBlob = (cv: HTMLCanvasElement) => new Promise<Blob>((res) => cv.toBlob((b) => res(b!), 'image/png'));
function save(blob: Blob, name: string) { const u = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000); }

export function CardStudio() {
  const front = useRef<HTMLCanvasElement>(null);
  const back = useRef<HTMLCanvasElement>(null);
  const [info, setInfo] = useState<Info>(DEFAULTS);
  const [mode, setMode] = useState<QrMode>('web');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { try { const s = localStorage.getItem(KEY); if (s) setInfo({ ...DEFAULTS, ...JSON.parse(s) }); } catch { /* sin almacenamiento */ } }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(info)); } catch { /* sin almacenamiento */ } }, [info]);

  const render = useCallback(async () => {
    await Promise.all([document.fonts.load('60px "Libre Caslon Display"'), document.fonts.load('500 24px "DM Sans"'), document.fonts.load('600 17px "DM Sans"')]).catch(() => undefined);
    if (front.current) await drawFront(front.current);
    if (back.current) await drawBack(back.current, info, mode);
  }, [info, mode]);
  useEffect(() => { const t = setTimeout(() => { render().catch(() => setMsg('No se pudo dibujar la tarjeta.')); }, 150); return () => clearTimeout(t); }, [render]);

  const pdf = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'mm', format: [90, 50], orientation: 'landscape' });
    doc.addImage(front.current!.toDataURL('image/png'), 'PNG', 0, 0, 90, 50);
    doc.addPage([90, 50], 'landscape');
    doc.addImage(back.current!.toDataURL('image/png'), 'PNG', 0, 0, 90, 50);
    return doc.output('blob') as Blob;
  };
  const run = async (label: string, fn: () => Promise<void>) => { setBusy(true); setMsg(''); try { await render(); await fn(); setMsg(label); } catch { setMsg('Algo salió mal. Inténtalo de nuevo.'); } finally { setBusy(false); } };

  const text = `Tarjeta de presentación de ${info.name} · Tour Barushh. WhatsApp ${info.phone}. ${site.url}`;
  const share = async (file: File) => {
    const n = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean };
    if (n.canShare?.({ files: [file] })) { await n.share({ files: [file], title: 'Tarjeta Tour Barushh', text }); return true; }
    return false;
  };

  const actions: [string, string, () => Promise<void>][] = [
    ['Descargar PDF (frente y reverso)', 'PDF descargado.', async () => save(await pdf(), 'tarjeta-tour-barushh.pdf')],
    ['Descargar PNG del frente', 'Imagen del frente descargada.', async () => save(await toBlob(front.current!), 'tarjeta-frente.png')],
    ['Descargar PNG del reverso', 'Imagen del reverso descargada.', async () => save(await toBlob(back.current!), 'tarjeta-reverso.png')],
    ['Descargar solo el código QR', 'Código QR descargado.', async () => { save(await toBlob(await qrCanvas(qrPayload(info, mode), 1000)), 'qr-tour-barushh.png'); }],
    ['Imprimir', 'Se abrió el PDF: usa Imprimir desde el visor.', async () => { window.open(URL.createObjectURL(await pdf()), '_blank'); }],
    ['Enviar por WhatsApp', 'Listo. Si el archivo no se adjuntó, descarga el PDF y adjúntalo en el chat.', async () => {
      const file = new File([await pdf()], 'tarjeta-tour-barushh.pdf', { type: 'application/pdf' });
      if (!(await share(file))) window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }],
    ['Enviar por correo', 'Se abrió tu correo. Descarga el PDF y adjúntalo al mensaje.', async () => {
      const file = new File([await pdf()], 'tarjeta-tour-barushh.pdf', { type: 'application/pdf' });
      if (!(await share(file))) window.location.href = `mailto:?subject=${encodeURIComponent('Tarjeta de presentación Tour Barushh')}&body=${encodeURIComponent(text)}`;
    }],
  ];

  const input = 'w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-[16px] outline-none focus:border-gold';
  const lab = 'mb-1.5 block text-[13px] font-semibold text-ink/75';
  const set = (k: keyof Info) => (e: React.ChangeEvent<HTMLInputElement>) => setInfo({ ...info, [k]: e.target.value });

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <figure><canvas ref={front} width={W} height={H} aria-label="Vista previa del frente de la tarjeta" className="h-auto w-full max-w-[560px] rounded-xl shadow-[0_12px_34px_rgba(0,0,0,.3)]" /><figcaption className="mt-2 text-[13px] text-ink/60">Frente</figcaption></figure>
        <figure><canvas ref={back} width={W} height={H} aria-label="Vista previa del reverso de la tarjeta" className="h-auto w-full max-w-[560px] rounded-xl shadow-[0_12px_34px_rgba(0,0,0,.3)]" /><figcaption className="mt-2 text-[13px] text-ink/60">Reverso</figcaption></figure>
        <p className="text-[13px] text-ink/60">Tamaño de impresión: 9 × 5 cm. Si la imprenta pide sangrado, indícales que el fondo llega hasta el borde.</p>
      </div>
      <div>
        <h2 className="font-display text-[1.8rem]">Datos de la tarjeta</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className={lab} htmlFor="c-name">Nombre</label><input id="c-name" className={input} value={info.name} onChange={set('name')} maxLength={60} /></div>
          <div className="sm:col-span-2"><label className={lab} htmlFor="c-role">Cargo</label><input id="c-role" className={input} value={info.role} onChange={set('role')} maxLength={60} /></div>
          <div><label className={lab} htmlFor="c-phone">WhatsApp</label><input id="c-phone" className={input} value={info.phone} onChange={set('phone')} maxLength={24} inputMode="tel" /></div>
          <div><label className={lab} htmlFor="c-mail">Correo (opcional)</label><input id="c-mail" className={input} value={info.email} onChange={set('email')} maxLength={80} type="email" /></div>
          <div className="sm:col-span-2"><label className={lab} htmlFor="c-web">Sitio web</label><input id="c-web" className={input} value={info.web} onChange={set('web')} maxLength={80} /></div>
          <div className="sm:col-span-2"><label className={lab} htmlFor="c-qr">El código QR abre…</label>
            <select id="c-qr" className={input} value={mode} onChange={(e) => setMode(e.target.value as QrMode)}>
              <option value="web">El sitio web</option><option value="vcard">Mi contacto (se guarda en el teléfono)</option><option value="whatsapp">Un chat de WhatsApp</option>
            </select></div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {actions.map(([name, ok, fn], i) => (
            <button key={name} type="button" disabled={busy} onClick={() => run(ok, fn)} className={`rounded-full px-5 py-3.5 text-[15px] font-semibold disabled:opacity-60 ${i === 0 ? 'bg-gold text-ink sm:col-span-2' : 'border border-ink/30 hover:border-cobalt hover:text-cobalt'}`}>{name}</button>
          ))}
        </div>
        <p role="status" className="mt-4 min-h-6 text-[14px] font-medium text-cobalt">{msg}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink/60">En el celular, “Enviar por WhatsApp” y “Enviar por correo” comparten el PDF directamente. En computadora abren el mensaje y debes adjuntar el PDF descargado. Los cambios se guardan solo en este navegador.</p>
      </div>
    </div>
  );
}
