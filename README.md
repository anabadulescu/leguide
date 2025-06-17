
# Le Guide – Multilingual Cross-Cultural Business Chatbot

🌍 **Sophisticated Solutions for Global Success** 🌍
**Le Guide** is an advanced multilingual AI assistant built for **Maison de Culture** to support cross-cultural business expansion. It offers strategic guidance for companies operating between the United States and Europe, combining expert regulatory insights, cultural intelligence, and intelligent multilingual communication.

---

## ✨ Features

### 🗣️ Multilingual Support

* **English** – International business communication
* **Français** – French business etiquette and regulatory guidance
* **Română** – Romanian and Moldovan market entry and legal context

### 🎯 Core Capabilities

* **Business Compliance** – Regulatory expertise for US, France, Romania, and Moldova
* **Cultural Intelligence** – Etiquette, protocols, and communication norms
* **Market Entry Consulting** – Strategic expansion support for SMBs
* **Language Training** – Business-focused language improvement programs
* **Live Web Search** – Access up-to-date legal and market information
* **Maison de Culture Website Integration** – Service details and consulting access

---

## 🚀 Advanced Capabilities

* **Voice Input** – Supports speech-to-text in all supported languages
* **Quick Actions** – One-click access to common business questions
* **Responsive UI** – Optimized for mobile, tablet, and desktop use
* **Real-time Chat** – Fast and dynamic conversations with AI typing indicators
* **Context Awareness** – Retains conversation history for coherent dialogue

---

## 🛠️ Technology Stack

* **Frontend**: Next.js 14, React 18, TypeScript
* **Styling**: Tailwind CSS with custom Maison de Culture theme
* **Animations**: Framer Motion for fluid transitions
* **Internationalization**: React i18next with auto language detection
* **AI Integration**: OpenAI GPT models for intelligent dialogue
* **Icons**: Lucide React for modern iconography
* **Date Handling**: `date-fns` for timestamps and formatting

---

## 🏁 Quick Start

### Prerequisites

* Node.js 18+
* npm or yarn
* OpenAI API Key

### Installation

```bash
git clone <repository-url>
cd le-guide-chatbot
npm install
```

### Environment Setup

```bash
cp env.example .env.local
```

Edit `.env.local` with your keys:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here

# Website Integration
NEXT_PUBLIC_WEBSITE_URL=https://maisondeculture.com

# Web Search (optional)
GOOGLE_SEARCH_API_KEY=your_google_search_api_key_here
WEBSITE_SCRAPER_API_KEY=your_scraper_api_key_here

# Rate Limiting
UPSTASH_REDIS_REST_URL=your_redis_url_here
UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
```

### Run the Development Server

```bash
npm run dev
```

Access at: [http://localhost:3000](http://localhost:3000)

---

## 🎨 Brand Identity

**Le Guide** aligns with Maison de Culture’s brand principles of elegance, trust, and professionalism.

### Color Palette

* **Maison Gold** `#D4AF37` – Premium and elegant
* **Maison Navy** `#1e3a8a` – Trusted and confident
* **Maison Cream** `#fefdfb` – Sophisticated clarity
* **Maison Charcoal** `#374151` – Modern and authoritative

### Typography

* **Headings**: *Playfair Display* – Elegant serif
* **Body Text**: *Inter* – Clean and modern sans-serif

---

## 💼 Business Context

### Target Markets

* **US → Europe**: SMBs entering France, Romania, Moldova
* **Europe → US**: EU companies expanding into the US, with an Arizona focus

### Services Integrated

* **Language Training** – \$400 per client, 8-week program
* **Cultural Workshops** – \$25 per participant
* **Market Entry Consulting** – \$800 per client
* **LLC Formation Support** – For European companies expanding to the US

### Industries Served

* Technology
* Healthcare
* Legal and Professional Services
* Financial Services
* Manufacturing

---

## 🔧 Development

### Project Structure

```
le-guide-chatbot/
├── app/                 
│   ├── api/              
│   ├── globals.css       
│   ├── layout.tsx        
│   └── page.tsx          
├── components/           
│   ├── ChatInterface.tsx
│   ├── MessageBubble.tsx
│   ├── QuickActions.tsx
│   └── LanguageSelector.tsx
├── lib/                 
│   ├── chatbot.ts       
│   └── i18n.ts          
├── types/               
└── public/              
```

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # TypeScript validation
```

---

## 🌐 Internationalization

**Le Guide** provides full language detection and culturally appropriate communication.

### Language Support

* **English (en)** – US business standards
* **French (fr)** – French legal and cultural guidance
* **Romanian (ro)** – Romania and Moldova-focused support

### Features

* Automatic browser-based language detection
* Persistent language choice using localStorage
* Voice input matched to selected language
* Cultural sensitivity in examples and advice

---

## 🔒 Security & Privacy

* **Environment-based API Key Storage** – No credentials exposed in frontend code
* **Input Validation** – Prevents malformed requests
* **Rate Limiting** – Prevents abuse and protects services
* **No Persistent Storage** – Conversations are not saved
* **HTTPS Enforcement** – All data exchanges are encrypted

---

## 📱 Mobile Optimization

* Fully responsive layout
* Touch-friendly interactions
* Optimized for low-bandwidth environments
* Graceful fallback for older browsers and JS-disabled scenarios

---

## 🤖 AI Capabilities

### Regulatory Compliance

* Business registration procedures
* Tax regulations
* Employment and labor laws
* Industry-specific rules

### Cultural Intelligence

* Business etiquette by country
* Meeting behavior and time management
* Negotiation expectations and relationship building

### Market Entry Strategy

* Competitor and industry research
* Localization planning
* Partner and vendor insights

### Language Training

* Business terminology
* Sector-specific vocabulary
* Formal communication and tone
* Language in cultural context

---

## 📊 Analytics & Monitoring

* **Response Time Monitoring**
* **Most Frequently Used Languages**
* **Common Query Analysis**
* **AI Error and Timeout Reporting**

---

## 🚀 Deployment

### Production Build

```bash
npm run build
```

Deploy with your preferred platform:

### Recommended Platforms

* **Vercel** – Best fit for Next.js
* **Netlify** – Easy CI/CD pipeline
* **AWS Amplify** – For full-stack hosting
* **DigitalOcean** – Low-cost custom VPS

---

## 📞 Support & Contact

For help or consulting inquiries, contact **Maison de Culture**:

* **Website**: [maisondeculture.com](https://maisondeculture.com)
* **Email**: [contact@maisondeculture.com](mailto:contact@maisondeculture.com)
* **Business Inquiries**: Request services or collaboration proposals

---

## 📄 License

This software is proprietary and owned by Maison de Culture.
All rights reserved. For internal or commercial use only.

---

**Maison de Culture**
*Empowering Businesses with Sophisticated Solutions*
