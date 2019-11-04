const { rollup } = require('rollup');
const createAssets = require('../create-assets');

module.exports = async function build({ storybookConfigDir }) {
  const assets = createAssets({ storybookConfigDir });


}
