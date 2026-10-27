export const site = {
  name: 'Tour Barushh',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tour-barushh.vercel.app',
  whatsapp: '522212139031',
  whatsappDisplay: '+52 221 213 9031',
  email: '', // pendiente: aparece en el footer cuando tenga valor
  hours: '', // pendiente
  social: { instagram: '', facebook: '', tiktok: '', youtube: '' } as Record<string, string>, // pendiente: pega aquí los enlaces
  // VIDEOS: pega el enlace de YouTube, de Vimeo o de un archivo .mp4 (por ejemplo '/videos/institucional.mp4' dentro de public/).
  videoUrl: '', // video corto de la portada: botón "Conoce Tour Barushh en 1 minuto" (aparece solo cuando tiene enlace)
  videoInstitucional: '', // video de la sección "Conócenos en video" de Nosotros; si queda vacío usa videoUrl
  videoPoster: 'grupo-mirador', // foto de portada del video en Nosotros (id de src/data/photos.json)
  ceroUrl: 'https://cero-new-generation-e19z.vercel.app/',
  clienteaiToken: 'cuxcpcmttdtaqp9p',
  // Datos del guía fundador: se usan en la biografía y en la tarjeta. Cambia el nombre cuando el cliente lo confirme.
  guide: { name: 'José Carranza', role: 'Guía de turistas · Fundador', photo: 'guia-calle-colonial', photo2: 'guia-mirador-1' },
  exampleContent: true, // muestra el aviso "texto de ejemplo" en Nosotros; ponlo en false cuando el cliente entregue la información real
};
export const wa = (msg: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
export const nav: [string, string][] = [
  ['/', 'Inicio'], ['/#experiencias', 'Experiencias'], ['/nosotros', 'Nosotros'], ['/#galeria', 'Galería'],
  ['/belleza', 'Belleza'], ['/#testimonios', 'Testimonios'], ['/#contacto', 'Contacto'],
];
