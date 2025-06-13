/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        maison: {
          // Sophisticated Gold Palette
          'gold-50': '#fffef7',
          'gold-100': '#fffbeb',
          'gold-200': '#fef3c7',
          'gold-300': '#fde68a',
          'gold-400': '#facc15',
          'gold-500': '#D4AF37', // Main gold
          'gold-600': '#B8941F',
          'gold-700': '#92741A',
          'gold-800': '#6B5515',
          'gold-900': '#453611',
          
          // Elegant Navy Palette
          'navy-50': '#f8fafc',
          'navy-100': '#f1f5f9',
          'navy-200': '#e2e8f0',
          'navy-300': '#94a3b8',
          'navy-400': '#64748b',
          'navy-500': '#334155',
          'navy-600': '#1e3a8a', // Main navy
          'navy-700': '#1e293b',
          'navy-800': '#0f172a',
          'navy-900': '#020617',
          
          // Accent Colors
          'cream': '#fefdfb',
          'pearl': '#f7f5f3',
          'charcoal': '#374151',
          'slate': '#64748b',
          
          // Gradient combinations
          'royal': '#1e3a8a',
          'champagne': '#f7e7a1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-gentle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      boxShadow: {
        'elegant': '0 4px 6px -1px rgba(212, 175, 55, 0.1), 0 2px 4px -1px rgba(212, 175, 55, 0.06)',
        'gold': '0 4px 14px 0 rgba(212, 175, 55, 0.25)',
        'navy': '0 4px 14px 0 rgba(30, 58, 138, 0.25)',
        'luxury': '0 8px 32px 0 rgba(212, 175, 55, 0.12), 0 2px 16px 0 rgba(30, 58, 138, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
      gradientColorStops: {
        'gold-light': '#f7e7a1',
        'gold-dark': '#B8941F',
        'navy-light': '#334155',
        'navy-dark': '#0f172a',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 