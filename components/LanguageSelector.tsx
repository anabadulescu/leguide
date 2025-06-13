'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', description: 'International Business' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', description: 'Marché Français' },
    { code: 'ro', name: 'Română', flag: '🇷🇴', description: 'Piața Română' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Main Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="card-luxury p-3 hover:shadow-gold transition-all duration-300 group"
      >
        <div className="flex items-center space-x-3">
          {/* Globe Icon */}
          <div className="w-8 h-8 bg-gradient-to-br from-maison-gold-400 to-maison-gold-600 rounded-full flex items-center justify-center shadow-sm">
            <Globe className="w-4 h-4 text-white" />
          </div>
          
          {/* Language Info */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-xl">{currentLanguage.flag}</span>
              <div className="text-left">
                <div className="text-sm font-semibold text-maison-navy-800">
                  {currentLanguage.name}
                </div>
                <div className="text-xs text-maison-navy-500">
                  {currentLanguage.description}
                </div>
              </div>
            </div>
            
            {/* Chevron */}
            <ChevronDown 
              className={`w-4 h-4 text-maison-navy-600 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          </div>
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.2 
              }}
              className="absolute top-full right-0 mt-3 z-50 min-w-[280px]"
            >
              <div className="card-premium overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-maison-gold-50 to-maison-navy-50 px-4 py-3 border-b border-maison-gold-200/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-gradient-to-br from-maison-gold-400 to-maison-navy-600 rounded-full flex items-center justify-center">
                      <Globe className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-maison-navy-800">Select Language</span>
                  </div>
                </div>
                
                {/* Language Options */}
                <div className="py-2">
                  {languages.map((language, index) => (
                    <motion.button
                      key={language.code}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-maison-gold-50 hover:to-maison-navy-50 transition-all duration-200 group ${
                        i18n.language === language.code 
                          ? 'bg-gradient-to-r from-maison-gold-100/50 to-maison-navy-100/50 border-l-4 border-maison-gold-400' 
                          : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {/* Flag */}
                          <span className="text-2xl">{language.flag}</span>
                          
                          {/* Language Info */}
                          <div>
                            <div className={`text-sm font-semibold ${
                              i18n.language === language.code 
                                ? 'text-maison-navy-900' 
                                : 'text-maison-navy-700 group-hover:text-maison-navy-900'
                            }`}>
                              {language.name}
                            </div>
                            <div className={`text-xs ${
                              i18n.language === language.code 
                                ? 'text-maison-gold-600' 
                                : 'text-maison-navy-500 group-hover:text-maison-navy-600'
                            }`}>
                              {language.description}
                            </div>
                          </div>
                        </div>
                        
                        {/* Check Icon */}
                        {i18n.language === language.code && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 bg-gradient-to-br from-maison-gold-400 to-maison-gold-600 rounded-full flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                {/* Footer */}
                <div className="bg-gradient-to-r from-maison-gold-50/50 to-maison-navy-50/50 px-4 py-2 border-t border-maison-gold-200/20">
                  <div className="flex items-center justify-center space-x-2 text-xs text-maison-navy-500">
                    <div className="w-1.5 h-1.5 bg-maison-gold-400 rounded-full animate-pulse"></div>
                    <span>Cross-cultural expertise in every language</span>
                    <div className="w-1.5 h-1.5 bg-maison-navy-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector; 