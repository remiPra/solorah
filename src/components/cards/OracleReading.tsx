import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Card } from '../../types/card';
import IntroScreen from './IntroScreen';
import CardDeck from './CardDeck';
import CardFlip from './CardFlip';
import CardReveal from './CardReveal';

type Phase = 'intro' | 'select' | 'flipping' | 'reveal';

interface OracleReadingProps {
  lang: 'fr' | 'en';
  deck: Card[];
}

export default function OracleReading({ lang, deck }: OracleReadingProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const handleReady = useCallback(() => {
    setPhase('select');
  }, []);

  const handleSelect = useCallback((card: Card) => {
    setSelectedCard(card);
    setPhase('flipping');
  }, []);

  const handleFlipComplete = useCallback(() => {
    setPhase('reveal');
  }, []);

  const handleNewReading = useCallback(() => {
    setSelectedCard(null);
    setPhase('intro');
  }, []);

  // Shuffle deck for each new reading (Fisher-Yates)
  const [shuffledDeck] = useState(() => {
    const arr = [...deck];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

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
            <IntroScreen lang={lang} onReady={handleReady} />
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
            <CardDeck lang={lang} cards={shuffledDeck} onSelect={handleSelect} />
          </motion.div>
        )}

        {phase === 'flipping' && selectedCard && (
          <motion.div
            key="flipping"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[100vh] flex items-center justify-center -mt-16"
          >
            <CardFlip card={selectedCard} onFlipComplete={handleFlipComplete} />
          </motion.div>
        )}

        {phase === 'reveal' && selectedCard && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <CardReveal card={selectedCard} lang={lang} onNewReading={handleNewReading} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
