export const PHONE_REGEX = /^(\+212|06|07)[0-9]{8}$/;

export interface OrderFields {
  name: string;
  phone: string;
  city: string;
  scent: string;
}

export type FieldErrors = Partial<Record<keyof OrderFields, string>>;

export function validateName(name: string): string | undefined {
  if (!name.trim()) return 'Ce champ est requis';
  if (name.trim().length < 2) return 'Ce champ est requis';
  return undefined;
}

export function validatePhone(phone: string): string | undefined {
  if (!phone.trim()) return 'Numéro invalide (ex: 06XXXXXXXX)';
  if (!PHONE_REGEX.test(phone.trim())) return 'Numéro invalide (ex: 06XXXXXXXX)';
  return undefined;
}

export function validateCity(city: string): string | undefined {
  if (!city.trim()) return 'Veuillez sélectionner une ville';
  return undefined;
}

export function validateScent(scent: string): string | undefined {
  if (!scent.trim()) return 'Veuillez sélectionner un parfum';
  return undefined;
}

export function validateOrder(fields: OrderFields): FieldErrors {
  const errors: FieldErrors = {};
  errors.name = validateName(fields.name);
  errors.phone = validatePhone(fields.phone);
  errors.city = validateCity(fields.city);
  errors.scent = validateScent(fields.scent);
  for (const key of Object.keys(errors) as (keyof FieldErrors)[]) {
    if (!errors[key]) delete errors[key];
  }
  return errors;
}

export function isValidOrder(fields: OrderFields): boolean {
  return Object.keys(validateOrder(fields)).length === 0;
}
