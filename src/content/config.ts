import { defineCollection, z } from 'astro:content';

const servicos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    badge: z.string(),
    icon: z.string(),
    order: z.number(),
    heroImage: z.string().optional(),
  }),
});

const cases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    city: z.string(),
    service: z.string(),
    metric: z.string(),
    metricLabel: z.string(),
    featured: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Equipe Moveis.pro'),
  }),
});

export const collections = { servicos, cases, blog };
