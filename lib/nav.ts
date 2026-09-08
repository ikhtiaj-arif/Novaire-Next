export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Accueil', href: '/a' },
  { label: 'La Collection', href: '/a#nos-fragrances' },
  { label: 'Contact', href: '/contact' },
  { label: 'À propos', href: '/about' },
];
