'use client';

import { FRAGRANCES } from '@/lib/fragrances';
import type { Variant } from '@/lib/variants';
import { useOrderModal } from '@/hooks/useOrderModal';
import { Hero } from '@/components/landing/Hero';
import { TrustStrip } from '@/components/landing/TrustStrip';
import { ProductGrid } from '@/components/landing/ProductGrid';
import { OrderModal } from '@/components/landing/OrderModal';

export function LandingPage({
  variant,
  price,
}: {
  variant: Variant;
  price: number;
}) {
  const modal = useOrderModal(price);

  const handleSubmit = async (): Promise<boolean> => {
    // Phase 4 wires the real POST /api/submit here (network + pixels + redirect).
    return true;
  };

  return (
    <>
      <Hero price={price} />
      <TrustStrip />
      <ProductGrid
        fragrances={FRAGRANCES}
        price={price}
        quantity={modal.quantity}
        onQuantityChange={modal.setQuantity}
        onOrder={modal.openFor}
      />
      <OrderModal
        open={modal.open}
        onOpenChange={(open) => {
          if (!open) modal.close();
        }}
        scent={modal.selectedScent}
        quantity={modal.quantity}
        total={modal.total}
        unitPrice={modal.unitPrice}
        variant={variant.toUpperCase()}
        onSubmit={handleSubmit}
      />
    </>
  );
}