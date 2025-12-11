
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { X, Lock, User, Eye, EyeOff, ShieldCheck, Mail } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { t } = useLanguage();
  const { isModalOpen, closeModal, modalMode, openModal, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isModalOpen) return null;

  const isLogin = modalMode === 'login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay for dramatic effect
    setTimeout(() => {
      setLoading(false);
      login(); // AuthContext handles closing the modal
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-900/80 backdrop-blur-sm transition-opacity" 
        onClick={closeModal}
      ></div>

      {/* Modal Container - Changed bg-[#111827] to bg-brand-700 */}
      <div className="relative bg-brand-700 w-full max-w-[420px] rounded-2xl shadow-2xl overflow-hidden border border-brand-600 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Section */}
        <div className="px-8 pt-8 pb-6 text-center">
            {/* Close Button */}
            <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-brand-200 hover:text-white transition-colors p-1"
            >
                <X size={20} />
            </button>

            {/* Lock Icon - Changed orange to brand-gold */}
            <div className="mx-auto w-12 h-12 mb-4 flex items-center justify-center bg-brand-800/50 rounded-full">
                <Lock className="text-brand-gold w-6 h-6" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                {isLogin ? t.auth.loginTitle : t.auth.registerTitle}
            </h2>
            <p className="text-brand-100 text-xs leading-relaxed max-w-[85%] mx-auto opacity-80">
                {isLogin ? t.auth.welcomeBack : t.auth.welcomeNew}
            </p>
        </div>

        {/* Body Section */}
        <div className="px-8 pb-8 bg-white rounded-t-3xl pt-8 mt-2 min-h-[400px]">
            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name Input (Register Only) */}
                {!isLogin && (
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 ml-1">{t.auth.namePlaceholder}</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            {/* Changed dark input style to light theme consistent with corporate site */}
                            <input
                                type="text"
                                required
                                placeholder={t.auth.namePlaceholder}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all hover:bg-white"
                            />
                        </div>
                    </div>
                )}

                {/* ID/Email Input */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 ml-1">{t.auth.emailPlaceholder}</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {isLogin ? <User className="h-5 w-5 text-gray-400" /> : <Mail className="h-5 w-5 text-gray-400" />}
                        </div>
                        <input
                            type={isLogin ? "text" : "email"}
                            required
                            placeholder={t.auth.emailPlaceholder}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all hover:bg-white"
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 ml-1">{t.auth.passwordPlaceholder}</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder={t.auth.passwordPlaceholder}
                            className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all hover:bg-white"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-brand-600 transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password (Register Only) */}
                {!isLogin && (
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 ml-1">{t.auth.confirmPasswordPlaceholder}</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                placeholder={t.auth.confirmPasswordPlaceholder}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all hover:bg-white"
                            />
                        </div>
                    </div>
                )}

                {/* Login Options */}
                {isLogin && (
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-gray-600 select-none cursor-pointer">
                                {t.auth.rememberMe}
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">
                                {t.auth.forgotPassword}
                            </a>
                        </div>
                    </div>
                )}

                {/* Submit Button - Changed to brand-700 to match Contact page button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white tracking-wide ${
                        loading ? 'bg-brand-500 cursor-not-allowed' : 'bg-brand-700 hover:bg-brand-800'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-900 transition-all transform hover:-translate-y-0.5`}
                >
                    {loading ? 'Processing...' : (isLogin ? t.auth.submitLogin : t.auth.submitRegister)}
                </button>

                {/* SSL Badge */}
                <div className="flex items-center justify-center space-x-2 py-2 border-t border-gray-100 mt-4">
                    <ShieldCheck className="text-green-500 w-4 h-4" />
                    <span className="text-[10px] text-gray-500 font-medium">
                        {t.auth.sslSecure}
                    </span>
                </div>

                {/* Switch Mode */}
                <div className="text-center mt-2">
                    <p className="text-sm text-gray-600">
                        {isLogin ? t.auth.noAccount.split('?')[0] + '?' : t.auth.hasAccount.split('?')[0] + '?'} {' '}
                        <button
                            type="button"
                            onClick={() => openModal(isLogin ? 'register' : 'login')}
                            className="font-bold text-brand-700 hover:text-brand-gold hover:underline transition-colors"
                        >
                            {isLogin ? t.auth.submitRegister : t.nav.login}
                        </button>
                    </p>
                </div>

            </form>
        </div>
      </div>
    </div>
  );
};
