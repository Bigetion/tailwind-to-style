# Migration Guide: v2.x → v3.0.0

## 🎯 What Changed?

v3.0.0 is a **major refactor** that focuses exclusively on the core runtime conversion functionality. We've removed all advanced features to create a simpler, smaller, faster library.

**Bundle size reduction:** 45KB → 12KB (73% smaller!)

---

## ✅ What Stayed (No Changes Required)

These core APIs remain **100% compatible**:

### `tws()` - No changes
```javascript
import { tws } from 'tailwind-to-style'

const styles = tws('bg-blue-500 text-white p-4')
// ✅ Works exactly the same
```

### `twsx()` - No changes
```javascript
import { twsx } from 'tailwind-to-style'

const css = twsx({
  '.card': [
    'bg-white p-6',
    { '&:hover': 'shadow-lg' }
  ]
})
// ✅ Works exactly the same
```

### `configure()` - No changes
```javascript
import { configure } from 'tailwind-to-style'

configure({
  theme: {
    extend: {
      colors: { brand: '#3b82f6' }
    }
  }
})
// ✅ Works exactly the same
```

---

## ❌ What Was Removed

### 1. Styled Components System

**v2.x (removed):**
```javascript
import { styled } from 'tailwind-to-style'

const Button = styled('button', {
  base: 'px-4 py-2 rounded',
  variants: {
    color: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500'
    }
  }
})
```

**v3.x alternative:**
Use established CSS-in-JS libraries:

```javascript
// Option 1: emotion
import styled from '@emotion/styled'
import { tws } from 'tailwind-to-style'

const Button = styled.button`
  ${tws('px-4 py-2 rounded bg-blue-500', { format: 'css' })}
`

// Option 2: styled-components
import styled from 'styled-components'
import { tws } from 'tailwind-to-style'

const Button = styled.button(tws('px-4 py-2 rounded bg-blue-500'))

// Option 3: vanilla with twsx
import { twsx } from 'tailwind-to-style'

const styles = twsx({
  '.btn': [
    'px-4 py-2 rounded',
    {
      '&.btn-primary': 'bg-blue-500',
      '&.btn-secondary': 'bg-gray-500'
    }
  ]
})
```

### 2. Variant System (`tv`)

**v2.x (removed):**
```javascript
import { tv } from 'tailwind-to-style'

const button = tv({
  base: 'px-4 py-2',
  variants: {
    color: { primary: 'bg-blue-500' }
  }
})
```

**v3.x alternative:**

```javascript
// Option 1: class-variance-authority (CVA)
import { cva } from 'class-variance-authority'

const button = cva('px-4 py-2', {
  variants: {
    color: { primary: 'bg-blue-500' }
  }
})

// Option 2: Manual with twsx
import { twsx } from 'tailwind-to-style'

const buttonStyles = twsx({
  '.btn': 'px-4 py-2',
  '.btn-primary': 'bg-blue-500',
  '.btn-secondary': 'bg-gray-500'
})

// Option 3: Simple function
import { tws } from 'tailwind-to-style'

function buttonClass(variant) {
  const base = 'px-4 py-2 rounded'
  const variants = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white'
  }
  return tws(`${base} ${variants[variant]}`)
}
```

### 3. React Integration

**v2.x (removed):**
```javascript
import { useTwsx, TwsxProvider } from 'tailwind-to-style'

function App() {
  return (
    <TwsxProvider config={...}>
      <Component />
    </TwsxProvider>
  )
}

function Component() {
  useTwsx({
    '.card': 'bg-white p-6'
  })
  
  return <div className="card">Content</div>
}
```

**v3.x alternative:**

```javascript
import { twsx, tws } from 'tailwind-to-style'
import { useEffect } from 'react'

function App() {
  // Option 1: Inject global styles once
  useEffect(() => {
    const css = twsx({
      '.card': 'bg-white p-6 rounded-lg'
    })
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
  }, [])

  // Option 2: Use inline styles
  return (
    <div style={tws('bg-white p-6 rounded-lg')}>
      Content
    </div>
  )
}

// Option 3: Create a simple hook yourself
function useStyles(styles) {
  useEffect(() => {
    const css = twsx(styles)
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
    return () => style.remove()
  }, [])
}
```

### 4. CLI Tool

**v2.x (removed):**
```bash
npx twsx-cli build --watch
```

**v3.x:**
Not needed! v3 is purely runtime - no build step required.

If you need build-time CSS generation, use:
- [Tailwind CSS](https://tailwindcss.com) (official)
- [UnoCSS](https://unocss.dev) (faster alternative)

### 5. Build Plugins

**v2.x (removed):**
```javascript
import viteTwsx from 'tailwind-to-style/plugins/vite-twsx'
import webpackTwsx from 'tailwind-to-style/plugins/webpack-twsx'
```

**v3.x:**
Not needed! Just import and use `tws`/`twsx` directly in your code.

### 6. Optimization Suite

**v2.x (removed):**
```javascript
import { 
  BundleAnalyzer, 
  OptimizationManager,
  CriticalCSSExtractor 
} from 'tailwind-to-style'
```

**v3.x:**
Removed - use standard build tools:
- Vite/Webpack for bundling
- PurgeCSS for unused CSS removal
- Lighthouse for performance analysis

### 7. Custom Prefix Configuration

**v2.x (removed):**
```javascript
configure({ 
  styled: { 
    prefix: 'myapp',
    separator: '_' 
  }
})
```

**v3.x:**
Not applicable - styled components removed.

---

## 📦 Package Changes

### Exports

**v2.x:**
```javascript
import { tws, twsx, styled, tv, useTwsx } from 'tailwind-to-style'
import { useTwsx, TwsxProvider } from 'tailwind-to-style/react'
import viteTwsx from 'tailwind-to-style/plugins/vite-twsx'
```

**v3.x:**
```javascript
// Only core exports available
import { tws, twsx, configure } from 'tailwind-to-style'
import 'tailwind-to-style/preflight.css'
```

### package.json

**v2.x:**
```json
{
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }
}
```

**v3.x:**
```json
{
  "peerDependencies": {}
}
```
No React dependency - framework agnostic!

---

## 🔄 Migration Examples

### Example 1: Button Component

**v2.x:**
```javascript
import { styled } from 'tailwind-to-style'

const Button = styled('button', {
  base: 'px-4 py-2 rounded font-medium',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-500 text-white hover:bg-gray-600'
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      lg: 'text-lg px-6 py-3'
    }
  }
})

export default Button
```

**v3.x (Option A - Inline styles):**
```javascript
import { tws } from 'tailwind-to-style'

export default function Button({ color = 'primary', size = 'md', children }) {
  const baseClasses = 'px-4 py-2 rounded font-medium'
  
  const colorClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600'
  }
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: '',
    lg: 'text-lg px-6 py-3'
  }
  
  const classes = `${baseClasses} ${colorClasses[color]} ${sizeClasses[size]}`
  
  return <button style={tws(classes)}>{children}</button>
}
```

**v3.x (Option B - CSS classes):**
```javascript
import { twsx } from 'tailwind-to-style'
import { useEffect } from 'react'

// Generate once at module load
const buttonCSS = twsx({
  '.btn': [
    'px-4 py-2 rounded font-medium',
    {
      '&.btn-primary': 'bg-blue-500 text-white hover:bg-blue-600',
      '&.btn-secondary': 'bg-gray-500 text-white hover:bg-gray-600',
      '&.btn-sm': 'text-sm px-3 py-1.5',
      '&.btn-lg': 'text-lg px-6 py-3'
    }
  ]
})

// Inject once
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = buttonCSS
  document.head.appendChild(style)
}

export default function Button({ color = 'primary', size = 'md', children }) {
  return (
    <button className={`btn btn-${color} btn-${size}`}>
      {children}
    </button>
  )
}
```

### Example 2: Card Component with Nesting

**v2.x:**
```javascript
import { useTwsx } from 'tailwind-to-style'

function Card() {
  useTwsx({
    '.card': [
      'bg-white rounded-lg shadow-md p-6',
      {
        '&:hover': 'shadow-xl',
        '.title': 'text-xl font-bold',
        '.content': 'text-gray-600'
      }
    ]
  })
  
  return (
    <div className="card">
      <h2 className="title">Title</h2>
      <p className="content">Content</p>
    </div>
  )
}
```

**v3.x:**
```javascript
import { twsx } from 'tailwind-to-style'
import { useEffect } from 'react'

// Option 1: Inject per component
function Card() {
  useEffect(() => {
    const css = twsx({
      '.card': [
        'bg-white rounded-lg shadow-md p-6',
        {
          '&:hover': 'shadow-xl',
          '.title': 'text-xl font-bold',
          '.content': 'text-gray-600'
        }
      ]
    })
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
    return () => style.remove()
  }, [])
  
  return (
    <div className="card">
      <h2 className="title">Title</h2>
      <p className="content">Content</p>
    </div>
  )
}

// Option 2: Generate once at module level (recommended)
const cardCSS = twsx({
  '.card': [
    'bg-white rounded-lg shadow-md p-6',
    {
      '&:hover': 'shadow-xl',
      '.title': 'text-xl font-bold',
      '.content': 'text-gray-600'
    }
  ]
})

if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = cardCSS
  document.head.appendChild(style)
}

function Card() {
  return (
    <div className="card">
      <h2 className="title">Title</h2>
      <p className="content">Content</p>
    </div>
  )
}
```

---

## 🚀 Recommended Alternatives

| v2 Feature | Recommended Alternative |
|-----------|------------------------|
| `styled()` | [emotion](https://emotion.sh), [styled-components](https://styled-components.com) |
| `tv()` | [class-variance-authority](https://cva.style) |
| `useTwsx()` | Use `twsx()` + `useEffect` |
| CLI/Build tools | [Tailwind CSS](https://tailwindcss.com), [UnoCSS](https://unocss.dev) |
| Optimization | Vite/Webpack built-in tools |

---

## 📊 Benefits of v3

- ✅ **73% smaller bundle** (45KB → 12KB)
- ✅ **Faster performance** (less code to parse)
- ✅ **Framework agnostic** (no React dependency)
- ✅ **Simpler API** (3 functions vs 20+)
- ✅ **Easier to maintain** (focused scope)
- ✅ **Better tree-shaking** (smaller final bundles)

---

## 🆘 Need Help?

- **Issues:** [GitHub Issues](https://github.com/Bigetion/tailwind-to-style/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Bigetion/tailwind-to-style/discussions)

---

## 📅 v2 Support Timeline

- **v2.12.6** - Final v2 release (tagged as `v2-legacy`)
- **6 months** - Security fixes only
- **After 6 months** - v2 enters maintenance mode (critical fixes only)

**Stay on v2:** `npm install tailwind-to-style@2.12.6`

---

**Welcome to v3! Simpler, faster, focused. 🎯**
