import { createContext } from 'react';

export type Language = 'en' | 'ta';

export interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext =
  createContext<LanguageContextType | undefined>(undefined);