import createCounter, { basic, counterGenerator } from "./index.mjs";

const { update, reset  } = createCounter(basic);

console.log(update());
console.log(update());
console.log(update());
console.log(reset());
console.log(update());
console.log(update());
console.log(update());
console.log(update(33));
console.log(update());
console.log(update());

const gen = counterGenerator();
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.return());
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
