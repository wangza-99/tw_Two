
import React, { createContext, useContext, useState } from 'react';
import { Language, ContentText } from '../types';
import { useData } from './DataContext';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ContentText;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('cn');
  const { data } = useData(); // Get dynamic data

  const value = {
    language,
    setLanguage,
    t: data[language], // Provide the dynamic content for the current language
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
