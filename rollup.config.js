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

// Shared plugins factory
const createPlugins = (opts = {}) => [
  resolve({ browser: opts.browser, extensions }),
  commonjs(),
  json(),
  babel(babelConfig),
  ...(opts.terserPlugin ? [terser({ output: { comments: false } })] : []),
  ...(opts.copyPlugin ? [copy({ targets: opts.copyPlugin })] : []),
];

// Sub-path entry points for tree-shakeable imports
const subPathEntries = [
  { input: 'src/core/tws.js', name: 'core/tws', typeSrc: 'types/core/tws.d.ts' },
  { input: 'src/core/twsx.js', name: 'core/twsx', typeSrc: 'types/core/twsx.d.ts' },
  { input: 'src/core/twsxVariants.js', name: 'core/twsxVariants', typeSrc: 'types/core/twsxVariants.d.ts' },
  { input: 'src/className/index.js', name: 'className/index', typeSrc: 'types/className/index.d.ts' },
  { input: 'src/utils/index.js', name: 'utils/index', typeSrc: 'types/utils/index.d.ts' },
  { input: 'src/cx.js', name: 'cx', typeSrc: 'types/cx.d.ts' },
];

// Generate sub-path builds (ESM + CJS for each)
const subPathBuilds = subPathEntries.flatMap(({ input: entryInput, name }) => [
  {
    input: entryInput,
    output: {
      file: `dist/${name}.esm.js`,
      format: 'esm',
      banner,
      inlineDynamicImports: true,
      sourcemap: true,
    },
    plugins: createPlugins(),
  },
  {
    input: entryInput,
    output: {
      file: `dist/${name}.cjs`,
      format: 'cjs',
      banner,
      exports: 'named',
      inlineDynamicImports: true,
    },
    plugins: createPlugins(),
  },
]);

export default [
  // Main ESM build (primary export)
  {
    input,
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      banner,
      inlineDynamicImports: true,
      sourcemap: true,
    },
    plugins: createPlugins({
      copyPlugin: [
        { src: 'types/index.d.ts', dest: 'dist/' },
        { src: 'types/core', dest: 'dist/' },
        { src: 'types/utils', dest: 'dist/' },
        { src: 'types/cx.d.ts', dest: 'dist/' },
      ],
    }),
  },
  
  // Main CommonJS build (for Node.js compatibility)
  {
    input,
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      banner,
      exports: 'named',
      inlineDynamicImports: true,
    },
    plugins: createPlugins(),
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
      inlineDynamicImports: true,
    },
    plugins: createPlugins({ browser: true, terserPlugin: true }),
  },

  // Sub-path builds for tree-shaking
  ...subPathBuilds,
];
