'use client';

import { useState } from 'react';
import { Hero } from './Hero';
import { ProductGrid } from './ProductGrid';
import { CheckoutForm } from './CheckoutForm';
import { Fragrance } from '@/lib/constants';

interface LandingPageProps {
  variant: string;
  price: number;
}

export function LandingPage({ variant, price }: LandingPageProps) {
  const [selectedScent, setSelectedScent] = useState<string | undefined>(undefined);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const handleSelectFragrance = (fragrance: Fragrance, qty: number) => {
    setSelectedScent(fragrance.fullName);
    setSelectedQuantity(qty);

    // Smooth scroll to checkout form
    const formElement = document.getElementById('checkout-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToGrid = () => {
    const gridElement = document.getElementById('fragrances');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen selection:bg-gold selection:text-black">
      {/* Hero Banner Section */}
      <Hero price={price} onSelectScentsClick={handleScrollToGrid} />

      {/* 12-Fragrance Product Grid */}
      <ProductGrid price={price} onSelectFragrance={handleSelectFragrance} />

      {/* Cash-on-Delivery Checkout Form */}
      <CheckoutForm
        variant={variant}
        price={price}
        selectedScentName={selectedScent}
        selectedQuantity={selectedQuantity}
      />
    </div>
  );
}
