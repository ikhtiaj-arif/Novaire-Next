"use client";

import type { Fragrance } from "@/lib/fragrances";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import Image from "next/image";

export function ProductCard({
  fragrance,
  price,
  onOrder,
  delay = 0,
}: {
  fragrance: Fragrance;
  price: number;
  onOrder: () => void;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay * 60}ms` }}
      onClick={onOrder}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOrder();
        }
      }}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        inView ? "animate-fade-up" : "opacity-0"
      }`}
    >
      <div className="relative aspect-[5/6] w-full overflow-hidden">
        <Image
          src={fragrance.bottle}
          alt={`NOVAIRE ${fragrance.num} — ${fragrance.name}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-gold">
            {fragrance.num}
          </span>
          <span className="text-sm font-semibold text-foreground">
            {price} <span className="text-[10px] text-muted-foreground">DH</span>
          </span>
        </div>

        <h3 className="font-heading mt-1 text-lg font-bold text-foreground">
          {fragrance.name}
        </h3>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {fragrance.pills.map((pill) => (
            <Badge key={pill} variant="outline" className="text-[10px]">
              {pill}
            </Badge>
          ))}
        </div>

        <Button
          variant="default"
          className="mt-4 w-full bg-gold text-black hover:bg-gold-hover"
          onClick={(e) => {
            e.stopPropagation();
            onOrder();
          }}
        >
          Commander
        </Button>
      </div>
    </div>
  );
}