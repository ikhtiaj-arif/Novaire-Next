"use client";

import { Minus, Plus } from "lucide-react";
import type { Fragrance } from "@/lib/fragrances";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import Image from "next/image";

export function ProductCard({
  fragrance,
  price,
  quantity,
  onQuantityChange,
  onOrder,
  delay = 0,
}: {
  fragrance: Fragrance;
  price: number;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onOrder: () => void;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay * 60}ms` }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        inView ? "animate-fade-up" : "opacity-0"
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src="/card-bottle.png"
          alt={`NOVAIRE ${fragrance.num} — ${fragrance.name}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-gold">
            NOVAIRE
          </span>
          <span className="text-[11px] text-muted-foreground">
            {fragrance.num}
          </span>
        </div>

        <h3 className="font-heading mt-1 text-lg font-bold text-foreground">
          {fragrance.name}
        </h3>

        <p className="mt-1 text-sm font-light text-muted-foreground">
          {fragrance.description}
        </p>

        <p className="mt-2 text-xs leading-relaxed text-muted-foreground/80">
          {fragrance.scentProfile}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {fragrance.pills.map((pill) => (
            <Badge key={pill} variant="outline" className="text-[11px]">
              {pill}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">
            {price} <span className="text-xs text-muted-foreground">DH</span>
          </span>

          <div className="inline-flex items-center gap-1 rounded-full border border-border px-1 py-0.5">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Réduire la quantité"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
            <span className="w-6 text-center text-sm font-medium text-foreground">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Augmenter la quantité"
              onClick={() => onQuantityChange(quantity + 1)}
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <Button
          variant="default"
          className="mt-4 w-full bg-gold text-black hover:bg-gold-hover"
          onClick={onOrder}
        >
          Commander
        </Button>
      </div>
    </div>
  );
}
