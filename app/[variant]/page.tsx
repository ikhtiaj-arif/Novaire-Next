import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing/LandingPage';
import { VARIANTS, isVariant } from '@/lib/variants';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ variant: 'a' }, { variant: 'b' }, { variant: 'c' }];
}

type Props = {
  params: Promise<{ variant: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { variant } = await params;
  if (!isVariant(variant)) return {};
  return {
    title: `NOVAIRE | ${VARIANTS[variant]} DH — Parfumerie Fine`,
    description:
      "L'excellence des plus grandes maisons de parfum mondiales enfin accessible au Maroc. Paiement à la livraison.",
    alternates: { canonical: `https://novaire.ma/${variant}` },
  };
}

export default async function VariantPage({ params }: Props) {
  const { variant } = await params;
  if (!isVariant(variant)) notFound();
  const price = VARIANTS[variant];
  return <LandingPage variant={variant} price={price} />;
}
