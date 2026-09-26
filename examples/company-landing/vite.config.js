import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: { port: 3003, open: true },
  resolve: {
    alias: {
      'tailwind-to-style/register': resolve(__dirname, '../../src/register/index.js'),
      'tailwind-to-style':          resolve(__dirname, '../../src/index.js'),
    },
  },
});
