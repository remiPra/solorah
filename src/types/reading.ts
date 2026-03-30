export interface SavedReadingCard {
  id: number;
  slug: string;
  name: string;
  reversed?: boolean;
  position?: string;
}

export interface SavedReading {
  id: string;
  user_id: string;
  deck: string;
  spread_type: 'single' | 'three-cards' | 'cross' | 'yes-no' | 'love' | 'daily';
  cards: SavedReadingCard[];
  question?: string;
  lang: string;
  created_at: string;
}

export interface SaveReadingPayload {
  deck: string;
  spread_type: SavedReading['spread_type'];
  cards: SavedReadingCard[];
  question?: string;
  lang: string;
}
