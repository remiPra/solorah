import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { OraclePhase, BaseNumber, DayForecast, OracleResult } from '../../types/oracle-des-jours';
import { generateOracleResult } from '../../data/oracle-des-jours/day-calculator';
import PhaseIntro from './PhaseIntro';
import PhaseNameInput from './PhaseNameInput';
import PhaseBirthDate from './PhaseBirthDate';
import PhaseIntention from './PhaseIntention';
import PhaseProfile from './PhaseProfile';
import PhaseCalendar from './PhaseCalendar';
import DayDetail from './DayDetail';

interface OracleDesJoursProps {
  lang: string;
}

const computingTexts: Record<string, string> = {
  fr: 'Les astres s\'alignent...', en: 'The stars are aligning...',
  zh: '\u661F\u8FB0\u6B63\u5728\u6392\u5217\u2026', es: 'Los astros se alinean...',
  de: 'Die Sterne richten sich aus...', hi: '\u0924\u093E\u0930\u0947 \u0938\u0902\u0930\u0947\u0916\u093F\u0924 \u0939\u094B \u0930\u0939\u0947 \u0939\u0948\u0902...', ja: '\u661F\u304C\u4E26\u3073\u59CB\u3081\u3066\u3044\u308B\u2026',
};

export default function OracleDesJours({ lang }: OracleDesJoursProps) {
  const [phase, setPhase] = useState<OraclePhase>('intro');
  const [firstName, setFirstName] = useState('');
  const [birthDay, setBirthDay] = useState(0);
  const [birthMonth, setBirthMonth] = useState(0);
  const [birthYear, setBirthYear] = useState(0);
  const [result, setResult] = useState<OracleResult | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayForecast | null>(null);

  const handleNameSubmit = useCallback((name: string) => {
    setFirstName(name);
    setPhase('birthdate');
  }, []);

  const handleBirthSubmit = useCallback((day: number, month: number, year: number) => {
    setBirthDay(day);
    setBirthMonth(month);
    setBirthYear(year);
    setPhase('intention');
  }, []);

  const handleIntentionSelect = useCallback((n: BaseNumber) => {
    setPhase('computing');
    // Simulate computation delay for dramatic effect
    setTimeout(() => {
      const oracle = generateOracleResult(firstName, birthDay, birthMonth, birthYear, n);
      setResult(oracle);
      setPhase('profile');
    }, 1500);
  }, [firstName, birthDay, birthMonth, birthYear]);

  const handleSelectDay = useCallback((forecast: DayForecast) => {
    setSelectedDay(forecast);
    setPhase('day-detail');
  }, []);

  const handleBackToCalendar = useCallback(() => {
    setSelectedDay(null);
    setPhase('calendar');
  }, []);

  const handleNewReading = useCallback(() => {
    setPhase('intro');
    setFirstName('');
    setResult(null);
    setSelectedDay(null);
  }, []);

  return (
    <div className="relative" style={{ minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <PhaseIntro key="intro" lang={lang} onNext={() => setPhase('name')} />
        )}

        {phase === 'name' && (
          <PhaseNameInput key="name" lang={lang} onSubmit={handleNameSubmit} />
        )}

        {phase === 'birthdate' && (
          <PhaseBirthDate key="birthdate" lang={lang} onSubmit={handleBirthSubmit} />
        )}

        {phase === 'intention' && (
          <PhaseIntention key="intention" lang={lang} onSelect={handleIntentionSelect} />
        )}

        {phase === 'computing' && (
          <motion.div
            key="computing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[100vh] flex flex-col items-center justify-center -mt-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="text-5xl mb-8"
              style={{ color: 'var(--color-sol-gold)', opacity: 0.5 }}
            >
              &#10022;
            </motion.div>
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-[Cormorant_Garamond] text-xl italic"
              style={{ color: 'var(--color-sol-cream)' }}
            >
              {computingTexts[lang] || computingTexts.en}
            </motion.p>
          </motion.div>
        )}

        {phase === 'profile' && result && (
          <PhaseProfile
            key="profile"
            lang={lang}
            profile={result.profile}
            onContinue={() => setPhase('calendar')}
          />
        )}

        {phase === 'calendar' && result && (
          <PhaseCalendar
            key="calendar"
            lang={lang}
            result={result}
            onSelectDay={handleSelectDay}
            onNewReading={handleNewReading}
          />
        )}

        {phase === 'day-detail' && result && selectedDay && (
          <DayDetail
            key="day-detail"
            lang={lang}
            forecast={selectedDay}
            profile={result.profile}
            onBack={handleBackToCalendar}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
