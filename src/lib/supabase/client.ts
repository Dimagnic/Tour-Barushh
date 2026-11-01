'use client';
import { createBrowserClient } from '@supabase/ssr';

/** Cliente de Supabase para el navegador (inicio de sesión del panel). */
export const supabaseBrowser = () =>
  createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
