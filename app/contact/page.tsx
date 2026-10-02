import type { Metadata } from 'next';
import { Mail, MapPin } from 'lucide-react';
import { Section, SectionHeading } from '@/components/landing/Section';
import { ContactForm } from '@/components/landing/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | NOVAIRE',
  description:
    "Contactez NOVAIRE — service client 7j/7. Livraison rapide partout au Maroc, paiement à la livraison.",
};

const CONTACT_ITEMS = [
  { icon: Mail, label: 'Email', value: 'contact@novaire.ma' },
  { icon: MapPin, label: 'Adresse', value: 'Casablanca, Maroc' },
];

export default function ContactPage() {
  return (
    <Section as="div">
      <SectionHeading
        as="h1"
        size="page"
        eyebrow="NOVAIRE"
        title="Contactez-nous"
        lede="Une question sur nos parfums ou votre commande ? Notre équipe est à votre écoute 7j/7."
        align="center"
      />

      <div className="mt-8 grid grid-cols-1 gap-8 md:mt-12 lg:grid-cols-2">
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

        <ContactForm />
      </div>
    </Section>
  );
}