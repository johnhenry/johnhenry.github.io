---
title: "Manage Websites Like Docker"
description: Manage static websites like you manage Docker images
author: "John Henry"
date: "26 October 2021"
heroImage: "/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg"
alt: ""
layout: "../../../components/BlogPage.astro"
tags: ["programming"]
---

_Author’s Note: This is based on **experimental** technologies that aren't quite ready for production. Nonetheless, I believe the ideas presented in this article will be useful in the near future._

Did you know that you can manage static websites
like you manage images with [Docker](https://docker.com)? You can!

But I'm sure you have a few more questions, like:

- What do I mean by "like Docker"?
- Why would you want to do such a thing?
- How can you do it yourself?

To find answers,
we will first take a _simplified_ look
at how management works with Docker.
We will then learn how to create
a similar process for static websites.

## Workflow

At its most basic, Docker works like this:

1. Create an image [(an OCI Image)](https://github.com/opencontainers/image-spec)
   -- a single artifact that represents a file tree.
   ```bash
   docker build -t registry/image:0.0.0 -f - . <<EOF
   FROM nginx:latest
   EOF
   ```
2. Publish the image to a registry [(an OCI Registry)](https://github.com/opencontainers/distribution-spec).
   ```bash
   docker push registry/image:0.0.0
   ```
3. When necessary, retrieve said image from the registry to use it.
   ```bash
   docker run -it --rm -p 8080:80 registry/image:0.0.0
   # Note:`docker run` pulls the image from the registry if not locally available
   ```

When we make static websites, the process is similarly simple:

1. Create a file tree.

   ```bash
   npm run build
   ...
   # There are countless technologies -- atom, webpack, rollup, etc. --
   # that can be used to create a static website.
   ```

2. When necessary, push file tree to a server.
   ```bash
   npm run publish
   ...
   # There are similarly a number of options for publishing.
   # ftp and git (when configured with hooks) are viable options.
   ```

While both processes are simple,
the idea of an **image** from the Docker
workflow is key.
An entire website as a single artifact
to be versioned, shared, and deployed
in like an image is enticing.

## Tutorial

Now that we've covered the "what" and the "why", let's look at the "how".

### Prerequesites

In order complete do this tutorial, you'll need the following installed:

#### go

Two CLI tools are based on go,
so we might as well get this out of the way first.

Install go according to [instructions here](https://golang.org/doc/install).

#### gen-bundle

Install gen-bundle according to [instructions here](https://github.com/WICG/webpackage/tree/main/go/bundle).

```bash
# Install wasm-to-oci https://github.com/engineerd/wasm-to-oci
go get -u github.com/WICG/webpackage/go/bundle/cmd/...
```

#### wasm-to-oci

Install wasm-to-oci according to [instructions here](https://github.com/engineerd/wasm-to-oci), or run:

```bash
# Install wasm-to-oci https://github.com/engineerd/wasm-to-oci
go get -u github.com/WICG/webpackage/go/bundle/cmd/...
```

#### Docker

This is silly;
but to authenticate wasm-to-oci,
you need Docker.

This will hopefully change soon --
I said this was "experimental"!

Install docker according to [instructions here](https://golang.org/doc/install).

#### Google Chrome

Install Google Chrome according to [instructions here](https://www.google.com/chrome/).

#### a Github Account

You'll need a Github account to publish the artifact.

[Sign up](https://github.com/) and
[set up your container registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
if you haven't already.

### Plan

We want a process
that mirrors the one
outlined above for Docker:

1. Convert a file tree into an "image-like" artifact. (using `gen-bungle`)
2. Publish said artifact to a registry. (Github via `wasm-to-oci`)
3. When necessary, retrieve said image from the registry and view it. (with `wasm-to-oci` and Google Chrome)

### Artifact

In place of an image,
we use a [web bundle](https://web.dev/web-bundles/)
-- an emerging format used to package entire websites.

#### Create an artifact

Create a empty folder named 'hello-world'.

In it, place a file named 'index.html'
with the following contents:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Web Bundle</title>
  </head>
  <body>
    Hello, World! This is the first page!
    <a href="/next.html"> See what's next... </a>
  </body>
</html>
```

Place another file named 'next.html'
with the following contents:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My first bundle</title>
  </head>
  <body>
    Hello again, World! This is the second page!
    <a href="/"> See what (or who? 🤔) has come before...</a>
  </body>
</html>
```

Outside of the hello-world folder, run the following command:

```bash
gen-bundle -dir ./hello-world -baseURL http://localhost/ -o hello-world.wbn -primaryURL http://localhost/
```

This creates a bundle file
named "hello-world.wbn".
This is equivalent to a Docker image.
(Note that when you interact with docker,
you use commands like `build`, `push`, and `pull`.
You do not ususually interact directly
with image files themselves.)

#### View Artifact

To view the artifact,
we need to enable
the experimental
"web bundles" browser feature.

Using Chrome, visit `chrome://flags/#web-bundles`.
Enable the feature and restart your browser.

Using Chrome, open the `hello-world.wbn` file
that you previoiusly created.
The url will look something like
`file:///.../hello-world.wbn?http://localhost/`.

Notice that you can freely navigate
between pages of the site --
even though it's just single file!

You can probably imagine
a few uses for this;
and here are a few:

1. Entire websites can be easily snapped-shotted
   and archived into a single file.

2. In the past, creating a test deployment for a site
   used to require spinning up a new server.
   Now you can do it by sharing a single file.

### Registry

In place of a registry,
how do we manage our bundles?
The beautiful thing is that
we can actually use an OCI registry!

OCI has a [goal](https://github.com/opencontainers/artifacts)
to enable the distribution
of more cloud native artifacts.

There are no existing tools
to push bundles (specificaly)
to OCI registries.
Fortunately, we can ~abuse~ use WASM to OCI
-- a tool for doing something
similar with web assembly --
for our purposes.

We'll use GitHub as a OCI registry
as it supports unknown images.
Notably, Docker Hub does not support this.

#### Login to Github with Docker

We will use Docker )only\_ to authenticate

First obtain a
[github access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
with, permissions to read and write to the registry.

User `docker login` to login to the github container registry at `ghcr.io`,

```bash
echo $GITHUB_ACCESS_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin
```

#### Pushing and Pulling

Push the bundle to the registry with:

```bash
wasm-to-oci push ./hello-world.wbn ghcr.io/$GITHUB_USERNAME/hello-world:0.0.0
```

If the registry at
`https://github.com/users/$GITHUB_USERNAME/packages/container/package/hello-world`
doest not exist, it will be created automatically.

You can view and manage artifacts in your repository at `https://github.com/$GITHUB_USERNAME?tab=packages`.

```bash
wasm-to-oci pull ghcr.io/$GITHUB_USERNAME/hello-world:0.0.0 --out hello-world.test.wbn
```

### What's next?

There are still a few main things missing from this work flow:

1. The `docker images` command provides a way to
   manage docker images locally.

   I don't currently have an equivalent
   for managing bundles
   or generic OCI images.

2. The `docker run` command provides way to
   to create a "running" container
   by combining an image with a linux kernel.

   The equivalent would be
   hosting a bundle as a static asset
   such that a user can interact with it.

3. The `docker run` command provides way to
   to create a "running" container
   by combining an image with a linux kernel.

   The equivalent would be
   hosting a bundle as a static asset
   such that a user can interact with it.

4. The `docker build` incrementally builds
   images from other, protypal images.

   The equivalent would be
   a templating system that can pull
   existing static in websites,
   and modify them to make new ones.
