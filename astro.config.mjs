import { defineConfig } from 'astro/config';

export default defineConfig({
  // ↓ site と base は、server の外側のここに書くのが正しい場所です
  site: 'https://dendend12345.com', // お使いのカスタムドメイン
  base: '/',                         // カスタムドメイン運用の場合は通常 '/'

  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
