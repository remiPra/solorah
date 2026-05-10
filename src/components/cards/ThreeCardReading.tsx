import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Card, SelectedOracleCard } from '../../types/card';

type Phase = 'intro' | 'select' | 'reveal';

interface ThreeCardReadingProps {
  lang: string;
  deck: Card[];
}

const positions = ['past', 'present', 'future'] as const;

const positionLabels: Record<string, { past: string; present: string; future: string }> = {
  fr: { past: 'Passé', present: 'Présent', future: 'Futur' },
  en: { past: 'Past', present: 'Present', future: 'Future' },
  zh: { past: '过去', present: '现在', future: '未来' },
  es: { past: 'Pasado', present: 'Presente', future: 'Futuro' },
  de: { past: 'Vergangenheit', present: 'Gegenwart', future: 'Zukunft' },
  hi: { past: 'भूतकाल', present: 'वर्तमान', future: 'भविष्य' },
  ja: { past: '過去', present: '現在', future: '未来' },
};

const introLines: Record<string, string[]> = {
  fr: [
    'Trois cartes vont se révéler...',
    'Passé, présent, futur.',
    'Laisse ton intuition choisir.',
  ],
  en: [
    'Three cards will reveal themselves...',
    'Past, present, future.',
    'Let your intuition choose.',
  ],
  zh: [
    '三张牌即将揭示...',
    '过去、现在、未来。',
    '让你的直觉来选择。',
  ],
  es: [
    'Tres cartas se revelarán...',
    'Pasado, presente, futuro.',
    'Deja que tu intuición elija.',
  ],
  de: [
    'Drei Karten werden sich offenbaren...',
    'Vergangenheit, Gegenwart, Zukunft.',
    'Lass deine Intuition wählen.',
  ],
  hi: [
    'तीन पत्ते प्रकट होंगे...',
    'भूतकाल, वर्तमान, भविष्य।',
    'अपनी अंतर्ज्ञान को चुनने दो।',
  ],
  ja: [
    '3枚のカードが明かされる...',
    '過去、現在、未来。',
    '直感に選ばせて。',
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

const promptLabels: Record<string, string[]> = {
  fr: ['Choisis ta carte Passé', 'Choisis ta carte Présent', 'Choisis ta carte Futur'],
  en: ['Choose your Past card', 'Choose your Present card', 'Choose your Future card'],
  zh: ['选择你的过去牌', '选择你的现在牌', '选择你的未来牌'],
  es: ['Elige tu carta del Pasado', 'Elige tu carta del Presente', 'Elige tu carta del Futuro'],
  de: ['Wähle deine Vergangenheitskarte', 'Wähle deine Gegenwartskarte', 'Wähle deine Zukunftskarte'],
  hi: ['अपना भूतकाल का कार्ड चुनें', 'अपना वर्तमान का कार्ड चुनें', 'अपना भविष्य का कार्ड चुनें'],
  ja: ['過去のカードを選ぶ', '現在のカードを選ぶ', '未来のカードを選ぶ'],
};

const revealTexts: Record<string, { title: string; newReading: string; otherReadings: string; share: string }> = {
  fr: { title: 'Ton tirage', newReading: 'Nouveau tirage', otherReadings: 'Autres tirages', share: 'Partager' },
  en: { title: 'Your reading', newReading: 'New reading', otherReadings: 'Other readings', share: 'Share' },
  zh: { title: '你的占卜', newReading: '重新占卜', otherReadings: '其他占卜', share: '分享' },
  es: { title: 'Tu lectura', newReading: 'Nueva lectura', otherReadings: 'Otras lecturas', share: 'Compartir' },
  de: { title: 'Deine Lesung', newReading: 'Neue Ziehung', otherReadings: 'Andere Ziehungen', share: 'Teilen' },
  hi: { title: 'आपका पाठ', newReading: 'नया पाठ', otherReadings: 'अन्य ताश', share: 'साझा करें' },
  ja: { title: 'あなたのリーディング', newReading: '新しいリーディング', otherReadings: '他の占い', share: 'シェア' },
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

const readingPaths: Record<string, string> = {
  fr: '/fr/tirage', en: '/en/reading', zh: '/zh/zhan-bu', es: '/es/lectura', de: '/de/ziehung', hi: '/hi/taash', ja: '/ja/uranai',
};

export default function ThreeCardReading({ lang, deck }: ThreeCardReadingProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedCards, setSelectedCards] = useState<SelectedOracleCard[]>([]);
  const [shuffledDeck, setShuffledDeck] = useState(() => shuffle(deck));

  const handleReady = useCallback(() => {
    setPhase('select');
  }, []);

  const handleAllSelected = useCallback((cards: SelectedOracleCard[]) => {
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
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <ThreeCardIntro lang={lang} onReady={handleReady} />
          </motion.div>
        )}
        {phase === 'select' && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <ThreeCardDeck lang={lang} cards={shuffledDeck} onAllSelected={handleAllSelected} />
          </motion.div>
        )}
        {phase === 'reveal' && selectedCards.length === 3 && (
          <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <ThreeCardReveal lang={lang} selectedCards={selectedCards} onNewReading={handleNewReading} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Intro Screen ───────────────────────────────────────
function ThreeCardIntro({ lang, onReady }: { lang: string; onReady: () => void }) {
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
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.12) 0%, transparent 70%)' }}
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
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold-light)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {buttonText[lang] || buttonText.en}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Slot Indicator ─────────────────────────────────────
function OracleSlotIndicator({ lang, selectedCards, currentSlot }: { lang: string; selectedCards: SelectedOracleCard[]; currentSlot: number }) {
  const labels = positionLabels[lang] || positionLabels.en;

  return (
    <div className="text-center mb-6">
      {currentSlot < 3 && (
        <motion.p key={currentSlot} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="font-[Cormorant_Garamond] text-lg sm:text-xl italic mb-6" style={{ color: 'var(--color-sol-cream)' }}
        >
          {(promptLabels[lang] || promptLabels.en)[currentSlot]}
        </motion.p>
      )}
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        {[0, 1, 2].map((slotIndex) => {
          const isFilled = slotIndex < selectedCards.length;
          const isActive = slotIndex === currentSlot;
          return (
            <motion.div
              key={slotIndex}
              animate={{
                borderColor: isActive
                  ? 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.6)'
                  : isFilled
                    ? 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)'
                    : 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.15)',
                boxShadow: isActive ? '0 0 20px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.15)' : 'none',
              }}
              transition={{ duration: 0.4 }}
              className="relative w-16 h-24 sm:w-20 sm:h-30 rounded-lg border-2 flex flex-col items-center justify-center"
              style={{ backgroundColor: isFilled ? 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.08)' : 'transparent' }}
            >
              {isFilled ? (
                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="card-back-design rounded w-12 h-18 sm:w-16 sm:h-24"
                />
              ) : (
                <span className="font-[Cinzel_Decorative] text-xl sm:text-2xl" style={{ color: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)' }}>?</span>
              )}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-[Inter] text-[10px] sm:text-xs tracking-wider uppercase whitespace-nowrap"
                style={{ color: isFilled ? 'var(--color-sol-gold)' : 'var(--color-sol-ash)', opacity: isFilled ? 1 : 0.6 }}
              >
                {[labels.past, labels.present, labels.future][slotIndex]}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Card Deck ──────────────────────────────────────────
function ThreeCardDeck({ lang, cards, onAllSelected }: { lang: string; cards: Card[]; onAllSelected: (selected: SelectedOracleCard[]) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(Math.floor(cards.length / 2));
  const [selectedCards, setSelectedCards] = useState<SelectedOracleCard[]>([]);
  const [removedIds, setRemovedIds] = useState<Set<number>>(new Set());
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const currentSlot = selectedCards.length;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const centerCard = el.children[Math.floor(cards.length / 2)] as HTMLElement;
    if (centerCard) {
      const scrollLeft = centerCard.offsetLeft - el.clientWidth / 2 + centerCard.clientWidth / 2;
      el.scrollTo({ left: scrollLeft, behavior: 'instant' as ScrollBehavior });
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
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setCenterIndex(closest);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelect = useCallback((card: Card, e: React.MouseEvent) => {
    if (currentSlot >= 3 || removedIds.has(card.id)) return;
    const position = positions[currentSlot];
    const selected: SelectedOracleCard = { card, position };
    const newSelected = [...selectedCards, selected];

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({ id: Date.now() + i, x: cx, y: cy }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id))), 1200);

    setSelectedCards(newSelected);
    setRemovedIds((prev) => new Set([...prev, card.id]));
    if (newSelected.length === 3) {
      setTimeout(() => onAllSelected(newSelected), 800);
    }
  }, [currentSlot, removedIds, selectedCards, onAllSelected]);

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center relative -mt-16 pt-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.08) 0%, transparent 70%)' }}
        />
      </div>
      <div className="relative z-10 mb-10">
        <OracleSlotIndicator lang={lang} selectedCards={selectedCards} currentSlot={currentSlot} />
      </div>
      <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
        {particles.map((p) =>
          Array.from({ length: 8 }).map((_, i) => (
            <motion.div key={`${p.id}-${i}`}
              initial={{ opacity: 0.9, scale: 0, x: p.x, y: p.y }}
              animate={{ opacity: 0, scale: 1, x: p.x + Math.cos((i * Math.PI * 2) / 8) * 80, y: p.y + Math.sin((i * Math.PI * 2) / 8) * 80 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute rounded-full"
              style={{ width: '4px', height: '4px', backgroundColor: 'var(--color-sol-gold)', marginTop: '-2px', marginLeft: '-2px' }}
            />
          ))
        )}
      </div>
      <div ref={scrollRef} className="deck-scroll w-full" style={{ padding: '40px 20px' }} role="listbox">
        {cards.map((card, i) => {
          const isRemoved = removedIds.has(card.id);
          const isCenter = i === centerIndex;
          return (
            <AnimatePresence key={card.id}>
              {!isRemoved && (
                <motion.div className="card-slot"
                  style={{ marginLeft: i === 0 ? 'calc(50% - 70px)' : '-25px', marginRight: i === cards.length - 1 ? 'calc(50% - 70px)' : undefined, zIndex: isCenter ? 20 : 10 - Math.abs(i - centerIndex) }}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -80, transition: { duration: 0.5, ease: 'easeInOut' } }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                >
                  <motion.button onClick={(e) => handleSelect(card, e)}
                    animate={{ scale: isCenter ? 1.08 : 1, y: isCenter ? -8 : 0 }}
                    whileHover={{ y: -12, scale: 1.06 }} whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="card-back-design cursor-pointer relative"
                    style={{ width: 'clamp(130px, 20vw, 200px)', height: 'clamp(195px, 30vw, 300px)',
                      boxShadow: isCenter ? '0 0 25px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.25), 0 15px 30px rgba(0,0,0,var(--shadow-alpha))' : '0 5px 15px rgba(0,0,0,var(--shadow-alpha))',
                    }}
                    disabled={currentSlot >= 3}
                  >
                    <div className="absolute inset-3 rounded border flex items-center justify-center" style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2)' }}>
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute w-12 h-12 border rotate-45" style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.12)' }} />
                        <div className="absolute w-20 h-20 border rotate-45" style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.06)' }} />
                      </div>
                    </div>
                    {isCenter && (
                      <motion.div className="absolute inset-0 rounded-lg pointer-events-none"
                        animate={{ boxShadow: ['0 0 15px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.1)', '0 0 25px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2)', '0 0 15px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.1)'] }}
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
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1 }}
        className="font-[Inter] text-xs tracking-widest uppercase mt-4" style={{ color: 'var(--color-sol-ash)' }}
      >
        {scrollHint[lang] || scrollHint.en}
      </motion.p>
    </div>
  );
}

// ─── Reveal ─────────────────────────────────────────────
function ThreeCardReveal({ lang, selectedCards, onNewReading }: { lang: string; selectedCards: SelectedOracleCard[]; onNewReading: () => void }) {
  const t = revealTexts[lang] || revealTexts.en;
  const labels = positionLabels[lang] || positionLabels.en;
  const [revealStep, setRevealStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setRevealStep(1), 500));
    timers.push(setTimeout(() => setRevealStep(2), 2500));
    timers.push(setTimeout(() => setRevealStep(3), 4500));
    timers.push(setTimeout(() => setRevealStep(4), 6500));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-[100vh] px-4 py-16 -mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-center gap-3 sm:gap-6 lg:gap-10 pt-20 mb-12">
          {selectedCards.map((selected, index) => (
            <OracleCardFlip key={selected.card.id} selected={selected} lang={lang} isRevealed={revealStep > index} />
          ))}
        </div>
        {revealStep >= 4 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="flex-1 max-w-32 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))' }} />
              <span style={{ color: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)' }}>✦</span>
              <div className="flex-1 max-w-32 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))' }} />
            </div>
            <h2 className="font-[Cinzel_Decorative] text-xl sm:text-2xl text-center mb-10" style={{ color: 'var(--color-sol-gold)' }}>{t.title}</h2>
            <div className="space-y-8 mb-12">
              {selectedCards.map((selected, i) => {
                const message = selected.card.message[lang] || selected.card.message.en;
                const interpretation = selected.card.interpretation ? (selected.card.interpretation[lang] || selected.card.interpretation.en) : undefined;
                return (
                  <motion.div key={selected.card.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.3, duration: 0.6 }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span style={{ color: 'var(--color-sol-gold)' }}>✦</span>
                      <span className="font-[Cinzel_Decorative] text-base sm:text-lg" style={{ color: 'var(--color-sol-gold)' }}>{labels[selected.position]}</span>
                      <span className="font-[Inter] text-sm" style={{ color: 'var(--color-sol-ash)' }}>&mdash;</span>
                      <span className="font-[Cormorant_Garamond] text-lg sm:text-xl" style={{ color: 'var(--color-sol-cream)' }}>{selected.card.name[lang] || selected.card.name.en}</span>
                    </div>
                    <p className="font-[Cormorant_Garamond] text-lg sm:text-xl italic leading-relaxed pl-6" style={{ color: 'var(--color-sol-cream)' }}>
                      &ldquo;{message}&rdquo;
                    </p>
                    {interpretation && (
                      <p className="font-[Cormorant_Garamond] text-base sm:text-lg leading-relaxed pl-6 mt-2" style={{ color: 'var(--color-sol-cream)', opacity: 0.8 }}>{interpretation}</p>
                    )}
                  </motion.div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="flex-1 max-w-32 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))' }} />
              <span style={{ color: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)' }}>✦</span>
              <div className="flex-1 max-w-32 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))' }} />
            </div>
            <div className="space-y-4 mb-8 max-w-sm mx-auto">
              <button onClick={onNewReading}
                className="block w-full font-[Inter] tracking-wider uppercase text-sm font-semibold px-6 py-4 rounded-sm transition-all duration-300"
                style={{ backgroundColor: 'var(--color-sol-gold)', color: 'var(--color-sol-deep)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold-light)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold)'; e.currentTarget.style.boxShadow = 'none'; }}
              >↻ {t.newReading}</button>
              <a href={readingPaths[lang] || readingPaths.en}
                className="block w-full text-center font-[Inter] tracking-wider uppercase text-sm px-6 py-4 rounded-sm transition-all duration-300"
                style={{ border: '1px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.5)', color: 'var(--color-sol-gold)', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >{t.otherReadings}</a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Card Flip ──────────────────────────────────────────
function OracleCardFlip({ selected, lang, isRevealed }: { selected: SelectedOracleCard; lang: string; isRevealed: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    if (!isRevealed) return;
    window.dispatchEvent(new CustomEvent('solorah:audio-duck'));
    const flipTimer = setTimeout(() => setIsFlipped(true), 100);
    const flashTimer = setTimeout(() => setShowFlash(true), 600);
    const flashEnd = setTimeout(() => setShowFlash(false), 900);
    const unduck = setTimeout(() => window.dispatchEvent(new CustomEvent('solorah:audio-unduck')), 1200);
    return () => { clearTimeout(flipTimer); clearTimeout(flashTimer); clearTimeout(flashEnd); clearTimeout(unduck); };
  }, [isRevealed]);

  const labels = positionLabels[lang] || positionLabels.en;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
        {showFlash && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.3, 1.5] }}
            transition={{ duration: 0.4, ease: 'easeOut' }} className="absolute rounded-full pointer-events-none z-20"
            style={{ width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4) 0%, transparent 70%)' }}
          />
        )}
        <motion.div animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 1, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d', width: 'clamp(100px, 25vw, 180px)', height: 'clamp(150px, 37.5vw, 270px)' }} className="relative"
        >
          <div className="absolute inset-0 card-back-design rounded-lg" style={{ backfaceVisibility: 'hidden' }}>
            <div className="absolute inset-2 sm:inset-3 rounded border flex items-center justify-center" style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2)' }}>
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute w-8 h-8 sm:w-12 sm:h-12 border rotate-45" style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.12)' }} />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-lg overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <img src={selected.card.image} alt={selected.card.name[lang] || selected.card.name.en} className="w-full h-full object-cover rounded-lg" loading="eager" />
            <div className="absolute inset-0 rounded-lg pointer-events-none" style={{ border: '2px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)' }} />
          </div>
        </motion.div>
        {isFlipped && (
          <motion.div className="absolute inset-0 rounded-lg pointer-events-none"
            animate={{ boxShadow: ['0 0 20px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.15)', '0 0 35px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.25)', '0 0 20px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.15)'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        {isFlipped && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div key={i} initial={{ opacity: 0.8, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1, x: Math.cos((i * Math.PI * 2) / 10) * 60, y: Math.sin((i * Math.PI * 2) / 10) * 60 }}
                transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 rounded-full"
                style={{ width: '3px', height: '3px', backgroundColor: 'var(--color-sol-gold)', marginTop: '-1.5px', marginLeft: '-1.5px' }}
              />
            ))}
          </div>
        )}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: isFlipped ? 1 : 0.4 }} transition={{ duration: 0.5, delay: isFlipped ? 0.8 : 0 }} className="mt-3 text-center">
        <span className="font-[Cinzel_Decorative] text-xs sm:text-sm tracking-wider" style={{ color: 'var(--color-sol-gold)' }}>{labels[selected.position]}</span>
      </motion.div>
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
