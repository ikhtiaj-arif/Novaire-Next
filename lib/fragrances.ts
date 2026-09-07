export interface Fragrance {
  id: string;
  num: string;
  name: string;
  description: string;
  pills: string[];
}

export const FRAGRANCES: Fragrance[] = [
  {
    id: '01',
    num: 'N°01',
    name: "L'EMPIRE",
    description: 'Inspiré par les notes iconiques d\'Aventus',
    pills: ['Aventus', 'Fruité', 'Boisé'],
  },
  {
    id: '02',
    num: 'N°02',
    name: 'SILEX BLEU',
    description: 'Sillage intense boisé frais',
    pills: ['Boisé', 'Frais', 'Intense'],
  },
  {
    id: '03',
    num: 'N°03',
    name: 'BLEU ABSOLU',
    description: 'Élégance intemporelle aromatique',
    pills: ['Aromatique', 'Élégant', 'Intemporel'],
  },
  {
    id: '04',
    num: 'N°04',
    name: 'ABYSSAL',
    description: 'Fraîcheur marine profonde',
    pills: ['Marin', 'Frais', 'Profond'],
  },
  {
    id: '05',
    num: 'N°05',
    name: 'AMBRE NOIR',
    description: 'Chaleur envoûtante et gourmande',
    pills: ['Ambré', 'Gourmand', 'Chaud'],
  },
  {
    id: '06',
    num: 'N°06',
    name: "LINGOT D'OR",
    description: 'Cuir épicé audacieux',
    pills: ['Cuir', 'Épicé', 'Audacieux'],
  },
  {
    id: '07',
    num: 'N°07',
    name: 'ROUGE CRISTAL',
    description: 'Ambre rouge sophistiqué',
    pills: ['Ambré', 'Rouge', 'Sophistiqué'],
  },
  {
    id: '08',
    num: 'N°08',
    name: 'NUIT NOIRE',
    description: 'Café noir et vanille sensuelle',
    pills: ['Café', 'Vanille', 'Sensuel'],
  },
  {
    id: '09',
    num: 'N°09',
    name: 'TALONS ROUGES',
    description: 'Tubéreuse mystérieuse et cacao',
    pills: ['Tubéreuse', 'Cacao', 'Mystérieux'],
  },
  {
    id: '10',
    num: 'N°10',
    name: 'ÉCLAT JOYEUX',
    description: 'Iris lumineux et gourmand',
    pills: ['Iris', 'Gourmand', 'Lumineux'],
  },
  {
    id: '11',
    num: 'N°11',
    name: 'LIBRE ESPRIT',
    description: 'Lavande audacieuse et fleur d\'oranger',
    pills: ['Lavande', 'Floral', 'Frais'],
  },
  {
    id: '12',
    num: 'N°12',
    name: 'TENDRE CARESSE',
    description: 'Douceur fruitée-florale pétillante',
    pills: ['Fruité', 'Floral', 'Doux'],
  },
];
