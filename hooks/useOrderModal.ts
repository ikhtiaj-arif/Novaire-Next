import { useCallback, useMemo, useState } from 'react';
import type { Fragrance } from '@/lib/fragrances';

export function useOrderModal(price: number) {
  const [open, setOpen] = useState(false);
  const [selectedScent, setSelectedScent] = useState<Fragrance | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [cardQuantities, setCardQuantities] = useState<Record<string, number>>(
    {}
  );

  const getCardQuantity = useCallback(
    (fragranceId: string) => cardQuantities[fragranceId] ?? 1,
    [cardQuantities]
  );

  const setCardQuantity = useCallback((fragranceId: string, qty: number) => {
    setCardQuantities((prev) => ({
      ...prev,
      [fragranceId]: Math.max(1, qty),
    }));
  }, []);

  const openFor = useCallback(
    (fragrance: Fragrance) => {
      setSelectedScent(fragrance);
      setModalQuantity(cardQuantities[fragrance.id] ?? 1);
      setOpen(true);
    },
    [cardQuantities]
  );

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const modalIncrement = useCallback(() => {
    setModalQuantity((q) => q + 1);
  }, []);

  const modalDecrement = useCallback(() => {
    setModalQuantity((q) => Math.max(1, q - 1));
  }, []);

  const total = useMemo(
    () => (selectedScent ? price * modalQuantity : 0),
    [selectedScent, price, modalQuantity]
  );

  return {
    open,
    openFor,
    close,
    selectedScent,
    cardQuantities,
    getCardQuantity,
    setCardQuantity,
    modalQuantity,
    setModalQuantity,
    modalIncrement,
    modalDecrement,
    total,
    unitPrice: price,
  };
}

export type OrderModalState = ReturnType<typeof useOrderModal>;
