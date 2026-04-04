/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: '#8B4513',
        gold: '#C8792A',
        'gold-light': '#e8a855',
        dark: '#070707',
        'dark-2': '#0d0d0d',
        'dark-3': '#131313',
      },
      fontFamily: {
        display: ['Urbanist', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tightest: '-0.07em',
      },
    },
  },
  plugins: [],
};
