import Image from 'next/image';

const PHOTOS = [
  { src: '/customer/photo_1.jpg', alt: 'Photo d’un parfum NOVAIRE reçu d’un client' },
  { src: '/customer/photo_2.jpg', alt: 'Photo d’un parfum NOVAIRE reçu d’un client' },
  { src: '/customer/photo_3.jpg', alt: 'Photo d’un parfum NOVAIRE reçu d’un client' },
];

export function CustomerPhotos() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="font-heading mb-3 text-center text-2xl font-bold text-foreground sm:text-3xl">
        Reçus par nos clients
      </h2>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Photos envoyées par nos clients
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
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
    </section>
  );
}
