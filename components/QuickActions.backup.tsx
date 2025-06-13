'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building, MapPin, Users, BookOpen, Gavel, Globe2, MessageSquare, AlertTriangle, Clock, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface QuickActionsProps {
  onActionClick: (query: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Primary actions - always visible (limit to 3)
  const primaryActions = [
    {
      id: 'team-communication',
      icon: MessageSquare,
      titleKey: 'teamCommunication',
      query: 'Analyze my international team communication and provide real-time cultural coaching',
      gradient: 'from-blue-500 to-indigo-600',
      category: 'primary'
    },
    {
      id: 'conflict-resolution',
      icon: AlertTriangle,
      titleKey: 'conflictResolution',
      query: 'Help resolve cross-cultural team conflict with AI coaching and cultural mediation',
      gradient: 'from-red-500 to-pink-600',
      category: 'primary'
    },
    {
      id: 'cultural-tips',
      icon: Users,
      titleKey: 'culturalTips',
      query: 'What are important cultural considerations for international business teams?',
      gradient: 'from-maison-navy-500 to-maison-navy-700',
      category: 'primary'
    }
  ];

  // Secondary actions - shown when expanded
  const secondaryActions = [
    {
      id: 'timing-optimization',
      icon: Clock,
      titleKey: 'timingOptimization',
      query: 'Optimize communication timing for my French, Romanian, and American team members',
      gradient: 'from-purple-500 to-violet-600',
      category: 'coaching'
    },
    {
      id: 'france-regs',
      icon: Building,
      titleKey: 'franceRegulations',
      query: 'What are the key business regulations for starting a company in France?',
      gradient: 'from-blue-600 to-maison-navy-600',
      category: 'compliance'
    },
    {
      id: 'romania-laws',
      icon: Gavel,
      titleKey: 'romaniaLaws',
      query: 'Tell me about business laws and compliance requirements in Romania',
      gradient: 'from-maison-gold-500 to-maison-gold-600',
      category: 'compliance'
    },
    {
      id: 'us-expansion',
      icon: MapPin,
      titleKey: 'usExpansion',
      query: 'How can European businesses expand to the US market, specifically Arizona?',
      gradient: 'from-emerald-500 to-emerald-600',
      category: 'expansion'
    },
    {
      id: 'language-training',
      icon: BookOpen,
      titleKey: 'languageTraining',
      query: 'What language training programs do you offer for business contexts?',
      gradient: 'from-teal-500 to-teal-600',
      category: 'training'
    },
    {
      id: 'services',
      icon: Globe2,
      titleKey: 'servicesTitle',
      query: 'What AI Collaboration Coach services does Maison de Culture offer and pricing?',
      gradient: 'from-maison-gold-400 to-maison-navy-600',
      category: 'services'
    }
  ];

  const animationProps = shouldReduceMotion 
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : { 
        initial: { y: 20, opacity: 0 }, 
        animate: { y: 0, opacity: 1 }, 
        transition: { duration: 0.6, delay: 0.2 }
      };

  return (
    <motion.div 
      {...animationProps}
      className="bg-gradient-to-r from-white/70 via-white/80 to-white/70 backdrop-blur-lg border-t border-maison-gold-200/40 shadow-elegant flex-shrink-0"
      role="region"
      aria-label="Quick actions"
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Primary Actions - Always Visible */}
        <div className="py-3">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {primaryActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{ 
                    delay: shouldReduceMotion ? 0 : 0.1 + (index * 0.05),
                    duration: shouldReduceMotion ? 0.15 : 0.3
                  }}
                  whileHover={shouldReduceMotion ? {} : { 
                    scale: 1.02, 
                    y: -1,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={shouldReduceMotion ? {} : { 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  onClick={() => onActionClick(action.query)}
                  className="group relative overflow-hidden focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded-lg"
                  aria-label={t(action.titleKey)}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-white/50 group-hover:border-blue-200">
                    <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br ${action.gradient} rounded-md sm:rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 ${shouldReduceMotion ? '' : 'group-hover:scale-110'}`}>
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      
                      <span className="text-xs sm:text-sm font-medium text-maison-navy-700 leading-tight group-hover:text-maison-navy-900 transition-colors duration-300 line-clamp-2">
                        {t(action.titleKey)}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Compact Toggle Button */}
          <div className="flex justify-center mt-3">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-maison-gold-400 to-maison-navy-600 text-white rounded-full text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-maison-gold-400 focus:ring-offset-2"
              aria-expanded={isExpanded}
              aria-controls="secondary-actions"
              aria-label={isExpanded ? 'Hide more options' : 'Show more options'}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{isExpanded ? 'Less Options' : 'More Options'}</span>
              {isExpanded ? (
                <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Expandable Secondary Actions */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id="secondary-actions"
              initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.3, ease: 'easeInOut' }}
              className="overflow-hidden pb-3"
            >
              <div className="border-t border-maison-gold-200/30 pt-3">
                <div className="flex items-center justify-center mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-maison-gold-400 to-maison-gold-600 rounded-full flex items-center justify-center">
                      <Sparkles className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-display font-semibold bg-gradient-to-r from-maison-gold-600 to-maison-navy-600 bg-clip-text text-transparent">
                      Business Services
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                  {secondaryActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={action.id}
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        transition={{ 
                          delay: shouldReduceMotion ? 0 : index * 0.05,
                          duration: shouldReduceMotion ? 0.15 : 0.3
                        }}
                        whileHover={shouldReduceMotion ? {} : { 
                          scale: 1.02, 
                          y: -1,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={shouldReduceMotion ? {} : { 
                          scale: 0.98,
                          transition: { duration: 0.1 }
                        }}
                        onClick={() => onActionClick(action.query)}
                        className="group relative overflow-hidden focus:ring-2 focus:ring-maison-gold-400 focus:ring-offset-2 rounded-lg"
                        aria-label={t(action.titleKey)}
                      >
                        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-sm hover:shadow-md transition-all duration-300 border border-white/30 group-hover:border-maison-gold-200 group-hover:bg-white/80">
                          <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2">
                            <div className={`w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br ${action.gradient} rounded-md flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 ${shouldReduceMotion ? '' : 'group-hover:scale-105'}`}>
                              <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                            </div>
                            
                            <span className="text-xs font-medium text-maison-navy-600 leading-tight group-hover:text-maison-navy-800 transition-colors duration-300 line-clamp-2">
                              {t(action.titleKey)}
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuickActions; 