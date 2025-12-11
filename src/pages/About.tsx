
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Building2, User, Calendar, MapPin, Award } from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-700 mb-4">{t.about.title}</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Side */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-gold/20 rounded-tl-3xl z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-500/20 rounded-br-3xl z-0"></div>
            <img
              src="https://picsum.photos/seed/office/800/600"
              alt="Office"
              className="relative z-10 w-full rounded-2xl shadow-2xl"
            />
          </div>

          {/* Text Side */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Building2 className="mr-3 text-brand-gold" />
              {t.about.imageSubtitle}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t.about.description}
            </p>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg mt-8">
              <h3 className="text-lg font-semibold text-brand-700 mb-4 border-b pb-2">
                {t.about.detailsTitle}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Calendar className="w-5 h-5 text-brand-500 mr-3 mt-1" />
                  <span className="text-gray-700">{t.about.estDate}</span>
                </li>
                <li className="flex items-start">
                  <Award className="w-5 h-5 text-brand-500 mr-3 mt-1" />
                  <span className="text-gray-700">{t.about.capital}</span>
                </li>
                <li className="flex items-start">
                  <User className="w-5 h-5 text-brand-500 mr-3 mt-1" />
                  <span className="text-gray-700">{t.about.rep}</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-brand-500 mr-3 mt-1" />
                  <span className="text-gray-700">{t.about.location}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Culture Section */}
        <div className="bg-brand-50 rounded-3xl p-12 text-center">
           <h2 className="text-2xl font-bold text-brand-700 mb-8">{t.about.philosophy.title}</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.about.philosophy.items.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                   <h4 className="font-bold text-lg mb-2 text-brand-600">{item.title}</h4>
                   <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
