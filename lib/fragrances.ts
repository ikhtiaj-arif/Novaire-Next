import { VARIANTS, type Variant } from '@/lib/variants';

export interface Fragrance {
  id: string;
  num: string;
  name: string;
  category: 'mens' | 'womens';
  description: string;
  scentProfile: string;
  pills: string[];
  inspiredBy: string;
  bottle: string;
  box: string;
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
    description: 'Ananas fumé, pomme croquante, bois précieux',
    scentProfile:
      "Un sillage viril et élégant, porté par un ananas fumé et une pomme croquante sur une base de bois chaleureux. Une présence royale, posée et inoubliable.",
    pills: ['Fruité', 'Boisé', 'Élégant'],
    inspiredBy: 'Inspiré de Creed Aventus',
    bottle: '/bottle/bottle_01.jpeg',
    box: '/box/box_image_1.jpeg',
  },
  {
    id: '02',
    num: 'N°02',
    name: 'SILEX BLEU',
    category: 'mens',
    description: 'Fraîcheur boisée, présence intense',
    scentProfile:
      'Bergamote fraîche, poivre noir et bois ambrés. Une fragrance fraîche, puissante et masculine pensée pour laisser une présence nette.',
    pills: ['Frais', 'Boisé', 'Intense'],
    inspiredBy: 'Inspiré de Dior Sauvage',
    bottle: '/bottle/bottle_2.jpeg',
    box: '/box/box_image_2.jpeg',
  },
  {
    id: '03',
    num: 'N°03',
    name: 'BLEU ABSOLU',
    category: 'mens',
    description: 'Élégance aromatique intemporelle',
    scentProfile:
      'Citron étincelant, menthe fraîche et encens fumé. Un classique propre et raffiné, sûr de lui et pensé pour chaque occasion.',
    pills: ['Aromatique', 'Élégant', 'Intemporel'],
    inspiredBy: 'Inspiré de Bleu de Chanel',
    bottle: '/bottle/bottle_3.jpeg',
    box: '/box/box_image_3.jpeg',
  },
  {
    id: '04',
    num: 'N°04',
    name: 'ABYSSAL',
    category: 'mens',
    description: 'Fraîcheur marine profonde',
    scentProfile:
      "Une bouffée d'air iodé — fraîcheur marine, romarin et roches minérales. Un parfum de grand large, profond et enveloppant.",
    pills: ['Marin', 'Frais', 'Profond'],
    inspiredBy: "Inspiré d'Acqua di Giò Profondo",
    bottle: '/bottle/bottle_4.jpeg',
    box: '/box/box_image_4.jpeg',
  },
  {
    id: '05',
    num: 'N°05',
    name: 'AMBRE NOIR',
    category: 'mens',
    description: 'Chaleur gourmande addictive',
    scentProfile:
      'Caramel fondant, châtaigne rôtie et ambre chaud. Une fragrance enveloppante et addictive, celle dont on se souvient dès votre passage.',
    pills: ['Ambré', 'Gourmand', 'Chaud'],
    inspiredBy: 'Inspiré de Stronger With You Intensely',
    bottle: '/bottle/bottle_5.jpeg',
    box: '/box/box_image_5.jpg',
  },
  {
    id: '06',
    num: 'N°06',
    name: "LINGOT D'OR",
    category: 'mens',
    description: 'Épicé, cuir, audacieux',
    scentProfile:
      "Cannelle chaleureuse, mandarine sanguine et cuir brun. Une signature dorée et audacieuse, pensée pour être vue comme sentie.",
    pills: ['Épicé', 'Cuir', 'Audacieux'],
    inspiredBy: 'Inspiré de 1 Million',
    bottle: '/bottle/bottle_6.jpeg',
    box: '/box/box_image_6.jpeg',
  },
  {
    id: '07',
    num: 'N°07',
    name: 'ROUGE CRISTAL',
    category: 'womens',
    description: 'Ambre lumineux sophistiqué',
    scentProfile:
      "Safran écarlate, bois ambrés et sucre filé. Un sillage lumineux, poétique et diffusant, d'une présence sophistiquée.",
    pills: ['Ambré', 'Rouge', 'Sophistiqué'],
    inspiredBy: 'Inspiré de Baccarat Rouge 540',
    bottle: '/bottle/bottle_7.jpeg',
    box: '/box/box_image_7.jpeg',
  },
  {
    id: '08',
    num: 'N°08',
    name: 'NUIT NOIRE',
    category: 'womens',
    description: 'Café noir, vanille sensuelle',
    scentProfile:
      'Café noir, vanille lisse et jasmin blanc. Un parfum de nuit sombre et envoûtant, doux et addictif à la fois.',
    pills: ['Café', 'Vanille', 'Sensuel'],
    inspiredBy: 'Inspiré de Black Opium YSL',
    bottle: '/bottle/bottle_8.jpeg',
    box: '/box/box_image_8.jpeg',
  },
  {
    id: '09',
    num: 'N°09',
    name: 'TALONS ROUGES',
    category: 'womens',
    description: 'Tubéreuse et cacao élégants',
    scentProfile:
      "Cacao crémeux, tubéreuse blanche et fève tonka. Une élégance audacieuse à double visage — douce d'abord, affirmée ensuite.",
    pills: ['Tubéreuse', 'Cacao', 'Mystérieux'],
    inspiredBy: 'Inspiré de Carolina Herrera Good Girl',
    bottle: '/bottle/bottle_9.jpeg',
    box: '/box/box_image_9.jpeg',
  },
  {
    id: '10',
    num: 'N°10',
    name: 'ÉCLAT JOYEUX',
    category: 'womens',
    description: 'Iris raffiné et gourmand',
    scentProfile:
      "Praline chocolatée, iris éclatant et cassis mûr. Une célébration lumineuse et gourmande, d'une élégance rayonnante.",
    pills: ['Iris', 'Gourmand', 'Lumineux'],
    inspiredBy: 'Inspiré de Lancôme La Vie Est Belle',
    bottle: '/bottle/bottle_10.jpeg',
    box: '/box/box_image_10.jpeg',
  },
  {
    id: '11',
    num: 'N°11',
    name: 'LIBRE ESPRIT',
    category: 'womens',
    description: 'Lavande fraîche, fleur d\'oranger',
    scentProfile:
      "Lavande fraîche, fleur d'oranger et vanille sombre. Une déclaration libre et audacieuse, féminine et sans compromis.",
    pills: ['Lavande', 'Floral', 'Frais'],
    inspiredBy: 'Inspiré de YSL Libre',
    bottle: '/bottle/bottle_11.jpeg',
    box: '/box/box_image_11.jpeg',
  },
  {
    id: '12',
    num: 'N°12',
    name: 'TENDRE CARESSE',
    category: 'womens',
    description: 'Douceur fruitée-florale pétillante',
    scentProfile:
      'Jacinthe rose, pamplemousse frais et musc blanc. Un nuage fruité-floral romantique et aérien, délicatement sucré.',
    pills: ['Fruité', 'Floral', 'Doux'],
    inspiredBy: 'Inspiré de Chanel Chance Eau Tendre',
    bottle: '/bottle/bottle_12.jpeg',
    box: '/box/box_image_12.jpeg',
  },
];