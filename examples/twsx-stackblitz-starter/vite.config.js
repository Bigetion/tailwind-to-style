import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { twsxVitePlugin } from '../../src/vite/index.js';

export default defineConfig({
  plugins: [
    react(),
    twsxVitePlugin({
      entry: 'src/App.jsx',
      api: 'tailwind-to-style',
      exportName: 'App',
      outFile: 'dist/assets/twsx.css',
      minify: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: 'tailwind-to-style/cx',
        replacement: path.resolve(__dirname, '../../src/cx.js'),
      },
      {
        find: 'tailwind-to-style',
        replacement: path.resolve(__dirname, '../../src/v4/index.js'),
      },
    ],
  },
});
