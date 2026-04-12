import { useState } from 'react';
import { motion } from 'framer-motion';

interface PhaseNameInputProps {
  lang: string;
  onSubmit: (name: string) => void;
}

const labels: Record<string, { title: string; placeholder: string; button: string }> = {
  fr: { title: 'Votre prenom', placeholder: 'Entrez votre prenom', button: 'Continuer' },
  en: { title: 'Your first name', placeholder: 'Enter your first name', button: 'Continue' },
  zh: { title: '\u60A8\u7684\u540D\u5B57', placeholder: '\u8F93\u5165\u60A8\u7684\u540D\u5B57', button: '\u7EE7\u7EED' },
  es: { title: 'Tu nombre', placeholder: 'Ingresa tu nombre', button: 'Continuar' },
  de: { title: 'Dein Vorname', placeholder: 'Gib deinen Vornamen ein', button: 'Weiter' },
  hi: { title: '\u0906\u092A\u0915\u093E \u0928\u093E\u092E', placeholder: '\u0905\u092A\u0928\u093E \u0928\u093E\u092E \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902', button: '\u0906\u0917\u0947 \u092C\u0922\u093C\u0947\u0902' },
  ja: { title: '\u304A\u540D\u524D', placeholder: '\u540D\u524D\u3092\u5165\u529B', button: '\u6B21\u3078' },
};

export default function PhaseNameInput({ lang, onSubmit }: PhaseNameInputProps) {
  const [name, setName] = useState('');
  const t = labels[lang] || labels.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length >= 2) onSubmit(name.trim());
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
          &#10023;
        </motion.div>
        <h2
          className="font-[Cinzel_Decorative] text-2xl sm:text-3xl mb-8"
          style={{ color: 'var(--color-sol-gold)' }}
        >
          {t.title}
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.placeholder}
          autoFocus
          className="w-full text-center font-[Cormorant_Garamond] text-2xl py-4 px-6 bg-transparent border-b-2 outline-none transition-colors duration-300 mb-12"
          style={{
            color: 'var(--color-sol-cream)',
            borderColor: name.length >= 2 ? 'var(--color-sol-gold)' : 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2)',
          }}
        />
        <motion.button
          type="submit"
          disabled={name.trim().length < 2}
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
