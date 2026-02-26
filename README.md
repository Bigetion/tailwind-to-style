# tailwind-to-style

[📦 View on npm](https://www.npmjs.com/package/tailwind-to-style)

[![npm version](https://img.shields.io/npm/v/tailwind-to-style.svg)](https://www.npmjs.com/package/tailwind-to-style)
[![Build Status](https://github.com/Bigetion/tailwind-to-style/workflows/CI%2FCD/badge.svg)](https://github.com/Bigetion/tailwind-to-style/actions)
[![npm downloads](https://img.shields.io/npm/dm/tailwind-to-style.svg)](https://www.npmjs.com/package/tailwind-to-style)
[![bundle size](https://img.shields.io/bundlephobia/minzip/tailwind-to-style)](https://bundlephobia.com/package/tailwind-to-style)
[![license](https://img.shields.io/npm/l/tailwind-to-style.svg)](https://github.com/Bigetion/tailwind-to-style/blob/main/LICENSE)

> **Runtime Tailwind CSS to inline styles converter**
> 
> Zero build step. SSR-ready. Tree-shakeable. Works everywhere — React, Vue, Svelte, Node.js, vanilla JS.

## ⚡ Why tailwind-to-style?

- **🚀 Zero Build Step** — No PostCSS, no compilation, just JavaScript
- **📦 Framework Agnostic** — Works with React, Vue, Svelte, vanilla JS
- **🎨 Full Tailwind Support** — All utilities, responsive, pseudo-states, arbitrary values
- **🔥 SCSS-like Nesting** — Write complex nested styles with ease
- **🎛️ Variant System** — Type-safe component variants (like CVA/tailwind-variants)
- **🧩 Conditional Classes** — Built-in `cx()` utility (like clsx/classnames)
- **🌐 SSR Support** — Server-side rendering with `startSSR()`/`stopSSR()`
- **⚙️ Customizable** — Extend theme with your colors, spacing, fonts
- **💪 TypeScript Support** — Full type definitions with generics for autocomplete
- **🪶 Lightweight** — ~12KB minified, zero dependencies
- **🌳 Tree-Shakeable** — Import only what you need, reduce bundle by 50-70%
- **⚡ Lightning Fast** — 100x faster with pre-compiled regex & multi-level caching

## 📥 Installation

```bash
npm install tailwind-to-style
```

### 🌳 Tree-Shakeable Imports (v3.2.0+)

Import only what you need to reduce bundle size by 50-70%:

```javascript
// Import specific functions (recommended)
import { tws } from 'tailwind-to-style/tws'           // Only tws() - smallest bundle
import { twsx } from 'tailwind-to-style/twsx'          // Only twsx()
import { twsxVariants } from 'tailwind-to-style/twsx-variants'  // Only variants
import { cx } from 'tailwind-to-style/cx'              // Only cx() - conditional classes

// Or import from main entry (imports everything)
import { tws, twsx, twsxVariants, cx } from 'tailwind-to-style'
```

**Bundle size impact:**
- Full import: ~12KB minified
- Individual imports: 3-6KB minified (50-70% smaller!)

## 🎯 Quick Start

### Simple Conversion with `tws()`

Convert Tailwind classes to style objects:

```javascript
// Tree-shakeable import (recommended)
import { tws } from 'tailwind-to-style/tws'

const styles = tws('bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600')

// Use in React
<div style={styles}>Hello World</div>

// Use in vanilla JS
element.style = Object.assign(element.style, styles)
```

### Nested Styles with `twsx()`

Create complex styles with SCSS-like nesting:

```javascript
// Tree-shakeable import
import { twsx } from 'tailwind-to-style/twsx'

const css = twsx({
  '.card': [
    'bg-white p-6 rounded-lg shadow-md',
    {
      '&:hover': 'shadow-xl transform scale-105',
      '> .title': 'text-2xl font-bold text-gray-900 mb-2',
      '> .description': 'text-gray-600 leading-relaxed',
      '> .button': [
        'bg-blue-500 text-white px-4 py-2 rounded',
        {
          '&:hover': 'bg-blue-600',
          '&:active': 'bg-blue-700'
        }
      ]
    }
  ],
  
  // Media queries at root level
  '@media (max-width: 768px)': {
    '.card': 'p-4',
    '.card > .title': 'text-xl'
  }
})

// Inject to document
const style = document.createElement('style')
style.textContent = css
document.head.appendChild(style)
```

## 📚 Core API

### `tws(classes, options?)`

Convert Tailwind classes to inline style object.

```javascript
import { tws } from 'tailwind-to-style'

// Basic usage
const styles = tws('flex items-center gap-4')
// → { display: 'flex', alignItems: 'center', gap: '1rem' }

// Responsive classes
const styles = tws('text-sm md:text-base lg:text-lg')

// Pseudo-states
const styles = tws('bg-blue-500 hover:bg-blue-600 focus:ring-2')

// Arbitrary values
const styles = tws('w-[123px] text-[#abc] m-[1.5rem]')

// Important modifier
const styles = tws('!bg-red-500')

// Return as JSON string
const json = tws('p-4 m-2', { format: 'json' })
// → '{"padding":"1rem","margin":"0.5rem"}'
```

### `twsx(styleObject, options?)`

Generate CSS from nested style definitions with Tailwind classes.

```javascript
import { twsx } from 'tailwind-to-style'

const css = twsx({
  '.button': [
    'bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all',
    {
      '&:hover': 'bg-blue-600 transform scale-105',
      '&:active': 'bg-blue-700 scale-95',
      '&:disabled': 'bg-gray-400 opacity-50 cursor-not-allowed',
      '&.large': 'px-8 py-4 text-lg',
      '&.small': 'px-3 py-1.5 text-sm'
    }
  ],
  
  '.card': 'bg-white rounded-xl shadow-lg overflow-hidden',
  '.card > .header': 'p-6 border-b border-gray-200',
  '.card > .body': 'p-6',
  '.card > .footer': 'p-6 bg-gray-50',
  
  // Media queries at root level
  '@media (max-width: 768px)': {
    '.card': 'rounded-lg',
    '.card > .header': 'p-4',
    '.card > .body': 'p-4'
  }
})

// Options
const minified = twsx(styles, { minify: true })
const formatted = twsx(styles, { format: 'pretty' })
```

**Nesting Syntax:**
- `'&:hover'` - Pseudo-classes
- `'&.class'` - Modifiers
- `'> .child'` - Direct children
- `'.nested'` - Descendants
- `'@media ...'` - Media queries (root level only)

### `twsxVariants(className, config)`

Create variant-based component styles with automatic CSS generation. Similar to `tailwind-variants` but with auto-injection.

**TypeScript Support:** Full generics provide autocomplete for variant props and combinations! 🎉

```javascript
import { twsxVariants } from 'tailwind-to-style/twsx-variants'

const btn = twsxVariants('.btn', {
  base: 'px-4 py-2 rounded-lg font-medium transition-all',
  variants: {
    variant: {
      solid: 'border-transparent',
      outline: 'bg-transparent border-2',
      ghost: 'bg-transparent',
    },
    color: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  },
  compoundVariants: [
    { variant: 'outline', color: 'primary', class: 'border-blue-500 text-blue-600' },
    { variant: 'outline', color: 'danger', class: 'border-red-500 text-red-600' },
  ],
  defaultVariants: { variant: 'solid', color: 'primary', size: 'md' }
})

// Usage - returns class name string
btn()                                    // "btn"
btn({ color: 'danger' })                 // "btn btn-danger"
btn({ variant: 'outline', size: 'lg' })  // "btn btn-outline-lg"

// In React
const Button = ({ variant, color, size, children, ...props }) => (
  <button className={btn({ variant, color, size })} {...props}>
    {children}
  </button>
)
```

**Nested Selectors** - Style child elements:

```javascript
const alert = twsxVariants('.alert', {
  base: 'p-4 rounded-lg border flex gap-3',
  variants: {
    status: {
      info: 'bg-blue-50 text-blue-800',
      error: 'bg-red-50 text-red-800',
    },
  },
  defaultVariants: { status: 'info' },
  nested: {
    '.alert-icon': 'flex-shrink-0 mt-0.5',
    '.alert-content': 'flex-1',
    '.alert-dismiss': 'p-1 rounded hover:bg-black/10',
  }
})

// Generates CSS:
// .alert .alert-icon { ... }
// .alert .alert-content { ... }
```

**Class Naming Convention:**
- `.btn` = all defaults
- `.btn-outline` = outline variant (non-default)
- `.btn-outline-danger-lg` = multiple non-defaults

### TypeScript Support (Enhanced in v3.2.0)

Full type safety with generics for `twsxVariants`:

```typescript
import { twsxVariants, type VariantProps } from 'tailwind-to-style/twsx-variants'

const button = twsxVariants('.btn', {
  base: 'px-4 py-2 rounded',
  variants: {
    variant: {
      solid: 'bg-blue-500 text-white',
      outline: 'border-2 border-blue-500',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }
  },
  defaultVariants: { variant: 'solid', size: 'md' }
})

// Infer props type with autocomplete!
type ButtonProps = VariantProps<typeof button>
// → { variant?: 'solid' | 'outline', size?: 'sm' | 'md' | 'lg' }

function Button(props: ButtonProps) {
  return <button className={button(props)} />
}
```

**Features:**
- ✅ Full autocomplete for variant keys and values
- ✅ Type-safe compound variants
- ✅ Infer props with `VariantProps<T>` utility type
- ✅ Strict checking for nested selectors and boolean variants

### `configure(config)`

Customize theme with your colors, spacing, fonts, and more.

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
          900: '#1e3a8a'
        },
        accent: '#f59e0b'
      },
      spacing: {
        '128': '32rem',
        '144': '36rem'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      }
    }
  }
})

// Now use your custom theme
const styles = tws('bg-brand-500 text-brand-50 p-128 font-sans')
```

**Configuration File:**

Create `tailwind-to-style.config.js` in your project root:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981'
      }
    }
  }
}
```

## 🎨 Preflight CSS (Base Styles)

For best results, import Tailwind's preflight (base styles):

```javascript
// In your main entry file
import 'tailwind-to-style/preflight.css'
```

```html
<!-- Or in HTML -->
<link rel="stylesheet" href="node_modules/tailwind-to-style/preflight.css">
```

The preflight CSS provides:
- Consistent box-sizing
- Reset margins and paddings
- Normalized form elements
- Better default font rendering

**Note:** Skip this if you're already using Tailwind CSS in your project.

## 🧩 Conditional Classes with `cx()`

A built-in utility for conditionally joining class names — no need for `clsx` or `classnames`:

```javascript
import { cx } from 'tailwind-to-style/cx'

// Strings
cx('bg-blue-500', 'text-white')
// → 'bg-blue-500 text-white'

// Conditionals
cx('p-4', isActive && 'bg-blue-500', isDisabled && 'opacity-50')
// → 'p-4 bg-blue-500' (if isActive=true, isDisabled=false)

// Object syntax
cx('p-4', { 'bg-blue-500': isActive, 'opacity-50': isDisabled })
// → 'p-4 bg-blue-500'

// Arrays
cx(['p-4', 'bg-white'], isActive && ['ring-2', 'ring-blue-500'])
// → 'p-4 bg-white ring-2 ring-blue-500'

// Use with tws() for inline styles
const styles = tws(cx('p-4', isLarge && 'p-8', { 'bg-blue-500': isPrimary }))
```

**`cx.with()` — Base class composition:**

```javascript
const btn = cx.with('px-4 py-2 rounded font-medium transition-colors')

btn('bg-blue-500 text-white')   // → 'px-4 py-2 rounded font-medium transition-colors bg-blue-500 text-white'
btn({ 'opacity-50': disabled }) // → 'px-4 py-2 rounded font-medium transition-colors opacity-50'
```

## 🌐 SSR (Server-Side Rendering)

Use `twsx()` on the server to collect CSS during rendering:

```javascript
import { startSSR, stopSSR, twsx } from 'tailwind-to-style'

// Before rendering
startSSR()

// Your rendering code (e.g., React renderToString, Vue renderToString)
const buttonStyles = twsx({
  '.btn': 'bg-blue-500 text-white px-4 py-2 rounded'
})
const html = renderToString(<App />)

// After rendering — get all collected CSS
const css = stopSSR()

// Inject into your HTML response
const fullHtml = `
  <html>
    <head><style>${css}</style></head>
    <body>${html}</body>
  </html>
`
```

**SSR API:**
- `startSSR()` — Begin collecting CSS (call before rendering)
- `stopSSR()` — Stop collecting and return all CSS as a string
- `getSSRStyles()` — Get currently collected CSS without stopping

**Environment detection:**
```javascript
import { IS_BROWSER, IS_SERVER } from 'tailwind-to-style'

if (IS_SERVER) {
  // SSR code path
}
```

## 💡 Use Cases

### 1. Dynamic Styling

Generate styles from user input or runtime data:

```javascript
import { tws } from 'tailwind-to-style'

function UserCard({ user }) {
  const styles = tws(`bg-${user.color}-500 p-4 rounded-lg`)
  return <div style={styles}>{user.name}</div>
}
```

### 2. Email Templates

Generate inline styles for email HTML:

```javascript
import { tws } from 'tailwind-to-style'

const emailHTML = `
  <div style="${tws('bg-white p-8 text-center', { format: 'css' })}">
    <h1 style="${tws('text-2xl font-bold mb-4', { format: 'css' })}">
      Welcome!
    </h1>
  </div>
`
```

### 3. CSS-in-JS Alternative

```javascript
import { twsx } from 'tailwind-to-style'

const styles = twsx({
  '.app': [
    'min-h-screen bg-gray-50',
    {
      '> .header': 'bg-white shadow-sm p-4',
      '> .main': 'container mx-auto py-8',
      '> .footer': 'bg-gray-900 text-white p-8'
    }
  ]
})

// Inject once at app startup
document.head.appendChild(Object.assign(document.createElement('style'), {
  textContent: styles
}))
```

### 4. Component Library Styling

```javascript
import { twsx } from 'tailwind-to-style'

export const buttonStyles = twsx({
  '.btn': [
    'px-4 py-2 rounded-lg font-medium transition-colors',
    {
      '&.btn-primary': 'bg-blue-500 text-white hover:bg-blue-600',
      '&.btn-secondary': 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      '&.btn-lg': 'px-6 py-3 text-lg',
      '&.btn-sm': 'px-2 py-1 text-sm'
    }
  ]
})
```

## 🔧 Advanced Features

### Responsive Design

All Tailwind breakpoints work out of the box:

```javascript
const styles = tws('text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl')
```

### Arbitrary Values

Use any custom value with square brackets:

```javascript
const styles = tws(`
  w-[123px]
  h-[calc(100vh-64px)]
  text-[#abc123]
  bg-[url('/image.png')]
  grid-cols-[1fr,2fr,1fr]
`)
```

### State Variants

```javascript
const styles = tws(`
  bg-blue-500
  hover:bg-blue-600
  focus:ring-2
  active:scale-95
  disabled:opacity-50
  group-hover:text-white
`)
```

### Important Modifier

```javascript
const styles = tws('!bg-red-500 !text-white')
// Forces these styles to take precedence
```

## 🎭 Framework Integration

### React

```javascript
import { tws, twsx } from 'tailwind-to-style'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const css = twsx({
      '.custom': 'bg-blue-500 text-white p-4'
    })
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
  }, [])

  return (
    <div style={tws('flex items-center gap-4')}>
      <button style={tws('bg-blue-500 text-white px-4 py-2 rounded')}>
        Click me
      </button>
    </div>
  )
}
```

### Vue

```vue
<script setup>
import { tws } from 'tailwind-to-style'

const buttonStyle = tws('bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600')
</script>

<template>
  <button :style="buttonStyle">Click me</button>
</template>
```

### Vanilla JS

```javascript
import { tws, twsx } from 'tailwind-to-style'

// Create element with styles
const button = document.createElement('button')
Object.assign(button.style, tws('bg-blue-500 text-white px-4 py-2 rounded'))
button.textContent = 'Click me'

// Inject global styles
const css = twsx({
  '.card': 'bg-white p-6 rounded-lg shadow-md'
})
document.head.appendChild(Object.assign(document.createElement('style'), {
  textContent: css
}))
```

## 📊 Performance

v3.2.0 includes major performance optimizations:

- ✅ **100x faster** - Pre-compiled regex patterns (compile once, reuse forever)
- ✅ **Multi-level caching** - WeakMap + LRU + Singleton pattern
- ✅ **50-70% smaller bundles** - Tree-shakeable imports
- ✅ **Zero build step** - Instant development workflow
- ✅ **Optimized hashing** - FNV-1a algorithm (100x faster than JSON.stringify)

**Real-world benchmarks:**
```
Parse 10,000 classes:
- First parse: ~12ms
- Cached: ~0.12ms (100x faster)

Bundle sizes:
- Full import: ~12KB minified
- tws() only: ~3KB minified
- twsx() only: ~6KB minified
```

📖 **[View detailed benchmarks](examples/performance/benchmark.js)**

## 📚 Examples & Documentation

- 📂 **[Examples folder](examples/)** - Real-world usage examples
  - [Basic usage](examples/basic/) - 10+ common use cases
  - [Components](examples/components/) - Button with variants
  - [Performance](examples/performance/) - Benchmarks & optimization
  
- 📖 **[Architecture guide](ARCHITECTURE.md)** - Internal design & performance details
- 🔄 **[Migration guide](MIGRATION.md)** - Upgrade from v2 to v3

## 🐛 Debugging & Logging

By default, all logs are disabled. Enable logging via environment variable:

```bash
# Enable warnings (performance, cache misses)
TWSX_LOG_LEVEL=warn npm start

# Enable debug logs (detailed processing info)
TWSX_LOG_LEVEL=debug npm test

# Enable only errors
TWSX_LOG_LEVEL=error npm run dev

# Disable all logs (default)
TWSX_LOG_LEVEL=silent npm start
```

Or programmatically:

```javascript
import { logger } from 'tailwind-to-style'

// Enable debug logging
logger.setLevel('debug')  // 'debug' | 'info' | 'warn' | 'error' | 'silent'

// Check current level
console.log(logger.getLevel()) // → 'debug'
```

**Available log levels:**
- `debug` - Detailed processing information
- `info` - General information
- `warn` - Performance warnings, slow operations
- `error` - Error messages only
- `silent` - No logging (default)

## 🆚 Comparison

| Feature | tailwind-to-style | Tailwind CSS | CSS-in-JS | tailwind-variants |
|---------|:-:|:-:|:-:|:-:|
| Build Step | ❌ None | ✅ Required | ❌ None | ✅ Required |
| Bundle Size | 🟢 3-12KB | 🟡 ~80KB+ | 🟡 20-40KB | 🟡 ~15KB |
| Runtime Styles | ✅ Yes | ❌ No | ✅ Yes | Partial |
| Full Tailwind Support | ✅ Yes | ✅ Yes | ❌ No | ⚠️ Classes only |
| SSR Support | ✅ Yes | ✅ Yes | ⚠️ Depends | ✅ Yes |
| Variant System | ✅ Built-in | ❌ No | ❌ No | ✅ Yes |
| Conditional Classes | ✅ `cx()` | ❌ No | ❌ No | ✅ `tv()` |
| SCSS-like Nesting | ✅ Yes | ⚠️ Plugins | ✅ Yes | ❌ No |
| Framework Agnostic | ✅ Yes | ✅ Yes | ⚠️ Depends | ✅ Yes |
| Tree-Shaking | ✅ Yes | ⚠️ Partial | ✅ Yes | ✅ Yes |
| TypeScript Generics | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Performance | 🟢 100x cached | 🟢 Build-time | 🟡 Runtime | 🟡 Runtime |
| Zero Dependencies | ✅ Yes | ❌ PostCSS | ❌ No | ❌ tailwind-merge |

## 📖 Migration from v2

See [MIGRATION.md](MIGRATION.md) for detailed migration guide from v2.x to v3.x.

**Quick summary:**
- ✅ `tws()` - No changes
- ✅ `twsx()` - No changes  
- ✅ `configure()` - No changes
- ❌ `styled()`, `tv()` - Removed (use emotion/styled-components)
- ❌ `useTwsx()`, `TwsxProvider` - Removed (use `twsx()` directly)
- ❌ CLI tools & plugins - Removed (not needed for runtime library)

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Bigetion](https://github.com/Bigetion)

## 💖 Support

If you find this library helpful, consider supporting:

[☕ Buy me a coffee](https://buymeacoffee.com/bigetion)

---

**v3.2.0** — SSR support, `cx()` utility, tree-shakeable sub-paths, bounded caches, faster CSS injection. 🚀⚡
