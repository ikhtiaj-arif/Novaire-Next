import { useCallback, useMemo, useState } from 'react';
import type { Fragrance } from '@/lib/fragrances';

export function useOrderModal(price: number) {
  const [open, setOpen] = useState(false);
  const [selectedScent, setSelectedScent] = useState<Fragrance | null>(null);
  const [quantity, setQuantity] = useState(1);

  const openFor = useCallback((fragrance: Fragrance) => {
    setSelectedScent(fragrance);
    setQuantity(1);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const increment = useCallback(() => {
    setQuantity((q) => q + 1);
  }, []);

  const decrement = useCallback(() => {
    setQuantity((q) => Math.max(1, q - 1));
  }, []);

  const total = useMemo(
    () => (selectedScent ? price * quantity : 0),
    [selectedScent, price, quantity]
  );

  return {
    open,
    openFor,
    close,
    selectedScent,
    quantity,
    setQuantity,
    increment,
    decrement,
    total,
    unitPrice: price,
  };
}

export type OrderModalState = ReturnType<typeof useOrderModal>;
