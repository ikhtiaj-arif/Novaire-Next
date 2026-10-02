import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

/** Satori's `FontOptions['weight']` union (not re-exported by `next/og`). */
type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export const alt = 'NOVAIRE — Haute Parfumerie Fine';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const GOLD = '#c9a84c';
const INK = '#0a0a0a';
const FOREGROUND = '#f5f5f5';
const MUTED = '#9a9a9a';

/**
 * Static instances of the site's own fonts (see app/fonts/), read from disk at
 * build time. No network fetch, so builds are deterministic and offline-safe.
 */
async function loadFont(file: string, family: string, weight: FontWeight) {
  const data = await readFile(path.join(process.cwd(), 'app', 'fonts', file));

  return { name: family, data, style: 'normal' as const, weight };
}

export default async function OpengraphImage() {
  const [playfair, inter] = await Promise.all([
    loadFont('PlayfairDisplay-SemiBold.ttf', 'Playfair Display', 600),
    loadFont('Inter-Medium.ttf', 'Inter', 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: `linear-gradient(140deg, ${INK} 0%, #141414 55%, #1d1810 100%)`,
          padding: '64px 72px',
        }}
      >
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 52,
              height: 52,
              borderRadius: 14,
              border: `2px solid ${GOLD}`,
              color: GOLD,
              fontSize: 30,
              fontFamily: 'Playfair Display',
              fontWeight: 600,
            }}
          >
            N
          </div>

          <div
            style={{
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: 24,
              letterSpacing: 10,
              textTransform: 'uppercase',
              color: FOREGROUND,
            }}
          >
            Novaire
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: 'Playfair Display',
              fontWeight: 600,
              fontSize: 94,
              lineHeight: 1.04,
              letterSpacing: -2,
              color: '#ffffff',
            }}
          >
            L&apos;art du parfum
          </div>

          <div
            style={{
              fontFamily: 'Playfair Display',
              fontWeight: 600,
              fontSize: 94,
              lineHeight: 1.04,
              color: GOLD,
            }}
          >
            autrement.
          </div>

          <div
            style={{
              marginTop: 34,
              width: 96,
              height: 3,
              background: GOLD,
            }}
          />
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: MUTED,
          }}
        >
          <div>Extrait de parfum 25% · 50 ml</div>

          <div style={{ color: GOLD }}>Paiement à la livraison</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [playfair, inter],
    }
  );
}