import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import ClientProvider from '@/components/ClientProvider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Le Guide - Cross-Cultural Business Assistant | Maison de Culture',
  description: 'Your multilingual AI assistant for cross-cultural business consulting. Expert guidance for US-European market expansion, compliance, and cultural insights.',
  keywords: 'cross-cultural business, international expansion, business consulting, France, Romania, Moldova, US market, cultural training',
  authors: [{ name: 'Maison de Culture' }],
  openGraph: {
    title: 'Le Guide - Cross-Cultural Business Assistant',
    description: 'Your multilingual AI assistant for cross-cultural business consulting.',
    url: 'https://maisondeculture.com',
    siteName: 'Maison de Culture',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Guide - Cross-Cultural Business Assistant',
    description: 'Your multilingual AI assistant for cross-cultural business consulting.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased bg-maison-cream`}>
        <ClientProvider>
          <main>
            {children}
          </main>
        </ClientProvider>
      </body>
    </html>
  );
} 