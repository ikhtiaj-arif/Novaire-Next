'use client';

import type { Fragrance } from '@/lib/fragrances';
import { ProductCard } from '@/components/landing/ProductCard';
import type { OrderModalState } from '@/hooks/useOrderModal';

export function ProductGrid({
  fragrances,
  price,
  getCardQuantity,
  onCardQuantityChange,
  onOrder,
}: {
  fragrances: Fragrance[];
  price: number;
  getCardQuantity: OrderModalState['getCardQuantity'];
  onCardQuantityChange: OrderModalState['setCardQuantity'];
  onOrder: OrderModalState['openFor'];
}) {
  const mensFragrances = fragrances.filter((f) => f.category === 'mens');
  const womensFragrances = fragrances.filter((f) => f.category === 'womens');

  return (
    <section className="mx-auto w-full max-w-6xl px-4 md:px-0 py-16 sm:px-6" aria-labelledby="nos-fragrances">
      <h2
        id="nos-fragrances"
        className="font-heading mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl"
      >
        Nos Fragrances
      </h2>

      <CollectionSection
        title="Collection Homme"
        fragrances={mensFragrances}
        price={price}
        getCardQuantity={getCardQuantity}
        onCardQuantityChange={onCardQuantityChange}
        onOrder={onOrder}
      />

      <CollectionSection
        title="Collection Femme"
        fragrances={womensFragrances}
        price={price}
        getCardQuantity={getCardQuantity}
        onCardQuantityChange={onCardQuantityChange}
        onOrder={onOrder}
      />
    </section>
  );
}

function CollectionSection({
  title,
  fragrances,
  price,
  getCardQuantity,
  onCardQuantityChange,
  onOrder,
}: {
  title: string;
  fragrances: Fragrance[];
  price: number;
  getCardQuantity: OrderModalState['getCardQuantity'];
  onCardQuantityChange: OrderModalState['setCardQuantity'];
  onOrder: OrderModalState['openFor'];
}) {
  return (
    <div className="mb-14">
      <h3 className="font-heading mb-8 text-center text-xl font-semibold text-foreground sm:text-2xl">
        {title}
      </h3>

      <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fragrances.map((fragrance, index) => (
          <ProductCard
            key={fragrance.id}
            fragrance={fragrance}
            price={price}
            quantity={getCardQuantity(fragrance.id)}
            onQuantityChange={(qty) => onCardQuantityChange(fragrance.id, qty)}
            onOrder={() => onOrder(fragrance)}
            delay={index}
          />
        ))}
      </div>
    </div>
  );
}
