# Changelog

## [3.1.0] - 2025-01-03

### 🎨 New Features: Variants System

#### **🎭 Variants System for `twsx()`**
Powerful component variants system integrated directly into `twsx()`:

```javascript
const buttonStyles = twsx({
  '.btn': {
    base: 'px-4 py-2 rounded-lg font-medium transition-colors',
    variants: {
      color: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        danger: 'bg-red-500 text-white hover:bg-red-600'
      },
      size: {
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
      }
    },
    compounds: [
      {
        color: 'primary',
        size: 'lg',
        class: 'font-bold'
      }
    ],
    defaultVariants: {
      color: 'primary',
      size: 'md'
    }
  }
})
```

**Features:**
- ✅ **Variants**: Define multiple style variations for components
- ✅ **Compound Variants**: Handle specific combinations of variants
- ✅ **Default Variants**: Set default values for variants
- ✅ **Mixed Usage**: Use alongside classic `twsx()` syntax
- ✅ **Framework Agnostic**: Works with React, Vue, Angular, vanilla JS
- ✅ **Backward Compatible**: Doesn't break existing code
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Performance**: Optimized processing with caching

**Benefits:**
- **Maintainable**: Define variants once, use everywhere
- **Scalable**: No exponential growth of CSS classes
- **DX**: Better developer experience vs manual combinations

### 🔧 Internal Improvements
- Added `variantsProcessor.js` utility module
- Enhanced TypeScript definitions for variants
- Comprehensive test coverage for variants system
- Performance monitoring for variants processing

### 📚 Documentation
- Updated README with variants system documentation
- Added variants demo examples
- Enhanced TypeScript definitions

---

## [3.0.0] - 2024-12-22

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
