import { SectionEditor } from '../editor/SectionEditor';
import { loadSection } from '../editor/load';

export const metadata = { title: 'Belleza' };

export default async function Page() {
  return <SectionEditor section="beauty" values={await loadSection('beauty')} />;
}
