import type { Metadata } from 'next';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | NOVAIRE',
  description:
    "Contactez NOVAIRE — service client 7j/7. Livraison rapide partout au Maroc, paiement à la livraison.",
};

const CONTACT_ITEMS = [
  { icon: Phone, label: 'Téléphone', value: '+212 6 00 00 00 00' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+212 6 00 00 00 00' },
  { icon: Mail, label: 'Email', value: 'contact@novaire.ma' },
  { icon: MapPin, label: 'Adresse', value: 'Casablanca, Maroc' },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
          NOVAIRE
        </span>
        <h1 className="font-heading mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          Contactez-nous
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
          Une question sur nos parfums ou votre commande ? Notre équipe est à
          votre écoute 7j/7.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Contact info */}
        <div className="flex flex-col gap-4">
          {CONTACT_ITEMS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>
                <p className="mt-0.5 text-sm font-medium text-foreground">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dummy form */}
        <form className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="text-sm text-foreground">
              Nom complet
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Votre nom"
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className="text-sm text-foreground">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="vous@email.com"
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-message" className="text-sm text-foreground">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Votre message..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20"
            />
          </div>

          <button
            type="submit"
            className="mt-1 inline-flex h-11 items-center justify-center rounded-full bg-gold px-8 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:bg-gold/90 active:scale-100"
          >
            Envoyer
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Formulaire de démonstration — aucun message n&apos;est réellement
            envoyé.
          </p>
        </form>
      </div>
    </div>
  );
}
