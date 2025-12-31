# tailwind-to-style

[📦 View on npm](https://www.npmjs.com/package/tailwind-to-style)

[![npm version](https://img.shields.io/npm/v/tailwind-to-style.svg)](https://www.npmjs.com/package/tailwind-to-style)
[![Build Status](https://github.com/Bigetion/tailwind-to-style/workflows/CI%2FCD/badge.svg)](https://github.com/Bigetion/tailwind-to-style/actions)
[![npm downloads](https://img.shields.io/npm/dm/tailwind-to-style.svg)](https://www.npmjs.com/package/tailwind-to-style)
[![license](https://img.shields.io/npm/l/tailwind-to-style.svg)](https://github.com/Bigetion/tailwind-to-style/blob/main/LICENSE)

> **Runtime Tailwind CSS to inline styles converter**
> 
> Simple, fast, framework-agnostic. Convert Tailwind utility classes to inline styles or CSS at runtime with zero build step.

## ⚡ Why tailwind-to-style?

- **🚀 Zero Build Step** - No PostCSS, no compilation, just JavaScript
- **📦 Framework Agnostic** - Works with React, Vue, Svelte, vanilla JS
- **🎨 Full Tailwind Support** - All utilities, responsive, pseudo-states, arbitrary values
- **🔥 SCSS-like Nesting** - Write complex nested styles with ease
- **⚙️ Customizable** - Extend theme with your colors, spacing, fonts
- **💪 TypeScript Support** - Full type definitions included
- **🪶 Lightweight** - ~12KB minified (70% smaller than v2)

## 📥 Installation

```bash
npm install tailwind-to-style
```

## 🎯 Quick Start

### Simple Conversion with `tws()`

Convert Tailwind classes to style objects:

```javascript
import { tws } from 'tailwind-to-style'

const styles = tws('bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600')

// Use in React
<div style={styles}>Hello World</div>

// Use in vanilla JS
element.style = Object.assign(element.style, styles)
```

### Nested Styles with `twsx()`

Create complex styles with SCSS-like nesting:

```javascript
import { twsx } from 'tailwind-to-style'

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

- **Parse & cache** - Styles are cached after first parse
- **Small bundle** - ~12KB minified (vs 45KB in v2)
- **No build step** - Instant development workflow
- **Tree-shakeable** - Only import what you use

## 🆚 Comparison

| Feature | tailwind-to-style | Tailwind CSS | CSS-in-JS |
|---------|------------------|--------------|-----------|
| Build Step | ❌ None | ✅ Required | ❌ None |
| Bundle Size | 🟢 12KB | 🟡 ~80KB+ | 🟡 20-40KB |
| Runtime | ✅ Yes | ❌ No | ✅ Yes |
| Full Tailwind Support | ✅ Yes | ✅ Yes | ❌ No |
| Framework Agnostic | ✅ Yes | ✅ Yes | ⚠️ Depends |
| Nesting Support | ✅ Yes | ⚠️ Plugins | ✅ Yes |
| TypeScript | ✅ Yes | ✅ Yes | ✅ Yes |

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

**v3.0.0** - Focused, fast, and simple. Just the core. 🎯
