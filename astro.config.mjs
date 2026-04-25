import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://labsfluxo-stack.github.io',
  base: '/moveis.pro-site/',
  integrations: [tailwind(), sitemap()],
});
