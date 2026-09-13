import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { MetaPageView } from '@/components/pixels/MetaPageView';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// Accept both the canonical NEXT_PUBLIC_* name and the unprefixed fallback,
// so the pixel IDs resolve regardless of which Vercel env var is set.
const metaPixelId =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || process.env.META_PIXEL_ID || '';
const tiktokPixelId =
  process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || process.env.TIKTOK_PIXEL_ID || '';

export const metadata: Metadata = {
  metadataBase: new URL('https://novaire.ma'),
  title: {
    default: 'NOVAIRE | Haute Parfumerie Fine au Maroc',
    template: '%s | NOVAIRE',
  },
  description:
    "L'excellence des plus grandes maisons de parfum mondiales enfin accessible au Maroc. Paiement à la livraison. Livraison rapide partout au Maroc.",
  keywords: [
    'parfum maroc',
    'parfum luxe maroc',
    'novaire',
    'parfumerie fine',
    'parfum marocain',
    'livraison maroc',
    'fragrance maroc',
    'paiement livraison',
  ],
  authors: [{ name: 'NOVAIRE' }],
  creator: 'NOVAIRE',
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://novaire.ma',
    title: 'NOVAIRE | Haute Parfumerie Fine au Maroc',
    description:
      "L'excellence des plus grandes maisons de parfum mondiales enfin accessible au Maroc.",
    siteName: 'NOVAIRE',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NOVAIRE — Haute Parfumerie Fine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOVAIRE | Haute Parfumerie Fine',
    description:
      "L'excellence des plus grandes maisons de parfum mondiales enfin accessible au Maroc.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      data-meta-pixel-id={metaPixelId}
      data-tiktok-pixel-id={tiktokPixelId}
      className={`${playfair.variable} ${inter.variable}`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'NOVAIRE',
              url: 'https://novaire.ma',
              description:
                'Haute parfumerie fine accessible au Maroc. Paiement à la livraison.',
              sameAs: [],
            }),
          }}
        />

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            ${metaPixelId ? `fbq('init','${metaPixelId}');` : "console.warn('[NOVAIRE] Meta pixel ID is not configured');"}
            ${metaPixelId ? "fbq('track','PageView');" : ''}
          `}
        </Script>

        {metaPixelId && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<img height="1" width="1" src="https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1"/>`,
            }}
          />
        )}

        {/* TikTok Pixel */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
              ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
              ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;
              ttq._o=ttq._o||{};ttq._o[e]=n||{};var a=document.createElement("script");
              a.type="text/javascript";a.async=!0;a.src=r+"?sdkid="+e+"&lib="+t;
              var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(a,s)};
              ${tiktokPixelId ? `ttq.load('${tiktokPixelId}');` : "console.warn('[NOVAIRE] TikTok pixel ID is not configured');"}
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-gold/30 selection:text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MetaPageView />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}