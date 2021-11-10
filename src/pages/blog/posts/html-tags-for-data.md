---
title: "HTML Tags for Data"
description: "The first in a series on how to use Angular 1.0"
author: "John Henry"
heroImage: "/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg"
alt: "Astro"
layout: "../../../components/BlogPage.astro"
tags: ["programming", "semantics"]
---

As web developers,
we often ignore the semantics of HTML tags.
We arbitrarily interchange divs, spans, and sections
as generic containers.
We might follow up an h3 tag with a few h1s
to achieve a desired style.

It's great that we can do this on the web
without having our browsers throw errors like
`<div> in <li> *not allowed*. aborting render. upsetting user.`;
but when displaying data in documents, it may be useful

## Collections: ul + li

Sets

## Ordered Collections: ol + li

Arrays, Vectors

## Typed Collections: table + tr,(th?),td

Typed Array, Matrix,

## Key-Value Pairs: dl+dt,dd

Maps, Dictionaries, Generic Objects

## Linked List, Tree : a | details + summary

This is probably going to seem crazy when compared
to the other items, but you will likely find it intuitive.

The idean of "linking" objets exists
in most languages, though it may not be a
first-class concept.

For instance, in JavaScript you can "link"
two objects by giving one a reference
to the other.

```javascript
const objectA = {};
const objectB = {};
a["b"] = objectB;
// b is now linked to a
// as it can be rererenced
// via
```
