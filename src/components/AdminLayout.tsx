
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Newspaper, LogOut, Home, Menu, X, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/admin/dashboard', label: '概览', icon: LayoutDashboard },
    { path: '/admin/content', label: '页面内容', icon: FileText },
    { path: '/admin/articles', label: '文章管理', icon: Newspaper },
    { path: '/admin/inquiries', label: '咨询管理', icon: MessageSquare },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header */}
      <header className="md:hidden bg-brand-700 text-white p-4 flex justify-between items-center shadow-md z-40 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-gold rounded flex items-center justify-center font-bold text-brand-700 text-sm">
            TW
          </div>
          <span className="font-bold tracking-wide">后台管理</span>
        </div>
        <button onClick={toggleSidebar} className="p-1 hover:bg-brand-600 rounded focus:outline-none">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Overlay (Mobile Only) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:sticky top-0 h-screen w-64 bg-brand-700 text-white flex flex-col shadow-2xl z-40 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
        `}
      >
        <div className="hidden md:flex p-6 border-b border-brand-600 items-center gap-3">
          <div className="w-8 h-8 bg-brand-gold rounded flex items-center justify-center font-bold text-brand-700">
            TW
          </div>
          <span className="text-lg font-bold tracking-wide">后台管理系统</span>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-brand-600 text-brand-gold shadow-lg' 
                    : 'text-gray-300 hover:bg-brand-600/50 hover:text-white'
                }`}
              >
                <Icon size={20} className={`mr-3 ${isActive ? 'text-brand-gold' : 'text-gray-400 group-hover:text-white'}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-brand-600 bg-brand-800/50 mt-auto">
          <Link to="/" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors mb-2">
            <Home size={16} className="mr-3" />
            返回前台首页
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-300 hover:text-red-100 transition-colors hover:bg-red-500/10 rounded"
          >
            <LogOut size={16} className="mr-3" />
            退出登录
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};
