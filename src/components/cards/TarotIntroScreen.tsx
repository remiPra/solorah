import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TarotIntroScreenProps {
  lang: string;
  onReady: () => void;
}

const lines: Record<string, string[]> = {
  fr: [
    'Concentre-toi sur ta question...',
    'Respire profondément...',
    'Les 22 arcanes majeurs vont te révéler',
    'ton passé, ton présent et ton futur.',
    'Quand tu es prêt(e), choisis trois cartes.',
  ],
  en: [
    'Focus on your question...',
    'Breathe deeply...',
    'The 22 major arcana will reveal',
    'your past, present and future.',
    "When you're ready, choose three cards.",
  ],
  zh: [
    '专注于你的问题...',
    '深呼吸...',
    '22张大阿尔卡那将揭示',
    '你的过去、现在和未来。',
    '当你准备好了，选择三张牌。',
  ],
  es: [
    'Concéntrate en tu pregunta...',
    'Respira profundamente...',
    'Los 22 arcanos mayores te revelarán',
    'tu pasado, tu presente y tu futuro.',
    'Cuando estés listo/a, elige tres cartas.',
  ],
  de: [
    'Konzentriere dich auf deine Frage...',
    'Atme tief ein...',
    'Die 22 großen Arkana werden dir',
    'deine Vergangenheit, Gegenwart und Zukunft enthüllen.',
    'Wenn du bereit bist, wähle drei Karten.',
  ],
  hi: [
    'अपने सवाल पर ध्यान केंद्रित करो...',
    'गहरी साँस लो...',
    '22 महान आर्काना तुम्हें बताएंगे',
    'तुम्हारा अतीत, वर्तमान और भविष्य।',
    'जब तुम तैयार हो, तीन पत्ते चुनो।',
  ],
  ja: [
    '質問に集中して...',
    '深く息を吸って...',
    '22枚の大アルカナが明かします',
    'あなたの過去、現在、そして未来を。',
    '準備ができたら、3枚のカードを選んで。',
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

export default function TarotIntroScreen({ lang, onReady }: TarotIntroScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const texts = lines[lang] || lines.en;
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
          {(lines[lang] || lines.en).map((line, i) => (
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
              {buttonText[lang] || buttonText.en}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
