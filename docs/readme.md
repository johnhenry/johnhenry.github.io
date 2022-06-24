# johnhenry.github.io -- John Henry's Personal Website

This site is published at [https://johnhenry.github.io/) via the [static branch](https://github.com/johnhenry/johnhenry.github.io/tree/static) of [https://github.com/johnhenry/johnhenry.github.io](https://github.com/johnhenry/johnhenry.github.io).

- [Project](https://github.com/users/johnhenry/projects/2)
- [Discussion](https://github.com/johnhenry/johnhenry.github.io/discussions)
- [Issues](https://github.com/johnhenry/johnhenry.github.io/issues)

## Documentation

- [Application Architecture](./architecture.application.md)
- [Deployment Architecture](./architecture.deployment.md)
- [Environment Variables](./environment.variables.md)

## Major Dependencies

[Astro](https://astro.build) -- Framework used to compose HTML.

[astro-plain](https://www.npmjs.com/package/astro-plain) -- Generic astro template upon which all pages are based.

[johnhenry/lib](https://johnhenry.github.io/lib) -- exerimental library with various utilities for building web and javascript applications.

## Local Development

### Devcontainer

To use the devcontainer, clone this repo along with submodules:

```bash
git clone --recurse-submodules <path to this repo>
```

To add submodules,
from within the repo run:

```bash
git submodule update --init --recursive
```

You can run devcontainers using

- [VSCode](https://code.visualstudio.com/docs/remote/containers)
- [Codespaces](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/introduction-to-dev-containers)
- [CLI](https://github.com/devcontainers/cli)
