# tailwind-to-style

[📦 View on npm](https://www.npmjs.com/package/tailwind-to-style)
| [🌐 Landing Page](https://bigetion.github.io/tailwind-to-style/landing.html)
| [🛝 Playground](https://bigetion.github.io/tailwind-to-style/sandbox.html)

[![npm version](https://img.shields.io/npm/v/tailwind-to-style.svg)](https://www.npmjs.com/package/tailwind-to-style)
[![Build Status](https://github.com/Bigetion/tailwind-to-style/workflows/CI%2FCD/badge.svg)](https://github.com/Bigetion/tailwind-to-style/actions)
[![npm downloads](https://img.shields.io/npm/dm/tailwind-to-style.svg)](https://www.npmjs.com/package/tailwind-to-style)
[![bundle size](https://img.shields.io/bundlephobia/minzip/tailwind-to-style)](https://bundlephobia.com/package/tailwind-to-style)
[![license](https://img.shields.io/npm/l/tailwind-to-style.svg)](https://github.com/Bigetion/tailwind-to-style/blob/main/LICENSE)

> **Runtime Tailwind CSS to inline styles converter.**
> Zero build step. SSR-ready. Tree-shakeable. Works everywhere — React, Vue, Svelte, Node.js, vanilla JS.

---

## Table of Contents

- [Why tailwind-to-style?](#why-tailwind-to-style)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core API](#core-api)
  - [`tws()` — Tailwind to Inline Styles](#tws--tailwind-to-inline-styles)
  - [`styled()` — The Unified API](#styled--the-unified-api)
  - [`cx()` — Conditional Class Builder](#cx--conditional-class-builder)
- [Configuration & Plugins](#configuration--plugins)
  - [`configure()` — Custom Theme](#configure--custom-theme)
  - [Plugin System](#plugin-system)
- [SSR (Server-Side Rendering)](#ssr-server-side-rendering)
- [Animation System](#animation-system)
- [Tree-Shakeable Imports](#tree-shakeable-imports)
- [Preflight CSS](#preflight-css)
- [Framework Integration](#framework-integration)
- [Performance](#performance)
- [Debugging & Logging](#debugging--logging)
- [Comparison](#comparison)
- [Migration](#migration)
- [Contributing](#contributing)
- [Support](#-support)
- [License](#license)

---

## Why tailwind-to-style?

| Feature | Description |
|---|---|
| **Zero Build Step** | No PostCSS, no compilation — just JavaScript |
| **Framework Agnostic** | React, Vue, Svelte, vanilla JS |
| **Full Tailwind Support** | All utilities, responsive, pseudo-states, arbitrary values |
| **SCSS-like Nesting** | `styled.css()` for complex nested selector-based styles |
| **Variant System** | Type-safe component variants like CVA/tailwind-variants via `styled()` |
| **Unified CSS-in-JS** | `styled()` — one API for basic / variants / slots / raw CSS |
| **Conditional Classes** | Built-in `cx()` utility (like clsx/classnames) |
| **SSR Support** | Server-side rendering with `startSSR()`/`stopSSR()` |
| **@css Directive** | Inject raw CSS for vendor-specific or complex properties |
| **Customizable** | Extend theme with colors, spacing, fonts, plugins |
| **TypeScript** | Full type definitions with generics for autocomplete |
| **Tree-Shakeable** | Import only what you need — reduce bundle by 50-70% |
| **Lightweight** | ~12KB minified, zero runtime dependencies |
| **Lightning Fast** | Pre-compiled regex + multi-level LRU caching |

---

## Installation

```bash
npm install tailwind-to-style
```

```bash
yarn add tailwind-to-style
```

```bash
pnpm add tailwind-to-style
```

**CDN (browser):**

```html
<script src="https://unpkg.com/tailwind-to-style"></script>
<script>
  const { tws, styled, cx } = tailwindToStyle
</script>
```

---

## Quick Start

```javascript
import { tws, styled, cx } from 'tailwind-to-style'

// 1. Inline styles (unique superpower)
const style = tws('bg-blue-500 text-white p-4 rounded-lg', true)
// → { backgroundColor: '#3b82f6', color: '#fff', padding: '1rem', borderRadius: '0.5rem' }

// 2. Component with auto-generated className + injected CSS
const btn = styled({
  name: 'btn',
  base: 'px-4 py-2 rounded-lg font-medium',
  hover: 'bg-blue-600',
})
// → "btn-a1b2c3d4"  (className string, CSS auto-injected)

// 3. Component variants (like CVA / tailwind-variants)
const button = styled({
  name: 'btn',
  base: 'px-4 py-2 rounded-lg font-medium',
  variants: {
    color: { primary: 'bg-blue-500 text-white', danger: 'bg-red-500 text-white' },
    size:  { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
  },
  defaultVariants: { color: 'primary', size: 'md' },
})
button({ color: 'danger', size: 'lg' })  // → "btn-a1b2c3d4 btn-a1b2c3d4--color-danger btn-a1b2c3d4--size-lg"

// 4. Multi-part components (slots)
const card = styled({
  name: 'card',
  slots: {
    root:   'bg-white rounded-xl shadow-lg',
    header: 'px-6 py-4 border-b',
    body:   'px-6 py-4',
  },
})
const classes = card()
// classes.root   → "card__root-..."
// classes.header → "card__header-..."

// 5. Raw CSS injection (replaces twsx)
styled.css({
  '.card': 'bg-white p-6 rounded-xl',
  '.card:hover': 'shadow-xl',
  '@media (min-width: 768px)': { '.card': 'grid-cols-2' },
})

// 6. Conditional classes
cx('p-4', isActive && 'bg-blue-500', { 'opacity-50': isDisabled })
// → 'p-4 bg-blue-500'
```

---

## Core API

### `tws()` — Tailwind to Inline Styles

Converts Tailwind CSS class strings into CSS string or JSON style objects at runtime.

```javascript
import { tws } from 'tailwind-to-style'

// CSS string (default)
tws('bg-blue-500 p-4 rounded-lg')
// → "background-color: #3b82f6; padding: 1rem; border-radius: 0.5rem;"

// JSON object (pass `true` as 2nd argument)
tws('flex items-center gap-4', true)
// → { display: 'flex', alignItems: 'center', gap: '1rem' }
```

**Supported features:**

```javascript
// Responsive breakpoints
tws('text-sm md:text-base lg:text-lg')

// Pseudo-states
tws('bg-blue-500 hover:bg-blue-600 focus:ring-2')

// Arbitrary values
tws('w-[123px] text-[#abc] mt-[2.5rem] grid-cols-[1fr,2fr]')

// Important modifier
tws('!bg-red-500 !text-white')

// Negative values
tws('-mt-4 -translate-x-2')

// Opacity modifier
tws('bg-blue-500/50 text-black/75')

// Decimal spacing
tws('p-0.5 m-1.5 gap-2.5')
```

**Use in React:**

```jsx
<div style={tws('flex items-center gap-4 bg-white p-6 rounded-xl shadow-md', true)}>
  <h1 style={tws('text-2xl font-bold text-gray-900', true)}>Hello</h1>
</div>
```

---

### `styled()` — The Unified API

> **Satu API yang powerful > Enam API yang confusing.**
>
> `styled()` menggantikan `twsx()`, `twsxVariants()`, `twsxClassName()`, dan `tw()` — semua kebutuhan CSS-in-JS, variant, slot, dan atomic class dalam satu API yang auto-detect mode.

```javascript
import { styled } from 'tailwind-to-style'
```

**Auto-detection mode:**
- **Basic** (no `variants` / no `slots`) → returns `className` string
- **Variants** (has `variants`) → returns selector function
- **Slots** (has `slots`) → returns selector function with slot accessors

---

#### Basic Mode — Single className + auto-injected CSS

```javascript
const button = styled({
  name: 'btn',
  base: 'px-4 py-2 bg-blue-500 text-white rounded-lg',
  hover: 'bg-blue-600',
  focus: 'ring-2 ring-blue-500',
  active: 'bg-blue-700',
  dark: 'bg-blue-400',
})
// → "btn-a1b2c3d4"  (className string)

// Usage
<button class="${button}">Click me</button>
```

**Supported shorthands:**

| Shorthand | Expands To | Example |
|---|---|---|
| `hover` | `&:hover` | `hover: 'bg-blue-600'` |
| `focus` | `&:focus` | `focus: 'ring-2'` |
| `active` | `&:active` | `active: 'bg-blue-700'` |
| `disabled` | `&:disabled` | `disabled: 'opacity-50'` |
| `dark` | `@media (prefers-color-scheme: dark)` | `dark: 'bg-gray-900'` |
| `md`, `lg`, `xl` | `@media (min-width: ...)` | `md: 'text-lg'` |
| `@container` | `@container (...)` | `@container: 'grid-cols-2'` |

**Nested selectors** — child elements & pseudo-elements:

```javascript
const card = styled({
  name: 'card',
  base: 'bg-white rounded-xl shadow-lg',
  '&:hover': 'shadow-xl',
  '&.active': 'ring-2 ring-blue-500',
  '> .title': 'text-xl font-bold',
  '.icon': 'w-5 h-5',
})
```

---

#### Variants Mode — Type-safe component variants

```javascript
const button = styled({
  name: 'btn',
  base: 'px-4 py-2 font-medium rounded-lg transition-colors',
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: '',
    }
  },
  compoundVariants: [
    { variant: 'primary', size: 'lg', class: 'shadow-lg' },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
})

// Usage — returns class name string
button()                                    // base only
button({ variant: 'secondary', size: 'lg' }) // base + variant classes
button({ disabled: true })                  // base + disabled variant
```

**Responsive variants:**

```javascript
const button = styled({
  name: 'btn',
  base: 'px-4 py-2',
  variants: {
    size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
  },
  responsiveVariants: ['size'],  // auto-generates md:size-lg, etc.
})

button({ size: { initial: 'sm', md: 'md', lg: 'lg' } })
```

---

### `cx()` — Conditional Class Builder

A built-in utility for conditionally joining class names — replaces `clsx`/`classnames`:

```javascript
import { cx } from 'tailwind-to-style'

// Strings
cx('bg-blue-500', 'text-white')
// → 'bg-blue-500 text-white'

// Conditionals
cx('p-4', isActive && 'bg-blue-500', isDisabled && 'opacity-50')
// → 'p-4 bg-blue-500'

// Object syntax
cx('p-4', { 'bg-blue-500': isActive, 'opacity-50': isDisabled })
// → 'p-4 bg-blue-500'

// Arrays
cx(['p-4', 'bg-white'], isActive && ['ring-2', 'ring-blue-500'])
// → 'p-4 bg-white ring-2 ring-blue-500'

// Combined with tws()
const styles = tws(cx('p-4', isLarge && 'p-8', { 'bg-blue-500': isPrimary }))
```

**`cx.with()` — Base class factory:**

```javascript
const btnClass = cx.with('px-4 py-2 rounded font-medium transition-colors')

btnClass('bg-blue-500 text-white')
// → 'px-4 py-2 rounded font-medium transition-colors bg-blue-500 text-white'

btnClass({ 'opacity-50': disabled })
// → 'px-4 py-2 rounded font-medium transition-colors opacity-50'
```

---

#### Slots Mode — Multi-part components

```javascript
const card = styled({
  name: 'card',
  slots: {
    root:   'bg-white rounded-xl shadow-lg overflow-hidden',
    header: 'px-6 py-4 border-b border-gray-200',
    title:  'text-xl font-bold text-gray-900',
    body:   'px-6 py-4',
    footer: 'px-6 py-4 border-t border-gray-200',
  },
  variants: {
    variant: {
      elevated: { root: 'shadow-2xl' },
      outlined: { root: 'shadow-none border-2 border-gray-200' },
    },
  },
  defaultVariants: { variant: 'elevated' },
})

// Usage
const classes = card({ variant: 'outlined' })
// classes.root   → "card-...__root card-...__root--variant-outlined"
// classes.header → "card-...__header"
// classes.title  → "card-...__title"
// classes.body   → "card-...__body"
// classes.footer → "card-...__footer"
```

---

#### `styled.css()` — Raw CSS Injection

For global styles, media queries, container queries, and complex selectors — replaces the old `twsx()` direct-usage pattern:

```javascript
// Inject raw nested CSS (auto-injected by default)
styled.css({
  '.card': 'bg-white p-6 rounded-xl',
  '.card:hover': 'shadow-xl',
  '.card > .title': 'text-xl font-bold',

  '@media (min-width: 768px)': {
    '.card': 'grid-cols-2',
  },

  '@container (min-width: 400px)': {
    '.item': 'grid-cols-2',
  },

  '@scope (.card) to (.content)': {
    '.title': 'text-xl font-bold',
  },
})

// Returns CSS string without injecting
const css = styled.css({ '.box': 'p-4' }, { inject: false })
```

---

#### Namespace Methods

All methods below are available on `styled`:

| Category | Method | Description |
|----------|--------|-------------|
| **Config** | `styled.config(options)` | Set global options (prefix, hash, hashLength) |
| | `styled.getConfig()` | Get current configuration |
| **Tokens** | `styled.defineTokens(tokens)` | Define design tokens |
| | `styled.getTokens()` | Get all defined tokens |
| | `styled.setToken(path, value)` | Set a single token value |
| **Themes** | `styled.createTheme(name, tokens)` | Create a named theme |
| | `styled.setTheme(name)` | Activate a theme |
| | `styled.getTheme()` \| `getThemes()` | Get active / all themes |
| **Extend** | `styled.extend(base, extension)` | Extend an existing config |
| | `styled.compose(...configs)` | Compose multiple configs |
| | `styled.merge(...classes)` | Merge class values (like cx) |
| **Animation** | `styled.defineAnimation(name, config)` | Register custom animation |
| | `styled.getAnimations()` | Get all registered animations |
| **SSR** | `styled.getCSS(className)` | Get CSS for a className |
| | `styled.getAllCSS()` | Get all generated CSS |
| | `styled.extractCSS()` | Extract as `<style>` tag |
| **Cache** | `styled.clearCache()` | Clear all caches |
| | `styled.getCacheStats()` | Get cache statistics |

```javascript
// Global configuration
styled.config({ prefix: 'my-app', hash: false, hashLength: 8 })

// Design tokens
styled.defineTokens({ colors: { primary: '#3b82f6' } })
const btn = styled({ base: 'bg-$colors.primary' })

// Theme system
styled.createTheme('dark', { background: '#1f2937', text: '#f9fafb' })
styled.setTheme('dark')

// Extend & compose
const iconButton = styled.extend(button, {
  base: 'p-0 aspect-square',
  variants: { size: { sm: 'w-8 h-8' } },
})

// SSR
const css = styled.getAllCSS()
const styleTag = styled.extractCSS()
```

---

### `cx()` — Conditional Class Builder

A built-in utility for conditionally joining class names — replaces `clsx`/`classnames`:

```javascript
import { cx } from 'tailwind-to-style'

// Strings
cx('bg-blue-500', 'text-white')
// → 'bg-blue-500 text-white'

// Conditionals
cx('p-4', isActive && 'bg-blue-500', isDisabled && 'opacity-50')
// → 'p-4 bg-blue-500'

// Object syntax
cx('p-4', { 'bg-blue-500': isActive, 'opacity-50': isDisabled })
// → 'p-4 bg-blue-500'

// Arrays
cx(['p-4', 'bg-white'], isActive && ['ring-2', 'ring-blue-500'])
// → 'p-4 bg-white ring-2 ring-blue-500'

// Combined with styled variants
const button = styled({
  name: 'btn',
  base: 'px-4 py-2 rounded-lg',
  variants: { color: { primary: 'bg-blue-500', danger: 'bg-red-500' } },
})

const classes = cx(button({ color: 'danger' }), 'shadow-lg', { 'opacity-50': disabled })
```

**`cx.with()` — Base class factory:**

```javascript
const btnClass = cx.with('px-4 py-2 rounded font-medium transition-colors')

btnClass('bg-blue-500 text-white')
// → 'px-4 py-2 rounded font-medium transition-colors bg-blue-500 text-white'

btnClass({ 'opacity-50': disabled })
// → 'px-4 py-2 rounded font-medium transition-colors opacity-50'
```

**When to use which:**

| Function | Use Case | Example |
|----------|----------|---------|
| `tws()` | Quick inline styles (zero build) | `style={tws('p-4 bg-blue', true)}` |
| `styled()` | Components with className + CSS | `className={button({ size: 'lg' })}` |
| `cx()` | Conditional class joining | `cx('p-4', isActive && 'bg-blue')` |

---

## Configuration & Plugins

### `configure()` — Custom Theme

Extend the default Tailwind theme with custom colors, spacing, fonts, and more.

```javascript
import { configure } from 'tailwind-to-style'

configure({
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        accent: '#f59e0b',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
})

// Now use custom values
tws('bg-brand-500 text-brand-50 p-128 font-sans')
```

**Config API:**

| Function | Description |
|---|---|
| `configure(config)` | Apply custom configuration |
| `getConfig()` | Get current configuration |
| `resetConfig()` | Reset to defaults |
| `clearConfigCache()` | Clear cached config lookups |

### Plugin System

Create reusable plugins to extend the utility set:

```javascript
import { configure, createPlugin, createUtilityPlugin } from 'tailwind-to-style'

// Simple plugin — static utilities
const textShadow = createPlugin('text-shadow', {
  utilities: {
    'text-shadow-sm': { textShadow: '0 1px 2px rgba(0,0,0,0.05)' },
    'text-shadow-md': { textShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    'text-shadow-lg': { textShadow: '0 4px 8px rgba(0,0,0,0.15)' },
  },
})

// Dynamic plugin — value-based utilities
const glass = createUtilityPlugin('glass', {
  prefix: 'glass',
  values: { sm: '4px', md: '8px', lg: '16px' },
  formatter: (value) => ({
    backdropFilter: `blur(${value})`,
    backgroundColor: 'rgba(255,255,255,0.1)',
  }),
})

configure({ plugins: [textShadow, glass] })

// Now use custom utilities
tws('text-shadow-md glass-lg')
```

---

## SSR (Server-Side Rendering)

Collect CSS during server-side rendering instead of injecting into the DOM:

```javascript
import { startSSR, stopSSR, getSSRStyles, styled } from 'tailwind-to-style'

// 1. Start collecting
startSSR()

// 2. Render your app (styled() collects CSS instead of injecting)
styled.css({ '.card': 'bg-white p-6 rounded-lg shadow-md' })
styled.css({ '.btn': 'bg-blue-500 text-white px-4 py-2 rounded' })
const html = renderToString(<App />)

// 3. Get collected CSS
const css = stopSSR()

// 4. Inject into HTML response
const fullHtml = `
  <html>
    <head><style>${css}</style></head>
    <body>${html}</body>
  </html>
`
```

**SSR API:**

| Function | Description |
|---|---|
| `startSSR()` | Begin collecting CSS |
| `stopSSR()` | Stop collecting, return all CSS as string |
| `getSSRStyles()` | Peek at collected CSS without stopping |
| `IS_BROWSER` | `true` in browser environment |
| `IS_SERVER` | `true` in Node.js/server environment |

### Advanced SSR Collector

For more control over SSR CSS collection:

```javascript
import { createSSRCollector } from 'tailwind-to-style'

// Create collector with options
const ssr = createSSRCollector({
  dedupe: true,   // Remove duplicate rules
  minify: true,   // Minify output CSS
  sort: true,     // Sort by specificity
})

// Render app
const html = renderToString(<App />)

// Extract CSS
const css = ssr.extractRaw()                    // Raw CSS string
const styleTag = ssr.extract({ id: 'ssr-css' }) // <style id="ssr-css">...</style>

// Or extract critical CSS (above-the-fold)
const { critical, rest, stats } = ssr.extractCritical({ maxSize: 14000 })
// critical: CSS under 14KB limit
// rest: remaining CSS to lazy-load
// stats: { criticalSize, criticalCount, totalCount }

// Utilities
ssr.peek()       // Preview CSS without stopping
ssr.count        // Number of rules collected
ssr.uniqueCount  // Unique rules (after dedupe)
ssr.clear(true)  // Clear and restart collecting
ssr.getStats()   // { ruleCount, uniqueCount, totalSize, minifiedSize }
```

---

## Animation System

### Built-in CSS Animations

Tailwind animation utilities work out of the box:

```javascript
tws('animate-spin')    // → animation: spin 1s linear infinite
tws('animate-bounce')  // → animation: bounce 1s infinite
tws('animate-pulse')   // → animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
tws('animate-ping')    // → animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite
```

### Programmatic Animations (Web Animations API)

For interactive animations with full control:

```javascript
import { animate, chain, stagger, parallel, transition } from 'tailwind-to-style'

// Single element animation
const ctrl = animate(element, 'fadeIn', { duration: 300 })
ctrl.pause()   // Pause
ctrl.play()    // Resume
ctrl.reverse() // Reverse
ctrl.cancel()  // Cancel
await ctrl.finished // Wait for completion

// Sequential animations
await chain(element, ['fadeIn', 'slideUp', 'pulse'])

// With custom options per step
await chain(element, [
  'fadeIn',
  { name: 'slideUp', delay: 200 },
  { name: 'pulse', options: { iterations: 2 } }
])

// Staggered animations (lists, grids)
stagger('.card', 'fadeIn', {
  delay: 50,           // 50ms between each
  from: 'start',       // 'start' | 'end' | 'center' | 'random'
  onAllComplete: () => console.log('Done!')
})

// Parallel animations on multiple elements
await parallel([el1, el2, el3], 'fadeIn')

// Transition between states
transition(element, 
  { opacity: 0, transform: 'scale(0.9)' },  // from
  { opacity: 1, transform: 'scale(1)' },    // to
  { duration: 300, easing: 'ease-out' }
)
```

### Animation Presets

```javascript
import { ANIMATION_PRESETS, EASING } from 'tailwind-to-style'

// Available presets
// fadeIn, fadeOut, slideUp, slideDown, slideLeft, slideRight,
// zoomIn, zoomOut, bounce, shake, pulse, spin, flipX, flipY,
// enterScale, exitScale, wiggle, heartbeat

// Easing presets
// linear, ease, easeIn, easeOut, easeInOut,
// spring, springLight, springMedium, springHeavy,
// smooth, smoothIn, smoothOut, bounce, elastic
```

### Custom Keyframes

```javascript
import { createKeyframes, clearKeyframes, registerPreset } from 'tailwind-to-style'

// Create custom keyframes (auto-injects CSS)
const animationValue = createKeyframes('myFade', {
  '0%': { opacity: 0, transform: 'translateY(-10px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' }
}, { duration: 400, easing: 'ease-out' })
// → "myFade 400ms ease-out forwards"

// Register as reusable preset
registerPreset('myFade', {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 400 }
})

// Use it
animate(element, 'myFade')

// Cleanup
clearKeyframes()
```

### Animation Utilities

```javascript
import { 
  cancelAllAnimations,
  getActiveAnimationCount, 
  isAnimationSupported,
  getPresetNames
} from 'tailwind-to-style'

cancelAllAnimations()         // Stop all running animations
getActiveAnimationCount()     // Number of active animations
isAnimationSupported()        // Check Web Animations API support
getPresetNames()              // List all available preset names
```

---

## Tree-Shakeable Imports

Import only what you need to reduce bundle size by **50-70%**:

```javascript
// Individual imports (recommended for production)
import { tws } from 'tailwind-to-style/tws'          // ~3KB
import { styled } from 'tailwind-to-style/styled'    // ~8KB
import { cx } from 'tailwind-to-style/cx'            // <1KB

// Full import (everything)
import { tws, styled, cx } from 'tailwind-to-style'  // ~12KB
```

| Import Path | Includes | Size (minified) |
|---|---|---|
| `tailwind-to-style` | `tws()`, `styled()`, `cx()` + all | ~12KB |
| `tailwind-to-style/tws` | `tws()` only | ~3KB |
| `tailwind-to-style/styled` | `styled()` + `styled.css()` | ~8KB |
| `tailwind-to-style/cx` | `cx()` | <1KB |
| `tailwind-to-style/utils` | Logger, LRUCache, error handler | ~2KB |

> **Legacy paths** (`twsx`, `twsx-variants`, `classname`) masih tersedia untuk backward compatibility, tapi direkomendasikan migrasi ke `styled()`. |

All sub-paths provide ESM + CJS bundles with TypeScript type definitions.

### Utility Exports

```javascript
import { 
  // Debounced versions (for rapid updates)
  debouncedTws,    // Debounced tws() - 50ms delay
  
  // Performance utilities
  performanceUtils,
  
  // Error handling
  TwsError,
  onError,
  handleError,
  
  // Cache utilities
  LRUCache,
  getTailwindCache,
  resetTailwindCache,
  
  // Logging
  logger,
  Logger,
} from 'tailwind-to-style'

// Debounced functions - useful for user input
const handleInput = (value) => {
  debouncedTws(`w-[${value}px]`, true)  // Won't spam during typing
}

// Error handling
const unsubscribe = onError((error) => {
  console.error('TWS Error:', error.message, error.context)
  sendToErrorTracking(error)
})

// Custom error
const error = handleError(new Error('Invalid class'), { className: 'invalid' })
// → TwsError with context and timestamp

// LRU Cache (bounded Map)
const cache = new LRUCache(1000)  // Max 1000 items
cache.set('key', 'value')
cache.get('key')  // → 'value'
cache.has('key')  // → true
cache.size        // → 1

// Logger
logger.setLevel('debug')  // 'debug' | 'info' | 'warn' | 'error' | 'silent'
logger.debug('Processing class:', className)
```

---

## Preflight CSS

For best results, import Tailwind's preflight (base/reset styles):

```javascript
import 'tailwind-to-style/preflight.css'
```

```html
<!-- Or in HTML -->
<link rel="stylesheet" href="node_modules/tailwind-to-style/preflight.css">
```

Provides consistent box-sizing, reset margins/paddings, normalized form elements, and better default font rendering. Skip this if you're already using Tailwind CSS in your project.

---

## Framework Integration

### React

```jsx
import { tws, styled, cx } from 'tailwind-to-style'

// Define component styles outside component (stable reference)
const button = styled({
  name: 'btn',
  base: 'px-4 py-2 bg-blue-500 text-white rounded-lg font-medium',
  hover: 'bg-blue-600',
})

const card = styled({
  name: 'card',
  slots: {
    root: 'bg-white rounded-xl shadow-md p-6',
    title: 'text-xl font-bold text-gray-900',
  },
})

function App() {
  const cardClasses = card()

  return (
    <div style={tws('flex items-center gap-4', true)}>
      <button className={button}>Click me</button>
      <div className={cardClasses.root}>
        <h2 className={cardClasses.title}>Hello</h2>
      </div>
    </div>
  )
}
```

### Vue

```vue
<script setup>
import 'tailwind-to-style/preflight.css'
import { tws, styled } from 'tailwind-to-style'

// styled() at the top level of <script setup> is HMR-safe.
// When you edit the classes, Vite's HMR re-runs this block and
// the old CSS slot is replaced automatically — no hard refresh needed.
const card = styled({
  name: 'card',
  base: 'bg-white p-5 border border-gray-300 rounded-xl shadow-md',
  hover: 'shadow-xl',
})

const title = styled({
  name: 'title',
  base: 'text-xl font-bold text-gray-900 mb-3',
})
</script>

<template>
  <div :class="card">
    <div :class="title">Card Title</div>
    <p>Styled with styled() — hot reload works out of the box.</p>
  </div>
</template>
```

For simple inline styles, use `tws()` with the reactive system:

```vue
<script setup>
import { tws } from 'tailwind-to-style'
const btnStyle = tws('bg-blue-500 text-white px-4 py-2 rounded-lg', true)
</script>

<template>
  <button :style="btnStyle">Click me</button>
</template>
```

### Svelte

```svelte
<script>
  import { tws, styled } from 'tailwind-to-style'

  const btn = styled({
    name: 'btn',
    base: 'px-4 py-2 bg-blue-500 text-white rounded-lg',
    hover: 'bg-blue-600',
  })

  const inlineStyle = tws('bg-blue-500 text-white px-4 py-2 rounded-lg', true)
</script>

<button class={btn}>
  Click me (styled)
</button>

<button style={Object.entries(inlineStyle).map(([k,v]) => `${k}:${v}`).join(';')}>
  Click me (inline)
</button>
```

### Vanilla JS

```javascript
import { tws, styled } from 'tailwind-to-style'

// Inline styles
const el = document.createElement('button')
Object.assign(el.style, tws('bg-blue-500 text-white px-4 py-2 rounded-lg', true))

// Component with auto-injected CSS
const btn = styled({
  name: 'btn',
  base: 'bg-blue-500 text-white px-4 py-2 rounded-lg',
  hover: 'bg-blue-600',
})
el.className = btn

// Raw CSS injection
styled.css({
  '.card': 'bg-white p-6 rounded-lg shadow-md',
  '.card:hover': 'shadow-xl',
})
```

---

## Performance

v3.2.0 includes major performance optimizations:

- **Pre-compiled regex** — compiled once at module load, reused for every call
- **Multi-level LRU caching** — class resolution, CSS generation, config lookups
- **Bounded caches** — Maps capped at 5,000 entries, Sets at 10,000 to prevent memory leaks
- **Slot-based CSS injection** — each `styled.css()` call owns a named slot; updates rebuild the tag instead of appending, preventing HMR accumulation
- **FNV-1a hashing** — 100x faster than `JSON.stringify` for cache keys

```
Parse 10,000 classes:
  Cold:   ~12ms
  Cached: ~0.12ms  (100x faster)

Bundle sizes:
  Full import: ~12KB minified
  tws() only:  ~3KB minified
  twsx() only: ~6KB minified
```

**Performance utilities:**

```javascript
import { performanceUtils } from 'tailwind-to-style'

// View cache stats
performanceUtils.getStats()

// Clear all caches
performanceUtils.clearCaches()

// Enable performance logging
performanceUtils.enablePerformanceLogging(true)
```

---

## Debugging & Logging

Logging is disabled by default. Enable via environment variable or programmatically:

```bash
TWSX_LOG_LEVEL=debug npm start   # debug, info, warn, error, silent
```

```javascript
import { logger } from 'tailwind-to-style'

logger.setLevel('debug')
console.log(logger.getLevel()) // → 'debug'
```

| Level | Description |
|---|---|
| `debug` | Detailed processing info |
| `info` | General information |
| `warn` | Performance warnings |
| `error` | Errors only |
| `silent` | No logging (default) |

---

## Comparison

| Feature | tailwind-to-style | Tailwind CSS | CSS-in-JS | tailwind-variants |
|---|:---:|:---:|:---:|:---:|
| Build Step | None | Required | None | Required |
| Bundle Size | 3-12KB | ~80KB+ | 20-40KB | ~15KB |
| Runtime Styles | Yes | No | Yes | Partial |
| Full Tailwind Support | Yes | Yes | No | Classes only |
| SSR Support | Yes | Yes | Depends | Yes |
| Variant System | Built-in | No | No | Yes |
| Conditional Classes | `cx()` | No | No | `tv()` |
| SCSS-like Nesting | Yes | Plugins | Yes | No |
| @css Raw Injection | Yes | No | Yes | No |
| Framework Agnostic | Yes | Yes | Depends | Yes |
| Tree-Shaking | Yes | Partial | Yes | Yes |
| TypeScript Generics | Yes | Yes | Yes | Yes |
| Zero Dependencies | Yes | PostCSS | No | tailwind-merge |

---

## Migration

### Migrating ke `styled()` (dari `twsx` / `twsxVariants` / `twsxClassName`)

| Before (v3.2) | After (v3.3+) |
|---|---|
| `twsx({ '.btn': 'bg-blue-500' })` | `styled.css({ '.btn': 'bg-blue-500' })` |
| `twsxVariants('.btn', { base: '...', variants: { ... } })` | `styled({ name: 'btn', base: '...', variants: { ... } })` |
| `twsxClassName({ name: 'btn', _: '...' })` | `styled({ name: 'btn', base: '...' })` |
| `tw('flex gap-3')` | `styled({ name: 'layout', base: 'flex gap-3' })` atau pakai `cx()` |
| `twsxClassName.config(...)` | `styled.config(...)` |
| `twsxClassName.getAllCSS()` | `styled.getAllCSS()` |

### Migration from v2

See [MIGRATION.md](MIGRATION.md) for the detailed guide from v2.x to v3.x.

**Quick summary:**

| Status | API |
|---|---|
| No changes | `tws()`, `configure()` |
| New in v3.1 | `twsxVariants()` (now deprecated, use `styled()`) |
| New in v3.2 | `cx()`, SSR, tree-shakeable imports |
| New in v3.3 | `styled()` — unified API replaces `twsx`, `twsxVariants`, `twsxClassName`, `tw` |
| Removed | `tv()`, `useTwsx()`, `TwsxProvider`, CLI tools |

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for architecture overview, testing guidelines, and build output docs.

---

## 💖 Support

If you find this library helpful, consider supporting:

[☕ Buy me a coffee](https://buymeacoffee.com/bigetion)

---

## License

MIT © [Bigetion](https://github.com/Bigetion)

---

**v3.3.0** — [Changelog](CHANGELOG.md) · [Architecture](ARCHITECTURE.md) · [Migration Guide](MIGRATION.md)