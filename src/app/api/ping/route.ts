/**
 * Lo llama Vercel una vez al día (ver vercel.json) para que Supabase registre actividad
 * y no pause el proyecto del plan gratuito tras 7 días sin uso.
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return Response.json({ ok: false, reason: 'Supabase no configurado' });
  try {
    const res = await fetch(`${url}/rest/v1/content?select=key&limit=1`, { headers: { apikey: key }, cache: 'no-store' });
    return Response.json({ ok: res.ok, status: res.status });
  } catch {
    return Response.json({ ok: false, reason: 'Sin conexión con Supabase' }, { status: 502 });
  }
}
