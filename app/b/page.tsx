import { LandingPage } from '@/components/LandingPage';
import { PRICING_VARIANTS } from '@/lib/constants';

export const metadata = {
  title: "NOVAIRE | Haute Parfumerie (399 DH)",
  description: "Découvrez notre collection exclusive de 12 fragrances de luxe.",
};

export default function PageB() {
  return <LandingPage variant="B" price={PRICING_VARIANTS.B} />;
}
