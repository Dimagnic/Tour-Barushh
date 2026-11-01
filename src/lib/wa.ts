/** Solo los dígitos del WhatsApp (para wa.me y tel:). */
export const waDigits = (display: string) => display.replace(/\D/g, '');
/** Crea la función que arma enlaces de WhatsApp con mensaje. */
export const waLink = (display: string) => (msg: string) => `https://wa.me/${waDigits(display)}?text=${encodeURIComponent(msg)}`;
