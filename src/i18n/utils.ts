import fr from './fr.json';
import en from './en.json';
import zh from './zh.json';
import es from './es.json';

export const languages = {
  fr: 'Français',
  en: 'English',
  zh: '中文',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

const translations = { fr, en, zh, es } as const;

type Translations = typeof fr;

/** Get a nested translation value by dot-separated path */
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // Fallback: return the key path
    }
  }
  return typeof current === 'string' ? current : path;
}

/** Get the translation function for a given language */
export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return getNestedValue(translations[lang] as unknown as Record<string, unknown>, key);
  };
}

/** Get the translations object for a given language */
export function getTranslations(lang: Lang): Translations {
  return translations[lang];
}

/** Extract language from URL path */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

/** Build a localized path */
export function localizedPath(lang: Lang, path: string): string {
  return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Get the other languages (all except the given one) */
export function getOtherLangs(lang: Lang): Lang[] {
  return (Object.keys(languages) as Lang[]).filter((l) => l !== lang);
}

/** Route mappings between languages */
const routeMap: Record<string, Record<Lang, string>> = {
  '/': { fr: '/', en: '/', zh: '/', es: '/' },
  // FR routes
  '/tirage': { fr: '/tirage', en: '/reading', zh: '/zhan-bu', es: '/lectura' },
  '/tirage/oracle-amour': { fr: '/tirage/oracle-amour', en: '/reading/love-oracle', zh: '/zhan-bu/ai-qing-shen-yu', es: '/lectura/oraculo-amor' },
  '/tirage/tarot-marseille': { fr: '/tirage/tarot-marseille', en: '/reading/marseille-tarot', zh: '/zhan-bu/ma-sai-ta-luo', es: '/lectura/tarot-marsella' },
  '/tirage/oracle-shiva': { fr: '/tirage/oracle-shiva', en: '/reading/shiva-oracle', zh: '/zhan-bu/shi-wa-shen-yu', es: '/lectura/oraculo-shiva' },
  '/a-propos': { fr: '/a-propos', en: '/about', zh: '/guan-yu', es: '/acerca-de' },
  '/consultation': { fr: '/consultation', en: '/consultation', zh: '/zi-xun', es: '/consulta' },
  '/contact': { fr: '/contact', en: '/contact', zh: '/lian-xi', es: '/contacto' },
  '/mentions-legales': { fr: '/mentions-legales', en: '/legal', zh: '/fa-lv-sheng-ming', es: '/avisos-legales' },
  // EN routes
  '/reading': { fr: '/tirage', en: '/reading', zh: '/zhan-bu', es: '/lectura' },
  '/reading/love-oracle': { fr: '/tirage/oracle-amour', en: '/reading/love-oracle', zh: '/zhan-bu/ai-qing-shen-yu', es: '/lectura/oraculo-amor' },
  '/reading/marseille-tarot': { fr: '/tirage/tarot-marseille', en: '/reading/marseille-tarot', zh: '/zhan-bu/ma-sai-ta-luo', es: '/lectura/tarot-marsella' },
  '/reading/shiva-oracle': { fr: '/tirage/oracle-shiva', en: '/reading/shiva-oracle', zh: '/zhan-bu/shi-wa-shen-yu', es: '/lectura/oraculo-shiva' },
  '/about': { fr: '/a-propos', en: '/about', zh: '/guan-yu', es: '/acerca-de' },
  '/legal': { fr: '/mentions-legales', en: '/legal', zh: '/fa-lv-sheng-ming', es: '/avisos-legales' },
  // ZH routes
  '/zhan-bu': { fr: '/tirage', en: '/reading', zh: '/zhan-bu', es: '/lectura' },
  '/zhan-bu/ai-qing-shen-yu': { fr: '/tirage/oracle-amour', en: '/reading/love-oracle', zh: '/zhan-bu/ai-qing-shen-yu', es: '/lectura/oraculo-amor' },
  '/zhan-bu/ma-sai-ta-luo': { fr: '/tirage/tarot-marseille', en: '/reading/marseille-tarot', zh: '/zhan-bu/ma-sai-ta-luo', es: '/lectura/tarot-marsella' },
  '/zhan-bu/shi-wa-shen-yu': { fr: '/tirage/oracle-shiva', en: '/reading/shiva-oracle', zh: '/zhan-bu/shi-wa-shen-yu', es: '/lectura/oraculo-shiva' },
  '/guan-yu': { fr: '/a-propos', en: '/about', zh: '/guan-yu', es: '/acerca-de' },
  '/zi-xun': { fr: '/consultation', en: '/consultation', zh: '/zi-xun', es: '/consulta' },
  '/lian-xi': { fr: '/contact', en: '/contact', zh: '/lian-xi', es: '/contacto' },
  '/fa-lv-sheng-ming': { fr: '/mentions-legales', en: '/legal', zh: '/fa-lv-sheng-ming', es: '/avisos-legales' },
  // ES routes
  '/lectura': { fr: '/tirage', en: '/reading', zh: '/zhan-bu', es: '/lectura' },
  '/lectura/oraculo-amor': { fr: '/tirage/oracle-amour', en: '/reading/love-oracle', zh: '/zhan-bu/ai-qing-shen-yu', es: '/lectura/oraculo-amor' },
  '/lectura/tarot-marsella': { fr: '/tirage/tarot-marseille', en: '/reading/marseille-tarot', zh: '/zhan-bu/ma-sai-ta-luo', es: '/lectura/tarot-marsella' },
  '/lectura/oraculo-shiva': { fr: '/tirage/oracle-shiva', en: '/reading/shiva-oracle', zh: '/zhan-bu/shi-wa-shen-yu', es: '/lectura/oraculo-shiva' },
  '/acerca-de': { fr: '/a-propos', en: '/about', zh: '/guan-yu', es: '/acerca-de' },
  '/consulta': { fr: '/consultation', en: '/consultation', zh: '/zi-xun', es: '/consulta' },
  '/contacto': { fr: '/contact', en: '/contact', zh: '/lian-xi', es: '/contacto' },
  '/avisos-legales': { fr: '/mentions-legales', en: '/legal', zh: '/fa-lv-sheng-ming', es: '/avisos-legales' },
};

/** Get the equivalent path in another language */
export function getTranslatedPath(currentPath: string, targetLang: Lang): string {
  // Remove the language prefix
  const pathWithoutLang = currentPath.replace(/^\/(fr|en|zh|es)/, '') || '/';
  const mapping = routeMap[pathWithoutLang];
  if (mapping) {
    return `/${targetLang}${mapping[targetLang]}`;
  }
  // Fallback: just swap the language prefix
  return `/${targetLang}${pathWithoutLang}`;
}
