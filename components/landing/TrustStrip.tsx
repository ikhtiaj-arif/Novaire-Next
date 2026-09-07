import {
  Truck,
  Handshake,
  RefreshCcw,
  Headphones,
} from 'lucide-react';

const ITEMS = [
  { icon: Truck, label: 'Livraison Rapide', sub: 'Partout au Maroc' },
  { icon: Handshake, label: 'Paiement COD', sub: 'À la livraison' },
  { icon: RefreshCcw, label: 'Retour Facile', sub: 'Satisfait ou remboursé' },
  { icon: Headphones, label: 'Support Client', sub: '7j/7' },
];

export function TrustStrip() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
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