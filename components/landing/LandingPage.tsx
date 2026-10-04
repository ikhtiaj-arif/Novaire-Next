'use client';

import { useRouter } from 'next/navigation';
import { FRAGRANCES } from '@/lib/fragrances';
import type { Variant } from '@/lib/variants';
import { trackSubmitOrder } from '@/lib/pixels';
import { useOrderModal } from '@/hooks/useOrderModal';
import { Hero } from '@/components/landing/Hero';
// import { AboutNovaire } from '@/components/landing/AboutNovaire';
import { TrustStrip } from '@/components/landing/TrustStrip';
import { ProductGrid } from '@/components/landing/ProductGrid';
import { WhyNovaire } from '@/components/landing/WhyNovaire';
// import { CustomerPhotos } from '@/components/landing/CustomerPhotos';
import { Reviews } from '@/components/landing/Reviews';
import { PolicySection } from '@/components/landing/PolicySection';
import { FAQ } from '@/components/landing/FAQ';
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
      name: payload.name,
      scent: payload.scent,
      variant: variant.toUpperCase(),
      price: payload.price,
      totalPrice: payload.totalPrice,
      phone: payload.phone,
    });

    router.push('/thank-you');
    return true;
  };

  return (
    <>
      <Hero />
      {/* <AboutNovaire /> */}
      <TrustStrip />
      <ProductGrid
        fragrances={FRAGRANCES}
        price={price}
        onOrder={modal.openFor}
      />
      <WhyNovaire />
      <Reviews />
      <PolicySection />
      <FAQ />
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
