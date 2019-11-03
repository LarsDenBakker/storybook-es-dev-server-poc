import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

function createConfig(name, options = {}) {
  const input = `dist/${name}-cjs.js`;
  const namedExports = options.namedExports ? {
    [input]: options.namedExports,
  } : undefined;

  return {
    input,
    output: {
      file: `dist/${name}.js`,
      format: 'esm',
    },
    plugins: [
      commonjs({
        namedExports,
      }),
      {
        renderChunk(code, id) {
          return code.replace('import litHtml from \'lit-html\';', 'import * as litHtml from \'lit-html\';')
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
      'action',
      'withA11y',
      'linkTo',
      'withNotes',
      'document',
      'withKnobs',
      'text',
      'button',
      'number',
      'select',
      'date',
      'object',
      'color',
      'array',
      'boolean',
      'radios',
      'files',
      'optionsKnob',
      'withClassPropertiesKnobs',
    ],
  }],
  ['manager'],
  ['commons'],
].map(params => createConfig(...params));

