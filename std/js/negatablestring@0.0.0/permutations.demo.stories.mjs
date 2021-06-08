import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import "./string-prototype-warn.mjs";
import "./negative-class.css";

import { negater } from "./index.mjs";

export default {
  title: "JS Library/Negatable String/Demo",
  argTypes: {
    str0: { control: "text" },
  },
};

const negativeMarkup = ['<span class="negative">', "</span>"];

const numToBinaryArray = (num, len, t = "~", f = "") => {
  return num
    .toString(2)
    .padStart(len, 0)
    .split("")
    .map(Number)
    .map((x) => (x ? t : f));
};

const zip = (a0, a1) => {
  return a0.map((item, i) => item + a1[i]);
};

const intersperse = function* (word, char = "~", after = false, before = true) {
  const letters = word.split("");
  if (after) {
    letters.push("");
  }
  let x = 0;
  if (!before) {
    x = 2 ** (letters.length - 1);
  }
  for (let i = 0; i < 2 ** letters.length - x; i++) {
    yield zip(numToBinaryArray(i, letters.length, char), letters).join("");
  }
};

export const Permutations = ({ str0 }) => {
  return html`<ol>
    ${[...intersperse(str0, "~")].map(
      (x) => html` <li>
        "${x}" => "${unsafeHTML(negater(x).toString(...negativeMarkup))}"
      </li>`
    )}
  </ol>`;
};
Permutations.args = {
  str0: "mississippi",
};

Permutations.parameters = {
  controls: { exclude: ["str1", "num0", "num1"] },
};
