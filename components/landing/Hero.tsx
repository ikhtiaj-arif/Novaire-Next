import { Truck, Handshake } from 'lucide-react';

const TRUST_BADGES = [
  { icon: Truck, label: 'Livraison Rapide partout au Maroc' },
  { icon: Handshake, label: 'Paiement à la Livraison (COD)' },
];

export function Hero({ price }: { price: number }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.18) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
        <h1 className="font-heading text-3xl font-bold leading-tight sm:text-5xl">
          NOVAIRE<span className="text-gold"> | </span>Haute Parfumerie Fine
        </h1>

        <p className="mt-4 max-w-xl text-sm font-light text-muted-foreground sm:text-base">
          L&apos;excellence des plus grandes maisons de parfum mondiales enfin
          accessible au Maroc.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-secondary-foreground sm:text-sm"
            >
              <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>

        <div
          className="relative mt-12 aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-gold/20 via-card to-gold/5"
          aria-label="Image du flacon NOVAIRE"
          role="img"
        >
          <div className="absolute inset-0 animate-shimmer" aria-hidden="true" />
        </div>

        <p className="mt-4 text-sm font-light text-muted-foreground sm:text-base">
          Seulement <span className="font-semibold text-gold">{price} DH</span>
        </p>
      </div>
    </section>
  );
}