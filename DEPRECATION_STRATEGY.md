# Deprecation Strategy

## Overview

During the modular refactoring, we maintain **full backward compatibility** while encouraging users to adopt modern APIs.

---

## Deprecated Functions

### 1. SSR Functions (Legacy)

**Deprecated:**
```js
import { startSSR, stopSSR, getSSRStyles } from 'tailwind-to-style';
```

**Modern Alternative:**
```js
import { createSSRCollector } from 'tailwind-to-style';

const collector = createSSRCollector();
// ... render components
const styles = collector.getStyles();
```

**Status:** ✅ Kept for backward compatibility with `@deprecated` JSDoc tags

**Reason:** Modern API is more flexible and supports concurrent rendering.

---

### 2. Cache Eviction (Internal)

**Deprecated:**
```js
evictMap(map, maxSize) // Internal use only
```

**Modern Alternative:**
```js
// Use LRUCache which handles eviction automatically
const cache = new LRUCache(maxSize);
cache.set(key, value); // Auto-evicts when full
```

**Status:** ✅ Marked as deprecated, internal use only

**Reason:** LRUCache is more efficient and handles eviction automatically.

---

## IDE Warnings

### Why You See Deprecation Warnings

When importing deprecated functions in `src/index.js`:
```js
import {
  startSSR,    // ⚠️ Deprecated
  stopSSR,     // ⚠️ Deprecated  
  getSSRStyles // ⚠️ Deprecated
} from "./utils/ssr.js";
```

**This is intentional and correct!**

### Why We Keep Them

1. **Backward Compatibility:** Existing users don't break
2. **Gradual Migration:** Users can migrate at their own pace
3. **Clear Documentation:** `@deprecated` tags guide users to modern APIs
4. **No Breaking Changes:** v5 upgrade is smooth

### How to Suppress (Not Recommended)

If you want to suppress IDE warnings:
```js
// @ts-ignore - Kept for backward compatibility
import { startSSR, stopSSR, getSSRStyles } from "./utils/ssr.js";
```

**We don't recommend this** because:
- Warnings serve as reminders
- Encourages internal refactoring
- Maintains code quality

---

## Migration Timeline

### Phase 1: Soft Deprecation (Current - v5.x)
- ✅ Deprecated functions work normally
- ✅ JSDoc `@deprecated` tags added
- ✅ Modern APIs available
- ✅ No breaking changes

### Phase 2: Deprecation Warnings (v6.x - Planned)
- ⚠️ Console warnings when using deprecated functions
- ✅ Still functional
- 📖 Documentation updated with migration guides

### Phase 3: Hard Deprecation (v7.x - Future)
- ❌ Deprecated functions throw errors
- 📝 Must use modern APIs

### Phase 4: Removal (v8.x - Future)
- 🗑️ Deprecated functions removed completely

---

## For Library Maintainers

### Adding New Deprecations

1. **Add JSDoc tag:**
```js
/**
 * @deprecated Use newFunction() instead
 * @see {@link newFunction}
 */
export function oldFunction() {
  // implementation
}
```

2. **Export modern alternative:**
```js
export { newFunction } from './modern-api.js';
```

3. **Update documentation:**
- README.md
- CHANGELOG.md
- Migration guide

4. **Add to DEPRECATION_STRATEGY.md** (this file)

---

## For Users

### How to Migrate

1. **Check deprecation warnings** in your IDE
2. **Read JSDoc tags** for alternatives
3. **Update imports** to modern APIs
4. **Test thoroughly** before deploying

### Example Migration

**Before (Deprecated):**
```js
import { startSSR, stopSSR, getSSRStyles } from 'tailwind-to-style';

startSSR();
// ... render
const styles = stopSSR();
```

**After (Modern):**
```js
import { createSSRCollector } from 'tailwind-to-style';

const collector = createSSRCollector();
// ... render
const styles = collector.getStyles();
```

---

## Summary

| Function | Status | Alternative | Timeline |
|----------|--------|-------------|----------|
| `startSSR` | Deprecated | `createSSRCollector` | Keep until v7 |
| `stopSSR` | Deprecated | `createSSRCollector` | Keep until v7 |
| `getSSRStyles` | Deprecated | `createSSRCollector` | Keep until v7 |
| `evictMap` | Deprecated | `LRUCache` | Internal only |

---

**Conclusion:** Deprecation warnings are intentional and serve as a guide for users to adopt better APIs while maintaining full backward compatibility.
