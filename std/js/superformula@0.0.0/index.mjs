export const superformula =
  (a = 1, b = 1, m = 1, n1 = 1, n2 = 1, n3 = 1) =>
  (t) =>
    (Math.abs(Math.cos((m * t) / 4) / a) ** n2 +
      Math.abs(Math.sin((m * t) / 4) / b) ** n3) **
    (-1 / n1);

const add_ = (a, b) => a + b;
const subtract_ = (a, b) => a - b;
const multiply_ = (a, b) => a * b;
const divide_ = (a, b) => a / b;
const power_ = (a, b) => a ** b;
const negate_ = (a) => subtract_(0, a);
const invert_ = (a) => divide_(1, a);

export const superformulaDefinable =
  (
    a = 1,
    b = 1,
    m = 1,
    n1 = 1,
    n2 = 1,
    n3 = 1,
    cos = Math.cos,
    sin = Math.sin,
    abs = Math.abs,
    add = add_,
    multiply = multiply_,
    divide = divide_,
    power = power_,
    negate = negate_,
    invert = invert_
  ) =>
  (t) =>
    power(
      add(
        power(abs(divide(cos(divide(multiply(m, t), 4)), a)), n2),
        power(abs(divide(sin(divide(multiply(m, t), 4)), b)), n3)
      ),
      negate(invert(n1))
    );
