const path = require("path");

module.exports = [
  {
    entry: "./libs/manager.js",
    mode: "production",
    devtool: "source-map",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "manager.js"
    }
  },
  {
    entry: "./libs/preview.js",
    mode: "production",
    devtool: "source-map",
    output: {
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "commonjs2",
      filename: "preview-cjs.js"
    },
    externals: {
      "lit-html": ["lit-html"]
    }
  }
];
