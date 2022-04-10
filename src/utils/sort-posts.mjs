export default (posts) => {
  const sorted = posts
    .filter((b) => b.frontmatter.date)
    .sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );
  const tags = new Set();
  const byTag = {};
  for (const post of sorted) {
    for (const tag of post.frontmatter.tags) {
      tags.add(tag);
      if (byTag[tag]) {
        byTag[tag].push(post);
      } else {
        byTag[tag] = [post];
      }
    }
  }
  const latest = sorted[0];
  return {
    byTag: Object.entries(byTag),
    posts,
    sorted,
    latest,
    tags: [...tags],
  };
};
