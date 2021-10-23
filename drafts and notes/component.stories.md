---
title: "Component Theory"
description: ""
publishDate: ""
author: "John"
layout: "../../layouts/blogpost.astro"
---

# Component Theory

A component is a piece of markup that represents combinations (technically permutations)
of other pieces of markup.
It can be repeated throughout multiple documents
as a means of following DRY (Don't repeat yourself) principles.
Also implicit within components are associated _styles_ and _behaviors_.

Modern browsers provide two "first-class" methods of defining components:
[CSS Classes](#css-classes) and [Web Components](#web-components).

We will explore the options that each approach provides and how we can use them to create clean, maintainable, extensible code.

We'll also touch on a number of other frameworks that accomplish similar tasks and understand when we would want to use them.

## CSS Classes

Cascading Style Sheets (CSS) is a language used to define the appearance, or "style", of an associated element.

```html
<!-- file://./index.html -->
<div style="color:red">1st component</div>
<div style="color:black">2nd component</div>
<div style="color:red">3rd component</div>
```

If we try to get too fancy by stying elements directly, things may get a bit crazy...

```html
<!-- file://./index.html -->
<div
  style="color:red;
  font-weight:bold;
  font-style:italic;"
>
  1st component
</div>
<div
  style="color:black;
    font-weight:bold;
    font-style:italic;
    text-decoration:
    underline;font-size:100px;"
>
  2nd component
</div>
<div
  style="
  color:red;
  text-decoration:underline;
  font-size:100px"
>
  3rd component
</div>
```

Using a class name as a "hook" within a HTML element,
one can define a style externally and apply it to an element:

```css
/* file://./index.css */
.red {
  color: red;
}
.black {
  color: black;
}
.fancy {
  font-weight: bold;
  font-style: italic;
}
.crazy {
  text-decoration: underline;
  font-size: 100px;
}
```

```html
<!-- file://./index.html -->
<link rel="stylesheet" href="./index.css" />
<div class="red fancy">1st component</div>
<div class="black fancy crazy">2nd component</div>
<div class="red crazy">3rd component</div>
```

In this case, the classes -- "red", "black", "fancy", and "crazy" -- are all `components`.

### Composability and Pitfalls

CSS classes are convenient as components because they are composable. Unfortunately, composability has a few negative consequences:

- It's often not intuitive to understand how styles compose
  and override eachother throughout a document.
  This can lead to confusion and fustration,
  especially for those new to CSS.
- Even if one does have a perfect understanding of how to read and write CSS,
  they may working on an application that uses stylesheets that they cannot control.

### Associating behaviors

Some CSS psuedo-elements (e.g :hover, :focus, :active, etc.)
can be used to associate behaviors componentes, but they are extremeley limited.

In addition to providing a hook for CSS to associate styles,
class selectors can be used to associate behaviors as well.

```javascript
for (const component of globalThis.document.querySelectorAll(".component")) {
  // associate some behavior with component
}
```

```js
globalThis.addEventListener("click", (event) => {
  if (event.target.classList.contains(("component")) {
    // respond to event emitted by component
  }
});
```

Because components are composable, it's easy (and a good idea)
to separate components that control behaviro from components that associate style.

### Class Taxonomy

It's hard to put a rhyme or reason behind naming class components.

I like to take inspiration for organism taxonomy in whch
the "genus" describes an arrangement of HTML elements,
and the "species" describes a particular style applied to those elements.

For instance, the genus "Listio" might describe an element
that contains a generic list of items.
The species "all-startus" might describe an arrangement
where all the elements in said list are pulled to the start.
Conversely, the species "all-eudus" might describe an arrangement
where all the elements are pulled to the end.

```css
/* file://.index.css */

.Listio {
  display: flex;
}
.Listio.Listio--all-startus {
}
.Listio.Listio--all-endus {
}
```

```html
<!-- file://./index.html -->
<link rel="stylesheet" href="./index.css" />
<div class="Listio Listio--all-startus">
  <span>pulled</span>
  <span>to</span>
  <span>start</span>
  <span></span>
</div>
<div class="Listio Listio--all-endus">
  <span></span>
  <span>pulled</span>
  <span>to</span>
  <span>end</span>
</div>
```

```css
/* file://.index.css */

.Cardio {
  border: 1px solid black;
  display: inline-block;
  background-color: white;
  min-width: 100px;
  min-height: 100px;
  position: relative;
}

.Cardio.Cardio--tallus {
  display: flex;
  min-height: 200px;
}
.Cardio.Cardio--wideus {
  display: flex;
  min-width: 200px;
}
```

```html
<div class="Cardio Cardio--wideus">
  <img class="background" />
  <div class="content">I am Wide</div>
  <header>Wideus</header>
</div>

<div class="Cardio Cardio--wideus">
  <img class="background" />
  <div class="content">I am Tall</div>
  <header>Tallus</header>
  <footer>(enough room for a footer)</footer>
</div>
```

## Web Components

### Associating styles

### Associating behaviors

## Frameworks

https://github.com/css-modules/css-modules
https://css-tricks.com/css-modules-part-1-need/
Styling by class attribute is a "first-class" feature of css.

### React

### Vue

### Astro
