import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

const banner = `/**
 * tailwind-to-style v2.5.0
 * Convert tailwind classes to inline style
 * 
 * @author Bigetion
 * @license MIT
 */`;

const input = 'src/index.js';
const extensions = ['.js'];

// Babel configuration for browser compatibility
const babelConfig = {
  babelHelpers: 'bundled',
  exclude: 'node_modules/**',
  extensions,
  presets: [
    ['@babel/preset-env', {
      targets: '> 1%, not dead, not ie 11',
      modules: false
    }]
  ]
};

export default [  // ESM build for modern environments
  {
    input,
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      banner,
      exports: 'named',
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      json(),
    ],
  },
  
  // CommonJS build for Node.js environments
  {
    input,
    output: {
      file: 'index.js',
      format: 'cjs',
      banner,
      exports: 'named',
    },
    plugins: [      resolve({ extensions }),
      commonjs(),
      json(),
      babel.babel(babelConfig),
    ],
  },
  
  // UMD build for browsers (minified)
  {
    input,
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'tailwindToStyle', // Global variable name when used in browser
      banner,
      exports: 'named',
      sourcemap: true,
      globals: {
        // Add external dependencies here if needed
      }
    },
    plugins: [
      resolve({ browser: true, extensions }),
      commonjs(),
      json(),      babel.babel({
        ...babelConfig,
        presets: [
          ['@babel/preset-env', {
            targets: '> 0.5%, last 2 versions, Firefox ESR, not dead, not ie 11',
            modules: false
          }]
        ]
      }),
      terser({
        output: {
          comments: (_, comment) => {
            return comment.type === 'comment2' && /@preserve|@license|@author/i.test(comment.value);
          }
        }
      }),
    ],
  },
  
  // Browser-friendly IIFE version (for direct use in script tags)
  {
    input,
    output: {
      file: 'dist/index.browser.js',
      format: 'iife',
      name: 'tailwindToStyle', // Global variable name when used in browser
      banner,
      exports: 'named',
    },
    plugins: [
      resolve({ browser: true, extensions }),
      commonjs(),
      json(),
      babel(babelConfig),
    ],
  },
];
