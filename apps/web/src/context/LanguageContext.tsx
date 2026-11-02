import React, { useContext, useState } from 'react';
import { LanguageContext } from './language-context';
import type { Language } from './language-context';

import enData from '../locales/en.json';
import taData from '../locales/ta.json';

const translations = {
  en: enData,
  ta: taData,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('ta');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[lang];

    for (const k of keys) {
      if (value[k] === undefined) {
        return key;
      }
      value = value[k];
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};