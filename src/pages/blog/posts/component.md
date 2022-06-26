# Components

What is a component?
A component is a set of markup associated
with a specific set of behaviors --
incuding everyghing from mouse clicks to visusal representation.
They are an essential part of declarative programming.

## HTML

## HTML Components

## CSS

### CSS Modules

### CSS MODELS

## Native Dom Components

### JSX

### Attribute Based

- HTMX

# Component Inheritence

This is Part 1 in a series.
We learn what it takes to create a framework
in which we build components using
clean and uncomplied styles along with organized and meanigful markup.

Inheritance is a useful concept.
It allows programmers to streamline the way in which they
design objects by reusing code.

In this article, we take a look at how inheritance works
through the eyes of a JavaScript programmer
and understand how it applies when applying CSS.

## Normalize and Reset

While they mostly work the same,
different apply some browser-based styles
to each page.
For consistency,
it is always a good idea to use a [normalize]()
any time you work with CSS.

We separate concerns -- meaning and style --
by handing each with HTML and CSS respectively.
We go beyond using a normalize and use a [reset]()
to strip **all** styles associated with the HTML.

## Type: Classical Inheritence

A _class_ is a basic object that acts as a blueprint
to crete other objects.

In javascript we create a class with a number of
property definitions[^1].

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

In a way, _selectors_ in CSS behave like classes.

```css
section {
  background-color: var(--color, red);
}
```

### Instantiation and application

Most languages use the "new" keyword to create
an "instance" of the class.
This is an object with the properties defined by the class.

```javascript
const house = new Class("red"); // "house" is like the actual house
console.log(house.getColor()); // logs "red"
house.paint("blue");
console.log(house.getColor()); // logs "blue"
```

Rather than creating a new object,
properties defined by a selector are
automatically applied to HTML elements
that they match.

```html
<section>This has a red background</section>
<section style="--color:blue">This has a blue background</section>
```

### Extension

Classes can be "extended".

```javascript
class BigRedHouse extends House class {
  constructor() {
    super("red");
    this.isBig === true
  }
}
```

Property definitons from the original class
are included in the new class.
We say the properties are "inherited".

```javascript
const bigRedHouse = new BigRedHouse();
console.log(bigRedHouse.getColor()); // logs "red"
console.log(bigRedHouse.isBig); // logs "true"
```

Some CSS preprocessors use a similar
[concept of extension](https://sass-lang.com/documentation/at-rules/extend),
This is not a feature of uncompiled CSS,
so we will find another way.

We can simulate this by defining and applying
another typer of selector, a CSS class.
(To avoid ambiguity, I always refer to the selector
as a "CSS class".)

Placing two selectors together (with no space between)
creates a new selector.
Both selectors much match an element to be applied.

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

Chains of objects can inherit from eachother.

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

## Type: Mixins

Mixins are a way to give an object with properties directly.
They are less formal and there is not sanctioned syntax
in javascript.

We can use `Object.assign` to give an object properties.

```javascript
const collegeStudent = {
  canRead:true;
}
const surgeon = {
  preformSurgery(){
    return Math.random() > 0.9 "success" : "...";
  }
}

const person = new Person();
Object.assign(person, surgeon, collegeStudent);
console.log(person.canRead); // logs "true"
console.log(person.preformSurgery()); // logs "success" (I hope)
```

Notice that with mixins, an object can inherit from multiple objects
without them having to inherit from one another.

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

We used the selectors together forming a heirchy,
but we could have split them apart.
This would allow them to apply to additional
elements outside of said heirachy, in additon to the ones we defined

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
<section class="fancy_blue">This has a blue background and italicized, but regular sized text.</div>
```

Defining CSS selectors separately
allows properties associated
with multiple to be mixed in
to an HTML element.

## Prototypal

With prototypal inheritance,
we creaete a new object referencing another object --
a "prototype".
We give the new object properties.
When we attempt to access properties on the new object,
if they do not exist; the request is proxied to the prototype.
Objects that exist on on object's prototype, but not on the object itself,
are considered "inherited".

In javascript, we use object `Object.create` to create an object,
with another object as it's prototype.

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

When not defined by a selector targeting an element,
some CSS properties assume a default value.
Others take on the value of their parent.

It's not completely intuitive to figure out which
properties are inherited.
Checkout [this stackoverflow answer](https://stackoverflow.com/a/5612360/1290781)
for guidance.

In this case elements inherit properties from thier parent elements.

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

Once cleard of initial styles, HTML elements can be applied

    1. via style selector or directly
    2. via

## Problems

A lot of problems stem from misunderstanings of
css specificity and inheritence.

Mental tree model for inhheritne and spefificity
Create components in increating specificity.
Use BEM for sub components?
From what I know about rocket science, it's honestly a bit harder
Rocket science isn't actually that difficult onve

When a class extends another class,
it's said to inherit the

We'' learn more about specificity
and how you can structure your style sheets
to avoid shooing yousself in the foot.

## Footnotes

[^1]:
    not "properties",
    though we often use these interchangeably
    when dealing whit chasses)
