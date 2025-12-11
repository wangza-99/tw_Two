
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { MessageSquare, Mail, User, Clock, Check, Trash2, AlertCircle } from 'lucide-react';
import { Inquiry } from '../../types';

export const AdminInquiries: React.FC = () => {
  const { data, updateSection } = useData();
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  // We primarily use 'cn' data as the master storage for inquiries
  const inquiries = data.cn.inquiries || [];

  const filteredInquiries = inquiries.filter((inquiry: Inquiry) => {
    if (activeTab === 'unread') return inquiry.status === 'unread';
    return true;
  }).sort((a: Inquiry, b: Inquiry) => b.id - a.id); // Newest first

  const handleMarkAsRead = (id: number) => {
    const updatedInquiries = inquiries.map((inq: Inquiry) => 
      inq.id === id ? { ...inq, status: 'read' as const } : inq
    );
    updateSection('cn', 'inquiries', updatedInquiries);
    updateSection('en', 'inquiries', updatedInquiries); // Sync
  };

  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这条咨询信息吗？')) {
      const updatedInquiries = inquiries.filter((inq: Inquiry) => inq.id !== id);
      updateSection('cn', 'inquiries', updatedInquiries);
      updateSection('en', 'inquiries', updatedInquiries); // Sync
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MessageSquare className="text-brand-600" />
          <span>咨询信息管理</span>
        </h1>
        <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 text-sm rounded-md transition-all font-medium ${activeTab === 'all' ? 'bg-brand-100 text-brand-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            全部
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`px-4 py-1.5 text-sm rounded-md transition-all font-medium ${activeTab === 'unread' ? 'bg-brand-100 text-brand-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            未读 ({inquiries.filter((i: Inquiry) => i.status === 'unread').length})
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredInquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <Mail size={48} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">暂无{activeTab === 'unread' ? '未读' : ''}咨询信息</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">状态</th>
                  <th className="px-6 py-4">提交人</th>
                  <th className="px-6 py-4">类型</th>
                  <th className="px-6 py-4">内容</th>
                  <th className="px-6 py-4">时间</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInquiries.map((inquiry: Inquiry) => (
                  <tr key={inquiry.id} className={`hover:bg-gray-50 transition-colors ${inquiry.status === 'unread' ? 'bg-brand-50/30' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {inquiry.status === 'unread' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <AlertCircle size={12} className="mr-1" /> 未读
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Check size={12} className="mr-1" /> 已读
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 flex items-center">
                           <User size={14} className="mr-1.5 text-gray-400"/> {inquiry.name}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center mt-1">
                           <Mail size={14} className="mr-1.5 text-gray-400"/> {inquiry.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {inquiry.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 min-w-[300px]">
                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 hover:line-clamp-none transition-all cursor-default">
                        {inquiry.message}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                         <Clock size={14} className="mr-1.5 text-gray-400" />
                         {inquiry.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {inquiry.status === 'unread' && (
                          <button 
                            onClick={() => handleMarkAsRead(inquiry.id)}
                            className="text-brand-600 hover:text-brand-900 p-1.5 hover:bg-brand-50 rounded"
                            title="标记为已读"
                          >
                            <Check size={18} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(inquiry.id)}
                          className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded"
                          title="删除"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
