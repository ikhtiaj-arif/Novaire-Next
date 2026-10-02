import Image from 'next/image';
import { Section, SectionHeading } from '@/components/landing/Section';

const PHOTOS = [
  { src: '/customer/photo_1.jpg', alt: 'Photo d’un parfum NOVAIRE reçu d’un client' },
  { src: '/customer/photo_2.jpg', alt: 'Photo d’un parfum NOVAIRE reçu d’un client' },
  { src: '/customer/photo_3.jpg', alt: 'Photo d’un parfum NOVAIRE reçu d’un client' },
];

export function CustomerPhotos() {
  return (
    <Section>
      <SectionHeading
        title="Reçus par nos clients"
        lede="Photos envoyées par nos clients"
        align="center"
      />

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:mt-12">
        {PHOTOS.map((photo) => (
          <div
            key={photo.src}
            className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-muted/20"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(min-width: 640px) 33vw, 100vw"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}