import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TarotCard, SelectedCrossCard, TarotPhase, CrossPosition } from '../../types/card';
import CrossSlotIndicator from './CrossSlotIndicator';
import CrossCardReveal from './CrossCardReveal';

interface CrossReadingProps {
  lang: string;
  deck: TarotCard[];
}

const crossPositions: CrossPosition[] = ['situation', 'obstacle', 'past', 'future', 'synthesis'];

const introLines: Record<string, string[]> = {
  fr: [
    'Concentre-toi sur ta question...',
    'Respire profondément...',
    'Cinq cartes vont se disposer en croix',
    'pour révéler ta situation sous tous ses angles.',
    'Quand tu es prêt(e), choisis cinq cartes.',
  ],
  en: [
    'Focus on your question...',
    'Breathe deeply...',
    'Five cards will form a cross',
    'to reveal your situation from every angle.',
    "When you're ready, choose five cards.",
  ],
  zh: [
    '专注于你的问题...',
    '深呼吸...',
    '五张牌将排成十字',
    '从各个角度揭示你的处境。',
    '当你准备好了，选择五张牌。',
  ],
  es: [
    'Concéntrate en tu pregunta...',
    'Respira profundamente...',
    'Cinco cartas formarán una cruz',
    'para revelar tu situación desde todos los ángulos.',
    'Cuando estés listo/a, elige cinco cartas.',
  ],
  de: [
    'Konzentriere dich auf deine Frage...',
    'Atme tief ein...',
    'Fünf Karten werden ein Kreuz bilden',
    'um deine Situation von allen Seiten zu enthüllen.',
    'Wenn du bereit bist, wähle fünf Karten.',
  ],
  hi: [
    'अपने सवाल पर ध्यान केंद्रित करो...',
    'गहरी साँस लो...',
    'पाँच पत्ते एक क्रॉस बनाएंगे',
    'हर कोण से तुम्हारी स्थिति को प्रकट करने के लिए।',
    'जब तुम तैयार हो, पाँच पत्ते चुनो।',
  ],
  ja: [
    '質問に集中して...',
    '深く息を吸って...',
    '5枚のカードが十字を形作り',
    'あらゆる角度からあなたの状況を明かします。',
    '準備ができたら、5枚のカードを選んで。',
  ],
};

const buttonText: Record<string, string> = {
  fr: 'Je suis prêt(e)',
  en: 'I am ready',
  zh: '我准备好了',
  es: 'Estoy listo/a',
  de: 'Ich bin bereit',
  hi: 'मैं तैयार हूँ',
  ja: '準備できました',
};

const scrollHint: Record<string, string> = {
  fr: '← Fais défiler et choisis →',
  en: '← Scroll and choose →',
  zh: '← 滑动并选择 →',
  es: '← Desliza y elige →',
  de: '← Scrolle und wähle →',
  hi: '← स्क्रॉल करें और चुनें →',
  ja: '← スクロールして選ぶ →',
};

export default function CrossReading({ lang, deck }: CrossReadingProps) {
  const [phase, setPhase] = useState<TarotPhase>('intro');
  const [selectedCards, setSelectedCards] = useState<SelectedCrossCard[]>([]);
  const [shuffledDeck, setShuffledDeck] = useState(() => shuffle(deck));

  const handleReady = useCallback(() => {
    setPhase('select');
  }, []);

  const handleAllSelected = useCallback((cards: SelectedCrossCard[]) => {
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
            <CrossIntroScreen lang={lang} onReady={handleReady} />
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
            <CrossCardDeck lang={lang} cards={shuffledDeck} onAllSelected={handleAllSelected} />
          </motion.div>
        )}

        {phase === 'reveal' && selectedCards.length === 5 && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <CrossCardReveal lang={lang} selectedCards={selectedCards} onNewReading={handleNewReading} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Intro Screen ───────────────────────────────────────────────────
function CrossIntroScreen({ lang, onReady }: { lang: string; onReady: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const texts = introLines[lang] || introLines.en;
    const timers: ReturnType<typeof setTimeout>[] = [];

    texts.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 1200 * (i + 1)));
    });

    timers.push(setTimeout(() => setShowButton(true), 1200 * (texts.length + 1)));

    return () => timers.forEach(clearTimeout);
  }, [lang]);

  return (
    <div className="min-h-[100vh] flex items-center justify-center relative overflow-hidden -mt-16 px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(var(--glow-r),var(--glow-g),var(--glow-b),0.08) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="space-y-6 mb-16">
          {(introLines[lang] || introLines.en).map((line, i) => (
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
              style={{ backgroundColor: 'var(--color-sol-gold)', color: 'var(--color-sol-deep)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-sol-gold-light)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-sol-gold)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {buttonText[lang] || buttonText.en}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Card Deck (selection phase) ────────────────────────────────────
function CrossCardDeck({ lang, cards, onAllSelected }: { lang: string; cards: TarotCard[]; onAllSelected: (selected: SelectedCrossCard[]) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(Math.floor(cards.length / 2));
  const [selectedCards, setSelectedCards] = useState<SelectedCrossCard[]>([]);
  const [removedIds, setRemovedIds] = useState<Set<number>>(new Set());
  const currentSlot = selectedCards.length;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const centerCard = el.children[Math.floor(cards.length / 2)] as HTMLElement;
    if (centerCard) {
      const scrollLeft = centerCard.offsetLeft - el.clientWidth / 2 + centerCard.clientWidth / 2;
      el.scrollTo({ left: scrollLeft, behavior: 'instant' });
    }
  }, [cards.length]);

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
    if (currentSlot >= 5 || removedIds.has(card.id)) return;

    const reversed = Math.random() < 0.5;
    const position = crossPositions[currentSlot];

    const selected: SelectedCrossCard = { card, reversed, position };
    const newSelected = [...selectedCards, selected];

    setSelectedCards(newSelected);
    setRemovedIds((prev) => new Set([...prev, card.id]));

    if (newSelected.length === 5) {
      setTimeout(() => onAllSelected(newSelected), 800);
    }
  }, [currentSlot, removedIds, selectedCards, onAllSelected]);

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center relative -mt-16 pt-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.08) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 mb-10">
        <CrossSlotIndicator lang={lang} selectedCards={selectedCards} currentSlot={currentSlot} />
      </div>

      <div
        ref={scrollRef}
        className="deck-scroll w-full"
        style={{ padding: '40px 20px' }}
        role="listbox"
        aria-label={
          { fr: 'Sélectionne une carte', en: 'Select a card', zh: '选择一张牌', es: 'Selecciona una carta', de: 'Wähle eine Karte', hi: 'एक कार्ड चुनें', ja: 'カードを選ぶ' }[lang] || 'Select a card'
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
                      { fr: 'Carte — cliquez pour la sélectionner', en: 'Card — click to select', zh: '牌 — 点击选择', es: 'Carta — haz clic para seleccionar', de: 'Karte — klicken zum Auswählen', hi: 'कार्ड — चुनने के लिए क्लिक करें', ja: 'カード — クリックして選択' }[lang] || 'Card — click to select'
                    }
                    aria-selected={false}
                    disabled={currentSlot >= 5}
                  >
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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
