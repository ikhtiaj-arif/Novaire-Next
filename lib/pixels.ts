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

export function trackSubmitOrder(payload: {
  price: number;
  scent: string;
  variant: string;
}) {
  // Meta (Facebook) Pixel
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        value: payload.price,
        currency: 'MAD',
        content_name: payload.scent,
        content_category: `Variant ${payload.variant}`,
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