/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: '#8E4429',
        gold: '#B85C3A',
        'gold-light': '#CD7D5E',
        dark: '#100C09',
        'dark-2': '#17110E',
        'dark-3': '#1F1713',
        cream: '#F7F0E8',
        'cream-2': '#EFE5D8',
      },
      fontFamily: {
        display: ['Satoshi', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tightest: '-0.07em',
      },
    },
  },
  plugins: [],
};
