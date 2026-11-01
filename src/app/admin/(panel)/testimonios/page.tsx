import { SectionEditor } from '../editor/SectionEditor';
import { loadSection } from '../editor/load';

export const metadata = { title: 'Testimonios' };

export default async function Page() {
  return <SectionEditor section="testimonials" values={await loadSection('testimonials')} />;
}
