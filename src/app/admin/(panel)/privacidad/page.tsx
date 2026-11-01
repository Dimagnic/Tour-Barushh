import { SectionEditor } from '../editor/SectionEditor';
import { loadSection } from '../editor/load';

export const metadata = { title: 'Aviso de privacidad' };

export default async function Page() {
  return <SectionEditor section="privacy" values={await loadSection('privacy')} />;
}
