module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{png,jpg}", "*index.html"],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: "dist/service-worker.js",
};
