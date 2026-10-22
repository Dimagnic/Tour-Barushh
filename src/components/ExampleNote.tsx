import { site } from '@/data/site';

/** Aviso visible mientras los textos sean de ejemplo (site.exampleContent). */
export function ExampleNote({ className = '' }: { className?: string }) {
  if (!site.exampleContent) return null;
  return <p className={`w-fit rounded-lg border border-terra/40 bg-terra/10 px-3 py-1.5 text-[13px] font-medium text-terra ${className}`}>Texto de ejemplo: se reemplazará con la información real del cliente.</p>;
}
