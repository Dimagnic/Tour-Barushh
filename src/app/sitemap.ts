import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { getContent } from '@/lib/cms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [art, privacy, terms] = await Promise.all([getContent('articles'), getContent('privacy'), getContent('terms')]);
  const legal = [privacy.body ? `${site.url}/legal/privacy` : '', terms.body ? `${site.url}/legal/terms` : ''].filter(Boolean);
  return [site.url, `${site.url}/nosotros`, `${site.url}/belleza`, `${site.url}/articulos`, ...art.items.map((a) => `${site.url}/articulos/${a.slug}`), ...legal].map((url) => ({ url }));
}
