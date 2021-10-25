---
title: "Angular Done Right: Part 1"
description: "The first in a series on how to use Angular 1.0"
date: "1 August 2013"
author: "John Henry"
heroImage: "/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg"
alt: "Astro"
layout: "../../../components/BlogPage.astro"
tags: ["programming"]
---

_Originally Published: https://medium.com/@iamjohnhenry/angular-done-right-part-1-binding-and-directives-6112a43aa1dc_

Author’s Note: While I no longer program heavily using angular, in favor of using smaller, more modular libraries, the reader will find the ideas presented in this series useful.

Angular is hard, right?

Well, one thing that’s for sure is that Angular is a massive. It’s a full application framework made of components including directives, controllers, services, and much much more. It’s shrouded in strange new concepts such as “_Dependency Injection_” and “_Transclausion_”. Despite it’s overall allure, anyone creating an angular app for the first time must accept that he or she is in for a steep learning curve due before being able to build anything fun or useful.

That’s the approach that most tutorials on the web take. In this series we take different approach. We’ll gradually build upon the most basic concepts in angular; first introducing the bare minimum needed to build an application and building upon it as we go along.

### Installing Angular

We’ll start with a very basic HTML page. Create a basic html page with the following code inside:

```html
<!DOCTYPE html>
<html>
  <body></body>
</html>
```

The next thing that you need to do is to download and include the angular.js file. You can download it directly from the [Angular JS homepage](https://angularjs.org/), or, if you perfer, using the [Bower package manager](http://bower.io/). I won’t go into specifics, on how exactly how to do that, but having made it this far, I doubt that you’ll have any trouble :).

Once you’ve included the angular file in your app, your file should look something like this:

```html
    <!doctype html>
    <html>
     <body>
     <script src=”path/to/angular.js”></script>
     </body>
    </html>
```

### Bootstrapping

**Bootstraping** is a term used for connecting your angular application to the web page. Don’t get it confused with the popular [UI framework](http://getbootstrap.com/).

There are two ways of bootstrapping an application. The easiest and most reliable way is to add the **ng-app \***directive\* to an html element. That element and all of it’s children will be part of your angular app.

“_What are directives?_”, you must be wondering… Well, for now, just think of them as attibues that you can add to your html that let your app interact with angular. We’ll learn more about directives very soon, and in a later part of the series.

We could put it on any element — the **<body>** tag; a **<div>** tag — but lets go ahead and put it on the top level “html” element. This way, the entire page will be available to our application.

```html
    <!doctype html>
    <html ng-app>
     <body>
     <script src=”path/to/angular.js”></script>
     </body>
    </html>
```

There is another way to bootstrap your application (it actually uses the [angular.bootstrap](https://docs.angularjs.org/api/ng/function/angular.bootstrap) method!), but I have found it to be much more error-prone, so I wont at least into that method… at least not today.

### Binding

— ng-model and ng-bind

Now that you’ve set up the application, binding data is the simplest thing that you can do in angular. Try modifying your html to look like this:

```html
    <!doctype html>
    <html ng-app>
     <body >
     <input ng-model=”input”> <span ng-bind=”input”></span>
     <script src=”path/to/angular.js”></script>
     </body>
    </html>
```

You’ve added two new directives. The** ng-model \***directives\* allows you to bind a variable to a standard html element that receives user input. This can be either an input element, a textarea element, or select element. (If you’re familiar with jQuery, this might remind you of the [val](http://api.jquery.com/val/) method.)

The **ng-bind** directive does something similar, but but it works by replacing the inner html of any html element with the bound variable. (If you’re familiar with jQuery, this might remind you of the [html](http://api.jquery.com/html/) method.)

**input** is the name that we have chosen for the name of the variable to be bound, but we could have chosen pretty much anything.

Note: the variables exist within the scope of the application and not on the page. A variable defined within javascript will not be bound. We’ll learn exactly “where” these variables live in a later chapter on controllers and scope.

```html
<script>
  var input = “Sorry, I’m not available for binding.”
</script>
```

You can also use the double curly braces syntax, `“{{input}}”`, instead of **ng-bind** to add binding anywhere without the need for an HTML element:

```html
    <!doctype html>
    <html ng-app>
     <body >
     <input ng-model=”input”><span>{{input}}</span>
     <script src=”path/to/angular.js”></script>
     </body>
    </html>
```

If you open the page in a browser, you will see an empty box, and when you type box, you’ll see that it’s bound to the span right next to it.

This might be useful for, say, a form:

```html
<form>
  Name:<input ng-model="”user.name”" ng-required="”true”" />
  <br />
  Favorite Color:
  <select ng-model="”user.color”">
    <option value="”not" available”>N/A</option>
    <option value="”red”">Red</option>
    <option value="”green”">Green</option>
    <option value="”blue”">Blue</option>
  </select>
  <div style="”background-color:{{user.color}}”"></div>
  <button>Submit</button>
</form>
<p>
  Your name is
  <b ng-bind="”user.name" || ‘Blank’”></b>
  and your favorite color is
  <b ng-bind="”user.color”"></b>.
</p>
```

Notice that the **user.name** and the **user.color** properties are bound to other parts of the form.

You may have spotted the **ng-required** directive on the input tag. That’s prevents a form from being submitted unless the required value is filled out. Try submitting the form below without typing in a name. (Be Warned: This may not work in all browsers.)

It’s also useful to be able to perform calculations on the page. Here’s a simple tip calculator. It a bit off (check out those rounding errors!), but it starts to show you what you can do with an angular app.

```html
    Bill: <input ng-model=”bill”>
    <br/>
    Tip Percentage: <input type=”number” ng-model=”tip”> %
    <br/>
    Total: $<span ng-bind=”(1 + (tip/100) ) * bill”></span>
```

### A Few More Directives

— Showing and Hiding Elements with ng-if, ng-show, ng-hide

Conveniently, attaching the **ng-model** to a checkbox or radio allows you to bind to its **checked** property rather than it’s value.

```html
<input type="”checkbox”" ng-init="”checked" ="true”" ng-model="”checked”" />
<span ng-show="”checked”">The box is checked</span>
<span ng-hide="”checked”">The box is not checked</span>
<span ng-if="”checked”"> :) </span>
```

And we can use this fact to demonstrate a few new directives.

Although I’m not using for it’s single recommended [use case](https://docs.angularjs.org/api/ng/directive/ngInit), the **ng-init**
directive allows you to initialize a variable’s value — otherwise it starts off as empty.

The **ng-if**, **ng-show**, and **ng-hide** directives work to show and hide an element. The difference is that **ng-if** will remove an element from the page, if not visible, while **ng-show** and **ng-hide** will simply hide it.

— Repeating Elements with ng-repeat

A final useful directive is the **ng-repeat** directive that allows one to iterate through collections.

```html
<ul
  ng-init="”beatles"
  ="["
  {name
  :
  ‘John’},
  {name
  :
  ‘Paul’},
  {name
  :
  ‘George’},
  {name
  :
  ‘Ringo’}
  ]”
>
  <li ng-repeat="”beatle" in beatles”>
    <span ng-bind="”$index”"></span>.<span ng-bind="”beatle.name”"></span>
  </li>
</ul>
```

You’ll notice that in addition to the **_beatle_** property, the **ng-repeat **directive also provides a **_$index_** property that can also be bound to the application. This **_$index_ **is equal to the index of the iteration.

— Modifying data with filters

Just for the heck of it, let’s take a sneak preview of filters.

```html
<li ng-repeat="”beatle" in beatles | orderBy:’name’”>
  <span ng-bind="”$index”"></span>.<span ng-bind="”beatle.name”"></span>
</li>
```

**orderBy** may look similar to a directive, but it’s not, it’s a filter. Filters work within certain directives to modify the data within them. This particular one changes the order of items within an array. You can read more about this and other available filters [here](https://docs.angularjs.org/api/ng/filter). Like directives, filters are one of the nine or so components that make up an angular app and can be woven together with the others to make powerful applications.

Filters, like Directives, are one of the core components of angular. And we’ll learn a lot more about them in an upcoming entry.

### Conclusion

With just few basic built built in components, you can start creating interesting apps with barely any code. I’ll be back soon with another update to this series, but in the meantime, start using Angular to make something cool!
