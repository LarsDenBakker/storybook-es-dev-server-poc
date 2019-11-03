const fs = require('fs');
const path = require('path');
const mdx = require('@mdx-js/mdx');
const { transformAsync } = require('@babel/core');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const exists = promisify(fs.exists);

const compilers = [createCompiler({})];

async function transformMdxToJS(url) {
  // TODO: handle windows paths
  const filepath = path.join(__dirname, '..', '..', url);

  if (!await exists(filepath)) {
    return null;
  }

  const src = await readFile(filepath, 'utf-8');
  const jsx = `
    import { React, mdx } from '../../../preview.js'
    ${await mdx(src, { compilers, filepath })}

    // TODO VVV
  `.replace('@storybook/addon-docs/blocks', '../../../preview.js');

  return transformAsync(jsx, { filename: filepath,
      plugins: [
        require.resolve('@babel/plugin-transform-react-jsx'),
      ],
    }).then(
    result => result.code,
  );
}

module.exports = async function mdxToJS({ url, body }) {
  if (url.endsWith('.mdx')) {
    const newBody = await transformMdxToJS(url);
    if (newBody) {
      return { body: newBody, contentType: 'text/javascript' }
    }
  }
}
