# NOVAIRE — Haute Parfumerie Fine

![Novaire Brand](public/file.svg)

> **Novaire** is a premium fragrance brand landing page and Cash-on-Delivery (COD) lead capture system built for the Moroccan market. Designed with an ultra-luxury dark aesthetic, mobile-first responsiveness, price testing variants, and Google Sheets lead synchronization.

---

## 🌟 Key Features

- **Pricing Variant Testing**:
  - `/a` — All 12 fragrances priced at **299 DH**
  - `/b` — All 12 fragrances priced at **399 DH**
  - `/c` — All 12 fragrances priced at **499 DH**
  - `/` — Default landing page (299 DH)
- **12-Fragrance Collection Grid**:
  - Displays scent name, French description, olfactory notes, price, and quantity selectors.
  - Clicking **"Commander"** auto-selects the fragrance and smooth-scrolls to the checkout form.
- **Mobile-First COD Checkout Form**:
  - **Nom Complet / الاسم الكامل**: Full name input.
  - **Téléphone / رقم الهاتف**: Moroccan phone number validation regex (`/^(\+212|06|07)[0-9]{8}$/`).
  - **Ville / المدينة**: Full Moroccan city dropdown (Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir, etc.).
  - **Parfum Sélectionné**: Pre-filled fragrance selection.
  - **Animated Gold CTA**: `تأكيد الطلب | CONFIRMER MA COMMANDE`.
- **Google Sheets & Webhook Integration**:
  - Submits leads via `/api/submit` API route.
  - Forwards lead payloads (`name`, `phone`, `city`, `scent`, `variant`, `totalPrice`, `timestamp`) to Google Sheets via Webhook.
- **Thank You Page (`/thank-you`)**:
  - Custom confirmation page featuring Arabic & French text regarding stock availability and priority WhatsApp reservation.
- **Analytics & Pixel Tracking**:
  - Built-in Meta (Facebook) Pixel & TikTok Pixel base scripts.
  - Automatic triggering of custom `ConfirmOrder` events on form submission.

---

## 📁 Folder Structure

```text
novaire-app/
├── app/
│   ├── a/
│   │   └── page.tsx              # Variant A Route (299 DH)
│   ├── b/
│   │   └── page.tsx              # Variant B Route (399 DH)
│   ├── c/
│   │   └── page.tsx              # Variant C Route (499 DH)
│   ├── api/
│   │   └── submit/
│   │       └── route.ts          # Lead Capture API Route
│   ├── thank-you/
│   │   └── page.tsx              # Thank You Confirmation Page
│   ├── globals.css               # Tailwind CSS directives & global dark theme
│   ├── layout.tsx                # Root layout with Pixel scripts & Theme Provider
│   └── page.tsx                  # Home Route (Variant A)
├── components/
│   ├── CheckoutForm.tsx          # COD Form with Moroccan phone validation & city list
│   ├── Footer.tsx                # Luxury Minimal Footer
│   ├── Header.tsx                # Sticky Navigation Header & Dark Mode Toggle
│   ├── Hero.tsx                  # Hero Banner & Trust Badges
│   ├── LandingPage.tsx           # Unified wrapper component for variants
│   └── ProductGrid.tsx           # 12 Fragrance Cards Grid
├── lib/
│   ├── constants.ts              # Fragrances list, Moroccan cities, and Pricing map
│   └── pixels.ts                 # Meta & TikTok Pixel tracking helper functions
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration with gold accent palette
└── package.json
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: v18.x or later
- **npm** or **yarn** / **pnpm**

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd novaire-app
npm install
```

### 2. Configure Environment Variables (Optional)

Create a `.env.local` file in the root directory:

```env
# Webhook URL for Google Sheets / Zapier / Make.com lead integration
GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧪 Routes to Test

| Route | Variant | Price | Description |
|---|---|---|---|
| `/a` | Variant A | **299 DH** | Pricing Test A |
| `/b` | Variant B | **399 DH** | Pricing Test B |
| `/c` | Variant C | **499 DH** | Pricing Test C |
| `/thank-you` | — | — | Order confirmation page |

---

## 🛠️ Production Build

To build the production bundle and verify TypeScript types:

```bash
npm run build
npm run start
```

---

## 📊 Analytics Pixel Configuration

To connect live Facebook & TikTok pixel tracking, replace `PLACEHOLDER_META_PIXEL_ID` and `PLACEHOLDER_TIKTOK_PIXEL_ID` in `app/layout.tsx` with your actual Pixel IDs:

- **Meta Pixel**: `app/layout.tsx` -> `fbq('init', 'YOUR_META_PIXEL_ID')`
- **TikTok Pixel**: `app/layout.tsx` -> `ttq.load('YOUR_TIKTOK_PIXEL_ID')`

---

## 📜 License

© 2026 **Novaire**. All rights reserved.
