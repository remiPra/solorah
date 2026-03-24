import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
  lang: string;
  onReady: () => void;
}

const lines: Record<string, string[]> = {
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
  zh: [
    '闭上眼睛片刻...',
    '深呼吸...',
    '想想你的爱情问题...',
    '当你准备好了，滑动牌卡，选择那张召唤你的牌。',
  ],
  es: [
    'Cierra los ojos un instante...',
    'Respira...',
    'Piensa en tu pregunta de amor...',
    'Cuando te sientas listo/a, desliza las cartas y elige la que te llame.',
  ],
  de: [
    'Schließe für einen Moment die Augen...',
    'Atme...',
    'Denke an deine Liebesfrage...',
    'Wenn du bereit bist, scrolle durch die Karten und wähle die, die dich ruft.',
  ],
  hi: [
    'एक पल के लिए अपनी आँखें बंद करो...',
    'साँस लो...',
    'अपने प्रेम के सवाल के बारे में सोचो...',
    'जब तुम तैयार हो, पत्तों को स्क्रॉल करो और उसे चुनो जो तुम्हें बुलाए।',
  ],
  ja: [
    '少し目を閉じて...',
    '息をして...',
    '恋の質問を思い浮かべて...',
    '準備ができたら、カードをスクロールして、呼びかけるカードを選んで。',
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

export default function IntroScreen({ lang, onReady }: IntroScreenProps) {
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
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.12) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full blur-[120px]"
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
