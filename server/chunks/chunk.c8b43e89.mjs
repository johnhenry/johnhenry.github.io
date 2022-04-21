// Static
						const frontmatter = {"title":"My new website","description":"A thorough guide to to the techniques and tools used to build my website","author":"John Henry","heroImage":"/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg","alt":"Astro","layout":"../../../components/BlogPage.astro","tags":["experiment","programming"]};
						const file = "/home/runner/work/johnhenry.github.io/johnhenry.github.io/src/pages/blog/posts/new-site.md";
						const url = "/blog/posts/new-site";
						
						// Deferred
						async function load() {
							return (await import('../entry.mjs').then(function (n) { return n.g; }));
						}						function Content(...args) {
							return load().then((m) => m.default(...args))
						}
						Content.isAstroComponentFactory = true;
						function getHeaders() {
							return load().then((m) => m.metadata.headers)
						}

export { Content, load as default, file, frontmatter, getHeaders, url };
