import { defineConfig } from 'astro/config';
// import partytown from '@astrojs/partytown';

export default defineConfig({
  server: {
    host: true,
    site: 'https://dendend12345.com',
    //base: '/DenDen-HP', // リポジトリ名をスラッシュで囲む
    base: '/',
    watch: {
      usePolling: true,
      interval: 100,
    },
  },

  integrations: [
    /*
    partytown({
      config: {
        lib: '/*partytown',
        forward: ['gtag', 'dataLayer.push'],
      },
    }),
    */
  ],

});
