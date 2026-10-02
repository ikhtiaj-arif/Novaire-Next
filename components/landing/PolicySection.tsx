'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Section, SectionHeading } from '@/components/landing/Section';

const POLICIES = [
  {
    trigger: 'Annulation de commande',
    content: 'Vous pouvez annuler votre commande sans frais avant son expédition. Contactez-nous dès que possible après votre commande.',
  },
  {
    trigger: 'Article endommagé ou défectueux',
    content: 'Si vous recevez un article endommagé, défectueux ou différent de votre commande, contactez-nous dans les 48 heures suivant la livraison, accompagné de photos ou d\'une vidéo. Après vérification, un remplacement sera organisé sans frais supplémentaires.',
  },
  {
    trigger: 'Retour et remboursement',
    content: 'Pour toute demande de rétractation, contactez-nous dans un délai de 7 jours suivant la réception. Le produit doit être non utilisé, non ouvert, dans son emballage d\'origine et en parfait état. Les frais de retour restent à la charge du client, sauf en cas d\'erreur de notre part ou de produit défectueux. Les remboursements ou échanges sont traités après réception et vérification du produit retourné.',
  },
];

export function PolicySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section narrow labelledBy="politique-title">
      <SectionHeading
        titleId="politique-title"
        title="Politique de retour &amp; échange"
        lede="Votre satisfaction est notre priorité."
        align="center"
      />

      <div className="mt-8 flex flex-col divide-y divide-border rounded-xl border border-border bg-card overflow-hidden md:mt-12">
        {POLICIES.map((item, i) => (
          <div key={item.trigger}>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="focus-ring flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-foreground hover:bg-muted/40 transition-colors"
              aria-expanded={openIndex === i}
            >
              {item.trigger}
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 text-sm font-light leading-relaxed text-muted-foreground">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
