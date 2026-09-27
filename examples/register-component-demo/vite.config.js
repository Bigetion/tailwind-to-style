import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: { port: 3004, open: true },
  resolve: {
    alias: {
      'tailwind-to-style/register': path.resolve(__dirname, '../../src/register/index.js'),
      'tailwind-to-style': path.resolve(__dirname, '../../src/v4/index.js'),
    },
  },
});
