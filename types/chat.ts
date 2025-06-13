export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  metadata?: {
    timestamp?: number;
    source?: string;
    [key: string]: any;
  };
}

export interface BusinessContext {
  country: string;
  query: string;
  industry?: string;
  companySize?: string;
  [key: string]: any;
}

export interface ChatError {
  type: 'api' | 'network' | 'validation' | 'unknown';
  message: string;
  timestamp: number;
  retryCount: number;
  details?: any;
} 