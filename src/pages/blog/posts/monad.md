# Monad

## Secnario

Jimmy has a small blog wher he writes about nature.

Each `post` in his blog is a simple stirng.

```javascript
post[0] = `# A dae in the life ...`;
post[2] = `# Once upon a place ...`;
...
```

He has set up a some functions that allow him run with his blog.

One of these functions is `spellcheck`. It takes `post` and returns the first mispelled word. If there are no mispelled words, it returns the empty string, `""`.

```javascript
spellcheck(post[0]); // returns `"dae"`
spellcheck(post[2]); // returns `""`
```

Another of these functions is `border`. It takes a `post` and puts a cool border around it.

```javascript
border(post[0]) = `
╔════════════  ═════════╗
 # A dae in the life ...
╚════════════  ═════════╝`;
```

Jimmy has decided to take on Kate and Leo as co-authors of his blog. Unfortunately, using the current system, the strings lack author information.

Kate thinks they can fix this by creating a new type, `authored post`, that references a regular post plus an array to represent authors.

```typescript
type authoredPost = {
  post: string;
  authors: string[];
};
```

Now; when Jimmy, Kate, or Leo create a blog post, they can
be sure to add an author.

```javascript
const newPost = {
  post: "# Welcome new Co-Authors",
  authors: ["Jimmy"],
};
```

What about the post that already exists? Kate has come up with a simple function that "upgrades" a post into an `authored post`.

```javascript
const upgradePost = (post: string): authoredPost => {
  return {
    post,
    authors: [],
  };
};

for (let i = 0; i < post.length; i++) {
  post[i] = upgradePost(post[i]);
}
```

`Authored posts` have functionality not present in regular posts.
Namey, the ability to have an autor added.

```javascript
const addAuthorJimmy = (post) => ({
  post,
  authors: [...authors, "Jimmy"],
});
```

```javascript
blog[0] = addAuthorJimmy(blog[0]);
blog[1] = addAuthorJimmy(blog[1]);
```

Remember that Jimmy's blog has a number of functions to manage it, including `spellcheck` and `border`?

Jimmy worries that he'll have to re-write all of these functions. This time, Leo has an idea.

Rather than individually constructing a special "authored" editon of each function (`spellcheckAuthored`, `borderAuthored`, etc.), he wants to create a single new function that takes a _transformation_ between `posts` and converts it into a transformation between `authored posts`.

new function that takes an `authored post` and returns a new `authored post`.

```javascript
const convertAuthored = (postFunc) => {
  (authoredPost) => {
    const { post } = authoredPost;
    return upgrade(postFunc(post));
  };
};
const spellcheckAuthored = convertAuthored(spellcheck);
```

Now, Jimmy can use `spellcheckAuthored` to check the spelling of new blogposts.

## What is a monad?

The scenario above is an example of a monad.

A monad is a way to give additional functioality to a group of things, while preserving functionality of the original group.

We construct a monad by:

- first defining a type (call it **a**) that represents our original group of things. This was the `post` in the example above.

- We then define a type (calle it **Ma**) that represents a new group,
  where these members are like those of "a", but wrapped with additional functionality. This was `authored post` in the example above.

- We then define a way (call this **unit**) to transform a member of **a** into a member of **Ma**. This was the `upgrade` function in the example above.

- Finally, we define a way (call this **bind**) to convert any function that maps a member of **a** to **a** into a function that maps **Ma** to **Ma**. This was the `convert` function in the example above.

Having defined all **a**, **Ma**, **unit**, and **bind**, we see that the secnario above formally represents a monad.

## Monad Factory

We can create generic monads to better study them.

We'll simplify things by chosing **a** to be the set of numbers (representable in Javascript).

As a mapping function between **a** and **a** , we choose:

```javascript
// type a = Numbers
// f: a → a
// f: x ↦ x+1
const f = (x) => x + 1;
```

Although **a**, **Ma** are necessary to represent a monad, they are usually implied by **unit** and **bind**.

As such, all we need to define a mondad as an object is to create an object with methods represeting **unit** and **bind**.

Below we creat a function that when passed a unit and a bind function,
returns and object with them attached as methods.

```javascript
const makeMonad = (unit, bind) => ({
  unit(...args) {
    return unit(...args);
  },
  bind(...args) {
    return bind(...args);
  },
});
```

### Identity Monad

We can pass the identity function as both unit and the bind into makeMonad to create the identity monad.

```javascript
const identityMonad = makeMonad(
  (x) => x,
  (x) => x
);
const one = monad.unit(1);
// plusOne : a ↦ a + 1
const plusOne = monad.bind(f);
console.log(plusOne(one)); // 2
```

Note that no addional functionaly is provided by the identity monad.

### List Monad

```javascript
const monad = makeMonad(
  (x) => [x],
  (f) => (x) => [f(x[0])]
);
const one = monad.unit(1);
// plusOne : [a] ↦ [a + 1]
const plusOne = monad.bind(f);
console.log(plusOne(one)); // [2]
```

Additional functions for working with list exist as part of the definition of the List type.

```javascript
const ListMethods = {
  concat(x, y) {
    return [...x, ...y];
  },
  intersect(x, y) {
    return x.filter((x) => y.includes(x));
  },
};
console.log(ListMethods.concat(array.unit(4), altArray.atom(5)));
console.log(ListMethods.intersect(array.unit(4), altArray.unit(5)));
console.log(
  ListMethods.intersect(
    ListMethods.concat(monad.unit(4), monad.unit(5)),
    ListMethods.concat(monad.unit(5), monad.unit(6))
  )
);
```

### Log Monad

```javascript
const monad = makeMonad(
  (x) => ({ value: x, logs: [] }),
  (f) => (x) => ({ value: f(x.value), logs: x.logs })
);
const one = monad.unit(1);
// plusOne : {value:a, logs:[]} ↦ {value:a+1, logs:[]}
const plusOne = monad.bind(f);
console.log(plusOne(one)); // {value:2, logs:[]}
```

Additional functions for working with logs exist as part of the definition of the Log type.

```javascript
const LogMethods = {
  add(...args) {
    return {
    value: args.reduce((p, c) => p + c.value, 0),
    logs: [
    ...args
    .map((x) => x.logs)
    .flat()
    .reverse(),
    args.map((x) => x.value).join(" added to "),
    ],
    };
  },
  multiply(...args) {
    return {
    value: args.reduce((p, c) => p \* c.value, 1),
    logs: [...args.map((x) => x.logs).reverse().flat(),
      args.map((x) => x.value).join(" multiplied by "),],
    };
  },
};
console.log(LogMethods.add(monad.unit(4), monad.unit(5)));
console.log(LogMethods.multiply(monad.unit(4), monad.unit(5)));
console.log(LogMethods.multiply(
  LogMethods.add(monad.unit(3), monad.unit(5)),
  monad.unit(4)
)
);
```

### Maybe Monad

```javascript
const monad = makeMonad(
  (x) => ({ value: x, null: false }),
  (f) => (x) => ({ value: f(x.value), null: false })
);
const one = monad.unit(1);
// plusOne : {value:a, null:false} ↦ {value:a+1, null:true}
const plusOne = monad.bind(f);
console.log(plusOne(one)); // {value:2, null:false}
```

```javascript
const MaybeMethods = {
  divide(x, y) {
    if (x.null || y.null) {
      return { null: true };
    }
    if (y.value === 0) {
      return { null: true };
    }
    return { value: x.value / y.value, null: false };
  },
  subtract(x, y) {
    if (x.null || y.null) {
      return { null: true };
    }
    return { value: x.value - y.value, null: false };
  },
};
console.log(MaybeMethods.divide(monad.unit(4), monad.unit(2)));
console.log(MaybeMethods.subtract(monad.unit(4), monad.unit(0)));
console.log(
  MaybeMethods.divide(
    monad.unit(4),
    MaybeMethods.subtract(monad.unit(2), monad.unit(2))
  )
);
```

## Inveresion

Monads may have a strict formal definition,
but their usage is such that their.

This is similar to the previous 'makeMonad' function -- we use a similar 'unit' function, but replace the 'bind' function with a function called 'deunit' that takes a value from **Ma** and converts into a value from **a**.

```javascript
const createMonad = (unit = (x) => x, deunit = (x) => x) => ({
  promote,
  deunit,
});
```

We then create function, bindToMonad that takes our monad object, and creates **bind** from it.

```javascript
const bindFromMonad = (monad) => (func) => (arg) => {
  const promote = monad?.promote || ((x) => x);
  const demote = monad?.demote || ((x) => x);
  return promote(func(demote(arg)));
};
```

Using these functions together,
we create a slightly more complicated monad factory.

```javascript
const identity = createMonad();
const bindToIdentity = bindFromMonad(identity);
const one = identity.unit(1);
const plusOne = bindToIdentity(f);
console.log(plusOne(1)); // 2
```

We can modify the "bindFromMonad" function to use a function's context object (this) rather than an explicitly passed one.

```javascript
const monadBindable = (func) =>
  function (...args) {
    const promote = this?.promote || ((x) => x);
    const demote = this?.demote || ((x) => x);
    // return promote(func(demote(...args)));
    return promote(...args.map(demote).map(func));
  };
```

This creates a function that is generically "bindable" monads created in the way described above.

```javascript
const F = monadBindable(f);
const identity = createMonad();
const plusOne = F.bind(identity);
const one = identity.unit(1);
console.log(plusOne(1)); // 2
```

This methods works for other monads as well,
but ensure that you use a "deunit" in place of a "bind" function.

### List Monad

```javascript
const list = createMonad(
  (x) => [x],
  (x) => x[0]
);
const plusOne = F.bind(list);
const one = list.unit(1);
console.log(plusOne(1)); // 2
```

### Log Monad

```javascript
const log = createMonad(
  (x) => ({ value: x, logs: [] }),
  (x) => x.value
);
const plusOne = F.bind(log);
const one = log.unit(1);
console.log(plusOne(1)); // {value:2, logs:[]}
```

### Maybe Monad

```javascript
const maybe = createMonad(
  (x) => ({ value: x, null: false }),
  (x) => x.value
);
const plusOne = F.bind(maybe);
const one = maybe.unit(1);
console.log(plusOne(1)); // {value:2, null:false}
```

```javascript
const monad = makeMonad(
  (x) => ({ value: x, null: false }),
  (f) => (x) => ({ value: f(x.value), null: false })
);
const one = monad.unit(1);
const plusOne = monad.bind(f);
console.log(plusOne(one)); // {value:2, null:false}
```
