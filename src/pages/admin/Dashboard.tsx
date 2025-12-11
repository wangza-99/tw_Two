
import React from 'react';
import { useData } from '../../context/DataContext';
import { Users, Eye, FileText, ArrowUpRight } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { data } = useData();

  const stats = [
    { label: '总文章数', value: data.cn.marketInsights.articles.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: '今日访问', value: '1,284', icon: Eye, color: 'text-green-600', bg: 'bg-green-100' },
    { label: '注册用户', value: '342', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">系统概览</h1>
        <p className="text-gray-500">欢迎回来，管理员。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-full ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
                <ArrowUpRight size={16} className="mr-1" />
                <span>+12% 较上周</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">最近系统动态</h3>
          <div className="space-y-4">
             {[1,2,3].map(i => (
               <div key={i} className="flex items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm text-gray-800 font-medium">更新了“市场洞察”文章列表</p>
                    <p className="text-xs text-gray-400 mt-1">2小时前 • 管理员</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
        
        <div className="bg-brand-700 p-6 rounded-xl text-white shadow-lg">
           <h3 className="font-bold mb-2">快速操作</h3>
           <p className="text-brand-200 text-sm mb-6">管理首页显示的各类信息</p>
           <div className="space-y-3">
             <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-left px-4 text-sm transition-colors">
               发布新公告
             </button>
             <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-left px-4 text-sm transition-colors">
               审核新用户注册
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};
