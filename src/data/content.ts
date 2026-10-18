export type IconName = 'badge' | 'pin' | 'group' | 'van' | 'heart' | 'shield' | 'landmark' | 'mountain' | 'food' | 'star' | 'route' | 'chat';

export const heroFeatures: { icon: IconName; t: string }[] = [
  { icon: 'badge', t: 'Guías locales certificados' }, { icon: 'pin', t: 'Experiencias a tu medida' },
  { icon: 'group', t: 'Grupos privados y personalizados' }, { icon: 'van', t: 'Transporte seguro y cómodo' },
  { icon: 'heart', t: 'Atención cálida y cercana' },
];
export const experiences = [
  { place: 'Puebla', title: 'Ciudad de Puebla', text: 'Historia, arte, arquitectura y sabor en cada rincón.', photo: 'catedral-puebla' },
  { place: 'Cholula', title: 'Pirámides y tradiciones', text: 'Cultura, vistas espectaculares y pueblos con alma.', photo: 'iglesia-talavera' },
  { place: 'Pueblos mágicos', title: 'Atlixco, Chignahuapan y más', text: 'Naturaleza, artesanías y experiencias locales.', photo: 'calle-empedrada' },
  { place: 'Experiencias especiales', title: 'Tours para grupos', text: 'Viajes empresariales, familiares y personalizados.', photo: 'grupo-muro-rojo-2' },
];
export const living: { icon: IconName; t: string }[] = [
  { icon: 'landmark', t: 'Cultura viva' }, { icon: 'mountain', t: 'Paisajes únicos' },
  { icon: 'food', t: 'Gastronomía local' }, { icon: 'star', t: 'Experiencias auténticas' },
];
export const essence: { icon: IconName; t: string }[] = [
  { icon: 'heart', t: 'Pasión por nuestra tierra' }, { icon: 'group', t: 'Trato personalizado' },
  { icon: 'shield', t: 'Seguridad en cada viaje' }, { icon: 'badge', t: 'Experiencia comprobada' },
];
export const gallery = ['mesa-tradicional', 'comida-grupo', 'puesto-textiles', 'cascada-doble-2', 'bus-turistico', 'nido-mirador', 'vista-pueblo-iglesia', 'guia-mirador-1'];
export const ctaList: { icon: IconName; t: string }[] = [
  { icon: 'route', t: 'Itinerarios personalizados' }, { icon: 'group', t: 'Grupos familiares y empresariales' },
  { icon: 'van', t: 'Transporte seguro' }, { icon: 'chat', t: 'Asesoría directa por WhatsApp' },
];
// Testimonios tomados de la propuesta del cliente: confirmar que son reales y que tienen permiso para publicarse.
export const testimonials = [
  { name: 'Mario G.', text: 'Una experiencia increíble, excelente organización y guías muy amables. Conocimos lugares hermosos y aprendimos muchísimo.' },
  { name: 'Jorge R.', text: 'Todo estuvo perfecto, desde el transporte hasta cada detalle del recorrido. Se nota el amor por Puebla en lo que hacen.' },
  { name: 'Ana L.', text: 'Viajamos en grupo y lo pasamos espectacular. Definitivamente volveremos a reservar con Barushh.' },
];
