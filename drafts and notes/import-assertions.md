# Custom Assetrion Typs

[Type assertions]() exists for [json]() and [css](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/css-modules-v1-explainer.md) (https://css-tricks.com/css-modules-the-native-ones/)

These could also exist for other formats:

- Plain text

```javascript
import warning from "./warning.txt" assert { type: "text" };
console.log(warning);
```

- DOM Objects (html)

```javascript
import heading from "./heading.html" assert { type: "DOM" };
document.body.appendChild(heading);
```

- Binary Data/Typed Arrays

```javascript
import heading from "./heading.bin" assert { type: "Uint8ClampedArray", base:null };
```

- Tabular Data

```javascript
import rows from "./heading.csv" assert { type: "csv" };
```

or

```javascript
import cols from "./heading.tsv" assert { type: "tsv-col" };
```

Whereas these could be implemented as part of the language itself;
it would be more convininent to allow the user to specify the assertions at run-time.

## Transformation Property

One way to do this is to add a "transformation" property to the assertion object.

```javascript

const CSVTransform = (typedArray, options)=>typedArray.toString().split("\n").map(row=>row.split("n"));
import csv from ".." assert { transformation:CSVTransform };// String[][]

```

Another way One way to do this is to add a "transformation" property to the assertion object.

```
import.meta.registerType('csv', CSVTransform, { base:'buffer', override:true, cascade:true, exec: true });

```

## Transformation Property

## Execut flag
