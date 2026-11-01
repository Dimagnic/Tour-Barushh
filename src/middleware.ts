import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/** Protege /admin: sin sesión manda a /admin/login. También renueva la sesión en cada visita. */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isLogin = request.nextUrl.pathname.startsWith('/admin/login');
  if (!url || !key) return isLogin ? response : NextResponse.redirect(new URL('/admin/login', request.url));

  const sb = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  const { data: { user } } = await sb.auth.getUser();

  if (!user && !isLogin) {
    const to = request.nextUrl.clone();
    to.pathname = '/admin/login';
    to.search = `?next=${encodeURIComponent(request.nextUrl.pathname)}`;
    return NextResponse.redirect(to);
  }
  if (user && isLogin) return NextResponse.redirect(new URL('/admin', request.url));
  return response;
}

export const config = { matcher: ['/admin', '/admin/:path*'] };
