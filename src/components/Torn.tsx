/** Fondo rasgado de una sección (se dibuja detrás del contenido). */
export function Torn({ children, className = '', b = false }: { children?: React.ReactNode; className?: string; b?: boolean }) {
  return <div aria-hidden="true" className={`absolute inset-x-0 -top-5 bottom-0 overflow-hidden ${b ? 'torn-top-b' : 'torn-top'} ${className}`}>{children}</div>;
}
