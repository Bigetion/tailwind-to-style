# Changelog

## [2.7.0] - 2025-07-01

### 🆕 Added
- **Performance Monitoring System**: Built-in performance tracking untuk semua operasi utama
- **Debug Utilities**: Export `performanceUtils` untuk monitoring dan debugging
  - `getStats()` - Mendapatkan statistik cache dan injection
  - `clearCaches()` - Membersihkan semua cache
  - `enablePerformanceLogging()` - Toggle performance logging
- **Enhanced Error Handling**: Better error recovery dan logging
- **Enhanced Auto-Injection**: Improved CSS injection dengan deduplication dan stats

### 🔧 Changed
- **Refactored Architecture**: Memecah fungsi `twsx` menjadi modular functions
  - `expandGroupedClass()` - Class expansion utilities
  - `walkStyleTree()` - Style tree processing
  - `flattenStyleObject()` - Object flattening
  - `generateCssString()` - CSS generation
- **Enhanced Caching**: Better cache management dengan performance monitoring
- **Improved Debounce**: Enhanced debounce functions dengan error tracking

### ⚡ Performance
- **Optimized Cache Management**: Automatic cache size limiting
- **Performance Thresholds**: Automatic warning untuk operasi > 5ms
- **Memory Leak Prevention**: Enhanced cache cleanup strategies

### 🐛 Fixed
- **Import Issues**: Fixed ES module imports dengan `.js` extensions
- **Error Boundary**: Better error isolation dan recovery

### 📚 Documentation
- Added `REFACTORING.md` dengan detailed explanation
- Performance monitoring example (`examples/performance-monitoring.js`)
- Enhanced JSDoc comments

### 🔄 Migration
**No breaking changes** - All existing APIs remain the same. Users can upgrade seamlessly from v2.6.x.

### 🎯 Performance Metrics
- Functions > 5ms duration akan di-log sebagai warning
- Cache cleanup operations dimonitor
- CSS injection stats ditampilkan setiap 10 injections
- Built-in performance profiling untuk debugging

---

**Full Diff**: https://github.com/Bigetion/tailwind-to-style/compare/v2.6.3...v2.7.0
