# API Reference

## Core Functions

### `tws(classNames, options)`

Convert Tailwind classes to inline style object or CSS string.

#### Parameters

- **classNames** `string` - Tailwind class names to convert
- **options** `object` (optional) - Conversion options
  - `format` `'object' | 'json' | 'css'` - Output format (default: 'object')

#### Returns

- `object | string` - Style object or JSON/CSS string based on format option

#### Examples

```javascript
import { tws } from 'tailwind-to-style'

// Basic usage - returns style object
const styles = tws('bg-blue-500 text-white p-4')
// → { backgroundColor: '#3b82f6', color: '#fff', padding: '1rem' }

// Return as JSON string
const json = tws('p-4 m-2', { format: 'json' })
// → '{"padding":"1rem","margin":"0.5rem"}'

// Return as CSS string
const css = tws('text-lg font-bold', { format: 'css' })
// → 'font-size: 1.125rem; font-weight: 700;'

// Responsive classes
const responsive = tws('text-sm md:text-base lg:text-lg')

// Pseudo-states
const interactive = tws('bg-blue-500 hover:bg-blue-600 focus:ring-2')

// Arbitrary values
const custom = tws('w-[123px] text-[#abc] m-[1.5rem]')

// Opacity modifiers
const withOpacity = tws('bg-blue-500/50 text-red-500/75')

// Important modifier
const important = tws('!bg-red-500 !text-white')
```

#### Performance

- **First call**: ~2-5ms (cache miss)
- **Cached calls**: ~0.1-0.5ms (100x faster)
- Uses LRU cache with automatic cleanup

---

### `twsx(styleObject, options)`

Generate CSS from nested style definitions with Tailwind classes.

#### Parameters

- **styleObject** `object` - Nested style definitions
- **options** `object` (optional)
  - `inject` `boolean` - Auto-inject CSS into DOM (default: true)
  - `minify` `boolean` - Minify output CSS (default: true)
  - `format` `'minified' | 'pretty'` - CSS formatting

#### Returns

- `string` - Generated CSS string

#### Examples

```javascript
import { twsx } from 'tailwind-to-style'

// Basic nested styles
const css = twsx({
  '.button': [
    'bg-blue-500 text-white px-6 py-3 rounded-lg',
    {
      '&:hover': 'bg-blue-600',
      '&:active': 'bg-blue-700',
      '&:disabled': 'opacity-50 cursor-not-allowed'
    }
  ]
})

// Media queries at root level
twsx({
  '.card': 'bg-white p-6',
  '@media (max-width: 768px)': {
    '.card': 'p-4'
  }
})

// SCSS-like nesting
twsx({
  '.nav': [
    'flex items-center p-4 bg-white',
    {
      '> .logo': 'h-8 w-auto',
      '> .links': 'flex gap-4 ml-auto',
      '> .links > a': 'text-gray-600 hover:text-gray-900'
    }
  ]
})

// Raw CSS with @css directive
twsx({
  '.custom': {
    '@css': {
      borderTopColor: 'rgba(255, 0, 0, 0.5)',
      backgroundImage: 'linear-gradient(to right, red, blue)'
    }
  }
})

// Without auto-injection
const cssString = twsx({
  '.btn': 'px-4 py-2 rounded'
}, { inject: false })
```

#### Performance

- **First call**: ~5-15ms (cache miss + CSS generation)
- **Cached calls**: ~0.1-0.5ms (300x faster)
- Uses object identity cache + FNV-1a hashing

---

### `twsxVariants(className, config)`

Create variant-based component styles with automatic CSS generation.

#### Parameters

- **className** `string` - Base class name (with or without `.`)
- **config** `object` - Variant configuration
  - `base` `string` - Base Tailwind classes
  - `variants` `object` - Variant definitions
  - `compoundVariants` `array` - Compound variant rules
  - `defaultVariants` `object` - Default variant values
  - `nested` `object` - Nested child selectors

#### Returns

- `function` - Class name builder function that accepts variant props

#### Examples

```javascript
import { twsxVariants } from 'tailwind-to-style'

// Basic variants
const button = twsxVariants('.btn', {
  base: 'px-4 py-2 rounded-lg font-medium transition-all',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      danger: 'bg-red-500 text-white hover:bg-red-600'
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
})

// Usage - returns class name string
button() // → "btn"
button({ color: 'danger' }) // → "btn btn-danger"
button({ size: 'lg' }) // → "btn btn-lg"
button({ color: 'secondary', size: 'sm' }) // → "btn btn-secondary-sm"

// Compound variants
const alert = twsxVariants('.alert', {
  base: 'p-4 rounded-lg border',
  variants: {
    variant: {
      solid: 'border-transparent',
      outline: 'bg-transparent border-2'
    },
    status: {
      info: 'text-blue-800',
      error: 'text-red-800'
    }
  },
  compoundVariants: [
    {
      variant: 'solid',
      status: 'info',
      class: 'bg-blue-100 border-blue-200'
    },
    {
      variant: 'outline',
      status: 'error',
      class: 'border-red-500 hover:bg-red-50'
    }
  ],
  defaultVariants: {
    variant: 'solid',
    status: 'info'
  }
})

// Nested selectors
const card = twsxVariants('.card', {
  base: 'bg-white rounded-xl shadow-lg overflow-hidden',
  nested: {
    '.card-header': 'p-6 border-b border-gray-200',
    '.card-body': 'p-6',
    '.card-footer': 'p-6 bg-gray-50'
  }
})

// React usage
function Button({ variant, size, children, ...props }) {
  return (
    <button className={button({ variant, size })} {...props}>
      {children}
    </button>
  )
}
```

#### Class Naming Convention

- `.btn` - all defaults (e.g., primary + md)
- `.btn-danger` - danger (non-default) + md (default)
- `.btn-lg` - primary (default) + lg (non-default)
- `.btn-secondary-sm` - secondary + sm (both non-default)

#### Performance

- **First call**: ~10-20ms (generates all variant combinations)
- **Cached calls**: ~0.1-0.5ms (returns cached function)
- CSS injected once, reused for all component instances

---

### `configure(config)`

Customize Tailwind theme configuration.

#### Parameters

- **config** `object` - Theme configuration
  - `theme.extend` `object` - Extend default theme
  - `theme.colors` `object` - Custom colors
  - `theme.spacing` `object` - Custom spacing scale
  - `theme.fontFamily` `object` - Custom font families
  - `corePlugins` `object` - Enable/disable core plugins

#### Examples

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
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  }
})

// Now use custom theme
const styles = tws('bg-brand-500 text-brand-50 p-128 rounded-4xl font-mono')
```

#### Configuration File

Create `tailwind-to-style.config.js` in project root:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981'
      }
    }
  },
  corePlugins: {
    float: false, // Disable specific plugins
    clear: false
  }
}
```

---

### `clearConfigCache()`

Clear configuration cache. Useful when theme configuration changes at runtime.

#### Examples

```javascript
import { clearConfigCache, configure } from 'tailwind-to-style'

// Change theme
configure({ theme: { extend: { colors: { primary: 'red' } } } })

// Clear cache to apply changes
clearConfigCache()
```

---

## Cache Management

### `debugCache()`

Debug and inspect cache state.

#### Examples

```javascript
import { debugCache } from 'tailwind-to-style'

debugCache()
// Logs:
// 📊 Cache Debug Information
// Statistics: { hits: 1234, misses: 56, invalidations: 2, ... }
// Hit Rate: 95.67%
```

### `cacheManager`

Access to centralized cache manager.

#### Methods

- `clearAll()` - Clear all caches
- `clearConfigCache()` - Clear config caches only
- `clearCssCache()` - Clear CSS caches only
- `getStats()` - Get cache statistics
- `logStats()` - Log statistics to console
- `setLimits(limits)` - Set memory limits
- `getHitRate()` - Get cache hit rate percentage

#### Examples

```javascript
import { cacheManager } from 'tailwind-to-style/cache'

// Get statistics
const stats = cacheManager.getStats()
console.log(stats)
// → { hits: 1000, misses: 50, sizes: {...} }

// Set custom limits
cacheManager.setLimits({
  configOptions: 1000,
  cssResolution: 2000
})

// Clear specific caches
cacheManager.clearCssCache()

// Monitor performance
console.log(`Hit rate: ${cacheManager.getHitRate()}%`)
```

---

## Logging

### `logger`

Centralized logging with configurable levels.

#### Methods

- `setLevel(level)` - Set log level
- `getLevel()` - Get current log level
- `debug(message, ...args)` - Debug logs
- `info(message, ...args)` - Info logs
- `warn(message, ...args)` - Warning logs
- `error(message, ...args)` - Error logs

#### Log Levels

- `'debug'` - All logs including detailed processing
- `'info'` - General information
- `'warn'` - Performance warnings
- `'error'` - Errors only
- `'silent'` - No logging (default)

#### Examples

```javascript
import { logger } from 'tailwind-to-style'

// Enable debug logging
logger.setLevel('debug')

// Custom logging
logger.info('Processing styles...')
logger.warn('Slow operation detected')

// Environment variable
// TWSX_LOG_LEVEL=debug npm start
```

---

## Advanced Features

### Opacity Modifiers

Apply opacity to colors using `/` notation:

```javascript
tws('bg-blue-500/50')  // 50% opacity
tws('text-red-600/75') // 75% opacity
tws('border-gray-500/25') // 25% opacity
```

### Arbitrary Values

Use custom values with square brackets:

```javascript
tws('w-[123px]')
tws('h-[calc(100vh-64px)]')
tws('text-[#abc123]')
tws('bg-[url("/image.png")]')
tws('grid-cols-[1fr,2fr,1fr]')
```

### Important Modifier

Force specificity with `!` prefix:

```javascript
tws('!bg-red-500 !text-white')
```

### State Variants

```javascript
tws('hover:bg-blue-600')
tws('focus:ring-2')
tws('active:scale-95')
tws('disabled:opacity-50')
tws('group-hover:text-white')
tws('peer-focus:border-blue-500')
```

### Responsive Variants

```javascript
tws('text-sm md:text-base lg:text-lg xl:text-xl')
```

### Dark Mode

```javascript
tws('bg-white dark:bg-gray-900')
twsx({ '.card': 'bg-white dark:bg-gray-800' })
```

---

## TypeScript Support

Full TypeScript definitions included:

```typescript
import { tws, twsx, twsxVariants, configure } from 'tailwind-to-style'

// Type-safe configuration
configure({
  theme: {
    extend: {
      colors: {
        brand: '#3b82f6'
      }
    }
  }
})

// Type-safe variants
const button = twsxVariants('.btn', {
  variants: {
    color: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500'
    }
  }
})

// TypeScript will infer correct types
button({ color: 'primary' }) // ✅ OK
button({ color: 'invalid' })  // ❌ Type error
```
