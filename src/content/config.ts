import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Fed by Outstatic (johnhenry/portfolio's CMS), which commits markdown files
// directly into src/content/projects/ and src/content/posts/ in this repo.
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    author: z
      .object({
        name: z.string(),
        picture: z.string().url().or(z.literal("")),
      })
      .optional(),
    coverImage: z.string().optional().default(""),
    status: z.enum(["published", "draft"]).default("published"),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    url: z.string().url(),
    type: z.enum(["::app::", "::code::", "::library::", "::design::"]),
    tags: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .optional()
      .default([]),
    color: z.string().optional(),
    video: z.string().url().optional().or(z.literal("")),
  }),
});

// New CMS-authored posts land here going forward; the 11 existing posts stay
// as plain pages in src/pages/blog/posts/ (see src/utils/get-all-posts.mjs).
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Free-text to match legacy posts' non-ISO dates ("1 August 2013"); new
    // CMS-authored posts should use ISO-8601, which parses fine as a string too.
    date: z.string().optional(),
    lastUpdate: z.string().optional(),
    author: z.string().default("John Henry"),
    heroImage: z.string().optional(),
    alt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    // Legacy Markdown-layout field; inert for collection entries, kept
    // optional so copied-over frontmatter doesn't fail validation.
    layout: z.string().optional(),
  }),
});

export const collections = { projects, posts };
