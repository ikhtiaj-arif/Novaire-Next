'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-gold/10 bg-white dark:bg-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gold">
          NOVAIRE
        </Link>

        {/* Desktop Menu */}
        <div className="hidden gap-8 md:flex">
          <a href="#" className="text-sm hover:text-gold">
            Fragrances
          </a>
          <a href="#" className="text-sm hover:text-gold">
            About
          </a>
        </div>

        {/* Theme Toggle + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-lg p-2 hover:bg-gold/10"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 hover:bg-gold/10 md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gold/10 bg-white dark:bg-black px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <a href="#" className="text-sm hover:text-gold">
              Fragrances
            </a>
            <a href="#" className="text-sm hover:text-gold">
              About
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
