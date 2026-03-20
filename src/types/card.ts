export interface Card {
  id: number;
  slug: string;
  image: string;
  name: {
    fr: string;
    en: string;
  };
  message: {
    fr: string;
    en: string;
  };
  interpretation?: {
    fr: string;
    en: string;
  };
}

export interface Deck {
  id: string;
  name: { fr: string; en: string };
  description: { fr: string; en: string };
  cards: Card[];
  cardBack: string;
}

export interface Reading {
  deck: string;
  card: Card;
  date: string;
  question?: string;
}
