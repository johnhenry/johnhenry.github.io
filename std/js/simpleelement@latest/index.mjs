const { HTMLElement } = globalThis;
import textToNodes from "./textToNodes.js";
const createElement =
  (
    { shadowMode = "open", useShadow = true } = {
      shadowMode: "open",
      useShadow: true,
    }
  ) =>
  (strs, ...substs) => {
    const str =
      typeof strs === "string"
        ? strs
        : substs.reduce((prev, cur, i) => prev + cur + strs[i + 1], strs[0]);

    if (useShadow) {
      return class extends HTMLElement {
        constructor() {
          super();
          const children = textToNodes(str);
          this.attachShadow({ mode: shadowMode }).append(...children);
        }
      };
    } else {
      return class extends HTMLElement {
        constructor() {
          super();
          const children = textToNodes(str);
          this.append(...children);
        }
      };
    }
  };

const register =
  (tagname, options) =>
  (strs, ...substs) =>
    globalThis.customElements.define(
      tagname,
      createElement(options)(strs, ...substs)
    );
const shadowOpen = createElement();
const shadowClosed = createElement({ shadowMode: "closed" });

const constructSuperclass = (
  { HTML = "", shadowHTML = "", shadowMode = "open" } = {
    HTLM: "",
    shadowHTML: "",
    shadowMode: "open",
  }
) => {
  return class extends HTMLElement {
    constructor() {
      super();
      if (shadowHTML) {
        const children = textToNodes(shadowHTML);
        this.attachShadow({ mode: shadowMode }).append(...children);
      }
      if (HTML) {
        const children = textToNodes(HTML);
        this.append(...children);
      }
    }
  };
};
export { register, shadowOpen, shadowClosed, constructSuperclass };
