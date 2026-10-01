'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const REVIEWS = [
  {
    src: '/customer/photo_1.jpg',
    alt: 'Photo envoyée par Yasmine B. — son parfum NOVAIRE reçu à Casablanca',
    name: 'Yasmine B.',
    city: 'Casablanca',
    rating: 5,
    text: "Livré en deux jours à Casablanca. Le parfum tient vraiment toute la journée et le coffret est très soigné. Le paiement à la livraison m'a rassurée du début à la fin.",
  },
  {
    src: '/customer/photo_2.jpg',
    alt: 'Photo envoyée par Mehdi A. — son parfum NOVAIRE reçu à Rabat',
    name: 'Mehdi A.',
    city: 'Rabat',
    rating: 5,
    text: "Je cherchais un parfum élégant sans le prix des grandes maisons. NOVAIRE est au rendez-vous : 25 % d'extrait, une tenue immédiate et un sillage présent sans jamais être envahissant.",
  },
  {
    src: '/customer/photo_3.jpg',
    alt: 'Photo envoyée par Salma K. — son parfum NOVAIRE reçu à Marrakech',
    name: 'Salma K.',
    city: 'Marrakech',
    rating: 4,
    text: "Très belle qualité, le flacon fait vraiment sérieux et l'odeur est Splendide. Un petit bémol sur le délai de livraison, mais rien de grave au vu du prix. Je recommande les yeux fermés.",
  },
  {
    src: '/customer/photo_4.jpg',
    alt: 'Photo envoyée par Oumaima T. — son coffret NOVAIRE reçu à Fès',
    name: 'Oumaima T.',
    city: 'Fès',
    rating: 5,
    text: "Le packaging est très réussi, parfait pour offrir. J'ai commandé pour ma sœur et pour moi, deux parfums différents, et nous sommes ravies toutes les deux.",
  },
  {
    src: '/customer/photo_5.jpg',
    alt: 'Photo envoyée par Hicham R. — son parfum NOVAIRE reçu à Tanger',
    name: 'Hicham R.',
    city: 'Tanger',
    rating: 5,
    text: "Paiement au livreur en deux minutes, commande suivie du début à la fin. L'EMPIRE est devenu ma signature au quotidien : un sillage élégant et une tenue assurée.",
  },
];

export function Reviews() {
  const [index, setIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);

  const total = REVIEWS.length;
  const review = REVIEWS[index];

  const goTo = (next: number) => setIndex((next + total) % total);

  return (
    <section
      id="avis-clients"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 md:py-24"
      aria-labelledby="avis-clients-title"
    >
      <div className="text-center">
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
          Ils témoignent
        </span>

        <h2
          id="avis-clients-title"
          className="font-heading mt-2 text-2xl font-bold text-foreground sm:text-3xl"
        >
          Ils parlent de NOVAIRE
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-sm font-light leading-relaxed text-muted-foreground sm:mt-3">
          De vraies commandes, livrées et payées à la réception. Chaque photo
          et chaque avis vient d&rsquo;un client NOVAIRE.
        </p>
      </div>

      <div className="mt-7 grid items-center gap-5 sm:mt-10 sm:gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Left — client photo */}
        <div
          className="relative mx-auto aspect-[16/10] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card sm:aspect-[3/4] lg:aspect-[4/5] lg:max-h-[620px] lg:max-w-none"
          style={{ touchAction: 'pan-y' }}
          onPointerDown={(e) => {
            pointerStart.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (pointerStart.current === null) return;
            const delta = e.clientX - pointerStart.current;
            if (Math.abs(delta) > 48) goTo(index + (delta < 0 ? 1 : -1));
            pointerStart.current = null;
          }}
        >
          <Image
            key={review.src}
            src={review.src}
            alt={review.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 384px"
            className="object-cover"
          />
        </div>

        {/* Right — rating + review */}
        <div
          key={index}
          className="animate-fade-in rounded-2xl border border-border bg-card p-5 sm:p-8"
          aria-live="polite"
        >
          <Quote className="hidden h-7 w-7 text-gold/40 sm:block" aria-hidden="true" />

          {/* Stars */}
          <div className="flex items-center gap-3 sm:mt-4">
            <div className="flex gap-1" role="img" aria-label={`Note : ${review.rating} sur 5`}>
              {Array.from({ length: 5 }, (_, star) => (
                <Star
                  key={star}
                  className={
                    star < review.rating
                      ? 'h-4 w-4 fill-gold text-gold'
                      : 'h-4 w-4 fill-transparent text-gold/40'
                  }
                  aria-hidden="true"
                />
              ))}
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {review.rating}/5
            </span>
          </div>

          {/* Review text */}
          <blockquote className="mt-3 font-heading text-base leading-relaxed text-foreground sm:mt-5 sm:text-lg lg:text-xl">
            &laquo;&nbsp;{review.text}&nbsp;&raquo;
          </blockquote>

          {/* Author */}
          <div className="mt-4 flex items-center gap-3 border-t border-border pt-4 sm:mt-6 sm:pt-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10 font-heading text-sm font-bold text-gold">
              {review.name.charAt(0)}
            </span>

            <div>
              <p className="text-sm font-semibold text-foreground">{review.name}</p>
              <p className="text-xs text-muted-foreground">
                {review.city} &middot; Achat vérifié
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-5 sm:mt-8">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Avis précédent"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-gold/40 hover:text-gold"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
          {REVIEWS.map(({ name }, dot) => (
            <button
              key={name}
              type="button"
              onClick={() => goTo(dot)}
              aria-label={`Afficher l'avis de ${name}`}
              aria-current={dot === index}
              className={`h-2 rounded-full transition-all ${
                dot === index ? 'w-6 bg-gold' : 'w-2 bg-gold/30 hover:bg-gold/60'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Avis suivant"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-gold/40 hover:text-gold"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
