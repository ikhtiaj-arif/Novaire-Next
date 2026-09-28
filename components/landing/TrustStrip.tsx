import {
  Truck,
  CreditCard,
  Clock,
} from 'lucide-react';

const ITEMS = [
  { icon: Truck, label: 'Livraison offerte', sub: 'Partout au Maroc' },
  { icon: CreditCard, label: 'Paiement à la livraison', sub: 'Aucun paiement en ligne' },
  { icon: Clock, label: '2 à 4 jours ouvrables', sub: 'Selon votre ville' },
];

export function TrustStrip() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-16">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
        {ITEMS.map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-5 text-center"
          >
            <Icon className="mb-3 h-6 w-6 text-gold" aria-hidden="true" />
            <span className="text-xs font-semibold text-secondary-foreground sm:text-sm">
              {label}
            </span>
            <span className="mt-0.5 text-xs text-muted-foreground">{sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}