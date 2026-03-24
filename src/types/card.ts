export type LocalizedString = Record<string, string>;

export interface Card {
  id: number;
  slug: string;
  image: string;
  name: LocalizedString;
  message: LocalizedString;
  interpretation?: LocalizedString;
}

export interface Deck {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
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
  name: LocalizedString;
  message: {
    upright: LocalizedString;
    reversed: LocalizedString;
  };
}

export interface SelectedTarotCard {
  card: TarotCard;
  reversed: boolean;
  position: 'past' | 'present' | 'future';
}

export interface TarotDeck {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  cards: TarotCard[];
}

export type TarotPhase = 'intro' | 'select' | 'reveal';

// Extended meanings for card meaning pages (SEO)
export interface TarotMeaning {
  slug: string;
  number: number | string;
  image: string;
  name: LocalizedString;
  keywords: LocalizedString;
  element?: string;
  planet?: string;
  upright: {
    meaning: LocalizedString;
    love: LocalizedString;
    career: LocalizedString;
  };
  reversed: {
    meaning: LocalizedString;
    love: LocalizedString;
    career: LocalizedString;
  };
}
