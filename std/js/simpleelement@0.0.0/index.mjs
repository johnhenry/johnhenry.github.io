const { HTMLElement } = globalThis;
import textToNodes from "./textToNodes.js";
const createElement =
  (
    { shadowMode = "open", useShadow = true, baseElement = HTMLElement } = {
      shadowMode: "open",
      useShadow: true,
      baseElement: HTMLElement,
    }
  ) =>
  (strs, ...substs) => {
    const str =
      typeof strs === "string"
        ? strs
        : substs.reduce((prev, cur, i) => prev + cur + strs[i + 1], strs[0]);

    if (useShadow) {
      return class extends baseElement {
        constructor() {
          super();
          const children = textToNodes(str);
          this.attachShadow({ mode: shadowMode }).append(...children);
        }
      };
    } else {
      return class extends baseElement {
        constructor() {
          super();
          const children = textToNodes(str);
          this.append(...children);
        }
      };
    }
  };

const register =
  (tagname, options, ...rest) =>
  (strs, ...substs) =>
    globalThis.customElements.define(
      tagname,
      createElement(options)(strs, ...substs),
      ...rest
    );
const shadowOpen = createElement();
const shadowClosed = createElement({ shadowMode: "closed" });

const constructSuperclass = (
  {
    HTML = "",
    shadowHTML = "",
    shadowMode = "open",
    baseElement = HTMLElement,
  } = {
    HTLM: "",
    shadowHTML: "",
    shadowMode: "open",
    baseElement: HTMLElement,
  }
) => {
  return class extends baseElement {
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
