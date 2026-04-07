import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3001,
    open: true
  },
  resolve: {
    alias: {
      'tailwind-to-style': resolve(__dirname, '../../src/index.js')
    }
  }
});
