
import { Truck, Handshake, ArrowDown, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TRUST_BADGES = [
  { icon: Truck, label: "Livraison rapide partout au Maroc" },
  { icon: Handshake, label: "Paiement à la livraison" },
];

export function Hero({ price }: { price: number }) {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-black sm:min-h-[850px]">
      {/* Background */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="/bottle-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* Overall cinematic darkening */}
      <div
        className="absolute inset-0 -z-20"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(5,5,5,0.88) 0%,
              rgba(5,5,5,0.68) 28%,
              rgba(5,5,5,0.18) 58%,
              rgba(5,5,5,0.38) 100%
            )`,
        }}
      />

      {/* Top / bottom cinematic fade */}
      <div
        className="absolute inset-0 -z-20"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(0,0,0,0.55) 0%,
              transparent 22%,
              transparent 72%,
              rgba(0,0,0,0.8) 100%
            )
          `,
        }}
      />

      {/* Subtle gold light */}
      <div
        className="pointer-events-none absolute -z-10 h-[600px] w-[600px] -translate-y-1/2 rounded-full blur-3xl"
        style={{
          left: "42%",
          top: "48%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[760px] w-full max-w-7xl items-center px-6 py-24 sm:min-h-[850px] sm:px-10 lg:px-16">
        <div className="max-w-xl text-left">
          {/* Brand mark */}
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />

            <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold">
              NOVAIRE
            </span>

            <Sparkles className="h-3.5 w-3.5 text-gold/70" />
          </div>

          {/* Heading */}
          <h1 className="font-heading text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
            L&apos;art
            <span className="block font-light italic text-white/90">
              du parfum
            </span>

            <span className="mt-2 block text-gold">
              autrement.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-md text-sm font-light leading-7 text-white/65 sm:text-base">
            L&apos;excellence des grandes maisons de parfum mondiales,
            désormais accessible au Maroc.
          </p>

          {/* Price */}
          <div className="mt-8 flex items-end gap-4">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/40">
                Haute parfumerie fine
              </p>

              <p className="font-heading text-3xl font-semibold text-white">
                {price}
                <span className="ml-1 text-lg font-normal text-gold">
                  DH
                </span>
              </p>
            </div>

            <span className="mb-2 h-8 w-px bg-white/15" />

            <p className="mb-2 text-xs text-white/45">
              Livraison partout<br />
              au Maroc
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="#nos-fragrances"
              scroll={false}
              onClick={(e) => {
                e.preventDefault();

                document
                  .getElementById("nos-fragrances")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              }}
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-[#d6b75d] active:scale-[0.98]"
            >
              Découvrir la collection

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <span className="text-xs text-white/40">
              Une signature. Une présence.
            </span>
          </div>

          {/* Trust */}
          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-5">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-[11px] text-white/45"
              >
                <Icon className="h-3.5 w-3.5 text-gold/80" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("nos-fragrances")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
          }
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/35 transition-colors hover:text-white/60"
          aria-label="Faire défiler jusqu'à la collection"
        >
          <span className="text-[9px] uppercase tracking-[0.35em]">
            Découvrir
          </span>

          <ArrowDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
