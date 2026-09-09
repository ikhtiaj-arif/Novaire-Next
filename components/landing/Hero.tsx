import { ArrowDown, Droplets, Truck, WalletCards } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero({ price }: { price: number }) {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-black sm:min-h-[850px]">
      {/* Background */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="/hero_bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* Main cinematic overlay */}
      <div
        className="absolute inset-0 -z-20"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(5,5,5,0.88) 0%,
              rgba(5,5,5,0.65) 28%,
              rgba(5,5,5,0.18) 60%,
              rgba(5,5,5,0.32) 100%
            )
          `,
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
              rgba(0,0,0,0.52) 0%,
              transparent 20%,
              transparent 70%,
              rgba(0,0,0,0.82) 100%
            )
          `,
        }}
      />

      {/* Subtle gold atmosphere */}
      <div
        className="pointer-events-none absolute -z-10 h-[600px] w-[600px] -translate-y-1/2 rounded-full blur-3xl"
        style={{
          left: "32%",
          top: "48%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[760px] w-full flex-col px-6 py-8 sm:min-h-[850px] sm:px-10 lg:px-16">
        {/* ============================================================
            TOP BAR
        ============================================================ */}
        <div className="flex items-start justify-between">
          {/* Brand */}
          <div>
            <div className="font-heading text-3xl font-medium tracking-[0.16em] text-white sm:text-4xl">
              NOVAIRE
            </div>

            <div className="mt-1.5 pl-1 text-[8px] font-medium uppercase tracking-[0.38em] text-white/65 sm:text-[9px]">
              Haute parfumerie fine
            </div>

            <div className="mt-4 ml-[120px] h-px w-16 bg-gold sm:ml-[145px]" />
          </div>

          {/* Collection statement */}
          <div className="hidden text-right sm:block">
            <p className="text-[9px] font-medium uppercase tracking-[0.38em] text-white/75">
              12 fragrances
            </p>

            <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.38em] text-white/75">
              Une même signature
            </p>

            <div className="mt-4 ml-auto h-px w-14 bg-gold" />
          </div>
        </div>

        {/* ============================================================
            MAIN CONTENT
        ============================================================ */}
        <div className="flex flex-1 items-center">
          <div className="max-w-xl text-left">
            {/* Heading */}
            <h1 className="font-heading text-5xl font-medium leading-[0.92] tracking-[-0.035em] text-white sm:text-6xl lg:text-[5.25rem]">
              L&apos;art
              <span className="block">du parfum</span>

              <span className="mt-1 block text-gold">
                autrement.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-[390px] text-sm font-light leading-7 text-white/75 sm:text-base">
              Des signatures olfactives inspirées
              <br className="hidden sm:block" />
              des icônes de la haute parfumerie.
            </p>

            {/* ========================================================
                PRODUCT PROMISES
            ======================================================== */}
            <div className="mt-9 flex flex-wrap items-center gap-y-4">
              {/* Extrait */}
              <div className="flex items-center gap-3 pr-5">
                <Droplets className="h-5 w-5 stroke-[1.2] text-gold" />

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/85">
                    Extrait de Parfum
                  </p>

                  <p className="mt-0.5 text-[9px] text-white/50">
                    50 ml
                  </p>
                </div>
              </div>

              <div
                className="hidden h-9 w-px bg-white/20 sm:block"
                aria-hidden="true"
              />

              {/* Delivery */}
              <div className="flex items-center gap-3 px-0 sm:px-5">
                <Truck className="h-5 w-5 stroke-[1.2] text-gold" />

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/85">
                    Livraison rapide
                  </p>

                  <p className="mt-0.5 text-[9px] text-white/50">
                    Partout au Maroc
                  </p>
                </div>
              </div>

              <div
                className="hidden h-9 w-px bg-white/20 sm:block"
                aria-hidden="true"
              />

              {/* Payment */}
              <div className="flex items-center gap-3 px-0 sm:px-5">
                <WalletCards className="h-5 w-5 stroke-[1.2] text-gold" />

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/85">
                    Paiement
                  </p>

                  <p className="mt-0.5 text-[9px] text-white/50">
                    À la livraison
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-9">
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
                className="
                  group
                  inline-flex
                  items-center
                  gap-4
                  rounded-full
                  bg-gold
                  px-8
                  py-4
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-black
                  transition-all
                  duration-300
                  hover:scale-[1.03]
                  hover:bg-[#d6b75d]
                  active:scale-[0.98]
                "
              >
                Découvrir la collection

                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================
            BOTTOM BRANDING
        ============================================================ */}
        <div className="flex items-end justify-between border-t border-white/10 pt-5">
          {/* Left */}
          <div>
            <p className="text-[8px] font-medium uppercase tracking-[0.35em] text-white/45 sm:text-[9px]">
              Une signature. Une présence.
            </p>

            <div className="mt-3 h-px w-12 bg-gold" />
          </div>

          {/* Right */}
          <div className="text-right">
            <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/55">
              NOVAIRE
            </p>

            <p className="mt-1 text-[7px] uppercase tracking-[0.3em] text-white/35">
              Casablanca
            </p>

            <p className="mt-0.5 text-[7px] uppercase tracking-[0.3em] text-white/35">
              Maroc
            </p>
          </div>
        </div>

        {/* ============================================================
            MOBILE COLLECTION LABEL
        ============================================================ */}
        <div className="absolute right-6 top-8 text-right sm:hidden">
          <p className="text-[8px] uppercase tracking-[0.3em] text-white/65">
            12 fragrances
          </p>

          <p className="mt-1.5 text-[8px] uppercase tracking-[0.3em] text-white/65">
            Une même signature
          </p>

          <div className="mt-3 ml-auto h-px w-10 bg-gold" />
        </div>

        {/* ============================================================
            SCROLL INDICATOR
        ============================================================ */}
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
          className="
            absolute
            bottom-7
            left-1/2
            hidden
            -translate-x-1/2
            flex-col
            items-center
            gap-2
            text-white/35
            transition-colors
            hover:text-white/60
            sm:flex
          "
          aria-label="Faire défiler jusqu'à la collection"
        >
          <span className="text-[8px] uppercase tracking-[0.35em]">
            Découvrir
          </span>

          <ArrowDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}