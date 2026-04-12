import { motion } from 'framer-motion';
import type { BaseNumber } from '../../types/oracle-des-jours';

interface PhaseIntentionProps {
  lang: string;
  onSelect: (n: BaseNumber) => void;
}

const labels: Record<string, { title: string; guide: string }> = {
  fr: {
    title: "Nombre d'Intention",
    guide: "Fermez les yeux un instant. Pensez a la question, la decision ou le projet qui vous tient a coeur. Ne l'ecrivez pas \u2014 gardez-le dans votre coeur. Quand vous etes pret(e), choisissez un chiffre qui vient a vous spontanement.",
  },
  en: {
    title: 'Intention Number',
    guide: "Close your eyes for a moment. Think of the question, decision, or project close to your heart. Don't write it down \u2014 keep it in your heart. When you're ready, choose a number that comes to you spontaneously.",
  },
  zh: {
    title: '\u610F\u5FF5\u6570\u5B57',
    guide: '\u95ED\u4E0A\u773C\u775B\u7247\u523B\u3002\u60F3\u60F3\u90A3\u4E2A\u4F60\u5FC3\u4E2D\u7684\u95EE\u9898\u3001\u51B3\u5B9A\u6216\u8BA1\u5212\u3002\u4E0D\u8981\u5199\u4E0B\u6765\u2014\u2014\u628A\u5B83\u7559\u5728\u5FC3\u91CC\u3002\u5F53\u4F60\u51C6\u5907\u597D\u4E86\uFF0C\u9009\u62E9\u4E00\u4E2A\u81EA\u7136\u6D6E\u73B0\u7684\u6570\u5B57\u3002',
  },
  es: {
    title: 'Numero de Intencion',
    guide: 'Cierra los ojos un momento. Piensa en la pregunta, decision o proyecto que te importa. No lo escribas \u2014 guardalo en tu corazon. Cuando estes listo(a), elige un numero que te venga espontaneamente.',
  },
  de: {
    title: 'Intentionszahl',
    guide: 'Schliesse einen Moment die Augen. Denke an die Frage, Entscheidung oder das Projekt, das dir am Herzen liegt. Schreibe es nicht auf \u2014 bewahre es in deinem Herzen. Wahle eine Zahl, die dir spontan in den Sinn kommt.',
  },
  hi: {
    title: '\u0907\u0930\u093E\u0926\u0947 \u0915\u093E \u0905\u0902\u0915',
    guide: '\u090F\u0915 \u092A\u0932 \u0915\u0947 \u0932\u093F\u090F \u0906\u0901\u0916\u0947\u0902 \u092C\u0902\u0926 \u0915\u0930\u0947\u0902\u0964 \u0909\u0938 \u0938\u0935\u093E\u0932, \u0928\u093F\u0930\u094D\u0923\u092F \u092F\u093E \u092A\u0930\u093F\u092F\u094B\u091C\u0928\u093E \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u0938\u094B\u091A\u0947\u0902 \u091C\u094B \u0906\u092A\u0915\u0947 \u0926\u093F\u0932 \u0915\u0947 \u0915\u0930\u0940\u092C \u0939\u0948\u0964 \u0907\u0938\u0947 \u0932\u093F\u0916\u0947\u0902 \u0928\u0939\u0940\u0902 \u2014 \u0905\u092A\u0928\u0947 \u0926\u093F\u0932 \u092E\u0947\u0902 \u0930\u0916\u0947\u0902\u0964 \u091C\u092C \u0924\u0948\u092F\u093E\u0930 \u0939\u094B\u0902, \u090F\u0915 \u0905\u0902\u0915 \u091A\u0941\u0928\u0947\u0902 \u091C\u094B \u0938\u094D\u0935\u0924\u0903 \u0906\u090F\u0964',
  },
  ja: {
    title: '\u610F\u56F3\u306E\u6570\u5B57',
    guide: '\u4E00\u77AC\u76EE\u3092\u9589\u3058\u3066\u304F\u3060\u3055\u3044\u3002\u5FC3\u306B\u3042\u308B\u554F\u3044\u3001\u6C7A\u65AD\u3001\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3092\u601D\u3044\u6D6E\u304B\u3079\u3066\u304F\u3060\u3055\u3044\u3002\u66F8\u304D\u7559\u3081\u305A\u2014\u2014\u5FC3\u306B\u7559\u3081\u3066\u304A\u3044\u3066\u304F\u3060\u3055\u3044\u3002\u6E96\u5099\u304C\u3067\u304D\u305F\u3089\u3001\u81EA\u7136\u306B\u6D6E\u304B\u3093\u3060\u6570\u5B57\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002',
  },
};

export default function PhaseIntention({ lang, onSelect }: PhaseIntentionProps) {
  const t = labels[lang] || labels.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-[100vh] flex items-center justify-center -mt-16 px-4"
    >
      <div className="w-full max-w-lg mx-auto text-center">
        <h2
          className="font-[Cinzel_Decorative] text-2xl sm:text-3xl mb-6"
          style={{ color: 'var(--color-sol-gold)' }}
        >
          {t.title}
        </h2>
        <p
          className="font-[Cormorant_Garamond] text-lg italic leading-relaxed mb-12"
          style={{ color: 'var(--color-sol-cream)', opacity: 0.8 }}
        >
          {t.guide}
        </p>
        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
          {([1, 2, 3, 4, 5, 6, 7, 8, 9] as BaseNumber[]).map((n) => (
            <motion.button
              key={n}
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(n)}
              className="aspect-square flex items-center justify-center font-[Cinzel_Decorative] text-2xl rounded-sm transition-all duration-300 cursor-pointer"
              style={{
                color: 'var(--color-sol-gold)',
                border: '1px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)',
                backgroundColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.05)',
              }}
            >
              {n}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
