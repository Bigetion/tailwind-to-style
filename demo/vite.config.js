import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'twsx': path.resolve(__dirname, '../src/index.js'),
      'twsx-react': path.resolve(__dirname, '../src/react/index.js')
    }
  },
  server: {
    port: 4320,
    open: true
  }
})