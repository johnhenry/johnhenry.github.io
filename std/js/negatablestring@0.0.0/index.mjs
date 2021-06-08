//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
const COLOR = "white";
const NCOLOR = "red";

export const NegatableString = class {
  constructor(rep = []) {
    this.rep = rep;
    Object.freeze(this.rep);
    this.rep.forEach(Object.freeze);
  }
  consoleIterator(nColor = NCOLOR, pColor = COLOR, color = COLOR) {
    return consoleIterator(this, nColor, pColor, color);
  }
  toString(nStart = "", nEnd = "", pStart = "", pEnd = "") {
    return this.rep
      .map(([x, negative]) =>
        negative ? `${nStart}${x}${nEnd}` : `${pStart}${x}${pEnd}`
      )
      .join("");
  }
  charAt(index) {
    return new NegatableString([this.rep[index]]);
  }
  get length() {
    return this.rep.length;
  }
};
export const invert = (string) =>
  new NegatableString(
    string.rep.map(([x, negative]) => [x, !negative]).reverse()
  );

export const equal = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a.rep[i][0] !== b.rep[i][0] || a.rep[i][1] !== b.rep[i][1]) {
      return false;
    }
  }
  return true;
};

export const negater = (string = "", symbol = "~", combine = true) => {
  const rep = [];
  let negateNext = false;
  for (const char of string) {
    if (negateNext) {
      negateNext = false;
      if (char === symbol) {
        continue;
      }
      rep.push([char, true]);
      continue;
    }
    if (char === symbol) {
      negateNext = true;
      continue;
    }
    rep.push([char, false]);
  }
  let i = 0;
  // Handle adjacent inverses
  if (combine) {
    while (i < rep.length - 1) {
      if (i < 0) {
        i = 0;
      }
      const current = rep[i];
      const next = rep[i + 1];
      if (current[0] === next[0] && current[1] === !next[1]) {
        rep.splice(i, 2);
        i -= 2;
      }
      i++;
    }
  }
  return new NegatableString(rep);
};

export const ensureNegatableString = (string) => {
  if (typeof string === "string") {
    return scale(string);
  }
  return string;
};

export const concat = (alpha, beta, drop) => {
  const a = ensureNegatableString(alpha);
  const b = ensureNegatableString(beta);
  const rep = [];
  let index = 0;
  let last;
  let first;
  do {
    last = a.rep[a.rep.length - 1 - index];
    first = b.rep[index];
    index++;
    if (first && last) {
      if (last[0] === first[0] && last[1] === !first[1]) {
        // do nothing. continue?
      } else {
        rep.push(first);
        rep.unshift(last);
      }
    } else if (first) {
      rep.push(first);
    } else if (last) {
      rep.unshift(last);
    }
  } while (first || last);
  const result = new NegatableString(rep);
  if (drop === true) {
    return flushNegative(result);
  }
  if (drop === false) {
    return flushPositive(result);
  }
  return result;
};

export const flip = (string) =>
  new NegatableString(string.rep.map(([x, s]) => [x, !s]));
export const abs = (string) =>
  new NegatableString(string.rep.map(([x, s]) => [x, false]));
export const nAbs = (string) =>
  new NegatableString(string.rep.map(([x, s]) => [x, true]));
export const flushPositive = (string) =>
  new NegatableString(string.rep.filter(([x, s]) => s));
export const flushNegative = (string) =>
  new NegatableString(string.rep.filter(([x, s]) => !s));

export const scale = (string, scalar = 1) => {
  const pScalar = Math.abs(scalar);
  const pScalarRounded = Math.round(pScalar);
  const { rep } = string;
  let newRep = [];
  for (let i = 0; i < pScalarRounded; i++) {
    newRep.push(rep);
  }
  newRep = newRep.flat();
  const len = (pScalar - pScalarRounded) * rep.length;
  newRep = newRep.concat(rep.slice(0, len));
  const result = new NegatableString(newRep);
  return scalar < 0 ? invert(result) : result;
};

export const consoleIterator = (
  str,
  nColor = NCOLOR,
  pColor = COLOR,
  color = COLOR
) => {
  const colors = [];
  const string = str.rep
    .map(([x, negative]) => {
      colors.push(`color:${negative ? nColor : pColor}`);
      return `%c${x}`;
    })
    .concat("%c")
    .join("");
  colors.push(`color:${color}`);
  return [string, ...colors];
};
