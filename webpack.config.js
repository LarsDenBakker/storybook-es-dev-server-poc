const path = require('path');

module.exports = {
  entry: {
    manager: './libs/manager.js',
    preview: './libs/preview.js',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'bundles'),
    libraryTarget: 'commonjs2',
    filename: '[name]-cjs.js'
  },
  externals: {
    'lit-html': ['lit-html']
  },
  devtool: 'source-map',
};
