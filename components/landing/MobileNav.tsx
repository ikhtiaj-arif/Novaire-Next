'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, Phone, Info } from 'lucide-react';
import { NAV_LINKS } from '@/lib/nav';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';

const ICONS = {
  Accueil: Home,
  'La Collection': Layers,
  Contact: Phone,
  'À propos': Info,
} as const;

export function MobileNav({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        overlayClassName="lg:hidden"
        className="w-72 pt-14 lg:hidden"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <nav className="flex flex-col gap-1 px-3">
          {NAV_LINKS.map(({ label, href }) => {
            const Icon = ICONS[label as keyof typeof ICONS];
            const active =
              (href === '/a' ? pathname === '/a' || pathname === '/' : pathname === href) ||
              pathname.startsWith(href.split('#')[0]);
            return (
              <Link
                key={label}
                href={href}
                onClick={() => onOpenChange(false)}
                className={`inline-flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-gold/10 text-gold'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                {label}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-3" />

        <div className="px-4 text-xs text-muted-foreground">
          <p className="font-semibold uppercase tracking-[0.2em] text-gold">
            NOVAIRE
          </p>
          <p className="mt-1 leading-relaxed">
            Haute Parfumerie Fine — Paiement à la livraison partout au Maroc.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
