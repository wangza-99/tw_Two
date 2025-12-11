
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TEXT_CONTENT as DEFAULT_CONTENT } from '../constants';
import { ContentText } from '../types';

interface DataContextType {
  data: Record<'cn' | 'en', ContentText>;
  updateData: (lang: 'cn' | 'en', section: keyof ContentText, key: string, value: any) => void;
  updateSection: (lang: 'cn' | 'en', section: keyof ContentText, value: any) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or fallback to constants
  const [data, setData] = useState<Record<'cn' | 'en', ContentText>>(() => {
    const savedData = localStorage.getItem('site_content_v1');
    return savedData ? JSON.parse(savedData) : DEFAULT_CONTENT;
  });

  // Persist changes
  useEffect(() => {
    localStorage.setItem('site_content_v1', JSON.stringify(data));
  }, [data]);

  const updateData = (lang: 'cn' | 'en', section: keyof ContentText, key: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [section]: {
          ...prev[lang][section],
          [key]: value,
        },
      },
    }));
  };

  const updateSection = (lang: 'cn' | 'en', section: keyof ContentText, value: any) => {
    setData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [section]: value,
      },
    }));
  };

  const resetData = () => {
    setData(DEFAULT_CONTENT);
    localStorage.removeItem('site_content_v1');
  };

  return (
    <DataContext.Provider value={{ data, updateData, updateSection, resetData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
