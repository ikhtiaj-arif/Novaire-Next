import { VARIANTS, type Variant } from '@/lib/variants';

export interface Fragrance {
  id: string;
  num: string;
  name: string;
  category: 'mens' | 'womens';
  description: string;
  scentProfile: string;
  pills: string[];
}

export function getFragrancePrice(_fragrance: Fragrance, variant: Variant): number {
  return VARIANTS[variant];
}

export const FRAGRANCES: Fragrance[] = [
  {
    id: '01',
    num: 'N°01',
    name: "L'EMPIRE",
    category: 'mens',
    description: 'Inspiré par les notes iconiques d\'Aventus',
    scentProfile:
      "Inspiré de Creed Aventus — Un mélange magistral et sophistiqué d'ananas fumé et frais, de pomme verte croquante, sur une base boisée de bouleau rustique.",
    pills: ['Aventus', 'Fruité', 'Boisé'],
  },
  {
    id: '02',
    num: 'N°02',
    name: 'SILEX BLEU',
    category: 'mens',
    description: 'Sillage intense boisé frais',
    scentProfile:
      "Inspiré de Dior Sauvage — Une fragrance brute, métallique et minérale portée par une overdose de molécules ambrées, de poivre noir concassé et de bergamote fraîche.",
    pills: ['Boisé', 'Frais', 'Intense'],
  },
  {
    id: '03',
    num: 'N°03',
    name: 'BLEU ABSOLU',
    category: 'mens',
    description: 'Élégance intemporelle aromatique',
    scentProfile:
      "Inspiré de Bleu de Chanel — Un chef-d'œuvre aromatique ultra-propre et intemporel mariant un citron étincelant, des feuilles de menthe fraîche, du gingembre râpé et un encens profondément fumé.",
    pills: ['Aromatique', 'Élégant', 'Intemporel'],
  },
  {
    id: '04',
    num: 'N°04',
    name: 'ABYSSAL',
    category: 'mens',
    description: 'Fraîcheur marine profonde',
    scentProfile:
      "Inspiré d'Acqua di Giò Profondo — Un voyage aquatique glacé et océanique capturant des vagues de fraîcheur marine, de romarin aromatique et de roches minérales.",
    pills: ['Marin', 'Frais', 'Profond'],
  },
  {
    id: '05',
    num: 'N°05',
    name: 'AMBRE NOIR',
    category: 'mens',
    description: 'Chaleur envoûtante et gourmande',
    scentProfile:
      "Inspiré de Stronger With You Intensely — Une signature gourmande chaleureuse, douillette et addictive bâtie sur un caramel de toffee fondant, des châtaignes rôties et une riche résine ambrée.",
    pills: ['Ambré', 'Gourmand', 'Chaud'],
  },
  {
    id: '06',
    num: 'N°06',
    name: "LINGOT D'OR",
    category: 'mens',
    description: 'Cuir épicé audacieux',
    scentProfile:
      "Inspiré de 1 Million — Un profil épicé, audacieux et luxueux défini par une écorce de cannelle chaleureuse, une mandarine sanguine et des lanières de cuir brun premium.",
    pills: ['Cuir', 'Épicé', 'Audacieux'],
  },
  {
    id: '07',
    num: 'N°07',
    name: 'ROUGE CRISTAL',
    category: 'womens',
    description: 'Ambre rouge sophistiqué',
    scentProfile:
      "Inspiré de Baccarat Rouge 540 — Un mélange moléculaire, poétique et très diffusable de filaments de safran écarlate, de bois ambré lumineux et d'un sillage sucré et aérien de sucre filé tiède.",
    pills: ['Ambré', 'Rouge', 'Sophistiqué'],
  },
  {
    id: '08',
    num: 'N°08',
    name: 'NUIT NOIRE',
    category: 'womens',
    description: 'Café noir et vanille sensuelle',
    scentProfile:
      "Inspiré de Black Opium YSL — Un parfum de nuit séducteur, sombre et très addictif mariant des cascades riches de grains de café, de gousses de vanille lisses et de jasmin blanc délicat.",
    pills: ['Café', 'Vanille', 'Sensuel'],
  },
  {
    id: '09',
    num: 'N°09',
    name: 'TALONS ROUGES',
    category: 'womens',
    description: 'Tubéreuse mystérieuse et cacao',
    scentProfile:
      "Inspiré de Carolina Herrera Good Girl — Une formulation crémeuse, audacieuse et à double nature révélant une poudre de cacao riche, une tubéreuse blanche sensuelle et des fèves de tonka torréfiées.",
    pills: ['Tubéreuse', 'Cacao', 'Mystérieux'],
  },
  {
    id: '10',
    num: 'N°10',
    name: 'ÉCLAT JOYEUX',
    category: 'womens',
    description: 'Iris lumineux et gourmand',
    scentProfile:
      "Inspiré de Lancôme La Vie Est Belle — Une célébration élégante, lumineuse et ultra-longue de pralines chocolatées sucrées, d'iris pourpre éclatant et de cassis mûr.",
    pills: ['Iris', 'Gourmand', 'Lumineux'],
  },
  {
    id: '11',
    num: 'N°11',
    name: 'LIBRE ESPRIT',
    category: 'womens',
    description: 'Lavande audacieuse et fleur d\'oranger',
    scentProfile:
      "Inspiré de YSL Libre EDP — Une déclaration aromatique audacieuse, nette et sans genre équilibrant des brins de lavande française fraîche, de la fleur d'oranger et une base de vanille sombre.",
    pills: ['Lavande', 'Floral', 'Frais'],
  },
  {
    id: '12',
    num: 'N°12',
    name: 'TENDRE CARESSE',
    category: 'womens',
    description: 'Douceur fruitée-florale pétillante',
    scentProfile:
      "Inspiré de Chanel Chance Eau Tendre — Un nuage fruité-floral romantique, aérien et délicatement sucré de pétales de jacinthe rose doux, de quartiers de pamplemousse frais et de musc blanc lisse.",
    pills: ['Fruité', 'Floral', 'Doux'],
  },
];
