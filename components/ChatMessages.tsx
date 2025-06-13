'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Message, ErrorState } from '@/types';
import MessageBubble from './MessageBubble';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  showScrollButton: boolean;
  onScrollToBottom: () => void;
  error?: ErrorState | null;
  retryCount: number;
  className?: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isLoading,
  error,
  retryCount,
  showScrollButton,
  onScroll,
  onScrollToBottom,
  className = ''
}) => {
  const { t } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isScrolling, setIsScrolling] = useState(false);

  // Enhanced animation variants with reduced motion support
  const animationVariants = {
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 },
    animate: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 },
    exit: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.95 },
    transition: {
      duration: shouldReduceMotion ? 0.15 : 0.4,
      type: shouldReduceMotion ? "tween" : "spring",
      stiffness: 300,
      damping: 30
    }
  };

  // Enhanced scroll to bottom with multiple fallbacks
  const scrollToBottom = useCallback((force = false) => {
    if (!messagesEndRef.current || (isScrolling && !force)) return;
    
    const behavior = shouldReduceMotion ? 'auto' : 'smooth';
    
    // Multiple scroll attempts for reliability
    const attemptScroll = () => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior, 
        block: 'end',
        inline: 'nearest'
      });
    };

    // Immediate scroll
    attemptScroll();
    
    // Delayed scrolls for animation completion and layout shifts
    if (!shouldReduceMotion) {
      setTimeout(attemptScroll, 100);
      setTimeout(attemptScroll, 300);
      setTimeout(attemptScroll, 600);
    }
  }, [shouldReduceMotion, isScrolling]);

  // Scroll when messages change with enhanced timing
  useEffect(() => {
    if (messages.length > 0) {
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        setTimeout(() => scrollToBottom(true), 50);
      });
    }
  }, [messages.length, scrollToBottom]);

  // Scroll when loading state changes
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => scrollToBottom(true), 100);
    }
  }, [isLoading, scrollToBottom]);

  // Enhanced scroll handler with scroll state tracking
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolling(true);
    onScroll(e);
    
    // Clear scrolling state after scroll ends
    const timeoutId = setTimeout(() => setIsScrolling(false), 150);
    return () => clearTimeout(timeoutId);
  }, [onScroll]);

  // Handle scroll to bottom with smooth animation
  const handleScrollToBottom = useCallback(() => {
    scrollToBottom(true);
    onScrollToBottom();
  }, [scrollToBottom, onScrollToBottom]);

  return (
    <div 
      ref={messagesContainerRef}
      className={`flex-1 overflow-y-auto py-3 sm:py-4 md:py-5 scrollbar-luxury min-h-0 relative ${className}`}
      onScroll={handleScroll}
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      tabIndex={0}
      style={{ 
        scrollBehavior: shouldReduceMotion ? 'auto' : 'smooth',
        // Ensure minimum height for mobile and prevent content jumping
        minHeight: 'calc(100vh - 12rem)',
        maxHeight: 'calc(100vh - 8rem)'
      }}
    >
      <div className="max-w-4xl mx-auto space-y-2 sm:space-y-3 md:space-y-4 relative pb-4">
        {/* Enhanced Error Display with responsive padding */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={animationVariants.initial}
              animate={animationVariants.animate}
              exit={animationVariants.exit}
              className="bg-red-50 border border-red-200 rounded-lg p-2.5 sm:p-3 md:p-4 mb-3 sm:mb-4 shadow-sm mx-2 sm:mx-3 md:mx-4"
              role="alert"
              aria-live="assertive"
            >
              <div className="flex items-start space-x-2 sm:space-x-3">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-red-700 text-xs sm:text-sm font-medium leading-relaxed">{error.message}</p>
                  {retryCount < 3 && (
                    <button
                      onClick={error.onRetry}
                      className="mt-1.5 sm:mt-2 inline-flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-red-100 hover:bg-red-200 rounded-md text-xs text-red-700 transition-all duration-200 focus:ring-2 focus:ring-red-300 focus:ring-offset-1 font-medium"
                      aria-label="Retry sending message"
                    >
                      <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Retry ({3 - retryCount} attempts left)</span>
                    </button>
                  )}
                  {retryCount >= 3 && (
                    <p className="mt-1 text-xs text-red-600">
                      Maximum retry attempts reached. Please try a different question.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages with Enhanced Animations and responsive spacing */}
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={animationVariants.initial}
              animate={animationVariants.animate}
              exit={animationVariants.exit}
              transition={{ 
                ...animationVariants.transition,
                delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.3)
              }}
              layout={!shouldReduceMotion}
              className="transform-gpu px-2 sm:px-3 md:px-4" // Enable hardware acceleration and responsive padding
            >
              <MessageBubble message={message} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Enhanced Loading Indicator with responsive design */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={animationVariants.initial}
              animate={animationVariants.animate}
              exit={animationVariants.exit}
              className="flex items-center justify-start py-3 sm:py-4 px-2 sm:px-3 md:px-4"
              role="status"
              aria-live="polite"
              aria-label={t('typing')}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 bg-white/90 backdrop-blur-lg rounded-2xl px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 shadow-lg border border-maison-gold-200/50 max-w-[90%] sm:max-w-xs">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-r from-maison-gold-400 to-maison-navy-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Loader2 className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-white animate-spin" />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-medium text-maison-navy-700">{t('typing')}</span>
                  {!shouldReduceMotion && (
                    <div className="flex space-x-0.5 sm:space-x-1 mt-0.5 sm:mt-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-maison-gold-400 rounded-full"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.4, 1, 0.4],
                          }}
                          transition={{
                            duration: 1.2,
                            delay: i * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} aria-hidden="true" className="h-1" />
        
        {/* Enhanced Scroll to Bottom Button with responsive positioning */}
        <AnimatePresence>
          {showScrollButton && (
            <motion.button
              initial={animationVariants.initial}
              animate={animationVariants.animate}
              exit={animationVariants.exit}
              whileHover={shouldReduceMotion ? {} : { 
                scale: 1.1,
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
              }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              onClick={handleScrollToBottom}
              className="fixed bottom-24 sm:bottom-28 md:bottom-32 right-3 sm:right-4 md:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-maison-gold-400 via-maison-gold-500 to-maison-navy-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-maison-gold-400 focus:ring-offset-2 backdrop-blur-sm border border-white/20"
              title="Scroll to latest message"
              aria-label="Scroll to latest message"
            >
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
              
              {/* Pulse indicator */}
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-maison-gold-400 via-maison-gold-500 to-maison-navy-600"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Empty state for when no messages */}
        {messages.length === 0 && !isLoading && (
          <motion.div
            initial={animationVariants.initial}
            animate={animationVariants.animate}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-maison-gold-400 to-maison-navy-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-maison-navy-700 mb-2">Ready to assist you</h3>
            <p className="text-sm text-maison-navy-500 max-w-sm">
              Choose a quick action below or type your question to get started with AI-powered cross-cultural business guidance.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages; 