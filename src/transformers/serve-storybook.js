const createAssets = require('../create-assets');

module.exports = function createServeStorybookTransformer({ storybookConfigDir }) {
  const assets = createAssets({ storybookConfigDir });

  return function serveStorybookTransformer({ url }) {
    const cleanURL = url.split('?')[0].split('#')[0];

    if (cleanURL === '/' || cleanURL === '/index.html') {
      return { body: assets.indexHTML, contentType: 'text/html' };
    }

    if (cleanURL === '/iframe.html') {
      return { body: assets.iframeHTML, contentType: 'text/html' };
    }

    if (cleanURL === assets.managerPath) {
      return { body: assets.managerCode, contentType: 'text/javascript' };
    }
  }
}