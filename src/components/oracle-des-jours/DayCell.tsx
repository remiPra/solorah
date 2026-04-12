import { motion } from 'framer-motion';
import type { DayForecast } from '../../types/oracle-des-jours';
import { LEVEL_COLORS } from './HarmonyBadge';
import MoonPhaseIcon from './MoonPhaseIcon';

interface DayCellProps {
  forecast: DayForecast;
  index: number;
  onClick: () => void;
  lang: string;
}

const WEEKDAY_SHORT: Record<string, string[]> = {
  fr: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
  en: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  zh: ['\u65E5','\u4E00','\u4E8C','\u4E09','\u56DB','\u4E94','\u516D'],
  es: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
  de: ['So','Mo','Di','Mi','Do','Fr','Sa'],
  hi: ['\u0930\u0935\u093F','\u0938\u094B\u092E','\u092E\u0902\u0917\u0932','\u092C\u0941\u0927','\u0917\u0941\u0930\u0941','\u0936\u0941\u0915\u094D\u0930','\u0936\u0928\u093F'],
  ja: ['\u65E5','\u6708','\u706B','\u6C34','\u6728','\u91D1','\u571F'],
};

export default function DayCell({ forecast, index, onClick, lang }: DayCellProps) {
  const c = LEVEL_COLORS[forecast.level];
  const weekdays = WEEKDAY_SHORT[lang] || WEEKDAY_SHORT.en;
  const dayOfWeek = weekdays[forecast.date.getDay()];

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      whileHover={{ scale: 1.08, boxShadow: c.glow || `0 0 15px ${c.border}` }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-sm cursor-pointer transition-all duration-200 aspect-square"
      style={{
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
      }}
    >
      <span className="font-[Inter] text-[10px] tracking-wider uppercase" style={{ color: c.text, opacity: 0.6 }}>
        {dayOfWeek}
      </span>
      <span className="font-[Cinzel_Decorative] text-lg sm:text-xl font-bold" style={{ color: c.text }}>
        {forecast.dayNumber}
      </span>
      <div className="absolute top-1 right-1">
        <MoonPhaseIcon phase={forecast.moonPhase} size={12} />
      </div>
      {forecast.level === 'gold' && (
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-sm pointer-events-none"
          style={{ boxShadow: '0 0 15px rgba(212,168,83,0.3), inset 0 0 15px rgba(212,168,83,0.1)' }}
        />
      )}
      {forecast.isMasterDay && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[8px]" style={{ color: c.text, opacity: 0.5 }}>
          &#10022;
        </span>
      )}
    </motion.button>
  );
}
