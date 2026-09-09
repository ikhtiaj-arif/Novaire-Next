// "use client";

// import type { Fragrance } from "@/lib/fragrances";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { useInView } from "@/hooks/useInView";
// import Image from "next/image";

// export function ProductCard({
//   fragrance,
//   price,
//   onOrder,
//   delay = 0,
// }: {
//   fragrance: Fragrance;
//   price: number;
//   onOrder: () => void;
//   delay?: number;
// }) {
//   const { ref, inView } = useInView<HTMLDivElement>();

//   return (
//     <div
//       ref={ref}
//       style={{ animationDelay: `${delay * 60}ms` }}
//       onClick={onOrder}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           e.preventDefault();
//           onOrder();
//         }
//       }}
//       className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
//         inView ? "animate-fade-up" : "opacity-0"
//       }`}
//     >
//       <div className="relative aspect-[5/6] w-full overflow-hidden">
//         <Image
//           src={fragrance.bottle}
//           alt={`NOVAIRE ${fragrance.num} — ${fragrance.name}`}
//           fill
//           className="object-cover transition-transform duration-500 group-hover:scale-105"
//           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//         />
//       </div>

//       <div className="flex flex-1 flex-col p-4">
//         <div className="flex items-baseline justify-between">
//           <span className="text-[11px] font-semibold tracking-[0.2em] text-gold">
//             {fragrance.num}
//           </span>
//           <span className="text-sm font-semibold text-foreground">
//             {price} <span className="text-[10px] text-muted-foreground">DH</span>
//           </span>
//         </div>

//         <h3 className="font-heading mt-1 text-lg font-bold text-foreground">
//           {fragrance.name}
//         </h3>

//         <div className="mt-2 flex flex-wrap gap-1.5">
//           {fragrance.pills.map((pill) => (
//             <Badge key={pill} variant="outline" className="text-[10px]">
//               {pill}
//             </Badge>
//           ))}
//         </div>

//         <Button
//           variant="default"
//           className="mt-4 w-full bg-gold text-black hover:bg-gold-hover"
//           onClick={(e) => {
//             e.stopPropagation();
//             onOrder();
//           }}
//         >
//           Commander
//         </Button>
//       </div>
//     </div>
//   );
// }

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

  const isMens = fragrance.category === "mens";

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
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:rounded-2xl ${
        inView ? "animate-fade-up" : "opacity-0"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/6]">

        {/* Category Badge - Top Left */}
        <div className="absolute right-3 top-3 z-10 rounded-md bg-[#24384d] px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-white shadow-md sm:text-xs">
          <span className="mr-1.5 text-[10px]">
            {isMens ? "♂" : "♀"}
          </span>

          {isMens ? "Homme" : "Femme"}
        </div>

        <Image
          src={fragrance.bottle}
          alt={`NOVAIRE ${fragrance.num} — ${fragrance.name}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">

        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[9px] font-semibold tracking-[0.15em] text-gold sm:text-[11px]">
            {fragrance.num}
          </span>

          <span className="text-xs font-semibold text-foreground sm:text-sm">
            {price}{" "}
            <span className="text-[8px] text-muted-foreground sm:text-[10px]">
              DH
            </span>
          </span>
        </div>

        <h3 className="font-heading mt-1 line-clamp-2 text-sm font-bold text-foreground sm:text-lg">
          {fragrance.name}
        </h3>

        <p className="mt-1 line-clamp-2 text-[10px] text-muted-foreground sm:text-xs">
          {fragrance.inspiredBy}
        </p>

        <div className="my-2 flex flex-wrap gap-1.5">
          {fragrance.pills.map((pill) => (
            <Badge
              key={pill}
              variant="outline"
              className="text-[10px]"
            >
              {pill}
            </Badge>
          ))}
        </div>

        <Button
          variant="default"
          className="mt-auto h-9 w-full bg-gold px-2 text-xs text-black hover:bg-gold-hover sm:h-10 sm:text-sm"
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