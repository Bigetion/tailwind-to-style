# tailwind-to-style

[📦 View on npm](https://www.npmjs.com/package/tailwind-to-style)

[![npm version](https://img.shields.io/npm/v/tailwind-to-style.svg)](https://www.npmjs.com/package/tailwind-to-style)
[![Build Status](https://github.com/Bigetion/tailwind-to-style/workflows/CI%2FCD/badge.svg)](https://github.com/Bigetion/tailwind-to-style/actions)
[![npm downloads](https://img.shields.io/npm/dm/tailwind-to-style.svg)](https://www.npmjs.com/package/tailwind-to-style)
[![license](https://img.shields.io/npm/l/tailwind-to-style.svg)](https://github.com/Bigetion/tailwind-to-style/blob/main/LICENSE)

> **Runtime Tailwind CSS to inline styles converter**
> 
> Simple, fast, framework-agnostic. Convert Tailwind utility classes to inline styles or CSS at runtime with zero build step.

## ✨ New in v3.2.0

**🚀 Advanced Features for Maximum Flexibility & Performance:**

- **🔌 Plugin System** - Extend with custom utilities and components
- **🎨 Design Presets** - Material, Ant Design, Bootstrap, Chakra UI, and more
- **⚡ Class Optimizer** - Smart deduplication and conflict resolution
- **🎬 Animation Builder** - 15+ pre-built animations with fluent API
- **🧩 Composition API** - Styled-system like component primitives
- **🖥️ SSR Utilities** - Critical CSS extraction and hydration
- **✅ Class Validation** - Runtime validation with auto-fix suggestions
- **🛠️ DevTools** - Browser debugging panel with performance tracking

**[📖 See Advanced Features Guide →](docs/ADVANCED_FEATURES_GUIDE.md)**

## ⚡ Why tailwind-to-style?

- **🚀 Zero Build Step** - No PostCSS, no compilation, just JavaScript
- **📦 Framework Agnostic** - Works with React, Vue, Svelte, vanilla JS
- **🎨 Full Tailwind Support** - All utilities, responsive, pseudo-states, arbitrary values
- **🔥 SCSS-like Nesting** - Write complex nested styles with ease
- **⚙️ Customizable** - Extend theme with your colors, spacing, fonts
- **💪 TypeScript Support** - Full type definitions included
- **🪶 Lightweight** - ~12KB core, ~18KB with all features (70% smaller than v2)
- **⚡ High Performance** - 10-300x speedup with intelligent caching

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

### `twsxVariants(className, config)`

Create variant-based component styles with automatic CSS generation. Similar to `tailwind-variants` but with auto-injection.

```javascript
import { twsxVariants } from 'tailwind-to-style'

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

## � v3.2.0 Quick Start

### Plugin System

Extend with custom utilities:

```javascript
import { usePlugin, gradientPlugin, createUtilityPlugin } from 'tailwind-to-style'

// Use built-in plugins
usePlugin(gradientPlugin)

// Create custom plugin
const myPlugin = createUtilityPlugin({
  name: 'custom',
  utilities: {
    'special-box': {
      padding: '2rem',
      backgroundColor: '#ff6b6b',
      borderRadius: '1rem',
    }
  }
})
usePlugin(myPlugin)

// Use custom utility
const styles = tws('special-box text-white')
```

### Design Presets

Quick theme setup:

```javascript
import { applyPreset, materialPreset, antDesignPreset } from 'tailwind-to-style'

// Apply Material Design
applyPreset(materialPreset)

// Use Material colors
const styles = tws('bg-primary-500 text-white shadow-2')

// Available presets:
// materialPreset, antDesignPreset, bootstrapPreset, 
// chakraPreset, glassmorphismPreset, neumorphismPreset
```

### Class Optimizer

Smart deduplication and conflict resolution:

```javascript
import { optimizeClasses, findConflicts } from 'tailwind-to-style'

// Optimize messy classes
const messy = 'flex flex p-4 p-6 bg-red-500 bg-blue-500'
const optimized = optimizeClasses(messy, {
  removeDups: true,
  resolveConflict: true,  // Last one wins
  sort: true
})
// Result: 'flex p-6 bg-blue-500'

// Find conflicts
const conflicts = findConflicts(messy)
conflicts.forEach(c => {
  console.log(`${c.property}: ${c.classes.join(', ')} → Winner: ${c.winner}`)
})
```

### Animation Builder

Create animations with fluent API:

```javascript
import { createAnimation, animations } from 'tailwind-to-style'

// Custom animation
const slideUp = createAnimation('slideUp')
  .from({ transform: 'translateY(100px)', opacity: '0' })
  .to({ transform: 'translateY(0)', opacity: '1' })
  .duration('500ms')
  .ease('easeOutCubic')

console.log(slideUp.toKeyframes())

// Pre-built animations
const fadeIn = animations.fadeIn('300ms')
const bounce = animations.bounce('600ms')
// Available: fadeIn, fadeOut, slideIn*, scaleIn/Out, bounce, shake, pulse, spin, etc.
```

### Composition API

Component primitives for design systems:

```javascript
import { box, button, card, flex } from 'tailwind-to-style'

// Box primitive with props
const boxProps = box({
  p: '4',
  bg: 'blue-500',
  color: 'white',
  borderRadius: 'lg',
  shadow: 'md'
})

// Button with variants
const btnProps = button({
  variant: 'solid',      // solid | outline | ghost | link
  colorScheme: 'blue',
  size: 'lg'             // xs | sm | md | lg | xl
})

// Card component
const cardProps = card({ p: '6', shadow: 'lg' })

// Use in React
<div {...boxProps}>Content</div>
<button {...btnProps}>Click me</button>
```

### SSR Utilities

Critical CSS extraction for server-side rendering:

```javascript
import { createStyleCollector, extractCriticalCss } from 'tailwind-to-style'

// Server-side: Collect styles during render
const collector = createStyleCollector()
collector.add('p-4', { padding: '1rem' })
collector.add('bg-blue-500', { backgroundColor: '#3b82f6' })

// Get critical CSS
const css = collector.getCss()
const styleTag = collector.getStyleTag({ nonce: 'abc123' })

// Inject in HTML
const html = `<html><head>${styleTag}</head>...</html>`
```

### Class Validation

Runtime validation with auto-fix:

```javascript
import { validateClasses, autoFix } from 'tailwind-to-style'

// Validate classes
const result = validateClasses('flex items-center invalid-class')
if (!result.valid) {
  result.errors.forEach(error => {
    console.error(error.error)
    console.log('Suggestions:', error.suggestions)
  })
}

// Auto-fix common mistakes
const fixed = autoFix('flex-center text-middle margin-4')
console.log(fixed.classes)
// Result: 'justify-center items-center text-center m-4'
```

### DevTools

Browser debugging panel:

```javascript
import { enableDevTools, createDebugPanel } from 'tailwind-to-style'

// Enable DevTools
enableDevTools({
  logPerformance: true,
  showWarnings: true,
  highlightConflicts: true
})

// Create visual debug panel
createDebugPanel()  // Opens floating panel in browser
```

## 🔧 Core Features

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

| Feature | tailwind-to-style v3.2 | Tailwind CSS | CSS-in-JS |
|---------|----------------------|--------------|-----------||
| Build Step | ❌ None | ✅ Required | ❌ None |
| Bundle Size | 🟢 12-18KB | 🟡 ~80KB+ | 🟡 20-40KB |
| Runtime | ✅ Yes | ❌ No | ✅ Yes |
| Full Tailwind Support | ✅ Yes | ✅ Yes | ❌ No |
| Plugin System | ✅ Yes | ✅ Yes | ⚠️ Limited |
| Design Presets | ✅ 6 Built-in | ❌ No | ❌ No |
| Class Optimizer | ✅ Yes | ❌ No | ⚠️ Some |
| Animation Builder | ✅ 15+ Built-in | ⚠️ Basic | ✅ Yes |
| SSR Support | ✅ Full | ✅ Yes | ✅ Yes |
| Validation | ✅ Runtime | ⚠️ Build-time | ❌ No |
| DevTools | ✅ Browser Panel | ⚠️ CLI | ⚠️ Some |
| Framework Agnostic | ✅ Yes | ✅ Yes | ⚠️ Depends |
| Nesting Support | ✅ Yes | ⚠️ Plugins | ✅ Yes |
| TypeScript | ✅ Yes | ✅ Yes | ✅ Yes |
| Performance | 🟢 10-300x cache | 🟢 Fast | 🟡 Varies |

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

## � Advanced Documentation

- **[Advanced Features Guide](docs/ADVANCED_FEATURES_GUIDE.md)** - Complete guide for all v3.2.0 features
- **[API Reference](docs/API.md)** - Comprehensive API documentation
- **[Performance Guide](docs/PERFORMANCE.md)** - Optimization strategies
- **[Quick Reference](QUICK_REFERENCE.md)** - One-page cheat sheet
- **[Changelog v3.2.0](CHANGELOG_v3.2.0.md)** - What's new in v3.2.0

## 💖 Support

If you find this library helpful, consider supporting:

[☕ Buy me a coffee](https://buymeacoffee.com/bigetion)

---

**v3.2.0** - Optimal, flexible, fast, and developer-friendly. Full-featured runtime Tailwind. 🚀
