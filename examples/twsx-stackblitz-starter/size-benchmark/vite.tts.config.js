import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { twsxVitePlugin } from "tailwind-to-style/vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  plugins: [
    react(),
    twsxVitePlugin({
      entry: "src/App.jsx",
      api: "tailwind-to-style",
      exportName: "App",
      outFile: "dist-tts/twsx.css",
      minify: true,
    }),
  ],
  resolve: {
    alias: [{ find: "@bench/styles", replacement: path.resolve(root, "src/styles.tts.js") }],
  },
  build: {
    outDir: "dist-tts",
    emptyOutDir: true,
    rollupOptions: { input: path.resolve(root, "index.tts.html") },
  },
});
