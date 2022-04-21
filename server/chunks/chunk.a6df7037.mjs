// Static
						const frontmatter = {"title":"Semantics Versus Accessibility","description":"We explore an issue plaguing modern development and propose a solution","date":"4 November 2021","lastUpdate":"4 November 2021","author":"John Henry","heroImage":"/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg","alt":"Astro","layout":"../../../components/BlogPage.astro","tags":["experimenting"]};
						const file = "/home/runner/work/johnhenry.github.io/johnhenry.github.io/src/pages/blog/posts/semantics-vs-accessibility.md";
						const url = "/blog/posts/semantics-vs-accessibility";
						
						// Deferred
						async function load() {
							return (await import('../entry.mjs').then(function (n) { return n.a; }));
						}						function Content(...args) {
							return load().then((m) => m.default(...args))
						}
						Content.isAstroComponentFactory = true;
						function getHeaders() {
							return load().then((m) => m.metadata.headers)
						}

export { Content, load as default, file, frontmatter, getHeaders, url };
