'use client';

import type { Fragrance } from '@/lib/fragrances';
import { ProductCard } from '@/components/landing/ProductCard';
import type { OrderModalState } from '@/hooks/useOrderModal';

export function ProductGrid({
  fragrances,
  price,
  quantity,
  onQuantityChange,
  onOrder,
}: {
  fragrances: Fragrance[];
  price: number;
  quantity: number;
  onQuantityChange: OrderModalState['setQuantity'];
  onOrder: OrderModalState['openFor'];
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="nos-fragrances">
      <h2
        id="nos-fragrances"
        className="font-heading mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl"
      >
        Nos Fragrances
      </h2>

      <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fragrances.map((fragrance, index) => (
          <ProductCard
            key={fragrance.id}
            fragrance={fragrance}
            price={price}
            quantity={quantity}
            onQuantityChange={onQuantityChange}
            onOrder={() => onOrder(fragrance)}
            delay={index}
          />
        ))}
      </div>
    </section>
  );
}