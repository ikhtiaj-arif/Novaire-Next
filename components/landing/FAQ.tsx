'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Combien de temps tient le parfum ?',
    a: 'Nos fragrances sont formulées en concentration Extrait de Parfum à 25 %, ce qui garantit une tenue longue durée de 8 à 12 heures selon la peau et les conditions. C\'est la concentration la plus élevée en parfumerie.',
  },
  {
    q: 'Qu\'est-ce que l\'Extrait de Parfum ?',
    a: 'L\'Extrait de Parfum est la forme la plus concentrée du parfum, avec une teneur en huiles essentielles de 20 à 30 %. Il offre une projection et une longévité supérieures à l\'Eau de Parfum ou l\'Eau de Toilette.',
  },
  {
    q: 'Livrez-vous partout au Maroc ?',
    a: 'Oui, nous livrons partout au Maroc. La livraison est offerte sans minimum d\'achat. Le délai est généralement de 2 à 4 jours ouvrables selon votre ville.',
  },
  {
    q: 'Comment fonctionne le paiement à la livraison ?',
    a: 'Vous ne payez rien en ligne. Après validation de votre commande, notre équipe vous contacte pour confirmer. Vous réglez uniquement au moment de la réception, en espèces, directement au livreur.',
  },
  {
    q: 'Puis-je commander plusieurs fragrances ?',
    a: 'Oui, vous pouvez sélectionner différentes fragrances et ajuster les quantités depuis la page principale. Chaque commande est traitée individuellement.',
  },
  {
    q: 'Comment initier un échange ou un retour ?',
    a: 'Contactez-nous dans les 7 jours suivant la réception pour toute demande d\'échange ou de retour. Le produit doit être non ouvert et dans son emballage d\'origine. En cas de produit endommagé ou défectueux, contactez-nous dans les 48 heures avec photos ou vidéo à contact@novaire.ma',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <h2 className="font-heading mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
        Questions fréquentes
      </h2>
      <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card overflow-hidden">
        {FAQS.map((item, i) => (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-foreground hover:bg-muted/40 transition-colors"
              aria-expanded={openIndex === i}
            >
              {item.q}
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 text-sm font-light leading-relaxed text-muted-foreground">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
