import { motion } from 'framer-motion';
import type { SelectedTarotCard } from '../../types/card';

interface SlotIndicatorProps {
  lang: string;
  selectedCards: SelectedTarotCard[];
  currentSlot: number;
}

const positionLabels: Record<string, string[]> = {
  fr: ['Passé', 'Présent', 'Futur'],
  en: ['Past', 'Present', 'Future'],
  zh: ['过去', '现在', '未来'],
  es: ['Pasado', 'Presente', 'Futuro'],
  de: ['Vergangenheit', 'Gegenwart', 'Zukunft'],
  hi: ['भूतकाल', 'वर्तमान', 'भविष्य'],
  ja: ['過去', '現在', '未来'],
};

const promptLabels: Record<string, string[]> = {
  fr: [
    'Choisis ta carte Passé',
    'Choisis ta carte Présent',
    'Choisis ta carte Futur',
  ],
  en: [
    'Choose your Past card',
    'Choose your Present card',
    'Choose your Future card',
  ],
  zh: [
    '选择你的过去牌',
    '选择你的现在牌',
    '选择你的未来牌',
  ],
  es: [
    'Elige tu carta del Pasado',
    'Elige tu carta del Presente',
    'Elige tu carta del Futuro',
  ],
  de: [
    'Wähle deine Vergangenheitskarte',
    'Wähle deine Gegenwartskarte',
    'Wähle deine Zukunftskarte',
  ],
  hi: [
    'अपना भूतकाल का कार्ड चुनें',
    'अपना वर्तमान का कार्ड चुनें',
    'अपना भविष्य का कार्ड चुनें',
  ],
  ja: [
    '過去のカードを選ぶ',
    '現在のカードを選ぶ',
    '未来のカードを選ぶ',
  ],
};

export default function SlotIndicator({ lang, selectedCards, currentSlot }: SlotIndicatorProps) {
  const labels = positionLabels[lang] || positionLabels.en;

  return (
    <div className="text-center mb-6">
      {/* Prompt text */}
      {currentSlot < 3 && (
        <motion.p
          key={currentSlot}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-[Cormorant_Garamond] text-lg sm:text-xl italic mb-6"
          style={{ color: 'var(--color-sol-cream)' }}
        >
          {(promptLabels[lang] || promptLabels.en)[currentSlot]}
        </motion.p>
      )}

      {/* 3 card slots */}
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
                boxShadow: isActive
                  ? '0 0 20px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.15)'
                  : 'none',
              }}
              transition={{ duration: 0.4 }}
              className="relative w-16 h-24 sm:w-20 sm:h-30 rounded-lg border-2 flex flex-col items-center justify-center"
              style={{
                backgroundColor: isFilled
                  ? 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.08)'
                  : 'transparent',
              }}
            >
              {isFilled ? (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="card-back-design rounded w-12 h-18 sm:w-16 sm:h-24"
                />
              ) : (
                <span
                  className="font-[Cinzel_Decorative] text-xl sm:text-2xl"
                  style={{ color: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)' }}
                >
                  ?
                </span>
              )}

              {/* Position label */}
              <span
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-[Inter] text-[10px] sm:text-xs tracking-wider uppercase whitespace-nowrap"
                style={{
                  color: isFilled
                    ? 'var(--color-sol-gold)'
                    : 'var(--color-sol-ash)',
                  opacity: isFilled ? 1 : 0.6,
                }}
              >
                {labels[slotIndex]}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
