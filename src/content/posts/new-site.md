---
publishedAt: "2021-10-23T23:17:43.000Z"
status: "published"
title: "My new website"
description: "A thorough guide to the techniques and tools used to build my website"
author: "John Henry"
heroImage: "/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg"
alt: "Astro"
layout: "../../../components/BlogPage.astro"
tags: ["experimenting", "programming"]
---

_Author’s Note: This is a **Highly Opinionated** guide. Your experiences and preferences may differ._

## Introduction and Openness

I've learned most of what I have
by looking at what others have built before me.
The ability to select "view source"
from the browser's context menu
has been key to what I've been able to learn
as a developer.
Being able to use and examine
source code in public repositories
has also been a boon.

With this in mind,
I set out to create a website
with components that are easy to extract
and use in other projects.

To facilitate this,
nearly all of the scripts and styles
are published as importable modules
located in the /lib/ directory.
They can be imported
directly into most modern web
(or [deno](https://deno.land))
applications without modification.
They are uncompressed and feature comments.
As such, they may not be suitable for production;
but using modern tooling,
you can get around this.
They are also available in their
[own github repository](https://github.com/johnhenry/lib)
where I am currently working
on documentation detailing
how you too can use these modules
in your own applications.

## Declarative Composable HTML

Javascript and CSS both natively support
importing modules, but HTML does not.
Though we import scripts and styles directly;
we use a static compiler in place of markup.

For this site, I use [Astro](https://astro.build)
as a framework to compose and compile HTML components
written as "./astro" files.
I don't publish these directly at https://johnhenry.github.io/lib/
as you can't simply pull them into an application
in the same way you do javascript files;
but they are available on
[this site's github repository](https://github.com/johnhenry/johnhenry.github.io)
and I may publish them elsewhere in the future.

HTML Tags are semantic components.
Classes represent variations on that theme.

## Exceptions

For the most part, I try to keep the style separate from the markup.
That said, there are a few exceptions where I let the HTML structure itself carry some of the styling.

For example, for the buttons in the .widget components,
I've wrapped each letter in a span then styled those as a flex-box for the desired effect.

## Future

Astro 21 -- embed components into blog posts

Some open style guidelines I'm still weighing:

- style a component primarily by **tag** if it is reusable throughout
  the application; add a **class** for slight variations
- style components primarily by **class** if its semantic interpretation goes beyond the set of built-in HTML tags
