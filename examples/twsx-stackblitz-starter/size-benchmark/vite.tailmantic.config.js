import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { tailmantic } from "tailmantic/vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  plugins: [
    react(),
    tailmantic({
      entry: "src/tailmantics/index.js",
      inputCss: '@reference "tailwindcss"; @import "tailwindcss/utilities.css" source(none);',
      optimize: true,
    }),
  ],
  resolve: {
    alias: [{ find: "@bench/styles", replacement: path.resolve(root, "src/styles.tailmantic.js") }],
  },
  build: {
    outDir: "dist-tailmantic",
    emptyOutDir: true,
    rollupOptions: { input: path.resolve(root, "index.tailmantic.html") },
  },
});
