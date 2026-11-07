import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../../SETTINGS.mjs";
import getAllPosts from "../../utils/get-all-posts.mjs";

export const GET = async (context) => {
  const posts = await getAllPosts();
  return rss({
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
};
