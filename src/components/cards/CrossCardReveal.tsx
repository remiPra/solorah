import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { SelectedCrossCard, CrossPosition } from '../../types/card';

interface CrossCardRevealProps {
  lang: string;
  selectedCards: SelectedCrossCard[];
  onNewReading: () => void;
}

const positionLabels: Record<string, Record<CrossPosition, string>> = {
  fr: { situation: 'Situation', obstacle: 'Obstacle', past: 'Passé', future: 'Futur', synthesis: 'Synthèse' },
  en: { situation: 'Situation', obstacle: 'Obstacle', past: 'Past', future: 'Future', synthesis: 'Synthesis' },
  zh: { situation: '现状', obstacle: '障碍', past: '过去', future: '未来', synthesis: '综合' },
  es: { situation: 'Situación', obstacle: 'Obstáculo', past: 'Pasado', future: 'Futuro', synthesis: 'Síntesis' },
  de: { situation: 'Situation', obstacle: 'Hindernis', past: 'Vergangenheit', future: 'Zukunft', synthesis: 'Synthese' },
  hi: { situation: 'स्थिति', obstacle: 'बाधा', past: 'भूतकाल', future: 'भविष्य', synthesis: 'संश्लेषण' },
  ja: { situation: '現状', obstacle: '障害', past: '過去', future: '未来', synthesis: '総合' },
};

const texts: Record<string, { reversed: string; readingTitle: string; cta: string; newReading: string; share: string }> = {
  fr: { reversed: 'Renversée', readingTitle: 'Ton tirage en croix', cta: 'Consultation personnalisée', newReading: 'Nouveau tirage', share: 'Partager' },
  en: { reversed: 'Reversed', readingTitle: 'Your cross spread', cta: 'Personal consultation', newReading: 'New reading', share: 'Share' },
  zh: { reversed: '逆位', readingTitle: '你的十字占卜', cta: '个性化咨询', newReading: '重新占卜', share: '分享' },
  es: { reversed: 'Invertida', readingTitle: 'Tu tirada en cruz', cta: 'Consulta personalizada', newReading: 'Nueva lectura', share: 'Compartir' },
  de: { reversed: 'Umgekehrt', readingTitle: 'Deine Kreuzlegung', cta: 'Persönliche Beratung', newReading: 'Neue Ziehung', share: 'Teilen' },
  hi: { reversed: 'उलटा', readingTitle: 'आपका क्रॉस स्प्रेड', cta: 'व्यक्तिगत परामर्श', newReading: 'नया पाठ', share: 'साझा करें' },
  ja: { reversed: '逆位置', readingTitle: 'あなたの十字占い', cta: 'パーソナル相談', newReading: '新しいリーディング', share: 'シェア' },
};

const consultationPaths: Record<string, string> = {
  fr: '/fr/consultation',
  en: '/en/consultation',
  zh: '/zh/zi-xun',
  es: '/es/consulta',
  de: '/de/beratung',
  hi: '/hi/paramarsh',
  ja: '/ja/soudan',
};

// Order for reveal: situation, obstacle, past, future, synthesis
const revealOrder: CrossPosition[] = ['situation', 'obstacle', 'past', 'future', 'synthesis'];

export default function CrossCardReveal({ lang, selectedCards, onNewReading }: CrossCardRevealProps) {
  const t = texts[lang] || texts.en;
  const consultationHref = consultationPaths[lang] || consultationPaths.en;

  // Progressive reveal: 0 = nothing, 1-5 = cards flipping, 6 = interpretation
  const [revealStep, setRevealStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setRevealStep(1), 500));
    timers.push(setTimeout(() => setRevealStep(2), 2500));
    timers.push(setTimeout(() => setRevealStep(3), 4500));
    timers.push(setTimeout(() => setRevealStep(4), 6500));
    timers.push(setTimeout(() => setRevealStep(5), 8500));
    timers.push(setTimeout(() => setRevealStep(6), 10500));
    return () => timers.forEach(clearTimeout);
  }, []);

  const cardByPosition = (pos: CrossPosition) =>
    selectedCards.find((c) => c.position === pos)!;

  const shareText = selectedCards.map((s) => s.card.name[lang] || s.card.name.en).join(', ');
  const shareFullTexts: Record<string, string> = {
    fr: `Mon tirage en croix sur Solorah : ${shareText}`,
    en: `My cross spread reading on Solorah: ${shareText}`,
    zh: `我在Solorah上的十字占卜：${shareText}`,
    es: `Mi tirada en cruz en Solorah: ${shareText}`,
    de: `Meine Kreuzlegung auf Solorah: ${shareText}`,
    hi: `Solorah पर मेरा क्रॉस स्प्रेड: ${shareText}`,
    ja: `Solorahの十字占い：${shareText}`,
  };
  const shareFullText = shareFullTexts[lang] || shareFullTexts.en;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://solorah.com';

  const handleShare = async (platform: 'twitter' | 'facebook' | 'native') => {
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({ title: 'Solorah', text: shareFullText, url: shareUrl });
      } catch { /* user cancelled */ }
      return;
    }
    const urls = {
      twitter: `https://x.com/intent/tweet?text=${encodeURIComponent(shareFullText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      native: '',
    };
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-[100vh] px-4 py-16 -mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Cross layout */}
        <div className="pt-20 mb-12">
          <div className="grid gap-2 sm:gap-4 mx-auto" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', maxWidth: 'min(500px, 90vw)' }}>
            {/* Row 1: empty - Synthesis - empty */}
            <div />
            <div className="flex justify-center">
              <SingleCardFlip
                selected={cardByPosition('synthesis')}
                lang={lang}
                isRevealed={revealStep >= revealOrder.indexOf('synthesis') + 1}
              />
            </div>
            <div />

            {/* Row 2: Past - Situation/Obstacle stacked - Future */}
            <div className="flex justify-center items-center">
              <SingleCardFlip
                selected={cardByPosition('past')}
                lang={lang}
                isRevealed={revealStep >= revealOrder.indexOf('past') + 1}
              />
            </div>
            <div className="flex justify-center items-center">
              <div className="relative">
                <SingleCardFlip
                  selected={cardByPosition('situation')}
                  lang={lang}
                  isRevealed={revealStep >= revealOrder.indexOf('situation') + 1}
                />
                {/* Obstacle card overlaid at angle */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotate(12deg)' }}>
                  <SingleCardFlip
                    selected={cardByPosition('obstacle')}
                    lang={lang}
                    isRevealed={revealStep >= revealOrder.indexOf('obstacle') + 1}
                    isOverlay
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <SingleCardFlip
                selected={cardByPosition('future')}
                lang={lang}
                isRevealed={revealStep >= revealOrder.indexOf('future') + 1}
              />
            </div>
          </div>
        </div>

        {/* Interpretation section */}
        {revealStep >= 6 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="flex-1 max-w-32 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))' }} />
              <span style={{ color: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)' }}>✦</span>
              <div className="flex-1 max-w-32 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))' }} />
            </div>

            <h2
              className="font-[Cinzel_Decorative] text-xl sm:text-2xl text-center mb-10"
              style={{ color: 'var(--color-sol-gold)' }}
            >
              {t.readingTitle}
            </h2>

            {/* Interpretation for each card in reveal order */}
            <div className="space-y-8 mb-12">
              {revealOrder.map((pos, i) => {
                const selected = cardByPosition(pos);
                const message = selected.reversed
                  ? (selected.card.message.reversed[lang] || selected.card.message.reversed.en)
                  : (selected.card.message.upright[lang] || selected.card.message.upright.en);
                const labels = positionLabels[lang] || positionLabels.en;

                return (
                  <motion.div
                    key={pos}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.3, duration: 0.6 }}
                  >
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span style={{ color: 'var(--color-sol-gold)' }}>✦</span>
                      <span
                        className="font-[Cinzel_Decorative] text-base sm:text-lg"
                        style={{ color: 'var(--color-sol-gold)' }}
                      >
                        {labels[pos]}
                      </span>
                      <span className="font-[Inter] text-sm" style={{ color: 'var(--color-sol-ash)' }}>—</span>
                      <span
                        className="font-[Cormorant_Garamond] text-lg sm:text-xl"
                        style={{ color: 'var(--color-sol-cream)' }}
                      >
                        {selected.card.name[lang] || selected.card.name.en}
                      </span>
                      {selected.reversed && (
                        <span
                          className="font-[Inter] text-xs px-2 py-0.5 rounded-sm"
                          style={{
                            color: 'var(--color-sol-purple, var(--color-sol-ash))',
                            border: '1px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)',
                          }}
                        >
                          ↻ {t.reversed}
                        </span>
                      )}
                    </div>
                    <p
                      className="font-[Cormorant_Garamond] text-lg sm:text-xl italic leading-relaxed pl-6"
                      style={{ color: 'var(--color-sol-cream)' }}
                    >
                      &ldquo;{message}&rdquo;
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="flex-1 max-w-32 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))' }} />
              <span style={{ color: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)' }}>✦</span>
              <div className="flex-1 max-w-32 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))' }} />
            </div>

            {/* CTAs */}
            <div className="space-y-4 mb-8 max-w-sm mx-auto">
              {/* CTA consultation payante désactivée (site 100% gratuit). */}
              {false && (
                <a
                  href={consultationHref}
                  className="block w-full text-center font-[Inter] tracking-wider uppercase text-sm font-semibold px-6 py-4 rounded-sm transition-all duration-300"
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
                  {t.cta}
                </a>
              )}

              <button
                onClick={onNewReading}
                className="block w-full font-[Inter] tracking-wider uppercase text-sm px-6 py-4 rounded-sm transition-all duration-300"
                style={{
                  border: '1px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.5)',
                  color: 'var(--color-sol-gold)',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.1)';
                  e.currentTarget.style.borderColor = 'var(--color-sol-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.5)';
                }}
              >
                ↻ {t.newReading}
              </button>
            </div>

            {/* Share buttons */}
            <div className="flex items-center justify-center gap-4">
              <span className="font-[Inter] text-xs uppercase tracking-wider" style={{ color: 'var(--color-sol-ash)', opacity: 0.5 }}>
                {t.share}
              </span>
              <button
                onClick={() => handleShare('twitter')}
                className="transition-colors hover:opacity-80"
                style={{ color: 'var(--color-sol-ash)' }}
                aria-label="Share on X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="transition-colors hover:opacity-80"
                style={{ color: 'var(--color-sol-ash)' }}
                aria-label="Share on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={() => handleShare('native')}
                  className="transition-colors hover:opacity-80"
                  style={{ color: 'var(--color-sol-ash)' }}
                  aria-label="Share"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Individual card flip sub-component ─────────────────────────────
interface SingleCardFlipProps {
  selected: SelectedCrossCard;
  lang: string;
  isRevealed: boolean;
  isOverlay?: boolean;
}

function SingleCardFlip({ selected, lang, isRevealed, isOverlay }: SingleCardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    if (!isRevealed) return;

    window.dispatchEvent(new CustomEvent('solorah:audio-duck'));

    const flipTimer = setTimeout(() => setIsFlipped(true), 100);
    const flashTimer = setTimeout(() => setShowFlash(true), 600);
    const flashEnd = setTimeout(() => setShowFlash(false), 900);
    const unduckTimer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('solorah:audio-unduck'));
    }, 1200);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(flashTimer);
      clearTimeout(flashEnd);
      clearTimeout(unduckTimer);
    };
  }, [isRevealed]);

  const labels = positionLabels[lang] || positionLabels.en;
  const t = texts[lang] || texts.en;

  const cardWidth = isOverlay ? 'clamp(85px, 21vw, 150px)' : 'clamp(90px, 22vw, 160px)';
  const cardHeight = isOverlay ? 'clamp(127px, 31.5vw, 225px)' : 'clamp(135px, 33vw, 240px)';

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        {showFlash && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.3, 1.5] }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute rounded-full pointer-events-none z-20"
            style={{
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4) 0%, transparent 70%)',
            }}
          />
        )}

        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{
            transformStyle: 'preserve-3d',
            width: cardWidth,
            height: cardHeight,
          }}
          className="relative"
        >
          {/* Back face */}
          <div
            className="absolute inset-0 card-back-design rounded-lg"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div
              className="absolute inset-2 sm:inset-3 rounded border flex items-center justify-center"
              style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2)' }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div
                  className="absolute w-8 h-8 sm:w-12 sm:h-12 border rotate-45"
                  style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.12)' }}
                />
              </div>
            </div>
          </div>

          {/* Front face */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <img
              src={selected.card.image}
              alt={selected.card.name[lang] || selected.card.name.en}
              className="w-full h-full object-cover rounded-lg"
              style={{ transform: selected.reversed ? 'rotate(180deg)' : 'none' }}
              loading="eager"
            />
            <div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                border: selected.reversed
                  ? '2px solid rgba(128,90,200,0.5)'
                  : '2px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)',
              }}
            />
          </div>
        </motion.div>

        {isFlipped && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            animate={{
              boxShadow: selected.reversed
                ? [
                    '0 0 20px rgba(128,90,200,0.15)',
                    '0 0 35px rgba(128,90,200,0.25)',
                    '0 0 20px rgba(128,90,200,0.15)',
                  ]
                : [
                    `0 0 20px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.15)`,
                    `0 0 35px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.25)`,
                    `0 0 20px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.15)`,
                  ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* Position label — only show for non-overlay cards */}
      {!isOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isFlipped ? 1 : 0.4 }}
          transition={{ duration: 0.5, delay: isFlipped ? 0.8 : 0 }}
          className="mt-2 text-center"
        >
          <span
            className="font-[Cinzel_Decorative] text-[10px] sm:text-xs tracking-wider"
            style={{ color: 'var(--color-sol-gold)' }}
          >
            {labels[selected.position]}
          </span>
          {isFlipped && selected.reversed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <span
                className="block font-[Inter] text-[9px] sm:text-[10px] mt-0.5"
                style={{ color: 'rgba(128,90,200,0.8)' }}
              >
                ↻ {t.reversed}
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
