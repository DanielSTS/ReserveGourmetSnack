import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#F0F0F5',
        main: '#FFFFFF',
        redMain: '#720B0B',
        redHover: '#0E9386'
      }
    }
  },
  plugins: []
};
export default config;
