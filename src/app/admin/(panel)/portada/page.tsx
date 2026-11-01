import { SectionEditor } from '../editor/SectionEditor';
import { loadSection } from '../editor/load';

export const metadata = { title: 'Encabezado y portada' };

export default async function Page() {
  return <SectionEditor section="hero" values={await loadSection('hero')} />;
}
