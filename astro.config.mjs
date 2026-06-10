import { defineConfig } from 'astro/config';

export default defineConfig({
  server: {
    host: true,
    site: 'https://<username>.github.io',
    base: '/DenDen-HP', // リポジトリ名をスラッシュで囲む
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
