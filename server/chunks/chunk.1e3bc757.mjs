// Static
						const frontmatter = {};
						const file = "/home/runner/work/johnhenry.github.io/johnhenry.github.io/src/pages/blog/posts/component.md";
						const url = "/blog/posts/component";
						
						// Deferred
						async function load() {
							return (await import('../entry.mjs').then(function (n) { return n.f; }));
						}						function Content(...args) {
							return load().then((m) => m.default(...args))
						}
						Content.isAstroComponentFactory = true;
						function getHeaders() {
							return load().then((m) => m.metadata.headers)
						}

export { Content, load as default, file, frontmatter, getHeaders, url };
