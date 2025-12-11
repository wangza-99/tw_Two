
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import { CookieConsent } from './CookieConsent';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const { isAuthenticated, logout, openModal } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if we are on the home page
  const isHome = location.pathname === '/';

  // Navbar is transparent ONLY at the top of the Home page
  // Everywhere else (scrolled or inner pages), it is solid dark brand color
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'cn' ? 'en' : 'cn');
  };

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    { path: '/business', label: t.nav.business },
    { path: '/market-insights', label: t.nav.marketInsights },
    { path: '/contact', label: t.nav.contact },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800 bg-slate-50">
      <AuthModal />
      <CookieConsent />
      
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 border-b border-transparent ${
          isTransparent 
            ? 'bg-transparent py-4' 
            : 'bg-brand-700 shadow-lg py-3 border-brand-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            {/* Logo (Left Aligned) */}
            <div className="flex-shrink-0 flex items-center cursor-pointer z-20" onClick={() => navigate('/')}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 shadow-md ${isTransparent ? 'bg-brand-600' : 'bg-brand-600 border border-brand-500'}`}>
                <span className="text-white font-bold text-xl">TW</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-white tracking-wide">
                  {language === 'cn' ? '同威投资' : 'Tongwei Invest'}
                </span>
                <span className="text-xs text-brand-100 opacity-80">
                  SZ TONGWEI INVESTMENT
                </span>
              </div>
            </div>

            {/* Desktop Menu Links (Centered Absolutely) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-bold transition-all duration-200 hover:text-brand-gold relative group ${
                    location.pathname === link.path
                      ? 'text-brand-gold'
                      : 'text-gray-100'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-brand-gold transform origin-left transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              ))}
            </div>

            {/* Right Actions (Language & Auth) */}
            <div className="hidden md:flex items-center space-x-5 z-20">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-sm text-gray-100 hover:text-brand-gold transition-colors font-medium"
              >
                <Globe size={18} />
                <span>{language === 'cn' ? 'EN' : '中文'}</span>
              </button>

              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="px-5 py-2 text-sm font-medium text-white bg-brand-600 rounded-full hover:bg-brand-500 hover:shadow-lg transition-all border border-brand-500"
                >
                  {t.nav.logout}
                </button>
              ) : (
                <button
                  onClick={() => openModal('login')}
                  className="px-5 py-2 text-sm font-medium text-white bg-brand-gold rounded-full hover:bg-yellow-500 hover:shadow-lg transition-all flex items-center shadow-md shadow-black/20 transform hover:-translate-y-0.5"
                >
                  <User size={16} className="mr-1" />
                  {t.nav.login}
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center z-20">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-white hover:bg-brand-600 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-brand-800 shadow-xl absolute w-full top-full left-0 border-t border-brand-600">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                     location.pathname === link.path 
                     ? 'text-brand-gold bg-brand-900/50' 
                     : 'text-gray-200 hover:text-white hover:bg-brand-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-brand-600/50 my-4 pt-4 space-y-3">
                 <button
                  onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }}
                  className="w-full text-left flex items-center px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
                >
                  <Globe size={18} className="mr-3" />
                  {language === 'cn' ? 'Switch to English' : '切换到中文'}
                </button>
                {isAuthenticated ? (
                  <button
                     onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                     className="w-full text-left block px-3 py-2 text-base font-medium text-red-400 hover:text-red-300"
                  >
                    {t.nav.logout}
                  </button>
                ) : (
                  <button
                    onClick={() => { openModal('login'); setIsMobileMenuOpen(false); }}
                    className="w-full text-left block px-3 py-2 text-base font-medium text-brand-gold hover:text-yellow-400"
                  >
                    {t.nav.login} / {t.nav.register}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-700 text-white pt-16 pb-8 border-t border-brand-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center mr-3 border border-brand-500">
                   <span className="text-white font-bold text-xl">TW</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{language === 'cn' ? '同威投资' : 'Tongwei Investment'}</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                {t.hero.subtitle}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-brand-gold">{t.nav.contact}</h3>
              <div className="space-y-4 text-sm text-gray-300">
                <p className="flex items-start"><span className="opacity-50 w-16 shrink-0">Add:</span> {t.contact.address}</p>
                <p className="flex items-center"><span className="opacity-50 w-16 shrink-0">Tel:</span> {t.contact.phone}</p>
                <p className="flex items-center"><span className="opacity-50 w-16 shrink-0">Email:</span> {t.contact.email}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-brand-gold">{t.nav.business}</h3>
               <div className="flex flex-col gap-3">
                 {t.business.items.slice(0,4).map((item, i) => (
                   <Link to="/business" key={i} className="text-sm text-gray-300 hover:text-white hover:underline decoration-brand-gold underline-offset-4 transition-all">
                     {item.title}
                   </Link>
                 ))}
               </div>
            </div>
          </div>
          
          <div className="border-t border-brand-600/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Shenzhen Tongwei Investment Management Co., Ltd. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
               <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
               <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
