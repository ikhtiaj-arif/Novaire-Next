'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === 'dark';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <span className="font-heading text-xl font-bold tracking-[0.25em] text-foreground">
          NOVAIRE
        </span>

        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          >
            {isDark ? <Sun /> : <Moon />}
          </Button>
        )}
      </div>
    </header>
  );
}