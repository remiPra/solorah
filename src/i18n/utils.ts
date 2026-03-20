import fr from './fr.json';
import en from './en.json';

export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

const translations = { fr, en } as const;

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

/** Get the path mapping for language switching */
export function getAlternateLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}

/** Route mappings between languages */
const routeMap: Record<string, Record<Lang, string>> = {
  '/': { fr: '/', en: '/' },
  '/tirage': { fr: '/tirage', en: '/reading' },
  '/tirage/oracle-amour': { fr: '/tirage/oracle-amour', en: '/reading/love-oracle' },
  '/tirage/tarot-marseille': { fr: '/tirage/tarot-marseille', en: '/reading/marseille-tarot' },
  '/tirage/oracle-shiva': { fr: '/tirage/oracle-shiva', en: '/reading/shiva-oracle' },
  '/a-propos': { fr: '/a-propos', en: '/about' },
  '/consultation': { fr: '/consultation', en: '/consultation' },
  '/contact': { fr: '/contact', en: '/contact' },
  '/mentions-legales': { fr: '/mentions-legales', en: '/legal' },
  '/reading': { fr: '/tirage', en: '/reading' },
  '/reading/love-oracle': { fr: '/tirage/oracle-amour', en: '/reading/love-oracle' },
  '/reading/marseille-tarot': { fr: '/tirage/tarot-marseille', en: '/reading/marseille-tarot' },
  '/reading/shiva-oracle': { fr: '/tirage/oracle-shiva', en: '/reading/shiva-oracle' },
  '/about': { fr: '/a-propos', en: '/about' },
  '/legal': { fr: '/mentions-legales', en: '/legal' },
};

/** Get the equivalent path in another language */
export function getTranslatedPath(currentPath: string, targetLang: Lang): string {
  // Remove the language prefix
  const pathWithoutLang = currentPath.replace(/^\/(fr|en)/, '') || '/';
  const mapping = routeMap[pathWithoutLang];
  if (mapping) {
    return `/${targetLang}${mapping[targetLang]}`;
  }
  // Fallback: just swap the language prefix
  return `/${targetLang}${pathWithoutLang}`;
}
