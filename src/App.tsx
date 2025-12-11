
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { MarketInsights } from './pages/MarketInsights';
import { Dashboard } from './pages/admin/Dashboard';
import { AdminContent } from './pages/admin/AdminContent';
import { AdminArticles } from './pages/admin/AdminArticles';
import { AdminInquiries } from './pages/admin/AdminInquiries';
import { AdminLogin } from './pages/admin/AdminLogin';

// Simple placeholder for Business page
const Business = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-28 pb-16 min-h-screen max-w-7xl mx-auto px-4">
      <div className="mb-12 border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-bold text-brand-700 mb-4">{t.business.title}</h1>
        <p className="text-xl text-gray-500 max-w-3xl">{t.business.subtitle}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
         {t.business.items.map((item, i) => (
           <div key={i} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-brand-600">
             <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
             <p className="text-gray-600 leading-relaxed">{item.desc}</p>
           </div>
         ))}
      </div>
    </div>
  );
};

// Protected Route Component for Admin
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // Note: In a real app, we would distinguish between user auth and admin auth.
  // For this demo, we use the same auth state but redirect to admin login if not auth.
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <ProtectedAdminRoute>
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="articles" element={<AdminArticles />} />
                <Route path="inquiries" element={<AdminInquiries />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </AdminLayout>
          </ProtectedAdminRoute>
        } />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/business" element={<Business />} />
        <Route path="/market-insights" element={<MarketInsights />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AuthProvider>
        <LanguageProvider>
          <Router>
             <AppRoutes />
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </DataProvider>
  );
};

export default App;
