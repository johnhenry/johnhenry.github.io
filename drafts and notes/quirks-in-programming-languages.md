# Quirks in progamming languages

Things are weird in all programming languages.

## Common Misunderstanding

```javascript
input0.value = 1;
input1.value = 2;
console.log(input0.value + input0.value); // logs "12"
// Some think that this should be "3"
// HTML inputs convert their values into strings, so the concatenation of the strings "1" and "2", "12" is expected
console.log(Number(input0.value) + Number(input0.value)); // logs "3"
```

## Actual Bug

```javascript
console.log(typeof null); // "object"
// This is an actual bug.
// You can check for a non-null object like this:
if (object && typeof object === "object") {
  // do your thing...
}

console.log([] == "");
// Coersion doesn't work right.
// In most cases "===" does what you want to do.
// If you somehow have a use case that fits "==" better than "===",
//    SERIOUSLY sit down and think about your program's logic
//    for a long long time.
```

## Just go with it

Reasons may exist, but it's ultimately it's probably just an implemetation detail of that language.

```javascript
new Array(1); // uses "new" keyword to create array
String(1); // does not use "new" keyword to create array
```
