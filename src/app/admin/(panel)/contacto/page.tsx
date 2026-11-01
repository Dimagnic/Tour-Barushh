import { SectionEditor } from '../editor/SectionEditor';
import { loadSection } from '../editor/load';

export const metadata = { title: 'Contacto' };

export default async function Page() {
  return <SectionEditor section="contact" values={await loadSection('contact')} />;
}
