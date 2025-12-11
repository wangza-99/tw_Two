
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, TrendingUp, Briefcase, PieChart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070", // Modern Corporate Architecture
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1932", // Business Meeting/Handshake
  "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=2070", // Financial Data/Stock Market
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069"  // Office Workspace
];

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const icons = [TrendingUp, Briefcase, PieChart, Shield];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[650px] flex items-center justify-center overflow-hidden">
        
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          {HERO_IMAGES.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover transform scale-105"
              />
            </div>
          ))}
          
          {/* Enhanced gradient overlay for better text contrast - Static on top of images */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-700/95 via-brand-700/80 to-brand-600/60 mix-blend-multiply z-10"></div>
          <div className="absolute inset-0 bg-black/20 z-10"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8 mt-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md opacity-90 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link
              to="/business"
              className="px-10 py-4 bg-brand-gold text-white font-bold rounded-full hover:bg-yellow-600 transition-all transform hover:-translate-y-1 shadow-xl shadow-yellow-600/30 flex items-center justify-center"
            >
              {t.hero.cta}
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 bg-transparent border-2 border-white/80 text-white font-bold rounded-full hover:bg-white hover:text-brand-700 transition-all transform hover:-translate-y-1 backdrop-blur-sm flex items-center justify-center"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </div>

      {/* Business Preview Section */}
      <div className="py-24 bg-gradient-to-b from-white to-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-brand-gold font-semibold tracking-wider text-sm uppercase mb-2 block">Our Expertise</span>
            <h2 className="text-4xl font-bold text-brand-700 mb-6">{t.business.title}</h2>
            <div className="w-24 h-1.5 bg-brand-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.business.items.map((item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <div
                  key={index}
                  className="group relative p-8 bg-white rounded-2xl border border-slate-100 hover:border-brand-200 shadow-sm hover:shadow-2xl transition-all duration-300 top-0 hover:-top-2"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600 transition-colors duration-300 shadow-inner">
                    <Icon className="text-brand-600 group-hover:text-white transition-colors" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm mb-8 border-t border-gray-100 pt-4">
                    {item.desc}
                  </p>
                  <Link to="/business" className="absolute bottom-8 left-8 inline-flex items-center text-brand-600 font-bold hover:text-brand-gold transition-colors text-sm uppercase tracking-wide">
                    <span className="mr-2">{t.business.detailsButton}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
