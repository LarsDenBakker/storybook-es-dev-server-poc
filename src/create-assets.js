const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function createContentHash(content) {
  return crypto
    .createHash('md4')
    .update(content)
    .digest('hex');
}

module.exports = function getAssets({ storybookConfigDir }) {
  const managerCode = fs.readFileSync(path.join(__dirname, '..', 'bundles', 'manager.js'), 'utf-8');
  const managerHash = createContentHash(managerCode);
  const managerPath = `/storybook-manager-${managerHash}.js`

  let indexHTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
  indexHTML = indexHTML.replace('</body>', `<script type="module" src="${managerPath}"></script>`);

  let iframeHTML = fs.readFileSync(path.join(__dirname, 'iframe.html'), 'utf-8');
  iframeHTML = iframeHTML.replace('</body>', `<script type="module" src="${storybookConfigDir}/config.js"></script>`)

  return {
    managerCode, managerPath, indexHTML, iframeHTML,
  };
}