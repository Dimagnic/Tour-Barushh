import { SectionEditor } from '../editor/SectionEditor';
import { loadSection } from '../editor/load';

export const metadata = { title: 'Términos y condiciones' };

export default async function Page() {
  return <SectionEditor section="terms" values={await loadSection('terms')} />;
}
