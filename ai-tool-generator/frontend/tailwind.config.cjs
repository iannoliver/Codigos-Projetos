/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Define como rgb(... / <alpha-value>) para permitir bg-xxx/90
        panel: {
          DEFAULT: 'rgb(17 25 54 / <alpha-value>)',     // #111936
          outline: 'rgb(36 48 86 / <alpha-value>)',     // #243056
          soft: 'rgb(14 21 48 / <alpha-value>)',        // #0E1530
          hover: 'rgb(21 31 70 / <alpha-value>)',       // #151F46
        },
        text: {
          base: '#D8DCEF',
          mute: '#8A93B5',
        },
        primary: {
          500: '#6366F1',
          600: '#5852E0',
          700: '#4F46E5',
        },
        accent: {
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        app: {
          bg: 'rgb(11 16 35 / <alpha-value>)',          // #0B1023
          bgSoft: 'rgb(14 22 48 / <alpha-value>)',      // #0E1630
        },
      },
      boxShadow: {
        panel: '0 8px 24px rgba(20,24,60,0.45), 0 2px 6px rgba(0,0,0,0.4)',
        glow: '0 0 0 2px rgba(99,102,241,0.25), 0 0 24px rgba(139,92,246,0.25)',
      },
      backgroundImage: {
        'grid-dots':
          'radial-gradient(circle at 1px 1px, rgba(124,58,237,0.15) 1px, transparent 0)',
      },
      backgroundSize: {
        'grid-dots': '24px 24px',
      },
    },
  },
  plugins: [],
};