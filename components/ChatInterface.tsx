'use client';

import React, { useState, useEffect, useCallback, useReducer, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Message, BusinessContext } from '@/types';
import { LeGuideChatbot } from '@/lib/chatbot';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';
import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ChatInterfaceProps {
  initialContext?: Partial<BusinessContext>;
}

// State management for better performance
interface ChatState {
  messages: Message[];
  inputMessage: string;
  isLoading: boolean;
  isListening: boolean;
  showScrollButton: boolean;
  error: ErrorState | null;
  retryCount: number;
}

// Enhanced error types for better error handling
type ErrorType = 
  | 'network'
  | 'api'
  | 'timeout'
  | 'unknown';

interface ErrorState {
  type: ErrorType;
  message: string;
  timestamp: number;
  retryCount: number;
  lastAttempt?: string;
  onRetry?: () => void;
}

const initialState: ChatState = {
  messages: [],
  inputMessage: '',
  isLoading: false,
  isListening: false,
  showScrollButton: false,
  error: null,
  retryCount: 0,
};

// Enhanced error messages
const ERROR_MESSAGES = {
  network: {
    title: 'Connection Error',
    message: 'Unable to connect to the server. Please check your internet connection.',
    retryMessage: 'Retry connection'
  },
  api: {
    title: 'Service Error',
    message: 'The AI service is temporarily unavailable. Please try again in a moment.',
    retryMessage: 'Retry request'
  },
  timeout: {
    title: 'Request Timeout',
    message: 'The request took too long to complete. Please try again.',
    retryMessage: 'Retry request'
  },
  unknown: {
    title: 'Unexpected Error',
    message: 'Something went wrong. Please try again or contact support if the issue persists.',
    retryMessage: 'Try again'
  }
};

type ChatAction = 
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_LISTENING'; payload: boolean }
  | { type: 'SET_SCROLL_BUTTON'; payload: boolean }
  | { type: 'SET_ERROR'; payload: ErrorState | null }
  | { type: 'INCREMENT_RETRY' }
  | { type: 'RESET_RETRY' }
  | { type: 'CLEAR_MESSAGES' };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload, error: null };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload], error: null };
    case 'SET_INPUT':
      return { ...state, inputMessage: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_LISTENING':
      return { ...state, isListening: action.payload };
    case 'SET_SCROLL_BUTTON':
      return { ...state, showScrollButton: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'INCREMENT_RETRY':
      return { ...state, retryCount: state.retryCount + 1 };
    case 'RESET_RETRY':
      return { ...state, retryCount: 0 };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    default:
      return state;
  }
};

// Add storage key constant
const STORAGE_KEY = 'le_guide_chat_history';

// Add interface for stored chat state
interface StoredChatState {
  messages: Message[];
  timestamp: number;
  context: BusinessContext;
}

// Add storage utility functions
const saveChatState = (state: ChatState, context: BusinessContext) => {
  try {
    const storedState: StoredChatState = {
      messages: state.messages,
      timestamp: Date.now(),
      context
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedState));
  } catch (error) {
    console.error('Error saving chat state:', error);
  }
};

const loadChatState = (): StoredChatState | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const state = JSON.parse(stored) as StoredChatState;
    
    // Validate stored state
    if (!state.messages || !Array.isArray(state.messages) || !state.timestamp || !state.context) {
      console.warn('Invalid stored chat state, clearing...');
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    
    // Check if stored state is too old (24 hours)
    const isExpired = Date.now() - state.timestamp > 24 * 60 * 60 * 1000;
    if (isExpired) {
      console.log('Stored chat state expired, clearing...');
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    // Convert all message.timestamp values to Date objects
    state.messages = state.messages.map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));

    return state;
  } catch (error) {
    console.error('Error loading chat state:', error);
    return null;
  }
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialContext }) => {
  const { t, i18n } = useTranslation();
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const [context, setContext] = useState<BusinessContext>({
    country: 'us',
    query: i18n.language,
    ...initialContext
  });
  
  const chatbotRef = React.useRef<LeGuideChatbot | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Initialize chatbot and welcome message
  useEffect(() => {
    chatbotRef.current = new LeGuideChatbot(
      process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'demo-key',
      process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://maisondeculture.com'
    );
    
    const welcomeMessage: Message = {
      id: 'welcome',
      content: t('welcomeMessage'),
      role: 'assistant',
      timestamp: new Date(),
      language: i18n.language
    };
    
    dispatch({ type: 'SET_MESSAGES', payload: [welcomeMessage] });
  }, [t, i18n.language]);

  // Update context when language changes
  useEffect(() => {
    setContext(prev => ({ ...prev, query: i18n.language }));
  }, [i18n.language]);

  // Load chat history on mount
  useEffect(() => {
    const storedState = loadChatState();
    if (storedState) {
      // Restore messages
      storedState.messages.forEach(message => {
        dispatch({ type: 'ADD_MESSAGE', payload: message });
      });
      
      // Restore context if it exists
      if (storedState.context) {
        setContext(storedState.context);
      }
    }
  }, [setContext]);

  // Save chat state when messages change
  useEffect(() => {
    if (state.messages.length > 0) {
      saveChatState(state, context);
    }
  }, [state.messages, context]);

  // Enhanced message sending with better error handling
  const handleSendMessage = useCallback(async (retryMessage?: string) => {
    const messageToSend = retryMessage || state.inputMessage.trim();
    if (!messageToSend || !chatbotRef.current) return;

    // Create user message with enhanced metadata
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      role: 'user',
      timestamp: new Date(),
      language: i18n.language,
      metadata: {
        isQuickAction: retryMessage ? false : messageToSend.startsWith('Analyze') || 
          messageToSend.startsWith('Help') || 
          messageToSend.startsWith('What are important cultural considerations'),
        source: retryMessage ? 'retry' : 'user'
      }
    };

    if (!retryMessage) {
      dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
      dispatch({ type: 'SET_INPUT', payload: '' });
    }
    
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Enhanced context for better response generation
      const enhancedContext: BusinessContext = {
        ...context,
        messageType: userMessage.metadata?.isQuickAction ? 'quick_action' : 'freeform',
        previousMessages: state.messages.map(m => ({ 
          role: m.role, 
          content: m.content,
          metadata: m.metadata
        }))
      };

      // Add timeout handling
      const timeoutPromise = new Promise<string>((_, reject) => {
        setTimeout(() => reject(new Error('timeout')), 30000); // 30 second timeout
      });

      const response = await Promise.race([
        chatbotRef.current.generateResponse(
          messageToSend,
          enhancedContext,
          state.messages.map(m => ({ 
            role: m.role, 
            content: m.content,
            metadata: m.metadata
          }))
        ),
        timeoutPromise
      ]);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
        language: i18n.language,
        metadata: {
          respondingTo: userMessage.metadata?.isQuickAction ? 'quick_action' : 'freeform',
          context: enhancedContext
        }
      };

      dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
      dispatch({ type: 'RESET_RETRY' });
      
      // Announce new message to screen readers with enhanced context
      if (typeof window !== 'undefined') {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        const messageType = userMessage.metadata?.isQuickAction ? 'Quick action response' : 'Response to your question';
        announcement.textContent = `${messageType} from Le Guide: ${response.substring(0, 100)}...`;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorType: ErrorType = 'unknown';
      let errorMessage = t('error');

      if (error instanceof Error) {
        if (error.message === 'timeout') {
          errorType = 'timeout';
          errorMessage = ERROR_MESSAGES.timeout.message;
        } else if (error.message.includes('network') || error.message.includes('connection')) {
          errorType = 'network';
          errorMessage = ERROR_MESSAGES.network.message;
        } else if (error.message.includes('API') || error.message.includes('service')) {
          errorType = 'api';
          errorMessage = ERROR_MESSAGES.api.message;
        }
      }

      // Log detailed error information for debugging
      console.error('Detailed error information:', {
        type: errorType,
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        context: {
          messageType: userMessage.metadata?.isQuickAction ? 'quick_action' : 'freeform',
          language: i18n.language,
          retryCount: state.retryCount
        }
      });

      dispatch({ 
        type: 'SET_ERROR', 
        payload: {
          type: errorType,
          message: errorMessage,
          timestamp: Date.now(),
          retryCount: state.retryCount,
          lastAttempt: messageToSend,
          onRetry: state.retryCount < 3 ? handleRetry : undefined
        }
      });
      dispatch({ type: 'INCREMENT_RETRY' });
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  }, [state.inputMessage, state.messages, context, i18n.language, t, state.retryCount]);

  // Enhanced retry functionality with exponential backoff
  const handleRetry = useCallback(() => {
    if (state.retryCount < 3) {
      const userMessages = state.messages.filter(m => m.role === 'user');
      const lastUserMessage = userMessages[userMessages.length - 1];
      if (lastUserMessage) {
        // Add exponential backoff delay
        const delay = Math.min(1000 * Math.pow(2, state.retryCount), 8000);
        setTimeout(() => {
          handleSendMessage(lastUserMessage.content);
        }, delay);
      }
    }
  }, [state.retryCount, state.messages, handleSendMessage]);

  // Enhanced keyboard handling
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    if (e.key === 'Escape') {
      dispatch({ type: 'SET_INPUT', payload: '' });
      dispatch({ type: 'SET_ERROR', payload: null });
    }
  }, [handleSendMessage]);

  // Enhanced voice input with better error handling
  const handleVoiceInput = useCallback(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: {
          type: 'unknown',
          message: 'Speech recognition not supported in this browser',
          timestamp: Date.now(),
          retryCount: 0,
          onRetry: undefined
        }
      });
      return;
    }

      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = i18n.language === 'fr' ? 'fr-FR' : i18n.language === 'ro' ? 'ro-RO' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => dispatch({ type: 'SET_LISTENING', payload: true });
    recognition.onend = () => dispatch({ type: 'SET_LISTENING', payload: false });
    recognition.onerror = () => {
      dispatch({ type: 'SET_LISTENING', payload: false });
      dispatch({ 
        type: 'SET_ERROR', 
        payload: {
          type: 'unknown',
          message: 'Voice input error. Please try again.',
          timestamp: Date.now(),
          retryCount: 0,
          onRetry: undefined
        }
      });
    };
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
      dispatch({ type: 'SET_INPUT', payload: transcript });
      };
      
    try {
      recognition.start();
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: {
          type: 'unknown',
          message: 'Could not start voice recognition',
          timestamp: Date.now(),
          retryCount: 0,
          onRetry: undefined
        }
      });
    }
  }, [i18n.language]);

  // Enhanced QuickAction handler with better context
  const handleQuickAction = useCallback((query: string) => {
    // Set the input message to show the selected action
    dispatch({ type: 'SET_INPUT', payload: query });
    
    // Add a small delay to ensure the input is updated before sending
    setTimeout(() => {
      handleSendMessage(query);
    }, 100);
  }, [handleSendMessage]);

  // Scroll handler
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    dispatch({ type: 'SET_SCROLL_BUTTON', payload: !isNearBottom });
  }, []);

  // Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    // This will be handled by the ChatMessages component
  }, []);

  // Clear chat history function
  const clearChatHistory = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      dispatch({ type: 'CLEAR_MESSAGES' });
      dispatch({ type: 'SET_ERROR', payload: null });
      dispatch({ type: 'RESET_RETRY' });
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  }, []);

  return (
    <div className="flex flex-col h-full max-w-[100vw] overflow-x-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-maison-gold-200/30">
        <h2 className="text-lg font-medium text-maison-navy-800">{t('title')}</h2>
        <button
          onClick={clearChatHistory}
          className="text-sm text-maison-navy-600 hover:text-maison-navy-800 focus:outline-none focus:underline"
          title="Clear chat history"
        >
          {t('clearHistory')}
        </button>
                </div>
      
      <ChatHeader />
      
      {/* Main chat area with optimized spacing and responsive design */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Messages area with enhanced scroll behavior and responsive padding */}
        <div className="flex-1 overflow-hidden relative">
          <ChatMessages
            messages={state.messages}
            isLoading={state.isLoading}
            onScroll={handleScroll}
            showScrollButton={state.showScrollButton}
            onScrollToBottom={scrollToBottom}
            error={state.error}
            retryCount={state.retryCount}
          />
              </div>

        {/* Quick actions with responsive design */}
        <div className="relative z-10 w-full max-w-[100vw] overflow-x-hidden">
          <QuickActions onActionClick={handleQuickAction} />
        </div>

        {/* Enhanced Error Display */}
        {state.error && (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
            >
            <div className="bg-white/95 backdrop-blur-lg border border-red-200 rounded-xl shadow-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-red-800">
                    {ERROR_MESSAGES[state.error.type].title}
                  </h3>
                  <p className="mt-1 text-sm text-red-600">
                    {state.error.message}
                  </p>
                  {state.error.onRetry && (
                    <button
                      onClick={state.error.onRetry}
                      className="mt-2 text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:underline"
                    >
                      {ERROR_MESSAGES[state.error.type].retryMessage}
                    </button>
                  )}
                </div>
                <button
                  onClick={() => dispatch({ type: 'SET_ERROR', payload: null })}
                  className="flex-shrink-0 text-red-400 hover:text-red-500 focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Input area with responsive design */}
        <div className="relative z-20 w-full max-w-[100vw] overflow-x-hidden">
          <ChatInput
            inputMessage={state.inputMessage}
            onInputChange={(message) => dispatch({ type: 'SET_INPUT', payload: message })}
            onSendMessage={() => handleSendMessage()}
            onVoiceInput={handleVoiceInput}
            onKeyPress={handleKeyPress}
            isLoading={state.isLoading}
            isListening={state.isListening}
            className="mt-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 