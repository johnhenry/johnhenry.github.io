import { NegatableString } from "./index.mjs";
String.prototype.consoleIterator = function (...args) {
  return NegatableString.prototype.consoleIterator.apply(this, args);
};
Object.defineProperty(String.prototype, "rep", {
  get: function () {
    return this.split("").map((char) => [char, false]);
  },
});
