# Le Guide - Multilingual Cross-Cultural Business Chatbot

🌍 **Sophisticated Solutions for Global Success** 🌍

Le Guide is an advanced multilingual AI assistant designed specifically for Maison de Culture's cross-cultural business consulting services. It provides expert guidance for US-European market expansion, compliance insights, and cultural intelligence.

## ✨ Features

### 🗣️ Multilingual Support
- **English** - International business communication
- **Français** - French market expertise and cultural insights
- **Română** - Romanian business laws and market entry guidance

### 🎯 Core Capabilities
- **Business Compliance** - Regulatory guidance for France, Romania, Moldova, and US markets
- **Cultural Intelligence** - Business etiquette and cross-cultural communication
- **Market Entry Consulting** - Comprehensive expansion strategies
- **Language Training** - Business-focused language learning programs
- **Real-time Web Search** - Current regulations and market information
- **Website Integration** - Maison de Culture service information

### 🚀 Advanced Features
- **Voice Input** - Speech-to-text in multiple languages
- **Quick Actions** - Predefined queries for common business questions
- **Responsive Design** - Beautiful UI optimized for all devices
- **Real-time Chat** - Instant responses with typing indicators
- **Context Awareness** - Remembers conversation history for better assistance

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom Maison de Culture theme
- **Animations**: Framer Motion for smooth interactions
- **Internationalization**: React i18next with language detection
- **AI Integration**: OpenAI GPT models for intelligent responses
- **Icons**: Lucide React for modern iconography
- **Date Handling**: date-fns for timestamp formatting

## 🏁 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd le-guide-chatbot
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   WEBSITE_URL=https://maisondeculture.com
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_WEBSITE_URL=https://maisondeculture.com
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Brand Identity

Le Guide embodies Maison de Culture's sophisticated brand identity:

### Color Palette
- **Maison Gold** (#D4AF37) - Elegance and premium quality
- **Maison Navy** (#1e3a8a) - Trust and professionalism  
- **Maison Cream** (#fefdfb) - Sophistication and clarity
- **Maison Charcoal** (#374151) - Modern and authoritative

### Typography
- **Headings**: Playfair Display (serif) - Elegant and refined
- **Body Text**: Inter (sans-serif) - Clean and readable

## 💼 Business Context

### Target Markets
- **US → Europe**: American SMBs expanding to France, Romania, Moldova
- **Europe → US**: European businesses entering the US market (Arizona focus)

### Services Integration
- **Language Training**: $400 per client (8-week programs)
- **Cultural Workshops**: $25 per participant
- **Market Entry Consulting**: $800 per client
- **LLC Formation**: Assistance for European businesses in Arizona

### Industries Served
- Technology and Software
- Healthcare and Medical
- Professional Services
- Manufacturing
- Financial Services

## 🔧 Development

### Project Structure
```
le-guide-chatbot/
├── app/                 # Next.js 14 app router
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ChatInterface.tsx
│   ├── MessageBubble.tsx
│   ├── QuickActions.tsx
│   └── LanguageSelector.tsx
├── lib/               # Utilities and configurations
│   ├── chatbot.ts     # Core AI logic
│   └── i18n.ts        # Internationalization
├── types/             # TypeScript definitions
└── public/            # Static assets
```

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run type-check # TypeScript validation
```

### Code Quality
- **TypeScript** for type safety
- **ESLint** for code standards
- **Tailwind CSS** for consistent styling
- **Responsive Design** principles

## 🌐 Internationalization

Le Guide supports three languages with automatic detection:

### Language Files
- **English** (en): Default language, US business focus
- **French** (fr): French market expertise
- **Romanian** (ro): Romanian and Moldovan market knowledge

### Features
- Automatic language detection based on browser settings
- Persistent language selection in localStorage
- Voice input in the selected language
- Culturally appropriate responses and examples

## 🔒 Security & Privacy

- **API Key Protection**: Environment variables for sensitive data
- **Input Validation**: Proper request validation and sanitization
- **Rate Limiting**: Built-in protection against abuse
- **Privacy-First**: No conversation data stored permanently
- **HTTPS Only**: Secure communication protocols

## 📱 Mobile Optimization

- **Responsive Design**: Works perfectly on all screen sizes
- **Touch-Friendly**: Optimized for mobile interactions
- **Fast Loading**: Optimized for mobile networks
- **Progressive Enhancement**: Works without JavaScript enabled

## 🤖 AI Capabilities

### Expertise Areas
1. **Regulatory Compliance**
   - Business registration requirements
   - Tax obligations and structures
   - Employment law compliance
   - Industry-specific regulations

2. **Cultural Intelligence**
   - Business communication styles
   - Meeting protocols and etiquette
   - Relationship building strategies
   - Time management cultural differences

3. **Market Entry Strategy**
   - Market research and analysis
   - Competitive landscape insights
   - Localization requirements
   - Partnership opportunities

4. **Language Training**
   - Business terminology
   - Industry-specific vocabulary
   - Professional communication
   - Cultural context in language use

## 📊 Analytics & Monitoring

- **Performance Tracking**: Response times and user engagement
- **Language Usage**: Popular languages and features
- **Query Analysis**: Common business questions and topics
- **Error Monitoring**: API failures and user experience issues

## 🚀 Deployment

### Production Deployment
1. Build the application: `npm run build`
2. Deploy to your preferred platform (Vercel, Netlify, etc.)
3. Configure environment variables in production
4. Set up domain and SSL certificates

### Recommended Platforms
- **Vercel** - Optimized for Next.js applications
- **Netlify** - Easy static site deployment
- **AWS Amplify** - Full-stack cloud deployment
- **DigitalOcean** - Cost-effective VPS hosting

## 📞 Support & Contact

For questions about Le Guide or Maison de Culture services:

- **Website**: [maisondeculture.com](https://maisondeculture.com)
- **Email**: contact@maisondeculture.com
- **Business Inquiries**: For consulting services and partnerships

## 📄 License

This project is proprietary software owned by Maison de Culture. All rights reserved.

---

**Maison de Culture** - *Sophisticated Solutions for Global Success*

🌟 Empowering businesses to thrive across cultures and borders 🌟 

## Environment Setup

1. Copy the example environment file:
```bash
cp env.example .env.local
```

2. Fill in your environment variables in `.env.local`:
```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here

# Website Configuration
NEXT_PUBLIC_WEBSITE_URL=https://maisondeculture.com

# Search API Configuration
GOOGLE_SEARCH_API_KEY=your_google_search_api_key_here
WEBSITE_SCRAPER_API_KEY=your_scraper_api_key_here

# Rate Limiting Configuration
UPSTASH_REDIS_REST_URL=your_redis_url_here
UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
```

⚠️ **Important Security Notes:**
- Never commit your `.env.local` file to version control
- Keep your API keys secure and rotate them regularly
- Use different API keys for development and production
- Monitor your API usage to prevent unexpected charges 