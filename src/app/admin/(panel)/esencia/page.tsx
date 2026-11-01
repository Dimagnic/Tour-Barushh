import { SectionEditor } from '../editor/SectionEditor';
import { loadSection } from '../editor/load';

export const metadata = { title: 'Nuestra esencia' };

export default async function Page() {
  return <SectionEditor section="essence" values={await loadSection('essence')} />;
}
