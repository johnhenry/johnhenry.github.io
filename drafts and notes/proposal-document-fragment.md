# More Import Assertions

https://github.com/tc39/proposal-import-assertions
https://github.com/tc39/proposal-json-modules
https://esbuild.github.io/content-types/

## Text

### Contents of message.txt

```text
Hello. I'm a message.
```

### Main file

```javascript
import message from "./message.txt" assert { type: "text" };
console.log(message); //logs "Hello. I'm a message."
```

## Blob

### Main file

```javascript
import binaryFile from "./image.jpeg" assert { type: "blob" };
console.log(binaryFile instanceof Uint8ClampedArray); // logs true
```

### Main file

```javascript
const blobURL = URL.createObjectURL(
  new Blob([`export default "hello";`], { type: "application/javascript" })
); //"blob:https://some-blob-url"
const { default: binaryFile } = await import(blobURL);
console.log(binaryFile); // logs "hello"
```

### Main file

```javascript
const blobURL = `data:application/javascript;base64, ${btoa(
  `export default "hello";`
)}`; //"blob:https://some-blob-url"
const { default: binaryFile } = await import(blobURL);
console.log(binaryFile); // logs "hello"
```

## Transform

### Contents of items.html

```html
a,b,c 1,2,3 4,5,6 7,8,9
```

### Contents of CSVTransform.html

```javascript
export default (text) => {
  const lines = text.split("\n").map((line) => line.split(","));
  const labels = lines.shift();
  const result = [];
  for (const line of lines) {
    const obj = {};
    for (let i = 0; i < labels.length; i++) {
      obj[labels[i]] = line[i];
    }
    result.push(obj);
  }
  return result;
};
```

### Main file

```javascript
import transform from "./CSVTransform.mjs";
import items from "./data.csv" assert { type: "text", transform };;
console.log(items); // logs "[{ a:1,b:2,c:3 }, { a:4,b:5,c:6 }, { a:7,b:8,c:9 }]"
```

## Document Fragment

https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment

### Contents of items.html

```html
<li>Apple</li>
<li>Orange</li>
<li>Banana</li>
<li>Melon</li>
```

### Main file

```html
...
<ul id="list"></ul>
<script type="module">
  import items from "./items.html" assert { type: "document-fragment" };
  window.document.getElementById("list").appendChild(items);
</script>
...
```

### Main file

```javascript
const guardPolyfill = {
  test(){
    return window.feature;
  }
  // test: function or boolean
  onpass(error){
   if(error){
     return console.log('import of polyfill for feature failed.', error);
   }
   console.log('polyfill for feature downloaded');
  }
  onfail(){
   console.log('downloading polyfill');
  }
  onerror(){
   console.log('downloading polyfill');
  }
  success(){
   console.log('downloading polyfill');
  }
}
import "./freature-polyfill.csv" assert { type: "text", guard: guardPolyfill /*function or boolean*/ };
console.log(window.feature);
```
