import { withDefaults } from '@/lib/cms';
import { getAdmin } from '@/lib/supabase/server';
import { GeneralForm } from './GeneralForm';

export const metadata = { title: 'Datos generales' };

export default async function GeneralPage() {
  const { sb } = await getAdmin();
  const { data } = await sb.from('content').select('data').eq('key', 'general').maybeSingle();
  const values = withDefaults('general', data?.data);
  return (
    <div className="max-w-3xl">
      <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-brown">Configuración</p>
      <h1 className="mt-2 font-display text-[2.4rem] leading-tight">Datos generales</h1>
      <p className="mt-2 text-[15px] text-ink/70">Se usan en todo el sitio: encabezado, botones, pie de página, botón flotante, tarjeta y datos para Google.</p>
      <GeneralForm values={values} />
    </div>
  );
}
