import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhaseIntroProps {
  lang: string;
  onNext: () => void;
}

const introLines: Record<string, string[]> = {
  fr: [
    'Chaque jour porte sa propre vibration...',
    'Les cycles numeriques et planetaires dessinent un chemin unique pour vous.',
    'Decouvrez les 30 prochains jours a travers le prisme de votre signature energetique.',
  ],
  en: [
    'Each day carries its own vibration...',
    'Numeric and planetary cycles draw a unique path for you.',
    'Discover the next 30 days through the prism of your energy signature.',
  ],
  zh: [
    '\u6BCF\u4E00\u5929\u90FD\u627F\u8F7D\u7740\u5B83\u72EC\u7279\u7684\u632F\u52A8\u2026\u2026',
    '\u6570\u5B57\u4E0E\u884C\u661F\u7684\u5FAA\u73AF\u4E3A\u4F60\u63CF\u7ED8\u51FA\u4E00\u6761\u72EC\u7279\u7684\u9053\u8DEF\u3002',
    '\u900F\u8FC7\u4F60\u7684\u80FD\u91CF\u5370\u8BB0\uFF0C\u63A2\u7D22\u672A\u6765\u4E09\u5341\u5929\u3002',
  ],
  es: [
    'Cada dia lleva su propia vibracion...',
    'Los ciclos numericos y planetarios trazan un camino unico para ti.',
    'Descubre los proximos 30 dias a traves del prisma de tu firma energetica.',
  ],
  de: [
    'Jeder Tag tragt seine eigene Schwingung...',
    'Numerische und planetare Zyklen zeichnen einen einzigartigen Weg fur dich.',
    'Entdecke die nachsten 30 Tage durch das Prisma deiner Energiesignatur.',
  ],
  hi: [
    '\u0939\u0930 \u0926\u093F\u0928 \u0905\u092A\u0928\u0940 \u0905\u0928\u0942\u0920\u0940 \u0915\u0902\u092A\u0928 \u0932\u0947\u0915\u0930 \u0906\u0924\u093E \u0939\u0948...',
    '\u0905\u0902\u0915\u0940\u092F \u0914\u0930 \u0917\u094D\u0930\u0939\u0940\u092F \u091A\u0915\u094D\u0930 \u0906\u092A\u0915\u0947 \u0932\u093F\u090F \u090F\u0915 \u0905\u0928\u0942\u0920\u093E \u092E\u093E\u0930\u094D\u0917 \u092C\u0928\u093E\u0924\u0947 \u0939\u0948\u0902\u0964',
    '\u0905\u092A\u0928\u0940 \u090A\u0930\u094D\u091C\u093E \u0939\u0938\u094D\u0924\u093E\u0915\u094D\u0937\u0930 \u0915\u0947 \u092E\u093E\u0927\u094D\u092F\u092E \u0938\u0947 \u0905\u0917\u0932\u0947 30 \u0926\u093F\u0928\u094B\u0902 \u0915\u094B \u0916\u094B\u091C\u0947\u0902\u0964',
  ],
  ja: [
    '\u6BCE\u65E5\u304C\u305D\u306E\u65E5\u3060\u3051\u306E\u632F\u52D5\u3092\u5E2F\u3073\u3066\u3044\u308B\u2026',
    '\u6570\u79D8\u8853\u3068\u60D1\u661F\u306E\u5468\u671F\u304C\u3001\u3042\u306A\u305F\u3060\u3051\u306E\u9053\u3092\u63CF\u304F\u3002',
    '\u3042\u306A\u305F\u306E\u30A8\u30CD\u30EB\u30AE\u30FC\u306E\u7F72\u540D\u3092\u901A\u3057\u3066\u3001\u6B21\u306E30\u65E5\u9593\u3092\u63A2\u308A\u307E\u3057\u3087\u3046\u3002',
  ],
};

const buttonLabels: Record<string, string> = {
  fr: 'Commencer', en: 'Begin', zh: '\u5F00\u59CB', es: 'Comenzar',
  de: 'Beginnen', hi: '\u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902', ja: '\u59CB\u3081\u308B',
};

export default function PhaseIntro({ lang, onNext }: PhaseIntroProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const lines = introLines[lang] || introLines.en;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 1200 * (i + 1)));
    });
    timers.push(setTimeout(() => setShowButton(true), 1200 * (lines.length + 1)));
    return () => timers.forEach(clearTimeout);
  }, [lang]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100vh] flex items-center justify-center relative overflow-hidden -mt-16 px-4"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.12) 0%, transparent 70%)' }}
        />
      </div>
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="text-6xl mb-8"
        >
          &#9788;
        </motion.div>
        <div className="space-y-6 mb-16">
          {lines.map((line, i) => (
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
              onClick={onNext}
              className="inline-flex items-center justify-center font-[Inter] tracking-wider uppercase text-sm font-semibold px-8 py-4 rounded-sm transition-all duration-300"
              style={{ backgroundColor: 'var(--color-sol-gold)', color: 'var(--color-sol-deep)' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold-light)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {buttonLabels[lang] || buttonLabels.en}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
