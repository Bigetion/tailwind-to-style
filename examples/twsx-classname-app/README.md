# tw() v4 Demo App

This demo showcases the unified `tw()` v4 API from `tailwind-to-style`.

## Features Demonstrated

- **Mode 1** — atomic class generation from a Tailwind string
- **Mode 2** — named class generation with `tw('name', '...')`
- **Mode 3** — component variants with runtime props
- **Mode 4** — multi-part slots components
- **Runtime theming** — CSS custom properties injected by `createTheme()`
- **No external CSS** — all styling generated at runtime

## Running the Demo

```bash
cd examples/twsx-classname-app
npm install
npm run dev
```

Then open the local address printed by Vite.

## Notes

- This demo imports `../../src/v4/index.js` directly from source.
- Theme switching updates CSS variables at runtime.
- The demo is built with `tw()` and runtime Tailwind-style CSS generation.
- No build step is required for styling, only for serving the demo.

## License

MIT
