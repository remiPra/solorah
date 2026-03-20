import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
  lang: 'fr' | 'en';
  onReady: () => void;
}

const lines = {
  fr: [
    'Ferme les yeux un instant...',
    'Respire...',
    "Pense à ta question d'amour...",
    'Quand tu te sens prêt(e), fais défiler les cartes et choisis celle qui t\'appelle.',
  ],
  en: [
    'Close your eyes for a moment...',
    'Breathe...',
    'Think about your love question...',
    'When you feel ready, scroll through the cards and choose the one that calls to you.',
  ],
};

const buttonText = {
  fr: 'Je suis prêt(e)',
  en: 'I am ready',
};

export default function IntroScreen({ lang, onReady }: IntroScreenProps) {
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
      {/* Background radial gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.12) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(var(--glow-r),var(--glow-g),var(--glow-b),0.08) 0%, transparent 70%)' }}
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
