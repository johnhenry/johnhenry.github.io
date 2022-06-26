---
title: "Cascading Document Type Definitions"
description: "An introduction to CDTDs"
date: "18 June 2022"
author: "John Henry"
heroImage: "/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg"
alt: "Astro"
layout: "../../../components/BlogPage.astro"
tags: ["programming", "experimenting"]
---

(or "To DTD or not To DTD, Why do we ask thes questions?" )

As a web developer,
I would like a way to validate
the structure of HTML files and components
against some standard.
DTDs fail to address this problem due to lack of support in the ecosystem.
Rather than addressing DTD's shortcomings,
I've created a new language using a famaliar syntax.

### What are DTDs

DTDs or [Document Type Definition](https://en.wikipedia.org/wiki/Document_type_definition)s are a way to define a structure for HTML and XML documents. You may have already seen them used by browsers to define HTML documents:

```html
<!DOCTYPE html>
<html>
  ...
</html>
```

They can be used to define partial HTML documents as well.
Either inline:

```html
<!DOCTYPE ul [ <!ELEMENT ul (li)>
<!ATTLIST ul class CDATA "list">
<!ELEMENT li (#PCDATA)>
]>
<ul class="list">
  <li></li>
</ul>
```

or as a separate file

file://list.dtd

```
<!DOCTYPE ul [
<!ELEMENT ul (li)>
<!ATTLIST ul class CDATA "list">
<!ELEMENT li (#PCDATA)>
]>
```

file://list.html

```html
<ul class="list">
  <li></li>
</ul>
```

### The Problem with DTDs

There isn't simply a _good_ way to validate DTDs in _modern_ workflows.

The only solutions that I could find includes either:

- connecting to a webservice -- either directly or usign a cli;
- or having java installed somewhere on your machine.

Neither of these fit into the workflow of a modern web developer.

### The Solution: CDTDs

My initial goal was to create valadator
that would turn a DTD into a series of CSS queries.
These would then be used to validate an HTML string.

It became apparent that with a few tweeks,
I could use the queries themselves.

Developers can use [Cascading Document Type Definitions](https://github.com/johnhenry/cdtd) to validate HTML documents using pre-defined schema.

The language is basically [Nested CSS](https://www.w3.org/TR/css-nesting-1/), but without attributes.

I've created a [package](https://www.npmjs.com/package/cdtd)
that includes a CLI tool to both:

- validates an HTML based on a given CDTD
- generates CSS or HTML from a given CDTD

This is still very much a work in progress. The way this works may occasionally seem counter intuitive. There are still questions as to how this _should_ work.

Let me know what you think. Pull requests are welcome!
