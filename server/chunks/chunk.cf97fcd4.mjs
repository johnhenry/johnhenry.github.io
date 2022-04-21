// Static
						const frontmatter = {"title":"Manage Websites Like Docker","description":"Manage static websites like you manage Docker images","author":"John Henry","date":"26 October 2021","heroImage":"/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg","alt":"","layout":"../../../components/BlogPage.astro","tags":["programming"]};
						const file = "/home/runner/work/johnhenry.github.io/johnhenry.github.io/src/pages/blog/posts/manage-websites-like-docker.md";
						const url = "/blog/posts/manage-websites-like-docker";
						
						// Deferred
						async function load() {
							return (await import('../entry.mjs').then(function (n) { return n._; }));
						}						function Content(...args) {
							return load().then((m) => m.default(...args))
						}
						Content.isAstroComponentFactory = true;
						function getHeaders() {
							return load().then((m) => m.metadata.headers)
						}

export { Content, load as default, file, frontmatter, getHeaders, url };
