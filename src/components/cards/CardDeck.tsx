import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Card } from '../../types/card';

interface CardDeckProps {
  lang: string;
  cards: Card[];
  onSelect: (card: Card) => void;
}

const scrollHint: Record<string, string> = {
  fr: '← Fais défiler →',
  en: '← Scroll through →',
  zh: '← 滑动浏览 →',
  es: '← Desliza →',
  de: '← Durchblättern →',
  hi: '← स्क्रॉल करें →',
  ja: '← スクロール →',
};

export default function CardDeck({ lang, cards, onSelect }: CardDeckProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(Math.floor(cards.length / 2));

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

  // Track which card is closest to center
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

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center relative -mt-16">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.08) 0%, transparent 70%)' }}
        />
      </div>

      {/* Title */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-[Cormorant_Garamond] text-lg sm:text-xl italic mb-8 text-center px-4"
        style={{ color: 'var(--color-sol-ash)' }}
      >
        {{ fr: 'Laisse ton intuition te guider... Choisis ta carte.', en: 'Let your intuition guide you... Choose your card.', zh: '让你的直觉引导你...选择你的牌。', es: 'Deja que tu intuición te guíe... Elige tu carta.', de: 'Lass deine Intuition dich leiten... Wähle deine Karte.', hi: 'अपनी अंतर्ज्ञान को मार्गदर्शन करने दो... अपना पत्ता चुनो।', ja: '直感に導かれるまま...カードを選んで。' }[lang] || 'Let your intuition guide you... Choose your card.'}
      </motion.p>

      {/* Deck scroll container */}
      <div
        ref={scrollRef}
        className="deck-scroll w-full"
        style={{ padding: '40px 20px' }}
        role="listbox"
        aria-label={
          { fr: 'Sélectionne une carte', en: 'Select a card', zh: '选择一张牌', es: 'Selecciona una carta', de: 'Wähle eine Karte', hi: 'एक पत्ता चुनें', ja: 'カードを選んで' }[lang] || 'Select a card'
        }
      >
        {cards.map((card, i) => {
          const isCenter = i === centerIndex;

          return (
            <motion.div
              key={card.id}
              className="card-slot"
              style={{
                marginLeft: i === 0 ? 'calc(50% - 70px)' : '-25px',
                marginRight: i === cards.length - 1 ? 'calc(50% - 70px)' : undefined,
                zIndex: isCenter ? 20 : 10 - Math.abs(i - centerIndex),
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <motion.button
                onClick={() => onSelect(card)}
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
                  { fr: `Carte numéro ${card.id} — cliquez pour la retourner`, en: `Card number ${card.id} — click to flip`, zh: `第${card.id}张牌 — 点击翻转`, es: `Carta número ${card.id} — haz clic para voltear`, de: `Karte ${card.id} — klicken zum Umdrehen`, hi: `पत्ता ${card.id} — पलटने के लिए क्लिक करें`, ja: `カード${card.id} — クリックで裏返す` }[lang] || `Card number ${card.id} — click to flip`
                }
                aria-selected={false}
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

                {/* Breathing animation glow for center card */}
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
