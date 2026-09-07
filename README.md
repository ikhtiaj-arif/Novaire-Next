# NOVAIRE — Haute Parfumerie Fine

> **Novaire** is a premium fragrance brand landing page and Cash-on-Delivery (COD) lead capture system built for the Moroccan market. Mobile-first, light/dark theming, three price-testing variants, and Google Sheets lead sync via Zapier. Architecture follows `novaire-project-spec.docx`.

---

## Key Features

- **Price Variant Testing** (dynamic route `/[variant]`, spec §2.3):
  - `/a` — 12 fragrances at **299 DH**
  - `/b` — 12 fragrances at **399 DH**
  - `/c` — 12 fragrances at **499 DH**
  - `/` — 307 redirects to `/a`
- **12-Fragrance Grid**: scent number + name (Playfair), French description, scent-note pills (shadcn Badge), price, quantity selector (+/-).
- **Order Bottom Sheet**: tapping **Commander** opens a shadcn Sheet (bottom sheet on mobile, slides up `translateY(100%→0)` at `cubic-bezier(0.32,0.72,0,1)` 350ms; centered Dialog on `lg:`).
  - Read-only summary (qty × price = total DH), then form: **Nom Complet**, **Téléphone** (regex `/^(\+212|06|07)[0-9]{8}$/`), **Ville** (searchable Command + Popover over full Morocco city list).
  - CTA **CONFIRMER MA COMMANDE** with states: default → loading (spinner) → error.
- **Google Sheets via Zapier**: `/api/submit` re-validates server-side (never trusts client), generates the timestamp server-side, and POSTs to `ZAPIER_WEBHOOK_URL`.
- **Analytics**: Meta Pixel + TikTok Pixel base scripts (placeholder IDs). Custom `ConfirmOrder` event fires on both only after a successful submit.
- **Thank You page (`/thank-you`)**: bilingual FR/AR — Arabic paragraph with `dir="rtl"`, French with default `ltr`. Same theme, no form, no back button.
- **Theme**: next-themes toggle (Sun/Moon) in the sticky header — works on all pages.

---

## Folder Structure

```text
app/
├── [variant]/page.tsx      # Dynamic route (a | b | c) → price map + generateStaticParams
├── thank-you/page.tsx      # Bilingual confirmation page
├── api/submit/route.ts     # POST handler → server validation → Zapier webhook
├── layout.tsx              # Root layout: fonts, pixels, next-themes, Header
├── globals.css             # Tailwind v4 tokens + light/dark CSS variables + animations
├── sitemap.ts / robots.ts
└── page.tsx                # 307 redirect → /a
components/
├── landing/
│   ├── LandingPage.tsx     # Root composition { variant, price }
│   ├── Header.tsx          # Logo + theme toggle (no nav / no hamburger)
│   ├── Hero.tsx            # Gradient placeholder, heading, trust badges
│   ├── TrustStrip.tsx      # 2×2 delivery info icons
│   ├── ProductGrid.tsx     # 1 / 2 / 3-column responsive grid
│   ├── ProductCard.tsx     # Image placeholder, name, desc, pills, price, qty, Commander
│   └── OrderModal.tsx      # Bottom sheet / dialog: summary + form + CTA states
└── ui/                     # shadcn components (Base UI)
hooks/
├── useOrderModal.ts        # Modal open/close, selected scent, qty, live total
└── useInView.ts            # Scroll-reveal IntersectionObserver
lib/
├── fragrances.ts           # Single source of truth: 12 fragrance objects
├── variants.ts             # { a: 299, b: 399, c: 499 }
├── validation.ts           # Shared client + server validators
├── cities.ts               # Full Morocco city list
└── pixels.ts               # fbq + ttq ConfirmOrder helpers
```

---

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # or create it with the vars below
npm run dev
```

### Environment Variables (`.env.local`)

```env
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/...   # appends lead to Google Sheet
NEXT_PUBLIC_META_PIXEL_ID=PLACEHOLDER_META_PIXEL_ID   # client provides real ID
NEXT_PUBLIC_TIKTOK_PIXEL_ID=PLACEHOLDER_TIKTOK_PIXEL_ID # client provides real ID
```

---

## Routes to Test

| Route | Variant | Price | Notes |
|---|---|---|---|
| `/a` | A | 299 DH | Canonical variant page |
| `/b` | B | 399 DH | Canonical variant page |
| `/c` | C | 499 DH | Canonical variant page |
| `/thank-you` | — | — | Noindex, disabled from robots |

---

## Production Build

```bash
npm run lint
npm run build
npm run start
```

---

## Pending From Client

- Hero bottle mockup image → slots into the gradient placeholder (Hero.tsx).
- Real Meta / TikTok Pixel IDs → replace `.env.local` placeholders (layout injects them).
- Zapier webhook + Google Sheet → set `ZAPIER_WEBHOOK_URL` and map payload columns.

© 2026 **Novaire**. All rights reserved.