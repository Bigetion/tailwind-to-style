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
 * Zero-build runtime Tailwind CSS engine
 * 
 * @author Bigetion
 * @license MIT
 */`;

// v4 entry point
const input = 'src/v4/index.js';
const extensions = ['.js'];

// Babel configuration for browser compatibility
const babelConfig = {
  babelHelpers: 'bundled',
  exclude: 'node_modules/**',
  extensions,
  presets: [
    ['@babel/preset-env', { targets: '> 0.25%, not dead', modules: false, useBuiltIns: false }],
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-proposal-optional-chaining'],
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
  { input: 'src/react/index.js', name: 'react/index' },
  { input: 'src/tokens/index.js', name: 'tokens/index' },
  { input: 'src/animations/index.js', name: 'animations/index' },
  { input: 'src/core/tws.js', name: 'core/tws' },
  { input: 'src/className/index.js', name: 'className/index' },
  { input: 'src/cx.js', name: 'cx' },
];

// Generate sub-path builds (ESM + CJS for each)
const subPathBuilds = subPathEntries.flatMap(({ input: entryInput, name }) => {
  const isReact = name.startsWith('react');
  const external = isReact ? ['react', 'react-dom'] : [];

  return [
    {
      input: entryInput,
      output: {
        file: `dist/${name}.esm.js`,
        format: 'esm',
        banner,
        inlineDynamicImports: true,
        sourcemap: true,
      },
      external,
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
      external,
      plugins: createPlugins(),
    },
  ];
});

export default [
  // Main ESM build (v4 entry)
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
        { src: 'types/tokens', dest: 'dist/' },
        { src: 'types/react', dest: 'dist/' },
        { src: 'types/animations', dest: 'dist/' },
        { src: 'types/cx.d.ts', dest: 'dist/' },
      ],
    }),
  },

  // Main CommonJS build
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

  // Minified UMD build (for CDN)
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

  // Sub-path builds
  ...subPathBuilds,
];
