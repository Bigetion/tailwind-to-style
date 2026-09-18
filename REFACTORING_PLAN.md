# Refactoring Plan: Modularize src/index.js

**Goal:** Break down monolithic 2757-line `src/index.js` into smaller, maintainable modules while fixing circular dependencies.

**Status:** 🟡 Planning Phase  
**Branch:** feat/production-ready-v5

---

## Current Issues

### 1. Circular Dependency
```
src/className/index.js → src/index.js → src/className/index.js
```

**Root Cause:**
- `className/index.js` imports `twsx` from `../index.js`
- `index.js` likely re-exports or uses something from `className`

### 2. Monolithic Structure

`src/index.js` (2757 lines) contains:
- Cache management (LRU, eviction)
- CSS string generation
- Parser functions (encodeBracketValues, decodeBracketValues, parseSelector)
- Style resolvers (resolveVariants, processOpacityModifier)
- Core functions (tws, twsx, twsxVariants)
- CSS injection (autoInjectCss, rebuildStyleTag)
- Animation keyframe generation
- Utility functions (debounce, hashString, fastObjectHash)
- SSR support

### 3. Code Organization

Current structure mixes concerns:
- **Data layer** (caches, state management)
- **Parser layer** (string parsing, tokenization)
- **Generator layer** (CSS generation)
- **Injector layer** (DOM manipulation)
- **API layer** (public functions)

---

## Proposed Module Structure

```
src/
├── shared/
│   ├── cache.js           # LRU cache, eviction, cache management
│   ├── constants.js       # MAX_CACHE_SIZE, CSS patterns, etc.
│   └── hash.js            # hashString, fastObjectHash
│
├── parser/
│   ├── bracket.js         # encodeBracketValues, decodeBracketValues
│   ├── selector.js        # parseSelector, replaceSelector
│   └── variants.js        # resolveVariants, expandVariants
│
├── generator/
│   ├── css-string.js      # generateCssString, resolveCssToClearCss
│   ├── keyframes.js       # generateMinifiedKeyframes
│   └── opacity.js         # processOpacityModifier
│
├── injector/
│   ├── dom.js             # autoInjectCss, rebuildStyleTag
│   └── ssr.js             # SSR collection (already exists in utils/)
│
├── core/
│   ├── tws.js             # Inline style converter (already exists)
│   ├── twsx.js            # CSS-in-JS (already exists)
│   └── twsxVariants.js    # Variants system (already exists)
│
├── utils/
│   ├── debounce.js        # debounce function
│   ├── object.js          # Object utilities
│   └── ssr.js             # SSR utilities (already exists)
│
└── index.js               # Main entry point (exports only)
```

---

## Refactoring Strategy

### Phase 1: Extract Utilities (Low Risk)

**Files to create:**
1. `src/shared/constants.js` - Move all constants
2. `src/shared/hash.js` - Move hash functions
3. `src/utils/debounce.js` - Move debounce

**Benefits:**
- No circular dependency risk
- Easy to test
- Clear separation of concerns

### Phase 2: Extract Cache Management (Medium Risk)

**Files to create:**
1. `src/shared/cache.js` - LRU cache, eviction logic

**Dependencies:** None (standalone)

### Phase 3: Extract Parsers (Medium Risk)

**Files to create:**
1. `src/parser/bracket.js` - encode/decode bracket values
2. `src/parser/selector.js` - parseSelector, replaceSelector
3. `src/parser/variants.js` - resolveVariants, expandVariants

**Dependencies:** 
- `shared/constants.js`
- `shared/cache.js`

### Phase 4: Extract Generators (Medium Risk)

**Files to create:**
1. `src/generator/css-string.js` - CSS string generation
2. `src/generator/keyframes.js` - Animation keyframes
3. `src/generator/opacity.js` - Opacity modifiers

**Dependencies:**
- `parser/*`
- `shared/*`

### Phase 5: Extract Injector (High Risk)

**Files to create:**
1. `src/injector/dom.js` - DOM CSS injection

**Dependencies:**
- `generator/*`
- `utils/ssr.js`

### Phase 6: Fix Circular Dependency (High Risk)

**Problem:**
```javascript
// src/className/index.js
import { twsx } from "../index.js"; // ❌ Circular

// src/index.js
export { ... } from "./className/index.js"; // ❌ Circular
```

**Solution:**
```javascript
// src/className/index.js
import { twsx } from "../core/twsx-impl.js"; // ✅ Direct import

// src/core/twsx-impl.js (new file)
// Contains actual twsx implementation
export function twsx(obj, options) { ... }

// src/core/twsx.js (existing)
export { twsx } from './twsx-impl.js';

// src/index.js
export { twsx } from './core/twsx-impl.js';
```

### Phase 7: Main Entry Point (Final)

Update `src/index.js` to be a clean aggregator:

```javascript
// Cache & utilities
export { LRUCache } from './shared/cache.js';
export { hashString } from './shared/hash.js';

// Core API
export { tws } from './core/tws-impl.js';
export { twsx } from './core/twsx-impl.js';
export { twsxVariants } from './core/twsxVariants-impl.js';

// Utilities
export { cx } from './cx.js';

// SSR
export { createSSRCollector } from './utils/ssr.js';

// Re-exports for backward compatibility
export * from './className/index.js';
```

---

## Testing Strategy

### Before Each Phase
1. Run existing tests: `npm test`
2. Check build succeeds: `npm run build`
3. Validate types: `npm run validate:types`

### After Each Phase
1. Run tests again to verify no breakage
2. Check bundle size hasn't increased significantly
3. Manually test in examples/

### Regression Prevention
1. Add integration test that imports all public APIs
2. Test circular dependency is gone: `madge --circular src/`
3. Verify tree-shaking still works

---

## Benefits After Refactoring

### 1. Bundle Size Reduction
- Tree-shaking will work better (no circular deps)
- Dead code elimination more effective
- **Expected savings: 20-30%**

### 2. Maintainability
- Each module <300 lines
- Clear responsibilities
- Easier to understand and modify

### 3. Testing
- Unit test individual modules
- Mock dependencies easily
- Better test coverage

### 4. Performance
- Can lazy-load rarely used modules
- Better code-splitting opportunities
- Reduced initial parse time

### 5. Developer Experience
- Easier onboarding for contributors
- Clear module boundaries
- Better IDE navigation

---

## Risks & Mitigation

### Risk 1: Breaking Changes
**Mitigation:**
- Keep public API identical
- Maintain backward compatibility
- Run full test suite after each phase

### Risk 2: Bundle Size Increase
**Mitigation:**
- Monitor size after each commit
- Use rollup's `preserveModules` to verify tree-shaking
- Compare before/after with `npm run size`

### Risk 3: Performance Regression
**Mitigation:**
- Benchmark critical paths
- Use lazy imports where safe
- Profile before/after with Chrome DevTools

### Risk 4: Merge Conflicts
**Mitigation:**
- Work in dedicated branch
- Merge master regularly
- Complete refactoring in one sprint

---

## Timeline

| Phase | Estimated Time | Risk Level |
|-------|---------------|------------|
| Phase 1: Utilities | 1-2 hours | Low |
| Phase 2: Cache | 1 hour | Medium |
| Phase 3: Parsers | 2-3 hours | Medium |
| Phase 4: Generators | 2-3 hours | Medium |
| Phase 5: Injector | 1-2 hours | High |
| Phase 6: Fix Circular | 2-3 hours | High |
| Phase 7: Entry Point | 1 hour | Medium |
| **Total** | **10-16 hours** | - |

---

## Success Criteria

- [ ] Zero circular dependencies
- [ ] All tests pass
- [ ] Bundle size ≤ current size (ideally 20% smaller)
- [ ] No breaking changes to public API
- [ ] Type definitions still valid
- [ ] Examples still work
- [ ] Performance maintained or improved
- [ ] All modules <300 lines
- [ ] Clear module boundaries documented

---

## Next Steps

1. Install `madge` to detect circular dependencies:
   ```bash
   npm install --save-dev madge
   ```

2. Analyze current dependencies:
   ```bash
   npx madge --circular src/
   ```

3. Start with Phase 1 (Utilities) - lowest risk

4. Commit after each successful phase

5. Write migration guide if any internal APIs change

---

## Notes

- This is a **structural refactoring**, not a rewrite
- Focus on module boundaries, not algorithm changes
- Keep git history clean with atomic commits per phase
- Document any decisions that deviate from this plan
- If a phase takes >2x estimated time, pause and reassess

---

**Status Legend:**
- 🟢 Complete
- 🟡 In Progress  
- 🔴 Blocked
- ⚪ Not Started

**Current Phase:** ⚪ Phase 0 - Planning
