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
 * Convert tailwind classes to inline style
 * 
 * @author Bigetion
 * @license MIT
 */`;

const input = 'src/index.js';
const extensions = ['.js', '.jsx'];

// Babel configuration for browser compatibility
const babelConfig = {
  babelHelpers: 'bundled',
  exclude: 'node_modules/**',
  extensions,
  presets: ['@babel/preset-react']
};

export default [
  // Main ESM build
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
          { src: 'types/index.d.ts', dest: 'dist/' },
          { src: 'types/react.d.ts', dest: 'dist/' }
        ]
      })
    ]
  },
  
  // React hooks ESM build
  {
    input: 'src/react/index.js',
    output: {
      file: 'dist/react.esm.js',
      format: 'esm',
      banner
    },
    external: ['react', 'react-dom'],
    plugins: [
      resolve({ extensions: ['.js', '.jsx'] }),
      babel(babelConfig),
      commonjs(),
      json()
    ]
  },
  
  // Main CommonJS build
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
  
  // React hooks CommonJS build
  {
    input: 'src/react/index.js',
    output: {
      file: 'dist/react.cjs.js',
      format: 'cjs',
      banner,
      exports: 'named'
    },
    external: ['react', 'react-dom'],
    plugins: [
      resolve({ extensions: ['.js', '.jsx'] }),
      babel(babelConfig),
      commonjs(),
      json()
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
