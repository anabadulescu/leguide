'use client';

import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

interface ClientProviderProps {
  children: React.ReactNode;
}

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setIsInitialized(true);
    } else {
      i18n.init().then(() => {
        setIsInitialized(true);
      }).catch((error) => {
        console.error('Failed to initialize i18n:', error);
        setIsInitialized(true); // Still render to avoid blank page
      });
    }
  }, []);

  if (!isInitialized) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-maison-cream via-maison-pearl to-maison-gold-50">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gradient-to-br from-maison-gold-400 to-maison-navy-600 rounded-full animate-spin"></div>
          <span className="text-maison-navy-700 font-medium">Loading Le Guide...</span>
        </div>
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default ClientProvider; 