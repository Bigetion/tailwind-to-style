# Changelog

## [2.12.0] - 2025-12-21

### 🎬 Animation & Transition Support

#### **Built-in Animations**
- ✅ **Animation Utilities**: Full support for Tailwind animations
  - `animate-spin` - Continuous rotation (loading spinners)
  - `animate-ping` - Scale and fade effect (notifications)
  - `animate-pulse` - Breathing opacity effect
  - `animate-bounce` - Bouncing effect
  - `animate-none` - Disable animations
  ```javascript
  tws('animate-spin'); // { animation: "spin 1s linear infinite" }
  ```

#### **Transition Utilities**
- ✅ **Transition Properties**: Control what properties transition
  - `transition` - Default transition (colors, opacity, shadow, transform, etc.)
  - `transition-all` - Transition all properties
  - `transition-colors` - Only color-related properties
  - `transition-opacity` - Only opacity
  - `transition-shadow` - Only box-shadow
  - `transition-transform` - Only transform
  - `transition-none` - Disable transitions

- ✅ **Duration Control**: Set transition duration
  - `duration-75` through `duration-1000` (75ms to 1000ms)
  ```javascript
  tws('duration-300'); // { transitionDuration: "300ms" }
  ```

- ✅ **Timing Functions**: Control animation easing
  - `ease-linear` - Linear timing
  - `ease-in` - Ease in
  - `ease-out` - Ease out
  - `ease-in-out` - Ease in and out
  ```javascript
  tws('ease-in-out'); // { transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }
  ```

- ✅ **Delay Control**: Set transition delay
  - `delay-75` through `delay-1000` (75ms to 1000ms)
  ```javascript
  tws('delay-150'); // { transitionDelay: "150ms" }
  ```

#### **Keyframes System**
- ✅ **Built-in Keyframes**: Pre-defined animation keyframes
  - `spin` - 360° rotation
  - `ping` - Scale and fade out
  - `pulse` - Opacity breathing
  - `bounce` - Bouncing motion with cubic-bezier timing

#### **Custom Animations**
- ✅ **Theme Extension**: Define custom animations via `configure()`
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

- ✅ **Plugin API Support**: Create animation plugins
  ```javascript
  const animPlugin = createUtilityPlugin(
    'customAnims',
    { shake: 'shake 0.5s ease-in-out' },
    { property: 'animation' }
  );
  ```

### 📝 Documentation & Examples
- ✅ Added comprehensive animation documentation to README
- ✅ Created `examples/animations.js` with real-world use cases
- ✅ Added test files: `test-animation.js`, `test-transition.js`

### 🔧 Technical Improvements
- ✅ New generators: `animation.js`, `transitionProperty.js`, `transitionDuration.js`, `transitionTimingFunction.js`, `transitionDelay.js`
- ✅ Updated theme config with animation values and keyframes
- ✅ All animation utilities work with responsive variants (md:, lg:) and state variants (hover:, focus:)

## [2.11.0] - 2025-12-20

### 🎉 Major Features

#### **Theme Customization System**
- ✅ **Custom Theme Extensions**: Extend default Tailwind theme with your own values
  - Custom colors, spacing, border radius, font sizes, and more
  - Deep merge support for nested theme values
  - Works seamlessly with existing Tailwind utilities
  ```javascript
  configure({
    theme: {
      extend: {
        colors: {
          brand: { 500: '#0ea5e9' },
        },
      },
    },
  });
  tws('bg-brand-500'); // Works!
  ```

#### **Plugin API**
- ✅ **Custom Utility Plugins**: Create your own utility classes
  - `createPlugin()` - Create simple utility plugins
  - `createUtilityPlugin()` - Create dynamic utilities with multiple values
  - `createVariantPlugin()` - Create custom variants (coming soon)
  ```javascript
  const plugin = createPlugin('my-plugin', {
    utilities: {
      '.text-gradient': {
        'background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
      },
    },
  });
  
  configure({ plugins: [plugin] });
  tws('text-gradient'); // Works!
  ```

#### **Configuration System**
- ✅ **`configure()` Function**: Apply theme and plugin configuration
- ✅ **`getConfig()` Function**: Get current configuration
- ✅ **`resetConfig()` Function**: Reset to defaults
- ✅ **Config File Support**: Create `tailwind-to-style.config.js`
- ✅ **Prefix Support**: Add prefix to all classes
- ✅ **Core Plugin Control**: Enable/disable core plugins

### 📦 New Exports
```javascript
// Configuration
export { configure, getConfig, resetConfig };

// Plugin API
export { createPlugin, createUtilityPlugin, createVariantPlugin };
```

### 📚 Documentation
- Added comprehensive theme customization guide
- Added plugin API documentation with examples
- Added example config files
- Created `examples/theme-customization.js`
- Created `examples/custom-plugins.js`
- Created `examples/tailwind-to-style.config.example.js`

### 🎯 TypeScript
- Added complete type definitions for configuration system
- Added plugin API types
- Better IntelliSense support for custom theme values

### 🔧 Technical Improvements
- User config management system
- Deep merge algorithm for theme extensions
- Plugin utilities integrated into CSS lookup
- Cache invalidation on config changes

### 💡 Use Cases Unlocked
- Brand-specific color systems
- Custom design tokens
- Glassmorphism effects
- Text gradients
- Custom shadows
- Scroll snap utilities
- And unlimited custom utilities!

---

## [2.10.0] - 2025-12-20

### 🚀 Major Improvements

#### **Modernization & Dependencies**
- ✅ **Updated all dependencies** to latest versions (December 2025)
  - ESLint: v8.16 → v9.15 (flat config support)
  - Jest: v28.1 → v30.0 (latest testing framework)
  - Rollup: v2.75 → v4.27 (latest bundler)
  - @rollup/* plugins: Updated to latest versions
- ✅ **Node.js support**: Dropped EOL versions, now supports 18.x, 20.x, 22.x LTS
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

#### **TypeScript & API**
- ✅ **Complete TypeScript definitions**: Added missing type exports
  - Logger and Logger class
  - LRUCache class
  - TwsError and error handlers
  - TailwindCache singleton
  - Better autocomplete support
- ✅ **New exports**: Exposed utility classes for advanced usage
  ```javascript
  import { 
    logger, Logger,
    LRUCache,
    TwsError, onError,
    getTailwindCache, resetTailwindCache
  } from 'tailwind-to-style';
  ```

### 🔧 Technical Improvements
- Performance: LRU caches are more efficient than Map with arbitrary cleanup
- Memory: Better memory management with proper cache eviction
- Security: Fixed outdated dependencies with known vulnerabilities
- Testing: Easier to test with singleton reset methods
- Production: No more console spam, production-safe logging

### 📚 Documentation
- Updated all inline JSDoc comments
- Added comprehensive error context
- Improved type definitions

### 🎯 Breaking Changes
None - All changes are backward compatible!

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
  // Your error tracking
  console.log(error.context);
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
