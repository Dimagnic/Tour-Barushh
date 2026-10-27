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
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingActions } from '@/components/FloatingActions';

const description = 'Conoce Puebla y sus alrededores de la mano de guías locales: Cholula, pueblos mágicos, tours para grupos y transporte seguro.';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Tour Barushh | Guías de turismo en Puebla, Cholula y pueblos mágicos', template: `%s | ${site.name}` },
  description,
  alternates: { canonical: '/' },
  openGraph: { title: 'Tour Barushh, guías de turismo en Puebla', description, type: 'website', siteName: site.name, locale: 'es_MX', images: ['/brand/logo.webp'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const sameAs = Object.values(site.social).filter(Boolean);
  const ld = {
    '@context': 'https://schema.org', '@type': 'TravelAgency', '@id': `${site.url}/#agencia`,
    name: site.name, url: site.url, description, inLanguage: 'es-MX',
    logo: `${site.url}/brand/logo.webp`, image: `${site.url}/brand/logo.webp`,
    telephone: `+${site.whatsapp}`,
    ...(site.email ? { email: site.email } : {}),
    address: { '@type': 'PostalAddress', addressLocality: 'Puebla', addressRegion: 'Puebla', addressCountry: 'MX' },
    areaServed: [{ '@type': 'City', name: 'Puebla' }, { '@type': 'City', name: 'Cholula' }, { '@type': 'State', name: 'Puebla' }],
    contactPoint: { '@type': 'ContactPoint', telephone: `+${site.whatsapp}`, contactType: 'reservations', availableLanguage: ['es'] },
    founder: { '@type': 'Person', name: site.guide.name, jobTitle: site.guide.role },
    ...(sameAs.length ? { sameAs } : {}),
  };
  return (
    <html lang="es">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100000] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:font-bold">Saltar al contenido</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions wa={site.whatsapp} msg="Hola, quisiera información sobre sus tours en Puebla." topLabel="Volver arriba" />
        <Script src="https://clienteai.site/widget.js" data-token={site.clienteaiToken} strategy="afterInteractive" />
      </body>
    </html>
  );
}
