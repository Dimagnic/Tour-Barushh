import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { articles } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  return [site.url, `${site.url}/nosotros`, `${site.url}/belleza`, `${site.url}/articulos`, ...articles.map((a) => `${site.url}/articulos/${a.slug}`)].map((url) => ({ url }));
}
