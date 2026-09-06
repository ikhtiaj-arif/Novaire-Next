import { LandingPage } from '@/components/LandingPage';
import { PRICING_VARIANTS } from '@/lib/constants';

export const metadata = {
  title: "NOVAIRE | Haute Parfumerie (499 DH)",
  description: "Découvrez notre collection exclusive de 12 fragrances de luxe.",
};

export default function PageC() {
  return <LandingPage variant="C" price={PRICING_VARIANTS.C} />;
}
