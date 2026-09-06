import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [
    typography, // ← 追加
  ],
};
</Step>

<Step title="Markdownを表示しているコンテナに prose クラスを付与する">
Markdown の記事データを読み込んでレンダリングしている `.astro` ファイル（例: `src/layouts/BlogPost.astro` や `src/pages/blog/[...slug].astro` など）を開きます。

`<Content />` や `<slot />` を囲んでいる要素に **`class="prose"`** を追加します。