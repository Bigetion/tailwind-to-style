# tailwind-to-style

[![npm version](https://img.shields.io/npm/v/tailwind-to-style.svg)](https://www.npmjs.com/package/tailwind-to-style)
[![bundle size](https://img.shields.io/bundlephobia/minzip/tailwind-to-style)](https://bundlephobia.com/package/tailwind-to-style)
[![license](https://img.shields.io/npm/l/tailwind-to-style.svg)](https://github.com/Bigetion/tailwind-to-style/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](./TYPESCRIPT.md)

**Zero-build runtime Tailwind CSS engine.** Convert utility classes to real CSS — with variants, slots, design tokens, and React bindings. No build step, no PostCSS, no config file. Just works.

**[📘 TypeScript Guide](./TYPESCRIPT.md)** • **[📊 Bundle Analysis](./BUNDLE_SIZE_REPORT.md)** • **[🎯 Examples](./examples/)**

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

## Examples

Want to try the library with real demos?

- `examples/basic/` — runtime `tws()` examples, mixed CSS demo, and register API tests.
- `examples/react-demo/` — full React showcase with components, variants, tokens, and theme switching.
- `examples/twsx-classname-app/` — Vite-based runtime `tw()` v4 demo with variant and slots components.
- `examples/register-landing/` — landing page built with `register()` — zero Tailwind CLI, pure HTML + register calls.
- `examples/company-landing/` — single-file company landing page (Nexora) demonstrating `register.all()`, `register.group()`, `@keyframes`, and FOUC prevention.

Run the demos:

```bash
cd examples/react-demo
npm install
npm run dev
```

```bash
cd examples/twsx-classname-app
npm install
npm run dev
```

```bash
cd examples/register-landing
npm install
npm run dev
```

```bash
cd examples/company-landing
npm install
npm run dev
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
}, { selector: ':root' });
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

- **React** — Full bindings via `tailwind-to-style/react` (example available in `examples/react-demo`)
- **Vanilla JS** — Direct DOM usage with `tw()` and `tws()`
- **Node.js / SSR** — `tws()` for inline styles + `createSSRCollector()` for CSS extraction
- **Vue / Svelte** — supported in runtime with `tw()` / `tws()`, examples can be added in future releases

---

## License

MIT © [Bigetion](https://github.com/Bigetion)

---

## Mixed Tailwind + Raw CSS in `tw()`

> New in v5 — what Tailwind alone can't do.

Every style config object in `tw()` now accepts **raw CSS properties** alongside Tailwind utility classes. Use `tw:` for Tailwind, and any standard CSS property (kebab-case or camelCase) for exact values Tailwind can't express.

```js
import { tw } from 'tailwind-to-style';

// tw: handles Tailwind, raw CSS handles the rest
const label = tw({
  tw: 'inline-flex items-center font-semibold',
  'font-size': '11px',          // exact value — not in Tailwind scale
  'letter-spacing': '0.1em',    // exact value
  'text-transform': 'uppercase',
  color: 'var(--text-muted)',   // CSS variable
});
```

### Key rules

| Key | Meaning |
|-----|---------|
| `tw` | Tailwind utility classes (preferred shorthand, replaces `_`) |
| `_` | Legacy alias for `tw` — still supported |
| kebab-case property | Raw CSS — `'font-size'`, `'border-radius'`, `'box-shadow'` |
| camelCase property | Raw CSS — `fontSize`, `borderRadius`, `boxShadow` |
| `--var-name` | CSS custom property |
| `hover`, `focus`, `dark`… | Tailwind pseudo shorthands |
| `sm`, `md`, `lg`… | Responsive breakpoint shorthands |
| `'&:hover'`, `'&::before'`… | Arbitrary nested CSS selectors |

### Works everywhere

Mixed CSS works in all `tw()` modes — basic, variants, slots, and inside `register()`.

```js
// In variants
const btn = tw({
  name: 'btn',
  base: {
    tw: 'inline-flex items-center font-semibold rounded-lg transition-all',
    'font-family': 'inherit',   // raw CSS
    'line-height': '1',
  },
  variants: {
    size: {
      sm: { tw: 'px-3 py-1.5', 'font-size': '12px' },   // mixed
      md: { tw: 'px-5 py-2.5', 'font-size': '14px' },
      lg: { tw: 'px-7 py-3.5', 'font-size': '16px' },
    },
  },
});

// In slots
const card = tw({
  name: 'card',
  slots: {
    root: {
      tw: 'rounded-2xl overflow-hidden',
      'box-shadow': '0 4px 24px rgba(0,0,0,.08)',   // raw CSS
    },
    body: {
      tw: 'px-6 py-4',
      'line-height': '1.6',   // raw CSS
    },
  },
});
```

### Pseudo shorthands + raw CSS together

```js
const input = tw({
  tw: 'w-full px-4 py-2 border rounded-lg transition-all',
  'font-family': 'inherit',
  'font-size': '14px',
  hover: 'border-gray-400',          // pseudo shorthand
  focus: 'ring-2 ring-blue-500',
  dark: 'bg-gray-900 text-white',    // media shorthand
  md: 'text-base',                    // responsive shorthand
  '&:disabled': { tw: 'opacity-50 cursor-not-allowed' }, // nested selector
});
```

---

## `tailwind-to-style/register`

A semantic class registration API — Bootstrap-style clean HTML, Tailwind power under the hood.

```js
import { register, cx, cn } from 'tailwind-to-style/register';
```

### Why `register`?

```html
<!-- ❌ Tailwind: hard to read, duplicated everywhere -->
<button class="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all">
  Submit
</button>

<!-- ✅ register(): define once, clean HTML everywhere -->
<button class="btn btn-primary btn-md">Submit</button>
```

---

### `register(className, config)`

Define a semantic CSS class. Injects CSS into the DOM automatically.

#### Simple form

```js
register('btn', {
  tw: 'px-5 py-2.5 rounded-lg font-semibold transition-all cursor-pointer',
  'font-family': 'inherit',
  'background-color': '#3b82f6',
  color: '#fff',
  '&:hover': {
    'background-color': '#2563eb',
    transform: 'translateY(-1px)',
  },
});

// <button class="btn">Click me</button>
```

#### Complex form — `base` + `modifiers`

`modifiers` auto-generates `.className-key` for each entry:

```js
register('btn', {
  base: {
    tw: 'inline-flex items-center font-semibold rounded-lg transition-all',
    'font-family': 'inherit',
    'line-height': '1',
  },
  modifiers: {
    // colors      → .btn-primary, .btn-danger
    primary: { tw: 'bg-indigo-600 text-white hover:bg-indigo-700' },
    danger:  { tw: 'bg-red-600 text-white hover:bg-red-700' },

    // sizes       → .btn-sm, .btn-md, .btn-lg
    sm:  { tw: 'px-3 py-1.5', 'font-size': '12px' },
    md:  { tw: 'px-5 py-2.5', 'font-size': '14px' },
    lg:  { tw: 'px-7 py-3.5', 'font-size': '16px' },

    // shapes      → .btn-pill, .btn-square
    pill:   { 'border-radius': '9999px' },
    square: { 'border-radius': '0' },
  },
});

// Clean HTML — compose modifiers freely
// <button class="btn btn-primary btn-lg btn-pill">Get Started</button>
// <button class="btn btn-danger btn-sm">Delete</button>
```

#### `extend` — inherit from another class

```js
register('btn', { tw: 'px-4 py-2 rounded font-medium' });

// Inherits all btn styles, then adds its own
register('icon-btn', {
  extend: 'btn',
  tw: 'w-10 h-10 p-0 flex items-center justify-center',
});

// Multi-level extend
register('fab', {
  extend: 'icon-btn',  // inherits btn + icon-btn
  tw: 'rounded-full shadow-lg',
  'background-color': '#6366f1',
  color: '#fff',
});
```

#### `@keyframes` support

```js
register('@keyframes fadeUp', {
  from: { opacity: '0', transform: 'translateY(24px)' },
  to:   { opacity: '1', transform: 'translateY(0)' },
});

register('@keyframes pulse', {
  '0%, 100%': { opacity: '1' },
  '50%':      { opacity: '0.4' },
});
```

#### Global selectors — `:root`, `*`, element tags

```js
// CSS custom properties on :root
register(':root', {
  '--brand': '#6366f1',
  '--brand-dark': '#4f46e5',
  '--radius': '10px',
});

// Universal reset
register('*', { 'box-sizing': 'border-box', margin: '0', padding: '0' });

// Element tag styling
register('body', {
  tw: 'text-gray-900 antialiased',
  'font-family': "system-ui, -apple-system, sans-serif",
});
```

---

### `register.group(baseName, components)`

Register multiple related classes at once. `root` key → `.baseName`, others → `.baseName-key`.

```js
register.group('card', {
  root: {
    tw: 'rounded-2xl overflow-hidden bg-white',
    'box-shadow': '0 4px 24px rgba(0,0,0,.08)',
  },
  header: {
    tw: 'px-6 py-4 border-b border-gray-100 font-semibold',
    'font-size': '16px',
  },
  body:   { tw: 'px-6 py-4', 'line-height': '1.6' },
  footer: { tw: 'px-6 py-4 border-t bg-gray-50 text-sm text-gray-500' },
});

// Generates: .card  .card-header  .card-body  .card-footer
```

```html
<div class="card">
  <div class="card-header">Title</div>
  <div class="card-body">Content goes here.</div>
  <div class="card-footer">Footer</div>
</div>
```

---

### `register.all(map)`

Register multiple classes at once from a plain object — sugar for calling `register()` on each key. Each class still gets its own registry entry.

```js
register.all({
  ':root':     { '--brand': '#6366f1', '--brand-dark': '#4f46e5' },
  '*':         { 'box-sizing': 'border-box', margin: '0', padding: '0' },
  'body':      { tw: 'text-gray-900 antialiased' },
  'container': { tw: 'mx-auto w-full px-6', 'max-width': '1200px' },
  'section':   { tw: 'py-24' },
  'heading-xl':{ tw: 'font-extrabold tracking-tight', 'font-size': 'clamp(2.5rem, 6vw, 4rem)' },
  'lead':      { tw: 'text-lg leading-relaxed text-gray-500' },
});
```

---

### `register.extractCSS()`

Extract all registered CSS as a string — useful for SSR.

```js
// Server-side rendering
const html = renderApp();
const css = register.extractCSS();

res.send(`
  <html>
    <head><style>${css}</style></head>
    <body>${html}</body>
  </html>
`);
```

---

### `register.reset()`

Clear all registered styles. Useful for testing.

```js
register.reset();
```

---

### `cx()` / `cn()`

Conditionally merge class names. `cn` is an alias of `cx` for shadcn/ui compatibility.

```js
import { cx, cn } from 'tailwind-to-style/register';

cx('btn', isActive && 'btn-active', { 'btn-lg': isLarge })
// → "btn btn-active btn-lg"

cn('btn btn-primary', isLoading && 'opacity-50 cursor-not-allowed')
// → "btn btn-primary opacity-50 cursor-not-allowed"
```

---

### FOUC Prevention

When using `register()` in the browser, add this to your HTML to prevent unstyled content flash:

```html
<head>
  <!-- Hide body until JS injects all styles -->
  <style>body { opacity: 0 }</style>
  <noscript><style>body { opacity: 1 }</style></noscript>
  <script type="module" src="./main.js"></script>
</head>
```

```js
// main.js — add at the end, after all register() calls
requestAnimationFrame(() => {
  document.body.style.cssText += ';transition:opacity 200ms ease;opacity:1';
});
```

All `register()` calls are synchronous. By the time `requestAnimationFrame` fires, the browser has already parsed and applied the injected `<style>` tag — guaranteeing zero FOUC.

---

### Complete Example

```js
import { register, cx } from 'tailwind-to-style/register';

// Tokens
register.all({
  ':root': { '--brand': '#6366f1', '--brand-dark': '#4f46e5' },
  '*':     { 'box-sizing': 'border-box', margin: '0', padding: '0' },
  'body':  { tw: 'text-gray-900 antialiased', 'font-family': 'system-ui, sans-serif' },
});

// Keyframes
register('@keyframes fadeIn', {
  from: { opacity: '0', transform: 'translateY(8px)' },
  to:   { opacity: '1', transform: 'translateY(0)' },
});

// Components
register('btn', {
  base: {
    tw: 'inline-flex items-center font-semibold rounded-lg transition-all cursor-pointer border-0',
    'font-family': 'inherit',
    'line-height': '1',
  },
  modifiers: {
    primary: { tw: 'text-white', 'background-color': 'var(--brand)' },
    outline: { tw: 'bg-transparent border border-current', color: 'var(--brand)' },
    sm:   { tw: 'px-3 py-1.5 text-sm' },
    md:   { tw: 'px-5 py-2.5 text-sm' },
    lg:   { tw: 'px-7 py-3.5 text-base' },
    pill: { 'border-radius': '9999px' },
  },
});

register.group('card', {
  root:   { tw: 'bg-white rounded-2xl border border-gray-200', 'box-shadow': '0 2px 12px rgba(0,0,0,.07)' },
  header: { tw: 'px-6 py-4 border-b font-semibold', 'font-size': '16px' },
  body:   { tw: 'px-6 py-4', 'line-height': '1.6' },
});

// Reveal page smoothly
requestAnimationFrame(() => {
  document.body.style.cssText += ';transition:opacity 200ms;opacity:1';
});
```

```html
<button class="btn btn-primary btn-lg btn-pill">Get Started</button>
<button class="btn btn-outline btn-sm">Learn More</button>

<div class="card">
  <div class="card-header">Welcome</div>
  <div class="card-body">Build the future, faster.</div>
</div>
```
