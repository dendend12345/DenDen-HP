import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dendend12345.github.io',
  base: '/DenDen-HP',

  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});