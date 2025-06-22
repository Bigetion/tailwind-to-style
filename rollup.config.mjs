// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  // Browser-friendly UMD build
  {
    input: 'src/index.js',
    output: [
      {
        file: 'index.js',
        format: 'umd',
        name: 'tailwindToStyle',
        exports: 'named'
      },
      {
        file: 'index.min.js',
        format: 'umd',
        name: 'tailwindToStyle',
        exports: 'named',
        plugins: [terser()]
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })
    ]
  },
  
  // ES module build for bundlers
  {
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'es',
      exports: 'named'
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })
    ]
  }
];
