const path = require("path");
module.exports = {
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
      include: [path.resolve(__dirname, "not_exist_path")], // https://github.com/webpack-contrib/css-loader/issues/295
      // include: path.resolve(__dirname, "../"),
    });

    // Return the altered config
    return config;
  },
  stories: [
    "../std/**/*.stories.mdx",
    "../std/**/*.stories.@(js|jsx|ts|tsx|mjs)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
};
