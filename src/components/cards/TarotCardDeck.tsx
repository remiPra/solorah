import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TarotCard, SelectedTarotCard } from '../../types/card';
import SlotIndicator from './SlotIndicator';

interface TarotCardDeckProps {
  lang: string;
  cards: TarotCard[];
  onAllSelected: (selected: SelectedTarotCard[]) => void;
}

const positions = ['past', 'present', 'future'] as const;

const scrollHint: Record<string, string> = {
  fr: '← Fais défiler et choisis →',
  en: '← Scroll and choose →',
  zh: '← 滑动并选择 →',
  es: '← Desliza y elige →',
};

export default function TarotCardDeck({ lang, cards, onAllSelected }: TarotCardDeckProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(Math.floor(cards.length / 2));
  const [selectedCards, setSelectedCards] = useState<SelectedTarotCard[]>([]);
  const [removedIds, setRemovedIds] = useState<Set<number>>(new Set());
  const currentSlot = selectedCards.length;

  // Scroll to center on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const centerCard = el.children[Math.floor(cards.length / 2)] as HTMLElement;
    if (centerCard) {
      const scrollLeft = centerCard.offsetLeft - el.clientWidth / 2 + centerCard.clientWidth / 2;
      el.scrollTo({ left: scrollLeft, behavior: 'instant' });
    }
  }, [cards.length]);

  // Track center card
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const containerCenter = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;

      Array.from(el.children).forEach((child, i) => {
        const cardEl = child as HTMLElement;
        const cardCenter = cardEl.offsetLeft + cardEl.clientWidth / 2;
        const dist = Math.abs(containerCenter - cardCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      setCenterIndex(closest);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelect = useCallback((card: TarotCard) => {
    if (currentSlot >= 3 || removedIds.has(card.id)) return;

    const reversed = Math.random() < 0.5;
    const position = positions[currentSlot];

    const selected: SelectedTarotCard = { card, reversed, position };
    const newSelected = [...selectedCards, selected];

    setSelectedCards(newSelected);
    setRemovedIds((prev) => new Set([...prev, card.id]));

    if (newSelected.length === 3) {
      // Small delay to let the animation play, then transition
      setTimeout(() => {
        onAllSelected(newSelected);
      }, 800);
    }
  }, [currentSlot, removedIds, selectedCards, onAllSelected]);

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center relative -mt-16 pt-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.08) 0%, transparent 70%)' }}
        />
      </div>

      {/* Slot indicator — past / present / future */}
      <div className="relative z-10 mb-10">
        <SlotIndicator
          lang={lang}
          selectedCards={selectedCards}
          currentSlot={currentSlot}
        />
      </div>

      {/* Deck scroll container */}
      <div
        ref={scrollRef}
        className="deck-scroll w-full"
        style={{ padding: '40px 20px' }}
        role="listbox"
        aria-label={
          { fr: 'Sélectionne une carte', en: 'Select a card', zh: '选择一张牌', es: 'Selecciona una carta' }[lang] || 'Select a card'
        }
      >
        {cards.map((card, i) => {
          const isRemoved = removedIds.has(card.id);
          const isCenter = i === centerIndex;

          return (
            <AnimatePresence key={card.id}>
              {!isRemoved && (
                <motion.div
                  className="card-slot"
                  style={{
                    marginLeft: i === 0 ? 'calc(50% - 70px)' : '-25px',
                    marginRight: i === cards.length - 1 ? 'calc(50% - 70px)' : undefined,
                    zIndex: isCenter ? 20 : 10 - Math.abs(i - centerIndex),
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    y: -80,
                    transition: { duration: 0.5, ease: 'easeInOut' },
                  }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                >
                  <motion.button
                    onClick={() => handleSelect(card)}
                    animate={{
                      scale: isCenter ? 1.08 : 1,
                      y: isCenter ? -8 : 0,
                    }}
                    whileHover={{ y: -12, scale: 1.06 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="card-back-design cursor-pointer relative"
                    style={{
                      width: 'clamp(130px, 20vw, 200px)',
                      height: 'clamp(195px, 30vw, 300px)',
                      boxShadow: isCenter
                        ? `0 0 25px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.25), 0 15px 30px rgba(0,0,0,var(--shadow-alpha))`
                        : `0 5px 15px rgba(0,0,0,var(--shadow-alpha))`,
                      transition: 'box-shadow 0.3s ease',
                    }}
                    role="option"
                    aria-label={
                      { fr: 'Carte — cliquez pour la sélectionner', en: 'Card — click to select', zh: '牌 — 点击选择', es: 'Carta — haz clic para seleccionar' }[lang] || 'Card — click to select'
                    }
                    aria-selected={false}
                    disabled={currentSlot >= 3}
                  >
                    {/* Inner border pattern */}
                    <div
                      className="absolute inset-3 rounded border flex items-center justify-center"
                      style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2)' }}
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div
                          className="absolute w-12 h-12 border rotate-45"
                          style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.12)' }}
                        />
                        <div
                          className="absolute w-20 h-20 border rotate-45"
                          style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.06)' }}
                        />
                      </div>
                    </div>

                    {/* Breathing glow for center card */}
                    {isCenter && (
                      <motion.div
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        animate={{
                          boxShadow: [
                            `0 0 15px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.1)`,
                            `0 0 25px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2)`,
                            `0 0 15px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.1)`,
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Scroll hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="font-[Inter] text-xs tracking-widest uppercase mt-4"
        style={{ color: 'var(--color-sol-ash)' }}
      >
        {scrollHint[lang] || scrollHint.en}
      </motion.p>
    </div>
  );
}
