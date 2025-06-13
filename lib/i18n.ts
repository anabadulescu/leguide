import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Header
      title: 'Le Guide',
      subtitle: 'Your Cross-Cultural Business Companion',
      
      // Navigation
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      
      // Chat Interface
      chatPlaceholder: 'Ask me about cross-cultural business, regulations, or cultural insights...',
      send: 'Send',
      typing: 'Le Guide is typing...',
      error: 'Something went wrong. Please try again.',
      
      // Language Selector
      language: 'Language',
      english: 'English',
      french: 'Français',
      romanian: 'Română',
      
      // Features
      businessCompliance: 'Business & Compliance',
      culturalInsights: 'Cultural Insights',
      marketEntry: 'Market Entry',
      languageTraining: 'Language Training',
      
      // Quick Actions
      quickActions: 'Quick Actions',
      teamCommunication: 'Team Communication',
      conflictResolution: 'Conflict Resolution',
      timingOptimization: 'Timing Optimization',
      franceRegulations: 'France Business Regulations',
      romaniaLaws: 'Romania Business Laws',
      usExpansion: 'US Market Expansion',
      culturalTips: 'Cultural Tips',
      
      // Welcome Messages
      welcomeMessage: 'Hello! I\'m Le Guide, your expert assistant for cross-cultural business consulting. How can I help you today?',
      
      // Services
      servicesTitle: 'Our Services',
      languageTrainingDesc: 'Customized business language training in French, Romanian, and English',
      culturalWorkshopsDesc: 'Practical workshops on business etiquette and cultural nuances',
      marketEntryDesc: 'Comprehensive consulting for international market entry',
      complianceDesc: 'Guidance on regulatory compliance and business laws',
    }
  },
  fr: {
    translation: {
      // Header
      title: 'Le Guide',
      subtitle: 'Votre Compagnon d\'Affaires Interculturel',
      
      // Navigation
      home: 'Accueil',
      about: 'À Propos',
      services: 'Services',
      contact: 'Contact',
      
      // Chat Interface
      chatPlaceholder: 'Posez-moi des questions sur les affaires interculturelles, les réglementations ou les insights culturels...',
      send: 'Envoyer',
      typing: 'Le Guide écrit...',
      error: 'Une erreur s\'est produite. Veuillez réessayer.',
      
      // Language Selector
      language: 'Langue',
      english: 'English',
      french: 'Français',
      romanian: 'Română',
      
      // Features
      businessCompliance: 'Conformité d\'Entreprise',
      culturalInsights: 'Insights Culturels',
      marketEntry: 'Entrée sur le Marché',
      languageTraining: 'Formation Linguistique',
      
      // Quick Actions
      quickActions: 'Actions Rapides',
      teamCommunication: 'Communication d\'Équipe',
      conflictResolution: 'Résolution de Conflits',
      timingOptimization: 'Optimisation du Temps',
      franceRegulations: 'Réglementations d\'Entreprise en France',
      romaniaLaws: 'Lois d\'Entreprise en Roumanie',
      usExpansion: 'Expansion sur le Marché Américain',
      culturalTips: 'Conseils Culturels',
      
      // Welcome Messages
      welcomeMessage: 'Bonjour ! Je suis Le Guide, votre assistant expert pour le conseil en affaires interculturelles. Comment puis-je vous aider aujourd\'hui ?',
      
      // Services
      servicesTitle: 'Nos Services',
      languageTrainingDesc: 'Formation linguistique d\'affaires personnalisée en français, roumain et anglais',
      culturalWorkshopsDesc: 'Ateliers pratiques sur l\'étiquette d\'affaires et les nuances culturelles',
      marketEntryDesc: 'Conseil complet pour l\'entrée sur les marchés internationaux',
      complianceDesc: 'Conseils sur la conformité réglementaire et les lois d\'entreprise',
    }
  },
  ro: {
    translation: {
      // Header
      title: 'Le Guide',
      subtitle: 'Companionul Tău de Afaceri Interculturale',
      
      // Navigation
      home: 'Acasă',
      about: 'Despre',
      services: 'Servicii',
      contact: 'Contact',
      
      // Chat Interface
      chatPlaceholder: 'Întreabă-mă despre afaceri interculturale, reglementări sau perspective culturale...',
      send: 'Trimite',
      typing: 'Le Guide scrie...',
      error: 'Ceva nu a mers bine. Te rog să încerci din nou.',
      
      // Language Selector
      language: 'Limba',
      english: 'English',
      french: 'Français',
      romanian: 'Română',
      
      // Features
      businessCompliance: 'Conformitate în Afaceri',
      culturalInsights: 'Perspective Culturale',
      marketEntry: 'Intrarea pe Piață',
      languageTraining: 'Antrenament Lingvistic',
      
      // Quick Actions
      quickActions: 'Acțiuni Rapide',
      teamCommunication: 'Comunicație în Echipă',
      conflictResolution: 'Rezolvarea Conflictelor',
      timingOptimization: 'Optimizarea Timpului',
      franceRegulations: 'Reglementări de Afaceri în Franța',
      romaniaLaws: 'Legi de Afaceri în România',
      usExpansion: 'Expansiunea pe Piața Americană',
      culturalTips: 'Sfaturi Culturale',
      
      // Welcome Messages
      welcomeMessage: 'Bună! Sunt Le Guide, asistentul tău expert pentru consultanță în afaceri interculturale. Cum te pot ajuta astăzi?',
      
      // Services
      servicesTitle: 'Serviciile Noastre',
      languageTrainingDesc: 'Antrenament lingvistic personalizat pentru afaceri în franceză, română și engleză',
      culturalWorkshopsDesc: 'Ateliere practice despre eticheta în afaceri și nuanțele culturale',
      marketEntryDesc: 'Consultanță comprehensivă pentru intrarea pe piețele internaționale',
      complianceDesc: 'Îndrumare despre conformitatea reglementară și legile de afaceri',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n; 