
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Cookie } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage to see if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      // Small delay to make the animation smoother on load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-7xl mx-auto bg-brand-700 rounded-xl shadow-2xl border border-brand-600 p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        
        {/* Content */}
        <div className="flex items-start md:items-center gap-4">
          <div className="p-2 bg-brand-600 rounded-lg shrink-0 hidden sm:block">
            <Cookie className="text-brand-gold w-6 h-6" />
          </div>
          <p className="text-gray-200 text-sm leading-relaxed">
            {t.cookieConsent.text}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={handleDecline}
            className="flex-1 md:flex-none px-4 py-2 rounded-lg border border-brand-500 text-gray-300 text-sm font-medium hover:bg-brand-600 hover:text-white transition-colors whitespace-nowrap"
          >
            {t.cookieConsent.decline}
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2 rounded-lg bg-brand-gold text-white text-sm font-bold shadow-md hover:bg-yellow-600 transition-colors whitespace-nowrap"
          >
            {t.cookieConsent.accept}
          </button>
          <button 
            onClick={handleDecline} // Close acts as decline/dismiss
            className="p-1 text-gray-400 hover:text-white transition-colors md:hidden"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
