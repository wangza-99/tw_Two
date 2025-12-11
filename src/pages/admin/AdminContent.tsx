
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save, RotateCcw } from 'lucide-react';

export const AdminContent: React.FC = () => {
  const { data, updateData, resetData } = useData();
  const [activeLang, setActiveLang] = useState<'cn' | 'en'>('cn');
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'contact'>('hero');

  const handleInputChange = (section: any, key: string, value: string) => {
    updateData(activeLang, section, key, value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">页面内容管理</h1>
        <div className="flex space-x-2">
          <button 
            onClick={resetData}
            className="flex items-center px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
          >
            <RotateCcw size={16} className="mr-2" />
            重置所有数据
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Language Toggles */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveLang('cn')}
            className={`flex-1 py-3 text-center font-medium text-sm ${activeLang === 'cn' ? 'bg-brand-50 text-brand-700 border-b-2 border-brand-700' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            中文内容 (CN)
          </button>
          <button
            onClick={() => setActiveLang('en')}
            className={`flex-1 py-3 text-center font-medium text-sm ${activeLang === 'en' ? 'bg-brand-50 text-brand-700 border-b-2 border-brand-700' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            英文内容 (EN)
          </button>
        </div>

        {/* Section Tabs */}
        <div className="p-4 bg-gray-50 flex space-x-2 border-b border-gray-200">
          {['hero', 'about', 'contact'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-white text-brand-700 shadow-sm ring-1 ring-gray-200' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab === 'hero' && '首页 Header'}
              {tab === 'about' && '关于我们'}
              {tab === 'contact' && '联系信息'}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="p-6">
          {activeTab === 'hero' && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">主标题 (Title)</label>
                <input
                  type="text"
                  value={data[activeLang].hero.title}
                  onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">副标题 (Subtitle)</label>
                <textarea
                  rows={3}
                  value={data[activeLang].hero.subtitle}
                  onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">按钮文字 (CTA)</label>
                <input
                  type="text"
                  value={data[activeLang].hero.cta}
                  onChange={(e) => handleInputChange('hero', 'cta', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'about' && (
             <div className="space-y-4 max-w-2xl">
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">页面标题</label>
                <input
                  type="text"
                  value={data[activeLang].about.title}
                  onChange={(e) => handleInputChange('about', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">公司简介</label>
                <textarea
                  rows={6}
                  value={data[activeLang].about.description}
                  onChange={(e) => handleInputChange('about', 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">图片副标题</label>
                 <input
                  type="text"
                  value={data[activeLang].about.imageSubtitle}
                  onChange={(e) => handleInputChange('about', 'imageSubtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
             </div>
          )}

          {activeTab === 'contact' && (
             <div className="space-y-4 max-w-2xl">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
                    <input
                      type="text"
                      value={data[activeLang].contact.phone}
                      onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱</label>
                    <input
                      type="text"
                      value={data[activeLang].contact.email}
                      onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                 </div>
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">公司地址</label>
                  <input
                    type="text"
                    value={data[activeLang].contact.address}
                    onChange={(e) => handleInputChange('contact', 'address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                  />
               </div>
             </div>
          )}
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
           <span className="text-xs text-gray-500">修改将自动保存到本地存储，刷新页面不会丢失。</span>
           <div className="flex items-center text-green-600 text-sm font-medium">
             <Save size={16} className="mr-1" />
             已实时保存
           </div>
        </div>
      </div>
    </div>
  );
};
