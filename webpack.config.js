const path = require('path');

module.exports = {
  entry: {
    manager: './libs/manager.js',
    preview: './libs/preview.js',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'bundles'),
    libraryTarget: 'window',
    library: '__STORYBOOK_BUNDLE__',
    filename: '[name].js'
  },
  devtool: 'source-map',
};
