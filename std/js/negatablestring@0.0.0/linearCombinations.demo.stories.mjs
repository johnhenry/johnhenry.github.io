import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import "./string-prototype-warn.mjs";
import "./negative-class.css";

import { negater, scale, concat } from "./index.mjs";

export default {
  title: "JS Library/Negatable String/Demo",
  argTypes: {
    str0: { control: "text" },
    str1: { control: "text" },
    factor0: { control: { type: "range", min: -5, max: 5, step: 1 } },
    factor1: { control: { type: "range", min: -5, max: 5, step: 1 } },
  },
};

const negativeMarkup = ['<span class="negative">', "</span>"];

const { log } = console;

const NEGATIVE_COLOR = "red";
const POSITIVE_COLOR = "lightblue";
export const LinearCombinations = ({ str0, str1, factor0, factor1 }) => {
  const f = negater(str0);
  const s = negater(str1);
  const fscaled = scale(f, factor0);
  const sscaled = scale(s, factor1);
  const result = concat(fscaled, sscaled);
  log(result.toString("~"));
  log(...result.consoleIterator(NEGATIVE_COLOR, POSITIVE_COLOR));
  return html`"${unsafeHTML(f.toString(...negativeMarkup))}" × ${factor0} +
    "${unsafeHTML(s.toString(...negativeMarkup))} × ${factor1}"
    <hr />
    "${unsafeHTML(fscaled.toString(...negativeMarkup))}" +
    "${unsafeHTML(sscaled.toString(...negativeMarkup))}"
    <hr />
    "${unsafeHTML(result.toString(...negativeMarkup))}"`;
};
LinearCombinations.args = {
  str0: "Hello World!",
  factor0: 1,
  str1: scale("Hello World!", -1).toString("~"),
  factor1: 1,
};
