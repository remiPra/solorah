import { motion } from 'framer-motion';
import type { OracleResult, DayForecast } from '../../types/oracle-des-jours';
import DayCell from './DayCell';
import HarmonyBadge from './HarmonyBadge';

interface PhaseCalendarProps {
  lang: string;
  result: OracleResult;
  onSelectDay: (forecast: DayForecast) => void;
  onNewReading: () => void;
}

const summaryLabels: Record<string, { favorable: string; neutral: string; cautious: string; goldWindows: string; title: string; newReading: string }> = {
  fr: { favorable: 'jours favorables', neutral: 'neutres', cautious: 'prudents', goldWindows: "Fenetres d'or", title: 'Vos 30 prochains jours', newReading: 'Nouveau tirage' },
  en: { favorable: 'favorable days', neutral: 'neutral', cautious: 'cautious', goldWindows: 'Golden windows', title: 'Your next 30 days', newReading: 'New reading' },
  zh: { favorable: '\u5409\u65E5', neutral: '\u4E2D\u6027', cautious: '\u8C28\u614E', goldWindows: '\u9EC4\u91D1\u7A97\u53E3', title: '\u60A8\u7684\u672A\u676530\u5929', newReading: '\u65B0\u5360\u535C' },
  es: { favorable: 'dias favorables', neutral: 'neutros', cautious: 'prudentes', goldWindows: 'Ventanas de oro', title: 'Tus proximos 30 dias', newReading: 'Nueva lectura' },
  de: { favorable: 'gunstige Tage', neutral: 'neutrale', cautious: 'vorsichtige', goldWindows: 'Goldene Fenster', title: 'Deine nachsten 30 Tage', newReading: 'Neue Ziehung' },
  hi: { favorable: '\u0936\u0941\u092D \u0926\u093F\u0928', neutral: '\u0924\u091F\u0938\u094D\u0925', cautious: '\u0938\u093E\u0935\u0927\u093E\u0928', goldWindows: '\u0938\u0941\u0928\u0939\u0930\u0940 \u0916\u093F\u0921\u093C\u0915\u093F\u092F\u093E\u0901', title: '\u0906\u092A\u0915\u0947 \u0905\u0917\u0932\u0947 30 \u0926\u093F\u0928', newReading: '\u0928\u092F\u093E \u0924\u093E\u0936' },
  ja: { favorable: '\u5409\u65E5', neutral: '\u4E2D\u7ACB', cautious: '\u6CE8\u610F', goldWindows: '\u9EC4\u91D1\u306E\u7A93', title: '\u3042\u306A\u305F\u306E\u6B21\u306E30\u65E5\u9593', newReading: '\u65B0\u3057\u3044\u5360\u3044' },
};

const levelLabels: Record<string, Record<string, string>> = {
  gold: { fr: "Jour d'Or", en: 'Golden Day', zh: '\u9EC4\u91D1\u65E5', es: 'Dia de Oro', de: 'Goldener Tag', hi: '\u0938\u094D\u0935\u0930\u094D\u0923 \u0926\u093F\u0935\u0938', ja: '\u9EC4\u91D1\u306E\u65E5' },
  favorable: { fr: 'Favorable', en: 'Favorable', zh: '\u5409', es: 'Favorable', de: 'Gunstig', hi: '\u0936\u0941\u092D', ja: '\u5409' },
  neutral: { fr: 'Neutre', en: 'Neutral', zh: '\u4E2D', es: 'Neutro', de: 'Neutral', hi: '\u0924\u091F\u0938\u094D\u0925', ja: '\u4E2D\u7ACB' },
  cautious: { fr: 'Prudent', en: 'Cautious', zh: '\u614E', es: 'Prudente', de: 'Vorsichtig', hi: '\u0938\u093E\u0935\u0927\u093E\u0928', ja: '\u6CE8\u610F' },
  retreat: { fr: 'Retrait', en: 'Retreat', zh: '\u9000', es: 'Retiro', de: 'Ruckzug', hi: '\u0935\u093F\u0930\u093E\u092E', ja: '\u4F11\u606F' },
  withdraw: { fr: 'Repli', en: 'Withdraw', zh: '\u907F', es: 'Repliegue', de: 'Abzug', hi: '\u0935\u093E\u092A\u0938\u0940', ja: '\u64A4\u9000' },
};

export default function PhaseCalendar({ lang, result, onSelectDay, onNewReading }: PhaseCalendarProps) {
  const t = summaryLabels[lang] || summaryLabels.en;
  const { summary, forecasts } = result;
  const favTotal = summary.goldDays + summary.favorableDays;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="px-4 py-16 -mt-16 pt-24"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-[Cinzel_Decorative] text-2xl sm:text-3xl text-center mb-6"
          style={{ color: 'var(--color-sol-gold)' }}
        >
          {t.title}
        </motion.h2>

        {/* Summary bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-4 font-[Cormorant_Garamond] text-base"
          style={{ color: 'var(--color-sol-cream)' }}
        >
          <span><strong style={{ color: '#8bc34a' }}>{favTotal}</strong> {t.favorable}</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span><strong style={{ color: '#9e9e9e' }}>{summary.neutralDays}</strong> {t.neutral}</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span><strong style={{ color: '#ff9800' }}>{summary.cautiousDays}</strong> {t.cautious}</span>
        </motion.div>

        {summary.goldDays > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center font-[Cormorant_Garamond] text-lg italic mb-8"
            style={{ color: 'var(--color-sol-gold)' }}
          >
            &#10022; {t.goldWindows}: {summary.goldDates.join(', ')}
          </motion.p>
        )}

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(['gold', 'favorable', 'neutral', 'cautious', 'retreat', 'withdraw'] as const).map((level) => (
            <HarmonyBadge
              key={level}
              level={level}
              label={levelLabels[level]?.[lang] || levelLabels[level]?.en || level}
              compact
            />
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-3 mb-12">
          {forecasts.map((f, i) => (
            <DayCell
              key={i}
              forecast={f}
              index={i}
              onClick={() => onSelectDay(f)}
              lang={lang}
            />
          ))}
        </div>

        {/* New reading button */}
        <div className="text-center">
          <button
            onClick={onNewReading}
            className="font-[Inter] tracking-wider uppercase text-sm px-6 py-3 rounded-sm transition-all duration-300"
            style={{
              border: '1px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.5)',
              color: 'var(--color-sol-gold)',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            &#8635; {t.newReading}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export { levelLabels };
