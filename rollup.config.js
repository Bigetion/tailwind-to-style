import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const banner = `/**
 * tailwind-to-style v${pkg.version}
 * Runtime Tailwind CSS to inline styles converter
 * Core only: tws, twsx, configure
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
  // Main ESM build (primary export)
  {
    input,
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      banner,
      inlineDynamicImports: true
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
  
  // Main CommonJS build (for Node.js compatibility)
  {
    input,
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      banner,
      exports: 'named',
      inlineDynamicImports: true
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      json(),
      babel(babelConfig)
    ]
  },
  
  // Minified UMD build (for CDN usage)
  {
    input,
    output: {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'tailwindToStyle',
      banner,
      exports: 'named',
      sourcemap: true,
      inlineDynamicImports: true
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
  }
];
