import { useState } from 'react';
import { motion } from 'framer-motion';

interface PhaseBirthDateProps {
  lang: string;
  onSubmit: (day: number, month: number, year: number) => void;
}

const labels: Record<string, { title: string; day: string; month: string; year: string; button: string; months: string[] }> = {
  fr: {
    title: 'Date de naissance',
    day: 'Jour', month: 'Mois', year: 'Annee', button: 'Continuer',
    months: ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
  },
  en: {
    title: 'Date of birth',
    day: 'Day', month: 'Month', year: 'Year', button: 'Continue',
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  },
  zh: {
    title: '\u51FA\u751F\u65E5\u671F',
    day: '\u65E5', month: '\u6708', year: '\u5E74', button: '\u7EE7\u7EED',
    months: ['1\u6708','2\u6708','3\u6708','4\u6708','5\u6708','6\u6708','7\u6708','8\u6708','9\u6708','10\u6708','11\u6708','12\u6708'],
  },
  es: {
    title: 'Fecha de nacimiento',
    day: 'Dia', month: 'Mes', year: 'Ano', button: 'Continuar',
    months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  },
  de: {
    title: 'Geburtsdatum',
    day: 'Tag', month: 'Monat', year: 'Jahr', button: 'Weiter',
    months: ['Januar','Februar','Marz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
  },
  hi: {
    title: '\u091C\u0928\u094D\u092E \u0924\u093F\u0925\u093F',
    day: '\u0926\u093F\u0928', month: '\u092E\u0939\u0940\u0928\u093E', year: '\u0935\u0930\u094D\u0937', button: '\u0906\u0917\u0947 \u092C\u0922\u093C\u0947\u0902',
    months: ['\u091C\u0928\u0935\u0930\u0940','\u092B\u0930\u0935\u0930\u0940','\u092E\u093E\u0930\u094D\u091A','\u0905\u092A\u094D\u0930\u0948\u0932','\u092E\u0908','\u091C\u0942\u0928','\u091C\u0941\u0932\u093E\u0908','\u0905\u0917\u0938\u094D\u0924','\u0938\u093F\u0924\u0902\u092C\u0930','\u0905\u0915\u094D\u091F\u0942\u092C\u0930','\u0928\u0935\u0902\u092C\u0930','\u0926\u093F\u0938\u0902\u092C\u0930'],
  },
  ja: {
    title: '\u751F\u5E74\u6708\u65E5',
    day: '\u65E5', month: '\u6708', year: '\u5E74', button: '\u6B21\u3078',
    months: ['1\u6708','2\u6708','3\u6708','4\u6708','5\u6708','6\u6708','7\u6708','8\u6708','9\u6708','10\u6708','11\u6708','12\u6708'],
  },
};

export default function PhaseBirthDate({ lang, onSubmit }: PhaseBirthDateProps) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const t = labels[lang] || labels.en;

  const isValid = () => {
    const d = parseInt(day), m = parseInt(month), y = parseInt(year);
    return d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1900 && y <= 2025;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid()) onSubmit(parseInt(day), parseInt(month), parseInt(year));
  };

  const inputStyle = {
    color: 'var(--color-sol-cream)',
    backgroundColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.05)',
    borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-[100vh] flex items-center justify-center -mt-16 px-4"
    >
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl mb-6"
        >
          &#9790;
        </motion.div>
        <h2
          className="font-[Cinzel_Decorative] text-2xl sm:text-3xl mb-10"
          style={{ color: 'var(--color-sol-gold)' }}
        >
          {t.title}
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div>
            <label className="block font-[Inter] text-xs tracking-wider uppercase mb-2" style={{ color: 'var(--color-sol-ash)' }}>
              {t.day}
            </label>
            <input
              type="number"
              min="1" max="31"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="15"
              className="w-full text-center font-[Cormorant_Garamond] text-2xl py-3 bg-transparent border rounded-sm outline-none transition-colors focus:border-[var(--color-sol-gold)]"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block font-[Inter] text-xs tracking-wider uppercase mb-2" style={{ color: 'var(--color-sol-ash)' }}>
              {t.month}
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full text-center font-[Cormorant_Garamond] text-lg py-3.5 bg-transparent border rounded-sm outline-none transition-colors focus:border-[var(--color-sol-gold)] appearance-none cursor-pointer"
              style={inputStyle}
            >
              <option value="" style={{ backgroundColor: '#0a0a0a' }}>--</option>
              {t.months.map((m, i) => (
                <option key={i} value={i + 1} style={{ backgroundColor: '#0a0a0a' }}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-[Inter] text-xs tracking-wider uppercase mb-2" style={{ color: 'var(--color-sol-ash)' }}>
              {t.year}
            </label>
            <input
              type="number"
              min="1900" max="2025"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="1985"
              className="w-full text-center font-[Cormorant_Garamond] text-2xl py-3 bg-transparent border rounded-sm outline-none transition-colors focus:border-[var(--color-sol-gold)]"
              style={inputStyle}
            />
          </div>
        </div>
        <motion.button
          type="submit"
          disabled={!isValid()}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center font-[Inter] tracking-wider uppercase text-sm font-semibold px-8 py-4 rounded-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--color-sol-gold)', color: 'var(--color-sol-deep)' }}
          onMouseEnter={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold-light)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)'; }}}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          {t.button}
        </motion.button>
      </form>
    </motion.div>
  );
}
