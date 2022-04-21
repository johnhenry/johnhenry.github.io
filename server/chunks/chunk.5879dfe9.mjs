// Static
						const frontmatter = {"title":"Angular Done Right: Part 1","description":"The first in a series on how to use Angular 1.0","date":"1 August 2013","author":"John Henry","heroImage":"/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg","alt":"Astro","layout":"../../../components/BlogPage.astro","tags":["programming"]};
						const file = "/home/runner/work/johnhenry.github.io/johnhenry.github.io/src/pages/blog/posts/angular-done-right.md";
						const url = "/blog/posts/angular-done-right";
						
						// Deferred
						async function load() {
							return (await import('../entry.mjs').then(function (n) { return n.d; }));
						}						function Content(...args) {
							return load().then((m) => m.default(...args))
						}
						Content.isAstroComponentFactory = true;
						function getHeaders() {
							return load().then((m) => m.metadata.headers)
						}

export { Content, load as default, file, frontmatter, getHeaders, url };
