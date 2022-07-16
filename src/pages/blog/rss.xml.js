import rss from "@astrojs/rss";
import {
  SITE_TITLE,
  SITE_CANONICAL_URL,
  SITE_DESCRIPTION,
  SITE_AUTHOR,
} from "../../SETTINGS.mjs";
const postImportResult = import.meta.globEager("./posts/*.md");
const posts = Object.values(postImportResult);

console.log({
  SITE_TITLE,
  SITE_CANONICAL_URL,
  SITE_DESCRIPTION,
  SITE_AUTHOR,
});
export const get = () =>
  rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: SITE_CANONICAL_URL,
    author: SITE_AUTHOR,
    items: posts
      .filter((b) => b.frontmatter.date)
      .map((post) => ({
        link: post.frontmatter.description,
        title: post.frontmatter.title,
        pubDate: post.frontmatter.date,
      })),
  });
