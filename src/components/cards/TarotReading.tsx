import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TarotCard, SelectedTarotCard, TarotPhase } from '../../types/card';
import TarotIntroScreen from './TarotIntroScreen';
import TarotCardDeck from './TarotCardDeck';
import TarotCardReveal from './TarotCardReveal';

interface TarotReadingProps {
  lang: 'fr' | 'en';
  deck: TarotCard[];
}

export default function TarotReading({ lang, deck }: TarotReadingProps) {
  const [phase, setPhase] = useState<TarotPhase>('intro');
  const [selectedCards, setSelectedCards] = useState<SelectedTarotCard[]>([]);
  const [shuffledDeck, setShuffledDeck] = useState(() => shuffle(deck));

  const handleReady = useCallback(() => {
    setPhase('select');
  }, []);

  const handleAllSelected = useCallback((cards: SelectedTarotCard[]) => {
    setSelectedCards(cards);
    setPhase('reveal');
  }, []);

  const handleNewReading = useCallback(() => {
    setSelectedCards([]);
    setShuffledDeck(shuffle(deck));
    setPhase('intro');
  }, [deck]);

  return (
    <div className="relative" style={{ minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TarotIntroScreen lang={lang} onReady={handleReady} />
          </motion.div>
        )}

        {phase === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TarotCardDeck lang={lang} cards={shuffledDeck} onAllSelected={handleAllSelected} />
          </motion.div>
        )}

        {phase === 'reveal' && selectedCards.length === 3 && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <TarotCardReveal lang={lang} selectedCards={selectedCards} onNewReading={handleNewReading} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
