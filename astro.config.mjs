import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';

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

  integrations: [
    partytown({
      config: {
        forward: ['gtag', 'dataLayer.push'],
      },
    }),
  ],

});
