/**
 * i18n utilities
 * Provides useTranslations hook and locale helpers
 */
import { fr } from './fr';
import { en } from './en';
import { es } from './es';

const translations = { fr, en, es } as const;

export type Locale = keyof typeof translations;
export const locales: Locale[] = ['fr', 'en', 'es'];
export const defaultLocale: Locale = 'fr';

/**
 * Get translations for a specific locale
 * Returns a function that retrieves translation by dot notation key
 *
 * @example
 * const t = useTranslations('fr');
 * t('hero.title') // "Chantez. Jouez. Vibrez."
 * t('hero.cta.primary') // "Essayer gratuitement"
 */
export function useTranslations(locale: string | undefined) {
  const lang = (locale && locale in translations ? locale : defaultLocale) as Locale;
  const t = translations[lang];

  return function (key: string): string {
    const keys = key.split('.');
    let value: unknown = t;

    for (const k of keys) {
      if (value === null || value === undefined) {
        return key;
      }
      value = (value as Record<string, unknown>)[k];
    }

    if (typeof value !== 'string') {
      return key;
    }

    return value;
  };
}

/**
 * Extract locale from URL pathname
 *
 * @example
 * getLocaleFromUrl(new URL('https://example.com/fr/contact')) // 'fr'
 * getLocaleFromUrl(new URL('https://example.com/unknown')) // 'fr' (default)
 */
export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in translations) {
    return lang as Locale;
  }
  return defaultLocale;
}

/**
 * Get all translations object for a locale
 * Useful when you need access to the full translation object
 */
export function getTranslations(locale: string | undefined) {
  const lang = (locale && locale in translations ? locale : defaultLocale) as Locale;
  return translations[lang];
}
