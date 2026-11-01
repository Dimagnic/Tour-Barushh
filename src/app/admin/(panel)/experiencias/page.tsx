import { SectionEditor } from '../editor/SectionEditor';
import { loadSection } from '../editor/load';

export const metadata = { title: 'Experiencias' };

export default async function Page() {
  return <SectionEditor section="experiences" values={await loadSection('experiences')} />;
}
