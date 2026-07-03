import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../../SETTINGS.mjs";

const postImportResult = import.meta.glob("./posts/*.md", { eager: true });
const posts = Object.values(postImportResult);

export const GET = (context) =>
  rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .filter((post) => post.frontmatter.date)
      .map((post) => ({
        link: post.url,
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        pubDate: new Date(post.frontmatter.date),
      })),
  });
