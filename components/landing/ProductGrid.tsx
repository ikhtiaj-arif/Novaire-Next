'use client';

import { useState } from 'react';
import type { Fragrance } from '@/lib/fragrances';
import { ProductCard } from '@/components/landing/ProductCard';
import { Section, SectionHeading } from '@/components/landing/Section';

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
    <Section id="nos-fragrances" labelledBy="nos-fragrances-title">
      <SectionHeading
        titleId="nos-fragrances-title"
        title="Nos Fragrances"
        align="center"
      />

      {/* Sticky Homme / Femme tabs — full-bleed bar, inner content aligned
          to the shared gutter so it tracks every other section. */}
      <div className="sticky top-16 z-30 -mx-4 mt-8 mb-8 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 md:mt-12">
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
              className={`focus-ring flex-1 rounded-full px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] transition-all ${
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
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-3">
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
    </Section>
  );
}