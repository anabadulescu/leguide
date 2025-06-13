export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  language: string;
  metadata?: {
    isQuickAction?: boolean;
    source?: 'user' | 'retry' | 'quick_action';
    respondingTo?: 'quick_action' | 'freeform';
    context?: any;
  };
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error?: string;
}

export interface BusinessContext {
  country: string;
  query: string;
  industry?: string;
  companySize?: string;
  messageType?: 'quick_action' | 'freeform';
  previousMessages?: Array<{
    role: string;
    content: string;
    metadata?: Message['metadata'];
  }>;
}

export interface LanguageSupport {
  code: 'en' | 'fr' | 'ro';
  name: string;
  flag: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  category: 'compliance' | 'cultural' | 'market-entry' | 'language';
  query: string;
}

export type ErrorType = 
  | 'network'
  | 'api'
  | 'timeout'
  | 'unknown';

export interface ErrorState {
  type: ErrorType;
  message: string;
  timestamp: number;
  retryCount: number;
  lastAttempt?: string;
  onRetry?: () => void;
} 