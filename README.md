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
  - [`twsx()` — CSS-in-JS Engine](#twsx--css-in-js-engine)
  - [`twsxVariants()` — Component Variant System](#twsxvariants--component-variant-system)
  - [`twsxClassName()` — Unified CSS-in-JS](#twsxclassname--unified-css-in-js)
  - [`tw()` — Atomic CSS Classes](#tw--atomic-css-classes)
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
- [Migration from v2](#migration-from-v2)
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
| **SCSS-like Nesting** | `twsx()` for complex nested selector-based styles |
| **Variant System** | Type-safe component variants like CVA/tailwind-variants |
| **Unified CSS-in-JS** | `twsxClassName()` — one API for basic/variants/slots |
| **Atomic CSS Classes** | `tw()` — reusable classes with hover/responsive support |
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
  const { tws, twsx } = tailwindToStyle
</script>
```

---

## Quick Start

```javascript
import { tws, twsx, twsxVariants, cx } from 'tailwind-to-style'

// 1. Inline styles
const style = tws('bg-blue-500 text-white p-4 rounded-lg', true)
// → { backgroundColor: '#3b82f6', color: '#fff', padding: '1rem', borderRadius: '0.5rem' }

// 2. Real CSS with selectors
twsx({
  '.card': ['bg-white p-6 rounded-xl shadow-md', {
    '&:hover': 'shadow-xl',
    '> .title': 'text-xl font-bold text-gray-900',
  }]
})
// → auto-injects <style> with .card { ... } .card:hover { ... }

// 3. Component variants
const btn = twsxVariants('.btn', {
  base: 'px-4 py-2 rounded-lg font-medium',
  variants: {
    color: { primary: 'bg-blue-500 text-white', danger: 'bg-red-500 text-white' },
    size:  { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
  },
  defaultVariants: { color: 'primary', size: 'md' },
})
btn({ color: 'danger', size: 'lg' })  // → "btn btn-danger-lg"

// 4. Conditional classes
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

### `twsx()` — CSS-in-JS Engine

Generates real CSS from Tailwind classes with full selector support, SCSS-like nesting, and auto-injects a `<style>` tag into the DOM.

> **HMR-safe** — each `twsx()` call owns a stable slot in the injected style tag keyed by its top-level selectors. When you edit styles during development, the old slot is **replaced** (not appended), so changes are reflected immediately without a hard refresh.

```javascript
import { twsx } from 'tailwind-to-style'

twsx({
  '.button': [
    'bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all',
    {
      '&:hover': 'bg-blue-600 shadow-lg transform scale-105',
      '&:active': 'bg-blue-700 scale-95',
      '&:disabled': 'bg-gray-400 opacity-50 cursor-not-allowed',
      '&.large': 'px-8 py-4 text-lg',
    }
  ],

  '.card': 'bg-white rounded-xl shadow-lg overflow-hidden',
  '.card > .header': 'p-6 border-b border-gray-200',
  '.card > .body': 'p-6',

  // Media queries
  '@media (max-width: 768px)': {
    '.card': 'rounded-lg',
    '.card > .header': 'p-4',
  }
})
```

**Nesting syntax:**

| Pattern | Example | Description |
|---|---|---|
| `&:pseudo` | `'&:hover': 'bg-blue-600'` | Pseudo-classes |
| `&.modifier` | `'&.active': 'ring-2'` | Class modifiers |
| `> .child` | `'> .title': 'text-xl'` | Direct children |
| `.descendant` | `'.icon': 'w-5 h-5'` | Descendants |
| `@media` | `'@media (max-width: 768px)': { ... }` | Media queries |

**Options:**

```javascript
// Disable auto-injection (returns CSS string only)
const css = twsx({ '.btn': 'bg-blue-500 text-white' }, { inject: false })
```

#### `@css` Directive — Raw CSS Escape Hatch

For CSS that Tailwind can't express, use the `@css` directive:

**String form:**

```javascript
twsx({
  '.gradient-text': '@css { background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }',
})
```

**Object form (within arrays):**

```javascript
twsx({
  '.gradient-text': [
    'text-3xl font-bold',
    {
      '@css': {
        'background': 'linear-gradient(90deg, #ff6b6b, #feca57)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
      },
    },
  ],
})
```

---

### `twsxVariants()` — Component Variant System

A CVA-like API for building type-safe component variants. Auto-generates CSS for all combinations and returns a class name builder function.

```javascript
import { twsxVariants } from 'tailwind-to-style'

const btn = twsxVariants('.btn', {
  base: 'px-4 py-2 rounded-lg font-medium transition-all border',
  variants: {
    variant: {
      solid: 'shadow-sm',
      outline: 'bg-transparent border-2',
      ghost: 'bg-transparent border-transparent',
    },
    color: {
      primary: 'bg-blue-500 text-white border-blue-500',
      danger: 'bg-red-500 text-white border-red-500',
      neutral: 'bg-gray-100 text-gray-900 border-gray-300',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed pointer-events-none',
    },
  },
  compoundVariants: [
    { variant: 'outline', color: 'primary', class: 'bg-transparent text-blue-600 border-blue-500' },
    { variant: 'outline', color: 'danger', class: 'bg-transparent text-red-600 border-red-500' },
  ],
  defaultVariants: { variant: 'solid', color: 'primary', size: 'md' },
})

// Usage — returns class name string
btn()                                    // "btn"
btn({ color: 'danger' })                 // "btn btn-danger"
btn({ variant: 'outline', size: 'lg' })  // "btn btn-outline-lg"
```

**Nested selectors** — style child elements:

```javascript
const alert = twsxVariants('.alert', {
  base: 'p-4 rounded-lg border flex gap-3',
  variants: {
    status: {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      error: 'bg-red-50 border-red-200 text-red-800',
    },
  },
  defaultVariants: { status: 'info' },
  nested: {
    '.alert-icon': 'flex-shrink-0 mt-0.5',
    '.alert-content': 'flex-1',
    '.alert-dismiss': 'p-1 rounded hover:bg-black/10 cursor-pointer',
  }
})
// Generates: .alert .alert-icon { ... }, .alert .alert-content { ... }, etc.
```

**Class naming convention:**

| Call | Returns | Why |
|---|---|---|
| `btn()` | `"btn"` | All defaults |
| `btn({ color: 'danger' })` | `"btn btn-danger"` | One non-default |
| `btn({ variant: 'outline', color: 'danger', size: 'lg' })` | `"btn btn-outline-danger-lg"` | All non-defaults |

**TypeScript — full generics support:**

```typescript
import { twsxVariants, type VariantProps } from 'tailwind-to-style'

const button = twsxVariants('.btn', {
  base: 'px-4 py-2 rounded',
  variants: {
    variant: { solid: 'bg-blue-500', outline: 'border-2' },
    size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
  },
  defaultVariants: { variant: 'solid', size: 'md' },
})

type ButtonProps = VariantProps<typeof button>
// → { variant?: 'solid' | 'outline', size?: 'sm' | 'md' | 'lg' }
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

### `twsxClassName()` — Unified CSS-in-JS

The complete CSS-in-JS solution with automatic mode detection. Generates scoped class names with auto-injected CSS from Tailwind classes.

```javascript
import { twsxClassName, tw } from 'tailwind-to-style'
```

**Basic Mode** — Simple className generation:

```javascript
// Returns: "btn-a1b2c3d4" (or "btn" if hash: false)
const button = twsxClassName({
  name: 'btn',
  _: 'px-4 py-2 bg-blue-500 text-white rounded-lg',
  hover: 'bg-blue-600',
  focus: 'ring-2 ring-blue-500',
  active: 'bg-blue-700',
  dark: 'bg-blue-400',
})

// Usage
<button class="${button}">Click me</button>
```

**Variants Mode** — Component variants like CVA/tailwind-variants:

```javascript
const button = twsxClassName({
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
      false: 'cursor-pointer',
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

// Usage
<button class="${button()}">Default</button>
<button class="${button({ variant: 'secondary', size: 'lg' })}">Large Secondary</button>
<button class="${button({ disabled: true })}">Disabled</button>
```

**Slots Mode** — Multi-part components:

```javascript
const card = twsxClassName({
  name: 'card',
  slots: {
    root: 'bg-white rounded-xl shadow-lg overflow-hidden',
    header: 'px-6 py-4 border-b border-gray-200',
    title: 'text-xl font-bold text-gray-900',
    body: 'px-6 py-4',
    footer: 'px-6 py-4 border-t border-gray-200',
  },
  variants: {
    variant: {
      elevated: { root: 'shadow-2xl' },
      outlined: { root: 'shadow-none border-2 border-gray-200' },
    },
  },
})

// Usage
const classes = card({ variant: 'elevated' })
<div class="${classes.root}">
  <div class="${classes.header}">
    <h2 class="${classes.title}">Card Title</h2>
  </div>
  <div class="${classes.body}">Content here</div>
  <div class="${classes.footer}">Footer</div>
</div>
```

**Namespace Methods:**

| Category | Method | Description |
|----------|--------|-------------|
| **Config** | `config(options)` | Set global options (prefix, hash, hashLength) |
| | `getConfig()` | Get current configuration |
| **Tokens** | `defineTokens(tokens)` | Define design tokens |
| | `getTokens()` | Get all defined tokens |
| | `setToken(path, value)` | Set a single token value |
| **Themes** | `createTheme(name, tokens)` | Create a named theme |
| | `setTheme(name)` | Activate a theme |
| | `getTheme()` | Get active theme name |
| | `getThemes()` | Get all defined themes |
| **Extend** | `extend(base, extension)` | Extend an existing config |
| | `compose(...configs)` | Compose multiple configs |
| | `merge(...classes)` | Merge class values (like cx) |
| **Animation** | `defineAnimation(name, config)` | Register custom animation |
| | `getAnimations()` | Get all registered animations |
| **SSR** | `getCSS(className)` | Get CSS for a className |
| | `getAllCSS()` | Get all generated CSS |
| | `extractCSS()` | Extract as `<style>` tag |
| **Cache** | `clearCache()` | Clear all caches |
| | `getCacheStats()` | Get cache statistics |
| **Utility** | `tw(classes)` | Atomic CSS class generator |

```javascript
// ═══════════════════════════════════════════════════════════════
// Configuration
// ═══════════════════════════════════════════════════════════════

// Global configuration
twsxClassName.config({ prefix: 'my-app', hash: false, hashLength: 8 })
twsxClassName.getConfig()  // → { prefix: 'my-app', hash: false, ... }

// ═══════════════════════════════════════════════════════════════
// Design Tokens
// ═══════════════════════════════════════════════════════════════

// Define tokens
twsxClassName.defineTokens({
  colors: { primary: '#3b82f6', danger: '#ef4444' },
  spacing: { sm: '0.5rem', md: '1rem' },
})

// Get all tokens
twsxClassName.getTokens()  // → { colors: {...}, spacing: {...} }

// Set a single token
twsxClassName.setToken('colors.success', '#10b981')

// Use tokens in styles (use $path.to.token syntax)
const btn = twsxClassName({ _: 'bg-$colors.primary p-$spacing.md' })

// ═══════════════════════════════════════════════════════════════
// Theme System
// ═══════════════════════════════════════════════════════════════

// Create named themes
twsxClassName.createTheme('dark', { background: '#1f2937', text: '#f9fafb' })
twsxClassName.createTheme('light', { background: '#ffffff', text: '#111827' })

// Switch themes
twsxClassName.setTheme('dark')

// Get current/all themes
twsxClassName.getTheme()   // → 'dark'
twsxClassName.getThemes()  // → { dark: {...}, light: {...} }

// ═══════════════════════════════════════════════════════════════
// Extend & Compose
// ═══════════════════════════════════════════════════════════════

// Extend existing config
const iconButton = twsxClassName.extend(button, {
  base: 'p-0 aspect-square',
  variants: { size: { sm: 'w-8 h-8', md: 'w-10 h-10' } },
})

// Compose multiple configs
const combined = twsxClassName.compose(baseStyles, variants, overrides)

// Merge classes (like cx)
twsxClassName.merge('p-4', isActive && 'bg-blue-500', { 'opacity-50': disabled })

// ═══════════════════════════════════════════════════════════════
// Animations
// ═══════════════════════════════════════════════════════════════

// Define custom animation preset
twsxClassName.defineAnimation('myFade', {
  keyframes: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
  duration: '300ms',
  timing: 'ease-out',
})

// Get all registered animations
twsxClassName.getAnimations()  // → { myFade: {...}, ... }

// Use in config
const modal = twsxClassName({
  _: 'fixed inset-0',
  animation: 'myFade',  // or built-in: 'fadeIn', 'slideUp', etc.
})

// ═══════════════════════════════════════════════════════════════
// SSR Support
// ═══════════════════════════════════════════════════════════════

// Get CSS for specific className
twsxClassName.getCSS('btn-a1b2c3d4')

// Get all generated CSS
twsxClassName.getAllCSS()

// Extract as style tag (for SSR)
const styleTag = twsxClassName.extractCSS()
// → '<style data-twsx-classname>...</style>'

// ═══════════════════════════════════════════════════════════════
// Cache Management
// ═══════════════════════════════════════════════════════════════

// Clear all caches
twsxClassName.clearCache()

// Get cache statistics
twsxClassName.getCacheStats()
// → { classNameCacheSize: 42, cssCacheSize: 38, styleRegistrySize: 15 }
```

---

### `tw()` — Atomic CSS Classes

Generates reusable atomic CSS classes from Tailwind utilities. Unlike `tws()` which returns inline styles, `tw()` returns class names with auto-injected CSS — supporting pseudo-classes and responsive breakpoints.

```javascript
import { tw } from 'tailwind-to-style'
// or: import { twsxClassName } from '...' → twsxClassName.tw(...)
```

**Basic Usage:**

```javascript
// Returns: "tw-flex tw-gap-3 tw-items-center"
tw('flex gap-3 items-center')

// Usage
<div class="${tw('flex gap-3 items-center')}">
  <span>Item 1</span>
  <span>Item 2</span>
</div>
```

**With Pseudo-classes:**

```javascript
// Returns: "tw-bg-gray-100 tw-hover-bg-gray-200 tw-focus-ring-2"
tw('bg-gray-100 hover:bg-gray-200 focus:ring-2')

// Unlike tws(), these actually work!
<div class="${tw('opacity-0 hover:opacity-100 transition-opacity')}">
  Hover to reveal
</div>
```

**With Responsive Breakpoints:**

```javascript
// Returns: "tw-flex tw-flex-col tw-md-flex-row tw-lg-gap-8"
tw('flex flex-col md:flex-row lg:gap-8')

<div class="${tw('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4')}">
  <!-- Responsive grid -->
</div>
```

**Combining with twsxClassName:**

```javascript
const button = twsxClassName({
  name: 'btn',
  base: 'px-4 py-2 rounded-lg',
  variants: { color: { primary: 'bg-blue-500', danger: 'bg-red-500' } },
})

// Use tw() for layout, twsxClassName for components
<div class="${tw('flex gap-3 flex-wrap')}">
  <button class="${button({ color: 'primary' })}">Save</button>
  <button class="${button({ color: 'danger' })}">Delete</button>
</div>
```

**When to use which:**

| Function | Use Case | Example |
|----------|----------|---------|
| `tws()` | Quick inline styles, no pseudo | `style="${tws('p-4 bg-blue')}"` |
| `tw()` | Reusable layout utilities | `class="${tw('flex gap-3 hover:...')}"` |
| `twsxClassName` | Components with variants | `class="${button({ size: 'lg' })}"` |

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
import { startSSR, stopSSR, getSSRStyles, twsx } from 'tailwind-to-style'

// 1. Start collecting
startSSR()

// 2. Render your app (twsx() collects CSS instead of injecting)
twsx({ '.card': 'bg-white p-6 rounded-lg shadow-md' })
twsx({ '.btn': 'bg-blue-500 text-white px-4 py-2 rounded' })
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
import { tws } from 'tailwind-to-style/tws'                    // ~3KB
import { twsx } from 'tailwind-to-style/twsx'                   // ~6KB
import { twsxVariants } from 'tailwind-to-style/twsx-variants'  // ~6KB
import { cx } from 'tailwind-to-style/cx'                       // <1KB

// Full import (everything)
import { tws, twsx, twsxVariants, cx } from 'tailwind-to-style' // ~12KB
```

| Import Path | Includes | Size (minified) |
|---|---|---|
| `tailwind-to-style` | Everything | ~12KB |
| `tailwind-to-style/tws` | `tws()` only | ~3KB |
| `tailwind-to-style/twsx` | `twsx()` | ~6KB |
| `tailwind-to-style/twsx-variants` | `twsxVariants()` | ~6KB |
| `tailwind-to-style/cx` | `cx()` | <1KB |
| `tailwind-to-style/utils` | Logger, LRUCache, error handler | ~2KB |

All sub-paths provide ESM + CJS bundles with TypeScript type definitions.

### Utility Exports

```javascript
import { 
  // Debounced versions (for rapid updates)
  debouncedTws,   // Debounced tws() - 50ms delay
  debouncedTwsx,  // Debounced twsx() - 100ms delay
  
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
import { tws, twsx } from 'tailwind-to-style'
import { useEffect } from 'react'

function App() {
  // Inject CSS on mount
  useEffect(() => {
    twsx({
      '.card': ['bg-white rounded-xl shadow-md p-6', {
        '&:hover': 'shadow-xl',
        '> .title': 'text-xl font-bold',
      }]
    })
  }, [])

  return (
    <div style={tws('flex items-center gap-4', true)}>
      <button style={tws('bg-blue-500 text-white px-4 py-2 rounded-lg', true)}>
        Click me
      </button>
    </div>
  )
}
```

### Vue

```vue
<script setup>
import 'tailwind-to-style/preflight.css'
import { tws, twsx } from 'tailwind-to-style'

// twsx() at the top level of <script setup> is HMR-safe.
// When you edit the classes, Vite's HMR re-runs this block and
// the old CSS slot is replaced automatically — no hard refresh needed.
twsx({
  'html': 'bg-gray-100 min-h-screen flex items-center justify-center',
  '.card': [
    'bg-white p-5 border border-gray-300 rounded-xl shadow-md',
    {
      '&:hover': 'shadow-xl',
      '> .title': 'text-xl font-bold text-gray-900 mb-3',
      '> .body': 'text-sm text-gray-700',
    },
  ],
})
</script>

<template>
  <div class="card">
    <div class="title">Card Title</div>
    <p class="body">Styled with twsx — hot reload works out of the box.</p>
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
  import { tws } from 'tailwind-to-style'
  const style = tws('bg-blue-500 text-white px-4 py-2 rounded-lg', true)
</script>

<button style={Object.entries(style).map(([k,v]) => `${k}:${v}`).join(';')}>
  Click me
</button>
```

### Vanilla JS

```javascript
import { tws, twsx } from 'tailwind-to-style'

// Inline styles
const el = document.createElement('button')
Object.assign(el.style, tws('bg-blue-500 text-white px-4 py-2 rounded-lg', true))

// Inject global styles
twsx({
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
- **Slot-based CSS injection** — each `twsx()` call owns a named slot; updates rebuild the tag instead of appending, preventing HMR accumulation
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

## Migration from v2

See [MIGRATION.md](MIGRATION.md) for the detailed guide from v2.x to v3.x.

**Quick summary:**

| Status | API |
|---|---|
| No changes | `tws()`, `twsx()`, `configure()` |
| New in v3.1 | `twsxVariants()` |
| New in v3.2 | `cx()`, SSR, tree-shakeable imports |
| Removed | `styled()`, `tv()`, `useTwsx()`, `TwsxProvider`, CLI tools |

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

**v3.2.0** — [Changelog](CHANGELOG.md) · [Architecture](ARCHITECTURE.md) · [Migration Guide](MIGRATION.md)