import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		pubDate: z.date(),
    draft: z.boolean().default(false),
	}),
});

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    draft: z.boolean().default(false),
  }),
});

const help = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		helpPubDate: z.date(),
    draft: z.boolean().default(false),
	}),
});

export const collections = { blog, news, help };
