'use client';

import React from 'react';
import { Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import LanguageSelector from './LanguageSelector';

interface ChatHeaderProps {
  className?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const animationProps = shouldReduceMotion 
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.15 } }
    : { 
        initial: { y: -20, opacity: 0 }, 
        animate: { y: 0, opacity: 1 }, 
        transition: { duration: 0.6 }
      };

  return (
    <motion.header 
      {...animationProps}
      className={`bg-white/80 backdrop-blur-lg border-b border-maison-gold-300/30 shadow-elegant flex-shrink-0 ${className}`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={shouldReduceMotion ? { opacity: 0 } : { x: -20, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2, duration: shouldReduceMotion ? 0.15 : 0.6 }}
          >
            <div className="relative" aria-hidden="true">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-maison-gold-400 to-maison-navy-600 rounded-full flex items-center justify-center shadow-gold">
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              {!shouldReduceMotion && (
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-maison-gold-500 rounded-full animate-luxury-pulse"></div>
              )}
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-display font-bold text-gradient-luxury">
                {t('title')}
              </h1>
              <p className="text-xs text-maison-navy-400 font-medium tracking-wide hidden sm:block">
                {t('subtitle')}
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { x: 20, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: shouldReduceMotion ? 0.15 : 0.6 }}
          >
            <LanguageSelector />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default ChatHeader; 