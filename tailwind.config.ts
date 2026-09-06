import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'] as any,
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
      },
    },
  },
  plugins: [],
};

export default config;
