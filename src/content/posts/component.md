---
title: "CSS Inheritance for JavaScript Programmers"
description: "Classical inheritance, mixins, and prototypal inheritance in JavaScript, and what each one teaches us about how CSS inheritance and specificity actually work."
date: "3 July 2026"
author: "John Henry"
heroImage: "/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg"
alt: "Astro"
layout: "../../../components/BlogPage.astro"
tags: ["programming", "experimenting"]
---

Inheritance is a useful concept. It lets programmers streamline the way they
design objects by reusing code. In this article, we look at how inheritance
works through the eyes of a JavaScript programmer, and use that lens to
understand how CSS inheritance and specificity work.

## Normalize and Reset

Before any of this matters, it helps to start from the same baseline in
every browser. Different browsers apply different default styles to the
same elements, so it's always a good idea to use a
[normalize](https://necolas.github.io/normalize.css/) stylesheet any time
you work with CSS.

We separate concerns — meaning and style — by handling each with HTML and
CSS respectively. We go a step further than a normalize and use a
[reset](https://meyerweb.com/eric/tools/css/reset/) to strip **all** styles
associated with the HTML, so everything that follows is explicit and
intentional.

## Classical Inheritance

A _class_ is a basic object that acts as a blueprint for creating other
objects. In JavaScript, we create a class with a number of property
definitions[^1]:

```javascript
const House = class {
  // "House" is like a blueprint for an actual house
  constructor(color = "red") {
    this.color = color;
  }
  paint(color) {
    this.color = color;
  }
  getColor() {
    return this.color;
  }
};
```

In a way, _selectors_ in CSS behave like classes:

```css
section {
  background-color: var(--color, red);
}
```

### Instantiation and application

Most languages use the `new` keyword to create an "instance" of a class —
an object with the properties defined by the class:

```javascript
const house = new House("red"); // "house" is like the actual house
console.log(house.getColor()); // logs "red"
house.paint("blue");
console.log(house.getColor()); // logs "blue"
```

Rather than creating a new object, properties defined by a selector are
automatically applied to every HTML element that matches it:

```html
<section>This has a red background</section>
<section style="--color:blue">This has a blue background</section>
```

### Extension

Classes can be "extended":

```javascript
class BigRedHouse extends House {
  constructor() {
    super("red");
    this.isBig = true;
  }
}
```

Property definitions from the original class are included in the new
class. We say the properties are "inherited":

```javascript
const bigRedHouse = new BigRedHouse();
console.log(bigRedHouse.getColor()); // logs "red"
console.log(bigRedHouse.isBig); // logs "true"
```

Some CSS preprocessors have a similar
[concept of extension](https://sass-lang.com/documentation/at-rules/extend).
That isn't a feature of plain, uncompiled CSS, so we find another way: we
simulate it by defining and applying another type of selector, a CSS
class. (To avoid ambiguity, I always refer to this kind of selector as a
"CSS class".)

Placing two selectors together, with no space between them, creates a new
selector. Both selectors must match an element for it to apply:

```css
section {
  background-color: red;
}

section.big {
  font-size: 2rem;
}
```

```html
<section>This has a red background</section>
<section class="big">This has a red background and big text.</section>
```

Chains of classes can inherit from each other:

```css
section.big.fancy_blue {
  font-style: italic;
  background-color: blue;
}
```

```html
<section class="big fancy_blue">
  This has a blue background and big italicized text.
</section>
```

## Mixins

Mixins give an object properties directly. They're less formal than
classes, and JavaScript has no dedicated syntax for them — but we can use
`Object.assign` to combine properties from several objects into one:

```javascript
const collegeStudent = {
  canRead: true,
};
const surgeon = {
  performSurgery() {
    return Math.random() > 0.9 ? "success" : "...";
  },
};

const person = {};
Object.assign(person, surgeon, collegeStudent);
console.log(person.canRead); // logs "true"
console.log(person.performSurgery()); // logs "success" (I hope)
```

Notice that with mixins, an object can inherit from multiple objects
without any of those objects inheriting from one another.

Recall the styles and markup from the previous "Extension" section:

```css
section {
  background-color: red;
}

section.big {
  font-size: 2rem;
}
section.big.fancy_blue {
  font-style: italic;
  background-color: blue;
}
```

```html
<section>This has a red background</section>
<section class="big">This has a red background and big text.</section>
<section class="big fancy_blue">
  This has a blue background and big italicized text.
</section>
```

We used those selectors together, forming a hierarchy — but we could just
as easily split them apart. That would let each one apply to additional
elements outside that hierarchy, in addition to the ones we already
defined:

```css
section {
  background-color: red;
}
.big {
  font-size: 2rem;
}
.fancy_blue {
  font-style: italic;
  background-color: blue;
}
```

```html
<section>This has a red background</section>
<section class="big">This has a red background and big text.</section>
<section class="big fancy_blue">
  This has a blue background and big italicized text.
</section>
<div class="big">This has big text, but no background defined.</div>
<section class="fancy_blue">
  This has a blue background and italicized, but regular sized text.
</section>
```

Defining CSS classes separately, like this, lets properties from multiple
classes mix into a single HTML element — the same idea as `Object.assign`,
just expressed through the cascade instead of a function call.

## Prototypal Inheritance

With prototypal inheritance, we create a new object that references
another object — its "prototype" — and give the new object properties of
its own. When we try to access a property on the new object and it
doesn't exist there, the request is proxied to the prototype. Properties
that exist on an object's prototype, but not on the object itself, are
considered "inherited".

In JavaScript, we use `Object.create` to create an object with another
object as its prototype:

```javascript
const John = {
  name: "John",
  age: 30,
  sayName() {
    return this.name;
  },
};

const clone = Object.create(John);
clone.name = "N'Hoj";
clone.isEvil = true;
console.log(John.age); // logs "30"
console.log(clone.age); // logs "30"
console.log(John.sayName()); // logs "John"
console.log(clone.sayName()); // logs "N'Hoj"
console.log(!!John.isEvil); // logs "false"
console.log(!!clone.isEvil); // logs "true"
```

This is the closest analogy to how CSS inheritance actually works. When a
property isn't set directly on an element, some CSS properties fall back
to a default value; others take on the value of their parent element
instead. It's not always intuitive which properties are inherited by
default — check out
[this Stack Overflow answer](https://stackoverflow.com/a/5612360/1290781)
for guidance.

In this case, elements inherit properties from their parent elements:

```css
section {
  color: red;
}
```

```html
<section>
  Text in this section is red as defined.
  <div>Text is here is red because it's inherited from above.</div>
</section>
```

## Summary

Once you've cleared away a browser's default styles, an element's final
appearance comes from three places, and each one maps onto a pattern of
inheritance we just covered:

- **A directly matching selector** — the classical pattern. A chain of
  selectors like `section.big.fancy_blue` behaves like a chain of `extends`:
  each link adds more specific properties on top of the last.
- **Several independent selectors matching at once** — the mixin pattern.
  `.big` and `.fancy_blue` don't know about each other, but both apply to
  the same element, the same way `Object.assign` combines unrelated
  objects.
- **A value inherited from a parent element** — the prototypal pattern.
  Nothing matched the element directly, so the browser walks up to the
  parent, the same way a JavaScript object walks up its prototype chain.

## Specificity

Most of the confusion around CSS comes down to specificity: when more
than one of the rules above could apply, which one wins? As a rule of
thumb, more specific selectors (more classes, IDs, or chained selectors)
beat more general ones, and rules that appear later in the stylesheet win
ties.

A naming convention like [BEM](https://getbem.com/) can help keep
specificity predictable as a component tree grows, since it favors flat,
single-class selectors over long chains that are easy to lose track of.

Thinking in terms of these three patterns — a direct match, a combination
of independent classes, and inheritance from a parent — is what finally
made CSS specificity click for me. I hope it does the same for you.

## Footnotes

[^1]:
    Not strictly "properties" in the CSS sense — we just use the word for
    both, since the concepts are so similar.
