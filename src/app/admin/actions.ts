'use server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdmin, supabaseServer } from '@/lib/supabase/server';
import { type General, withDefaults } from '@/lib/cms';
import { isSectionKey, schemas, validate } from '@/lib/cms-schema';
import { isValidImage } from '@/lib/media';

export type SaveState = { ok: boolean; message: string } | null;

/** Guarda una sección en Supabase y actualiza el sitio al instante. */
async function saveContent(key: string, data: unknown): Promise<SaveState> {
  const { sb, user, isAdmin } = await getAdmin();
  if (!user || !isAdmin) return { ok: false, message: 'Tu sesión expiró o no tienes permisos. Vuelve a iniciar sesión.' };
  const { error } = await sb.from('content').upsert({ key, data, updated_at: new Date().toISOString(), updated_by: user.id });
  if (error) return { ok: false, message: 'No se pudo guardar. Inténtalo de nuevo.' };
  revalidateTag('cms');
  revalidatePath('/', 'layout');
  return { ok: true, message: 'Guardado. El sitio ya muestra los cambios.' };
}

const str = (f: FormData, k: string) => String(f.get(k) ?? '').trim();
const isUrl = (v: string) => v === '' || /^https:\/\/\S+$/i.test(v);

export async function saveGeneral(_prev: SaveState, form: FormData): Promise<SaveState> {
  const data: General = withDefaults('general', {
    whatsapp: str(form, 'whatsapp'),
    email: str(form, 'email'),
    hours: str(form, 'hours'),
    social: { instagram: str(form, 'instagram'), facebook: str(form, 'facebook'), tiktok: str(form, 'tiktok'), youtube: str(form, 'youtube') },
    floatingMessage: str(form, 'floatingMessage'),
    reserveMessage: str(form, 'reserveMessage'),
    clienteaiToken: str(form, 'clienteaiToken'),
    exampleContent: form.get('exampleContent') === 'on',
  });
  if (data.whatsapp.replace(/\D/g, '').length < 10) return { ok: false, message: 'El WhatsApp debe tener al menos 10 dígitos, con lada (ej. +52 221 213 9031).' };
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return { ok: false, message: 'El correo no parece válido.' };
  const bad = Object.entries(data.social).find(([, v]) => !isUrl(v));
  if (bad) return { ok: false, message: `El enlace de ${bad[0]} debe empezar con https://` };
  if (data.clienteaiToken && !/^[a-z0-9]{8,64}$/i.test(data.clienteaiToken)) return { ok: false, message: 'El token de ClienteAI solo lleva letras y números.' };
  if (!data.floatingMessage || !data.reserveMessage) return { ok: false, message: 'Los mensajes de WhatsApp no pueden quedar vacíos.' };
  return saveContent('general', data);
}

/** Quita espacios sobrantes en todos los textos. */
const tidy = (v: unknown): unknown =>
  typeof v === 'string' ? v.replace(/\r\n/g, '\n').trim()
  : Array.isArray(v) ? v.map(tidy)
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, tidy(x)]))
  : v;

/** Guarda una sección editada con el formulario genérico (portada, experiencias, galería, testimonios…). */
export async function saveSection(key: string, data: unknown): Promise<SaveState> {
  if (!isSectionKey(key)) return { ok: false, message: 'Sección desconocida.' };
  const clean = withDefaults(key, tidy(data)) as unknown as Record<string, unknown>;
  const err = validate(schemas[key].groups.flatMap((g) => g.fields), clean, isValidImage);
  if (err) return { ok: false, message: err };
  return saveContent(key, clean);
}

export async function signOut() {
  const sb = await supabaseServer();
  await sb.auth.signOut();
  redirect('/admin/login');
}
