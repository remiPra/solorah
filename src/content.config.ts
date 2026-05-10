import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['fr', 'en', 'zh', 'es', 'de', 'hi', 'ja']),
    date: z.coerce.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    slug: z.string(),
  }),
});

const signification = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/signification' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['fr', 'en', 'zh', 'es', 'de', 'hi', 'ja']),
    date: z.coerce.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    slug: z.string(),
    numero: z.number(),
    nom: z.string(),
    element: z.string().optional(),
    planete: z.string().optional(),
    signe: z.string().optional(),
    ouiNon: z.string().optional(),
  }),
});

export const collections = { blog, signification };
