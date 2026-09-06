'use client';

import { useState } from 'react';
import { FRAGRANCES, Fragrance } from '@/lib/constants';
import { Plus, Minus, ShoppingBag, Check } from 'lucide-react';

interface ProductGridProps {
  price: number;
  onSelectFragrance: (scent: Fragrance, quantity: number) => void;
}

export function ProductGrid({ price, onSelectFragrance }: ProductGridProps) {
  const [quantities, setQuantities] = useState<Record<number, number>>(
    FRAGRANCES.reduce((acc, curr) => ({ ...acc, [curr.id]: 1 }), {})
  );

  const handleQuantityChange = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, Math.min(10, (prev[id] || 1) + delta)),
    }));
  };

  return (
    <section id="fragrances" className="py-16 bg-[#0A0A0A] border-b border-gold/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-3">
            Collection Exclusive
          </h2>
          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Les 12 Fragrances Novaire
          </h3>
          <p className="mt-4 text-sm sm:text-base text-gray-400 font-light">
            Sélectionnez votre fragrance favorite ci-dessous pour valider votre commande en livraison à domicile.
          </p>
        </div>

        {/* Product Cards Grid (2 cols mobile, 3 lg, 4 xl) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {FRAGRANCES.map((item) => {
            const qty = quantities[item.id] || 1;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-xl border border-gold/15 bg-gradient-to-b from-[#141414] to-[#0D0D0D] p-4 sm:p-5 transition-all duration-300 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5"
              >
                {/* Badge if present */}
                {item.badge && (
                  <span className="absolute top-3 right-3 rounded-full bg-gold/20 px-2.5 py-0.5 text-[10px] font-semibold text-gold border border-gold/30 uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}

                <div>
                  {/* Fragrance Bottle Mini Icon */}
                  <div className="mb-4 flex justify-center py-4 bg-black/40 rounded-lg border border-white/5 group-hover:border-gold/20 transition-colors">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-4 bg-gold/70 rounded-t-sm" />
                      <div className="w-16 h-24 bg-gradient-to-b from-gray-900 to-black rounded-b-md border border-gold/30 p-1 flex flex-col items-center justify-center text-center">
                        <span className="text-[8px] font-bold text-gold tracking-tighter">{item.code}</span>
                        <span className="text-[6px] text-gray-400 tracking-tighter truncate w-full px-1">{item.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Code */}
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-gold/80 uppercase tracking-widest">{item.code}</span>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-gold transition-colors">
                      {item.name}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-300 font-medium line-clamp-2 mb-2">
                    {item.description}
                  </p>

                  {/* Olfactory Notes */}
                  <p className="text-[11px] text-gray-400 italic mb-4">
                    <span className="text-gold/60 font-normal">Notes:</span> {item.notes}
                  </p>
                </div>

                <div>
                  {/* Price */}
                  <div className="flex items-baseline justify-between mb-4 border-t border-white/10 pt-3">
                    <span className="text-xs text-gray-400">Prix unitaire:</span>
                    <span className="text-lg font-bold text-gold">{price} DH</span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between gap-2 mb-3 bg-black/60 rounded-lg p-1.5 border border-white/10">
                    <span className="text-xs text-gray-400 pl-1">Qté:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="h-6 w-6 rounded bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-colors"
                        aria-label="Réduire"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">{qty}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="h-6 w-6 rounded bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-colors"
                        aria-label="Augmenter"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Select CTA Button */}
                  <button
                    type="button"
                    onClick={() => onSelectFragrance(item, qty)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-gold/10 hover:bg-gold text-gold hover:text-black border border-gold/40 hover:border-gold rounded-lg font-semibold text-xs transition-all duration-300 uppercase tracking-wider"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Commander ({price * qty} DH)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
