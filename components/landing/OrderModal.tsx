'use client';

import { useState, type FormEvent } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ChevronsUpDown, LoaderCircle, MapPin, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import type { Fragrance } from '@/lib/fragrances';
import { validateOrder, type FieldErrors } from '@/lib/validation';
import { MOROCCAN_CITIES } from '@/lib/cities';
import { Badge } from '@/components/ui/badge';
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
  totalPrice: number;
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

function CitySelect({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="order-city">Ville</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id="order-city"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-invalid={!!error}
              className="justify-between font-normal"
            >
              {value || (
                <span className="text-muted-foreground">
                  Sélectionnez votre ville
                </span>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          }
        />
        <PopoverContent className="max-w-[calc(100vw-2rem)]" align="start">
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
                      onChange(c);
                      setOpen(false);
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
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
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
        totalPrice: total,
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
    <div className="rounded-xl border border-border bg-muted/40 p-4  lg:mt-3">
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

  const scentHeader = scent && (
    <div className="mb-4 text-center lg:text-left">
      <div className="flex flex-col items-center gap-1 lg:flex-row lg:items-baseline lg:justify-between">
        <span className="text-[11px] font-semibold tracking-[0.2em] text-gold">
          {scent.num}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Extrait de Parfum · 50 ml
        </span>
      </div>

      <h3 className="font-heading mt-1.5 text-xl font-bold text-foreground lg:text-2xl">
        {scent.name}
      </h3>

      <div className="mt-2 flex flex-wrap justify-center gap-1.5 lg:justify-start">
        {scent.pills.map((pill) => (
          <Badge key={pill} variant="outline" className="text-[11px]">
            {pill}
          </Badge>
        ))}
      </div>

      <p className="mt-3 text-xs italic text-muted-foreground">
        {scent.inspiredBy}
      </p>

      <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground lg:text-left">
        {scent.scentProfile}
      </p>
    </div>
  );

  const form = (
    <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col gap-4">
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
          maxLength={16}
          onChange={(e) => {
            const value = e.target.value;
            if (!/^[0-9+\s.-]*$/.test(value)) return;
            setPhone(value);
          }}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone}</p>
        )}
      </div>

      <CitySelect value={city} onChange={setCity} error={errors.city} />

      {errorMessage && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive animate-shake">
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-gold text-black hover:bg-gold-hover animate-gold-glow-ring disabled:opacity-70"
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
  );

  return (
    <>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="lg:max-w-3xl lg:max-h-[85dvh] lg:p-0 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] overflow-hidden">
            <DialogTitle className="sr-only">Votre commande</DialogTitle>

            {/* Left — product images */}
            <div className="hidden flex-col items-center justify-center gap-6 bg-muted/30 p-8 lg:flex">
              {scent && (
                <>
                  <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-xl">
                    <Image
                      src={scent.bottle}
                      alt={`Flacon NOVAIRE ${scent.num} — ${scent.name}`}
                      fill
                      quality={85}
                      className="object-contain"
                      sizes="(min-width: 1024px) 280px"
                    />
                  </div>
                  <div className="relative aspect-[4/3] w-full max-w-[280px] overflow-hidden rounded-xl">
                    <Image
                      src={scent.box}
                      alt={`Coffret NOVAIRE ${scent.num} — ${scent.name}`}
                      fill
                      quality={85}
                      className="object-contain"
                      sizes="(min-width: 1024px) 280px"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Right — details + form */}
            <div className="overflow-y-auto p-8">
              {scentHeader}
              {summary}
              {form}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent
            side="bottom"
            className="max-h-[92dvh] overflow-y-auto rounded-t-2xl px-4 pb-8 pt-6"
          >
            <SheetTitle className="sr-only">Votre commande</SheetTitle>

            {/* Mobile — bottle + box side by side */}
            {scent && (
              <div className="mb-4 flex gap-3">
                <div className="relative aspect-[3/4] flex-1 overflow-hidden rounded-xl bg-muted/20">
                  <Image
                    src={scent.bottle}
                    alt={`Flacon NOVAIRE ${scent.num} — ${scent.name}`}
                    fill
                    quality={85}
                    className="object-contain"
                    sizes="50vw"
                  />
                </div>
                <div className="relative aspect-[3/4] flex-1 overflow-hidden rounded-xl bg-muted/20">
                  <Image
                    src={scent.box}
                    alt={`Coffret NOVAIRE ${scent.num} — ${scent.name}`}
                    fill
                    quality={85}
                    className="object-contain"
                    sizes="50vw"
                  />
                </div>
              </div>
            )}

            {scentHeader}
            {summary}
            {form}
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}