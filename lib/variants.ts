export type Variant = 'a' | 'b' | 'c';

export const VARIANTS: Record<Variant, number> = {
  a: 299,
  b: 399,
  c: 499,
};

export type VariantKey = keyof typeof VARIANTS;

export function isVariant(value: string): value is Variant {
  return value in VARIANTS;
}
