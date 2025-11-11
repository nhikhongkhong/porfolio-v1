import {useMemo} from 'react';
import {useLanguageStore} from '@/stores/language';
import {getTranslations, type Translations, type Language} from '@/i18n';

/**
 * Custom hook for translations
 * Returns translations object and helper functions
 */
export const useTranslation = () => {
  const language = useLanguageStore(state => state.language);
  const setLanguage = useLanguageStore(state => state.setLanguage);

  const t = useMemo(() => {
    const translations = getTranslations(language);

    /**
     * Get translation by key path
     * @param keyPath - Dot-separated key path (e.g., 'hero.greeting')
     * @returns Translated string
     */
    const get = (keyPath: string): string => {
      const keys = keyPath.split('.');
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

    return {
      ...translations,
      get,
    };
  }, [language]);

  return {
    t: t as Translations & {get: (keyPath: string) => string},
    language,
    setLanguage,
  };
};
