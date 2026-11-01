'use client';
import { useActionState } from 'react';
import type { General } from '@/lib/cms';
import { saveGeneral, type SaveState } from '../../actions';

const input = 'w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-[15px] outline-none focus:border-gold';
const lab = 'mb-1.5 block text-[13px] font-semibold text-ink/75';
const hint = 'mt-1 text-[12px] text-ink/55';

function Field({ name, label, value, help, type = 'text', placeholder }: { name: string; label: string; value: string; help?: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className={lab}>{label}</label>
      <input id={name} name={name} type={type} defaultValue={value} placeholder={placeholder} className={input} />
      {help ? <p className={hint}>{help}</p> : null}
    </div>
  );
}

export function GeneralForm({ values: v }: { values: General }) {
  const [state, action, pending] = useActionState<SaveState, FormData>(saveGeneral, null);
  const box = 'rounded-2xl bg-[#fffdf8] p-6 shadow-[0_8px_26px_rgba(60,40,10,.08)] space-y-4';
  return (
    <form action={action} className="mt-8 space-y-6">
      <section className={box}>
        <h2 className="font-title text-[1.15rem] font-bold">Contacto</h2>
        <Field name="whatsapp" label="WhatsApp" value={v.whatsapp} placeholder="+52 221 213 9031" help="Con lada del país. Cambia todos los botones de WhatsApp del sitio." />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="email" label="Correo (opcional)" type="email" value={v.email} placeholder="contacto@ejemplo.com" />
          <Field name="hours" label="Horario (opcional)" value={v.hours} placeholder="Lunes a domingo, 8:00 a 20:00" />
        </div>
        <p className={hint}>El correo y el horario aparecen en el pie de página solo cuando tienen texto.</p>
      </section>
      <section className={box}>
        <h2 className="font-title text-[1.15rem] font-bold">Redes sociales</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="instagram" label="Instagram" value={v.social.instagram} placeholder="https://instagram.com/…" />
          <Field name="facebook" label="Facebook" value={v.social.facebook} placeholder="https://facebook.com/…" />
          <Field name="tiktok" label="TikTok" value={v.social.tiktok} placeholder="https://tiktok.com/@…" />
          <Field name="youtube" label="YouTube" value={v.social.youtube} placeholder="https://youtube.com/@…" />
        </div>
        <p className={hint}>Deja vacío el que no tengas: su ícono se muestra como “próximamente”.</p>
      </section>
      <section className={box}>
        <h2 className="font-title text-[1.15rem] font-bold">Mensajes de WhatsApp</h2>
        <Field name="reserveMessage" label="Botón “Reserva tu experiencia”" value={v.reserveMessage} help="Texto que se escribe solo en el chat cuando el visitante toca el botón." />
        <Field name="floatingMessage" label="Botón flotante verde" value={v.floatingMessage} />
      </section>
      <section className={box}>
        <h2 className="font-title text-[1.15rem] font-bold">Asistente virtual y avisos</h2>
        <Field name="clienteaiToken" label="Token de ClienteAI" value={v.clienteaiToken} help="Lo encuentras en el código del widget (data-token). Vacío = sin chat en el sitio." />
        <label className="flex items-start gap-3 text-[14px]">
          <input type="checkbox" name="exampleContent" defaultChecked={v.exampleContent} className="mt-1 size-4 accent-[#8a6d3b]" />
          <span>Mostrar el aviso “Texto de ejemplo” en Nosotros y Belleza<span className="block text-[12px] text-ink/55">Desmárcalo cuando esas secciones tengan la información real.</span></span>
        </label>
      </section>
      <div className="sticky bottom-0 -mx-1 flex flex-wrap items-center gap-4 bg-cream/95 px-1 py-4 backdrop-blur">
        <button type="submit" disabled={pending} className="rounded-full bg-gold px-8 py-3.5 text-[15px] font-semibold text-ink shadow hover:brightness-95 disabled:opacity-60">{pending ? 'Guardando…' : 'Guardar cambios'}</button>
        {state ? <p role="status" className={`text-[14px] font-medium ${state.ok ? 'text-[#2f7d4a]' : 'text-terra'}`}>{state.message}</p> : null}
      </div>
    </form>
  );
}
