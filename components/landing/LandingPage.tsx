import type { Variant } from '@/lib/variants';

export function LandingPage({
  variant,
  price,
}: {
  variant: Variant;
  price: number;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-foreground">
      <h1 className="font-heading text-2xl font-bold">NOVAIRE</h1>
      <p className="text-muted-foreground">
        Offre {variant.toUpperCase()} — {price} DH
      </p>
    </div>
  );
}
