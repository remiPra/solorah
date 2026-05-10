import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TarotCard } from '../../types/card';

type Phase = 'intro' | 'flipping' | 'reveal';

interface YesNoReadingProps {
  lang: string;
  deck: TarotCard[];
}

const introLines: Record<string, string[]> = {
  fr: [
    'Une question te brûle les lèvres...',
    'Le Tarot de Marseille connaît la réponse.',
    'Pose ta question, tire ta carte.',
  ],
  en: [
    'A question burns on your lips...',
    'The Tarot de Marseille knows the answer.',
    'Ask your question, draw your card.',
  ],
  zh: [
    '一个问题在你心中燃烧...',
    '马赛塔罗知道答案。',
    '提出你的问题，抽出你的牌。',
  ],
  es: [
    'Una pregunta te quema los labios...',
    'El Tarot de Marsella conoce la respuesta.',
    'Haz tu pregunta, saca tu carta.',
  ],
  de: [
    'Eine Frage brennt auf deinen Lippen...',
    'Das Tarot de Marseille kennt die Antwort.',
    'Stelle deine Frage, ziehe deine Karte.',
  ],
  hi: [
    'एक सवाल तुम्हारे होठों पर जल रहा है...',
    'मार्सिले टैरो को जवाब पता है।',
    'अपना सवाल पूछो, अपना पत्ता खींचो।',
  ],
  ja: [
    '問いがあなたの唇で燃えている...',
    'マルセイユタロットは答えを知っている。',
    '質問をして、カードを引こう。',
  ],
};

const buttonText: Record<string, string> = {
  fr: 'Tirer ma carte',
  en: 'Draw my card',
  zh: '抽我的牌',
  es: 'Sacar mi carta',
  de: 'Meine Karte ziehen',
  hi: 'मेरा पत्ता खींचें',
  ja: 'カードを引く',
};

const placeholderText: Record<string, string> = {
  fr: 'Écris ta question ici...',
  en: 'Write your question here...',
  zh: '在这里写下你的问题...',
  es: 'Escribe tu pregunta aquí...',
  de: 'Schreibe deine Frage hier...',
  hi: 'अपना सवाल यहाँ लिखें...',
  ja: 'ここに質問を書いてください...',
};

const questionLabel: Record<string, string> = {
  fr: 'Ta question',
  en: 'Your question',
  zh: '你的问题',
  es: 'Tu pregunta',
  de: 'Deine Frage',
  hi: 'तुम्हारा सवाल',
  ja: 'あなたの質問',
};

const revealTexts: Record<string, { yes: string; no: string; verdict: string; newQuestion: string; otherReadings: string }> = {
  fr: { yes: 'OUI ✓', no: 'NON ✗', verdict: 'La réponse du Tarot', newQuestion: 'Poser une autre question', otherReadings: 'Autres tirages' },
  en: { yes: 'YES ✓', no: 'NO ✗', verdict: 'The Tarot\'s answer', newQuestion: 'Ask another question', otherReadings: 'Other readings' },
  zh: { yes: '是 ✓', no: '否 ✗', verdict: '塔罗的答案', newQuestion: '提出另一个问题', otherReadings: '其他占卜' },
  es: { yes: 'SÍ ✓', no: 'NO ✗', verdict: 'La respuesta del Tarot', newQuestion: 'Hacer otra pregunta', otherReadings: 'Otras lecturas' },
  de: { yes: 'JA ✓', no: 'NEIN ✗', verdict: 'Die Antwort des Tarot', newQuestion: 'Eine andere Frage stellen', otherReadings: 'Andere Ziehungen' },
  hi: { yes: 'हाँ ✓', no: 'नहीं ✗', verdict: 'टैरो का उत्तर', newQuestion: 'एक और सवाल पूछें', otherReadings: 'अन्य ताश' },
  ja: { yes: 'はい ✓', no: 'いいえ ✗', verdict: 'タロットの答え', newQuestion: '別の質問をする', otherReadings: '他の占い' },
};

const readingPaths: Record<string, string> = {
  fr: '/fr/tirage', en: '/en/reading', zh: '/zh/zhan-bu', es: '/es/lectura', de: '/de/ziehung', hi: '/hi/taash', ja: '/ja/uranai',
};

export default function YesNoReading({ lang, deck }: YesNoReadingProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [visibleLines, setVisibleLines] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [question, setQuestion] = useState('');
  const [drawnCard, setDrawnCard] = useState<TarotCard | null>(null);
  const [reversed, setReversed] = useState(false);

  // Intro animation
  useEffect(() => {
    if (phase !== 'intro') return;
    const lines = introLines[lang] || introLines.en;
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 1200 * (i + 1)));
    });
    timers.push(setTimeout(() => setShowInput(true), 1200 * (lines.length + 1)));
    return () => timers.forEach(clearTimeout);
  }, [lang, phase]);

  const handleDraw = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const isReversed = Math.random() < 0.5;
    setDrawnCard(deck[randomIndex]);
    setReversed(isReversed);
    setPhase('flipping');
    setTimeout(() => setPhase('reveal'), 2000);
  }, [deck]);

  const handleNewQuestion = useCallback(() => {
    setPhase('intro');
    setVisibleLines(0);
    setShowInput(false);
    setQuestion('');
    setDrawnCard(null);
    setReversed(false);
  }, []);

  const t = revealTexts[lang] || revealTexts.en;
  const isYes = !reversed;
  const cardName = drawnCard ? (drawnCard.name[lang] || drawnCard.name.en) : '';
  const cardMessage = drawnCard
    ? reversed
      ? (drawnCard.message.reversed[lang] || drawnCard.message.reversed.en)
      : (drawnCard.message.upright[lang] || drawnCard.message.upright.en)
    : '';

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
              <div className="space-y-6 mb-12">
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
                {showInput && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="space-y-6"
                  >
                    <div className="max-w-md mx-auto">
                      <label className="block font-[Inter] text-xs tracking-[0.2em] uppercase mb-3"
                        style={{ color: 'var(--color-sol-ash)' }}
                      >
                        {questionLabel[lang] || questionLabel.en}
                      </label>
                      <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && question.trim()) handleDraw(); }}
                        placeholder={placeholderText[lang] || placeholderText.en}
                        className="w-full font-[Cormorant_Garamond] text-lg italic px-4 py-3 rounded-sm outline-none transition-all duration-300 focus:ring-1"
                        style={{
                          backgroundColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.05)',
                          border: '1px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)',
                          color: 'var(--color-sol-cream)',
                        }}
                        autoFocus
                      />
                    </div>
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: question.trim() ? 1 : 0.4, y: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={handleDraw}
                      disabled={!question.trim()}
                      className="inline-flex items-center justify-center font-[Inter] tracking-wider uppercase text-sm font-semibold px-8 py-4 rounded-sm transition-all duration-300 disabled:cursor-not-allowed"
                      style={{ backgroundColor: 'var(--color-sol-gold)', color: 'var(--color-sol-deep)' }}
                      onMouseEnter={(e) => { if (question.trim()) { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold-light)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)'; } }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      {buttonText[lang] || buttonText.en}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {phase === 'flipping' && drawnCard && (
          <motion.div
            key="flipping"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[100vh] flex items-center justify-center -mt-16"
          >
            <YesNoCardFlip card={drawnCard} reversed={reversed} />
          </motion.div>
        )}

        {phase === 'reveal' && drawnCard && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="min-h-[100vh] flex items-center justify-center px-4 py-16 -mt-16">
              <div className="max-w-lg mx-auto text-center">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="font-[Inter] text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ color: 'var(--color-sol-ash)', opacity: 0.6 }}
                >
                  {t.verdict}
                </motion.p>

                {/* Verdict badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                  className="mb-6"
                >
                  <span
                    className="inline-block font-[Cinzel_Decorative] text-3xl sm:text-4xl font-bold px-6 py-2"
                    style={{
                      color: isYes ? 'var(--color-sol-gold)' : 'rgba(128,90,200,0.9)',
                    }}
                  >
                    {isYes ? t.yes : t.no}
                  </span>
                </motion.div>

                {/* Question reminder */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="font-[Cormorant_Garamond] text-base italic mb-8"
                  style={{ color: 'var(--color-sol-ash)' }}
                >
                  &laquo; {question} &raquo;
                </motion.p>

                {/* Card image */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
                  className="relative mx-auto mb-8" style={{ width: 'clamp(220px, 50vw, 350px)' }}
                >
                  <motion.div
                    animate={{ boxShadow: isYes
                      ? [
                          '0 0 40px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2), 0 0 80px rgba(var(--glow-r),var(--glow-g),var(--glow-b),0.1)',
                          '0 0 60px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3), 0 0 100px rgba(var(--glow-r),var(--glow-g),var(--glow-b),0.15)',
                          '0 0 40px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2), 0 0 80px rgba(var(--glow-r),var(--glow-g),var(--glow-b),0.1)',
                        ]
                      : [
                          '0 0 40px rgba(128,90,200,0.2), 0 0 80px rgba(128,90,200,0.1)',
                          '0 0 60px rgba(128,90,200,0.3), 0 0 100px rgba(128,90,200,0.15)',
                          '0 0 40px rgba(128,90,200,0.2), 0 0 80px rgba(128,90,200,0.1)',
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="rounded-lg overflow-hidden"
                  >
                    <img src={drawnCard.image} alt={cardName} className="w-full rounded-lg"
                      style={{
                        border: reversed
                          ? '2px solid rgba(128,90,200,0.5)'
                          : '2px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)',
                        transform: reversed ? 'rotate(180deg)' : 'none',
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Card name */}
                <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
                  className="font-[Cinzel_Decorative] text-2xl sm:text-3xl mb-3" style={{ color: 'var(--color-sol-gold)' }}
                >
                  ✦ {cardName} ✦
                </motion.h2>

                {reversed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                    className="inline-block font-[Inter] text-xs px-3 py-1 rounded-sm mb-6"
                    style={{ color: 'rgba(128,90,200,0.9)', border: '1px solid rgba(128,90,200,0.4)' }}
                  >
                    ↻ {lang === 'fr' ? 'Renversée' : lang === 'es' ? 'Invertida' : lang === 'de' ? 'Umgekehrt' : lang === 'zh' ? '逆位' : lang === 'hi' ? 'उलटा' : lang === 'ja' ? '逆位置' : 'Reversed'}
                  </motion.span>
                )}

                {/* Card message */}
                <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
                  className="font-[Cormorant_Garamond] text-xl sm:text-2xl italic mb-8 leading-relaxed"
                  style={{ color: 'var(--color-sol-cream)' }}
                >
                  &ldquo;{cardMessage}&rdquo;
                </motion.p>

                {/* Divider */}
                <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 1.1, duration: 0.5 }}
                  className="flex items-center justify-center gap-4 mb-10"
                >
                  <div className="flex-1 max-w-24 h-px" style={{ background: isYes
                    ? 'linear-gradient(to right, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))'
                    : 'linear-gradient(to right, transparent, rgba(128,90,200,0.3))'
                  }} />
                  <span style={{ color: isYes ? 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)' : 'rgba(128,90,200,0.4)' }}>✦</span>
                  <div className="flex-1 max-w-24 h-px" style={{ background: isYes
                    ? 'linear-gradient(to left, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))'
                    : 'linear-gradient(to left, transparent, rgba(128,90,200,0.3))'
                  }} />
                </motion.div>

                {/* Action buttons */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.5 }}
                  className="space-y-4"
                >
                  <button
                    onClick={handleNewQuestion}
                    className="block w-full font-[Inter] tracking-wider uppercase text-sm font-semibold px-6 py-4 rounded-sm transition-all duration-300 text-center"
                    style={{ backgroundColor: 'var(--color-sol-gold)', color: 'var(--color-sol-deep)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold-light)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    {t.newQuestion}
                  </button>
                  <a href={readingPaths[lang] || readingPaths.en}
                    className="block w-full font-[Inter] tracking-wider uppercase text-sm px-6 py-4 rounded-sm transition-all duration-300 text-center"
                    style={{ border: '1px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.5)', color: 'var(--color-sol-gold)', backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    ↻ {t.otherReadings}
                  </a>
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
function YesNoCardFlip({ card, reversed }: { card: TarotCard; reversed: boolean }) {
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
