import fr from './fr.json';
import en from './en.json';
import zh from './zh.json';
import es from './es.json';
import de from './de.json';
import hi from './hi.json';
import ja from './ja.json';

export const languages = {
  fr: 'Français',
  en: 'English',
  zh: '中文',
  es: 'Español',
  de: 'Deutsch',
  hi: 'हिन्दी',
  ja: '日本語',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

const translations = { fr, en, zh, es, de, hi, ja } as const;

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
  '/': { fr: '/', en: '/', zh: '/', es: '/', de: '/', hi: '/', ja: '/' },
  // FR routes
  '/tirage': { fr: '/tirage', en: '/reading', zh: '/zhan-bu', es: '/lectura', de: '/ziehung', hi: '/taash', ja: '/uranai' },
  '/tirage/oracle-amour': { fr: '/tirage/oracle-amour', en: '/reading/love-oracle', zh: '/zhan-bu/ai-qing-shen-yu', es: '/lectura/oraculo-amor', de: '/ziehung/liebesorakel', hi: '/taash/prem-oracle', ja: '/uranai/ai-no-orakuru' },
  '/tirage/tarot-marseille': { fr: '/tirage/tarot-marseille', en: '/reading/marseille-tarot', zh: '/zhan-bu/ma-sai-ta-luo', es: '/lectura/tarot-marsella', de: '/ziehung/tarot-marseille', hi: '/taash/tarot-marseille', ja: '/uranai/tarot-marseiyu' },
  '/tirage/oracle-shiva': { fr: '/tirage/oracle-shiva', en: '/reading/shiva-oracle', zh: '/zhan-bu/shi-wa-shen-yu', es: '/lectura/oraculo-shiva', de: '/ziehung/shiva-orakel', hi: '/taash/shiva-oracle', ja: '/uranai/shiva-orakuru' },
  '/a-propos': { fr: '/a-propos', en: '/about', zh: '/guan-yu', es: '/acerca-de', de: '/ueber-uns', hi: '/hamare-baare-mein', ja: '/gaiyou' },
  '/consultation': { fr: '/consultation', en: '/consultation', zh: '/zi-xun', es: '/consulta', de: '/beratung', hi: '/paramarsh', ja: '/soudan' },
  '/contact': { fr: '/contact', en: '/contact', zh: '/lian-xi', es: '/contacto', de: '/kontakt', hi: '/sampark', ja: '/otoiawase' },
  '/mentions-legales': { fr: '/mentions-legales', en: '/legal', zh: '/fa-lv-sheng-ming', es: '/avisos-legales', de: '/impressum', hi: '/vidhi-suchna', ja: '/houki-jouhou' },
  // FR new reading routes
  '/mes-tirages': { fr: '/mes-tirages', en: '/my-readings', zh: '/wo-de-zhan-bu', es: '/mis-lecturas', de: '/meine-ziehungen', hi: '/mere-taash', ja: '/watashi-no-uranai' },
  '/tirage/tirage-du-jour': { fr: '/tirage/tirage-du-jour', en: '/reading/daily-reading', zh: '/zhan-bu/mei-ri-zhan-bu', es: '/lectura/lectura-del-dia', de: '/ziehung/tageskarte', hi: '/taash/dainik-taash', ja: '/uranai/kyou-no-uranai' },
  '/tirage/tirage-oui-non': { fr: '/tirage/tirage-oui-non', en: '/reading/yes-no', zh: '/zhan-bu/shi-fou-zhan-bu', es: '/lectura/si-o-no', de: '/ziehung/ja-nein', hi: '/taash/haan-na', ja: '/uranai/hai-iie' },
  '/tirage/tirage-3-cartes': { fr: '/tirage/tirage-3-cartes', en: '/reading/three-cards', zh: '/zhan-bu/san-zhang-pai', es: '/lectura/tres-cartas', de: '/ziehung/drei-karten', hi: '/taash/teen-patte', ja: '/uranai/san-mai' },
  '/tirage/tirage-en-croix': { fr: '/tirage/tirage-en-croix', en: '/reading/cross-spread', zh: '/zhan-bu/shi-zi-zhan-bu', es: '/lectura/tirada-en-cruz', de: '/ziehung/kreuzlegung', hi: '/taash/cross-spread', ja: '/uranai/juuji-uranai' },
  '/tirage/tirage-amour': { fr: '/tirage/tirage-amour', en: '/reading/love-reading', zh: '/zhan-bu/ai-qing-zhan-bu', es: '/lectura/lectura-amor', de: '/ziehung/liebeslegung', hi: '/taash/prem-taash', ja: '/uranai/ai-no-uranai' },
  '/tirage/oracle-des-jours': { fr: '/tirage/oracle-des-jours', en: '/reading/oracle-of-days', zh: '/zhan-bu/ri-zhi-shen-yu', es: '/lectura/oraculo-de-los-dias', de: '/ziehung/orakel-der-tage', hi: '/taash/dinon-ka-oracle', ja: '/uranai/hibi-no-orakuru' },
  // FR signification routes (same slug across languages for now)
  '/signification': { fr: '/signification', en: '/meaning', zh: '/han-yi', es: '/significado', de: '/bedeutung', hi: '/arth', ja: '/imi' },
  // FR guide routes
  '/guide': { fr: '/guide', en: '/guide', zh: '/zhi-nan', es: '/guia', de: '/ratgeber', hi: '/margdarshak', ja: '/gaido' },
  // FR landing pages
  '/tarot-gratuit': { fr: '/tarot-gratuit', en: '/free-tarot', zh: '/mian-fei-ta-luo', es: '/tarot-gratis', de: '/tarot-kostenlos', hi: '/muft-tarot', ja: '/muryou-tarot' },
  '/oracle-gratuit': { fr: '/oracle-gratuit', en: '/free-oracle', zh: '/mian-fei-shen-yu', es: '/oraculo-gratis', de: '/orakel-kostenlos', hi: '/muft-oracle', ja: '/muryou-orakuru' },
  // Blog routes
  '/blog': { fr: '/blog', en: '/blog', zh: '/blog', es: '/blog', de: '/blog', hi: '/blog', ja: '/blog' },
  // EN routes
  '/reading': { fr: '/tirage', en: '/reading', zh: '/zhan-bu', es: '/lectura', de: '/ziehung', hi: '/taash', ja: '/uranai' },
  '/reading/love-oracle': { fr: '/tirage/oracle-amour', en: '/reading/love-oracle', zh: '/zhan-bu/ai-qing-shen-yu', es: '/lectura/oraculo-amor', de: '/ziehung/liebesorakel', hi: '/taash/prem-oracle', ja: '/uranai/ai-no-orakuru' },
  '/reading/marseille-tarot': { fr: '/tirage/tarot-marseille', en: '/reading/marseille-tarot', zh: '/zhan-bu/ma-sai-ta-luo', es: '/lectura/tarot-marsella', de: '/ziehung/tarot-marseille', hi: '/taash/tarot-marseille', ja: '/uranai/tarot-marseiyu' },
  '/reading/shiva-oracle': { fr: '/tirage/oracle-shiva', en: '/reading/shiva-oracle', zh: '/zhan-bu/shi-wa-shen-yu', es: '/lectura/oraculo-shiva', de: '/ziehung/shiva-orakel', hi: '/taash/shiva-oracle', ja: '/uranai/shiva-orakuru' },
  '/about': { fr: '/a-propos', en: '/about', zh: '/guan-yu', es: '/acerca-de', de: '/ueber-uns', hi: '/hamare-baare-mein', ja: '/gaiyou' },
  '/legal': { fr: '/mentions-legales', en: '/legal', zh: '/fa-lv-sheng-ming', es: '/avisos-legales', de: '/impressum', hi: '/vidhi-suchna', ja: '/houki-jouhou' },
  // EN new reading routes
  '/my-readings': { fr: '/mes-tirages', en: '/my-readings', zh: '/wo-de-zhan-bu', es: '/mis-lecturas', de: '/meine-ziehungen', hi: '/mere-taash', ja: '/watashi-no-uranai' },
  '/reading/daily-reading': { fr: '/tirage/tirage-du-jour', en: '/reading/daily-reading', zh: '/zhan-bu/mei-ri-zhan-bu', es: '/lectura/lectura-del-dia', de: '/ziehung/tageskarte', hi: '/taash/dainik-taash', ja: '/uranai/kyou-no-uranai' },
  '/reading/yes-no': { fr: '/tirage/tirage-oui-non', en: '/reading/yes-no', zh: '/zhan-bu/shi-fou-zhan-bu', es: '/lectura/si-o-no', de: '/ziehung/ja-nein', hi: '/taash/haan-na', ja: '/uranai/hai-iie' },
  '/reading/three-cards': { fr: '/tirage/tirage-3-cartes', en: '/reading/three-cards', zh: '/zhan-bu/san-zhang-pai', es: '/lectura/tres-cartas', de: '/ziehung/drei-karten', hi: '/taash/teen-patte', ja: '/uranai/san-mai' },
  '/reading/cross-spread': { fr: '/tirage/tirage-en-croix', en: '/reading/cross-spread', zh: '/zhan-bu/shi-zi-zhan-bu', es: '/lectura/tirada-en-cruz', de: '/ziehung/kreuzlegung', hi: '/taash/cross-spread', ja: '/uranai/juuji-uranai' },
  '/reading/love-reading': { fr: '/tirage/tirage-amour', en: '/reading/love-reading', zh: '/zhan-bu/ai-qing-zhan-bu', es: '/lectura/lectura-amor', de: '/ziehung/liebeslegung', hi: '/taash/prem-taash', ja: '/uranai/ai-no-uranai' },
  '/reading/oracle-of-days': { fr: '/tirage/oracle-des-jours', en: '/reading/oracle-of-days', zh: '/zhan-bu/ri-zhi-shen-yu', es: '/lectura/oraculo-de-los-dias', de: '/ziehung/orakel-der-tage', hi: '/taash/dinon-ka-oracle', ja: '/uranai/hibi-no-orakuru' },
  '/meaning': { fr: '/signification', en: '/meaning', zh: '/han-yi', es: '/significado', de: '/bedeutung', hi: '/arth', ja: '/imi' },
  '/free-tarot': { fr: '/tarot-gratuit', en: '/free-tarot', zh: '/mian-fei-ta-luo', es: '/tarot-gratis', de: '/tarot-kostenlos', hi: '/muft-tarot', ja: '/muryou-tarot' },
  '/free-oracle': { fr: '/oracle-gratuit', en: '/free-oracle', zh: '/mian-fei-shen-yu', es: '/oraculo-gratis', de: '/orakel-kostenlos', hi: '/muft-oracle', ja: '/muryou-orakuru' },
  // ZH routes
  '/wo-de-zhan-bu': { fr: '/mes-tirages', en: '/my-readings', zh: '/wo-de-zhan-bu', es: '/mis-lecturas', de: '/meine-ziehungen', hi: '/mere-taash', ja: '/watashi-no-uranai' },
  '/zhan-bu': { fr: '/tirage', en: '/reading', zh: '/zhan-bu', es: '/lectura', de: '/ziehung', hi: '/taash', ja: '/uranai' },
  '/zhan-bu/ai-qing-shen-yu': { fr: '/tirage/oracle-amour', en: '/reading/love-oracle', zh: '/zhan-bu/ai-qing-shen-yu', es: '/lectura/oraculo-amor', de: '/ziehung/liebesorakel', hi: '/taash/prem-oracle', ja: '/uranai/ai-no-orakuru' },
  '/zhan-bu/ma-sai-ta-luo': { fr: '/tirage/tarot-marseille', en: '/reading/marseille-tarot', zh: '/zhan-bu/ma-sai-ta-luo', es: '/lectura/tarot-marsella', de: '/ziehung/tarot-marseille', hi: '/taash/tarot-marseille', ja: '/uranai/tarot-marseiyu' },
  '/zhan-bu/shi-wa-shen-yu': { fr: '/tirage/oracle-shiva', en: '/reading/shiva-oracle', zh: '/zhan-bu/shi-wa-shen-yu', es: '/lectura/oraculo-shiva', de: '/ziehung/shiva-orakel', hi: '/taash/shiva-oracle', ja: '/uranai/shiva-orakuru' },
  '/zhan-bu/ri-zhi-shen-yu': { fr: '/tirage/oracle-des-jours', en: '/reading/oracle-of-days', zh: '/zhan-bu/ri-zhi-shen-yu', es: '/lectura/oraculo-de-los-dias', de: '/ziehung/orakel-der-tage', hi: '/taash/dinon-ka-oracle', ja: '/uranai/hibi-no-orakuru' },
  '/guan-yu': { fr: '/a-propos', en: '/about', zh: '/guan-yu', es: '/acerca-de', de: '/ueber-uns', hi: '/hamare-baare-mein', ja: '/gaiyou' },
  '/zi-xun': { fr: '/consultation', en: '/consultation', zh: '/zi-xun', es: '/consulta', de: '/beratung', hi: '/paramarsh', ja: '/soudan' },
  '/lian-xi': { fr: '/contact', en: '/contact', zh: '/lian-xi', es: '/contacto', de: '/kontakt', hi: '/sampark', ja: '/otoiawase' },
  '/fa-lv-sheng-ming': { fr: '/mentions-legales', en: '/legal', zh: '/fa-lv-sheng-ming', es: '/avisos-legales', de: '/impressum', hi: '/vidhi-suchna', ja: '/houki-jouhou' },
  // ES routes
  '/mis-lecturas': { fr: '/mes-tirages', en: '/my-readings', zh: '/wo-de-zhan-bu', es: '/mis-lecturas', de: '/meine-ziehungen', hi: '/mere-taash', ja: '/watashi-no-uranai' },
  '/lectura': { fr: '/tirage', en: '/reading', zh: '/zhan-bu', es: '/lectura', de: '/ziehung', hi: '/taash', ja: '/uranai' },
  '/lectura/oraculo-amor': { fr: '/tirage/oracle-amour', en: '/reading/love-oracle', zh: '/zhan-bu/ai-qing-shen-yu', es: '/lectura/oraculo-amor', de: '/ziehung/liebesorakel', hi: '/taash/prem-oracle', ja: '/uranai/ai-no-orakuru' },
  '/lectura/tarot-marsella': { fr: '/tirage/tarot-marseille', en: '/reading/marseille-tarot', zh: '/zhan-bu/ma-sai-ta-luo', es: '/lectura/tarot-marsella', de: '/ziehung/tarot-marseille', hi: '/taash/tarot-marseille', ja: '/uranai/tarot-marseiyu' },
  '/lectura/oraculo-shiva': { fr: '/tirage/oracle-shiva', en: '/reading/shiva-oracle', zh: '/zhan-bu/shi-wa-shen-yu', es: '/lectura/oraculo-shiva', de: '/ziehung/shiva-orakel', hi: '/taash/shiva-oracle', ja: '/uranai/shiva-orakuru' },
  '/lectura/oraculo-de-los-dias': { fr: '/tirage/oracle-des-jours', en: '/reading/oracle-of-days', zh: '/zhan-bu/ri-zhi-shen-yu', es: '/lectura/oraculo-de-los-dias', de: '/ziehung/orakel-der-tage', hi: '/taash/dinon-ka-oracle', ja: '/uranai/hibi-no-orakuru' },
  '/acerca-de': { fr: '/a-propos', en: '/about', zh: '/guan-yu', es: '/acerca-de', de: '/ueber-uns', hi: '/hamare-baare-mein', ja: '/gaiyou' },
  '/consulta': { fr: '/consultation', en: '/consultation', zh: '/zi-xun', es: '/consulta', de: '/beratung', hi: '/paramarsh', ja: '/soudan' },
  '/contacto': { fr: '/contact', en: '/contact', zh: '/lian-xi', es: '/contacto', de: '/kontakt', hi: '/sampark', ja: '/otoiawase' },
  '/avisos-legales': { fr: '/mentions-legales', en: '/legal', zh: '/fa-lv-sheng-ming', es: '/avisos-legales', de: '/impressum', hi: '/vidhi-suchna', ja: '/houki-jouhou' },
  // DE routes
  '/meine-ziehungen': { fr: '/mes-tirages', en: '/my-readings', zh: '/wo-de-zhan-bu', es: '/mis-lecturas', de: '/meine-ziehungen', hi: '/mere-taash', ja: '/watashi-no-uranai' },
  '/ziehung': { fr: '/tirage', en: '/reading', zh: '/zhan-bu', es: '/lectura', de: '/ziehung', hi: '/taash', ja: '/uranai' },
  '/ziehung/liebesorakel': { fr: '/tirage/oracle-amour', en: '/reading/love-oracle', zh: '/zhan-bu/ai-qing-shen-yu', es: '/lectura/oraculo-amor', de: '/ziehung/liebesorakel', hi: '/taash/prem-oracle', ja: '/uranai/ai-no-orakuru' },
  '/ziehung/tarot-marseille': { fr: '/tirage/tarot-marseille', en: '/reading/marseille-tarot', zh: '/zhan-bu/ma-sai-ta-luo', es: '/lectura/tarot-marsella', de: '/ziehung/tarot-marseille', hi: '/taash/tarot-marseille', ja: '/uranai/tarot-marseiyu' },
  '/ziehung/shiva-orakel': { fr: '/tirage/oracle-shiva', en: '/reading/shiva-oracle', zh: '/zhan-bu/shi-wa-shen-yu', es: '/lectura/oraculo-shiva', de: '/ziehung/shiva-orakel', hi: '/taash/shiva-oracle', ja: '/uranai/shiva-orakuru' },
  '/ziehung/orakel-der-tage': { fr: '/tirage/oracle-des-jours', en: '/reading/oracle-of-days', zh: '/zhan-bu/ri-zhi-shen-yu', es: '/lectura/oraculo-de-los-dias', de: '/ziehung/orakel-der-tage', hi: '/taash/dinon-ka-oracle', ja: '/uranai/hibi-no-orakuru' },
  '/ueber-uns': { fr: '/a-propos', en: '/about', zh: '/guan-yu', es: '/acerca-de', de: '/ueber-uns', hi: '/hamare-baare-mein', ja: '/gaiyou' },
  '/beratung': { fr: '/consultation', en: '/consultation', zh: '/zi-xun', es: '/consulta', de: '/beratung', hi: '/paramarsh', ja: '/soudan' },
  '/kontakt': { fr: '/contact', en: '/contact', zh: '/lian-xi', es: '/contacto', de: '/kontakt', hi: '/sampark', ja: '/otoiawase' },
  '/impressum': { fr: '/mentions-legales', en: '/legal', zh: '/fa-lv-sheng-ming', es: '/avisos-legales', de: '/impressum', hi: '/vidhi-suchna', ja: '/houki-jouhou' },
  // HI routes
  '/mere-taash': { fr: '/mes-tirages', en: '/my-readings', zh: '/wo-de-zhan-bu', es: '/mis-lecturas', de: '/meine-ziehungen', hi: '/mere-taash', ja: '/watashi-no-uranai' },
  '/taash': { fr: '/tirage', en: '/reading', zh: '/zhan-bu', es: '/lectura', de: '/ziehung', hi: '/taash', ja: '/uranai' },
  '/taash/prem-oracle': { fr: '/tirage/oracle-amour', en: '/reading/love-oracle', zh: '/zhan-bu/ai-qing-shen-yu', es: '/lectura/oraculo-amor', de: '/ziehung/liebesorakel', hi: '/taash/prem-oracle', ja: '/uranai/ai-no-orakuru' },
  '/taash/tarot-marseille': { fr: '/tirage/tarot-marseille', en: '/reading/marseille-tarot', zh: '/zhan-bu/ma-sai-ta-luo', es: '/lectura/tarot-marsella', de: '/ziehung/tarot-marseille', hi: '/taash/tarot-marseille', ja: '/uranai/tarot-marseiyu' },
  '/taash/shiva-oracle': { fr: '/tirage/oracle-shiva', en: '/reading/shiva-oracle', zh: '/zhan-bu/shi-wa-shen-yu', es: '/lectura/oraculo-shiva', de: '/ziehung/shiva-orakel', hi: '/taash/shiva-oracle', ja: '/uranai/shiva-orakuru' },
  '/taash/dinon-ka-oracle': { fr: '/tirage/oracle-des-jours', en: '/reading/oracle-of-days', zh: '/zhan-bu/ri-zhi-shen-yu', es: '/lectura/oraculo-de-los-dias', de: '/ziehung/orakel-der-tage', hi: '/taash/dinon-ka-oracle', ja: '/uranai/hibi-no-orakuru' },
  '/hamare-baare-mein': { fr: '/a-propos', en: '/about', zh: '/guan-yu', es: '/acerca-de', de: '/ueber-uns', hi: '/hamare-baare-mein', ja: '/gaiyou' },
  '/paramarsh': { fr: '/consultation', en: '/consultation', zh: '/zi-xun', es: '/consulta', de: '/beratung', hi: '/paramarsh', ja: '/soudan' },
  '/sampark': { fr: '/contact', en: '/contact', zh: '/lian-xi', es: '/contacto', de: '/kontakt', hi: '/sampark', ja: '/otoiawase' },
  '/vidhi-suchna': { fr: '/mentions-legales', en: '/legal', zh: '/fa-lv-sheng-ming', es: '/avisos-legales', de: '/impressum', hi: '/vidhi-suchna', ja: '/houki-jouhou' },
  // JA routes
  '/watashi-no-uranai': { fr: '/mes-tirages', en: '/my-readings', zh: '/wo-de-zhan-bu', es: '/mis-lecturas', de: '/meine-ziehungen', hi: '/mere-taash', ja: '/watashi-no-uranai' },
  '/uranai': { fr: '/tirage', en: '/reading', zh: '/zhan-bu', es: '/lectura', de: '/ziehung', hi: '/taash', ja: '/uranai' },
  '/uranai/ai-no-orakuru': { fr: '/tirage/oracle-amour', en: '/reading/love-oracle', zh: '/zhan-bu/ai-qing-shen-yu', es: '/lectura/oraculo-amor', de: '/ziehung/liebesorakel', hi: '/taash/prem-oracle', ja: '/uranai/ai-no-orakuru' },
  '/uranai/tarot-marseiyu': { fr: '/tirage/tarot-marseille', en: '/reading/marseille-tarot', zh: '/zhan-bu/ma-sai-ta-luo', es: '/lectura/tarot-marsella', de: '/ziehung/tarot-marseille', hi: '/taash/tarot-marseille', ja: '/uranai/tarot-marseiyu' },
  '/uranai/shiva-orakuru': { fr: '/tirage/oracle-shiva', en: '/reading/shiva-oracle', zh: '/zhan-bu/shi-wa-shen-yu', es: '/lectura/oraculo-shiva', de: '/ziehung/shiva-orakel', hi: '/taash/shiva-oracle', ja: '/uranai/shiva-orakuru' },
  '/uranai/hibi-no-orakuru': { fr: '/tirage/oracle-des-jours', en: '/reading/oracle-of-days', zh: '/zhan-bu/ri-zhi-shen-yu', es: '/lectura/oraculo-de-los-dias', de: '/ziehung/orakel-der-tage', hi: '/taash/dinon-ka-oracle', ja: '/uranai/hibi-no-orakuru' },
  '/gaiyou': { fr: '/a-propos', en: '/about', zh: '/guan-yu', es: '/acerca-de', de: '/ueber-uns', hi: '/hamare-baare-mein', ja: '/gaiyou' },
  '/soudan': { fr: '/consultation', en: '/consultation', zh: '/zi-xun', es: '/consulta', de: '/beratung', hi: '/paramarsh', ja: '/soudan' },
  '/otoiawase': { fr: '/contact', en: '/contact', zh: '/lian-xi', es: '/contacto', de: '/kontakt', hi: '/sampark', ja: '/otoiawase' },
  '/houki-jouhou': { fr: '/mentions-legales', en: '/legal', zh: '/fa-lv-sheng-ming', es: '/avisos-legales', de: '/impressum', hi: '/vidhi-suchna', ja: '/houki-jouhou' },
};

/** Get the equivalent path in another language */
export function getTranslatedPath(currentPath: string, targetLang: Lang): string {
  // Remove the language prefix
  const pathWithoutLang = currentPath.replace(/^\/(fr|en|zh|es|de|hi|ja)/, '') || '/';
  const mapping = routeMap[pathWithoutLang];
  if (mapping) {
    return `/${targetLang}${mapping[targetLang]}`;
  }
  // Fallback: just swap the language prefix
  return `/${targetLang}${pathWithoutLang}`;
}
