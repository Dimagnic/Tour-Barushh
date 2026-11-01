import { SectionEditor } from '../editor/SectionEditor';
import { loadSection } from '../editor/load';

export const metadata = { title: 'Vive la experiencia' };

export default async function Page() {
  return <SectionEditor section="living" values={await loadSection('living')} />;
}
