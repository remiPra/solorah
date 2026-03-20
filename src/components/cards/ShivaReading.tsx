import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Card } from '../../types/card';
import CardDeck from './CardDeck';
import CardFlip from './CardFlip';
import CardReveal from './CardReveal';

type Phase = 'intro' | 'select' | 'flipping' | 'reveal';

interface ShivaReadingProps {
  lang: 'fr' | 'en';
  deck: Card[];
}

// Shiva-specific intro text
const lines = {
  fr: [
    'Concentre-toi sur ta décision...',
    'Respire profondément...',
    'Shiva te guide vers la clarté...',
    'Quand tu te sens prêt(e), fais défiler les cartes et choisis celle qui t\'appelle.',
  ],
  en: [
    'Focus on your decision...',
    'Breathe deeply...',
    'Shiva guides you toward clarity...',
    'When you feel ready, scroll through the cards and choose the one that calls to you.',
  ],
};

const buttonText = {
  fr: 'Je suis prêt(e)',
  en: 'I am ready',
};

function ShivaIntroScreen({ lang, onReady }: { lang: 'fr' | 'en'; onReady: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const texts = lines[lang];
    const timers: ReturnType<typeof setTimeout>[] = [];

    texts.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
        }, 1200 * (i + 1))
      );
    });

    timers.push(
      setTimeout(() => {
        setShowButton(true);
      }, 1200 * (texts.length + 1))
    );

    return () => timers.forEach(clearTimeout);
  }, [lang]);

  return (
    <div className="min-h-[100vh] flex items-center justify-center relative overflow-hidden -mt-16 px-4">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.08) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="space-y-6 mb-16">
          {lines[lang].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={i < visibleLines ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="font-[Cormorant_Garamond] text-xl sm:text-2xl md:text-3xl italic leading-relaxed"
              style={{ color: 'var(--color-sol-cream)', opacity: i < visibleLines ? undefined : 0 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              onClick={onReady}
              className="inline-flex items-center justify-center font-[Inter] tracking-wider uppercase text-sm font-semibold px-8 py-4 rounded-sm transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-sol-gold)',
                color: 'var(--color-sol-deep)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-sol-gold-light)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-sol-gold)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {buttonText[lang]}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ShivaReading({ lang, deck }: ShivaReadingProps) {
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
    setShuffledDeck(shuffle(deck));
    setPhase('intro');
  }, [deck]);

  const [shuffledDeck, setShuffledDeck] = useState(() => shuffle(deck));

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
            <ShivaIntroScreen lang={lang} onReady={handleReady} />
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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
