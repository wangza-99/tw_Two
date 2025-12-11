
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, Edit2, X, Check, Image as ImageIcon, Calendar, Tag, Type, Newspaper } from 'lucide-react';

export const AdminArticles: React.FC = () => {
  const { data, updateSection } = useData();
  const [activeLang, setActiveLang] = useState<'cn' | 'en'>('cn');
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<any>(null);

  const articles = data[activeLang].marketInsights.articles;

  const handleEdit = (article: any) => {
    setCurrentArticle({ ...article });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreate = () => {
    // Generate a new ID based on the max existing ID
    const maxId = articles.length > 0 ? Math.max(...articles.map((a: any) => a.id)) : 0;
    const newId = maxId + 1;
    
    // Create random seed for image to ensure variety
    const randomSeed = Math.floor(Math.random() * 1000);

    setCurrentArticle({
      id: newId,
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'macro',
      image: `https://picsum.photos/seed/${newId}-${randomSeed}/800/600`,
      summary: ''
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这篇文章吗？此操作无法撤销。')) {
      const updatedArticles = articles.filter((a: any) => a.id !== id);
      const marketInsights = { ...data[activeLang].marketInsights, articles: updatedArticles };
      updateSection(activeLang, 'marketInsights', marketInsights);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!currentArticle.title.trim()) {
      alert('请输入文章标题');
      return;
    }
    if (!currentArticle.summary.trim()) {
      alert('请输入文章摘要');
      return;
    }

    let updatedArticles;
    // Check if ID exists in original list to determine if it's an update or create
    const exists = articles.find((a: any) => a.id === currentArticle.id);
    
    if (exists) {
      // Update existing
      updatedArticles = articles.map((a: any) => a.id === currentArticle.id ? currentArticle : a);
    } else {
      // Create new (add to top)
      updatedArticles = [currentArticle, ...articles];
    }
    
    // Save to context (localStorage)
    const marketInsights = { ...data[activeLang].marketInsights, articles: updatedArticles };
    updateSection(activeLang, 'marketInsights', marketInsights);
    
    // Success feedback and close editor
    alert(exists ? '文章更新成功！' : '新文章发布成功！');
    setIsEditing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Newspaper className="text-brand-600" />
          <span>文章管理</span>
        </h1>
        <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
          <button
            onClick={() => setActiveLang('cn')}
            className={`px-4 py-1.5 text-sm rounded-md transition-all font-medium ${activeLang === 'cn' ? 'bg-brand-100 text-brand-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <span>中文</span>
          </button>
          <button
            onClick={() => setActiveLang('en')}
            className={`px-4 py-1.5 text-sm rounded-md transition-all font-medium ${activeLang === 'en' ? 'bg-brand-100 text-brand-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <span>英文</span>
          </button>
        </div>
      </div>

      {!isEditing ? (
        <div key="list-view" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in duration-300">
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 gap-4">
            <span className="font-medium text-gray-700">共 {articles.length} 篇文章 ({activeLang.toUpperCase()})</span>
            <button
              onClick={handleCreate}
              className="w-full sm:w-auto flex items-center justify-center px-4 py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm font-bold shadow-sm"
            >
              <Plus size={18} className="mr-2" />
              <span>发布新文章</span>
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {articles.length === 0 ? (
                <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                    <Newspaper size={48} className="text-gray-300 mb-4" />
                    <p className="text-lg font-medium">暂无文章</p>
                    <p className="text-sm mt-1">点击上方按钮发布第一篇文章。</p>
                </div>
            ) : (
                articles.map((article: any) => (
                <div key={article.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center hover:bg-gray-50 transition-colors gap-4">
                    <div className="relative group shrink-0">
                    <img src={article.image} alt="" className="w-full sm:w-24 h-32 sm:h-16 object-cover rounded-lg shadow-sm bg-gray-200" />
                    <div className="absolute inset-0 bg-black/5 rounded-lg ring-1 ring-inset ring-black/10"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0 w-full">
                    <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1">{article.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2 sm:mb-1">{article.summary}</p>
                    <div className="flex items-center text-xs text-gray-400 space-x-3">
                        <span className={`px-2 py-0.5 rounded-full font-medium ${
                            article.category === 'macro' ? 'bg-blue-100 text-blue-700' :
                            article.category === 'industry' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                        }`}>
                            {article.category === 'macro' ? '宏观经济' : article.category === 'industry' ? '行业趋势' : '投资策略'}
                        </span>
                        <span className="flex items-center"><Calendar size={12} className="mr-1"/> <span>{article.date}</span></span>
                    </div>
                    </div>
                    
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0 mt-2 sm:mt-0">
                    <button onClick={() => handleEdit(article)} className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start px-3 py-1.5 text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-md transition-colors">
                        <Edit2 size={14} className="mr-1.5" /> <span>编辑</span>
                    </button>
                    <button onClick={() => handleDelete(article.id)} className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors">
                        <Trash2 size={14} className="mr-1.5" /> <span>删除</span>
                    </button>
                    </div>
                </div>
                ))
            )}
          </div>
        </div>
      ) : (
        <div key="editor-view" className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-in slide-in-from-right-8 duration-300">
            {/* Editor Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h2 className="text-lg font-bold text-gray-800 flex items-center">
                    {articles.some((a: any) => a.id === currentArticle.id) ? (
                        <>
                             <Edit2 size={20} className="mr-2 text-brand-600"/> <span>编辑文章</span>
                        </>
                    ) : (
                        <>
                             <Plus size={20} className="mr-2 text-green-600"/> <span>新建文章</span>
                        </>
                    )}
                </h2>
                <button 
                    onClick={() => setIsEditing(false)} 
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Editor Form */}
            <form onSubmit={handleSave} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                                <Type size={16} className="mr-2 text-brand-500" /> <span>文章标题</span> <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="输入引人注目的标题..."
                                value={currentArticle.title}
                                onChange={(e) => setCurrentArticle({...currentArticle, title: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-lg font-medium placeholder-gray-300 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2"><span>文章摘要</span> <span className="text-red-500 ml-1">*</span></label>
                            <textarea
                                rows={3}
                                required
                                placeholder="简要描述文章核心内容（此内容将显示在文章列表卡片中）..."
                                value={currentArticle.summary}
                                onChange={(e) => setCurrentArticle({...currentArticle, summary: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all resize-none"
                            />
                        </div>

                        {/* Rich Text Editor Placeholder */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2"><span>文章正文 (模拟功能)</span></label>
                            <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-500 transition-all opacity-80">
                                {/* Toolbar Mockup */}
                                <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-2 flex-wrap">
                                    {['B', 'I', 'U', 'H1', 'H2', 'List', 'Quote', 'Link'].map((tool, i) => (
                                        <div key={i} className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 cursor-pointer text-xs font-bold text-gray-600">
                                            {tool}
                                        </div>
                                    ))}
                                </div>
                                <textarea
                                    rows={10}
                                    className="w-full p-4 outline-none resize-y min-h-[200px] cursor-not-allowed bg-gray-50/50"
                                    placeholder="在此处撰写文章正文..."
                                    readOnly
                                    defaultValue="（注：当前系统仅支持编辑标题、摘要及封面信息。文章正文编辑器为占位符，完整功能待后续升级。）"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide"><span>发布设置</span></h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 flex items-center">
                                        <Tag size={14} className="mr-1.5"/> <span>分类</span>
                                    </label>
                                    <select
                                        value={currentArticle.category}
                                        onChange={(e) => setCurrentArticle({...currentArticle, category: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 outline-none bg-white text-sm"
                                    >
                                        <option value="macro">宏观经济</option>
                                        <option value="industry">行业趋势</option>
                                        <option value="strategy">投资策略</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 flex items-center">
                                        <Calendar size={14} className="mr-1.5"/> <span>发布日期</span>
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={currentArticle.date}
                                        onChange={(e) => setCurrentArticle({...currentArticle, date: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide"><span>封面设置</span></h3>
                             <div>
                                <label className="block text-xs font-bold text-gray-500 mb-2 flex items-center">
                                    <ImageIcon size={14} className="mr-1.5"/> <span>图片链接</span>
                                </label>
                                <input
                                    type="text"
                                    value={currentArticle.image}
                                    onChange={(e) => setCurrentArticle({...currentArticle, image: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 outline-none text-sm mb-3"
                                    placeholder="https://..."
                                />
                                {/* Image Preview */}
                                <div className="aspect-video w-full bg-gray-200 rounded-md overflow-hidden relative border border-gray-300 group">
                                    {currentArticle.image ? (
                                        <img src={currentArticle.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Invalid+Image')}/>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400 text-xs">暂无预览</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                    >
                        <span>取消</span>
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-bold flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                        <Check size={18} className="mr-2" />
                        <span>{articles.some((a: any) => a.id === currentArticle.id) ? '保存修改' : '立即发布'}</span>
                    </button>
                </div>
            </form>
        </div>
      )}
    </div>
  );
};
