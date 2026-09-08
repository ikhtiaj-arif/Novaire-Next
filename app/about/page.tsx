import type { Metadata } from 'next';
import { Sparkles, Handshake, Truck, GlassWater } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À propos | NOVAIRE',
  description:
    "Découvrez NOVAIRE — l'excellence des plus grandes maisons de parfum mondiales, enfin accessible au Maroc.",
};

const VALUES = [
  {
    icon: Sparkles,
    title: 'Haute Parfumerie',
    text: "Des fragrances inspirées des plus grandes maisons de parfum mondiales, sélectionnées avec exigence.",
  },
  {
    icon: Handshake,
    title: 'Paiement à la Livraison',
    text: 'Payez uniquement à la réception de votre commande, en toute confiance, partout au Maroc.',
  },
  {
    icon: Truck,
    title: 'Livraison Rapide',
    text: 'Expédition rapide dans toutes les villes du Maroc, avec un suivi de votre commande.',
  },
  {
    icon: GlassWater,
    title: 'Élégance Intemporelle',
    text: 'Un savoir-faire dédié à l’élégance et à la qualité, pour révéler votre signature olfactive.',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
          NOVAIRE
        </span>
        <h1 className="font-heading mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          À propos de NOVAIRE
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
          NOVAIRE est née d’une conviction simple : l’excellence de la haute
          parfumerie mondiale doit être accessible à tous au Maroc. Nous créons
          des parfums inspirés des plus grands maîtres parfumeurs, avec un
          sillage intense et une élégance intemporelle.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center"
          >
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
              <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
            </span>
            <h2 className="font-heading text-base font-bold text-foreground">
              {title}
            </h2>
            <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
