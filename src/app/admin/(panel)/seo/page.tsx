import { SectionEditor } from '../editor/SectionEditor';
import { loadSection } from '../editor/load';

export const metadata = { title: 'SEO' };

export default async function Page() {
  return <SectionEditor section="seo" values={await loadSection('seo')} />;
}
