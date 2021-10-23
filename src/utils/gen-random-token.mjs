export default (prefix = "") =>
  `${prefix}${Math.random().toString(16).substr(2, 9)}`;
