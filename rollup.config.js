import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

const banner = `/**
 * tailwind-to-style v${pkg.version}
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
  extensions
};

export default [
  // ESM build
  {
    input,
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      banner
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      json(),
      babel(babelConfig),
      copy({
        targets: [
          { src: 'types/index.d.ts', dest: 'dist/' }
        ]
      })
    ]
  },
  
  // CommonJS build
  {
    input,
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      banner,
      exports: 'named'
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      json(),
      babel(babelConfig)
    ]
  },
  
  // Minified UMD build
  {
    input,
    output: {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'tailwindToStyle',
      banner,
      exports: 'named',
      sourcemap: true
    },
    plugins: [
      resolve({ browser: true, extensions }),
      commonjs(),
      json(),
      babel(babelConfig),
      terser({
        output: {
          comments: /^\/\*\*.*@preserve.*\*\/$/
        }
      })
    ]
  },
  
  // Browser IIFE build
  {
    input,
    output: {
      file: 'dist/index.browser.js',
      format: 'iife',
      name: 'tailwindToStyle',
      banner
    },
    plugins: [
      resolve({ browser: true, extensions }),
      commonjs(),
      json(),
      babel(babelConfig)
    ]
  }
];
