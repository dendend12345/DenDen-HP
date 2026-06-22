import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
			title: z.string(),
		pubDate: z.date(),
    draft: z.boolean().optional().default(false),
	}),
});

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog, news };
