export default function* (...stops) {
  const total = stops.reduce((acc, cur) => acc + cur, 0);
  let current = 0;
  for (const stop of stops) {
    yield current / total;
    current += stop;
  }
  yield 1;
}
