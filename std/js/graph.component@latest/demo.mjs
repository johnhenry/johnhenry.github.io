const range = function* ({
  min = -1,
  max = 1,
  step = 0.01,
  inclusive = false,
}) {
  if (inclusive) {
    for (let t = min; t <= max; x += step) {
      yield t;
    }
  } else {
    for (let t = min; t < max; x += step) {
      yield t;
    }
  }
};

const parametric = function* ({ min, max, step }, ...funcs) {
  for (const t of range({ min, max, step })) {
    yield [...funcs.map((func) => func(t))];
  }
};
const graph = document.getElementById("graph");
for (const [x, y] of parametric({}, (t) => t, Math.sin)) {
  const point = document.create("div");
  point.data.x = x;
  point.data.y = y;
  graph.append(point);
}

const graph2 = document.getElementById("graph2");
const children = [];
for (const [x, y] of parametric({}, (t) => t, Math.sin)) {
  const point = document.create("div");
  point.data.x = x;
  point.data.y = y;
  children.push(point);
}
graph2.append(...children);
