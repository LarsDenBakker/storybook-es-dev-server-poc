import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

function createConfig(name, options = {}) {
  const input = `bundles/${name}-cjs.js`;
  const namedExports = options.namedExports ? {
    [input]: options.namedExports,
  } : undefined;

  return {
    input,
    output: {
      file: `bundles/${name}.js`,
      format: 'esm',
    },
    plugins: [
      commonjs({
        namedExports,
      }),
      {
        renderChunk(code, id) {
          return code.replace('import litHtml from \'lit-html\';', 'import * as litHtml from \'lit-html\';');
        }
      },
      // terser(),
    ],
  };
}

export default [
  ['preview', {
    namedExports: [
      'html',
      'storiesOf',
      'addParameters',
      'addDecorator',
      'configure',
      'withA11y' ,
      'setCustomElements' ,
      'Story' ,
      'Preview',
      'Meta',
      'Props',
      'action',
      'withKnobs',
      'text',
      'number',
      'withWebComponentsKnobs',
      'React',
      'mdx',
      'DocsContainer',
      'makeStoryFn',
    ],
  }],
  ['manager'],
].map(params => createConfig(...params));

