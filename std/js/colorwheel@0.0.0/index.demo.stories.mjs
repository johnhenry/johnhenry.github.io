import { html } from "lit-html";
import ColorWheel from "./index.mjs";

export default {
  title: "JS Library/ColoWheel/Demo",
  argTypes: {
    lightness: { control: { type: "number", min: 0, max: 1, step: 0.1 } },
    max: { control: { type: "number", min: 1, max: 2, step: 0.1 } },
  },
};

const stepHTML = function* (total, wheel) {
  let steps = 0;
  while (steps <= total) {
    const hex = wheel.color((steps / total) * 2 * Math.PI, 1);
    const factor = (2 * (steps % total)) / total;
    console.log(`%c#${hex} θ=${factor}π`, `color:#${hex}`);
    yield html`<li style="color:#${hex}">#${hex} θ=${factor}π</li>`;
    steps++;
  }
};

export const HTML = ({ lightness, max }) => {
  const wheel = new ColorWheel({ lightness, max });
  return html`<ul>
      ${[...stepHTML(64, wheel)]}
    </ul>
    <hr />
    Also, see console for results`;
};
HTML.args = { lightness: 0.6, max: 1 };
