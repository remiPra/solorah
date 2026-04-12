import { motion } from 'framer-motion';
import type { NumerologyProfile } from '../../types/oracle-des-jours';
import { archetypes } from '../../data/oracle-des-jours/texts/archetypes';
import { intentionTexts } from '../../data/oracle-des-jours/texts/intentions';

interface PhaseProfileProps {
  lang: string;
  profile: NumerologyProfile;
  onContinue: () => void;
}

const labels: Record<string, { title: string; soul: string; lifePath: string; intention: string; button: string }> = {
  fr: { title: 'Votre profil numerologique', soul: "Nombre d'Ame", lifePath: 'Chemin de Vie', intention: "Nombre d'Intention", button: 'Voir mes 30 jours' },
  en: { title: 'Your numerological profile', soul: 'Soul Number', lifePath: 'Life Path', intention: 'Intention Number', button: 'See my 30 days' },
  zh: { title: '\u60A8\u7684\u6570\u5B57\u547D\u7406\u6982\u51B5', soul: '\u7075\u9B42\u6570\u5B57', lifePath: '\u751F\u547D\u4E4B\u8DEF', intention: '\u610F\u5FF5\u6570\u5B57', button: '\u67E5\u770B\u621130\u5929' },
  es: { title: 'Tu perfil numerologico', soul: 'Numero del Alma', lifePath: 'Camino de Vida', intention: 'Numero de Intencion', button: 'Ver mis 30 dias' },
  de: { title: 'Dein numerologisches Profil', soul: 'Seelenzahl', lifePath: 'Lebensweg', intention: 'Intentionszahl', button: 'Meine 30 Tage sehen' },
  hi: { title: '\u0906\u092A\u0915\u093E \u0905\u0902\u0915\u0936\u093E\u0938\u094D\u0924\u094D\u0930\u0940\u092F \u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932', soul: '\u0906\u0924\u094D\u092E\u093E \u0905\u0902\u0915', lifePath: '\u091C\u0940\u0935\u0928 \u092A\u0925', intention: '\u0907\u0930\u093E\u0926\u0947 \u0915\u093E \u0905\u0902\u0915', button: '\u092E\u0947\u0930\u0947 30 \u0926\u093F\u0928 \u0926\u0947\u0916\u0947\u0902' },
  ja: { title: '\u3042\u306A\u305F\u306E\u6570\u79D8\u8853\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB', soul: '\u9B42\u306E\u6570\u5B57', lifePath: '\u30E9\u30A4\u30D5\u30D1\u30B9', intention: '\u610F\u56F3\u306E\u6570\u5B57', button: '30\u65E5\u9593\u3092\u898B\u308B' },
};

export default function PhaseProfile({ lang, profile, onContinue }: PhaseProfileProps) {
  const t = labels[lang] || labels.en;
  const soulArchetype = archetypes[profile.soulNumber];
  const lifeArchetype = archetypes[profile.lifePath];
  const intentionMsg = intentionTexts[profile.intention];

  const items = [
    {
      label: t.soul,
      number: profile.soulNumber,
      name: soulArchetype?.name[lang] || soulArchetype?.name.en || '',
      description: soulArchetype?.description[lang] || soulArchetype?.description.en || '',
    },
    {
      label: t.lifePath,
      number: profile.lifePath,
      name: lifeArchetype?.name[lang] || lifeArchetype?.name.en || '',
      description: lifeArchetype?.description[lang] || lifeArchetype?.description.en || '',
    },
    {
      label: t.intention,
      number: profile.intention,
      name: '',
      description: intentionMsg?.[lang] || intentionMsg?.en || '',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100vh] flex items-center justify-center -mt-16 px-4 py-16"
    >
      <div className="w-full max-w-lg mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-[Cinzel_Decorative] text-2xl sm:text-3xl mb-12"
          style={{ color: 'var(--color-sol-gold)' }}
        >
          {t.title}
        </motion.h2>

        <div className="space-y-8 mb-12">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.3, duration: 0.5 }}
              className="p-6 rounded-sm"
              style={{
                border: '1px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.15)',
                backgroundColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.03)',
              }}
            >
              <p className="font-[Inter] text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--color-sol-ash)' }}>
                {item.label}
              </p>
              <p className="font-[Cinzel_Decorative] text-3xl mb-1" style={{ color: 'var(--color-sol-gold)' }}>
                {item.number}
              </p>
              {item.name && (
                <p className="font-[Cormorant_Garamond] text-xl italic mb-2" style={{ color: 'var(--color-sol-cream)' }}>
                  {item.name}
                </p>
              )}
              <p className="font-[Cormorant_Garamond] text-base leading-relaxed" style={{ color: 'var(--color-sol-cream)', opacity: 0.7 }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          onClick={onContinue}
          className="inline-flex items-center justify-center font-[Inter] tracking-wider uppercase text-sm font-semibold px-8 py-4 rounded-sm transition-all duration-300"
          style={{ backgroundColor: 'var(--color-sol-gold)', color: 'var(--color-sol-deep)' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold-light)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-sol-gold)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          {t.button}
        </motion.button>
      </div>
    </motion.div>
  );
}
