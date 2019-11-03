import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
// import builtins from 'rollup-plugin-node-builtins';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

function createConfig(name) {
  const input = `libs/${name}.js`;
  return {
    input,
    output: {
      file: `dist/${name}.js`,
      format: 'esm',
    },
    manualChunks: {
      'manager': ['./libs/manager.js'],
      'preview': ['./libs/preview.js'],
    },
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify('production')
      }),
      commonjs({
        namedExports: {
          'react': ['createContext', 'forwardRef', 'createElement', 'PureComponent', 'Component', 'Fragment', 'useContext', 'useMemo', 'memo', 'Children'],
          'prop-types': ['oneOfType', 'func', 'shape', 'any', 'number', 'object', 'bool', 'string'],
          // '@storybook/addon-knobs': ['array', 'boolean', 'color', 'date', 'text', 'number', 'object'],
          'react-dom': ['createPortal']
        },
      }),
      nodeResolve(),
      // builtins(),
      json(),
      // terser(),
    ],
  };
}

// export default ['preview', 'manager'].map(params => createConfig(...params));
// export default ['preview', 'manager'].map(createConfig);
export default ['manager'].map(createConfig);
