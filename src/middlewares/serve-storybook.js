const createAssets = require('../create-assets');

module.exports = function createServeStorybookMiddleware({ storybookConfigDir }) {
  const assets = createAssets({ storybookConfigDir });

  return function serveStorybookMiddleware(ctx, next) {
    const cleanURL = ctx.url.split('?')[0].split('#')[0];
    if (cleanURL === '/' || cleanURL === '/index.html') {
      ctx.body = assets.indexHTML;
      ctx.status = 200;
      ctx.response.set('content-type', 'text/html');
      return;
    }

    if (cleanURL === '/iframe.html') {
      ctx.body = assets.iframeHTML;
      ctx.status = 200;
      ctx.response.set('content-type', 'text/html');
      return;
    }

    if (cleanURL === assets.managerPath) {
      ctx.body = assets.managerCode;
      ctx.status = 200;
      ctx.response.set('content-type', 'text/javascript');
      ctx.response.set('cache-control', 'public, max-age=31536000');
      return;
    }

    return next();
  }
}