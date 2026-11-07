const dev = process.env.NODE_ENV !== 'production';
// Origen de Supabase (panel de administración: inicio de sesión desde el navegador)
const supabase = (() => { try { return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').origin; } catch { return ''; } })();
// Política de contenido: scripts solo del propio sitio, de ClienteAI (widget de chat) y del traductor de Google (botón ES | EN).
// Conexiones, imágenes y marcos se permiten por https para no romper el widget.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://clienteai.site https://*.clienteai.site https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com${dev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  `connect-src 'self' https: wss:${supabase ? ` ${supabase}` : ''}${dev ? ' ws:' : ''}`,
  "frame-src https:",
  "media-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me",
  "frame-ancestors 'none'",
  ...(dev ? [] : ['upgrade-insecure-requests']),
].join('; ');

/** @type {import('next').NextConfig} */
const config = {
  // Fotos subidas desde el panel (Supabase Storage)
  images: { remotePatterns: [{ protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' }] },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};
export default config;
