import { LandingPage } from '@/components/LandingPage';
import { PRICING_VARIANTS } from '@/lib/constants';

export const metadata = {
  title: "NOVAIRE | Haute Parfumerie (299 DH)",
  description: "Découvrez notre collection exclusive de 12 fragrances de luxe.",
};

export default function PageA() {
  return <LandingPage variant="A" price={PRICING_VARIANTS.A} />;
}
