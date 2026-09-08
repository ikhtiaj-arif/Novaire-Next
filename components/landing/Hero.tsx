import { Truck, Handshake, ArrowDown } from "lucide-react";
import Image from "next/image";

const TRUST_BADGES = [
  { icon: Truck, label: "Livraison Rapide partout au Maroc" },
  { icon: Handshake, label: "Paiement à la Livraison (COD)" },
];

export function Hero({ price }: { price: number }) {
  return (
    <section className="relative isolate min-h-[720px] overflow-hidden sm:min-h-[800px]">
      {/* Hero Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/bottle-hero.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>

      {/* Dark luxury overlay */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(10, 10, 10, 0.72) 0%,
              rgba(10, 10, 10, 0.42) 35%,
              rgba(10, 10, 10, 0.25) 60%,
              rgba(10, 10, 10, 0.78) 100%
            )
          `,
        }}
      />

      {/* Gold atmospheric glow */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(201,168,76,0.16), transparent 42%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[720px] w-full max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:min-h-[800px] sm:px-6">
        {/* Brand */}
        <div className="mb-5">
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-gold sm:text-sm">
            NOVAIRE
          </span>
        </div>

        {/* Heading */}
        <h1 className="max-w-3xl font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Haute
          <span className="block">
            Parfumerie <span className="text-gold">Fine</span>
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-white/75 sm:text-base">
          L&apos;excellence des plus grandes maisons de parfum mondiales,
          enfin accessible au Maroc.
        </p>

        {/* Trust badges */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2.5 text-xs font-medium text-white/90 backdrop-blur-md sm:text-sm"
            >
              <Icon
                className="h-4 w-4 shrink-0 text-gold"
                aria-hidden="true"
              />
              {label}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mt-9">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            Votre parfum
          </p>

          <p className="mt-1 font-heading text-2xl font-semibold text-white sm:text-3xl">
            Seulement{" "}
            <span className="text-gold">{price} DH</span>
          </p>
        </div>

        {/* CTA */}
        <button
          type="button"
          className="mt-7 inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-black shadow-lg shadow-black/20 transition-all hover:scale-105 hover:bg-gold/90 active:scale-100"
        >
          Découvrir la collection
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] uppercase tracking-[0.25em]">
            Découvrir
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}