import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
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

        {/* Meta Pixel — Placeholder */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID || 'PLACEHOLDER_META_PIXEL_ID'}');
            fbq('track','PageView');
          `}
        </Script>

        {/* TikTok Pixel — Placeholder */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
            ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
            ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
            for(var e=0;e<ttq.methods.length;e++)ttq.setAndDefer(ttq,ttq.methods[e]);
            ttq.instance=function(t){for(var e=ttq.methods[t]||[],n=0;n<e.length;n++)ttq.setAndDefer(e,e[n]);return e};
            ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
            ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},
            ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
            var o=document.createElement("script");o.type="text/javascript",o.async=!0,
            o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];
            a.parentNode.insertBefore(o,a)};
            ttq.load('${process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || 'PLACEHOLDER_TIKTOK_PIXEL_ID'}');ttq.page()}(window,document,'ttq');
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
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}