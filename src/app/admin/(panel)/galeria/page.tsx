import { SectionEditor } from '../editor/SectionEditor';
import { loadSection } from '../editor/load';

export const metadata = { title: 'Galería' };

export default async function Page() {
  return <SectionEditor section="gallery" values={await loadSection('gallery')} />;
}
