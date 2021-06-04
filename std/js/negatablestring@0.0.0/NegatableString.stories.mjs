import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import "./string-prototype-warn.mjs";
import "./negative-class.css";

import { negater, scale, concat } from "./NegatableString.mjs";

export default {
  title: "JS Library/Negatable String/Demo",
  argTypes: {
    str0: { control: "text" },
    str1: { control: "text" },
    num0: { control: { type: "range", min: -5, max: 5, step: 1 } },
    num1: { control: { type: "range", min: -5, max: 5, step: 1 } },
  },
};

const negativeMarkup = ['<span class="negative">', "</span>"];

const { log } = console;

const NEGATIVE_COLOR = "red";
const POSITIVE_COLOR = "lightblue";
export const ScaleAndAdd = ({ str0, str1, num0, num1 }) => {
  const f = negater(str0);
  const s = negater(str1);
  const fscaled = scale(f, num0);
  const sscaled = scale(s, num1);
  const result = concat(fscaled, sscaled);
  log(result.toString("~"));
  log(...result.consoleIterator(NEGATIVE_COLOR, POSITIVE_COLOR));
  return html`${num0} × "${unsafeHTML(f.toString(...negativeMarkup))}" + ${num1}
    × "${unsafeHTML(s.toString(...negativeMarkup))}"
    <hr />
    "${unsafeHTML(fscaled.toString(...negativeMarkup))}" +
    "${unsafeHTML(sscaled.toString(...negativeMarkup))}"
    <hr />
    "${unsafeHTML(result.toString(...negativeMarkup))}"`;
};
ScaleAndAdd.args = {
  str0: "Hello World!",
  num0: 1,
  str1: scale("Hello World!", -1).toString("~"),
  num1: 1,
};

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
