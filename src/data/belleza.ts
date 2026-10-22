// PRODUCTOS DE EJEMPLO: nombres, ingredientes y categorías son provisionales hasta que el cliente entregue su catálogo real.
export type Kind = 'soap' | 'jar' | 'bottle' | 'tin' | 'spray' | 'bowl';
export interface Product { id: string; name: string; category: string; desc: string; ingredients: string[]; kind: Kind; bg: string; fg: string }

export const categories = ['Jabones', 'Cremas y bálsamos', 'Cabello', 'Exfoliantes y mascarillas', 'Aguas y aromas'];

export const products: Product[] = [
  { id: 'jabon-avena-miel', name: 'Jabón de avena y miel', category: 'Jabones', desc: 'Jabón en barra hecho a mano, de espuma suave y aroma dulce.', ingredients: ['Avena', 'Miel', 'Aceite de oliva'], kind: 'soap', bg: '#efe3c8', fg: '#8a6d3b' },
  { id: 'jabon-lavanda', name: 'Jabón de lavanda', category: 'Jabones', desc: 'Barra artesanal con flores secas de lavanda y un aroma relajante.', ingredients: ['Lavanda', 'Aceite de coco', 'Aceite de oliva'], kind: 'soap', bg: '#e4dcef', fg: '#6a4f9a' },
  { id: 'jabon-cacao', name: 'Jabón de cacao y café', category: 'Jabones', desc: 'Jabón de textura ligeramente exfoliante, con aroma a chocolate y café.', ingredients: ['Cacao', 'Café', 'Aceite de coco'], kind: 'soap', bg: '#e8d8cc', fg: '#6b3f2a' },
  { id: 'crema-aloe-nopal', name: 'Crema corporal de aloe y nopal', category: 'Cremas y bálsamos', desc: 'Crema fresca y ligera para el día a día, con ingredientes de la región.', ingredients: ['Aloe vera', 'Nopal', 'Manteca de cacao'], kind: 'jar', bg: '#dfead6', fg: '#4a7a3a' },
  { id: 'balsamo-labial', name: 'Bálsamo labial de cera de abeja', category: 'Cremas y bálsamos', desc: 'Bálsamo artesanal en lata, con un toque de miel.', ingredients: ['Cera de abeja', 'Miel', 'Aceite de almendras'], kind: 'tin', bg: '#f1e2b8', fg: '#a8761c' },
  { id: 'crema-manos-calendula', name: 'Crema de manos de caléndula', category: 'Cremas y bálsamos', desc: 'Crema espesa para manos, con flor de caléndula y aroma suave.', ingredients: ['Caléndula', 'Cera de abeja', 'Aceite de almendras'], kind: 'jar', bg: '#f4dfb0', fg: '#c8791c' },
  { id: 'aceite-almendras', name: 'Aceite de almendras dulces', category: 'Cabello', desc: 'Aceite ligero para cuerpo y cabello, en frasco con gotero.', ingredients: ['Almendras dulces'], kind: 'bottle', bg: '#efe3c8', fg: '#8a6d3b' },
  { id: 'shampoo-romero', name: 'Shampoo sólido de romero', category: 'Cabello', desc: 'Shampoo en barra, práctico para viajar y con menos empaque.', ingredients: ['Romero', 'Aceite de coco', 'Aceite de oliva'], kind: 'soap', bg: '#dfead6', fg: '#4a7a3a' },
  { id: 'exfoliante-cafe', name: 'Exfoliante de café y cacao', category: 'Exfoliantes y mascarillas', desc: 'Exfoliante corporal con aroma a café recién molido.', ingredients: ['Café', 'Cacao', 'Azúcar mascabado', 'Aceite de coco'], kind: 'bowl', bg: '#e8d8cc', fg: '#6b3f2a' },
  { id: 'mascarilla-arcilla', name: 'Mascarilla de arcilla y manzanilla', category: 'Exfoliantes y mascarillas', desc: 'Mascarilla en polvo para mezclar con agua, con flor de manzanilla.', ingredients: ['Arcilla', 'Manzanilla', 'Avena'], kind: 'bowl', bg: '#e6e4d6', fg: '#7a7a4a' },
  { id: 'agua-rosas', name: 'Agua floral de rosas', category: 'Aguas y aromas', desc: 'Bruma ligera para refrescar, con aroma a pétalos de rosa.', ingredients: ['Pétalos de rosa', 'Agua destilada'], kind: 'spray', bg: '#f3dde0', fg: '#b04a5e' },
  { id: 'vela-soya', name: 'Vela de soya con esencias naturales', category: 'Aguas y aromas', desc: 'Vela artesanal vertida a mano, de combustión limpia y aroma suave.', ingredients: ['Cera de soya', 'Esencias naturales'], kind: 'jar', bg: '#f1e2b8', fg: '#a8761c' },
];
export const ingredients = ['Aloe vera', 'Nopal', 'Avena', 'Miel', 'Cera de abeja', 'Cacao', 'Café', 'Lavanda', 'Caléndula', 'Romero', 'Manzanilla', 'Pétalos de rosa', 'Almendras dulces', 'Aceite de coco', 'Aceite de oliva'];
