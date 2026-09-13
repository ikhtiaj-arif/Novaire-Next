'use client';

import { useRouter } from 'next/navigation';
import { FRAGRANCES } from '@/lib/fragrances';
import type { Variant } from '@/lib/variants';
import { trackSubmitOrder } from '@/lib/pixels';
import { useOrderModal } from '@/hooks/useOrderModal';
import { Hero } from '@/components/landing/Hero';
import { TrustStrip } from '@/components/landing/TrustStrip';
import { ProductGrid } from '@/components/landing/ProductGrid';
import { WhyNovaire } from '@/components/landing/WhyNovaire';
import { OrderModal, type OrderPayload } from '@/components/landing/OrderModal';

export function LandingPage({
  variant,
  price,
}: {
  variant: Variant;
  price: number;
}) {
  const router = useRouter();
  const modal = useOrderModal(price);

  const handleSubmit = async (payload: OrderPayload): Promise<boolean> => {
    let response: Response;
    try {
      response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      return false;
    }

    if (!response.ok) return false;

    trackSubmitOrder({
      scent: payload.scent,
      variant: variant.toUpperCase(),
      price: payload.price,
      phone: payload.phone,
    });

    router.push('/thank-you');
    return true;
  };

  return (
    <>
      <Hero price={price} />
      <TrustStrip />
      <ProductGrid
        fragrances={FRAGRANCES}
        price={price}
        onOrder={modal.openFor}
      />
      <WhyNovaire />
      <OrderModal
        open={modal.open}
        onOpenChange={(open) => {
          if (!open) modal.close();
        }}
        scent={modal.selectedScent}
        quantity={modal.modalQuantity}
        total={modal.total}
        unitPrice={modal.unitPrice}
        variant={variant.toUpperCase()}
        onQuantityIncrement={modal.modalIncrement}
        onQuantityDecrement={modal.modalDecrement}
        onSubmit={handleSubmit}
      />
    </>
  );
}
