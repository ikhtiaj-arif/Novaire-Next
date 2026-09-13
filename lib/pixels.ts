type FbqFn = (
  action: string,
  event: string,
  data?: Record<string, unknown>
) => void;

type Ttq = {
  track?: (event: string, data?: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    ttq?: Ttq;
  }
}

async function sha256Hex(value: string): Promise<string | null> {
  try {
    if (typeof crypto === 'undefined' || !crypto.subtle) return null;
    const data = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  } catch {
    return null;
  }
}

function normalizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  if (!digits.startsWith('212')) {
    digits = `212${digits}`;
  }
  return `+${digits}`;
}

export async function trackSubmitOrder(payload: {
  price: number;
  scent: string;
  variant: string;
  phone: string;
}) {
  // Meta (Facebook) Pixel
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      const ph = await sha256Hex(normalizePhone(payload.phone));
      window.fbq('track', 'Lead', {
        value: payload.price,
        currency: 'MAD',
        content_name: payload.scent,
        content_category: `Variant ${payload.variant}`,
        ...(ph ? { ph: [ph] } : {}),
      });
    }
  } catch (e) {
    console.warn('Meta pixel error:', e);
  }

  // TikTok Pixel
  try {
    const ttq = typeof window !== 'undefined' ? window.ttq : undefined;
    if (ttq && typeof ttq.track === 'function') {
      ttq.track('SubmitForm', {
        value: payload.price,
        currency: 'MAD',
        content_name: payload.scent,
        contents: [{ content_name: payload.scent, price: payload.price }],
      });
    }
  } catch (e) {
    console.warn('TikTok pixel error:', e);
  }
}