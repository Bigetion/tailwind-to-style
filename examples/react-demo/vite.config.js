import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Point to source so we test actual library code (no build needed)
      'tailwind-to-style/react': path.resolve(__dirname, '../../src/react/index.js'),
      'tailwind-to-style/tokens': path.resolve(__dirname, '../../src/tokens/index.js'),
      'tailwind-to-style/animations': path.resolve(__dirname, '../../src/animations/index.js'),
      'tailwind-to-style': path.resolve(__dirname, '../../src/v4/index.js'),
    },
  },
});
