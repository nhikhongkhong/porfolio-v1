import React from 'react';
import {motion} from 'framer-motion';
import {useTranslation} from '@/hooks/useTranslation';
import {type Language, SUPPORTED_LANGUAGES} from '@/i18n';
import clsx from 'clsx';

const languageLabels: Record<Language, string> = {
  en: 'EN',
  zh: '中文',
  vi: 'VI',
};

const LanguageSwitcher = (): React.ReactElement => {
  const {language, setLanguage} = useTranslation();

  const buttonCount = SUPPORTED_LANGUAGES.length;
  const buttonWidthPercent = 100 / buttonCount;

  // Calculate slider position based on selected language
  const getSliderPosition = (): number => {
    const index = SUPPORTED_LANGUAGES.indexOf(language);
    return index * buttonWidthPercent;
  };

  return (
    <div className='relative inline-flex items-center bg-lightestNavy/50 backdrop-blur-sm rounded-[5px] p-0.5 border border-primary/20 shadow-lg shadow-primary/5'>
      {/* Sliding background indicator */}
      <motion.div
        className='absolute top-0.5 bottom-0.5 bg-primary/20 rounded-[3px] border border-primary/30'
        initial={false}
        animate={{
          left: `${getSliderPosition()}%`,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 35,
        }}
        style={{
          width: `${buttonWidthPercent}%`,
        }}
      />

      {/* Glow effect for active slider */}
      <motion.div
        className='absolute top-0.5 bottom-0.5 bg-primary/10 rounded-[3px] blur-sm'
        initial={false}
        animate={{
          left: `${getSliderPosition()}%`,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 35,
        }}
        style={{
          width: `${buttonWidthPercent}%`,
        }}
      />

      {/* Language buttons */}
      {SUPPORTED_LANGUAGES.map(lang => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={clsx(
            'relative z-10 px-3 py-1.5 text-xs md:text-sm font-medium transition-all duration-300 rounded-[3px] min-w-[44px]',
            {
              'text-primary drop-shadow-[0_0_8px_rgba(100,255,218,0.3)]': language === lang,
              'text-slate hover:text-lightestSlate': language !== lang,
            },
          )}
          aria-label={`Switch to ${languageLabels[lang]}`}
          aria-pressed={language === lang}
        >
          {languageLabels[lang]}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
