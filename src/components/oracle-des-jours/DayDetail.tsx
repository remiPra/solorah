import { motion } from 'framer-motion';
import type { DayForecast, NumerologyProfile } from '../../types/oracle-des-jours';
import HarmonyBadge from './HarmonyBadge';
import MoonPhaseIcon from './MoonPhaseIcon';
import { openingTexts } from '../../data/oracle-des-jours/texts/openings';
import { planetaryTexts } from '../../data/oracle-des-jours/texts/planetary';
import { lunarTexts } from '../../data/oracle-des-jours/texts/lunar';
import { levelLabels } from './PhaseCalendar';

interface DayDetailProps {
  lang: string;
  forecast: DayForecast;
  profile: NumerologyProfile;
  onBack: () => void;
}

const planetLabels: Record<string, Record<string, string>> = {
  sun: { fr: 'Soleil', en: 'Sun', zh: '\u592A\u9633', es: 'Sol', de: 'Sonne', hi: '\u0938\u0942\u0930\u094D\u092F', ja: '\u592A\u967D' },
  moon: { fr: 'Lune', en: 'Moon', zh: '\u6708\u4EAE', es: 'Luna', de: 'Mond', hi: '\u091A\u0902\u0926\u094D\u0930\u092E\u093E', ja: '\u6708' },
  mars: { fr: 'Mars', en: 'Mars', zh: '\u706B\u661F', es: 'Marte', de: 'Mars', hi: '\u092E\u0902\u0917\u0932', ja: '\u706B\u661F' },
  mercury: { fr: 'Mercure', en: 'Mercury', zh: '\u6C34\u661F', es: 'Mercurio', de: 'Merkur', hi: '\u092C\u0941\u0927', ja: '\u6C34\u661F' },
  jupiter: { fr: 'Jupiter', en: 'Jupiter', zh: '\u6728\u661F', es: 'Jupiter', de: 'Jupiter', hi: '\u0917\u0941\u0930\u0941', ja: '\u6728\u661F' },
  venus: { fr: 'Venus', en: 'Venus', zh: '\u91D1\u661F', es: 'Venus', de: 'Venus', hi: '\u0936\u0941\u0915\u094D\u0930', ja: '\u91D1\u661F' },
  saturn: { fr: 'Saturne', en: 'Saturn', zh: '\u571F\u661F', es: 'Saturno', de: 'Saturn', hi: '\u0936\u0928\u093F', ja: '\u571F\u661F' },
};

const moonPhaseLabels: Record<string, Record<string, string>> = {
  'new': { fr: 'Nouvelle Lune', en: 'New Moon', zh: '\u65B0\u6708', es: 'Luna Nueva', de: 'Neumond', hi: '\u0905\u092E\u093E\u0935\u0938\u094D\u092F\u093E', ja: '\u65B0\u6708' },
  'waxC': { fr: 'Premier Croissant', en: 'Waxing Crescent', zh: '\u5CE8\u7709\u6708', es: 'Creciente', de: 'Zunehmende Sichel', hi: '\u092C\u0922\u093C\u0924\u093E \u0905\u0930\u094D\u0927\u091A\u0902\u0926\u094D\u0930', ja: '\u4E09\u65E5\u6708' },
  '1Q': { fr: 'Premier Quartier', en: 'First Quarter', zh: '\u4E0A\u5F26\u6708', es: 'Cuarto Creciente', de: 'Erstes Viertel', hi: '\u092A\u0939\u0932\u093E \u0924\u093F\u092E\u093E\u0939\u0940', ja: '\u4E0A\u5F26' },
  'waxG': { fr: 'Gibbeuse Croissante', en: 'Waxing Gibbous', zh: '\u76C8\u51F8\u6708', es: 'Gibosa Creciente', de: 'Zunehmender Mond', hi: '\u092C\u0922\u093C\u0924\u093E \u0909\u0924\u094D\u0924\u0932', ja: '\u5341\u4E09\u591C' },
  'full': { fr: 'Pleine Lune', en: 'Full Moon', zh: '\u6EE1\u6708', es: 'Luna Llena', de: 'Vollmond', hi: '\u092A\u0942\u0930\u094D\u0923\u093F\u092E\u093E', ja: '\u6E80\u6708' },
  'wanG': { fr: 'Gibbeuse Decroissante', en: 'Waning Gibbous', zh: '\u4E8F\u51F8\u6708', es: 'Gibosa Menguante', de: 'Abnehmender Mond', hi: '\u0918\u091F\u0924\u093E \u0909\u0924\u094D\u0924\u0932', ja: '\u5341\u516B\u591C' },
  '3Q': { fr: 'Dernier Quartier', en: 'Last Quarter', zh: '\u4E0B\u5F26\u6708', es: 'Cuarto Menguante', de: 'Letztes Viertel', hi: '\u0905\u0902\u0924\u093F\u092E \u0924\u093F\u092E\u093E\u0939\u0940', ja: '\u4E0B\u5F26' },
  'wanC': { fr: 'Dernier Croissant', en: 'Waning Crescent', zh: '\u6B8B\u6708', es: 'Menguante', de: 'Abnehmende Sichel', hi: '\u0918\u091F\u0924\u093E \u0905\u0930\u094D\u0927\u091A\u0902\u0926\u094D\u0930', ja: '\u4E8C\u5341\u516D\u591C' },
};

const backLabels: Record<string, string> = {
  fr: 'Retour au calendrier', en: 'Back to calendar', zh: '\u8FD4\u56DE\u65E5\u5386',
  es: 'Volver al calendario', de: 'Zuruck zum Kalender', hi: '\u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u092A\u0930 \u0935\u093E\u092A\u0938', ja: '\u30AB\u30EC\u30F3\u30C0\u30FC\u306B\u623B\u308B',
};

function formatFullDate(d: Date, lang: string): string {
  try {
    const locale = lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : lang;
    return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return d.toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
}

export default function DayDetail({ lang, forecast, profile, onBack }: DayDetailProps) {
  // Opening text (bloc 1)
  const openings = openingTexts[forecast.level];
  const openingIdx = Math.abs(forecast.dayNumber + forecast.ih) % openings.length;
  const openingText = openings[openingIdx]?.[lang] || openings[openingIdx]?.en || '';

  // Planetary text (bloc 2)
  const pTexts = planetaryTexts[forecast.planet];
  let planetaryText = '';
  if (forecast.c2 >= 3) {
    planetaryText = pTexts.favorable[lang] || pTexts.favorable.en;
  } else if (forecast.c2 >= 1) {
    planetaryText = pTexts.neutral[lang] || pTexts.neutral.en;
  } else {
    planetaryText = pTexts.unfavorable[lang] || pTexts.unfavorable.en;
  }

  // Lunar text (bloc 3)
  const lunarText = lunarTexts[forecast.moonPhase]?.[lang] || lunarTexts[forecast.moonPhase]?.en || '';

  const lvlLabel = levelLabels[forecast.level]?.[lang] || levelLabels[forecast.level]?.en || forecast.level;
  const planetName = planetLabels[forecast.planet]?.[lang] || planetLabels[forecast.planet]?.en || '';
  const moonName = moonPhaseLabels[forecast.moonPhase]?.[lang] || moonPhaseLabels[forecast.moonPhase]?.en || '';

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      className="px-4 py-16 -mt-16 pt-24"
    >
      <div className="max-w-lg mx-auto">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={onBack}
          className="font-[Inter] text-xs tracking-wider uppercase mb-8 flex items-center gap-2 transition-colors"
          style={{ color: 'var(--color-sol-gold)' }}
        >
          &#8592; {backLabels[lang] || backLabels.en}
        </motion.button>

        {/* Date + badge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-8">
          <p className="font-[Cormorant_Garamond] text-lg capitalize mb-3" style={{ color: 'var(--color-sol-cream)' }}>
            {formatFullDate(forecast.date, lang)}
          </p>
          <HarmonyBadge level={forecast.level} label={lvlLabel} ih={forecast.ih} />
        </motion.div>

        {/* Planet + Moon info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 mb-10"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg" style={{ color: 'var(--color-sol-gold)', opacity: 0.6 }}>&#9788;</span>
            <span className="font-[Inter] text-xs" style={{ color: 'var(--color-sol-ash)' }}>{planetName}</span>
          </div>
          <div className="flex items-center gap-2">
            <MoonPhaseIcon phase={forecast.moonPhase} size={18} />
            <span className="font-[Inter] text-xs" style={{ color: 'var(--color-sol-ash)' }}>{moonName}</span>
          </div>
        </motion.div>

        {/* 3 interpretation blocks */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="p-6 rounded-sm"
            style={{ borderLeft: '3px solid var(--color-sol-gold)', backgroundColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.03)' }}
          >
            <p className="font-[Cormorant_Garamond] text-xl italic leading-relaxed" style={{ color: 'var(--color-sol-cream)' }}>
              {openingText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="p-6 rounded-sm"
            style={{ borderLeft: '3px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)', backgroundColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.02)' }}
          >
            <p className="font-[Cormorant_Garamond] text-lg leading-relaxed" style={{ color: 'var(--color-sol-cream)', opacity: 0.9 }}>
              {planetaryText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="p-6 rounded-sm"
            style={{ borderLeft: '3px solid rgba(158,158,158,0.3)', backgroundColor: 'rgba(158,158,158,0.02)' }}
          >
            <p className="font-[Cormorant_Garamond] text-lg italic leading-relaxed" style={{ color: 'var(--color-sol-cream)', opacity: 0.8 }}>
              {lunarText}
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="flex items-center justify-center gap-4 my-10"
        >
          <div className="flex-1 max-w-24 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))' }} />
          <span style={{ color: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)' }}>&#10022;</span>
          <div className="flex-1 max-w-24 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))' }} />
        </motion.div>

        {/* Back to calendar */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="font-[Inter] tracking-wider uppercase text-sm px-6 py-3 rounded-sm transition-all duration-300"
            style={{
              border: '1px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.5)',
              color: 'var(--color-sol-gold)',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            &#8592; {backLabels[lang] || backLabels.en}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
