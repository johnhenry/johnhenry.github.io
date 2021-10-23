# Things in Javascript

## Numbers

```javascript
typeof 0; // "number"
```

### Literal

```javascript
1, 2, 4;
1_2_2; // 123
0xff; // hex
0b1; // binary
```

```javascript

```

### Constants

```javascript
Math.PI, Math.E;
```

## Strings

```javascript
typeof "hello"; // "string"
```

### Literal ("", '', ``)

```javascript
"it's";
'it\'s';
`it's`;
`${"it's"}`; // Interpolation
// Tagged String functions. Will talk about later
```

## Objects

```javascript
typeof {}; // "object"
```

### Literal "{}", [], //

```javascript
const obj = {}; //
const arr = []; // arrays are objects
const reg = /./; // regular expressions are objects
const func = () => {};
// functions are technically objects, but return function
// when using the "typeof" directivie
```

## Other types: bigint, boolean, symbol

# Classes

A class is the most common way to create a "custom thing" in a programming language.
