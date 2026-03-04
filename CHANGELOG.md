# Changelog

## [3.2.2] - 2026-03-04

### 🐛 Bug Fixes

#### HMR CSS Accumulation Fix (`twsx()`)
- Fixed an issue where calling `twsx()` with updated styles during Vite/webpack HMR would **append** new CSS instead of replacing the old one, causing stale property bleed-through that required a hard browser refresh to resolve.
- Each `twsx(obj)` call now owns a stable **slot** in the injected `#twsx-auto-style` tag, keyed by its sorted top-level selector names (independent of CSS content). When classes change, the slot is replaced and the tag is fully rebuilt — true hot reload, no hard refresh needed.
- Added `cssBlocks` counter to `performanceUtils.getStats()` for registry visibility.
- `performanceUtils.clearCaches()` now also clears the CSS block registry and empties the style tag.

### 🧪 Tests
- Added `tests/css-injection-hmr.test.js` — 15 test cases covering slot-based injection, HMR replacement, multi-component isolation, deduplication, and `performanceUtils` integration.

### 📝 Documentation
- Updated `README.md`: `twsx()` description now notes HMR-safe slot injection.
- Updated `README.md`: Vue section now shows the correct `twsx()` top-level pattern that works with HMR.
- Updated `README.md`: Fixed incorrect `sheet.insertRule()` mention in the Performance section (actual implementation uses slot-based `textContent` rebuild).

---

## [3.2.0] - 2026-02-26

### 🚀 New Features

#### SSR (Server-Side Rendering) Support
- Added `startSSR()`, `stopSSR()`, `getSSRStyles()` for server-side CSS collection
- Added `IS_BROWSER` and `IS_SERVER` environment detection constants
- `twsx()` now collects CSS instead of injecting into DOM when SSR is active

```javascript
import { startSSR, stopSSR, twsx } from 'tailwind-to-style'

startSSR()
// ... render your app
const css = stopSSR()
// → inject into HTML response
```

#### `cx()` — Conditional Class Name Builder
- New built-in utility for conditionally joining class names (like clsx/classnames)
- Supports strings, objects, arrays, and nested combinations
- `cx.with()` for creating base-class-bound functions
- Tree-shakeable import: `import { cx } from 'tailwind-to-style/cx'`

```javascript
import { cx } from 'tailwind-to-style/cx'

cx('p-4', isActive && 'bg-blue-500', { 'opacity-50': isDisabled })
// → 'p-4 bg-blue-500'
```

#### Tree-Shakeable Sub-Path Builds (Fixed)
- All sub-path exports (`/tws`, `/twsx`, `/twsx-variants`, `/utils`, `/cx`) now actually build correctly
- Each sub-path gets ESM + CJS bundles with proper TypeScript type definitions
- Bundle size: 3-6KB per sub-path (50-70% smaller than full import)

### 🔧 Improvements

#### Performance
- **`autoInjectCss()`** now uses `sheet.insertRule()` instead of `textContent +=` — avoids full stylesheet reparsing on every injection
- **Bounded caches** — All `Map` and `Set` caches now have eviction limits (5,000 entries for Maps, 10,000 for Sets) to prevent memory leaks in long-running SPAs
- **`tws()` input validation** cleaned up — replaced unidiomatic `[].includes(true)` pattern with simple `||` chain

#### Configuration
- `configure()` now validates config structure and warns about unrecognized keys
- Invalid `theme`, `plugins`, and `prefix` types are caught with helpful warnings

#### TypeScript
- Added full type definitions for `cx()`, SSR functions, `IS_BROWSER`, `IS_SERVER`
- Added sub-path type definitions (`types/core/tws.d.ts`, `types/core/twsx.d.ts`, etc.)
- Added `InferVariantProps<T>` utility type for extracting variant props from twsxVariants

#### DX (Developer Experience)
- Expanded `package.json` keywords for better npm discoverability (16 keywords vs 4)
- Bundlephobia badge added to README
- **CONTRIBUTING.md** significantly expanded with architecture overview, testing guidelines, build output docs
- Comparison table updated to include tailwind-variants

### 📦 Build Changes
- Rollup config refactored — generates sub-path entry points for all exports
- Source maps enabled for ESM builds
- Removed deprecated `rollup-plugin-terser` (using `@rollup/plugin-terser` only)
- `types/` directory now included in npm package

### 🧪 Testing
- Added `tws.test.js` — 32 comprehensive unit tests for core `tws()` function
- Added `cx.test.js` — 31 tests covering all cx() features
- Total: 63 new tests

---

## [3.1.0] - 2026-01-04

### 🎨 New Feature: `twsxVariants()` - Compound Variants System

A powerful variant-based styling system similar to `tailwind-variants`, but with automatic CSS generation and injection.

#### **Basic Usage**
```javascript
import { twsxVariants } from 'tailwind-to-style';

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
    { variant: 'outline', color: 'primary', class: 'border-blue-500 text-blue-600 hover:bg-blue-50' },
    { variant: 'outline', color: 'danger', class: 'border-red-500 text-red-600 hover:bg-red-50' },
    { variant: 'ghost', color: 'primary', class: 'text-blue-600 hover:bg-blue-100' },
  ],
  defaultVariants: { variant: 'solid', color: 'primary', size: 'md' }
});

// Usage in React
const Button = ({ variant, color, size, children, ...props }) => (
  <button className={btn({ variant, color, size })} {...props}>{children}</button>
);

// Renders: class="btn btn-outline-danger-lg"
<Button variant="outline" color="danger" size="lg">Delete</Button>
```

#### **Features**
- ✅ **Auto CSS Generation**: Generates all variant combinations automatically
- ✅ **Class Name Builder**: Returns function to build class names from props
- ✅ **Compound Variants**: Apply styles when multiple variants match
- ✅ **Default Variants**: Set default values for variants
- ✅ **Nested Selectors**: Style child elements within the component
- ✅ **Smart Class Names**: Base class always included (e.g., `btn btn-outline`)
- ✅ **CSS Specificity**: Proper injection order ensures variants override base

#### **Nested Selectors**
Style child elements without inline Tailwind classes:
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
});

// Generated CSS:
// .alert .alert-icon { ... }
// .alert .alert-content { ... }
// .alert .alert-dismiss { ... }
```

#### **Class Naming Convention**
- `.btn` = all defaults (solid + primary + md)
- `.btn-outline` = outline (non-default) + primary (default) + md (default)
- `.btn-danger` = solid (default) + danger (non-default) + md (default)
- `.btn-outline-danger-lg` = outline + danger + lg (all non-default)

### 🔧 API Changes
- **New signature**: `twsxVariants(className, config)` instead of `twsxVariants({ className, ...config })`
- **Always returns function**: Returns class name builder function
- **Base class included**: Renders `btn btn-outline` instead of just `btn-outline`

### 📦 TypeScript
Full TypeScript support with proper type inference for variants.

---

## [2.11.0] - 2025-12-22

### 🎨 New Features: Styled Components & Variants System

#### **🏗️ `styled()` - Component Factory**
Create reusable styled components with Tailwind classes:

```javascript
import { styled } from 'tailwind-to-style';

const Button = styled('button', {
  base: 'px-4 py-2 rounded-lg font-medium transition-all',
  hover: 'bg-blue-600 transform scale-105',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white',
      danger: 'bg-red-500 text-white'
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3'
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});

// Usage
<Button color="danger" size="lg">Delete</Button>
```

**Features:**
- ✅ Variant-based styling system
- ✅ Compound variants for complex conditions
- ✅ Pseudo-state support (hover, focus, active, disabled)
- ✅ Nested styles with SCSS-like syntax
- ✅ Forward refs support
- ✅ Polymorphic "as" prop
- ✅ Tag helpers: `styled.div()`, `styled.button()`, etc.
- ✅ Full TypeScript support with type inference

#### **🎭 `tv()` - Type-safe Variants**
Framework-agnostic variant system for design systems:

```javascript
import { tv } from 'tailwind-to-style';

const button = tv({
  base: 'px-4 py-2 rounded-lg',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white'
    },
    size: {
      sm: 'text-sm',
      lg: 'text-lg'
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      size: 'lg',
      class: 'font-bold shadow-lg'
    }
  ],
  defaultVariants: {
    color: 'primary',
    size: 'sm'
  }
});

// Usage
const className = button({ color: 'primary', size: 'lg' });
// Output: 'px-4 py-2 rounded-lg bg-blue-500 text-white text-lg font-bold shadow-lg'
```

**Features:**
- ✅ Type-safe variant props
- ✅ Compound variants for conditional styling
- ✅ Default variants
- ✅ Framework-agnostic (works anywhere)
- ✅ `createVariants()` for batch creation
- ✅ Inspired by tailwind-variants and CVA

#### **📦 Export Changes**
- Added `styled` from `tailwind-to-style` (React)
- Added `tv` and `createVariants` from root package
- Full TypeScript definitions in `types/styled.d.ts`

#### **🎯 Use Cases**
- Building design systems and UI libraries
- Component-based styling with variants
- Type-safe variant props in TypeScript
- Reusable style patterns across projects
- Complex component styling without CSS-in-JS runtime

#### **🔗 Integration Examples**
```javascript
// Option 1: Styled components with React
import { styled, TwsxProvider } from 'tailwind-to-style';

const Card = styled.div({
  base: 'bg-white rounded-lg p-6',
  hover: 'shadow-xl',
  nested: {
    '.title': 'text-xl font-bold',
    '.content': 'text-gray-600 mt-2'
  }
});

// Option 2: Variant function (framework-agnostic)
import { tv } from 'tailwind-to-style';

const cardStyles = tv({
  base: 'bg-white rounded-lg p-6',
  variants: {
    elevation: {
      sm: 'shadow-sm',
      lg: 'shadow-lg'
    }
  }
});
```

See [examples/styled-components.jsx](examples/styled-components.jsx) for complete examples.

---

## [2.10.5] - 2025-12-21

### 🎉 Major Features

#### **⚛️ React Integration**
- ✅ **`useTwsx()` Hook**: Main React hook for component styling
  - Auto-inject CSS into document head by default
  - Optional manual CSS string output with `{ inject: false }`
  - Perfect for dynamic component-level styling
  ```javascript
  import { useTwsx } from 'tailwind-to-style';
  
  function MyComponent() {
    useTwsx({
      '.button': [
        'bg-blue-500 text-white px-6 py-3 rounded-lg',
        {
          '&:hover': 'bg-blue-600 transform scale-105',
          '&:active': 'bg-blue-700 scale-95'
        }
      ]
    });
    
    return <button className="button">Click me</button>;
  }
  ```

- ✅ **`TwsxProvider`**: Global theme configuration provider
  - Provide theme config to all child components
  - Support for custom colors, spacing, and design tokens
  - Seamless integration with React context
  ```javascript
  import { TwsxProvider } from 'tailwind-to-style';
  
  const themeConfig = {
    theme: {
      extend: {
        colors: {
          brand: { 500: '#3b82f6', 600: '#2563eb' }
        }
      }
    }
  };
  
  function App() {
    return (
      <TwsxProvider config={themeConfig}>
        <YourComponents />
      </TwsxProvider>
    );
  }
  ```

- ✅ **Additional React Hooks**:
  - `useTwsxContext()` - Access provider context
  - `useTwsxConfig()` - Get current configuration and status
  - `useUpdateTwsxConfig()` - Dynamically update theme config
  ```javascript
  import { useTwsxConfig, useUpdateTwsxConfig } from 'tailwind-to-style';
  
  function ThemeSettings() {
    const { config, isConfigured } = useTwsxConfig();
    const updateConfig = useUpdateTwsxConfig();
    
    return (
      <button onClick={() => updateConfig({ 
        theme: { extend: { colors: { brand: { 500: '#ef4444' } } } }
      })}>
        Change Theme
      </button>
    );
  }
  ```

- ✅ **Import Options**: Flexible import paths
  ```javascript
  // From main package (recommended)
  import { useTwsx, TwsxProvider } from 'tailwind-to-style';
  
  // From React subpath
  import { useTwsx, TwsxProvider } from 'tailwind-to-style/react';
  ```

#### **🎬 Animation & Transition Support**
- ✅ **Animation Utilities**: Full support for Tailwind animations
  - `animate-spin` - Continuous rotation (loading spinners)
  - `animate-ping` - Scale and fade effect (notifications)
  - `animate-pulse` - Breathing opacity effect
  - `animate-bounce` - Bouncing effect
  - `animate-none` - Disable animations
  ```javascript
  tws('animate-spin'); // { animation: "spin 1s linear infinite" }
  ```

- ✅ **Transition Utilities**: Complete transition system
  - `transition` - Default transition (colors, opacity, shadow, transform, etc.)
  - `transition-all` - Transition all properties
  - `transition-colors`, `transition-opacity`, `transition-shadow`, `transition-transform`
  - Duration control: `duration-75` through `duration-1000`
  - Timing functions: `ease-linear`, `ease-in`, `ease-out`, `ease-in-out`
  - Delay control: `delay-75` through `delay-1000`
  ```javascript
  tws('transition-all duration-300 ease-in-out delay-150');
  ```

- ✅ **Keyframes System**: Built-in animation keyframes
  - `spin` - 360° rotation
  - `ping` - Scale and fade out
  - `pulse` - Opacity breathing
  - `bounce` - Bouncing motion with cubic-bezier timing

- ✅ **Custom Animations**: Define custom animations via `configure()`
  ```javascript
  configure({
    theme: {
      extend: {
        animation: {
          'fade-in': 'fadeIn 1s ease-in forwards',
          'wiggle': 'wiggle 1s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          wiggle: {
            '0%, 100%': { transform: 'rotate(-3deg)' },
            '50%': { transform: 'rotate(3deg)' },
          },
        },
      },
    },
  });
  ```

#### **🎨 Theme Customization System**
- ✅ **Custom Theme Extensions**: Extend default Tailwind theme with your own values
  - Custom colors, spacing, border radius, font sizes, and more
  - Deep merge support for nested theme values
  - Works seamlessly with existing Tailwind utilities
  ```javascript
  configure({
    theme: {
      extend: {
        colors: {
          brand: { 500: '#0ea5e9', 600: '#0284c7' },
        },
        spacing: {
          '128': '32rem',
          '144': '36rem',
        },
      },
    },
  });
  tws('bg-brand-500 p-128'); // Works!
  ```

#### **🔌 Plugin API**
- ✅ **Custom Utility Plugins**: Create your own utility classes
  - `createPlugin()` - Create simple utility plugins
  - `createUtilityPlugin()` - Create dynamic utilities with multiple values
  - `createVariantPlugin()` - Create custom variants (coming soon)
  ```javascript
  const textGradientPlugin = createPlugin('text-gradient', {
    utilities: {
      '.text-gradient': {
        'background-clip': 'text',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'background-image': 'linear-gradient(to right, #3b82f6, #8b5cf6)',
      },
    },
  });
  
  configure({ plugins: [textGradientPlugin] });
  tws('text-gradient'); // Works!
  ```

#### **⚙️ Configuration System**
- ✅ **`configure()` Function**: Apply theme and plugin configuration
- ✅ **`getConfig()` Function**: Get current configuration
- ✅ **`resetConfig()` Function**: Reset to defaults
- ✅ **Config File Support**: Create `tailwind-to-style.config.js`
- ✅ **Prefix Support**: Add prefix to all classes
- ✅ **Core Plugin Control**: Enable/disable core plugins

### 🚀 Infrastructure & Performance

### 🚀 Infrastructure & Performance

#### **Modernization & Dependencies**
- ✅ **Updated all dependencies** to latest versions (December 2025)
  - ESLint: v8.16 → v9.15 (flat config support)
  - Jest: v28.1 → v30.0 (latest testing framework)
  - Rollup: v2.75 → v4.27 (latest bundler)
  - @rollup/* plugins: Updated to latest versions
- ✅ **Node.js support**: Dropped EOL versions, now supports Node 18.x, 20.x, 22.x LTS
- ✅ **ESLint flat config**: Migrated to modern eslint.config.js format

#### **Architecture Refactoring**
- ✅ **Proper LRU Cache**: Replaced naive Map caches with efficient LRU implementation
  - Automatic eviction of least recently used items
  - Configurable max sizes
  - Better memory management
  - No more arbitrary 20% cleanup
- ✅ **Singleton Pattern**: Refactored global state (twString/cssObject) to proper singleton
  - Better testability
  - No module-level side effects
  - Proper encapsulation
  - Added reset() method for testing
- ✅ **Configurable Logger**: Replaced console.* calls with proper logging system
  - Production-safe (error-only in production)
  - Configurable log levels (debug/info/warn/error/silent)
  - No more console spam
  - Prefixed messages for easy filtering

#### **Error Handling**
- ✅ **Error Event System**: Implemented proper error handling with event emitters
  - TwsError class with context
  - onError() subscription pattern
  - handleError() centralized error processing
  - Better debugging in production

### 📦 New Exports & TypeScript

```javascript
// Configuration
export { configure, getConfig, resetConfig };

// Plugin API
export { createPlugin, createUtilityPlugin, createVariantPlugin };

// Advanced utilities
export { 
  logger, Logger,
  LRUCache,
  TwsError, onError,
  getTailwindCache, resetTailwindCache
};
```

- ✅ **Complete TypeScript definitions**: Full type exports
  - Configuration system types
  - Plugin API types
  - Logger and LRUCache types
  - TwsError and error handlers
  - Better autocomplete support

### 📚 Documentation & Examples
- ✅ Added comprehensive animation documentation to README
- ✅ Added theme customization guide
- ✅ Added plugin API documentation with examples
- ✅ Created `examples/animations.js` with real-world use cases
- ✅ Created `examples/theme-customization.js`
- ✅ Created `examples/custom-plugins.js`
- ✅ Created `examples/tailwind-to-style.config.example.js`
- ✅ Updated all inline JSDoc comments

### 🔧 Technical Improvements
- ✅ New animation generators: `animation.js`, `transitionProperty.js`, `transitionDuration.js`, `transitionTimingFunction.js`, `transitionDelay.js`
- ✅ Updated theme config with animation values and keyframes
- ✅ All animation utilities work with responsive and state variants
- ✅ User config management system
- ✅ Deep merge algorithm for theme extensions
- ✅ Plugin utilities integrated into CSS lookup
- ✅ Cache invalidation on config changes
- ✅ Performance: LRU caches are more efficient than Map with arbitrary cleanup
- ✅ Memory: Better memory management with proper cache eviction
- ✅ Security: Fixed outdated dependencies with known vulnerabilities

### 💡 Use Cases Unlocked
- 🎬 Complete animation system with custom keyframes
- 🎨 Brand-specific color systems
- 🔧 Custom design tokens
- ✨ Glassmorphism effects
- 🌈 Text gradients
- 🎯 Custom shadows and utilities
- 🚀 And unlimited custom utilities!

### 🎯 Breaking Changes
**None** - All changes are backward compatible! Your existing code continues to work.

### 🔄 Migration Guide
No migration needed! All existing code continues to work.

**Optional enhancements you can use:**
```javascript
// Configure logger level
import { logger } from 'tailwind-to-style';
logger.setLevel('silent'); // For production

// Subscribe to errors
import { onError } from 'tailwind-to-style';
const unsubscribe = onError((error) => {
  console.log(error.message);
  console.log(error.context);
});

// Use custom theme
import { configure } from 'tailwind-to-style';
configure({
  theme: {
    extend: {
      colors: { brand: { 500: '#3b82f6' } }
    }
  }
});

// Clear caches manually
import { getTailwindCache } from 'tailwind-to-style';
getTailwindCache().reset();
```

---

## [2.9.0] - 2025-09-03

### 🆕 Added
- **Responsive Selector Syntax**: Support for `'md:.title': 'text-lg'` format that automatically converts to `'.title': 'md:text-lg'`
  - Works with all breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
  - Generates proper @media queries
  - Backward compatible with existing syntax
- **Enhanced @css Directive**: Major improvements for CSS custom properties
  - Full support for CSS variables: `var(--custom-property)`
  - Support for CSS functions: `calc()`, `rgba()`, `linear-gradient()`, etc.
  - Proper preservation for complex CSS syntax

### 🐛 Fixed
- **Critical @css Corruption Bug**: Fixed issue where CSS values like `var(--primary)` were corrupted to `-var--primary`
  - Root cause: CSS values were processed through Tailwind expansion functions
  - Solution: Skip `expandGroupedClass` for @css property values
  - Result: Perfect preservation for all CSS syntax

### ⚡ Performance
- **Optimized CSS Processing**: Improved performance for @css directive processing
- **Better Error Recovery**: 100% error recovery rate for malformed inputs
- **Enhanced Memory Management**: Consistent performance across large datasets

### 🔧 Enhanced
- **Better Arbitrary Values Support**: Improved handling for complex CSS functions
- **Robust Error Handling**: Graceful degradation for invalid selectors and properties
- **Performance Monitoring**: Enhanced logging for slow operations

### 🧪 Testing
- **Comprehensive Test Coverage**: 10 major test points covering all library features
- **Stress Testing**: Memory stress tests and concurrent processing validation
- **Browser Environment Testing**: Auto-injection testing in real browser environment

### 📚 Documentation
- Added comprehensive testing documentation
- Enhanced examples for responsive selector syntax
- Improved @css directive usage examples

### 🔄 Migration
**No breaking changes** - All existing APIs remain compatible. New responsive selector syntax is additive feature.

### 🎯 Key Improvements
- **CSS Accuracy**: 100% preservation for CSS variables, functions, and complex expressions
- **Developer Experience**: Intuitive responsive selector syntax
- **Performance**: Excellent performance with 1000+ selectors (49ms processing time)
- **Reliability**: 100% error recovery rate for edge cases

---

## [2.7.0] - 2025-07-01

### 🆕 Added
- **Performance Monitoring System**: Built-in performance tracking for all main operations
- **Debug Utilities**: Export `performanceUtils` for monitoring and debugging
  - `getStats()` - Get cache and injection statistics
  - `clearCaches()` - Clear all caches
  - `enablePerformanceLogging()` - Toggle performance logging
- **Enhanced Error Handling**: Better error recovery and logging
- **Enhanced Auto-Injection**: Improved CSS injection with deduplication and stats

### 🔧 Changed
- **Refactored Architecture**: Split `twsx` function into modular functions
  - `expandGroupedClass()` - Class expansion utilities
  - `walkStyleTree()` - Style tree processing
  - `flattenStyleObject()` - Object flattening
  - `generateCssString()` - CSS generation
- **Enhanced Caching**: Better cache management with performance monitoring
- **Improved Debounce**: Enhanced debounce functions with error tracking

### ⚡ Performance
- **Optimized Cache Management**: Automatic cache size limiting
- **Performance Thresholds**: Automatic warning for operations > 5ms
- **Memory Leak Prevention**: Enhanced cache cleanup strategies

### 🐛 Fixed
- **Import Issues**: Fixed ES module imports with `.js` extensions
- **Error Boundary**: Better error isolation and recovery

### 📚 Documentation
- Added `REFACTORING.md` with detailed explanation
- Performance monitoring example (`examples/performance-monitoring.js`)
- Enhanced JSDoc comments

### 🔄 Migration
**No breaking changes** - All existing APIs remain the same. Users can upgrade seamlessly from v2.6.x.

### 🎯 Performance Metrics
- Functions > 5ms duration will be logged as warnings
- Cache cleanup operations are monitored
- CSS injection stats are displayed every 10 injections
- Built-in performance profiling for debugging

---

**Full Diff**: https://github.com/Bigetion/tailwind-to-style/compare/v2.6.3...v2.7.0
