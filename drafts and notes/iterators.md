# Iterators

## Protocol

Any object that follows the iterator protol has a method accessible with a special symbol, Symbol.iterator.

```javascript
const iterator = {
  [Symbol.iterator]{
    /*...*/
  }
};// almost an interator
```

This method must return an iterator object -- an object with a "next method"

```javascript
const iterator = {
  [Symbol.iterator]{
    return {
      next(){
        /*...*/
      }
    }
  }
};// almost an interator
```

The next method must return an object with two keys:
value (optional, any type) - value currently expressed by iterator
done (truthy) - indicates that the iterator has finished

```javascript
const iterator = {
  [Symbol.iterator]{
    return {
      next(){
        return {done:true}
      }
    }
  }
};// an iterator, but not a very creative one
```

```javascript
const iterator2 = {
  [Symbol.iterator]() {
    const values = [0, 1, 2, 3];
    return {
      next() {
        return values.length
          ? { value: this.shift(), done: false }
          : { done: true };
      },
    };
  },
}; // a slightly more creative iterator
```

Calling a generator results in an iterator.

```javascript
const generator = function* () {
  const values = [0, 1, 2, 3];
  while (values.length) {
    yield values.shift();
  }
};

const iterator = generator(); // does the same as previous
```

Thus, returning the result of a generator from a [Symbol.iterator] method
is an tempting way to create an iterator.

```javascript
const iterator = {
  [Symbol.iterator](){
    return {
      const generator = function * () {
        const values = [0, 1, 2, 3];
        while(values.length){
          yield values.shift()
        }
      };
      return generator();
    };
  }
}; // does the same as previous
```

But there is special syntax that allows your method to be a generator

```javascript
const iterator = {
  *[Symbol.iterator]() {
    const values = [0, 1, 2, 3];
    while (values.length) {
      yield values.shift();
    }
  },
}; // does the same as previous
```

This works for classes as well

```javascript
const iterator = class {
  constructor() {
    this.values = [0, 1, 2, 3];
  }
  *[Symbol.iterator]() {
    while (this.values.length) {
      yield this.values.shift();
    }
  }
};
```

## Transform args

func(...args) -> func(...transduce(args));
