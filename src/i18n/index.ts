import {type Language, type Translations} from './types';
import enTranslations from './locales/en.json';
import zhTranslations from './locales/zh.json';
import viTranslations from './locales/vi.json';

/**
 * Translation dictionary
 */
const translations: Record<Language, Translations> = {
  en: enTranslations as Translations,
  zh: zhTranslations as Translations,
  vi: viTranslations as Translations,
};

/**
 * Default language
 */
export const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Supported languages
 */
export const SUPPORTED_LANGUAGES: Language[] = ['en', 'zh', 'vi'];

/**
 * Get translations for a specific language
 */
export const getTranslations = (lang: Language = DEFAULT_LANGUAGE): Translations => {
  return translations[lang] || translations[DEFAULT_LANGUAGE];
};

/**
 * Get a nested translation value by key path
 * Example: getTranslation('hero.greeting', 'en') => "Hi, my name is"
 */
export const getTranslation = (keyPath: string, lang: Language = DEFAULT_LANGUAGE): string => {
  const keys = keyPath.split('.');
  const translations = getTranslations(lang);

  let value: any = translations;
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return keyPath; // Return key path if not found
    }
  }

  return typeof value === 'string' ? value : keyPath;
};

export {translations};
export type {Language, Translations};
