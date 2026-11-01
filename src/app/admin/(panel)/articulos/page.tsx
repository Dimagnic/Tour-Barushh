import { SectionEditor } from '../editor/SectionEditor';
import { loadSection } from '../editor/load';

export const metadata = { title: 'Artículos' };

export default async function Page() {
  return <SectionEditor section="articles" values={await loadSection('articles')} />;
}
