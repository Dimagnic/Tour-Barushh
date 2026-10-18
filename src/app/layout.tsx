import type { Metadata } from 'next';
import Script from 'next/script';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/cormorant-garamond/600-italic.css';
import '@fontsource/caveat/500.css';
import '@fontsource-variable/source-sans-3';
import './globals.css';
import { site, wa } from '@/data/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingActions } from '@/components/FloatingActions';

const description = 'Conoce Puebla y sus alrededores de la mano de guías locales: Cholula, pueblos mágicos, tours para grupos y transporte seguro.';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Barushh Guías de Turismo | Tours en Puebla, Cholula y pueblos mágicos', template: `%s | ${site.name}` },
  description,
  alternates: { canonical: '/' },
  openGraph: { title: 'Barushh Guías de Turismo', description, type: 'website', siteName: site.name, locale: 'es_MX', images: ['/brand/logo.webp'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = { '@context': 'https://schema.org', '@type': 'TravelAgency', name: site.name, url: site.url, telephone: '+522219663226', areaServed: 'Puebla, México', inLanguage: 'es' };
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
