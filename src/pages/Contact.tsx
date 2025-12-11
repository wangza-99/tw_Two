
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { MapPin, Phone, Mail, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { Inquiry } from '../types';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const { data, updateSection } = useData();
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '机构投资者', // Default
    message: ''
  });

  // UI State
  const [errors, setErrors] = useState<{name?: string; email?: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  // Regex for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors: {name?: string; email?: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required / 姓名不能为空';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters / 姓名至少需要2个字符';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required / 邮箱不能为空';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address / 邮箱格式不正确';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate network delay then save
      setTimeout(() => {
        const newInquiry: Inquiry = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          type: formData.type || t.contact.form.typeOptions.institutional,
          message: formData.message,
          date: new Date().toISOString().split('T')[0],
          status: 'unread'
        };

        // We use the 'cn' data set as the master storage for inquiries to ensure they are centralized
        const existingInquiries = data.cn.inquiries || [];
        const updatedInquiries = [newInquiry, ...existingInquiries];
        
        // Update both CN and EN stores to ensure persistence is robust regardless of current view language
        updateSection('cn', 'inquiries', updatedInquiries);
        updateSection('en', 'inquiries', updatedInquiries);

        setIsSubmitting(false);
        setSubmitStatus('success');
        
        // Reset form
        setFormData({ name: '', email: '', type: t.contact.form.typeOptions.institutional, message: '' });
        
        // Clear success message
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }, 1000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user types
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-16 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-700 mb-6 tracking-tight">
            {t.contact.title}
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed font-light">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Contact Info */}
          <div className="w-full lg:w-1/3 space-y-12 pt-4">
            
            {/* Address */}
            <div className="flex items-start group">
              <div className="w-12 h-12 rounded-full bg-white border border-brand-200 shadow-sm flex items-center justify-center text-brand-gold shrink-0 mt-1 mr-6 group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-700 mb-2">{t.contact.addressTitle}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.contact.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start group">
              <div className="w-12 h-12 rounded-full bg-white border border-brand-200 shadow-sm flex items-center justify-center text-brand-gold shrink-0 mt-1 mr-6 group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-700 mb-2">{t.contact.phoneTitle}</h3>
                <p className="text-gray-600">
                  {t.contact.phone}
                </p>
                <p className="text-gray-500 text-sm mt-1">Mon-Fri, 9am - 6pm</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start group">
              <div className="w-12 h-12 rounded-full bg-white border border-brand-200 shadow-sm flex items-center justify-center text-brand-gold shrink-0 mt-1 mr-6 group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-700 mb-2">{t.contact.emailTitle}</h3>
                <div className="flex flex-col space-y-1">
                  <a href={`mailto:${t.contact.email}`} className="text-gray-600 hover:text-brand-600 transition-colors">
                    {t.contact.email}
                  </a>
                  <a href={`mailto:${t.contact.email2}`} className="text-gray-600 hover:text-brand-600 transition-colors">
                    {t.contact.email2}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 relative overflow-hidden border-t-4 border-brand-gold">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {t.contact.form.title}
              </h2>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-700 block">
                    {t.contact.form.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-[#404040] text-white border-none rounded-md px-4 py-3.5 focus:ring-2 focus:ring-brand-500 placeholder-gray-400/70 transition-all ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                    placeholder=""
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs flex items-center mt-1">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700 block">
                    {t.contact.form.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-[#404040] text-white border-none rounded-md px-4 py-3.5 focus:ring-2 focus:ring-brand-500 transition-all ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs flex items-center mt-1">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-semibold text-gray-700 block">
                    {t.contact.form.type}
                  </label>
                  <div className="relative">
                     <select
                      id="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full bg-[#404040] text-white border-none rounded-md px-4 py-3.5 focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer"
                    >
                      <option value={t.contact.form.typeOptions.institutional}>{t.contact.form.typeOptions.institutional}</option>
                      <option value={t.contact.form.typeOptions.individual}>{t.contact.form.typeOptions.individual}</option>
                      <option value={t.contact.form.typeOptions.media}>{t.contact.form.typeOptions.media}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700 block">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-[#404040] text-white border-none rounded-md px-4 py-3.5 focus:ring-2 focus:ring-brand-500 resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className={`w-full font-bold py-4 px-6 rounded-md shadow-lg transition-all transform flex items-center justify-center group ${
                      submitStatus === 'success' 
                      ? 'bg-green-600 text-white cursor-default' 
                      : isSubmitting 
                        ? 'bg-brand-600 text-white cursor-wait opacity-80' 
                        : 'bg-brand-700 hover:bg-brand-800 text-white hover:-translate-y-1'
                    }`}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : submitStatus === 'success' ? (
                      <span className="flex items-center">
                        Sent Successfully <CheckCircle size={18} className="ml-2" />
                      </span>
                    ) : (
                      <>
                        <span>{t.contact.form.submit}</span>
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
