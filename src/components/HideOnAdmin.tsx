'use client';
import { usePathname } from 'next/navigation';

/** Oculta partes del sitio público (encabezado, pie, botones flotantes, chat) dentro del panel /admin. */
export function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return path.startsWith('/admin') ? null : <>{children}</>;
}
