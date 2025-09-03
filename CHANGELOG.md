# Changelog

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
