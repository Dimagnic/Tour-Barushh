export const site = {
  name: 'Tour Barushh',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tour-barushh.vercel.app',
  whatsapp: '522219663226',
  whatsappDisplay: '+52 221 966 3226',
  email: '', // pendiente: aparece en el footer cuando tenga valor
  hours: '', // pendiente
  social: { instagram: '', facebook: '', tiktok: '', youtube: '' } as Record<string, string>, // pendiente: pega aquí los enlaces
  videoUrl: '', // pendiente: enlace del video "Conoce Barushh en 1 minuto"
  ceroUrl: 'https://cero-new-generation-e19z.vercel.app/',
  clienteaiToken: 'qrzvhd8tq1o02mhq',
};
export const wa = (msg: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
export const nav: [string, string][] = [
  ['/#inicio', 'Inicio'], ['/#experiencias', 'Experiencias'], ['/#nosotros', 'Nosotros'],
  ['/#galeria', 'Galería'], ['/#testimonios', 'Testimonios'], ['/#contacto', 'Contacto'],
];
