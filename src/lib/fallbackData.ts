export interface FallbackMenuItem {
  id: string;
  category_id: string;
  name_ka: string;
  name_en: string;
  name_uk: string;
  description_ka?: string;
  description_en?: string;
  description_uk?: string;
  price: string;
  is_available: boolean;
  order_index: number;
}

export interface FallbackCategory {
  id: string;
  name_ka: string;
  name_en: string;
  name_uk: string;
  order_index: number;
  items: FallbackMenuItem[];
}

export interface FallbackEvent {
  id: string;
  title_ka: string;
  title_en: string;
  title_uk: string;
  description_ka?: string;
  description_en?: string;
  description_uk?: string;
  event_day_ka: string;
  event_day_en: string;
  event_day_uk: string;
  event_time: string;
  order_index: number;
}

export const FALLBACK_MENU: FallbackCategory[] = [
  {
    id: 'cat-handcrafted',
    name_ka: 'ხელნაკეთი კოქტეილები — 22₾',
    name_en: 'Hand Crafted Cocktails — 22₾',
    name_uk: 'Авторські коктейлі — 22₾',
    order_index: 0,
    items: [
      {
        id: 'hc-1',
        category_id: 'cat-handcrafted',
        name_ka: 'Akademikosi',
        name_en: 'Akademikosi',
        name_uk: 'Akademikosi',
        description_ka: 'Bitter',
        description_en: 'Bitter',
        description_uk: 'Bitter',
        price: '22',
        is_available: true,
        order_index: 0,
      },
      {
        id: 'hc-2',
        category_id: 'cat-handcrafted',
        name_ka: 'Harvest',
        name_en: 'Harvest',
        name_uk: 'Harvest',
        description_ka: 'Spicy, Chilli',
        description_en: 'Spicy, Chilli',
        description_uk: 'Spicy, Chilli',
        price: '22',
        is_available: true,
        order_index: 1,
      },
      {
        id: 'hc-3',
        category_id: 'cat-handcrafted',
        name_ka: 'Bubble Freeze',
        name_en: 'Bubble Freeze',
        name_uk: 'Bubble Freeze',
        description_ka: 'Tropical',
        description_en: 'Tropical',
        description_uk: 'Tropical',
        price: '22',
        is_available: true,
        order_index: 2,
      },
      {
        id: 'hc-4',
        category_id: 'cat-handcrafted',
        name_ka: 'Berry Gimlet',
        name_en: 'Berry Gimlet',
        name_uk: 'Berry Gimlet',
        description_ka: 'Tropical',
        description_en: 'Tropical',
        description_uk: 'Tropical',
        price: '22',
        is_available: true,
        order_index: 3,
      },
      {
        id: 'hc-5',
        category_id: 'cat-handcrafted',
        name_ka: 'Dream',
        name_en: 'Dream',
        name_uk: 'Dream',
        description_ka: 'Sweet, Creamy',
        description_en: 'Sweet, Creamy',
        description_uk: 'Sweet, Creamy',
        price: '22',
        is_available: true,
        order_index: 4,
      },
    ],
  },
  {
    id: 'cat-classics',
    name_ka: 'კლასიკური კოქტეილები',
    name_en: 'Classic Cocktails',
    name_uk: 'Класичні коктейлі',
    order_index: 1,
    items: [
      {
        id: 'cl-1',
        category_id: 'cat-classics',
        name_ka: 'Negroni',
        name_en: 'Negroni',
        name_uk: 'Negroni',
        price: '20',
        is_available: true,
        order_index: 0,
      },
      {
        id: 'cl-2',
        category_id: 'cat-classics',
        name_ka: 'Whiskey Sour',
        name_en: 'Whiskey Sour',
        name_uk: 'Whiskey Sour',
        price: '19',
        is_available: true,
        order_index: 1,
      },
      {
        id: 'cl-3',
        category_id: 'cat-classics',
        name_ka: 'Gin Sour Maracuya',
        name_en: 'Gin Sour Maracuya',
        name_uk: 'Gin Sour Maracuya',
        price: '22',
        is_available: true,
        order_index: 2,
      },
      {
        id: 'cl-4',
        category_id: 'cat-classics',
        name_ka: 'Aperol / Limoncello Spritz',
        name_en: 'Aperol / Limoncello Spritz',
        name_uk: 'Aperol / Limoncello Spritz',
        price: '22',
        is_available: true,
        order_index: 3,
      },
      {
        id: 'cl-5',
        category_id: 'cat-classics',
        name_ka: 'Mai Tai',
        name_en: 'Mai Tai',
        name_uk: 'Mai Tai',
        price: '19',
        is_available: true,
        order_index: 4,
      },
      {
        id: 'cl-6',
        category_id: 'cat-classics',
        name_ka: 'Daiquiri / Margarita',
        name_en: 'Daiquiri / Margarita',
        name_uk: 'Daiquiri / Margarita',
        price: '19',
        is_available: true,
        order_index: 5,
      },
      {
        id: 'cl-7',
        category_id: 'cat-classics',
        name_ka: 'Old Fashioned',
        name_en: 'Old Fashioned',
        name_uk: 'Old Fashioned',
        price: '19',
        is_available: true,
        order_index: 6,
      },
      {
        id: 'cl-8',
        category_id: 'cat-classics',
        name_ka: 'Espresso Martini',
        name_en: 'Espresso Martini',
        name_uk: 'Espresso Martini',
        price: '19',
        is_available: true,
        order_index: 7,
      },
      {
        id: 'cl-9',
        category_id: 'cat-classics',
        name_ka: 'Gin Breeze / Basil Smash',
        name_en: 'Gin Breeze / Basil Smash',
        name_uk: 'Gin Breeze / Basil Smash',
        price: '19',
        is_available: true,
        order_index: 8,
      },
    ],
  },
  {
    id: 'cat-spirits',
    name_ka: 'სპირტიანი სასმელები',
    name_en: 'Spirits',
    name_uk: 'Міцні напої',
    order_index: 2,
    items: [
      { id: 'sp-1', category_id: 'cat-spirits', name_ka: 'Aperol', name_en: 'Aperol', name_uk: 'Aperol', price: '11', is_available: true, order_index: 0 },
      { id: 'sp-2', category_id: 'cat-spirits', name_ka: 'Campari', name_en: 'Campari', name_uk: 'Campari', price: '12', is_available: true, order_index: 1 },
      { id: 'sp-3', category_id: 'cat-spirits', name_ka: 'Jagermeister', name_en: 'Jagermeister', name_uk: 'Jagermeister', price: '10', is_available: true, order_index: 2 },
      { id: 'sp-4', category_id: 'cat-spirits', name_ka: 'Limoncello', name_en: 'Limoncello', name_uk: 'Limoncello', price: '11', is_available: true, order_index: 3 },
      { id: 'sp-5', category_id: 'cat-spirits', name_ka: 'Absolut', name_en: 'Absolut', name_uk: 'Absolut', price: '10', is_available: true, order_index: 4 },
      { id: 'sp-6', category_id: 'cat-spirits', name_ka: 'Gray Goose', name_en: 'Gray Goose', name_uk: 'Gray Goose', price: '20', is_available: true, order_index: 5 },
      { id: 'sp-7', category_id: 'cat-spirits', name_ka: 'Tullamore Dew', name_en: 'Tullamore Dew', name_uk: 'Tullamore Dew', price: '14', is_available: true, order_index: 6 },
      { id: 'sp-8', category_id: 'cat-spirits', name_ka: 'Jameson', name_en: 'Jameson', name_uk: 'Jameson', price: '15', is_available: true, order_index: 7 },
      { id: 'sp-9', category_id: 'cat-spirits', name_ka: "Jack Daniel's", name_en: "Jack Daniel's", name_uk: "Jack Daniel's", price: '16', is_available: true, order_index: 8 },
      { id: 'sp-10', category_id: 'cat-spirits', name_ka: 'Monkey Shoulder', name_en: 'Monkey Shoulder', name_uk: 'Monkey Shoulder', price: '22', is_available: true, order_index: 9 },
      { id: 'sp-11', category_id: 'cat-spirits', name_ka: "Hendrick's", name_en: "Hendrick's", name_uk: "Hendrick's", price: '22', is_available: true, order_index: 10 },
      { id: 'sp-12', category_id: 'cat-spirits', name_ka: 'The Botanist', name_en: 'The Botanist', name_uk: 'The Botanist', price: '22', is_available: true, order_index: 11 },
      { id: 'sp-13', category_id: 'cat-spirits', name_ka: 'Beefeater', name_en: 'Beefeater', name_uk: 'Beefeater', price: '12', is_available: true, order_index: 12 },
      { id: 'sp-14', category_id: 'cat-spirits', name_ka: 'Tanqueray', name_en: 'Tanqueray', name_uk: 'Tanqueray', price: '15', is_available: true, order_index: 13 },
      { id: 'sp-15', category_id: 'cat-spirits', name_ka: 'Bombay', name_en: 'Bombay', name_uk: 'Bombay', price: '16', is_available: true, order_index: 14 },
      { id: 'sp-16', category_id: 'cat-spirits', name_ka: 'Captain Morgan', name_en: 'Captain Morgan', name_uk: 'Captain Morgan', price: '11', is_available: true, order_index: 15 },
      { id: 'sp-17', category_id: 'cat-spirits', name_ka: 'Havana Club', name_en: 'Havana Club', name_uk: 'Havana Club', price: '13', is_available: true, order_index: 16 },
      { id: 'sp-18', category_id: 'cat-spirits', name_ka: 'Bacardi', name_en: 'Bacardi', name_uk: 'Bacardi', price: '12', is_available: true, order_index: 17 },
      { id: 'sp-19', category_id: 'cat-spirits', name_ka: 'Hennessy VS', name_en: 'Hennessy VS', name_uk: 'Hennessy VS', price: '29', is_available: true, order_index: 18 },
      { id: 'sp-20', category_id: 'cat-spirits', name_ka: 'Milagro Reposado', name_en: 'Milagro Reposado', name_uk: 'Milagro Reposado', price: '18', is_available: true, order_index: 19 },
      { id: 'sp-21', category_id: 'cat-spirits', name_ka: 'Jose Cuervo', name_en: 'Jose Cuervo', name_uk: 'Jose Cuervo', price: '14', is_available: true, order_index: 20 },
    ],
  },
  {
    id: 'cat-beer',
    name_ka: 'ლუდი',
    name_en: 'Beer',
    name_uk: 'Пиво',
    order_index: 3,
    items: [
      { id: 'be-1', category_id: 'cat-beer', name_ka: 'Heineken', name_en: 'Heineken', name_uk: 'Heineken', price: '12', is_available: true, order_index: 0 },
      { id: 'be-2', category_id: 'cat-beer', name_ka: 'Corona', name_en: 'Corona', name_uk: 'Corona', price: '14', is_available: true, order_index: 1 },
      { id: 'be-3', category_id: 'cat-beer', name_ka: 'Estrella', name_en: 'Estrella', name_uk: 'Estrella', price: '11', is_available: true, order_index: 2 },
      { id: 'be-4', category_id: 'cat-beer', name_ka: 'Lowenbrau', name_en: 'Lowenbrau', name_uk: 'Lowenbrau', price: '12', is_available: true, order_index: 3 },
      { id: 'be-5', category_id: 'cat-beer', name_ka: 'Tuati', name_en: 'Tuati', name_uk: 'Tuati', price: '15', is_available: true, order_index: 4 },
      { id: 'be-6', category_id: 'cat-beer', name_ka: 'Cider', name_en: 'Cider', name_uk: 'Cider', price: '17/38', is_available: true, order_index: 5 },
    ],
  },
];

export const FALLBACK_EVENTS: FallbackEvent[] = [
  {
    id: 'ev-1',
    title_ka: 'Underground Jam',
    title_en: 'Underground Jam',
    title_uk: 'Underground Jam',
    description_ka: 'ღია მიკროფონი',
    description_en: 'Open Mic Night',
    description_uk: 'Відкритий мікрофон',
    event_day_ka: 'ოთხშაბათი',
    event_day_en: 'Wednesday',
    event_day_uk: 'Середа',
    event_time: '21:00',
    order_index: 0,
  },
  {
    id: 'ev-2',
    title_ka: 'Jupiter Nights',
    title_en: 'Jupiter Nights',
    title_uk: 'Jupiter Nights',
    description_ka: 'DJ სეტი',
    description_en: 'DJ Set',
    description_uk: 'DJ сет',
    event_day_ka: 'პარასკევი',
    event_day_en: 'Friday',
    event_day_uk: "П'ятниця",
    event_time: '23:00',
    order_index: 1,
  },
  {
    id: 'ev-3',
    title_ka: 'ცოცხალი მუსიკა',
    title_en: 'Live Bands',
    title_uk: 'Живі гурти',
    description_ka: 'მოწვეული არტისტები',
    description_en: 'Featured Artists',
    description_uk: 'Запрошені არтисти',
    event_day_ka: 'შაბათი',
    event_day_en: 'Saturday',
    event_day_uk: 'Субота',
    event_time: '22:00',
    order_index: 2,
  },
];
