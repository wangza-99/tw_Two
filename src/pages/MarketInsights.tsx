
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

export const MarketInsights: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'macro' | 'industry' | 'strategy'>('all');

  const filteredArticles = t.marketInsights.articles.filter(
    (article) => filter === 'all' || article.category === filter
  );

  const categories = [
    { id: 'all', label: t.marketInsights.categories.all },
    { id: 'macro', label: t.marketInsights.categories.macro },
    { id: 'industry', label: t.marketInsights.categories.industry },
    { id: 'strategy', label: t.marketInsights.categories.strategy },
  ] as const;

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-700 mb-4 tracking-tight">
            {t.marketInsights.title}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t.marketInsights.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === cat.id
                  ? 'bg-brand-700 text-white shadow-lg shadow-brand-700/30'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-brand-700 backdrop-blur-sm shadow-sm">
                    <Tag size={12} className="mr-1" />
                    {t.marketInsights.categories[article.category]}
                  </span>
                </div>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-gray-400 mb-3">
                  <Calendar size={14} className="mr-1" />
                  {article.date}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-600 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {article.summary}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <button className="flex items-center text-sm font-semibold text-brand-600 hover:text-brand-gold transition-colors">
                    {t.marketInsights.readMore} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination Placeholder */}
        <div className="mt-16 flex justify-center">
            <button className="px-8 py-3 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                {t.marketInsights.viewArchives}
            </button>
        </div>

      </div>
    </div>
  );
};
