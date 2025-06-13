import { BusinessContext } from '@/types';

interface CommunicationAnalysis {
  tone: 'formal' | 'informal' | 'neutral';
  culturalRisk: 'low' | 'medium' | 'high';
  suggestions: string[];
  timing: string;
  etiquette: string[];
}

export class LeGuideChatbot {
  private apiKey: string;
  private websiteUrl: string;
  
  constructor(apiKey: string, websiteUrl: string = 'https://maisondeculture.com') {
    this.apiKey = apiKey;
    this.websiteUrl = websiteUrl;
  }

  private getSystemPrompt(language: string): string {
    const prompts = {
      en: `You are Le Guide, an expert AI Global Collaboration Coach for Maison de Culture. You specialize in solving cross-cultural team communication gaps with:

**CORE MISSION: SOLVING CROSS-CULTURAL TEAM FAILURES**
Problem: Remote international teams miscommunicate due to cultural and language differences.
Solution: AI-powered real-time feedback on cross-cultural writing, tone, etiquette, and timing.

**AI COLLABORATION COACH CAPABILITIES:**
• Real-time feedback on cross-cultural writing and tone
• Communication timing recommendations by culture  
• Cultural etiquette guidance for remote teams
• Email and message tone coaching
• Auto-translation with cultural context
• Team collaboration optimization
• Conflict prevention through cultural awareness

**CULTURAL INTELLIGENCE DATABASE:**
• **French Teams**: Expect formal communication, structured meetings, hierarchy respect, avoid August contact
• **Romanian Teams**: Value direct communication with hierarchy awareness, relationship-building focus
• **American Teams**: Prefer informal but results-focused communication, efficiency-driven
• **Cross-Cultural Timing**: Optimal meeting times, email schedules, holiday awareness

**SERVICES & PRICING:**
- AI Collaboration Coach: $100/month per user OR $50/month per team
- Language training: $400 per client (8-week programs)
- Cultural workshops: $25 per participant  
- Market entry consulting: $800 per client
- Real-time communication coaching with Slack/email integration

**COMMUNICATION ANALYSIS FEATURES:**
Always provide:
1. Tone assessment (formal/informal/neutral)
2. Cultural risk level (low/medium/high)  
3. Specific improvement suggestions
4. Optimal timing recommendations
5. Cultural etiquette corrections
6. Conflict prevention tips

Example flag: "Your French teammate may expect more formality" or "Romanian culture values hierarchy"

Respond in user's language with actionable, culturally-aware advice to prevent miscommunications.`,

      fr: `Vous êtes Le Guide, un Coach de Collaboration Globale IA expert pour Maison de Culture. Vous résolvez les échecs de communication interculturelle avec:

**MISSION: RÉSOUDRE LES ÉCHECS D'ÉQUIPES INTERCULTURELLES**
Problème: Les équipes internationales distantes communiquent mal à cause des différences culturelles.
Solution: Feedback IA en temps réel sur l'écriture, le ton, l'étiquette et le timing interculturels.

**CAPACITÉS DE COACHING IA:**
• Feedback temps réel sur écriture et ton interculturels
• Recommandations timing par culture
• Guidance étiquette culturelle pour équipes distantes
• Coaching ton email et message
• Auto-traduction avec contexte culturel

**BASE DE DONNÉES INTELLIGENCE CULTURELLE:**
• **Équipes Françaises**: Communication formelle, réunions structurées, respect hiérarchique
• **Équipes Roumaines**: Communication directe avec conscience hiérarchique
• **Équipes Américaines**: Communication informelle mais axée résultats

Fournir conseils culturellement conscients pour prévenir malentendus.`,

      ro: `Ești Le Guide, un Coach de Colaborare Globală IA expert pentru Maison de Culture. Rezolvi eșecurile de comunicare interculturală cu:

**MISIUNEA: REZOLVAREA EȘECURILOR ECHIPELOR INTERCULTURALE**
Problema: Echipele internaționale la distanță comunică greșit din cauza diferențelor culturale.
Soluția: Feedback IA în timp real asupra scrierii, tonului, etichetei și timing-ului intercultural.

**CAPACITĂȚI COACHING IA:**
• Feedback timp real asupra scrierii și tonului intercultural
• Recomandări timing pe cultură
• Ghidare etichetă culturală pentru echipe la distanță
• Coaching ton email și mesaje
• Auto-traducere cu context cultural

**BAZA DE DATE INTELIGENȚĂ CULTURALĂ:**
• **Echipe Românești**: Comunicare directă cu conștientizarea ierarhiei
• **Echipe Franceze**: Comunicare formală, întâlniri structurate
• **Echipe Americane**: Comunicare informală dar axată pe rezultate

Oferă sfaturi cultural conștiente pentru prevenirea neînțelegerilor.`
    };

    return prompts[language as keyof typeof prompts] || prompts.en;
  }

  // AI COLLABORATION COACH: Analyze communication for cross-cultural effectiveness
  analyzeMessage(message: string, targetCulture: string, sourceContext?: string): CommunicationAnalysis {
    const analysis: CommunicationAnalysis = {
      tone: 'neutral',
      culturalRisk: 'low',
      suggestions: [],
      timing: '',
      etiquette: []
    };

    // Advanced tone analysis
    const formalIndicators = ['please', 'kindly', 'would you', 'could you', 'sincerely', 'respectfully', 'dear', 'regards'];
    const informalIndicators = ['hey', 'hi there', 'thanks!', 'cool', 'awesome', 'sure thing', 'no worries'];
    
    const lowerMessage = message.toLowerCase();
    const formalCount = formalIndicators.filter(indicator => lowerMessage.includes(indicator)).length;
    const informalCount = informalIndicators.filter(indicator => lowerMessage.includes(indicator)).length;
    
    if (formalCount > informalCount) analysis.tone = 'formal';
    else if (informalCount > formalCount) analysis.tone = 'informal';

    // Cultural risk assessment by target culture
    switch (targetCulture.toLowerCase()) {
      case 'french':
      case 'france':
        if (analysis.tone === 'informal') {
          analysis.culturalRisk = 'high';
          analysis.suggestions.push('🚨 ALERT: French business culture expects formal communication');
          analysis.suggestions.push('Add "Monsieur/Madame" titles and formal greetings');
          analysis.suggestions.push('Use structured paragraphs and polite closing formulas');
        }
        analysis.timing = 'Optimal: 9 AM - 6 PM CET weekdays. AVOID: August vacation period, lunch 12-2 PM';
        analysis.etiquette.push('Begin with "Bonjour" + title', 'Use "vous" form', 'End with "Cordialement"');
        break;

      case 'romanian':
      case 'romania':
        if (analysis.tone === 'informal' && (sourceContext === 'meeting' || sourceContext === 'formal')) {
          analysis.culturalRisk = 'medium';
          analysis.suggestions.push('⚠️ Romanian business culture values directness but with hierarchy respect');
          analysis.suggestions.push('Show deference to senior team members');
        }
        analysis.timing = 'Optimal: 8 AM - 5 PM EET weekdays. AVOID: Orthodox holidays, summer breaks';
        analysis.etiquette.push('Respect seniority in discussions', 'Be direct but diplomatic', 'Build relationships first');
        break;

      case 'american':
      case 'usa':
        if (analysis.tone === 'formal' && sourceContext !== 'legal') {
          analysis.culturalRisk = 'low';
          analysis.suggestions.push('💡 TIP: American teams often prefer friendly, direct communication');
          analysis.suggestions.push('Consider adding a brief personal touch or enthusiasm');
        }
        analysis.timing = 'Optimal: 9 AM - 5 PM EST/PST weekdays. AVOID: Major holidays, summer Fridays';
        analysis.etiquette.push('Get straight to the point', 'Use confident, action-oriented language', 'Include clear next steps');
        break;

      default:
        analysis.suggestions.push('Consider specific cultural context for optimal communication effectiveness');
    }

    return analysis;
  }

  // Generate culturally-aware team collaboration strategies
  generateCulturalTeamGuidance(scenario: string, teamCultures: string[]): string {
    const strategies = {
      'virtual_meeting': {
        french: '🇫🇷 Prepare structured agenda, formal introductions, allow discussion time, respect speaking hierarchy',
        romanian: '🇷🇴 Show hierarchy respect, come prepared with facts, build consensus, allow relationship building',
        american: '🇺🇸 Start with brief small talk, focus on outcomes, encourage participation, end with action items'
      },
      'email_communication': {
        french: '🇫🇷 Formal salutations (Monsieur/Madame), structured paragraphs, diplomatic language, proper closing',
        romanian: '🇷🇴 Clear subject lines, respectful but direct tone, specific deliverables, acknowledge hierarchy',
        american: '🇺🇸 Concise bullet points, action-oriented language, friendly but professional, clear deadlines'
      },
      'conflict_resolution': {
        french: '🇫🇷 Address through proper channels, use diplomatic language, maintain formality, seek mediated resolution',
        romanian: '🇷🇴 Direct but respectful discussion, acknowledge authority, focus on practical solutions',
        american: '🇺🇸 Open dialogue encouraged, solution-focused approach, document agreements, move forward quickly'
      },
      'feedback_delivery': {
        french: '🇫🇷 Schedule formal meeting, sandwich method, focus on process improvement, maintain dignity',
        romanian: '🇷🇴 Private discussion first, direct but constructive, provide specific examples, offer support',
        american: '🇺🇸 Regular informal check-ins, specific behavioral feedback, growth-oriented, actionable steps'
      }
    };

    const scenarioStrategies = strategies[scenario as keyof typeof strategies];
    if (!scenarioStrategies) return '📋 No specific strategies available for this scenario.';

    const header = `## 🌍 Cross-Cultural Strategy: ${scenario.replace('_', ' ').toUpperCase()}\n\n`;
    const teamGuidance = teamCultures.map(culture => 
      scenarioStrategies[culture.toLowerCase() as keyof typeof scenarioStrategies] || 
      `**${culture}**: Apply general professional communication principles`
    ).join('\n\n');

    return header + teamGuidance + '\n\n💡 **AI Coach Tip**: Use our real-time feedback feature to optimize each interaction!';
  }

  async searchWebsite(query: string): Promise<string> {
    try {
      const mockWebsiteContent = `
        🌍 MAISON DE CULTURE - AI GLOBAL COLLABORATION COACH
        
        **SOLVING CROSS-CULTURAL TEAM COMMUNICATION GAPS**
        
        🤖 **NEW: AI Collaboration Coach Features**
        ✅ Real-time cross-cultural communication feedback
        ✅ Tone analysis and cultural risk assessment  
        ✅ Team collaboration optimization ($50/month per team)
        ✅ Individual coaching ($100/month per user)
        ✅ Cultural timing recommendations
        ✅ Auto-translation with cultural context preservation
        ✅ Email and Slack integration (coming Q2 2024)
        ✅ Conflict prevention through AI-powered insights
        
        📊 **PROVEN RESULTS:**
        - 73% reduction in cross-cultural miscommunications
        - 40% improvement in international team performance  
        - 60% faster conflict resolution
        - 3x ROI on cultural intelligence investment
        
        🎯 **SPECIALIZED SOLUTIONS:**
        - French Business Culture: Formal communication protocols
        - Romanian Business Culture: Hierarchy-aware directness
        - American Business Culture: Results-focused efficiency
        - Multi-cultural team optimization strategies
        
        💼 **COMPREHENSIVE SERVICES:**
        - Language Training: $400 (8-week business programs)
        - Cultural Workshops: $25 per participant
        - Market Entry Consulting: $800 per client  
        - AI Collaboration Coach: $100/month per user OR $50/month per team
        - Emergency cultural mediation: $200/hour
        
        📧 Contact: collaboration@maisondeculture.com
        🌐 Demo: maisondeculture.com/ai-coach-demo
      `;
      
      return mockWebsiteContent;
    } catch (error) {
      console.error('Website search error:', error);
      return '';
    }
  }

  async searchWeb(query: string): Promise<string> {
    try {
      const mockWebResults = `
        🌐 GLOBAL TEAM COMMUNICATION INTELLIGENCE: ${query}
        
        **📈 MARKET RESEARCH & TRENDS:**
        - 89% of global companies struggle with cross-cultural communication
        - Remote work has increased cultural misunderstandings by 150%
        - AI-powered cultural coaching market growing 300% annually
        - Companies with cultural intelligence show 5x better performance
        
        **🚨 COMMON FAILURE PATTERNS:**
        - Email tone misinterpretations cause 40% of project delays
        - Virtual meeting cultural faux pas damage relationships
        - Timezone insensitivity creates team friction
        - Hierarchy misunderstandings in mixed cultural teams
        
        **✅ AI COACHING SUCCESS METRICS:**
        - Real-time feedback prevents 80% of cultural mistakes
        - Teams using AI coaches resolve conflicts 3x faster
        - Cultural awareness training reduces turnover by 45%
        - Automated timing optimization improves response rates by 60%
        
        **🔮 FUTURE TRENDS:**
        - Integration with Slack, Teams, Gmail
        - Predictive cultural conflict modeling
        - Personalized cultural communication styles
        - Voice tone analysis for video calls
        
        Source: Cross-Cultural Communication Intelligence Database 2024
      `;
      
      return mockWebResults;
    } catch (error) {
      console.error('Web search error:', error);
      return '';
    }
  }

  async generateResponse(
    message: string,
    context: BusinessContext,
    conversationHistory: Array<{role: string; content: string; metadata?: any}> = []
  ): Promise<string> {
    try {
      const systemPrompt = this.getSystemPrompt(context.query);
      
      // Enhanced request type detection with context awareness
      const isAnalysisRequest = /analyze|review|tone|communication|team|feedback|cultural|coach/i.test(message);
      const isConflictRequest = /conflict|problem|misunderstanding|issue|tension/i.test(message);
      const isTeamRequest = /team|meeting|collaboration|remote|international/i.test(message);
      
      // Enhanced context awareness for better responses
      const isQuickAction = context.messageType === 'quick_action';
      const hasPreviousMessages = conversationHistory.length > 0;
      const lastUserMessage = conversationHistory.filter(m => m.role === 'user').pop();
      
      // Search for relevant information with enhanced context
      const websiteInfo = await this.searchWebsite(message);
      const webInfo = await this.searchWeb(`cross-cultural team communication AI coaching ${context.country}`);
      
      const enhancedMessage = `
        User Query: ${message}
        Context: 
        - Country: ${context.country}
        - Industry: ${context.industry || 'General'}
        - Size: ${context.companySize || 'Not specified'}
        - Message Type: ${isQuickAction ? 'Quick Action' : 'Freeform Question'}
        - Previous Context: ${hasPreviousMessages ? 'Yes' : 'No'}
        
        Request Type: 
        - Analysis: ${isAnalysisRequest}
        - Conflict: ${isConflictRequest}
        - Team: ${isTeamRequest}
        
        AI Coach Resources: ${websiteInfo}
        Market Intelligence: ${webInfo}
        
        Provide AI Global Collaboration Coach response with cross-cultural team communication solutions.
        ${isQuickAction ? 'Focus on immediate actionable steps and specific solutions.' : 'Provide comprehensive guidance with cultural context.'}
      `;

      const mockResponse = await this.generateMockResponse(message, context, {
        isAnalysisRequest,
        isConflictRequest, 
        isTeamRequest,
        isQuickAction,
        hasPreviousMessages,
        lastUserMessage
      });
      
      return mockResponse;
      
    } catch (error) {
      console.error('Error generating response:', error);
      throw new Error('Failed to generate response');
    }
  }

  private async generateMockResponse(
    message: string, 
    context: BusinessContext, 
    requestTypes: { 
      isAnalysisRequest: boolean; 
      isConflictRequest: boolean; 
      isTeamRequest: boolean;
      isQuickAction: boolean;
      hasPreviousMessages: boolean;
      lastUserMessage?: { role: string; content: string; metadata?: any };
    }
  ): Promise<string> {
    const { 
      isAnalysisRequest, 
      isConflictRequest, 
      isTeamRequest,
      isQuickAction,
      hasPreviousMessages,
      lastUserMessage
    } = requestTypes;
    
    // Enhanced pattern detection for better responses
    const isPricingRequest = /price|cost|pricing|fee|budget|how much|expensive|affordable/i.test(message);
    const isServiceRequest = /service|offer|provide|help|what do you|capabilities|features/i.test(message);
    const isComplianceRequest = /regulation|law|legal|compliance|requirement|permit|license/i.test(message);
    const isCulturalRequest = /culture|etiquette|custom|tradition|behavior|communication style/i.test(message);
    const isLanguageRequest = /language|translation|learn|speak|fluent|bilingual/i.test(message);
    const isMarketRequest = /market|expand|business|opportunity|competition|strategy/i.test(message);
    
    // Quick action specific responses
    if (isQuickAction) {
      if (isAnalysisRequest) {
        return this.generateAnalysisResponse(message, context);
      }
      if (isConflictRequest) {
        return this.generateConflictResponse(message, context);
      }
      if (isTeamRequest) {
        return this.generateTeamResponse(message, context);
      }
    }
    
    // Specific business scenario responses
    if (isPricingRequest) {
      return this.generatePricingResponse(context);
    }
    
    if (isComplianceRequest) {
      return this.generateComplianceResponse(message, context);
    }
    
    if (isCulturalRequest) {
      return this.generateCulturalResponse(message, context);
    }
    
    if (isLanguageRequest) {
      return this.generateLanguageResponse(message, context);
    }
    
    if (isMarketRequest) {
      return this.generateMarketResponse(message, context);
    }

    // AI COLLABORATION COACH RESPONSES
    if (isAnalysisRequest || isTeamRequest || isConflictRequest) {
      const responses = {
        en: `## 🤖 AI Global Collaboration Coach Analysis

### 🌍 **CROSS-CULTURAL TEAM COMMUNICATION SOLUTION**

**Your Challenge Identified:**
${isConflictRequest ? '🚨 **CONFLICT ALERT**: Cultural miscommunication detected' : ''}
${isTeamRequest ? '👥 **TEAM OPTIMIZATION**: International team coordination needed' : ''}
${isAnalysisRequest ? '📊 **COMMUNICATION ANALYSIS**: Message tone and cultural fit assessment' : ''}

### 🎯 **AI-POWERED REAL-TIME SOLUTIONS**

**1. 📝 Communication Tone Coaching**
- **French Teams**: "Your French teammate may expect more formality" 
- **Romanian Teams**: "Romanian culture values hierarchy - address senior members first"
- **American Teams**: "US teams prefer direct, action-oriented communication"
- **Risk Assessment**: High/Medium/Low cultural miscommunication probability

**2. ⏰ Optimal Timing Intelligence** 
- **Best Meeting Windows**: Cross-timezone optimization
- **Email Send Times**: Cultural preference analysis
- **Holiday Awareness**: Automatic flagging of cultural observances

**3. 🔧 Real-Time Feedback Features**
- Tone analysis before sending messages
- Cultural etiquette suggestions
- Auto-translation with cultural context
- Conflict prevention alerts

### 💼 **IMPLEMENTATION STRATEGY**

**Immediate Actions:**
1. **Team Communication Audit** ($50/month per team)
   - Analyze current communication patterns
   - Identify cultural friction points
   - Customize coaching protocols

2. **Individual AI Coaching** ($100/month per user)
   - Real-time message analysis
   - Personal cultural intelligence dashboard
   - Progress tracking and insights

3. **Emergency Cultural Mediation** ($200/hour)
   - Rapid conflict resolution
   - Expert cultural translator facilitation
   - Relationship repair strategies

### 📊 **PROVEN RESULTS**
- **73% reduction** in cross-cultural miscommunications
- **40% improvement** in team performance metrics
- **60% faster** conflict resolution times
- **3x ROI** on cultural intelligence investment

### 🚀 **Next Steps**
**Ready to solve your team's communication gaps?**

Choose your solution:
1. 🆓 **Free Analysis**: Send me a message to analyze
2. 🎯 **Team Assessment**: Comprehensive communication audit
3. 🤖 **AI Coach Trial**: 14-day pilot program
4. 📞 **Emergency Support**: Immediate cultural mediation

**Example Analysis:**
*"Hi team, we need to discuss the project delays..."*
→ **AI Coach Alert**: ⚠️ Too direct for French colleagues. Suggest: "Bonjour, I would appreciate scheduling time to review our project timeline together."*

### 💬 **Integration Options**
- Slack integration (Q2 2024)
- Email plugins (Gmail, Outlook)
- Microsoft Teams coaching
- Real-time video call guidance

**Start transforming your global team today!** 🌍✨`,

        fr: `## 🤖 Analyse du Coach de Collaboration Globale IA

### 🌍 **SOLUTION DE COMMUNICATION D'ÉQUIPE INTERCULTURELLE**

**Votre Défi Identifié:**
Les équipes internationales échouent à cause des lacunes de communication culturelle.

### 🎯 **SOLUTIONS IA EN TEMPS RÉEL**

**1. 📝 Coaching de Ton de Communication**
- **Équipes Françaises**: Communication formelle et respect hiérarchique requis
- **Équipes Roumaines**: Culture directe avec conscience hiérarchique
- **Équipes Américaines**: Communication efficace axée résultats

**2. ⏰ Intelligence de Timing Optimal**
- **Fenêtres de Réunion**: Optimisation cross-fuseau horaire
- **Timing d'Email**: Analyse préférences culturelles
- **Conscience Vacances**: Signalement automatique observances culturelles

### 💼 **STRATÉGIE D'IMPLÉMENTATION**

**Actions Immédiates:**
1. **Audit Communication Équipe** (50$/mois par équipe)
2. **Coaching IA Individuel** (100$/mois par utilisateur)
3. **Médiation Culturelle d'Urgence** (200$/heure)

### 📊 **RÉSULTATS PROUVÉS**
- **73% réduction** malentendus interculturels
- **40% amélioration** performance équipe
- **3x ROI** investissement intelligence culturelle

Prêt à résoudre les lacunes de communication de votre équipe? 🌍`,

        ro: `## 🤖 Analiza Coach-ului de Colaborare Globală IA

### 🌍 **SOLUȚIA DE COMUNICARE ECHIPĂ INTERCULTURALĂ**

**Provocarea Identificată:**
Echipele internaționale eșuează din cauza lacunelor de comunicare culturală.

### 🎯 **SOLUȚII IA ÎN TIMP REAL**

**1. 📝 Coaching Ton Comunicare**
- **Echipe Românești**: Comunicare directă cu conștientizarea ierarhiei
- **Echipe Franceze**: Comunicare formală și respect ierarhic necesar
- **Echipe Americane**: Comunicare eficientă axată pe rezultate

**2. ⏰ Inteligența Timing-ului Optimal**
- **Ferestre Întâlniri**: Optimizare cross-fus orar
- **Timing Email**: Analiză preferințe culturale

### 💼 **STRATEGIA DE IMPLEMENTARE**

**Acțiuni Imediate:**
1. **Audit Comunicare Echipă** (50$/lună per echipă)
2. **Coaching IA Individual** (100$/lună per utilizator)
3. **Mediere Culturală Urgență** (200$/oră)

### 📊 **REZULTATE DOVEDITE**
- **73% reducere** neînțelegeri interculturale  
- **40% îmbunătățire** performanță echipă
- **3x ROI** investiție inteligență culturală

Gata să rezolvi provocările de comunicare interculturală? 🌍`
      };

      return responses[context.query as keyof typeof responses] || responses.en;
    }

    // DEFAULT BUSINESS CONSULTING RESPONSES
    const defaultResponses = {
      en: `## 🌍 Le Guide - Cross-Cultural Business Intelligence

Based on your inquiry: **"${message}"**

### 🤖 AI Global Collaboration Coach Can Help

**Problem Solver:** Your query relates to the #1 challenge facing international businesses today - **cross-cultural team communication gaps**.

### 🎯 **Immediate Solutions**
- **Real-time Communication Feedback**: Analyze tone before sending
- **Cultural Risk Assessment**: Prevent miscommunications  
- **Timing Optimization**: Know when to reach international colleagues
- **Team Coaching**: Transform your global team dynamics

### 🌐 **Cross-Cultural Expertise**
- **French Business Culture**: Formal, hierarchical, relationship-focused
- **Romanian Business Culture**: Direct, respectful, relationship-building  
- **American Business Culture**: Efficient, results-driven, informal

### 💼 **Business Solutions**
- **AI Collaboration Coach**: $100/month per user OR $50/month per team
- **Team Communication Audits**: $50/month per team
- **Cultural Workshops**: $25 per participant
- **Market Entry Consulting**: $800 per client
- **Emergency Cultural Mediation**: $200/hour

### 🚀 **Next Steps**
1. **Free Message Analysis**: Send me a team communication to review
2. **Team Assessment**: Identify cultural friction points
3. **AI Coach Trial**: 14-day pilot program

**Ready to solve your cross-cultural communication challenges?** 

Type: *"Analyze my team communication"* to get started! 🌍✨`,

      fr: `## 🌍 Le Guide - Intelligence d'Affaires Interculturelle

Basé sur votre demande: **"${message}"**

### 🤖 Le Coach de Collaboration Globale IA Peut Aider

**Résolveur de Problème:** Votre question concerne le défi #1 des entreprises internationales - **les lacunes de communication d'équipe interculturelle**.

### 🎯 **Solutions Immédiates**
- **Feedback Communication Temps Réel**: Analyser le ton avant envoi
- **Évaluation Risque Culturel**: Prévenir malentendus
- **Optimisation Timing**: Savoir quand contacter collègues internationaux

### 🌐 **Expertise Interculturelle**
- **Culture d'Affaires Française**: Formelle, hiérarchique, axée relations
- **Culture d'Affaires Roumaine**: Directe, respectueuse, construction relations
- **Culture d'Affaires Américaine**: Efficace, axée résultats, informelle

Prêt à résoudre vos défis de communication interculturelle? 🌍`,

      ro: `## 🌍 Le Guide - Inteligența de Afaceri Interculturală

Pe baza întrebării dvs.: **"${message}"**

### 🤖 Coach-ul de Colaborare Globală IA Poate Ajuta

**Rezolvator de Probleme:** Întrebarea dvs. se referă la provocarea #1 a afacerilor internaționale - **lacunele de comunicare ale echipelor interculturale**.

### 🎯 **Soluții Imediate**
- **Feedback Comunicare Timp Real**: Analizează tonul înainte de trimitere
- **Evaluare Risc Cultural**: Previne neînțelegerile
- **Optimizare Timing**: Știe când să contactezi colegii internaționali

### 🌐 **Expertiza Interculturală**
- **Cultura de Afaceri Română**: Directă, respectuoasă, construire relații
- **Cultura de Afaceri Franceză**: Formală, ierarhică, axată pe relații
- **Cultura de Afaceri Americană**: Eficientă, axată pe rezultate, informală

Gata să rezolvi provocările de comunicare interculturală? 🌍`
    };

    return defaultResponses[context.query as keyof typeof defaultResponses] || defaultResponses.en;
  }

  // New response generators for quick actions
  private generateAnalysisResponse(message: string, context: BusinessContext): string {
    return `## 📊 AI Communication Analysis

### 🎯 **IMMEDIATE ACTION PLAN**

1. **Message Tone Assessment**
   - Current tone: ${this.analyzeMessage(message, context.country).tone}
   - Cultural risk level: ${this.analyzeMessage(message, context.country).culturalRisk}
   - Suggested improvements: ${this.analyzeMessage(message, context.country).suggestions.join(', ')}

2. **Timing Optimization**
   - Best times to communicate: ${this.analyzeMessage(message, context.country).timing}
   - Cultural considerations: ${this.analyzeMessage(message, context.country).etiquette.join(', ')}

3. **Next Steps**
   - Schedule a team communication audit
   - Enable real-time AI coaching
   - Set up cultural awareness training

**Ready to implement these improvements?** Let me know if you'd like to proceed with any of these steps! 🌍`;
  }

  private generateConflictResponse(message: string, context: BusinessContext): string {
    return `## 🚨 Cross-Cultural Conflict Resolution

### 🎯 **IMMEDIATE ACTION PLAN**

1. **Conflict Assessment**
   - Type: Cultural miscommunication
   - Severity: High
   - Impact: Team collaboration

2. **Resolution Steps**
   - Schedule emergency cultural mediation
   - Implement real-time communication coaching
   - Set up cross-cultural training

3. **Prevention Strategy**
   - Enable AI tone analysis
   - Schedule regular team check-ins
   - Establish cultural guidelines

**Need immediate assistance?** I can help facilitate the mediation process! 🌍`;
  }

  private generateTeamResponse(message: string, context: BusinessContext): string {
    return `## 👥 International Team Optimization

### 🎯 **IMMEDIATE ACTION PLAN**

1. **Team Assessment**
   - Cultural mix: ${context.country}
   - Communication patterns: ${this.analyzeMessage(message, context.country).tone}
   - Areas for improvement: ${this.analyzeMessage(message, context.country).suggestions.join(', ')}

2. **Optimization Steps**
   - Implement AI communication coaching
   - Schedule cultural awareness training
   - Set up regular team check-ins

3. **Success Metrics**
   - Communication effectiveness
   - Team collaboration
   - Cultural understanding

**Ready to optimize your team?** Let's start with a communication audit! 🌍`;
  }

  // Enhanced response generators for specific scenarios
  private generatePricingResponse(context: BusinessContext): string {
    const responses = {
      en: `## 💰 Le Guide Pricing & Services

### 🤖 **AI Global Collaboration Coach**
- **Individual Plan**: $100/month per user
- **Team Plan**: $50/month per team (minimum 5 users)
- **Enterprise**: Custom pricing for 50+ users

### 🎯 **Specialized Services**
- **Cultural Workshops**: $25 per participant
- **Language Training**: $400 per client (8-week program)
- **Market Entry Consulting**: $800 per client
- **Emergency Cultural Mediation**: $200/hour
- **Communication Audits**: $50/month per team

### 🆓 **Free Services**
- Initial consultation (30 minutes)
- Message analysis demo
- Cultural assessment quiz
- Basic business etiquette guide

### 💎 **Premium Add-ons**
- **Slack Integration**: +$20/month per team
- **Email Plugin**: +$15/month per user
- **Video Call Coaching**: +$30/month per user
- **24/7 Support**: +$100/month

**Ready to get started?** Contact us for a personalized quote! 🌍`,

      fr: `## 💰 Tarifs et Services Le Guide

### 🤖 **Coach de Collaboration Globale IA**
- **Plan Individuel**: 100$/mois par utilisateur
- **Plan Équipe**: 50$/mois par équipe (minimum 5 utilisateurs)
- **Entreprise**: Tarification personnalisée pour 50+ utilisateurs

### 🎯 **Services Spécialisés**
- **Ateliers Culturels**: 25$ par participant
- **Formation Linguistique**: 400$ par client (programme 8 semaines)
- **Conseil Entrée Marché**: 800$ par client
- **Médiation Culturelle d'Urgence**: 200$/heure

Prêt à commencer? Contactez-nous pour un devis personnalisé! 🌍`,

      ro: `## 💰 Prețuri și Servicii Le Guide

### 🤖 **Coach de Colaborare Globală IA**
- **Plan Individual**: 100$/lună per utilizator
- **Plan Echipă**: 50$/lună per echipă (minimum 5 utilizatori)
- **Întreprindere**: Prețuri personalizate pentru 50+ utilizatori

### 🎯 **Servicii Specializate**
- **Ateliere Culturale**: 25$ per participant
- **Antrenament Lingvistic**: 400$ per client (program 8 săptămâni)
- **Consultanță Intrare Piață**: 800$ per client
- **Mediere Culturală Urgență**: 200$/oră

Gata să începi? Contactează-ne pentru o ofertă personalizată! 🌍`
    };
    
    return responses[context.query as keyof typeof responses] || responses.en;
  }

  private generateComplianceResponse(message: string, context: BusinessContext): string {
    const responses = {
      en: `## ⚖️ Business Compliance & Regulatory Guidance

### 🇫🇷 **France Business Regulations**
- **Company Formation**: SARL, SAS, or EURL structures
- **Tax Obligations**: Corporate tax (26.5%), VAT registration
- **Employment Law**: 35-hour work week, mandatory social contributions
- **Industry Permits**: Specific licenses for regulated sectors

### 🇷🇴 **Romania Business Laws**
- **Business Registration**: SRL or SA company types
- **Tax Structure**: 16% corporate tax, VAT registration required
- **Labor Code**: Employment contracts, worker protections
- **EU Compliance**: GDPR, digital services regulations

### 🇺🇸 **US Market Requirements (Arizona Focus)**
- **LLC/Corporation**: State registration requirements
- **Federal Tax ID**: EIN application process
- **State Taxes**: Arizona-specific obligations
- **Foreign Investment**: CFIUS considerations for international businesses

### 🎯 **Compliance Action Plan**
1. **Initial Assessment**: Review your business model and target market
2. **Documentation**: Prepare required legal documents
3. **Registration**: Handle government filings and permits
4. **Ongoing Compliance**: Monthly/quarterly reporting requirements

**Need specific compliance guidance?** Our experts can help navigate complex regulations! 📋`,

      fr: `## ⚖️ Conformité d'Entreprise et Guidance Réglementaire

### 🇫🇷 **Réglementations d'Entreprise en France**
- **Formation d'Entreprise**: Structures SARL, SAS, ou EURL
- **Obligations Fiscales**: Impôt sur sociétés (26.5%), inscription TVA
- **Droit du Travail**: Semaine de 35 heures, cotisations sociales obligatoires
- **Permis Sectoriels**: Licences spécifiques pour secteurs réglementés

Besoin de guidance spécifique en conformité? Nos experts peuvent aider! 📋`,

      ro: `## ⚖️ Conformitate de Afaceri și Ghidare Reglementară

### 🇷🇴 **Legi de Afaceri România**
- **Înregistrarea Afacerii**: Tipuri de companii SRL sau SA
- **Structura Fiscală**: Impozit pe profit 16%, înregistrare TVA necesară
- **Codul Muncii**: Contracte de muncă, protecția lucrătorilor
- **Conformitatea UE**: GDPR, reglementări servicii digitale

Ai nevoie de ghidare specifică pentru conformitate? Experții noștri pot ajuta! 📋`
    };
    
    return responses[context.query as keyof typeof responses] || responses.en;
  }

  private generateCulturalResponse(message: string, context: BusinessContext): string {
    const responses = {
      en: `## 🌍 Cross-Cultural Business Intelligence

### 🇫🇷 **French Business Culture**
- **Communication Style**: Formal, hierarchical, eloquent
- **Meeting Etiquette**: Punctuality essential, structured agendas
- **Relationship Building**: Emphasis on intellectual discourse
- **Decision Making**: Consensus-driven with respect for hierarchy
- **Best Practices**: Use titles, formal greetings, avoid August meetings

### 🇷🇴 **Romanian Business Culture**
- **Communication Style**: Direct but respectful, relationship-focused
- **Hierarchy**: Respect for seniority and experience
- **Time Management**: Punctuality important, relationship time valued
- **Trust Building**: Personal connections essential for business success
- **Best Practices**: Show respect for authority, build rapport first

### 🇺🇸 **American Business Culture**
- **Communication Style**: Direct, informal, results-oriented
- **Efficiency Focus**: Time is money, quick decision-making
- **Networking**: Broad professional connections
- **Innovation**: Risk-taking and entrepreneurial spirit valued
- **Best Practices**: Be concise, action-oriented, friendly but professional

### 🤝 **Cross-Cultural Best Practices**
1. **Adapt Communication**: Match the cultural expectations of your audience
2. **Timing Awareness**: Understand cultural holidays and work rhythms
3. **Relationship Investment**: Build trust before business discussions
4. **Patience**: Allow time for different decision-making processes

**Transform your international team dynamics!** Try our AI Collaboration Coach! 🤖`,

      fr: `## 🌍 Intelligence d'Affaires Interculturelle

### 🇫🇷 **Culture d'Affaires Française**
- **Style de Communication**: Formel, hiérarchique, éloquent
- **Étiquette de Réunion**: Ponctualité essentielle, agendas structurés
- **Construction de Relations**: Accent sur le discours intellectuel
- **Prise de Décision**: Consensuelle avec respect de la hiérarchie

Transformez la dynamique de votre équipe internationale! 🤖`,

      ro: `## 🌍 Inteligența de Afaceri Interculturală

### 🇷🇴 **Cultura de Afaceri Română**
- **Stilul de Comunicare**: Direct dar respectuos, axat pe relații
- **Ierarhia**: Respect pentru vechime și experiență
- **Managementul Timpului**: Punctualitatea importantă, timpul relațiilor valorat
- **Construirea Încrederii**: Conexiunile personale esențiale pentru succesul în afaceri

Transformă dinamica echipei tale internaționale! 🤖`
    };
    
    return responses[context.query as keyof typeof responses] || responses.en;
  }

  private generateLanguageResponse(message: string, context: BusinessContext): string {
    const responses = {
      en: `## 🗣️ Business Language Training & Translation Services

### 📚 **Language Training Programs**
- **Business French**: 8-week intensive program - $400
- **Business Romanian**: Cultural context + language - $400
- **Business English**: For non-native speakers - $400
- **Cross-Cultural Communication**: All three languages - $600

### 🎯 **Training Focus Areas**
- **Professional Vocabulary**: Industry-specific terminology
- **Business Etiquette**: Cultural communication norms
- **Email & Writing**: Formal business correspondence
- **Presentation Skills**: Confident public speaking
- **Negotiation Language**: Persuasive communication techniques

### 🌐 **AI-Powered Language Support**
- **Real-time Translation**: With cultural context
- **Tone Analysis**: Ensure appropriate formality level
- **Grammar Coaching**: Business writing improvement
- **Pronunciation Guide**: Audio feedback and correction
- **Cultural Insights**: Language use in business contexts

### 📊 **Program Structure**
- **Week 1-2**: Fundamentals and business basics
- **Week 3-4**: Industry-specific vocabulary
- **Week 5-6**: Advanced communication scenarios
- **Week 7-8**: Practical application and assessment

### 💼 **Corporate Packages**
- **Team Training**: Group discounts available
- **Custom Curriculum**: Tailored to your industry
- **Ongoing Support**: Monthly check-ins and progress tracking
- **Certification**: Business language proficiency certificates

**Ready to break language barriers?** Start your multilingual journey today! 🌍`,

      fr: `## 🗣️ Formation Linguistique d'Affaires et Services de Traduction

### 📚 **Programmes de Formation Linguistique**
- **Français d'Affaires**: Programme intensif 8 semaines - 400$
- **Roumain d'Affaires**: Contexte culturel + langue - 400$
- **Anglais d'Affaires**: Pour non-anglophones - 400$
- **Communication Interculturelle**: Les trois langues - 600$

Prêt à briser les barrières linguistiques? Commencez votre parcours multilingue! 🌍`,

      ro: `## 🗣️ Antrenament Lingvistic de Afaceri și Servicii de Traducere

### 📚 **Programe de Antrenament Lingvistic**
- **Franceza de Afaceri**: Program intensiv 8 săptămâni - 400$
- **Româna de Afaceri**: Context cultural + limbă - 400$
- **Engleza de Afaceri**: Pentru vorbitorii non-nativi - 400$
- **Comunicare Interculturală**: Toate trei limbile - 600$

Gata să rupi barierele lingvistice? Începe călătoria ta multilingvă! 🌍`
    };
    
    return responses[context.query as keyof typeof responses] || responses.en;
  }

  private generateMarketResponse(message: string, context: BusinessContext): string {
    const responses = {
      en: `## 📈 International Market Entry Strategy

### 🎯 **Market Analysis & Opportunity Assessment**
- **Market Size**: Population and economic indicators
- **Competition**: Key players and market gaps
- **Regulatory Environment**: Barriers and requirements
- **Cultural Factors**: Consumer behavior and preferences
- **Economic Conditions**: Growth trends and stability

### 🇫🇷 **France Market Entry**
- **Market Size**: 67M population, €2.4T GDP
- **Key Sectors**: Technology, luxury goods, agriculture, tourism
- **Entry Barriers**: Regulatory compliance, cultural adaptation
- **Opportunities**: EU market access, innovation ecosystem
- **Success Factors**: Local partnerships, cultural intelligence

### 🇷🇴 **Romania Market Entry**
- **Market Size**: 19M population, €220B GDP
- **Key Sectors**: IT services, manufacturing, agriculture
- **Entry Barriers**: Bureaucracy, infrastructure challenges
- **Opportunities**: EU membership benefits, growing middle class
- **Success Factors**: Local expertise, relationship building

### 🇺🇸 **US Market Expansion (Arizona)**
- **Market Size**: 7.3M population, $400B GDP
- **Key Sectors**: Technology, aerospace, tourism, renewable energy
- **Entry Barriers**: Complex regulations, competition
- **Opportunities**: Business-friendly environment, proximity to Mexico
- **Success Factors**: Local presence, cultural adaptation

### 📋 **Market Entry Action Plan**
1. **Market Research**: Comprehensive analysis and validation
2. **Regulatory Compliance**: Legal structure and requirements
3. **Local Partnerships**: Strategic alliances and distributors
4. **Cultural Adaptation**: Products, services, and marketing
5. **Pilot Program**: Small-scale market testing
6. **Full Launch**: Scaled operations and expansion

### 💼 **Our Market Entry Services**
- **Market Research**: $800 comprehensive analysis
- **Entry Strategy**: Custom roadmap development
- **Partner Identification**: Local business connections
- **Regulatory Guidance**: Compliance and legal support
- **Cultural Training**: Team preparation and coaching

**Ready to expand internationally?** Let's develop your market entry strategy! 🌍`,

      fr: `## 📈 Stratégie d'Entrée sur le Marché International

### 🇫🇷 **Entrée sur le Marché Français**
- **Taille du Marché**: 67M habitants, 2.4T€ PIB
- **Secteurs Clés**: Technologie, biens de luxe, agriculture, tourisme
- **Barrières d'Entrée**: Conformité réglementaire, adaptation culturelle
- **Opportunités**: Accès marché UE, écosystème innovation

Prêt à vous développer internationalement? Développons votre stratégie! 🌍`,

      ro: `## 📈 Strategia de Intrare pe Piața Internațională

### 🇷🇴 **Intrarea pe Piața României**
- **Mărimea Pieței**: 19M populație, 220B€ PIB
- **Sectoare Cheie**: Servicii IT, manufacturing, agricultură
- **Bariere de Intrare**: Birocrația, provocări infrastructură
- **Oportunități**: Beneficii membru UE, clasa de mijloc în creștere

Gata să te extinzi internațional? Să dezvoltăm strategia ta! 🌍`
    };
    
    return responses[context.query as keyof typeof responses] || responses.en;
  }
}

export default LeGuideChatbot; 