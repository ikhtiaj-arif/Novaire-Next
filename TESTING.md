# NOVAIRE — A/B/C Price Test: Testing Guide

Covers: random price assignment, cookie stickiness, and pixel event tracking.
Setup requirements: `npm install` then `npm run dev` (http://localhost:3000).

---

## 1. Real Pixel IDs (prerequisite for pixel tests)

Pixel events only contain real data when real IDs are configured.

**Before running pixel tests, set in `.env.local` (or Vercel env vars):**

```
NEXT_PUBLIC_META_PIXEL_ID=<real meta pixel ID>
NEXT_PUBLIC_TIKTOK_PIXEL_ID=<real TikTok pixel ID>
```

Then restart `npm run dev`.

**Verify pixel events with one of:**
- Browser extension: Meta Pixel Helper (Chrome), TikTok Pixel Helper (Chrome)
- DevTools → Network → filter `fbevents` (Meta) or `analytics.tiktok.com` (TikTok)

**Data matching (Meta):** on order submit, the customer's phone is normalized to
E.164 (`06XXXXXXXX` → `+2126XXXXXXXX`) and sent as a SHA-256 hash in the `ph`
field of the Meta `Lead` event. This enables Meta to match the action to a
Facebook user. Use a phone in the form `06XXXXXXXX` or `+212XXXXXXXX` to test it.

---

## 2. Test Cases

### TC-01 — Random assignment on first visit

| Step | Expected result |
|---|---|
| Open a fresh/incognito browser window | You land on exactly one of `/a`, `/b`, or `/c` (random) |
| Visit the URL again from a **second** fresh incognito window | May land on a different variant than the first — check across ~10 fresh windows that you see all three variants (a/b/c) and that assignment is random (not always `/a`) |

### TC-02 — Cookie is set (sticky logic)

| Step | Expected result |
|---|---|
| After being redirected to `/a`, `/b`, or `/c` | DevTools → Application → Cookies shows `novaire_variant` = `a`, `b`, or `c` — matching the URL you're on |
| DevTools → Cookies → check `novaire_variant` flags | Expiry ≈ today + 100 days, Path `/`, HttpOnly **unchecked** |

### TC-03 — Price is locked on refresh

| Step | Expected result |
|---|---|
| Land on e.g. `/b` | You see **399 DH** on the product cards |
| Press F5 / refresh several times | URL stays `/b`, price stays **399 DH**, cookie stays `b` — never changes |
| Click navigation links (About, Contact, Home, scent tabs) and come back to the shop | Still `/b` at **399 DH** |

### TC-04 — Price stays locked across visits (100-day cookie)

| Step | Expected result |
|---|---|
| Land on a variant, close the browser tab (not incognito), reopen the site normally within the same browser | Same variant and same price as before — not re-randomized |

### TC-05 — Direct variant URLs still work (testing entry points)

| Step | Expected result |
|---|---|
| Go directly to `/a` | Shows **299 DH**, cookie set to `a` |
| Go directly to `/b` | Shows **399 DH**, cookie set to `b` |
| Go directly to `/c` | Shows **499 DH**, cookie set to `c` |

### TC-06 — Unknown/invalid variant URL

| Step | Expected result |
|---|---|
| Go to `/x` (or any non-variant path) | 404 page — not redirected randomly |

### TC-07 — Query parameters are preserved (ad traffic)

| Step | Expected result |
|---|---|
| Visit `/?utm_source=facebook&utm_campaign=test` in a fresh window | Redirects to `/{variant}?utm_source=facebook&utm_campaign=test` — params kept, product price matches the assigned variant |

### TC-08 — Order flow still submits (leading to /thank-you)

| Step | Expected result |
|---|---|
| On any variant, add a scent, select city, enter valid name + phone (`06XXXXXXXX` or `+212XXXXXXXX`), submit order | Order succeeds → redirected to `/thank-you`; order data arrives in the Zapier/Google Sheet destination |

---

## 3. Pixel Test Cases (need real pixel IDs + Pixel Helper)

### TC-09 — PageView fires on every page view (full load + SPA navigation)

| Step | Expected result |
|---|---|
| Load any variant page (full load) | Meta Pixel Helper logs a `PageView`; TikTok Pixel Helper logs a `page` event |
| Click the **À propos** link in the header (SPA navigation, no full reload) | A **new** Meta `PageView` fires for `/about` — the route-change handler covers client-side navigation |
| Navigate to **Contact**, then back to the shop the same way | Exactly one `PageView` per navigation (no duplicates); the initial one is fired only by the base code on full page load |
| View the page source (or view with JS disabled) | `<noscript><img …&ev=PageView&noscript=1/></noscript>` is present in `<head>`, using the real pixel ID `<Your meta pixel id>` |

### TC-10 — Meta 'Lead' event on order submit

| Step | Expected result |
|---|---|
| Submit the COD order form | Meta Pixel Helper fires **`Lead`** with params: `value` = the price shown to that visitor (299, 399 or 499), `currency` = `MAD`, `content_name` = scent name, `content_category` = `Variant A` / `Variant B` / `Variant C`, and `ph` = `[<hashed phone>]` |

### TC-11 — TikTok 'SubmitForm' event on order submit

| Step | Expected result |
|---|---|
| Submit the COD order form | TikTok Pixel Helper fires **`SubmitForm`** with `value` = assigned price, `currency` = `MAD`, `content_name` = scent, `content_price`/`contents[].price` = assigned price |

### TC-12 — Pixel event price matches the visitor's assigned variant

| Step | Expected result |
|---|---|
| In 3 fresh incognito windows, land on `/a`, `/b`, `/c` respectively and submit an order in each | Event `value` is **299** for the `/a` window, **399** for `/b`, **499** for `/c` — never mismatched |

### TC-13 — Data matching: phone is hashed into the Lead event

| Step | Expected result |
|---|---|
| Submit the order with phone `0612345678` | The Meta `Lead` Network request payload contains `ph` = `["6103b272fa58c88b70a093b18e4165306fdce78d691156a8dba11750516e0443"]` (SHA-256 of `+212612345678`). Meta Pixel Helper shows the hashed/identified phone under Data matching |
| Submit again with phone `+212 612 34 56 78` (spaces/country prefix) | Same hash as above — normalization strips non-digits and adds `+212` |
| Submit with a non-Moroccan number (`+33123456789`) | Request still includes a `ph` hash (of `+33123456789`) — data matching works for any international number |

### TC-14 — Pixel failure never blocks the order

| Step | Expected result |
|---|---|
| Temporarily block `connect.facebook.net` and `analytics.tiktok.com` in DevTools (Network → throttle/block), then submit an order | Order still succeeds → redirect to `/thank-you`; only a `console.warn` about the pixel error appears |

---

## 4. Quick smoke checklist (after deploy to Vercel)

| Item | How to check | Pass |
|---|---|---|
| Middleware/Proxy active | Vercel dashboard → same as build; `next build` output lists `ƒ Proxy (Middleware)` | ☐ |
| Random assignment live on `novaireparfums.com` root | Incognito visit → lands on one of `/a` `/b` `/c` | ☐ |
| Cookie sticky | Refresh / navigate → variant unchanged | ☐ |
| Prices correct | `/a`=299, `/b`=399, `/c`=499 | ☐ |
| Real pixel IDs deployed | Submit order → Lead/SubmitForm appear in Meta & TikTok ad managers | ☐ |
| PageView on SPA navigation | Click header links (À propos / Contact) → a new Meta `PageView` fires without a full reload | ☐ |
| Data matching enabled | Submit order with a real phone → Meta `Lead` contains hashed `ph`; Pixel Helper shows Data matching | ☐ |

---

## Notes / gotchas

- **Incognito windows do NOT share cookies** — use them to simulate new visitors in TC-01/TC-12.
- **DevTools "Disable cache" is irrelevant here** — stickiness is cookie-based, not cache-based.
- Changing a visitor's variant **requires deleting the `novaire_variant` cookie** (DevTools → Application → Cookies → delete → reload).
- Pixel `value` uses the price **before** quantity multiplication (unit price), as specified by the client.
- The `ph` hash in the Meta `Lead` event is computed client-side with the Web Crypto API (`crypto.subtle`), which requires `https` (or `localhost`) — it is harmless to ignore if hashing is unavailable.
- Form doesn't collect an email, so data matching is phone-based. If an email field is ever added, hash it the same way and send it as `em` in the same `ph`/`em` object.