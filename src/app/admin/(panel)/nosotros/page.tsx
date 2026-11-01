import { SectionEditor } from '../editor/SectionEditor';
import { loadSection } from '../editor/load';

export const metadata = { title: 'Nosotros' };

export default async function Page() {
  return <SectionEditor section="about" values={await loadSection('about')} />;
}
