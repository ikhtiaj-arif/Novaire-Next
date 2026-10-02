import { Droplets, FlaskConical, Handshake, Truck } from 'lucide-react';
import Image from 'next/image';
import { Section, SectionHeading } from '@/components/landing/Section';

const FEATURES = [
  {
    icon: Droplets,
    title: '25% Extrait de Parfum',
    text: 'Une concentration élevée pensée pour une présence durable.',
  },
  {
    icon: FlaskConical,
    title: '50 ml',
    text: 'Un format généreux pour votre parfum quotidien.',
  },
  {
    icon: Handshake,
    title: 'Paiement à la livraison',
    text: 'Vous ne payez rien en ligne.',
  },
  {
    icon: Truck,
    title: 'Livraison partout au Maroc',
    text: 'Partout au Maroc, en toute sérénité.',
  },
];

export function WhyNovaire() {
  return (
    <Section id="pourquoi-novaire" labelledBy="pourquoi-novaire-title">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Bottle + box imagery */}
        <div className="relative rounded-2xl border border-border bg-card p-8">
          <div className="flex items-end justify-center gap-6">
            <Image
              src="/bottle/bottle_01.jpeg"
              alt="Flacon NOVAIRE N°01 — L'EMPIRE"
              width={420}
              height={504}
              className="w-1/2 max-w-[260px] rounded-xl object-cover"
            />
            <Image
              src="/box/box_image_1.jpeg"
              alt="Coffret NOVAIRE N°01 — L'EMPIRE"
              width={360}
              height={300}
              className="w-1/2 max-w-[300px] rounded-xl object-cover"
            />
          </div>

          <div className="mt-6 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              N°01 · L&apos;EMPIRE
            </span>
            <p className="mt-1 text-xs text-muted-foreground">
              Le flacon et son coffret signés NOVAIRE
            </p>
          </div>
        </div>

        {/* Trust points */}
        <div>
          <SectionHeading
            titleId="pourquoi-novaire-title"
            title="Pourquoi NOVAIRE&nbsp;?"
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-12">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <Icon className="mb-3 h-6 w-6 text-gold" aria-hidden="true" />
                <h3 className="font-heading text-base font-bold text-foreground">
                  {title}
                </h3>
                <p className="mt-1 text-sm font-light leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}