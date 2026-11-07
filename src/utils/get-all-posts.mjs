import { getCollection } from "astro:content";

// Normalizes both sources into the { url, frontmatter } shape that
// sort-posts.mjs and the blog render components already expect, so none of
// that existing code needs to change. Legacy posts stay as file-based pages
// (src/pages/blog/posts/*.md); new CMS-authored posts land in the `posts`
// content collection (src/content/posts/) and get a real page via
// src/pages/blog/posts/[...slug].astro.
export default async function getAllPosts() {
  const pageModules = import.meta.glob("../pages/blog/posts/*.md", { eager: true });
  const pagePosts = Object.values(pageModules);

  const collectionPosts = await getCollection("posts");
  const shimmed = collectionPosts.map((entry) => ({
    url: `/blog/posts/${entry.id}/`,
    frontmatter: entry.data,
  }));

  return [...pagePosts, ...shimmed];
}
