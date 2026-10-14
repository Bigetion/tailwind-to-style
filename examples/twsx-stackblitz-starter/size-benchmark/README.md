# Apples-to-apples bundle size benchmark

This fixture builds the same `src/App.jsx` twice with React 18.3.1, Vite 6.4.3, and `@vitejs/plugin-react` 4.7.0. Both libraries are installed from the sibling local checkouts.

```powershell
npm install
npm run build:tts
npm run build:tailmantic
```

The app markup, React state, variants, slot structure, utility declarations, HTML shell, and build toolchain are shared. Only the style adapter and the build-time CSS compiler differ.

Compare every emitted `.js` and `.css` file in `dist-tts` and `dist-tailmantic`, including raw bytes and gzip bytes. Do not count the HTML shell or external resources.

## Results

Measured from the production builds; gzip is calculated independently for each emitted asset at level 9, then summed by asset type.

| Assets | tailwind-to-style (raw / gzip) | Tailmantic (raw / gzip) |
|---|---:|---:|
| JavaScript | 151,588 B / 47,888 B | 153,886 B / 49,810 B |
| CSS | 8,723 B / 1,563 B | 9,130 B / 2,061 B |
| **JavaScript + CSS** | **160,311 B / 49,451 B** | **163,016 B / 51,871 B** |

For this fixture, tailwind-to-style emits 2,705 fewer raw bytes (1.7%) and 2,420 fewer gzip bytes (4.7%) across JavaScript and CSS. This is a modest result for this particular UI, not a universal advantage. It includes the shared React runtime and app code, and excludes HTML and external resources.
