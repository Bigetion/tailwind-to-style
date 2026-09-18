# Bundle Size Analysis Report

**Generated:** 2026-09-19  
**Version:** 4.0.2  
**Branch:** feat/production-ready-v5

---

## Summary

| Build Type | File | Size (Raw) | Size (Gzipped Est.) | Notes |
|------------|------|------------|---------------------|-------|
| ESM | `dist/index.esm.js` | 382 KB | ~90 KB | Main entry point |
| CommonJS | `dist/index.cjs` | 382 KB | ~90 KB | Node.js build |
| UMD (CDN) | `dist/index.min.js` | 170 KB | ~45 KB | Minified + Terser |

### Tree-Shakeable Subpaths

| Import Path | File | Size (Raw) | Purpose |
|-------------|------|------------|---------|
| `tailwind-to-style/cx` | `cx.esm.js` | 3.3 KB | Conditional class merging |
| `tailwind-to-style/tokens` | `tokens/index.esm.js` | 11 KB | Design token system |
| `tailwind-to-style/animations` | `animations/index.esm.js` | 42.6 KB | Animation presets |
| `tailwind-to-style/react` | `react/index.esm.js` | 42.6 KB | React bindings |
| `tailwind-to-style/tws` | `core/tws.esm.js` | 265 KB | Inline style converter |

---

## Key Findings

### 🚨 Critical Issues

1. **Main Bundle Too Large (382 KB uncompressed)**
   - Target should be <100 KB for runtime CSS engine
   - Current size is **3.8x larger** than ideal
   - UMD minified is 170 KB (still 1.7x target)

2. **Circular Dependencies Detected**
   ```
   src/className/index.js -> src/index.js -> src/className/index.js
   ```
   - This prevents effective tree-shaking
   - Causes redundant code in all bundles
   - Must be refactored immediately

3. **`tws` Subpath Still Heavy (265 KB)**
   - Should be <50 KB for inline style conversion only
   - Likely includes full generator suite unnecessarily

### ⚠️ Moderate Concerns

4. **Monolithic `src/index.js` (2757 lines)**
   - All generators bundled together
   - No code-splitting or lazy loading
   - Difficult to maintain and test

5. **Source Maps Larger Than Code**
   - `index.esm.js.map`: 831 KB (2.2x code size)
   - Consider using smaller source map format

### ✅ Positive Observations

6. **`cx` Module is Excellent**
   - Only 3.3 KB - perfect for utility function
   - Good candidate for tree-shaking

7. **Tokens Module Reasonable**
   - 11 KB is acceptable for design token system
   - Could be further optimized but not urgent

---

## Comparison vs Competitors

| Library | Bundle Size (min+gzip) | Runtime | Build Required |
|---------|------------------------|---------|----------------|
| **tailwind-to-style** | **~45 KB** | ✅ Yes | ❌ No |
| Tailwind CSS | N/A (build-time) | ❌ No | ✅ Yes (PostCSS) |
| Stitches | ~7.9 KB | ✅ Yes | ❌ No |
| CVA | ~1.2 KB | ❌ No | ✅ Yes |
| twin.macro | ~5 KB | ✅ Yes | ✅ Yes (Babel) |

**Analysis:**
- We're **5.7x larger** than Stitches (main competitor)
- Trade-off: Full Tailwind syntax support vs bundle size
- Need to reduce to **~15-20 KB** to be competitive

---

## Optimization Recommendations

### High Priority (Bundle Size Reduction)

1. **Code-Split Generators by Category**
   ```
   generators/
     ├── layout.js      (flex, grid, display)
     ├── spacing.js     (padding, margin, gap)
     ├── colors.js      (bg, text, border colors)
     ├── typography.js  (font, text-size, line-height)
     └── effects.js     (shadow, opacity, blur)
   ```
   **Potential Savings:** 40-50% reduction

2. **Lazy Load Rarely-Used Utilities**
   - Backdrop filters
   - Complex animations
   - 3D transforms
   **Potential Savings:** 15-20 KB

3. **Fix Circular Dependencies**
   - Extract shared utilities to `src/shared/`
   - Prevent `className` ↔ `index` circular imports
   **Potential Savings:** 20-30% (improves tree-shaking)

4. **Optimize CSS Generation Cache**
   - Move large lookup tables to lazy imports
   - Use Map/WeakMap instead of plain objects
   **Potential Savings:** 10-15 KB

### Medium Priority (Developer Experience)

5. **Add Bundle Size Monitoring**
   - CI checks with size-limit
   - Block PRs if bundle grows >5%
   - Track per-module size

6. **Create Performance Benchmarks**
   - Runtime CSS generation speed
   - Memory usage under load
   - Cache efficiency metrics

7. **Document Tree-Shaking Strategy**
   - Show users how to minimize bundle
   - Provide "light" vs "full" import paths

---

## Visual Analysis

Bundle composition visualizations are available:
- `stats/main-esm.html` - Main ESM bundle treemap
- `stats/umd-minified.html` - Minified UMD bundle treemap

**Open these files in a browser to see:**
- Which modules contribute most to bundle size
- Duplicated dependencies
- Tree-shaking opportunities

---

## Action Items

- [ ] Implement generator code-splitting
- [ ] Fix circular dependency (className ↔ index)
- [ ] Reduce main bundle to <150 KB (target: 100 KB)
- [ ] Add size-limit to CI pipeline
- [ ] Create "core" minimal build (<30 KB)
- [ ] Benchmark vs Stitches performance
- [ ] Document optimization guide for users

---

## Measurement Methodology

```bash
# Generate this report
npm run build -- --environment ANALYZE

# Check sizes
ls -lh dist/*.js

# Open visual analysis
open stats/main-esm.html
open stats/umd-minified.html
```

**Tools Used:**
- rollup-plugin-visualizer (treemap analysis)
- rollup-plugin-terser (minification)
- Manual size calculations (KB estimates)

---

## Next Steps

1. **Immediate:** Fix circular dependencies
2. **Week 1:** Implement code-splitting for generators
3. **Week 2:** Add bundle size CI monitoring
4. **Week 3:** Create minimal "core" build variant
5. **Month 1:** Achieve <100 KB main bundle goal

**Target for v5.0.0:**
- Main bundle: 100 KB raw, ~25 KB gzipped
- Core minimal: 30 KB raw, ~8 KB gzipped
- Zero circular dependencies
- Automated size regression prevention
