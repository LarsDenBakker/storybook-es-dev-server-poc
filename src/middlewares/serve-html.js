const fs = require('fs');
const path = require('path');

const indexPath = require.resolve('../index.html');
const previewPath = require.resolve('../preview.html');

module.exports = function (ctx, next) {
  if (ctx.url === '/') {
    ctx.body = indexPath;
  } else if (ctx.url === '/preview.html') {
    ctx.body = previewPath;
  }

  return next();
}