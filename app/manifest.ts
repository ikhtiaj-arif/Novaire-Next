import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NOVAIRE — Haute Parfumerie Fine',
    short_name: 'NOVAIRE',
    description:
      "L'excellence des plus grandes maisons de parfum mondiales enfin accessible au Maroc. Paiement à la livraison.",
    start_url: '/a',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'fr',
    dir: 'ltr',
    theme_color: '#0a0a0a',
    background_color: '#0a0a0a',
    categories: ['shopping', 'lifestyle'],
    icons: [
      {
        src: '/logo/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/logo/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/logo/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/logo/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}