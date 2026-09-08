import Link from 'next/link';
import { Phone, MessageCircle, Mail, MapPin, Heart } from 'lucide-react';
import { NAV_LINKS } from '@/lib/nav';

const CONTACT = [
  // { icon: Phone, label: '+212 6 00 00 00 00' },
  // { icon: MessageCircle, label: 'WhatsApp — +212 6 00 00 00 00' },
  { icon: Mail, label: 'contact@novaire.ma' },
  { icon: MapPin, label: 'Casablanca, Maroc' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <span className="font-heading text-xl font-bold tracking-[0.25em] text-foreground">
              NOVAIRE
            </span>
            <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
              Haute Parfumerie Fine. Livraison rapide partout au Maroc,
              paiement à la livraison.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Navigation
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {CONTACT.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Icon className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* About blurb */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              À propos
            </h3>
            <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
              Des parfums inspirés des plus grandes maisons, créés avec
              exigence et élégance pour révéler votre signature olfactive.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NOVAIRE. Tous droits réservés.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            Fait avec <Heart className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            au Maroc
          </p>
        </div>
      </div>
    </footer>
  );
}
