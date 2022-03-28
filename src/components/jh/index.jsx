import genRandomToken from "../../utils/gen-random-token.mjs";
import fractionalStops from "../../utils/fractional-stops.mjs";
/*
stops:
    array of numbers representing state of the outline animation at keyframes.
      0 -> outline completely drawn
      -1 -> outline completely "undrawn"
      1 -> outline completely "opposite direction"
intervals:
    numbers representing fractional of whole timeline between keyframes
    examples:
      [1, 2] -> [1/3, 2/3] -> [0.333, 0.666]
        ∴ ≈33% of timeline between beginning and keyframe 1
          ≈67% between 1 and end
      [1, 2, 6] -> [1/9, 2/9, 6/9] -> [0.111, 0.222, 0.666]
        ∴ ≈31% of timeline between beginning and keyframe 1
          ≈22% between 1 and 2
          ≈67% between 2 and end
      [1,4] -> [1/5, 4/5] -> [0.2, 0.8] at 20% and 80% of timeline
        ∴ ≈20% of timeline between beginning and keyframe 1
          ≈80% between 1 and end
*/
export default (
  props = {
    class: "",
    frac: "1",
    stops: "[0, 0]",
    intervals: "[1]",
    animate: false,
    onclick: "",
  }
) => {
  const length = 268.402 * Number(props.frac || 1); // document.querySelector("svg path").getTotalLength()
  const animationName = genRandomToken("dash-");
  const animationEntries = [`animation-name: ${animationName};`];
  for (const [key, value] of Object.entries(props)) {
    if (!key.startsWith("animation-")) {
      continue;
    }
    animationEntries.push(key, ":", value, ";");
  }
  const numericStops = JSON.parse(props.stops);
  const numericIntervals = JSON.parse(props.intervals);
  const percentages = [...fractionalStops(...numericIntervals)].map(
    (x) => `${Math.round(x * 100)}%`
  );
  const frames = percentages
    .map(
      (percentage, index) =>
        `${percentage} {stroke-dashoffset: ${numericStops[index] * length};}`
    )
    .join(" ");
  return (
    <>
      <style
        textContent={`
      @keyframes ${animationName} {${frames}}`}
      />
      <svg
        class={`${props.class}`}
        width="67.733"
        height="67.733"
        version="1.1"
        viewBox="0 0 67.733 67.733"
        xmlns="http://www.w3.org/2000/svg"
        onclick={props.onclick}
      >
        <path
          d="m27.252 12.435v23.019a6.6146 6.6146 0 0 1-6.6146 6.6146 6.6146 6.6146 0 0 1-6.6146-6.6146h-13.229a19.844 19.844 0 0 0 19.844 19.844 19.844 19.844 0 0 0 19.192-14.817h13.881v14.817h13.229v-42.862h-13.229v14.817h-13.229v-14.817z"
          fill="none"
          stroke="#000"
          stroke-width="1"
          stroke-dasharray={length}
          style={props.animate ? animationEntries.join("") : null}
          onclick={props["path-onclick"] || ""}
        />
      </svg>
    </>
  );
};
