// 'use client';

// import { useState } from 'react';
// import type { Fragrance } from '@/lib/fragrances';
// import { ProductCard } from '@/components/landing/ProductCard';

// type Tab = 'mens' | 'womens';

// export function ProductGrid({
//   fragrances,
//   price,
//   onOrder,
// }: {
//   fragrances: Fragrance[];
//   price: number;
//   onOrder: (fragrance: Fragrance) => void;
// }) {
//   const [tab, setTab] = useState<Tab>('mens');
//   const activeFragrances = fragrances.filter((f) => f.category === tab);

//   return (
//     <section className="mx-auto w-full max-w-6xl px-4 md:px-0 py-16 sm:px-6" aria-labelledby="nos-fragrances">
//       <h2
//         id="nos-fragrances"
//         className="font-heading mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl"
//       >
//         Nos Fragrances
//       </h2>

//       {/* Homme / Femme tabs */}
//       <div className="mx-auto mb-10 flex w-fit items-center gap-1 rounded-full border border-border bg-card p-1">
//         {(
//           [
//             { value: 'mens', label: 'Homme' },
//             { value: 'womens', label: 'Femme' },
//           ] as const
//         ).map(({ value, label }) => (
//           <button
//             key={value}
//             type="button"
//             onClick={() => setTab(value)}
//             aria-pressed={tab === value}
//             className={`rounded-full px-8 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] transition-colors ${
//               tab === value
//                 ? 'bg-gold text-black'
//                 : 'text-muted-foreground hover:text-foreground'
//             }`}
//           >
//             {label}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {activeFragrances.map((fragrance, index) => (
//           <ProductCard
//             key={fragrance.id}
//             fragrance={fragrance}
//             price={price}
//             onOrder={() => onOrder(fragrance)}
//             delay={index}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

'use client';

import { useState } from 'react';
import type { Fragrance } from '@/lib/fragrances';
import { ProductCard } from '@/components/landing/ProductCard';

type Tab = 'mens' | 'womens';

export function ProductGrid({
  fragrances,
  price,
  onOrder,
}: {
  fragrances: Fragrance[];
  price: number;
  onOrder: (fragrance: Fragrance) => void;
}) {
  const [tab, setTab] = useState<Tab>('mens');

  const activeFragrances = fragrances.filter(
    (f) => f.category === tab
  );

  return (
    <section
      className="mx-auto w-full max-w-6xl py-8 sm:px-6 md:py-16 md:px-0"
      aria-labelledby="nos-fragrances"
    >
      <h2
        id="nos-fragrances"
        className="font-heading mb-6 text-center text-2xl font-bold text-foreground sm:text-3xl"
      >
        Nos Fragrances
      </h2>

      {/* Sticky Homme / Femme tabs */}
      <div className="sticky top-16 z-30 mb-6 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex w-full max-w-md items-center gap-2 rounded-full border border-border bg-card p-1">
          {(
            [
              { value: 'mens', label: 'Homme' },
              { value: 'womens', label: 'Femme' },
            ] as const
          ).map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              aria-pressed={tab === value}
              className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] transition-all ${
                tab === value
                  ? 'bg-gold text-black shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 2 columns on mobile */}
      <div className="grid grid-cols-2 gap-3 px-3 sm:gap-4 sm:px-6 md:gap-6 md:px-0 lg:grid-cols-3">
        {activeFragrances.map((fragrance, index) => (
          <ProductCard
            key={fragrance.id}
            fragrance={fragrance}
            price={price}
            onOrder={() => onOrder(fragrance)}
            delay={index}
          />
        ))}
      </div>
    </section>
  );
}