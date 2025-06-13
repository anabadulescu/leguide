import { NextRequest, NextResponse } from 'next/server';
import { LeGuideChatbot } from '@/lib/chatbot';
import { validateEnv, getRequiredEnv } from '@/lib/env';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create a new ratelimiter that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
  prefix: '@upstash/ratelimit',
});

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    validateEnv();

    // Rate limiting
    const ip = request.ip ?? '127.0.0.1';
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);
    
    if (!success) {
      return NextResponse.json(
        { 
          error: 'Too many requests',
          limit,
          reset,
          remaining
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString()
          }
        }
      );
    }

    // Validate request body
    const { message, context, conversationHistory } = await request.json();
    
    if (!message || typeof message !== 'string' || !context) {
      return NextResponse.json(
        { error: 'Invalid request: message and context are required' },
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitizedMessage = message.trim();
    if (sanitizedMessage.length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    if (sanitizedMessage.length > 1000) {
      return NextResponse.json(
        { error: 'Message is too long (max 1000 characters)' },
        { status: 400 }
      );
    }

    const apiKey = getRequiredEnv('OPENAI_API_KEY');
    const chatbot = new LeGuideChatbot(apiKey, process.env.NEXT_PUBLIC_WEBSITE_URL);
    
    const response = await chatbot.generateResponse(
      sanitizedMessage,
      context,
      conversationHistory || []
    );

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('environment variable')) {
        return NextResponse.json(
          { error: 'Server configuration error' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Le Guide Chat API is running',
    version: '1.0.0',
    supportedLanguages: ['en', 'fr', 'ro']
  });
} 