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

export function trackConfirmOrder(data: {
  scent: string;
  variant: string;
  price: number;
  quantity?: number;
}) {
  if (typeof window === 'undefined') return;

  // Meta (Facebook) Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'ConfirmOrder', {
      scent: data.scent,
      variant: data.variant,
      price: data.price,
      quantity: data.quantity || 1,
      currency: 'MAD',
    });
  }

  // TikTok Pixel
  if (window.ttq && typeof window.ttq.track === 'function') {
    window.ttq.track('ConfirmOrder', {
      scent: data.scent,
      variant: data.variant,
      price: data.price,
      quantity: data.quantity || 1,
      currency: 'MAD',
    });
  }
}