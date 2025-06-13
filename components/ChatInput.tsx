'use client';

import React, { useRef, useEffect } from 'react';
import { Send, Mic, MicOff, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';

interface ChatInputProps {
  inputMessage: string;
  isLoading: boolean;
  isListening: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onVoiceInput: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  className?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  isLoading,
  isListening,
  onInputChange,
  onSendMessage,
  onVoiceInput,
  onKeyPress,
  className = ''
}) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Auto-focus input when not loading
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const animationProps = shouldReduceMotion 
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.15 } }
    : { 
        initial: { y: 20, opacity: 0 }, 
        animate: { y: 0, opacity: 1 }, 
        transition: { duration: 0.6, delay: 0.4 }
      };

  return (
    <motion.div 
      {...animationProps}
      className={`bg-white/90 backdrop-blur-lg border-t border-maison-gold-300/30 shadow-luxury flex-shrink-0 ${className}`}
      role="region"
      aria-label="Message input"
    >
      <div className="max-w-5xl mx-auto p-2 sm:p-3 md:p-4">
        <div className="relative">
          {/* Input Container */}
          <div className="card-premium p-1.5 sm:p-2">
            <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
              {/* Message Icon */}
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-maison-gold-100 to-maison-gold-50 rounded-lg sm:rounded-xl flex-shrink-0" aria-hidden="true">
                <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-maison-gold-600" />
              </div>
              
              {/* Input Field */}
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyPress={onKeyPress}
                placeholder={t('chatPlaceholder')}
                className="flex-1 bg-transparent border-none outline-none text-maison-navy-800 placeholder-maison-navy-400 text-xs sm:text-sm md:text-base font-medium tracking-wide min-w-0"
                disabled={isLoading}
                aria-label="Type your message"
                aria-describedby="input-help"
                maxLength={1000}
              />
              
              {/* Voice Input Button */}
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                onClick={onVoiceInput}
                disabled={isLoading}
                className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300 flex-shrink-0 focus:ring-2 focus:ring-offset-2 ${
                  isListening 
                    ? 'bg-gradient-to-br from-red-400 to-red-500 text-white shadow-lg focus:ring-red-400' 
                    : 'bg-gradient-to-br from-maison-navy-100 to-maison-navy-50 text-maison-navy-600 hover:from-maison-navy-200 hover:to-maison-navy-100 focus:ring-maison-navy-400'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
                title={isListening ? "Stop voice input" : "Start voice input"}
              >
                {isListening ? <MicOff className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" /> : <Mic className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />}
              </motion.button>
              
              {/* Send Button */}
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 5 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                onClick={onSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="btn-luxury disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group p-1.5 sm:p-2 flex-shrink-0 focus:ring-2 focus:ring-maison-gold-400 focus:ring-offset-2"
                aria-label="Send message"
                title="Send message (Enter)"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-maison-gold-300 to-maison-gold-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 relative z-10" />
              </motion.button>
            </div>
          </div>
          
          {/* Decorative Elements - Hidden on mobile */}
          <div className="absolute -top-1 left-4 sm:left-6 w-2 h-2 sm:w-3 sm:h-3 bg-maison-gold-300 rounded-full opacity-20 hidden sm:block" aria-hidden="true"></div>
          <div className="absolute -bottom-1 right-4 sm:right-6 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-maison-navy-300 rounded-full opacity-20 hidden sm:block" aria-hidden="true"></div>
        </div>
        
        {/* Status Indicator */}
        <div 
          id="input-help"
          className="flex items-center justify-center mt-1.5 sm:mt-2 md:mt-3"
          aria-live="polite"
        >
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs text-maison-navy-400">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-maison-gold-400 rounded-full animate-pulse" aria-hidden="true"></div>
            <span className="font-medium text-center text-[10px] sm:text-xs">
              {isLoading ? t('typing') : 'Ready to assist with your cross-cultural business needs'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatInput; 