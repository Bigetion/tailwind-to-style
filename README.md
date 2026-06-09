# tailwind-to-style

[![npm version](https://img.shields.io/npm/v/tailwind-to-style.svg)](https://www.npmjs.com/package/tailwind-to-style)
[![bundle size](https://img.shields.io/bundlephobia/minzip/tailwind-to-style)](https://bundlephobia.com/package/tailwind-to-style)
[![license](https://img.shields.io/npm/l/tailwind-to-style.svg)](https://github.com/Bigetion/tailwind-to-style/blob/main/LICENSE)

**Zero-build runtime Tailwind CSS engine.** Convert utility classes to real CSS — with variants, slots, design tokens, and React bindings. No build step, no PostCSS, no config file. Just works.

---

## Why tailwind-to-style?

| Feature | tailwind-to-style | Tailwind CSS | Stitches | CVA |
|---------|:---:|:---:|:---:|:---:|
| Zero build step | ✅ | ❌ | ✅ | ❌ |
| Tailwind syntax | ✅ | ✅ | ❌ | ✅ |
| Runtime variants | ✅ | ❌ | ✅ | ✅ |
| Slots (multi-part) | ✅ | ❌ | ❌ | ❌ |
| Design tokens | ✅ | ❌ | ✅ | ❌ |
| Inline style output | ✅ | ❌ | ❌ | ❌ |
| SSR support | ✅ | ✅ | ✅ | ✅ |
| React bindings | ✅ | ❌ | ✅ | ❌ |
| Framework agnostic | ✅ | ✅ | ❌ | ✅ |
| Tree-shakeable | ✅ | N/A | ✅ | ✅ |

---

## Installation

```bash
npm install tailwind-to-style
```

```bash
pnpm add tailwind-to-style
```

```bash
yarn add tailwind-to-style
```

Or use a CDN:

```html
<script src="https://unpkg.com/tailwind-to-style"></script>
```

---

## Quick Start

```js
import { tw, tws, cx } from 'tailwind-to-style';

// Generate atomic CSS classes (auto-injected into DOM)
document.body.className = tw('flex items-center justify-center min-h-screen bg-gray-100');

// Convert to inline styles
element.style.cssText = tws('bg-blue-500 text-white p-4 rounded-lg');

// Conditional class merging
const classes = cx('base', isActive && 'ring-2', { 'opacity-50': disabled });
```

---

## API Reference

### `tw()` — The Main Function

One function, four modes:

#### Mode 1: String → Atomic Classes

```js
tw('flex items-center gap-4 hover:bg-gray-100')
// → "tw-flex tw-items-center tw-gap-4 tw-hover-bg-gray-100"
// CSS is auto-injected with full pseudo-class support
```

#### Mode 2: Named Class

```js
tw('sidebar', 'w-64 h-screen bg-white border-r border-gray-200')
// → "sidebar"
// Generates .sidebar { ... } with all the Tailwind styles
```

#### Mode 3: Variants

```js
const button = tw({
  name: 'btn',
  base: 'px-4 py-2 rounded-lg font-medium transition-all',
  variants: {
    color: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
  },
  defaultVariants: { color: 'primary', size: 'md' },
});

button({ color: 'danger', size: 'lg' })
// → "btn btn--color-danger btn--size-lg"
```

#### Mode 4: Slots (Multi-Part Components)

```js
const card = tw({
  name: 'card',
  slots: {
    root: 'bg-white rounded-xl shadow-lg overflow-hidden',
    header: 'px-6 py-4 border-b border-gray-100',
    body: 'px-6 py-4',
    footer: 'px-6 py-4 bg-gray-50',
  },
});

card()
// → { root: "card__root", header: "card__header", body: "card__body", footer: "card__footer" }
```

#### Utility Methods

```js
tw.extractCSS()  // Get all generated CSS as string (SSR)
tw.clearCache()  // Clear internal caches
tw.config({ prefix: 'my', hash: false }) // Configure globally
```

---

### `tws()` — Inline Styles

Convert Tailwind classes directly to CSS styles. No DOM injection needed.

```js
// Returns CSS string
tws('bg-blue-500 p-4 rounded-lg')
// → "background-color: rgb(59,130,246); padding: 1rem; border-radius: 0.5rem;"

// Returns JSON object (for React style prop, etc.)
tws('flex items-center gap-4', true)
// → { display: 'flex', alignItems: 'center', gap: '1rem' }
```

---

### `cx()` — Conditional Class Names

A lightweight `clsx` alternative built-in.

```js
cx('base-class', isActive && 'active-class', { 'disabled': isDisabled })
// → "base-class active-class"

// Arrays work too
cx(['p-4', 'bg-white'], condition && ['ring-2', 'ring-blue-500'])

// Create pre-filled cx
const btnClass = cx.with('px-4 py-2 rounded font-medium');
btnClass('bg-blue-500') // → "px-4 py-2 rounded font-medium bg-blue-500"
```

---

## React Bindings

```bash
import { styled, ThemeProvider, useTheme, useTws } from 'tailwind-to-style/react';
```

### `styled()` — Create Styled Components

```jsx
import { styled } from 'tailwind-to-style/react';

const Button = styled('button', {
  name: 'btn',
  base: 'px-4 py-2 rounded-lg font-medium transition-colors',
  variants: {
    color: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      lg: 'text-lg px-6 py-3',
    },
  },
  defaultVariants: { color: 'primary', size: 'sm' },
});

// Variant props are type-safe and stripped from DOM
<Button color="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

### `ThemeProvider` & `useTheme`

```jsx
import { ThemeProvider, useTheme } from 'tailwind-to-style/react';

const theme = {
  colors: { primary: '#3b82f6', danger: '#ef4444' },
  radius: { sm: '0.25rem', md: '0.5rem' },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MyComponent />
    </ThemeProvider>
  );
}

function MyComponent() {
  const { theme, setTheme } = useTheme();
  // Access tokens via CSS variables: var(--tws-colors-primary)
}
```

### `useTws()` — Inline Style Hook

```jsx
import { useTws } from 'tailwind-to-style/react';

function Box({ classes }) {
  const style = useTws(classes); // memoized style object
  return <div style={style}>Content</div>;
}
```

---

## Design Tokens

```js
import { createTheme, tokenRegistry, token } from 'tailwind-to-style/tokens';
```

### `createTheme()`

```js
createTheme({
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#10b981',
  },
  spacing: { sm: '0.5rem', md: '1rem', lg: '1.5rem' },
  radius: { sm: '0.25rem', md: '0.5rem', lg: '1rem' },
});
// Injects CSS variables on :root:
// --tws-colors-primary: #3b82f6;
// --tws-colors-secondary: #8b5cf6;
// ...
```

### `tokenRegistry`

```js
tokenRegistry.get('colors.primary')    // → '#3b82f6'
tokenRegistry.set('colors.primary', '#2563eb')
tokenRegistry.toCSS()                  // → full :root CSS string
tokenRegistry.subscribe((tokens) => { /* react to changes */ })
```

### `token()` — CSS Variable Reference

```js
token('colors.primary')           // → "var(--tws-colors-primary)"
token('colors.primary', '#000')   // → "var(--tws-colors-primary, #000)"
```

---

## Animations

```js
import { animate, defineAnimation, getAnimationNames } from 'tailwind-to-style/animations';
```

### Built-in Presets

```js
element.className = animate('fadeIn');
element.className = animate('slideInUp', { duration: '500ms', delay: '100ms' });
element.className = animate('bounce');
element.className = animate('spin');  // infinite
```

Available presets: `fadeIn`, `fadeOut`, `slideInUp`, `slideInDown`, `slideInLeft`, `slideInRight`, `scaleIn`, `scaleOut`, `bounce`, `shake`, `pulse`, `spin`, `ping`

### Custom Animations

```js
defineAnimation('wiggle', {
  keyframes: [
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(-3deg)' },
    { transform: 'rotate(3deg)' },
    { transform: 'rotate(0deg)' },
  ],
  duration: '300ms',
  easing: 'ease-in-out',
});

animate('wiggle'); // works!
```

---

## SSR (Server-Side Rendering)

```js
import { tw, createSSRCollector } from 'tailwind-to-style';

// Collect all CSS generated during render
const collector = createSSRCollector();

const html = renderToString(<App />);
const css = collector.extract();

// Inject into HTML head
const fullHtml = `
  <html>
    <head><style>${css}</style></head>
    <body>${html}</body>
  </html>
`;
```

---

## Tree-Shakeable Imports

Import only what you need for minimal bundle size:

| Import Path | What You Get | ~Size |
|---|---|---|
| `tailwind-to-style` | `tw`, `tws`, `cx` | Full engine |
| `tailwind-to-style/react` | `styled`, `ThemeProvider`, `useTheme`, `useTws` | +2KB |
| `tailwind-to-style/tokens` | `createTheme`, `tokenRegistry`, `token` | +1KB |
| `tailwind-to-style/animations` | `animate`, `defineAnimation` | +1.5KB |
| `tailwind-to-style/cx` | `cx` only | ~300B |
| `tailwind-to-style/tws` | `tws` only | Subset |

---

## Framework Support

Works with any framework or vanilla JS:

- **React** — Full bindings via `tailwind-to-style/react`
- **Vue** — Use `tw()` in computed properties or `tws()` in `:style`
- **Svelte** — Use `tw()` in `class:` or `tws()` in `style:`
- **Vanilla JS** — Direct DOM manipulation
- **Node.js / SSR** — `tws()` for inline + `createSSRCollector()` for classes

---

## License

MIT © [Bigetion](https://github.com/Bigetion)
