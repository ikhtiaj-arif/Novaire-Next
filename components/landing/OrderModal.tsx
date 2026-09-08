'use client';

import { useState, type FormEvent } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ChevronsUpDown, LoaderCircle, MapPin, Minus, Plus } from 'lucide-react';
import type { Fragrance } from '@/lib/fragrances';
import { validateOrder, type FieldErrors } from '@/lib/validation';
import { MOROCCAN_CITIES } from '@/lib/cities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';

export interface OrderPayload {
  name: string;
  phone: string;
  city: string;
  scent: string;
  quantity: number;
  variant: string;
  price: number;
}

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scent: Fragrance | null;
  quantity: number;
  total: number;
  unitPrice: number;
  variant: string;
  onQuantityIncrement: () => void;
  onQuantityDecrement: () => void;
  onSubmit: (payload: OrderPayload) => Promise<boolean>;
}

export function OrderModal({
  open,
  onOpenChange,
  scent,
  quantity,
  total,
  unitPrice,
  variant,
  onQuantityIncrement,
  onQuantityDecrement,
  onSubmit,
}: OrderModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [cityOpen, setCityOpen] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!scent || submitting) return;

    const fieldErrors = validateOrder({ name, phone, city, scent: scent.name });
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setErrorMessage(null);
      return;
    }

    setErrors({});
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const ok = await onSubmit({
        name: name.trim(),
        phone: phone.trim(),
        city,
        scent: `${scent.num} | ${scent.name}`,
        quantity,
        variant,
        price: unitPrice,
      });

      if (!ok) {
        setErrorMessage(
          "Une erreur est survenue. Veuillez réessayer ou nous contacter sur WhatsApp."
        );
      } else {
        setName('');
        setPhone('');
        setCity('');
        onOpenChange(false);
      }
    } catch {
      setErrorMessage(
        "Une erreur est survenue. Veuillez réessayer ou nous contacter sur WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const summary = scent && (
    <div className="rounded-xl border border-border bg-muted/40 p-4 mt-6 lg:mt-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.2em] text-gold">
            NOVAIRE
          </div>
          <div className="font-heading mt-0.5 text-base font-bold text-foreground">
            {scent.num} — {scent.name}
          </div>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full border border-border px-1 py-0.5">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Réduire la quantité"
            onClick={onQuantityDecrement}
          >
            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
          <span className="w-6 text-center text-sm font-medium text-foreground">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Augmenter la quantité"
            onClick={onQuantityIncrement}
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </div>
      </div>
      <Separator className="mt-3 mb-3" />
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {quantity} × {unitPrice} DH
        </span>
        <span className="text-lg font-bold text-gold">
          {total} <span className="text-xs">DH</span>
        </span>
      </div>
    </div>
  );

  const inner = (
    <>
      {summary}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="order-name">Nom Complet</Label>
            <Input
              id="order-name"
              autoComplete="name"
              placeholder="Votre nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="order-phone">Téléphone</Label>
            <Input
              id="order-phone"
              autoComplete="tel"
              type="tel"
              inputMode="tel"
              placeholder="06XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="order-city">Ville</Label>
            <Popover open={cityOpen} onOpenChange={setCityOpen}>
              <PopoverTrigger
                render={
                  <Button
                    id="order-city"
                    variant="outline"
                    role="combobox"
                    aria-expanded={cityOpen}
                    className="justify-between font-normal"
                  >
                    {city || (
                      <span className="text-muted-foreground">
                        Sélectionnez votre ville
                      </span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                }
              />
              <PopoverContent className="w-72 p-0" align="start">
                <Command>
                  <CommandInput placeholder="Rechercher une ville..." />
                  <CommandList>
                    <CommandEmpty>Aucune ville trouvée</CommandEmpty>
                    <CommandGroup>
                      {MOROCCAN_CITIES.map((c) => (
                        <CommandItem
                          key={c}
                          value={c}
                          onSelect={() => {
                            setCity(c);
                            setCityOpen(false);
                          }}
                        >
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {c}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.city && (
              <p className="text-xs text-destructive">{errors.city}</p>
            )}
          </div>
        </div>

        {errorMessage && (
          <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive animate-shake">
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          disabled={submitting}
          className="mt-5 w-full bg-gold text-black hover:bg-gold-hover animate-gold-glow disabled:opacity-70"
        >
          {submitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              Envoi en cours...
            </>
          ) : (
            'CONFIRMER MA COMMANDE'
          )}
        </Button>
      </form>
    </>
  );

  return (
    <>
      {isDesktop ? (
        /* Desktop: centered dialog */
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent
            className="hidden lg:grid lg:max-w-md"
          >
            <DialogTitle className="sr-only">Votre commande</DialogTitle>
            <div className="p-4">{inner}</div>
          </DialogContent>
        </Dialog>
      ) : (
        /* Mobile: bottom sheet */
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent
            side="bottom"
            overlayClassName="lg:hidden"
            className="max-h-[90dvh] overflow-y-auto rounded-t-2xl px-4 pb-8 pt-6 lg:hidden"
          >
            <SheetTitle className="sr-only">Votre commande</SheetTitle>
            {inner}
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
