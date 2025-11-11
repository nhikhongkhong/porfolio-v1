import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {type Language, DEFAULT_LANGUAGE} from '@/i18n';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    set => ({
      language: DEFAULT_LANGUAGE,
      setLanguage: (lang: Language) => set({language: lang}),
    }),
    {
      name: 'language-storage',
    },
  ),
);
