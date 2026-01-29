# 🚀 Cara Pakai - tailwind-to-style v3.2

## 📖 Quick Start

### Basic Usage (Sama seperti sebelumnya)

```javascript
import { tws, twsx, twsxVariants } from 'tailwind-to-style'

// 1. tws() - Convert classes to styles
const styles = tws('bg-blue-500 text-white p-4')
// → { backgroundColor: '#3b82f6', color: '#fff', padding: '1rem' }

// 2. twsx() - Generate CSS from nested styles
twsx({
  '.button': 'bg-blue-500 text-white px-4 py-2 rounded'
})

// 3. twsxVariants() - Variant-based components
const button = twsxVariants('.btn', {
  base: 'px-4 py-2 rounded',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      danger: 'bg-red-500 text-white'
    }
  }
})
```

---

## ✨ Fitur Baru v3.2

### 1. 🎨 Auto-Prefixer
Otomatis tambah vendor prefixes untuk cross-browser compatibility.

```javascript
import { autoPrefixStyles } from 'tailwind-to-style/helpers'

const styles = tws('flex transform rotate-45 transition-all')
const prefixed = autoPrefixStyles(styles, true)
// Hasil:
// {
//   display: 'flex',
//   display: '-webkit-flex',
//   transform: 'rotate(45deg)',
//   WebkitTransform: 'rotate(45deg)',
//   transition: 'all',
//   WebkitTransition: 'all'
// }
```

**Support:** flex, transform, transition, animation, user-select, appearance

---

### 2. 🧠 Smart Merge
Gabungin classes dengan intelligent conflict resolution.

```javascript
import { smartMerge } from 'tailwind-to-style/helpers'

// Classes yang conflict akan di-override
const merged = smartMerge('bg-blue-500 p-4', 'bg-red-500 p-8')
// → 'bg-red-500 p-8' (red & p-8 menang)

// Perfect untuk conditional styling
const classes = smartMerge(
  'bg-white text-gray-900',
  isActive && 'bg-blue-500 text-white',
  isLarge && 'text-xl p-8'
)
```

**Conflict detection untuk:**
- Colors (bg, text, border)
- Spacing (p, m, px, py, etc.)
- Sizing (w, h, max-w, etc.)
- Borders, shadows, opacity

---

### 3. 🎯 Class Variants Generator
Generate semua kombinasi variant otomatis.

```javascript
import { classVariants } from 'tailwind-to-style/helpers'

const variants = classVariants('px-4 py-2 rounded', {
  color: {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
    danger: 'bg-red-500 text-white'
  },
  size: {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
})

// Hasil: Object dengan semua kombinasi
variants['primary-sm']  // → 'px-4 py-2 rounded bg-blue-500 text-white text-sm'
variants['danger-lg']   // → 'px-4 py-2 rounded bg-red-500 text-white text-lg'
```

---

### 4. 📱 Responsive Helper
Simplified responsive classes.

```javascript
import { responsive } from 'tailwind-to-style/helpers'

const classes = responsive({
  default: 'text-sm p-2',
  sm: 'text-base p-4',
  md: 'text-lg p-6',
  lg: 'text-xl p-8',
  xl: 'text-2xl p-10'
})
// → 'text-sm p-2 sm:text-base sm:p-4 md:text-lg md:p-6 ...'

// Atau shorthand
const simple = responsive('p-2', 'p-4', 'p-6', 'p-8')
// → 'p-2 sm:p-4 md:p-6 lg:p-8'
```

---

### 5. 🎭 State Variants Helper
Generate hover, focus, active, disabled states dengan mudah.

```javascript
import { stateVariants } from 'tailwind-to-style/helpers'

const interactive = stateVariants('bg-blue-500 text-white', {
  hover: 'bg-blue-600 shadow-lg',
  focus: 'ring-2 ring-blue-300',
  active: 'bg-blue-700 scale-95',
  disabled: 'opacity-50 cursor-not-allowed'
})
// → 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg focus:ring-2 ...'
```

---

### 6. ✅ Conditional Classes
Apply classes berdasarkan conditions.

```javascript
import { conditionalClasses } from 'tailwind-to-style/helpers'

const classes = conditionalClasses({
  'bg-blue-500': isActive,
  'text-white': isActive,
  'bg-gray-200': !isActive,
  'text-gray-600': !isActive,
  'p-4 rounded': true,  // Always apply
  'shadow-lg': hasElevation,
  'opacity-50': isDisabled
})

// Atau dengan function conditions
const dynamic = conditionalClasses({
  'bg-red-500': () => score < 50,
  'bg-yellow-500': () => score >= 50 && score < 80,
  'bg-green-500': () => score >= 80
})
```

---

### 7. 🌙 Theme Helper
Simplified dark mode classes.

```javascript
import { themeClasses } from 'tailwind-to-style/helpers'

// Auto-generate light & dark mode classes
const themed = themeClasses('bg-white text-gray-900', 'bg-gray-900 text-white')
// → 'bg-white text-gray-900 dark:bg-gray-900 dark:text-white'

// Atau object notation
const theme = themeClasses({
  light: 'bg-white border-gray-200',
  dark: 'bg-gray-800 border-gray-700'
})
```

---

### 8. 🎨 CSS Variables Support
Extract dan manage CSS custom properties.

```javascript
import { extractCssVariables } from 'tailwind-to-style/helpers'

const styles = tws('bg-blue-500 text-white')
const { variables, styles: cleanStyles } = extractCssVariables(styles)

// variables: { '--bg-opacity': '1', '--text-opacity': '1' }
// cleanStyles: { backgroundColor: 'rgb(59 130 246)', color: 'rgb(255 255 255)' }

// Apply to element
Object.assign(element.style, variables)
Object.assign(element.style, cleanStyles)
```

---

## 🎯 Real-World Examples

### Example 1: Button Component (React)

```javascript
import { tws, smartMerge, autoPrefixStyles, stateVariants } from 'tailwind-to-style'

function Button({ variant = 'primary', size = 'md', disabled, className, ...props }) {
  // Base classes
  const base = 'font-medium rounded transition-all'
  
  // Variant classes
  const variants = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-200 text-gray-900',
    danger: 'bg-red-500 text-white'
  }
  
  // Size classes
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  // State variants
  const states = stateVariants('', {
    hover: 'opacity-90 transform scale-105',
    active: 'opacity-80 scale-95',
    disabled: 'opacity-50 cursor-not-allowed'
  })
  
  // Merge all
  const merged = smartMerge(
    base,
    variants[variant],
    sizes[size],
    states,
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )
  
  // Convert to styles with auto-prefix
  const styles = autoPrefixStyles(tws(merged), true)
  
  return <button style={styles} disabled={disabled} {...props} />
}

// Usage
<Button variant="primary" size="lg">Click Me</Button>
<Button variant="danger" disabled>Disabled</Button>
```

### Example 2: Card Component with Theme

```javascript
import { twsx, themeClasses, responsive } from 'tailwind-to-style'

// Generate themed card CSS
twsx({
  '.card': [
    themeClasses('bg-white text-gray-900', 'bg-gray-800 text-white'),
    responsive({
      default: 'p-4 rounded',
      md: 'p-6 rounded-lg',
      lg: 'p-8 rounded-xl'
    }),
    'shadow-lg',
    {
      '> .card-header': themeClasses('border-b border-gray-200', 'border-gray-700'),
      '> .card-body': 'mt-4',
      '> .card-footer': [
        'mt-4 pt-4',
        themeClasses('border-t border-gray-200', 'border-gray-700')
      ]
    }
  ]
})

// HTML
<div className="card">
  <div className="card-header">Header</div>
  <div className="card-body">Content</div>
  <div className="card-footer">Footer</div>
</div>
```

### Example 3: Dynamic Styling

```javascript
import { conditionalClasses, classVariants, tws } from 'tailwind-to-style'

function StatusBadge({ status, count }) {
  // Generate all status variants
  const variants = classVariants('px-3 py-1 rounded-full text-sm font-medium', {
    status: {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800'
    }
  })
  
  // Conditional additions
  const classes = conditionalClasses({
    [variants[status]]: true,
    'animate-pulse': count > 10,
    'shadow-lg': count > 50,
    'ring-2 ring-red-500': status === 'error' && count > 100
  })
  
  return <span style={tws(classes)}>{count}</span>
}
```

---

## 🛠️ Infrastructure Improvements (Behind the scenes)

### Cache Management

```javascript
import { cacheManager, debugCache } from 'tailwind-to-style'

// Monitor performance
console.log(`Hit rate: ${cacheManager.getHitRate()}%`)

// Set memory limits
cacheManager.setLimits({
  configOptions: 1000,
  cssResolution: 2000
})

// Clear when needed
cacheManager.clearCssCache()

// Debug
debugCache() // Shows detailed stats
```

### Performance Monitoring

```javascript
import { performanceMonitor } from 'tailwind-to-style/performance'

const marker = performanceMonitor.start('custom-operation')
// ... your code ...
performanceMonitor.end(marker)
```

### Logging

```javascript
import { logger } from 'tailwind-to-style'

// Enable debug logs
logger.setLevel('debug')

// Or via environment
// TWSX_LOG_LEVEL=debug npm start
```

---

## 📦 Installation & Import

### Basic (Existing APIs)
```javascript
import { tws, twsx, twsxVariants, configure } from 'tailwind-to-style'
```

### New Helpers
```javascript
import {
  autoPrefixStyles,
  smartMerge,
  classVariants,
  responsive,
  stateVariants,
  conditionalClasses,
  themeClasses,
  extractCssVariables
} from 'tailwind-to-style/helpers'
```

### Infrastructure
```javascript
import { cacheManager, debugCache } from 'tailwind-to-style'
import { performanceMonitor } from 'tailwind-to-style/performance'
import { logger } from 'tailwind-to-style'
```

---

## 🎓 Migration Guide

### From v3.1.3 to v3.2

**✅ No Breaking Changes!**

Semua code v3.1.3 tetap jalan 100%:
```javascript
// v3.1.3 code - masih works
import { tws, twsx, twsxVariants } from 'tailwind-to-style'
tws('bg-blue-500')
```

**✨ New Optional Features:**
```javascript
// v3.2 - pakai fitur baru kalau mau
import { smartMerge, responsive } from 'tailwind-to-style/helpers'
```

---

## 🚀 Run Examples

```bash
# Infrastructure improvements demo
node examples/improvements-demo.js

# Complete features guide
node examples/complete-features-guide.js

# Run benchmarks
npm run bench:all
```

---

## 📚 Documentation

- **[API.md](docs/API.md)** - Complete API reference
- **[PERFORMANCE.md](docs/PERFORMANCE.md)** - Performance optimization guide
- **[IMPROVEMENTS.md](IMPROVEMENTS.md)** - Detailed changelog

---

## 🎯 Summary

### Cara Pakai Lama (v3.1.3) ✅
Masih sama, tetap works 100%

### Fitur Baru (v3.2) ✨
8 helper functions baru untuk DX yang lebih baik:
1. autoPrefixStyles - Auto vendor prefixes
2. smartMerge - Intelligent class merging
3. classVariants - Generate all combinations
4. responsive - Simplified responsive classes
5. stateVariants - Easy state management
6. conditionalClasses - Boolean-based classes
7. themeClasses - Dark mode helpers
8. extractCssVariables - CSS variables management

### Infrastructure Improvements 🛠️
- Modular code structure (6 core modules)
- Centralized cache management
- Performance monitoring
- Comprehensive benchmarks
- Complete documentation

**Best of both worlds:** Backward compatible + Powerful new features! 🎉
