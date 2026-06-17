# Examples

This directory contains the real examples included in the repository.

## Available examples

- `basic/` — simple `tws()` usage examples for inline styles, responsive modifiers, pseudo-states, opacity, custom values, and JSON output.
- `react-demo/` — a full React playground showcasing components, variants, slots, theme tokens, and runtime styling.
- `performance/` — performance benchmark and cache demonstration.
- `twsx-classname-app/` — Vite-based `tw()` v4 demo with named classes, variants, slots, and theme switching.

## Run the examples

### Basic example
```bash
npm install
node examples/basic/tws-basic.js
```

### React demo
```bash
cd examples/react-demo
npm install
npm run dev
```

### tw() v4 demo
```bash
cd examples/twsx-classname-app
npm install
npm run dev
```

### Performance benchmark
```bash
npm install
node examples/performance/benchmark.js
```

## Notes

- The `react-demo/` folder is the main React showcase for the library.
- The `twsx-classname-app/` folder demonstrates the unified `tw()` v4 API in a lightweight Vite app.
- Additional framework examples such as Vue and Svelte are not included in this repo yet.
