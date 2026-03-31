import { motion } from 'framer-motion';
import type { SelectedCrossCard, CrossPosition } from '../../types/card';

interface CrossSlotIndicatorProps {
  lang: string;
  selectedCards: SelectedCrossCard[];
  currentSlot: number;
}

const positions: CrossPosition[] = ['situation', 'obstacle', 'past', 'future', 'synthesis'];

const positionLabels: Record<string, Record<CrossPosition, string>> = {
  fr: { situation: 'Situation', obstacle: 'Obstacle', past: 'Passé', future: 'Futur', synthesis: 'Synthèse' },
  en: { situation: 'Situation', obstacle: 'Obstacle', past: 'Past', future: 'Future', synthesis: 'Synthesis' },
  zh: { situation: '现状', obstacle: '障碍', past: '过去', future: '未来', synthesis: '综合' },
  es: { situation: 'Situación', obstacle: 'Obstáculo', past: 'Pasado', future: 'Futuro', synthesis: 'Síntesis' },
  de: { situation: 'Situation', obstacle: 'Hindernis', past: 'Vergangenheit', future: 'Zukunft', synthesis: 'Synthese' },
  hi: { situation: 'स्थिति', obstacle: 'बाधा', past: 'भूतकाल', future: 'भविष्य', synthesis: 'संश्लेषण' },
  ja: { situation: '現状', obstacle: '障害', past: '過去', future: '未来', synthesis: '総合' },
};

const promptLabels: Record<string, string[]> = {
  fr: [
    'Choisis ta carte Situation',
    'Choisis ta carte Obstacle',
    'Choisis ta carte Passé',
    'Choisis ta carte Futur',
    'Choisis ta carte Synthèse',
  ],
  en: [
    'Choose your Situation card',
    'Choose your Obstacle card',
    'Choose your Past card',
    'Choose your Future card',
    'Choose your Synthesis card',
  ],
  zh: [
    '选择你的现状牌',
    '选择你的障碍牌',
    '选择你的过去牌',
    '选择你的未来牌',
    '选择你的综合牌',
  ],
  es: [
    'Elige tu carta de Situación',
    'Elige tu carta de Obstáculo',
    'Elige tu carta del Pasado',
    'Elige tu carta del Futuro',
    'Elige tu carta de Síntesis',
  ],
  de: [
    'Wähle deine Situationskarte',
    'Wähle deine Hinderniskarte',
    'Wähle deine Vergangenheitskarte',
    'Wähle deine Zukunftskarte',
    'Wähle deine Synthesekarte',
  ],
  hi: [
    'अपना स्थिति कार्ड चुनें',
    'अपना बाधा कार्ड चुनें',
    'अपना भूतकाल कार्ड चुनें',
    'अपना भविष्य कार्ड चुनें',
    'अपना संश्लेषण कार्ड चुनें',
  ],
  ja: [
    '現状のカードを選ぶ',
    '障害のカードを選ぶ',
    '過去のカードを選ぶ',
    '未来のカードを選ぶ',
    '総合のカードを選ぶ',
  ],
};

export default function CrossSlotIndicator({ lang, selectedCards, currentSlot }: CrossSlotIndicatorProps) {
  const labels = positionLabels[lang] || positionLabels.en;

  return (
    <div className="text-center mb-6">
      {/* Prompt text */}
      {currentSlot < 5 && (
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

      {/* 5 card slots */}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {positions.map((pos, slotIndex) => {
          const isFilled = slotIndex < selectedCards.length;
          const isActive = slotIndex === currentSlot;

          return (
            <motion.div
              key={pos}
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
              className="relative w-12 h-18 sm:w-16 sm:h-24 rounded-lg border-2 flex flex-col items-center justify-center"
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
                  className="card-back-design rounded w-9 h-14 sm:w-12 sm:h-18"
                />
              ) : (
                <span
                  className="font-[Cinzel_Decorative] text-lg sm:text-xl"
                  style={{ color: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)' }}
                >
                  ?
                </span>
              )}

              {/* Position label */}
              <span
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-[Inter] text-[8px] sm:text-[10px] tracking-wider uppercase whitespace-nowrap"
                style={{
                  color: isFilled
                    ? 'var(--color-sol-gold)'
                    : 'var(--color-sol-ash)',
                  opacity: isFilled ? 1 : 0.6,
                }}
              >
                {labels[pos]}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
