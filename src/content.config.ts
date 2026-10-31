import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const CATEGORY = z.enum(["security", "performance", "network", "gameplay", "smp"]);

/**
 * Product documentation. One entry per plugin that has enough repository
 * evidence for a useful page; the route is /docs/<plugin>/.
 */
const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    plugin: z.string(),
    category: CATEGORY,
    updated: z.coerce.date(),
    /** True only when compatibility was exercised on a real server. */
    runtimeVerified: z.boolean().default(false),
    /** Short note shown under the evidence label. */
    evidenceNote: z.string().optional(),
  }),
});

/**
 * Task-led articles. The route is /guides/<slug>/.
 */
const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
    author: z.string().default("LinsaFTW"),
    relatedPlugins: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]),
  }),
});

export const collections = { docs, guides };
