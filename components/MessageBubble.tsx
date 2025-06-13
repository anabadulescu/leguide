'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Crown, User, Sparkles, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '@/types';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <motion.div 
      className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
      initial={{ opacity: 0, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Enhanced Avatar */}
      <motion.div 
        className={`flex-shrink-0 relative ${isUser ? 'order-2' : 'order-1'}`}
        whileHover={{ scale: 1.05 }}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-luxury relative overflow-hidden ${
          isUser 
            ? 'bg-gradient-to-br from-maison-navy-500 to-maison-navy-700' 
            : 'bg-gradient-to-br from-maison-gold-400 to-maison-gold-600'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Crown className="w-4 h-4 text-white" />
          )}
          
          {/* Elegant border ring */}
          <div className={`absolute inset-0 rounded-full border-2 ${
            isUser 
              ? 'border-maison-navy-300/30' 
              : 'border-maison-gold-300/30'
          }`}></div>
        </div>
        
        {/* Status indicator for Le Guide */}
        {!isUser && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></div>
          </div>
        )}
      </motion.div>
      
      {/* Enhanced Message Content */}
      <div className={`flex-1 max-w-4xl ${isUser ? 'text-right order-1' : 'text-left order-2'}`}>
        <motion.div 
          className={`inline-block relative ${isUser ? 'ml-6' : 'mr-6'}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {/* Message Bubble */}
          <div className={`relative px-4 py-3 shadow-luxury backdrop-blur-sm ${
            isUser 
              ? 'bg-gradient-to-br from-maison-navy-600 to-maison-navy-700 text-white rounded-2xl rounded-tr-lg border border-maison-navy-500/30' 
              : 'bg-gradient-to-br from-white to-maison-pearl border border-maison-gold-200/50 text-maison-navy-800 rounded-2xl rounded-tl-lg'
          }`}>
            
            {/* Content */}
            {isUser ? (
              <div>
                <p className="text-sm font-medium leading-relaxed">{message.content}</p>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0 text-sm leading-relaxed text-maison-navy-800">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-2 last:mb-0 space-y-1 pl-1">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-2 last:mb-0 space-y-1 pl-1">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-sm leading-relaxed text-maison-navy-700 flex items-start">
                        <Sparkles className="w-2.5 h-2.5 text-maison-gold-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{children}</span>
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-maison-navy-900 bg-maison-gold-100/50 px-1 py-0.5 rounded">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-maison-gold-700 font-medium">
                        {children}
                      </em>
                    ),
                    code: ({ children }) => (
                      <code className="bg-maison-gold-100 text-maison-navy-800 px-1.5 py-0.5 rounded-lg text-xs font-mono border border-maison-gold-200">
                        {children}
                      </code>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-base font-bold text-maison-navy-900 mb-2 flex items-center">
                        <div className="w-1 h-5 bg-gradient-to-b from-maison-gold-400 to-maison-gold-600 rounded-full mr-2"></div>
                        {children}
                      </h3>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
            
            {/* Decorative elements */}
            {!isUser && (
              <>
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-maison-gold-300 rounded-full opacity-40"></div>
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-maison-navy-300 rounded-full opacity-30"></div>
              </>
            )}
            
            {/* Message tail */}
            <div className={`absolute top-3 w-2.5 h-2.5 transform rotate-45 ${
              isUser 
                ? 'right-[-5px] bg-maison-navy-600 border-r border-b border-maison-navy-500/30' 
                : 'left-[-5px] bg-white border-l border-t border-maison-gold-200/50'
            }`}></div>
          </div>
        </motion.div>
        
        {/* Enhanced Timestamp and Status */}
        <motion.div 
          className={`mt-1.5 flex items-center space-x-2 ${isUser ? 'justify-end' : 'justify-start'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <span className="text-xs text-maison-navy-400 font-medium">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
          
          {isUser && (
            <CheckCircle className="w-2.5 h-2.5 text-maison-gold-500" />
          )}
          
          {!isUser && (
            <div className="flex items-center space-x-1">
              <Crown className="w-2.5 h-2.5 text-maison-gold-500" />
              <span className="text-xs text-maison-gold-600 font-medium">Le Guide</span>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MessageBubble; 