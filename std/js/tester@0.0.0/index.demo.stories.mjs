import { html } from "lit-html";

import tester, { ok, notok, equal, notequal } from "./index.mjs";

export default {
  title: "JS Library/Tester/Demo",
  argTypes: {
    str: { control: "select", options: ["", "alpha", "beta", "gamma"] },
    str0: { control: "select", options: ["", "alpha", "beta", "gamma"] },
  },
};

export const Ok = ({ str, str0 }) => {
  tester(function* () {
    yield ok(str);
  });
  return html`${str}?
    <hr />
    see console for test results`;
};
Ok.args = {
  str: "alpha",
};

export const Notok = ({ str, str0 }) => {
  tester(function* () {
    yield notok(str);
  });
  return html`${str}?
    <hr />
    see console for test results`;
};
Ok.Notok = {
  str: "",
};

export const Equal = ({ str, str0 }) => {
  tester(function* () {
    yield equal(str, str0);
  });
  return html`${str} == ${str0}
    <hr />
    see console for test results`;
};
Equal.args = {
  str: "alpha",
  str0: "alpha",
};

export const NotEqual = ({ str, str0 }) => {
  tester(function* () {
    yield notequal(str, str0);
  });
  return html`${str} == ${str0}
    <hr />
    see console for test results`;
};
NotEqual.args = {
  str: "alpha",
  str0: "beta",
};
