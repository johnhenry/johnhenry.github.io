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

// All blog posts live here, editable via Outstatic (see get-all-posts.mjs,
// which also merges in any future file-based pages if ever added again).
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    // Outstatic's own document editor/list UI requires these two on every
    // document in every collection, independent of our own schema -- without
    // them the CMS dashboard shows "Invalid date" and editing fails
    // validation. Not used by this site's own rendering (which keys off
    // `date` below for sort/display/RSS-inclusion), only by Outstatic itself.
    publishedAt: z.coerce.date(),
    status: z.enum(["published", "draft"]).default("published"),

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
