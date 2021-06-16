import textToNodes from "./textToNodes.js";

const createClass = (
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

export default createClass;
