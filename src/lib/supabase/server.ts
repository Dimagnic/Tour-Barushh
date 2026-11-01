import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/** Cliente de Supabase para el servidor con la sesión del usuario (cookies). Respeta los permisos (RLS). */
export async function supabaseServer() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* en páginas de solo lectura no se pueden escribir cookies */ }
      },
    },
  });
}

/** Usuario actual y si es administrador (tabla public.admins). */
export async function getAdmin() {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return { sb, user: null, isAdmin: false };
  const { data } = await sb.rpc('is_admin');
  return { sb, user, isAdmin: data === true };
}
