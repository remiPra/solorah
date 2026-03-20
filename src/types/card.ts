export type DeckType = 'oracle-amour' | 'tarot-marseille';

export interface Card {
  id: string;
  name: string;
  nameEn: string;
  image: string;
  deck: DeckType;
  number: number;
  keywords: string[];
  keywordsEn: string[];
}

export interface CardInterpretation {
  cardId: string;
  upright: string;
  reversed?: string;
  love?: string;
  career?: string;
  advice?: string;
}

export interface Reading {
  id: string;
  deck: DeckType;
  cards: DrawnCard[];
  date: string;
  question?: string;
}

export interface DrawnCard {
  card: Card;
  position: number;
  reversed: boolean;
}

export interface Deck {
  id: DeckType;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  cardCount: number;
  image: string;
}
