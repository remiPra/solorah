import type { PlanetKey } from '../../../types/oracle-des-jours';

type L = Record<string, string>;

interface PlanetaryText {
  favorable: L;
  neutral: L;
  unfavorable: L;
}

export const planetaryTexts: Record<PlanetKey, PlanetaryText> = {
  // ─────────────────────────────────────────────
  // SUN  (Sunday, NP = 1)
  // ─────────────────────────────────────────────
  sun: {
    favorable: {
      fr: "Le Soleil illumine cette journee et votre chemin avec lui. Clarte mentale, energie vitale, confiance en soi.",
      en: "The Sun illuminates this day and your path with it. Mental clarity, vital energy, self-confidence.",
      zh: "\u592A\u9633\u7167\u4EAE\u4E86\u8FD9\u4E00\u5929\uFF0C\u4E5F\u7167\u4EAE\u4E86\u60A8\u7684\u524D\u8DEF\u3002\u601D\u7EF4\u6E05\u6670\uFF0C\u751F\u547D\u529B\u5145\u6C9B\uFF0C\u81EA\u4FE1\u6EE1\u6EE1\u3002",
      es: "El Sol ilumina este dia y tu camino con el. Claridad mental, energia vital, confianza en ti mismo.",
      de: "Die Sonne erleuchtet diesen Tag und Ihren Weg mit ihr. Geistige Klarheit, Lebensenergie, Selbstvertrauen.",
      hi: "\u0938\u0942\u0930\u094D\u092F \u0907\u0938 \u0926\u093F\u0928 \u0915\u094B \u0914\u0930 \u0906\u092A\u0915\u0947 \u092E\u093E\u0930\u094D\u0917 \u0915\u094B \u092A\u094D\u0930\u0915\u093E\u0936\u093F\u0924 \u0915\u0930 \u0930\u0939\u093E \u0939\u0948\u0964 \u092E\u093E\u0928\u0938\u093F\u0915 \u0938\u094D\u092A\u0937\u094D\u091F\u0924\u093E, \u091C\u0940\u0935\u0928 \u090A\u0930\u094D\u091C\u093E, \u0906\u0924\u094D\u092E\u0935\u093F\u0936\u094D\u0935\u093E\u0938\u0964",
      ja: "\u592A\u967D\u304C\u3053\u306E\u65E5\u3068\u3042\u306A\u305F\u306E\u9053\u3092\u7167\u3089\u3057\u3066\u3044\u307E\u3059\u3002\u601D\u8003\u306E\u660E\u6676\u3055\u3001\u751F\u547D\u529B\u3001\u81EA\u4FE1\u304C\u6E80\u3061\u3066\u3044\u307E\u3059\u3002",
    },
    neutral: {
      fr: "Le Soleil eclaire sans insister. L'energie est presente mais attend votre initiative.",
      en: "The Sun shines without insistence. The energy is present but awaits your initiative.",
      zh: "\u592A\u9633\u9759\u9759\u5730\u7167\u8000\u7740\u3002\u80FD\u91CF\u5DF2\u7ECF\u5B58\u5728\uFF0C\u4F46\u5728\u7B49\u5F85\u60A8\u7684\u4E3B\u52A8\u3002",
      es: "El Sol alumbra sin insistir. La energia esta presente pero espera tu iniciativa.",
      de: "Die Sonne scheint ohne zu drangen. Die Energie ist vorhanden, wartet aber auf Ihre Initiative.",
      hi: "\u0938\u0942\u0930\u094D\u092F \u092C\u093F\u0928\u093E \u091C\u094B\u0930 \u0926\u093F\u090F \u092A\u094D\u0930\u0915\u093E\u0936\u093F\u0924 \u0939\u094B \u0930\u0939\u093E \u0939\u0948\u0964 \u090A\u0930\u094D\u091C\u093E \u092E\u094C\u091C\u0942\u0926 \u0939\u0948 \u092A\u0930 \u0906\u092A\u0915\u0940 \u092A\u0939\u0932 \u0915\u0940 \u092A\u094D\u0930\u0924\u0940\u0915\u094D\u0937\u093E \u092E\u0947\u0902 \u0939\u0948\u0964",
      ja: "\u592A\u967D\u306F\u63A7\u3048\u3081\u306B\u8F1D\u3044\u3066\u3044\u307E\u3059\u3002\u30A8\u30CD\u30EB\u30AE\u30FC\u306F\u5B58\u5728\u3057\u307E\u3059\u304C\u3001\u3042\u306A\u305F\u306E\u4E3B\u4F53\u6027\u3092\u5F85\u3063\u3066\u3044\u307E\u3059\u3002",
    },
    unfavorable: {
      fr: "Le Soleil brule fort mais cette chaleur ne vous profite pas aujourd'hui. Menagez votre energie.",
      en: "The Sun burns brightly but its heat does not serve you today. Conserve your energy.",
      zh: "\u592A\u9633\u71C3\u70E7\u5F97\u731B\u70C8\uFF0C\u4F46\u8FD9\u80A1\u70ED\u91CF\u4ECA\u5929\u5E76\u4E0D\u5229\u4E8E\u60A8\u3002\u8BF7\u4FDD\u5B58\u60A8\u7684\u7CBE\u529B\u3002",
      es: "El Sol quema con fuerza pero su calor no te beneficia hoy. Cuida tu energia.",
      de: "Die Sonne brennt stark, doch ihre Hitze nutzt Ihnen heute nicht. Schonen Sie Ihre Energie.",
      hi: "\u0938\u0942\u0930\u094D\u092F \u0924\u0947\u091C\u0940 \u0938\u0947 \u091C\u0932 \u0930\u0939\u093E \u0939\u0948 \u0932\u0947\u0915\u093F\u0928 \u092F\u0939 \u0924\u093E\u092A \u0906\u091C \u0906\u092A\u0915\u0947 \u0932\u093F\u090F \u0932\u093E\u092D\u0926\u093E\u092F\u0915 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u0905\u092A\u0928\u0940 \u090A\u0930\u094D\u091C\u093E \u0938\u0902\u092D\u093E\u0932\u0947\u0902\u0964",
      ja: "\u592A\u967D\u306F\u5F37\u304F\u71C3\u3048\u3066\u3044\u307E\u3059\u304C\u3001\u305D\u306E\u71B1\u306F\u4ECA\u65E5\u3042\u306A\u305F\u306B\u306F\u5F79\u7ACB\u3061\u307E\u305B\u3093\u3002\u30A8\u30CD\u30EB\u30AE\u30FC\u3092\u6E29\u5B58\u3057\u307E\u3057\u3087\u3046\u3002",
    },
  },

  // ─────────────────────────────────────────────
  // MOON  (Monday, NP = 2)
  // ─────────────────────────────────────────────
  moon: {
    favorable: {
      fr: "La Lune entre en resonance avec votre chemin. Votre intuition est aiguisee. Fiez-vous a vos ressentis.",
      en: "The Moon resonates with your path. Your intuition is sharp. Trust your feelings.",
      zh: "\u6708\u4EAE\u4E0E\u60A8\u7684\u9053\u8DEF\u4EA7\u751F\u4E86\u5171\u9E23\u3002\u60A8\u7684\u76F4\u89C9\u654F\u9510\u800C\u6E05\u6670\u3002\u8BF7\u4FE1\u4EFB\u60A8\u7684\u611F\u53D7\u3002",
      es: "La Luna entra en resonancia con tu camino. Tu intuicion esta afilada. Confiate a tus sentimientos.",
      de: "Der Mond schwingt mit Ihrem Weg mit. Ihre Intuition ist geschart. Vertrauen Sie Ihren Empfindungen.",
      hi: "\u091A\u0902\u0926\u094D\u0930\u092E\u093E \u0906\u092A\u0915\u0947 \u092E\u093E\u0930\u094D\u0917 \u0915\u0947 \u0938\u093E\u0925 \u0905\u0928\u0941\u0928\u093E\u0926 \u092E\u0947\u0902 \u0939\u0948\u0964 \u0906\u092A\u0915\u0940 \u0905\u0902\u0924\u0930\u094D\u091C\u094D\u091E\u093E\u0928 \u0924\u0940\u0915\u094D\u0937\u094D\u0923 \u0939\u0948\u0964 \u0905\u092A\u0928\u0940 \u0905\u0928\u0941\u092D\u0942\u0924\u093F\u092F\u094B\u0902 \u092A\u0930 \u092D\u0930\u094B\u0938\u093E \u0915\u0930\u0947\u0902\u0964",
      ja: "\u6708\u304C\u3042\u306A\u305F\u306E\u9053\u3068\u5171\u9CF4\u3057\u3066\u3044\u307E\u3059\u3002\u76F4\u611F\u304C\u7814\u304E\u6F84\u307E\u3055\u308C\u3066\u3044\u307E\u3059\u3002\u81EA\u5206\u306E\u611F\u899A\u3092\u4FE1\u3058\u307E\u3057\u3087\u3046\u3002",
    },
    neutral: {
      fr: "La Lune veille en silence. Les emotions sont calmes, ni porteuses ni perturbatrices.",
      en: "The Moon watches in silence. Emotions are calm, neither uplifting nor disturbing.",
      zh: "\u6708\u4EAE\u9759\u9ED8\u5730\u5B88\u671B\u7740\u3002\u60C5\u7EEA\u5E73\u9759\uFF0C\u65E2\u4E0D\u9AD8\u6D8E\u4E5F\u4E0D\u4F4E\u843D\u3002",
      es: "La Luna vela en silencio. Las emociones estan en calma, ni portadoras ni perturbadoras.",
      de: "Der Mond wacht in Stille. Die Emotionen sind ruhig, weder tragend noch storend.",
      hi: "\u091A\u0902\u0926\u094D\u0930\u092E\u093E \u092E\u094C\u0928 \u0938\u0947 \u091C\u093E\u0917 \u0930\u0939\u093E \u0939\u0948\u0964 \u092D\u093E\u0935\u0928\u093E\u090F\u0901 \u0936\u093E\u0902\u0924 \u0939\u0948\u0902, \u0928 \u0909\u0924\u094D\u0925\u093E\u0928\u0915\u093E\u0930\u0940 \u0928 \u0905\u0936\u093E\u0902\u0924\u093F\u0915\u093E\u0930\u0940\u0964",
      ja: "\u6708\u306F\u9759\u304B\u306B\u898B\u5B88\u3063\u3066\u3044\u307E\u3059\u3002\u611F\u60C5\u306F\u7A4F\u3084\u304B\u3067\u3001\u9AD8\u63DA\u3082\u52D5\u63FA\u3082\u3042\u308A\u307E\u305B\u3093\u3002",
    },
    unfavorable: {
      fr: "La Lune trouble les eaux. Les emotions risquent de brouiller votre jugement. Attendez avant de trancher.",
      en: "The Moon stirs the waters. Emotions may cloud your judgment. Wait before making decisions.",
      zh: "\u6708\u4EAE\u6405\u52A8\u4E86\u6C34\u9762\u3002\u60C5\u7EEA\u53EF\u80FD\u4F1A\u8499\u853D\u60A8\u7684\u5224\u65AD\u3002\u5728\u505A\u51B3\u5B9A\u4E4B\u524D\u8BF7\u7B49\u5F85\u3002",
      es: "La Luna turba las aguas. Las emociones pueden nublar tu juicio. Espera antes de decidir.",
      de: "Der Mond trubt die Wasser. Emotionen konnten Ihr Urteil verschleiern. Warten Sie, bevor Sie entscheiden.",
      hi: "\u091A\u0902\u0926\u094D\u0930\u092E\u093E \u091C\u0932 \u0915\u094B \u0905\u0936\u093E\u0902\u0924 \u0915\u0930 \u0930\u0939\u093E \u0939\u0948\u0964 \u092D\u093E\u0935\u0928\u093E\u090F\u0901 \u0906\u092A\u0915\u0947 \u0928\u093F\u0930\u094D\u0923\u092F \u0915\u094B \u0927\u0941\u0902\u0927\u0932\u093E \u0938\u0915\u0924\u0940 \u0939\u0948\u0902\u0964 \u0928\u093F\u0930\u094D\u0923\u092F \u0932\u0947\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u092A\u094D\u0930\u0924\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0947\u0902\u0964",
      ja: "\u6708\u304C\u6C34\u9762\u3092\u4E71\u3057\u3066\u3044\u307E\u3059\u3002\u611F\u60C5\u304C\u5224\u65AD\u3092\u66C7\u3089\u305B\u308B\u304B\u3082\u3057\u308C\u307E\u305B\u3093\u3002\u6C7A\u65AD\u3059\u308B\u524D\u306B\u5F85\u3061\u307E\u3057\u3087\u3046\u3002",
    },
  },

  // ─────────────────────────────────────────────
  // MARS  (Tuesday, NP = 9)
  // ─────────────────────────────────────────────
  mars: {
    favorable: {
      fr: "Mars insuffle son energie dans cette journee. Votre combativite est alignee. C'est le moment d'oser.",
      en: "Mars breathes its energy into this day. Your fighting spirit is aligned. Now is the time to dare.",
      zh: "\u706B\u661F\u5C06\u5176\u80FD\u91CF\u6CE8\u5165\u8FD9\u4E00\u5929\u3002\u60A8\u7684\u6218\u6597\u529B\u4E0E\u5B87\u5B99\u5BF9\u9F50\u3002\u73B0\u5728\u662F\u52C7\u6562\u884C\u52A8\u7684\u65F6\u523B\u3002",
      es: "Marte insufla su energia en este dia. Tu combatividad esta alineada. Es el momento de atreverse.",
      de: "Mars haucht diesem Tag seine Energie ein. Ihre Kampfbereitschaft ist ausgerichtet. Jetzt ist die Zeit zu wagen.",
      hi: "\u092E\u0902\u0917\u0932 \u0907\u0938 \u0926\u093F\u0928 \u092E\u0947\u0902 \u0905\u092A\u0928\u0940 \u090A\u0930\u094D\u091C\u093E \u092D\u0930 \u0930\u0939\u093E \u0939\u0948\u0964 \u0906\u092A\u0915\u0940 \u0932\u0921\u093C\u093E\u0915\u0942 \u092D\u093E\u0935\u0928\u093E \u0938\u0902\u0930\u0947\u0916\u093F\u0924 \u0939\u0948\u0964 \u0938\u093E\u0939\u0938 \u0915\u0930\u0928\u0947 \u0915\u093E \u0938\u092E\u092F \u0939\u0948\u0964",
      ja: "\u706B\u661F\u304C\u3053\u306E\u65E5\u306B\u30A8\u30CD\u30EB\u30AE\u30FC\u3092\u5439\u304D\u8FBC\u3093\u3067\u3044\u307E\u3059\u3002\u3042\u306A\u305F\u306E\u95D8\u5FD7\u306F\u5B87\u5B99\u3068\u4E00\u81F4\u3057\u3066\u3044\u307E\u3059\u3002\u4ECA\u3053\u305D\u6311\u6226\u306E\u6642\u3067\u3059\u3002",
    },
    neutral: {
      fr: "Mars offre un souffle d'energie mesure. Action possible mais sans urgence.",
      en: "Mars offers a measured breath of energy. Action is possible but without urgency.",
      zh: "\u706B\u661F\u63D0\u4F9B\u4E86\u9002\u5EA6\u7684\u80FD\u91CF\u3002\u53EF\u4EE5\u884C\u52A8\uFF0C\u4F46\u65E0\u9700\u6025\u8FEB\u3002",
      es: "Marte ofrece un soplo de energia mesurado. La accion es posible pero sin urgencia.",
      de: "Mars bietet einen gemessenen Hauch von Energie. Handeln ist moglich, aber ohne Eile.",
      hi: "\u092E\u0902\u0917\u0932 \u090F\u0915 \u0938\u0902\u0924\u0941\u0932\u093F\u0924 \u090A\u0930\u094D\u091C\u093E \u092A\u094D\u0930\u0926\u093E\u0928 \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u0915\u093E\u0930\u094D\u092F\u0935\u093E\u0939\u0940 \u0938\u0902\u092D\u0935 \u0939\u0948 \u0932\u0947\u0915\u093F\u0928 \u0915\u094B\u0908 \u091C\u0932\u094D\u0926\u0940 \u0928\u0939\u0940\u0902\u0964",
      ja: "\u706B\u661F\u304C\u63A7\u3048\u3081\u306A\u30A8\u30CD\u30EB\u30AE\u30FC\u3092\u4E0E\u3048\u3066\u3044\u307E\u3059\u3002\u884C\u52D5\u306F\u53EF\u80FD\u3067\u3059\u304C\u3001\u6025\u3050\u5FC5\u8981\u306F\u3042\u308A\u307E\u305B\u3093\u3002",
    },
    unfavorable: {
      fr: "Mars gouverne avec une energie qui frotte contre votre vibration. Attention aux conflits, a l'impatience.",
      en: "Mars rules with an energy that clashes with your vibration. Beware of conflicts and impatience.",
      zh: "\u706B\u661F\u7684\u80FD\u91CF\u4E0E\u60A8\u7684\u632F\u52A8\u4EA7\u751F\u4E86\u6469\u64E6\u3002\u8B66\u60D5\u51B2\u7A81\u548C\u6025\u8E81\u3002",
      es: "Marte gobierna con una energia que roza contra tu vibracion. Atencion a los conflictos y a la impaciencia.",
      de: "Mars herrscht mit einer Energie, die gegen Ihre Schwingung reibt. Vorsicht vor Konflikten und Ungeduld.",
      hi: "\u092E\u0902\u0917\u0932 \u090F\u0915 \u0910\u0938\u0940 \u090A\u0930\u094D\u091C\u093E \u0938\u0947 \u0936\u093E\u0938\u0928 \u0915\u0930 \u0930\u0939\u093E \u0939\u0948 \u091C\u094B \u0906\u092A\u0915\u0947 \u0915\u0902\u092A\u0928 \u0938\u0947 \u091F\u0915\u0930\u093E\u0924\u0940 \u0939\u0948\u0964 \u0938\u0902\u0918\u0930\u094D\u0937 \u0914\u0930 \u0905\u0927\u0940\u0930\u0924\u093E \u0938\u0947 \u0938\u093E\u0935\u0927\u093E\u0928 \u0930\u0939\u0947\u0902\u0964",
      ja: "\u706B\u661F\u306E\u30A8\u30CD\u30EB\u30AE\u30FC\u304C\u3042\u306A\u305F\u306E\u632F\u52D5\u3068\u885D\u7A81\u3057\u3066\u3044\u307E\u3059\u3002\u4E89\u3044\u3068\u7126\u308A\u306B\u6CE8\u610F\u3057\u307E\u3057\u3087\u3046\u3002",
    },
  },

  // ─────────────────────────────────────────────
  // MERCURY  (Wednesday, NP = 5)
  // ─────────────────────────────────────────────
  mercury: {
    favorable: {
      fr: "Mercure ouvre les voies de la communication. Echanges fluides, idees claires, negociations facilitees.",
      en: "Mercury opens the channels of communication. Fluid exchanges, clear ideas, negotiations made easier.",
      zh: "\u6C34\u661F\u6253\u5F00\u4E86\u6C9F\u901A\u7684\u901A\u9053\u3002\u4EA4\u6D41\u987A\u7545\uFF0C\u601D\u8DEF\u6E05\u6670\uFF0C\u8C08\u5224\u987A\u5229\u3002",
      es: "Mercurio abre las vias de la comunicacion. Intercambios fluidos, ideas claras, negociaciones facilitadas.",
      de: "Merkur offnet die Wege der Kommunikation. Fliessender Austausch, klare Ideen, erleichterte Verhandlungen.",
      hi: "\u092C\u0941\u0927 \u0938\u0902\u0935\u093E\u0926 \u0915\u0947 \u092E\u093E\u0930\u094D\u0917 \u0916\u094B\u0932 \u0930\u0939\u093E \u0939\u0948\u0964 \u0938\u0941\u0917\u092E \u0906\u0926\u093E\u0928-\u092A\u094D\u0930\u0926\u093E\u0928, \u0938\u094D\u092A\u0937\u094D\u091F \u0935\u093F\u091A\u093E\u0930, \u0938\u0930\u0932 \u0935\u093E\u0930\u094D\u0924\u093E\u0964",
      ja: "\u6C34\u661F\u304C\u30B3\u30DF\u30E5\u30CB\u30B1\u30FC\u30B7\u30E7\u30F3\u306E\u9053\u3092\u958B\u3044\u3066\u3044\u307E\u3059\u3002\u6D41\u308C\u308B\u3088\u3046\u306A\u4EA4\u6D41\u3001\u660E\u6676\u306A\u30A2\u30A4\u30C7\u30A2\u3001\u5186\u6ED1\u306A\u4EA4\u6E09\u3002",
    },
    neutral: {
      fr: "Mercure est actif mais sans eclat particulier. Communication correcte, sans plus.",
      en: "Mercury is active but without particular brilliance. Communication is adequate, nothing more.",
      zh: "\u6C34\u661F\u6D3B\u8DC3\u4F46\u65E0\u7279\u522B\u5149\u5F69\u3002\u6C9F\u901A\u6B63\u5E38\uFF0C\u4EC5\u6B64\u800C\u5DF2\u3002",
      es: "Mercurio esta activo pero sin brillo particular. Comunicacion correcta, sin mas.",
      de: "Merkur ist aktiv, aber ohne besonderen Glanz. Kommunikation ist korrekt, nicht mehr.",
      hi: "\u092C\u0941\u0927 \u0938\u0915\u094D\u0930\u093F\u092F \u0939\u0948 \u0932\u0947\u0915\u093F\u0928 \u0915\u094B\u0908 \u0935\u093F\u0936\u0947\u0937 \u091A\u092E\u0915 \u0928\u0939\u0940\u0902\u0964 \u0938\u0902\u0935\u093E\u0926 \u0920\u0940\u0915 \u0939\u0948, \u0907\u0938\u0938\u0947 \u0905\u0927\u093F\u0915 \u0928\u0939\u0940\u0902\u0964",
      ja: "\u6C34\u661F\u306F\u6D3B\u52D5\u7684\u3067\u3059\u304C\u3001\u7279\u5225\u306A\u8F1D\u304D\u306F\u3042\u308A\u307E\u305B\u3093\u3002\u30B3\u30DF\u30E5\u30CB\u30B1\u30FC\u30B7\u30E7\u30F3\u306F\u666E\u901A\u3001\u305D\u308C\u4EE5\u4E0A\u3067\u3082\u4EE5\u4E0B\u3067\u3082\u3042\u308A\u307E\u305B\u3093\u3002",
    },
    unfavorable: {
      fr: "Mercure regne mais sa vibration vous est contraire. Risque de malentendus. Reflechissez avant de parler.",
      en: "Mercury reigns but its vibration works against you. Risk of misunderstandings. Think before you speak.",
      zh: "\u6C34\u661F\u5F53\u9053\u4F46\u5176\u632F\u52A8\u4E0E\u60A8\u76F8\u53CD\u3002\u6709\u8BEF\u89E3\u7684\u98CE\u9669\u3002\u8BF4\u8BDD\u4E4B\u524D\u8BF7\u4E09\u601D\u3002",
      es: "Mercurio reina pero su vibracion te es contraria. Riesgo de malentendidos. Reflexiona antes de hablar.",
      de: "Merkur herrscht, aber seine Schwingung wirkt gegen Sie. Risiko von Missverstandnissen. Denken Sie nach, bevor Sie sprechen.",
      hi: "\u092C\u0941\u0927 \u0936\u093E\u0938\u0928 \u0915\u0930 \u0930\u0939\u093E \u0939\u0948 \u0932\u0947\u0915\u093F\u0928 \u0907\u0938\u0915\u093E \u0915\u0902\u092A\u0928 \u0906\u092A\u0915\u0947 \u0935\u093F\u0930\u0941\u0926\u094D\u0927 \u0939\u0948\u0964 \u0917\u0932\u0924\u092B\u0939\u092E\u0940 \u0915\u093E \u0916\u0924\u0930\u093E\u0964 \u092C\u094B\u0932\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0938\u094B\u091A\u0947\u0902\u0964",
      ja: "\u6C34\u661F\u304C\u652F\u914D\u3057\u3066\u3044\u307E\u3059\u304C\u3001\u305D\u306E\u632F\u52D5\u306F\u3042\u306A\u305F\u306B\u9006\u884C\u3057\u3066\u3044\u307E\u3059\u3002\u8AA4\u89E3\u306E\u30EA\u30B9\u30AF\u304C\u3042\u308A\u307E\u3059\u3002\u8A71\u3059\u524D\u306B\u3088\u304F\u8003\u3048\u307E\u3057\u3087\u3046\u3002",
    },
  },

  // ─────────────────────────────────────────────
  // JUPITER  (Thursday, NP = 3)
  // ─────────────────────────────────────────────
  jupiter: {
    favorable: {
      fr: "Jupiter repand son abondance. Les opportunites sont visibles pour qui sait les voir.",
      en: "Jupiter spreads its abundance. Opportunities are visible to those who know how to see them.",
      zh: "\u6728\u661F\u64AD\u6492\u5176\u4E30\u76DB\u3002\u673A\u4F1A\u5BF9\u61C2\u5F97\u89C2\u5BDF\u7684\u4EBA\u800C\u8A00\u6E05\u6670\u53EF\u89C1\u3002",
      es: "Jupiter esparce su abundancia. Las oportunidades son visibles para quien sabe verlas.",
      de: "Jupiter verbreitet seinen Uberfluss. Die Gelegenheiten sind sichtbar fur jene, die sie zu sehen wissen.",
      hi: "\u092C\u0943\u0939\u0938\u094D\u092A\u0924\u093F \u0905\u092A\u0928\u0940 \u092A\u094D\u0930\u091A\u0941\u0930\u0924\u093E \u092B\u0948\u0932\u093E \u0930\u0939\u093E \u0939\u0948\u0964 \u0905\u0935\u0938\u0930 \u0909\u0928\u0915\u0947 \u0932\u093F\u090F \u0926\u0943\u0936\u094D\u092F\u092E\u093E\u0928 \u0939\u0948\u0902 \u091C\u094B \u0909\u0928\u094D\u0939\u0947\u0902 \u0926\u0947\u0916\u0928\u093E \u091C\u093E\u0928\u0924\u0947 \u0939\u0948\u0902\u0964",
      ja: "\u6728\u661F\u304C\u8C4A\u304B\u3055\u3092\u964D\u308A\u6CE8\u3044\u3067\u3044\u307E\u3059\u3002\u898B\u308B\u76EE\u3092\u6301\u3064\u8005\u306B\u306F\u3001\u6A5F\u4F1A\u304C\u306F\u3063\u304D\u308A\u3068\u898B\u3048\u3066\u3044\u307E\u3059\u3002",
    },
    neutral: {
      fr: "Jupiter est present en toile de fond. Les possibilites existent, a vous de les saisir.",
      en: "Jupiter is present in the background. Possibilities exist -- it is up to you to seize them.",
      zh: "\u6728\u661F\u5728\u80CC\u666F\u4E2D\u9759\u9ED8\u5B58\u5728\u3002\u53EF\u80FD\u6027\u5DF2\u7ECF\u5B58\u5728\uFF0C\u7B49\u5F85\u60A8\u53BB\u628A\u63E1\u3002",
      es: "Jupiter esta presente como telon de fondo. Las posibilidades existen, depende de ti aprovecharlas.",
      de: "Jupiter ist im Hintergrund prasent. Moglichkeiten bestehen -- es liegt an Ihnen, sie zu ergreifen.",
      hi: "\u092C\u0943\u0939\u0938\u094D\u092A\u0924\u093F \u092A\u0943\u0937\u094D\u0920\u092D\u0942\u092E\u093F \u092E\u0947\u0902 \u0909\u092A\u0938\u094D\u0925\u093F\u0924 \u0939\u0948\u0964 \u0938\u0902\u092D\u093E\u0935\u0928\u093E\u090F\u0901 \u092E\u094C\u091C\u0942\u0926 \u0939\u0948\u0902, \u0909\u0928\u094D\u0939\u0947\u0902 \u092A\u0915\u0921\u093C\u0928\u093E \u0906\u092A \u092A\u0930 \u0928\u093F\u0930\u094D\u092D\u0930 \u0915\u0930\u0924\u093E \u0939\u0948\u0964",
      ja: "\u6728\u661F\u306F\u80CC\u666F\u306B\u5B58\u5728\u3057\u3066\u3044\u307E\u3059\u3002\u53EF\u80FD\u6027\u306F\u3042\u308A\u307E\u3059\u2014\u2014\u305D\u308C\u3092\u3064\u304B\u3080\u304B\u3069\u3046\u304B\u306F\u3042\u306A\u305F\u6B21\u7B2C\u3067\u3059\u3002",
    },
    unfavorable: {
      fr: "Jupiter pousse a l'expansion mais elle ne sert pas votre intention actuelle. Risque de s'eparpiller.",
      en: "Jupiter pushes toward expansion but it does not serve your current intention. Risk of scattering your energy.",
      zh: "\u6728\u661F\u63A8\u52A8\u6269\u5F20\u4F46\u8FD9\u5E76\u4E0D\u670D\u52A1\u4E8E\u60A8\u5F53\u524D\u7684\u610F\u56FE\u3002\u6709\u5206\u6563\u7CBE\u529B\u7684\u98CE\u9669\u3002",
      es: "Jupiter impulsa la expansion pero no sirve a tu intencion actual. Riesgo de dispersarse.",
      de: "Jupiter drangt zur Expansion, doch sie dient nicht Ihrer aktuellen Absicht. Gefahr der Zerstreuung.",
      hi: "\u092C\u0943\u0939\u0938\u094D\u092A\u0924\u093F \u0935\u093F\u0938\u094D\u0924\u093E\u0930 \u0915\u0940 \u0913\u0930 \u0927\u0915\u0947\u0932 \u0930\u0939\u093E \u0939\u0948 \u0932\u0947\u0915\u093F\u0928 \u092F\u0939 \u0906\u092A\u0915\u0940 \u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u092E\u0902\u0936\u093E \u0915\u094B \u092A\u0942\u0930\u093E \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093E\u0964 \u092C\u093F\u0916\u0930\u093E\u0935 \u0915\u093E \u0916\u0924\u0930\u093E\u0964",
      ja: "\u6728\u661F\u306F\u62E1\u5927\u3092\u4FC3\u3057\u307E\u3059\u304C\u3001\u305D\u308C\u306F\u4ECA\u306E\u3042\u306A\u305F\u306E\u610F\u56F3\u306B\u306F\u5F79\u7ACB\u3061\u307E\u305B\u3093\u3002\u30A8\u30CD\u30EB\u30AE\u30FC\u304C\u5206\u6563\u3059\u308B\u5371\u967A\u304C\u3042\u308A\u307E\u3059\u3002",
    },
  },

  // ─────────────────────────────────────────────
  // VENUS  (Friday, NP = 6)
  // ─────────────────────────────────────────────
  venus: {
    favorable: {
      fr: "Venus benit cette journee. L'harmonie relationnelle est au rendez-vous.",
      en: "Venus blesses this day. Relational harmony is assured.",
      zh: "\u91D1\u661F\u7956\u798F\u8FD9\u4E00\u5929\u3002\u4EBA\u9645\u5173\u7CFB\u7684\u548C\u8C10\u5982\u7EA6\u800C\u81F3\u3002",
      es: "Venus bendice este dia. La armonia relacional esta asegurada.",
      de: "Venus segnet diesen Tag. Zwischenmenschliche Harmonie ist gewahrleistet.",
      hi: "\u0936\u0941\u0915\u094D\u0930 \u0907\u0938 \u0926\u093F\u0928 \u0915\u094B \u0906\u0936\u0940\u0930\u094D\u0935\u093E\u0926 \u0926\u0947 \u0930\u0939\u093E \u0939\u0948\u0964 \u0930\u093F\u0936\u094D\u0924\u094B\u0902 \u092E\u0947\u0902 \u0938\u093E\u092E\u0902\u091C\u0938\u094D\u092F \u0938\u0941\u0928\u093F\u0936\u094D\u091A\u093F\u0924 \u0939\u0948\u0964",
      ja: "\u91D1\u661F\u304C\u3053\u306E\u65E5\u3092\u795D\u798F\u3057\u3066\u3044\u307E\u3059\u3002\u4EBA\u9593\u95A2\u4FC2\u306E\u8ABF\u548C\u304C\u7D04\u675F\u3055\u308C\u3066\u3044\u307E\u3059\u3002",
    },
    neutral: {
      fr: "Venus offre une douceur discrete. Ni passion ni tension -- un jour d'equilibre.",
      en: "Venus offers a quiet sweetness. Neither passion nor tension -- a day of balance.",
      zh: "\u91D1\u661F\u63D0\u4F9B\u4E86\u4E00\u4EFD\u542B\u84C4\u7684\u67D4\u548C\u3002\u65E0\u6FC0\u60C5\u4E5F\u65E0\u7D27\u5F20\u2014\u2014\u8FD9\u662F\u5E73\u8861\u7684\u4E00\u5929\u3002",
      es: "Venus ofrece una dulzura discreta. Ni pasion ni tension -- un dia de equilibrio.",
      de: "Venus schenkt eine stille Sanftheit. Weder Leidenschaft noch Spannung -- ein Tag des Gleichgewichts.",
      hi: "\u0936\u0941\u0915\u094D\u0930 \u090F\u0915 \u0938\u0942\u0915\u094D\u0937\u094D\u092E \u092E\u093E\u0927\u0941\u0930\u094D\u092F \u092A\u094D\u0930\u0926\u093E\u0928 \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u0928 \u091C\u0941\u0928\u0942\u0928 \u0928 \u0924\u0928\u093E\u0935 -- \u0938\u0902\u0924\u0941\u0932\u0928 \u0915\u093E \u0926\u093F\u0928\u0964",
      ja: "\u91D1\u661F\u304C\u63A7\u3048\u3081\u306A\u512A\u3057\u3055\u3092\u4E0E\u3048\u3066\u3044\u307E\u3059\u3002\u60C5\u71B1\u3082\u7DCA\u5F35\u3082\u306A\u3044\u2014\u2014\u30D0\u30E9\u30F3\u30B9\u306E\u4E00\u65E5\u3067\u3059\u3002",
    },
    unfavorable: {
      fr: "Venus regne mais sa douceur ne penetre pas votre champ aujourd'hui. Decisions sentimentales a reporter.",
      en: "Venus reigns but her sweetness does not reach your field today. Postpone sentimental decisions.",
      zh: "\u91D1\u661F\u5F53\u9053\u4F46\u5176\u67D4\u548C\u4ECA\u5929\u65E0\u6CD5\u6E17\u900F\u60A8\u7684\u80FD\u91CF\u573A\u3002\u611F\u60C5\u51B3\u5B9A\u8BF7\u5EF6\u540E\u3002",
      es: "Venus reina pero su dulzura no penetra tu campo hoy. Decisiones sentimentales a posponer.",
      de: "Venus herrscht, aber ihre Sanftheit erreicht Ihr Feld heute nicht. Verschieben Sie Herzensangelegenheiten.",
      hi: "\u0936\u0941\u0915\u094D\u0930 \u0936\u093E\u0938\u0928 \u0915\u0930 \u0930\u0939\u093E \u0939\u0948 \u0932\u0947\u0915\u093F\u0928 \u0907\u0938\u0915\u0940 \u0915\u094B\u092E\u0932\u0924\u093E \u0906\u091C \u0906\u092A\u0915\u0947 \u0915\u094D\u0937\u0947\u0924\u094D\u0930 \u0924\u0915 \u0928\u0939\u0940\u0902 \u092A\u0939\u0941\u0901\u091A \u0930\u0939\u0940\u0964 \u092D\u093E\u0935\u0928\u093E\u0924\u094D\u092E\u0915 \u0928\u093F\u0930\u094D\u0923\u092F \u091F\u093E\u0932\u0947\u0902\u0964",
      ja: "\u91D1\u661F\u304C\u652F\u914D\u3057\u3066\u3044\u307E\u3059\u304C\u3001\u305D\u306E\u512A\u3057\u3055\u306F\u4ECA\u65E5\u3042\u306A\u305F\u306E\u5834\u306B\u5C4A\u304D\u307E\u305B\u3093\u3002\u611F\u60C5\u306B\u95A2\u308F\u308B\u6C7A\u65AD\u306F\u5EF6\u671F\u3057\u307E\u3057\u3087\u3046\u3002",
    },
  },

  // ─────────────────────────────────────────────
  // SATURN  (Saturday, NP = 8)
  // ─────────────────────────────────────────────
  saturn: {
    favorable: {
      fr: "Saturne apporte structure et clarte. Votre rigueur est recompensee. Jour pour poser des fondations.",
      en: "Saturn brings structure and clarity. Your discipline is rewarded. A day to lay foundations.",
      zh: "\u571F\u661F\u5E26\u6765\u7ED3\u6784\u4E0E\u6E05\u6670\u3002\u60A8\u7684\u4E25\u8C28\u5F97\u5230\u4E86\u56DE\u62A5\u3002\u4ECA\u5929\u9002\u5408\u594F\u4E0B\u57FA\u77F3\u3002",
      es: "Saturno aporta estructura y claridad. Tu rigor es recompensado. Dia para poner cimientos.",
      de: "Saturn bringt Struktur und Klarheit. Ihre Disziplin wird belohnt. Ein Tag, um Fundamente zu legen.",
      hi: "\u0936\u0928\u093F \u0938\u0902\u0930\u091A\u0928\u093E \u0914\u0930 \u0938\u094D\u092A\u0937\u094D\u091F\u0924\u093E \u0932\u093E\u0924\u093E \u0939\u0948\u0964 \u0906\u092A\u0915\u0940 \u0905\u0928\u0941\u0936\u093E\u0938\u0928 \u0915\u094B \u092A\u0941\u0930\u0938\u094D\u0915\u0943\u0924 \u0915\u093F\u092F\u093E \u091C\u093E\u0924\u093E \u0939\u0948\u0964 \u0928\u0940\u0902\u0935 \u0930\u0916\u0928\u0947 \u0915\u093E \u0926\u093F\u0928\u0964",
      ja: "\u571F\u661F\u304C\u69CB\u9020\u3068\u660E\u6670\u3055\u3092\u3082\u305F\u3089\u3057\u307E\u3059\u3002\u3042\u306A\u305F\u306E\u898F\u5F8B\u304C\u5831\u308F\u308C\u307E\u3059\u3002\u57FA\u76E4\u3092\u7BC9\u304F\u65E5\u3067\u3059\u3002",
    },
    neutral: {
      fr: "Saturne structure sans contraindre. Le cadre est la, a vous de l'habiter.",
      en: "Saturn structures without constraining. The framework is there -- it is up to you to inhabit it.",
      zh: "\u571F\u661F\u63D0\u4F9B\u7ED3\u6784\u800C\u4E0D\u675F\u7F1A\u3002\u6846\u67B6\u5DF2\u7ECF\u5B58\u5728\uFF0C\u7B49\u5F85\u60A8\u53BB\u586B\u5145\u3002",
      es: "Saturno estructura sin constrenir. El marco esta ahi, depende de ti habitarlo.",
      de: "Saturn strukturiert ohne einzuengen. Der Rahmen ist da -- es liegt an Ihnen, ihn zu bewohnen.",
      hi: "\u0936\u0928\u093F \u092C\u093F\u0928\u093E \u092C\u093E\u0927\u093E \u0921\u093E\u0932\u0947 \u0938\u0902\u0930\u091A\u0928\u093E \u0926\u0947\u0924\u093E \u0939\u0948\u0964 \u0922\u093E\u0901\u091A\u093E \u092E\u094C\u091C\u0942\u0926 \u0939\u0948, \u0907\u0938\u0947 \u092D\u0930\u0928\u093E \u0906\u092A \u092A\u0930 \u0928\u093F\u0930\u094D\u092D\u0930 \u0915\u0930\u0924\u093E \u0939\u0948\u0964",
      ja: "\u571F\u661F\u306F\u675F\u7E1B\u305B\u305A\u306B\u69CB\u9020\u3092\u4E0E\u3048\u307E\u3059\u3002\u67A0\u7D44\u307F\u306F\u305D\u3053\u306B\u3042\u308A\u307E\u3059\u2014\u2014\u305D\u308C\u3092\u3069\u3046\u6D3B\u304B\u3059\u304B\u306F\u3042\u306A\u305F\u6B21\u7B2C\u3067\u3059\u3002",
    },
    unfavorable: {
      fr: "Saturne pese avec ses restrictions. Sentiment de lourdeur possible. Contournez plutot que de forcer.",
      en: "Saturn weighs down with its restrictions. A sense of heaviness is possible. Work around rather than force through.",
      zh: "\u571F\u661F\u4EE5\u5176\u9650\u5236\u538B\u8FEB\u7740\u60A8\u3002\u53EF\u80FD\u4F1A\u611F\u5230\u6C89\u91CD\u3002\u4E0E\u5176\u5F3A\u884C\u7A81\u7834\uFF0C\u4E0D\u5982\u7ED5\u9053\u800C\u884C\u3002",
      es: "Saturno pesa con sus restricciones. Posible sensacion de pesadez. Rodea en vez de forzar.",
      de: "Saturn lastet mit seinen Beschrankungen. Ein Gefuhl der Schwere ist moglich. Umgehen Sie lieber, statt zu erzwingen.",
      hi: "\u0936\u0928\u093F \u0905\u092A\u0928\u0947 \u092A\u094D\u0930\u0924\u093F\u092C\u0902\u0927\u094B\u0902 \u0938\u0947 \u092D\u093E\u0930\u0940 \u092A\u0921\u093C \u0930\u0939\u093E \u0939\u0948\u0964 \u092D\u093E\u0930\u0940\u092A\u0928 \u0915\u0940 \u0905\u0928\u0941\u092D\u0942\u0924\u093F \u0938\u0902\u092D\u0935 \u0939\u0948\u0964 \u091C\u094B\u0930 \u0932\u0917\u093E\u0928\u0947 \u0915\u0947 \u092C\u091C\u093E\u092F \u0930\u093E\u0938\u094D\u0924\u093E \u092C\u0926\u0932\u0947\u0902\u0964",
      ja: "\u571F\u661F\u304C\u5236\u9650\u3067\u91CD\u304F\u306E\u3057\u304B\u304B\u3063\u3066\u3044\u307E\u3059\u3002\u91CD\u82E6\u3057\u3055\u3092\u611F\u3058\u308B\u304B\u3082\u3057\u308C\u307E\u305B\u3093\u3002\u7121\u7406\u306B\u62BC\u3057\u901A\u3059\u3088\u308A\u3001\u56DE\u308A\u9053\u3092\u63A2\u3057\u307E\u3057\u3087\u3046\u3002",
    },
  },
};
