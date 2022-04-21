// Static
						const frontmatter = {"title":"Browsers, Servers, and APIs","description":"Using servers in the browsers","date":"1 May 2019","author":"John Henry","heroImage":"/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg","alt":"Astro","layout":"../../../components/BlogPage.astro","tags":["programming"]};
						const file = "/home/runner/work/johnhenry.github.io/johnhenry.github.io/src/pages/blog/posts/browsers-servers-and-apis.md";
						const url = "/blog/posts/browsers-servers-and-apis";
						
						// Deferred
						async function load() {
							return (await import('../entry.mjs').then(function (n) { return n.b; }));
						}						function Content(...args) {
							return load().then((m) => m.default(...args))
						}
						Content.isAstroComponentFactory = true;
						function getHeaders() {
							return load().then((m) => m.metadata.headers)
						}

export { Content, load as default, file, frontmatter, getHeaders, url };
