# Tour Barushh · Guías de Turismo

Sitio web de Barushh (guías de turismo en Puebla, México). Next.js 15, React 19 y Tailwind 4. Una sola página en español, sin compras en línea: las reservas y cotizaciones se hacen por WhatsApp.

## Arranque
1. `npm install`
2. `npm run dev` y abre http://localhost:3000
3. Opcional: define `NEXT_PUBLIC_SITE_URL` con la URL pública (para el sitemap y los metadatos).

## Dónde editar
- `src/data/site.ts`: WhatsApp, correo, horario y enlaces de redes (al llenarlos aparecen en el footer).
- `src/data/content.ts`: experiencias, textos de las secciones y testimonios.
- `docs/FOTOS.md`: fotos clasificadas. Las que no se publican hasta tener permiso se entregan aparte y no deben subirse al repositorio.
- `src/data/site.ts`: también el enlace del video "Conoce Tour Barushh en 1 minuto" (`videoUrl`) y el de Cero+ (`ceroUrl`).
