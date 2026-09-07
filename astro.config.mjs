import { defineConfig } from 'astro/config';
import typography from '@tailwindcss/typography';

import tailwind from '@astrojs/tailwind';

/** @type {import('tailwindcss').Config} */
export default defineConfig({
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  theme: {
    extend: {},
  },

  plugins: [
    typography,
  ],

  integrations: [tailwind()],
});