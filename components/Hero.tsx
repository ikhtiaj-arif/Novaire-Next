'use client';

import { Truck, ShieldCheck, Sparkles, Award } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
  price: number;
  onSelectScentsClick?: () => void;
}

export function Hero({ price, onSelectScentsClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#0D0D0D] to-[#0A0A0A] py-12 md:py-20 border-b border-gold/10">
      {/* Glow background elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Text Content */}
          <div className="text-center lg:col-span-7 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold mb-6 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Haute Parfumerie Fine — Édition Limitée</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              NOVAIRE <span className="text-gold font-light italic">|</span> Haute Parfumerie
            </h1>

            <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              L'excellence des plus grandes maisons de parfum mondiales enfin accessible au Maroc.
            </p>

            {/* Price Highlight Badge */}
            <div className="mt-6 inline-flex items-baseline gap-2 bg-gradient-to-r from-gold/20 via-gold/10 to-transparent p-3 rounded-lg border-l-4 border-gold">
              <span className="text-sm uppercase tracking-wider text-gray-300">Offre Lancement Exclusive:</span>
              <span className="text-3xl font-bold text-gold">{price} DH</span>
              <span className="text-xs text-gray-400 line-through">699 DH</span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onSelectScentsClick}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-semibold rounded-lg shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider text-sm"
              >
                Découvrir les 12 Fragrances
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-8 text-left">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Livraison Rapide</h4>
                  <p className="text-xs text-gray-400">Partout au Maroc en 24h-48h</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Paiement à la Livraison</h4>
                  <p className="text-xs text-gray-400">Payer en espèces à la réception (COD)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Mockup Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-gold/20 shadow-2xl bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] p-6 flex flex-col items-center justify-center text-center group">
              {/* Gold Frame Outline */}
              <div className="absolute inset-2 border border-gold/10 rounded-xl pointer-events-none" />
              
              {/* Bottle Mockup Representation */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Bottle Cap */}
                <div className="w-16 h-10 bg-gradient-to-r from-gold via-[#FFF0B3] to-gold rounded-t-md shadow-md mb-1 border border-gold/40" />
                {/* Bottle Neck */}
                <div className="w-10 h-6 bg-gold/40 border-x border-gold/60" />
                {/* Bottle Body */}
                <div className="w-48 h-64 bg-gradient-to-b from-black/80 via-[#141414] to-black/90 rounded-b-2xl border border-gold/30 p-4 flex flex-col items-center justify-between shadow-2xl backdrop-blur-sm">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gold/70 mt-2">PARFUM EXTRAIT</div>
                  <div className="my-auto py-4 border-y border-gold/20 px-6">
                    <div className="font-serif text-2xl font-bold tracking-widest text-gold">NOVAIRE</div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mt-1">HAUTE PARFUMERIE</div>
                  </div>
                  <div className="text-[9px] text-gray-400 tracking-wider">50 ML e 1.7 FL.OZ</div>
                </div>
              </div>

              {/* Subtitle tag */}
              <div className="mt-6 text-xs text-gold/80 italic font-serif">
                "Une signature olfactive d'exception"
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
