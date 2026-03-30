import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TarotCard } from '../../types/card';

type Phase = 'intro' | 'flipping' | 'reveal';

interface DailyReadingProps {
  lang: string;
  deck: TarotCard[];
}

const introLines: Record<string, string[]> = {
  fr: [
    'Chaque jour porte son message...',
    'Les arcanes du Tarot de Marseille te guident.',
    'Découvre la carte qui éclaire ta journée.',
  ],
  en: [
    'Each day carries its message...',
    'The Tarot de Marseille arcana guide you.',
    'Discover the card that illuminates your day.',
  ],
  zh: [
    '每一天都有它的信息...',
    '马赛塔罗的奥秘引导着你。',
    '发现照亮你一天的牌。',
  ],
  es: [
    'Cada día lleva su mensaje...',
    'Los arcanos del Tarot de Marsella te guían.',
    'Descubre la carta que ilumina tu jornada.',
  ],
  de: [
    'Jeder Tag trägt seine Botschaft...',
    'Die Arkana des Tarot de Marseille leiten dich.',
    'Entdecke die Karte, die deinen Tag erleuchtet.',
  ],
  hi: [
    'हर दिन अपना संदेश लाता है...',
    'मार्सिले टैरो के रहस्य तुम्हें मार्गदर्शन करते हैं।',
    'वह पत्ता खोजो जो तुम्हारे दिन को रोशन करे।',
  ],
  ja: [
    '毎日がメッセージを運んでいる...',
    'マルセイユタロットのアルカナがあなたを導く。',
    '今日を照らすカードを見つけよう。',
  ],
};

const buttonText: Record<string, string> = {
  fr: 'Révéler ma carte',
  en: 'Reveal my card',
  zh: '揭示我的牌',
  es: 'Revelar mi carta',
  de: 'Meine Karte enthüllen',
  hi: 'मेरा पत्ता प्रकट करें',
  ja: 'カードを明かす',
};

const revealTexts: Record<string, { cardOfDay: string; upright: string; reversed: string; comeback: string; cta: string; newReading: string; share: string }> = {
  fr: { cardOfDay: 'Ta carte du jour', upright: 'À l\'endroit', reversed: 'Renversée', comeback: 'Reviens demain pour ton prochain message ☀', cta: 'Consultation personnalisée', newReading: 'Autres tirages', share: 'Partager' },
  en: { cardOfDay: 'Your card of the day', upright: 'Upright', reversed: 'Reversed', comeback: 'Come back tomorrow for your next message ☀', cta: 'Personal consultation', newReading: 'Other readings', share: 'Share' },
  zh: { cardOfDay: '你的每日牌卡', upright: '正位', reversed: '逆位', comeback: '明天再来看你的下一个信息 ☀', cta: '个性化咨询', newReading: '其他占卜', share: '分享' },
  es: { cardOfDay: 'Tu carta del día', upright: 'Al derecho', reversed: 'Invertida', comeback: 'Vuelve mañana para tu próximo mensaje ☀', cta: 'Consulta personalizada', newReading: 'Otras lecturas', share: 'Compartir' },
  de: { cardOfDay: 'Deine Tageskarte', upright: 'Aufrecht', reversed: 'Umgekehrt', comeback: 'Komm morgen für deine nächste Botschaft zurück ☀', cta: 'Persönliche Beratung', newReading: 'Andere Ziehungen', share: 'Teilen' },
  hi: { cardOfDay: 'आपका आज का कार्ड', upright: 'सीधा', reversed: 'उलटा', comeback: 'अगले संदेश के लिए कल वापस आएं ☀', cta: 'व्यक्तिगत परामर्श', newReading: 'अन्य ताश', share: 'साझा करें' },
  ja: { cardOfDay: '今日のカード', upright: '正位置', reversed: '逆位置', comeback: '次のメッセージは明日のお楽しみ ☀', cta: 'パーソナル相談', newReading: '他の占い', share: 'シェア' },
};

const consultationPaths: Record<string, string> = {
  fr: '/fr/consultation', en: '/en/consultation', zh: '/zh/zi-xun', es: '/es/consulta', de: '/de/beratung', hi: '/hi/paramarsh', ja: '/ja/soudan',
};

const readingPaths: Record<string, string> = {
  fr: '/fr/tirage', en: '/en/reading', zh: '/zh/zhan-bu', es: '/es/lectura', de: '/de/ziehung', hi: '/hi/taash', ja: '/ja/uranai',
};

/** Deterministic hash from date string → card index + reversed */
function getDailyCard(deck: TarotCard[], dateStr: string): { card: TarotCard; reversed: boolean } {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash + dateStr.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % deck.length;
  const reversed = Math.abs(hash >> 8) % 2 === 1;
  return { card: deck[index], reversed };
}

export default function DailyReading({ lang, deck }: DailyReadingProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const dateStr = useMemo(() => {
    const now = new Date();
    return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;
  }, []);

  const { card, reversed } = useMemo(() => getDailyCard(deck, dateStr), [deck, dateStr]);

  // Intro animation
  useEffect(() => {
    if (phase !== 'intro') return;
    const lines = introLines[lang] || introLines.en;
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 1200 * (i + 1)));
    });
    timers.push(setTimeout(() => setShowButton(true), 1200 * (lines.length + 1)));
    return () => timers.forEach(clearTimeout);
  }, [lang, phase]);

  const handleReveal = useCallback(() => {
    setPhase('flipping');
    // Auto transition to reveal after flip
    setTimeout(() => setPhase('reveal'), 2000);
  }, []);

  const t = revealTexts[lang] || revealTexts.en;
  const cardName = card.name[lang] || card.name.en;
  const cardMessage = reversed
    ? (card.message.reversed[lang] || card.message.reversed.en)
    : (card.message.upright[lang] || card.message.upright.en);

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
            className="min-h-[100vh] flex items-center justify-center relative overflow-hidden -mt-16 px-4"
          >
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
                    onClick={handleReveal}
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
          </motion.div>
        )}

        {phase === 'flipping' && (
          <motion.div
            key="flipping"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[100vh] flex items-center justify-center -mt-16"
          >
            <DailyCardFlip card={card} reversed={reversed} />
          </motion.div>
        )}

        {phase === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="min-h-[100vh] flex items-center justify-center px-4 py-16 -mt-16">
              <div className="max-w-lg mx-auto text-center">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="font-[Inter] text-xs tracking-[0.3em] uppercase mb-6"
                  style={{ color: 'var(--color-sol-ash)', opacity: 0.6 }}
                >
                  {t.cardOfDay}
                </motion.p>

                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
                  className="relative mx-auto mb-8" style={{ width: 'clamp(220px, 50vw, 350px)' }}
                >
                  <motion.div
                    animate={{ boxShadow: [
                      `0 0 40px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2), 0 0 80px rgba(var(--glow-r),var(--glow-g),var(--glow-b),0.1)`,
                      `0 0 60px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3), 0 0 100px rgba(var(--glow-r),var(--glow-g),var(--glow-b),0.15)`,
                      `0 0 40px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2), 0 0 80px rgba(var(--glow-r),var(--glow-g),var(--glow-b),0.1)`,
                    ] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="rounded-lg overflow-hidden"
                  >
                    <img src={card.image} alt={cardName} className="w-full rounded-lg"
                      style={{ border: '2px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)', transform: reversed ? 'rotate(180deg)' : 'none' }}
                    />
                  </motion.div>
                </motion.div>

                <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
                  className="font-[Cinzel_Decorative] text-2xl sm:text-3xl mb-3" style={{ color: 'var(--color-sol-gold)' }}
                >
                  ✦ {cardName} ✦
                </motion.h2>

                {reversed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                    className="inline-block font-[Inter] text-xs px-3 py-1 rounded-sm mb-6"
                    style={{ color: 'rgba(128,90,200,0.9)', border: '1px solid rgba(128,90,200,0.4)' }}
                  >
                    ↻ {t.reversed}
                  </motion.span>
                )}

                <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
                  className="font-[Cormorant_Garamond] text-xl sm:text-2xl italic mb-8 leading-relaxed"
                  style={{ color: 'var(--color-sol-cream)' }}
                >
                  &ldquo;{cardMessage}&rdquo;
                </motion.p>

                <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 1.1, duration: 0.5 }}
                  className="flex items-center justify-center gap-4 mb-8"
                >
                  <div className="flex-1 max-w-24 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))' }} />
                  <span style={{ color: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)' }}>✦</span>
                  <div className="flex-1 max-w-24 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))' }} />
                </motion.div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
                  className="font-[Cormorant_Garamond] text-lg italic mb-10"
                  style={{ color: 'var(--color-sol-ash)' }}
                >
                  {t.comeback}
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.5 }}
                  className="space-y-4 mb-8"
                >
                  <a href={consultationPaths[lang] || consultationPaths.en}
                    className="block w-full font-[Inter] tracking-wider uppercase text-sm font-semibold px-6 py-4 rounded-sm transition-all duration-300 text-center"
                    style={{ backgroundColor: 'var(--color-sol-gold)', color: 'var(--color-sol-deep)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold-light)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >{t.cta}</a>
                  <a href={readingPaths[lang] || readingPaths.en}
                    className="block w-full font-[Inter] tracking-wider uppercase text-sm px-6 py-4 rounded-sm transition-all duration-300 text-center"
                    style={{ border: '1px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.5)', color: 'var(--color-sol-gold)', backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >↻ {t.newReading}</a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Card flip sub-component ──────────────────────────────
function DailyCardFlip({ card, reversed }: { card: TarotCard; reversed: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('solorah:audio-duck'));
    const flipTimer = setTimeout(() => setIsFlipped(true), 600);
    const flashTimer = setTimeout(() => setShowFlash(true), 1100);
    const flashEnd = setTimeout(() => setShowFlash(false), 1400);
    const unduck = setTimeout(() => window.dispatchEvent(new CustomEvent('solorah:audio-unduck')), 1800);
    return () => { clearTimeout(flipTimer); clearTimeout(flashTimer); clearTimeout(flashEnd); clearTimeout(unduck); };
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
      {showFlash && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.3, 1.5] }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="absolute rounded-full pointer-events-none"
          style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4) 0%, rgba(var(--glow-r),var(--glow-g),var(--glow-b),0.15) 40%, transparent 70%)' }}
        />
      )}
      <motion.div animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 1, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', width: 'clamp(220px, 40vw, 350px)', height: 'clamp(330px, 60vw, 525px)' }}
        className="relative"
      >
        <div className="absolute inset-0 card-back-design rounded-lg" style={{ backfaceVisibility: 'hidden' }}>
          <div className="absolute inset-3 rounded border flex items-center justify-center" style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2)' }}>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute w-16 h-16 border rotate-45" style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.12)' }} />
              <div className="absolute w-24 h-24 border rotate-45" style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.06)' }} />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-lg overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <img src={card.image} alt={card.name.fr} className="w-full h-full object-cover rounded-lg" loading="eager"
            style={{ transform: reversed ? 'rotate(180deg)' : 'none' }}
          />
          <div className="absolute inset-0 rounded-lg pointer-events-none"
            style={{ border: reversed ? '2px solid rgba(128,90,200,0.5)' : '2px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)' }}
          />
        </div>
      </motion.div>
      {isFlipped && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div key={i} initial={{ opacity: 0.8, scale: 0, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1, x: Math.cos((i * Math.PI * 2) / 12) * 120, y: Math.sin((i * Math.PI * 2) / 12) * 120 }}
              transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{ width: '4px', height: '4px', backgroundColor: 'var(--color-sol-gold)', marginTop: '-2px', marginLeft: '-2px' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
