/**
 * i18n barrel export
 * Provides translations and utilities for internationalization
 */
export { fr, type TranslationSchema } from './fr';
export { en } from './en';
export { es } from './es';
export {
  useTranslations,
  getTranslations,
  getLocaleFromUrl,
  locales,
  defaultLocale,
  type Locale,
} from './utils';
