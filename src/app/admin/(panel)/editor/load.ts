import { withDefaults } from '@/lib/cms';
import type { SectionKey } from '@/lib/cms-schema';
import { getAdmin } from '@/lib/supabase/server';

/** Lee directo de Supabase (sin caché) lo guardado en una sección, combinado con los valores por defecto. */
export async function loadSection(key: SectionKey) {
  const { sb } = await getAdmin();
  const { data } = await sb.from('content').select('data').eq('key', key).maybeSingle();
  return withDefaults(key, data?.data) as unknown as Record<string, unknown>;
}
