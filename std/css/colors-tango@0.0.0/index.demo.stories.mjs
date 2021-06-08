import { html } from "lit-html";
import "./index.css";

export default {
  title: "CSS Library/Tango Colors/Demo",
  argTypes: {
    name: {
      options: [
        "butter",
        "orange",
        "chocolate",
        "chameleon",
        "sky",
        "plum",
        "scarlet",
        "aluminium",
        "slate",
        "",
      ],
      control: {
        type: "select",
      },
    },
  },
};

export const Ball = ({ name = "butter" } = { name: "butter" }) => {
  return html`<style>
      .ball {
        fill: var(--color-tango-${name});
      }
      .ball.highlight {
        fill: var(--color-tango-${name}-highlight);
      }
      .ball.shadow {
        fill: var(--color-tango-${name}-shadow);
      }</style
    ><svg
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      width="128mm"
      height="128mm"
      viewBox="0 0 128 128"
      version="1.1"
      id="svg8"
    >
      <defs id="defs2" />
      <metadata id="metadata5">
        <rdf:RDF>
          <cc:Work rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <g id="layer1">
        <ellipse
          id="path833"
          cx="64"
          cy="64"
          rx="63.86771"
          ry="63.867714"
          class="ball"
        />
        <path
          id="path837"
          d="M 113.75741,78.11031 C 54.092788,91.1156 92.311489,115.98535 65.856615,115.98535 39.401741,115.98535 26.948374,96.996514 17.955828,78.11031 9.0440523,59.393739 50.451792,97.84352 66.074282,75.566878 78.582425,57.731084 60.123946,13.499942 76.99633,13.499942 c 26.45488,0 55.39728,60.548174 36.76108,64.610368 z"
          class="ball shadow"
        />
        <path
          id="path842"
          d="m 58.313322,69.939735 c -6.287461,7.024627 -18.81328,6.069969 -27.977206,-2.132292 -9.163925,-8.20226 -10.753112,-23.516684 -4.46565,-30.541312 6.287462,-7.024627 21.783878,-14.98174 30.947799,-6.77948 9.163923,8.202263 7.782517,32.428458 1.495057,39.453084 z"
          class="ball highlight"
        />
        <path
          id="path844"
          d="m 110.93409,93.347311 a 7.3934628,14.077293 64.425592 0 1 -9.50645,12.746019 7.3934628,14.077293 64.425592 0 1 -15.889708,-0.59217 7.3934628,14.077293 64.425592 0 1 9.506448,-12.746009 7.3934628,14.077293 64.425592 0 1 15.88971,0.59216 z"
          class="ball highlight"
        />
      </g>
    </svg>`;
};
Ball.args = { name: "butter" };

export const Key = ({ name = "butter" } = { name: "butter" }) => {
  return html`<style>
      .key * {
        background-color: var(--color-tango-${name});
      }
      .key *::before {
        content: "${name} " var(--text-tango-${name});
        color: var(--color-tango-${name}-complement);
      }
      .key .highlight {
        background-color: var(--color-tango-${name}-highlight);
      }
      .key .highlight::before {
        content: "${name} " "highlight " var(--text-tango-${name}-highlight);
        color: var(--color-tango-${name}-highlight-complement);
      }
      .key .shadow {
        background-color: var(--color-tango-${name}-shadow);
      }
      .key .shadow::before {
        content: "${name} " "shadow " var(--text-tango-${name}-shadow);
        color: var(--color-tango-${name}-shadow-complement);
      }
    </style>
    <div class="key">
      <div class="highlight"></div>
      <div></div>
      <div class="shadow"></div>
    </div>`;
};
Key.args = { name: "butter" };

// https://www.reddit.com/r/webdev/comments/npffn5/rick_and_morty_with_pure_css/
// https://codepen.io/manz/pen/JjEqVaB
// https://www.sassmeister.com/
import "./rick-morty.css";

export const RickAndMorty = ({ name = "butter" } = { name: "butter" }) => {
  return html`<style>
      :root {
        --border-color: var(--color-tango-${name}-shadow, #4f5352);
        --rick-skin-color: var(--color-tango-${name}-highlight, #ebe6e3);
        --morty-skin-color: var(--color-tango-${name}-highlight, #f1daca);
        --rick-hair-color: var(--color-tango-${name}, #bdcccf);
        --morty-hair-color: var(--color-tango-${name}, #a68564);
      }
    </style>
    <div class="rick-and-morty">
      <div class="container">
        <div class="rick-container">
          <div class="head-container">
            <div class="head">
              <div class="brow-container">
                <div class="brow"></div>
              </div>
              <div class="eyes-container">
                <div class="left eye">
                  <div class="pupil"></div>
                </div>
                <div class="right eye">
                  <div class="pupil"></div>
                </div>
              </div>
              <div class="eyebags-container">
                <div class="left eyebag"></div>
                <div class="right eyebag"></div>
              </div>
              <div class="nose"></div>
              <div class="mouth-container">
                <div class="mouth"></div>
                <div class="spittle"></div>
                <div class="spittle-arcs"></div>
              </div>
            </div>
            <div class="ear-container">
              <div class="left ear"></div>
              <div class="right ear"></div>
            </div>
            <div class="hair-container">
              <div class="hair"></div>
            </div>
            <div class="neck"></div>
          </div>
          <div class="body-container">
            <div class="body">
              <div class="shirt">
                <div class="flaps-container">
                  <div class="left flap"></div>
                  <div class="right flap"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="morty-container">
          <div class="head-container">
            <div class="head">
              <div class="brows-container">
                <div class="left brow"></div>
                <div class="right brow"></div>
              </div>
              <div class="eyes-container">
                <div class="left eye">
                  <div class="pupil"></div>
                </div>
                <div class="right eye">
                  <div class="pupil"></div>
                </div>
              </div>
              <div class="nose"></div>
              <div class="mouth-container">
                <div class="mouth"></div>
              </div>
            </div>
            <div class="ear-container">
              <div class="left ear"></div>
              <div class="right ear"></div>
            </div>
            <div class="hair-container">
              <div class="hair"></div>
            </div>
          </div>
          <div class="body-container">
            <div class="body"></div>
          </div>
        </div>
      </div>

      <div class="created">
        <span>Created by</span>
        <a href="https://manz.dev/"><h2>Manz.dev</h2></a>
        <p>
          on <a href="https://twitch.tv/ManzDev">Twitch</a> /
          <a href="https://www.youtube.com/watch?v=ZWIgWulXQFg">Youtube</a>
        </p>
      </div>
    </div>`;
};
RickAndMorty.args = { name: "" };
