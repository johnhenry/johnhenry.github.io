// Static
						const frontmatter = {"title":"VS Code on a Remote Server","description":"How to run Visual Studio Code on a remote server","date":"7 September 2019","lastUpdate":"2 October 2019","author":"John Henry","heroImage":"/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg","alt":"Astro","layout":"../../../components/BlogPage.astro","tags":["programming","experimenting"]};
						const file = "/home/runner/work/johnhenry.github.io/johnhenry.github.io/src/pages/blog/posts/vscode-on-remote-server.md";
						const url = "/blog/posts/vscode-on-remote-server";
						
						// Deferred
						async function load() {
							return (await import('../entry.mjs').then(function (n) { return n.c; }));
						}						function Content(...args) {
							return load().then((m) => m.default(...args))
						}
						Content.isAstroComponentFactory = true;
						function getHeaders() {
							return load().then((m) => m.metadata.headers)
						}

export { Content, load as default, file, frontmatter, getHeaders, url };
