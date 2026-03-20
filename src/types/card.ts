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

// Tarot de Marseille types
export interface TarotCard {
  id: number;
  slug: string;
  image: string;
  name: { fr: string; en: string };
  message: {
    upright: { fr: string; en: string };
    reversed: { fr: string; en: string };
  };
}

export interface SelectedTarotCard {
  card: TarotCard;
  reversed: boolean;
  position: 'past' | 'present' | 'future';
}

export interface TarotDeck {
  id: string;
  name: { fr: string; en: string };
  description: { fr: string; en: string };
  cards: TarotCard[];
}

export type TarotPhase = 'intro' | 'select' | 'reveal';
