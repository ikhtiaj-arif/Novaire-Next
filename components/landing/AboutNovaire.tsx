import Image from 'next/image';
import { Section, SectionHeading } from '@/components/landing/Section';

export function AboutNovaire() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left — text content */}
        <div>
          <SectionHeading
            title={
              <>
                L&apos;art du parfum,
                <br />
                autrement.
              </>
            }
          />
          <p className="mt-6 text-sm font-light leading-7 text-muted-foreground sm:text-base">
            Novaire est une marque marocaine de parfumerie née d&apos;une conviction simple : chacun mérite une signature olfactive élégante, intense et accessible. Notre collection réunit 12 fragrances pour homme et femme, sélectionnées pour accompagner chaque personnalité et chaque occasion. Présentées en format 50 ml avec une concentration de 25 %, les créations Novaire associent une identité minimaliste à une expérience olfactive affirmée. Trouvez celle qui deviendra votre signature.
          </p>
          
          {/* Stats row */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {[
              { value: '12', label: 'Fragrances' },
              { value: '25%', label: 'Extrait de Parfum' },
              { value: '50 ml', label: 'Format généreux' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-heading text-2xl font-bold text-gold sm:text-3xl">{value}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image */}
        <div className="relative hidden aspect-square overflow-hidden rounded-2xl lg:block">
          <Image
            src="/bottle/bottle_01.jpeg"
            alt="Novaire — Collection de parfums"
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 50vw"
          />
        </div>
      </div>
    </Section>
  );
}
