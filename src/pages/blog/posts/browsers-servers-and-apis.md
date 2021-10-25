---
title: "Browsers, Servers, and APIs"
description: "Using servers in the browsers"
date: "1 May 2019"
lastUpdate: "1 May 2019"
author: "John Henry"
heroImage: "/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg"
alt: "Astro"
layout: "../../../components/BlogPage.astro"
tags: ["programming"]
---

_Originally Published: https://medium.com/@iamjohnhenry/browsers-servers-and-apis-2f7b10523f39_

(Or “The path to Isomorphic Javascript”)

Note: Examples in the article were tested and run using [node](https://nodejs.org/en/) and [browserify](http://browserify.org/).

If you’re a modern JavaScript enthusiast, you’re familiar with isomorphic code — the idea that you can write code that will run in both browser and node environments. Because JavaScript is a standardized language, you might think that this would be a trivial matter. The problem comes not in the language itself, but in the [API](https://en.wikipedia.org/wiki/Application_programming_interface)s, which are specific to each environment and not standardized to play well with others.

Some actions in one environment do not make sense in the other and so they lack specific APIs. The browser isn’t given access to the file system, so the [fs object](https://nodejs.org/api/fs.html) that comes with node would not make sense here. Conversely, when I was younger, I would make copious use of the [window.alert](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) for debugging, but a popup window won’t show up when you’re looking at a command line.

There are some actions, however, that can be done both within node and within the browser. One of the most interesting is creating servers.

## **Standardizing Servers**

Traditionally you wouldn’t set up a server within a browser, but considering what a server does — accepts requests and responds asynchronously, we can think of many use cases.

For instance, a server within a service worker would be able to intercept and respond to requests within the browser, without ever having to make a call across a network.

```javascript
    //example -- service worker
    const server = …;//define later

    self.addEventListener(‘fetch’, function(event) {
     return event.respondWith(new Promise((resolve, reject)=>{
       const response = server.respondTo(event.request);
       response.on(“finish”, ()=>{
         resolve(req);
       });
     }));
    });
```

We’ll come back to this idea...

## **Competing Standards**

So, I want to put a server in the browser — what are my options? Not long ago, I learned about the new [FlyWeb](https://hacks.mozilla.org/2016/09/flyweb-pure-web-cross-device-interaction/) standard that [Mozilla](https://blog.mozilla.org/) is pushing for creating servers within the browser. I was pretty excited until i realized how different it was from anything that already existed in node.

Every other server that I’ve seen follows a particular pattern…

### **HTTP**

Node already has a built in simple API for creating servers via [http](https://nodejs.org/api/http.html).

```javascript
    //example -- http
    //create server and define action
    const server = require(“http”)
     .createServer((request, response)=>{
      ...//process request
      response.end();//end response
    });

    //start server
    server.listen(/*listening address*/);
```

This might be considered a standard, but many modern server applications are built to handle complex workflows.

### **Express**

As the http module is quite simplistic, the [express](https://github.com/expressjs/express) module is the de-facto standard for creating servers within node. It separates creating the server from assigning it actions. It also makes handling complex workflows easier. Express servers have a “use” method. It allows the user to chain together multiple functions to act upon a request before a response is sent. These functions are called “middleware”.

```javascript
    //example -- express

    //create server
    const server = require(“express”)();

    //register middleware
    server.use((request, response, next)=>{
      ...//process request
      next();//go to next middleware
    });

    //register middleware
    server.use((request, response, next)=>{
      ...//process request
      if(request.endResponse){
        response.end();//end response
      }else{
        next();//go to next middleware
      }
    });

    //register middleware
    server.use((request, response)=>{
      response.end();//end response
    });

    //start server
    server.listen(/*listening address*/);
```

In addition, express adds additional features such as templating or routing which you may or may not need.

### **Koa 2**

[Koa](https://github.com/koajs/koa) was created by the same people who create express and is considered to be its spiritual successor. It’s also my server of choice, so you should [take a look at how it works](http://koajs.com/) if you haven’t already.

Koa makes use of [asynchronous functions](https://github.com/tc39/ecmascript-asyncawait) and adding middleware works similarly.

```javascript
    //example -- koa

    const server = require(“koa”)();

    server.use(async (context, next)=>{
      ...//process request
      next();//go to next middleware
    });

    server.use((context, next)=>{
      context.res.end();//end response
    });

    //start server
    server.listen(/*listening address*/);
```

Koa also eschews built in routing and templating in favor of including them externally as middleware.

Please be aware that Koa 2 is still in alpha, but since its API is so much cleaner than Koa 1’s, [here’s a tutorial that will help you jump right in](https://www.smashingmagazine.com/2016/08/getting-started-koa-2-async-functions/),

### **Rill**

[Rill](https://github.com/rill-js/rill) is a [new server](https://medium.com/@pierceydylan/isomorphic-javascript-it-just-has-to-work-b9da5b0c8035#.l79bgqqwx) that has basically the same API as KOA 2, but works in the browser as well as in node right out of the box.

```javascript
    //example -- rill

    const server = require(“rill”)();

    server.use((context, next)=>{
      context.res.end();//end response
    });

    server.listen(/*listening address*/);
```

Rill may be overkill for my purposes, as it includes routing features that manipulate the web page, in addition to simply processing requests into responses.

### **FlyWeb**

There’s a basic pattern of that all of the other servers follow.

1 create server

2 add actions

3 start server

While rill or koa would have been a great starting point for a server in the browser, mozilla has taken a different route with their new FlyWeb servers.

```javascript
    //example -- flyweb

    //create and start server
    const server = await window.navigator.publishServer(/*listening address*/);

    //add actions
    server.onfetch = (request)=>{
      ...//process request
      request.end();//end response
    };
```

This breaks the pattern of everything we’ve seen so far! Here the server is created and started first. Only afterwards are actions actions added.

Do we really need an entirely new way of doing basically the same thing?

![I know. It’s in every article. Perhaps that says something to the importance of the situation. [https://xkcd.com/license.html](https://xkcd.com/license.html)](https://cdn-images-1.medium.com/max/2000/1*9nMBMt-OugnruBr_M-WuEQ.png)_I know. It’s in every article. Perhaps that says something to the importance of the situation. [https://xkcd.com/license.html](https://xkcd.com/license.html)_

## **@Rill/http to the Rescue**

[The creators of rill are](https://medium.com/@pierceydylan/) pretty smart. When they created rill to work in the browser and in node, they realized the same thing I did at the beginning of this article — that dissimilar APIs are what make isomorphic code so difficult. So, to ensure that it works in both places, they created their own implementation of node’s low level [http module](https://nodejs.org/api/http.html), [@rill/http](https://github.com/rill-js/http), that works in the browser. Because it follows the same API, it can be, with a few tweaks, swapped into other modules that depend upon http, and allow them to work in the browser.

And that’s exactly what I’ve done with [koa-2-browser](https://github.com/johnhenry/koa-2-browser). It’s literally koa that works in the browser! It’s a light framework, so it integrates easily with other code. And because the changes are relatively minor, I’m working on landing these changes in an upcoming release of Koa as to make it an isomorphic application out of the box. For now, you can take [nearly] all code that you wrote for a koa server in node, and transfer it to the browser.

Revisiting the service worker example above, we have:

```javascript
    //example -- koa-2-browser
    const server = require(‘koa-2-browser’)();
    server.use(/*middleware*/);
    server.listen(()=>{

    self.onfetch(function(event) {
        return event.respondWith(new Promise((resolve, reject)=>{
          const response = server.respondTo(event.request,{browserResponse:true});
          response.on(“finish”, (res)=>{
            resolve(res);
          });
        }));
      });

    });

    /*
    Note: server.RespondTo returns a response object
    (here identified as "response")
    that is not a suitable resolution
    for the promise passed to event.respond with.
    Passing the "browserResponse:true" option
    will cause the "finish" event to be resolved
    with a suitable instance of window.Response
    (identified as "res").
    */
```

It’s important to realize that if we ever want to move towards isomorphic JavaScript, we should really shy away from competing standards within the language itself.

And this is true for open source software as a whole; if two different APIs do the same thing, they should have the same structure. When we set out to create something new, we should pay attention to and work with others who are already doing similar things in other environments. The less time we spend re-inventing the wheel, the more time we have to invent new and exciting stuff (hover-wheel anyone?).

## Et tu, Buffer?

Servers aren’t the only competing standards across environments.

[\*\*Buffers](https://nodejs.org/api/buffer.html)** are standardized in node and [**ArrayBuffers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\*\* are standardized in the browser. They are both containers for binary data, but they work slightly differently. This is particularly annoying when attempting to create isomorphic applications. Even worse, some objects that have a “buffer” method, may return an ArrayBuffer instead, meaning that you may have to apply special logic to work with them in different environments.

After many revisions, [\*\*Streams](https://nodejs.org/api/stream.html)** are close to full standardization in node. Unfortunately, [**Browser Streams](https://streams.spec.whatwg.org/)\*\*, an emerging standard, introduce new and incompatible parts of the API. Hopefully, the groups involved can come to an agreement at some point.

There are some other similar topics like **importing modules**, but that situation is way more complicated to go into her.

## Bonus Library!!!

But trying new things is fun! I actually prefer the [way that FlyWeb creates servers](https://github.com/flyweb/spec). Since it [it appears that I’m not the only one](https://github.com/koajs/koa/issues/482), I’ve created another library, [flyweb-koa](https://github.com/johnhenry/flyweb-koa). It allows you to use koa in a manner similar to the FlyWeb, while maintaining everything that koa has to offer.

```javascript
    const koa = require(“koa-2-browser”);
    //This also works with koa;

    const publishServer = require(‘flyweb-koa’)(‘koa’);

    const server = await publishServer(/*listening address*/);
    server.use(/*middleware*/);
    server.onfetch = (context)=>{
    ...
    };
    server.respondTo(/*request*/);
```
