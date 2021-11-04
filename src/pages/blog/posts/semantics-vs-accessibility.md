---
title: "Semantics Versus Accessibility"
description: "We explore an issue plaguing modern development and propose a solution"
date: "4 November 2021"
lastUpdate: "4 November 2021"
author: "John Henry"
heroImage: "/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg"
alt: "Astro"
layout: "../../../components/BlogPage.astro"
tags: ["experimenting"]
---

Long ago,
while trying to shoehorn
new accessibility standards
into an existing website,
I ran into an interesting problem.

Kevin Powell's video on a [common HTML mistake](https://www.youtube.com/watch?v=NexL5_Vdoq8&ab_channel=KevinPowell) reminded me of it.

## Semantics for Accessibility

According to [current standards](https://html.spec.whatwg.org/multipage/sections.html#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements)
HTML heading elements must appear
in a hierarchy within a web page.

```html
<body>
  <h1>The first Thanksgiving</h1>
  <section>
    <h2>Leaving England</h2>
    <p>
      Due to certain "differences", the pilgrims decided to leave england...
    </p>
    <section>
      <h2>Getting on the boat</h2>
      <p>The Mayflower was a mighty ship...</p>
    </section>
  </section>
  <section>
    <h2>Crossing the sea</h2>
    <p>...</p>
  </section>
</body>
```

This allows screen readers
to recognize content and
describe it to the user of a website.

## The Problem

Modern component-based design would have us
create components that are unaware of their containers.

Semantically, a top level heading within a component shouldn't depend upon the headings of its ancestors.

You would be tempted do this:

```html
<body>
  <h1>The first Thanksgiving</h1>
  <section>
    <h1>Leaving England</h1>
    <p>
      Due to certain "differences", the pilgrims decided to leave england...
    </p>
    <section>
      <h1>Getting on the boat</h1>
      <p>The Mayflower was a mighty ship...</p>
    </section>
  </section>
  <section>
    <h1>Crossing the sea</h1>
    <p>...</p>
  </section>
</body>
```

isolating the semantics of the sections heading.

In fact, there was a proposal
to allow this --
the "Document Outline Algorithm".
Sadly, it was [never implemented](https://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html).

But, in the case of HTML headings; if a section has a heading of "h2",
it must be the child of a section with an "h1".
A section with an "h3"
must have a parent with and "h2" and so on.

The problem arises in that _using sensical **semantics** to create components is at odds with how screenreaders interpret **accessibility** cues in HTML_... or...

**Semantics Versus Accessibility**.

(That's the name of the ~~movie~~ post!)

## The Solution

We can mitigate this by passing
a bit of context to components to
indicate hierarchical positioning.

We will do this using [Astro](https://astro.build),
though the concept should be translatable
to other environments.

```astro
---
// file:///./boring-section.astro
const parentLevel = Astro.props.paerentLevel || 0;
const currentLevel = Astro.props.currentLevel = parentLevel + 1;
---
<style>
section {
  color: black;
  font-style: normal;
}
</style>
<section>
  <h{currentLevel}>Boring Section</h{currentLevel}>
  <slot />
</section>
```

```astro
---
// file:///./fancy-section.astro
const parentLevel = Astro.props.paerentLevel || 0;
const currentLevel = Astro.props.currentLevel = parentLevel + 1;
---
<style>
  section {
    color: pink;
    font-style: italic;
  }
</style>
<section>
  <h{currentLevel}>Fancy Section</h{currentLevel}>
  <slot />
</section>
```

```astro
---
import BoringSection from "./boring-section.astro";
import FancySection from "./fancy-section.astro";
---
---
<body>
  <BoringSection>
    <FancySection parentLevel={1}>
      Hello, Earl!
    </FancySection>
  </BoringSection>
</body>
```

This will produce the following HTML:

```html
<body>
  <section>
    <h1>Fancy Section</h1>
    <section>
      <h2>Boring Section</h2>
      <p>Hello, Earl!</p>
    </section>
  </section>
</body>
```

You can use a utility function
to make the code a bit cleaner a bit cleaner.

```javascript
// file:///./get-level.mjs
export default (Astro) => (Astro.props.parentLevel || 0) + 1;
```

```astro
---
// file:///./boring-section.astro
import getLevel from "./get-level.mjs";
const currentLevel = getLevel(Astro);
---
<style>
section {
  color: black;
  font-style: normal;
}
</style>
<section>
  <h{currentLevel}>Boring Section</h{currentLevel}>
  <slot />
</section>
```

Still, this is not ideal
as the developer is required
to manually pass the parentLevel property
through to each child.

Using nested, indexed for loops may help,
but I can already imagine being convoluted.

The [React Context API](https://reactjs.org/docs/context.html) and the
[Vue Provide/Inject API](https://v3.vuejs.org/guide/component-provide-inject.htm)
may also provide solutions.
Hopefully we can explore these in the future.
