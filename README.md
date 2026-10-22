# Barushh · Guías de Turismo

Sitio web de Barushh (guías de turismo en Puebla, México). Next.js 15, React 19 y Tailwind 4. Una sola página en español, sin compras en línea: las reservas y cotizaciones se hacen por WhatsApp.

## Arranque
1. `npm install`
2. `npm run dev` y abre http://localhost:3000
3. Opcional: define `NEXT_PUBLIC_SITE_URL` con la URL pública (para el sitemap y los metadatos).

## Dónde editar
- `src/data/site.ts`: WhatsApp, correo, horario y enlaces de redes (al llenarlos aparecen en el footer).
- `src/data/content.ts`: experiencias, textos de las secciones y testimonios.
- `docs/FOTOS.md`: fotos clasificadas. En `_fotos-por-revisar/` están las que no se publican hasta tener permiso.

## Secciones nuevas
- `/nosotros`: biografía de José Carranza, misión, visión y política (textos de ejemplo: `src/data/about.ts`; el aviso se apaga con `exampleContent: false` en `site.ts`).
- `/belleza`: catálogo de artículos de belleza naturales y artesanales (productos de ejemplo en `src/data/belleza.ts`; sin compra en línea, se piden por WhatsApp).
- `/articulos`: artículos de viaje sobre Puebla (`src/data/articles.ts`).
- `/admin/tarjeta`: espacio del administrador para descargar la tarjeta de presentación (PDF, PNG y QR). No aparece en el menú ni en Google.
