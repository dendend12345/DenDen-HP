import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // ↓ site と base は、server の外側のここに書くのが正しい場所です
  // お使いのカスタムドメイン
  site: 'https://dendend12345.com',

  // カスタムドメイン運用の場合は通常 '/'
  base: '/',

  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },

  integrations: [tailwind()],
});