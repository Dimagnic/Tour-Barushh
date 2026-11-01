import type { Metadata } from 'next';
import Script from 'next/script';
import '@fontsource/libre-caslon-display/400.css';
import '@fontsource/libre-caslon-text/400.css';
import '@fontsource/libre-caslon-text/700.css';
import '@fontsource/libre-caslon-text/400-italic.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/caveat/500.css';
import './globals.css';
import { site } from '@/data/site';
import { getContent, getGeneral, waDigits } from '@/lib/cms';
import { imageUrl } from '@/lib/media';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingActions } from '@/components/FloatingActions';
import { HideOnAdmin } from '@/components/HideOnAdmin';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getContent('seo');
  return {
    metadataBase: new URL(site.url),
    title: { default: seo.homeTitle, template: `%s | ${site.name}` },
    description: seo.homeDescription,
    alternates: { canonical: '/' },
    openGraph: { title: 'Tour Barushh, guías de turismo en Puebla', description: seo.homeDescription, type: 'website', siteName: site.name, locale: 'es_MX', images: [seo.shareImage ? imageUrl(seo.shareImage) : '/brand/logo.webp'] },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [g, about, seo] = await Promise.all([getGeneral(), getContent('about'), getContent('seo')]);
  const description = seo.homeDescription;
  const phone = `+${waDigits(g.whatsapp)}`;
  const sameAs = Object.values(g.social).filter(Boolean);
  const ld = {
    '@context': 'https://schema.org', '@type': 'TravelAgency', '@id': `${site.url}/#agencia`,
    name: site.name, url: site.url, description, inLanguage: 'es-MX',
    logo: `${site.url}/brand/logo.webp`, image: `${site.url}/brand/logo.webp`,
    telephone: phone,
    ...(g.email ? { email: g.email } : {}),
    address: { '@type': 'PostalAddress', addressLocality: 'Puebla', addressRegion: 'Puebla', addressCountry: 'MX' },
    areaServed: [{ '@type': 'City', name: 'Puebla' }, { '@type': 'City', name: 'Cholula' }, { '@type': 'State', name: 'Puebla' }],
    contactPoint: { '@type': 'ContactPoint', telephone: phone, contactType: 'reservations', availableLanguage: ['es'] },
    founder: { '@type': 'Person', name: about.guideName, jobTitle: about.guideRole },
    ...(sameAs.length ? { sameAs } : {}),
  };
  return (
    <html lang="es">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100000] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:font-bold">Saltar al contenido</a>
        <HideOnAdmin><Header whatsapp={g.whatsapp} reserveMessage={g.reserveMessage} /></HideOnAdmin>
        <main id="main">{children}</main>
        <HideOnAdmin>
          <Footer />
          <FloatingActions wa={waDigits(g.whatsapp)} msg={g.floatingMessage} topLabel="Volver arriba" />
          {g.clienteaiToken ? <Script src="https://clienteai.site/widget.js" data-token={g.clienteaiToken} strategy="afterInteractive" /> : null}
        </HideOnAdmin>
      </body>
    </html>
  );
}
