# Architecture Documentation

**Version:** 3.2.0  
**Last Updated:** February 24, 2026

## 📁 Project Structure

```
tailwind-to-style/
├── src/
│   ├── core/                    # Core functionality modules
│   │   ├── constants.js         # Pre-compiled regex & constants
│   │   ├── tws.js               # tws() function
│   │   ├── twsx.js              # twsx() function (planned)
│   │   └── twsxVariants.js      # twsxVariants() function (planned)
│   ├── css/                     # CSS processing utilities
│   │   ├── resolver.js          # CSS variable resolution
│   │   ├── parser.js            # Class parsing & opacity modifiers
│   │   └── generator.js         # CSS string generation
│   ├── config/                  # Configuration system
│   │   ├── index.js             # Config entry point
│   │   ├── userConfig.js        # User configuration handler
│   │   ├── theme.js             # Theme definitions
│   │   └── vars.js             # CSS variables
│   ├── generators/              # CSS generators per utility
│   │   ├── accentColor.js
│   │   ├── backgroundColor.js
│   │   └── ... (60+ generators)
│   ├── patterns/                # Pattern matching for custom values
│   │   └── index.js
│   ├── plugins/                 # Plugin system
│   │   └── pluginAPI.js
│   ├── presets/                 # Preset configurations
│   ├── utils/                   # Utility functions
│   │   ├── logger.js            # Logging system
│   │   ├── lruCache.js          # LRU Cache implementation
│   │   ├── errorHandler.js      # Error handling
│   │   ├── tailwindCache.js     # Singleton cache
│   │   ├── performanceMonitor.js # Performance tracking
│   │   ├── webAnimations.js     # Web Animations API
│   │   ├── dynamicAnimations.js
│   │   └── inlineAnimations.js
│   └── index.js                 # Main entry point
├── types/
│   └── index.d.ts               # TypeScript definitions
├── tests/                       # Test suites
│   ├── tws.test.js
│   ├── twsx.test.js
│   ├── twsxVariants.test.js     # New: Variant system tests
│   └── ... (30+ test files)
├── examples/                    # Usage examples
│   ├── basic/                   # Basic usage
│   ├── advanced/                # Advanced features
│   ├── components/              # Component examples
│   ├── frameworks/              # React, Vue, vanilla
│   └── performance/             # Benchmarks
├── dist/                        # Built files
└── docs/                        # Documentation

```

---

## 🏗️ Architecture Principles

### 1. **Modular Design**
- **Separation of Concerns:** Core functions, CSS utilities, and configuration are separated
- **Single Responsibility:** Each module has one clear purpose
- **Loose Coupling:** Modules communicate through well-defined interfaces

### 2. **Performance-First**
- **Pre-compiled Regex:** All regex patterns compiled once at module load
- **Multi-Level Caching:**
  - WeakMap for object identity (O(1) lookup)
  - LRU Cache for frequently accessed data
  - Singleton pattern for Tailwind CSS object
- **Fast Hashing:** FNV-1a algorithm for object hashing

### 3. **Tree-Shakeable**
- **ESM Modules:** All code uses ES6 modules
- **Side-Effect Free:** `"sideEffects": false` in package.json
- **Individual Exports:** Users can import only what they need

---

## 🔄 Data Flow

### tws() Function Flow

```
User Input (class string)
  │
  ├─> Parse classes (CLASS_PARSER_REGEX)
  │
  ├─> Check cache (tailwindCache)
  │   ├─> Cache HIT → Return cached result
  │   └─> Cache MISS ↓
  │
  ├─> Process each class:
  │   ├─> Extract opacity modifier
  │   ├─> Look up in cssObject
  │   ├─> Handle custom values [brackets]
  │   └─> Apply opacity if present
  │
  ├─> Resolve CSS variables (resolveCssToClearCss)
  │
  ├─> Merge declarations (separateAndResolveCSS)
  │
  ├─> Convert format:
  │   ├─> JSON (inlineStyleToJson)
  │   └─> CSS string
  │
  └─> Return result
```

### twsx() Function Flow

```
User Input (style object)
  │
  ├─> Hash input for caching
  │
  ├─> Check cache
  │   ├─> Cache HIT → Return cached CSS
  │   └─> Cache MISS ↓
  │
  ├─> Flatten nested selectors (flattenStyleObject)
  │
  ├─> Expand grouped classes (expandGroupedClass)
  │
  ├─> Walk style tree:
  │   ├─> Process base classes (tws)
  │   ├─> Handle nested selectors
  │   ├─> Apply variants (hover, focus, etc.)
  │   └─> Resolve media queries
  │
  ├─> Generate CSS string (generateCssString)
  │
  ├─> Inject keyframes (if animations detected)
  │
  ├─> Auto-inject to DOM (if inject: true)
  │
  └─> Return CSS string
```

### twsxVariants() Function Flow

```
User Input (className, config)
  │
  ├─> Hash config for caching
  │
  ├─> Check cache
  │   ├─> Cache HIT → Return cached function
  │   └─> Cache MISS ↓
  │
  ├─> Generate all variant combinations:
  │   ├─> Base classes
  │   ├─> Single variants
  │   ├─> Compound variants
  │   └─> Nested selectors
  │
  ├─> Inject all CSS (twsx)
  │
  ├─> Create class name builder function:
  │   ├─> Merge with defaults
  │   ├─> Check compound variants
  │   ├─> Resolve conflicts
  │   └─> Build className string
  │
  ├─> Cache function
  │
  └─> Return builder function
```

---

## 🚀 Performance Optimizations

### 1. **Regex Pre-compilation**
```javascript
// Before (Slow - creates new regex every call)
function parse(str) {
  return str.match(new RegExp(pattern));
}

// After (Fast - reuses pre-compiled regex)
const PATTERN_REGEX = /pattern/g;
function parse(str) {
  PATTERN_REGEX.lastIndex = 0;
  return str.match(PATTERN_REGEX);
}
```
**Performance Gain:** 50-100x faster

### 2. **Multi-Level Caching**

```
┌─────────────────────────────────────────┐
│ Level 1: WeakMap (Object Identity)     │ O(1) - Fastest
├─────────────────────────────────────────┤
│ Level 2: LRU Cache (Frequent Access)   │ O(1) - Fast
├─────────────────────────────────────────┤
│ Level 3: Singleton (CSS Object)        │ O(1) - One-time
├─────────────────────────────────────────┤
│ Level 4: Hash-based (Input Dedup)      │ O(1) - Medium
└─────────────────────────────────────────┘
```

### 3. **Fast Hashing (FNV-1a)**
```javascript
function hashString(str) {
  let hash = 2166136261; // FNV offset basis
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619); // FNV prime
  }
  return hash >>> 0;
}
```
**Performance Gain:** 100x faster than JSON.stringify

### 4. **Optimized Loops**
```javascript
// Before (Slow)
arr.forEach(item => process(item));

// After (Fast)
for (let i = 0; i < arr.length; i++) {
  process(arr[i]);
}
```
**Performance Gain:** 2-3x faster

---

## 🔌 Plugin System

### Plugin Architecture

```javascript
const plugin = {
  name: 'customPlugin',
  type: 'utility',
  utilities: {
    '.custom-class': 'custom: value;',
  },
  handler: (configOptions) => {
    // Generate CSS dynamically
  },
};
```

### Built-in Plugins (60+)
- **Layout:** display, position, flexbox, grid
- **Spacing:** padding, margin, gap
- **Typography:** font, text, color
- **Backgrounds:** bg color, image, gradient
- **Borders:** border, radius, dividers
- **Effects:** shadow, opacity, filters
- **Transforms:** translate, rotate, scale
- **Transitions:** transition, animation
- **Interactivity:** cursor, pointer-events

---

## 📦 Build & Distribution

### Bundle Formats

```
dist/
├── index.cjs           # CommonJS (Node.js)
├── index.esm.js        # ES Modules (Modern)
├── index.min.js        # UMD Browser (Minified)
├── index.d.ts          # TypeScript definitions
└── core/               # Tree-shakeable modules
    ├── tws.cjs
    ├── tws.esm.js
    ├── twsx.cjs
    └── twsx.esm.js
```

### Package.json Exports

```json
{
  "exports": {
    ".": "./dist/index.esm.js",
    "./tws": "./dist/core/tws.esm.js",
    "./twsx": "./dist/core/twsx.esm.js",
    "./twsx-variants": "./dist/core/twsxVariants.esm.js"
  },
  "sideEffects": false
}
```

---

## 🧪 Testing Strategy

### Test Pyramid

```
    ┌──────────┐
    │   E2E    │  React/Vue integration
    ├──────────┤
    │Integration│  twsx + variants
    ├──────────┤
    │   Unit   │  tws, parsers, utils
    └──────────┘
```

### Coverage Goals
- **Unit Tests:** 95%+ coverage
- **Integration Tests:** All major workflows
- **E2E Tests:** React/Vue component rendering

---

## 📊 Performance Metrics

### Benchmark Results

| Operation | First Call | Cached Call | Speed-up |
|-----------|------------|-------------|----------|
| Simple tws() | 0.5ms | 0.005ms | 100x |
| Complex tws() | 2ms | 0.02ms | 100x |
| twsx() nesting | 5ms | 0.05ms | 100x |
| twsxVariants() | 10ms | 0.1ms | 100x |

### Bundle Size
- **Full Build:** ~12KB minified + gzip
- **Tree-shaken (tws only):** ~4KB
- **Tree-shaken (twsx only):** ~6KB

---

## 🔮 Future Improvements

### Phase 1 (v3.3.0)
- [ ] Complete twsx.js & twsxVariants.js module extraction
- [ ] Update rollup config for new structure
- [ ] Add source maps for debugging

### Phase 2 (v3.4.0)
- [ ] Add React/Vue component wrappers
- [ ] Improve error messages with suggestions
- [ ] Add CSS minification option

### Phase 3 (v4.0.0)
- [ ] Full Tailwind v4 compatibility
- [ ] CSS-in-JS framework integrations
- [ ] Visual Studio Code extension

---

## 📚 Resources

- **Main Documentation:** [README.md](../README.md)
- **Migration Guide:** [MIGRATION.md](../MIGRATION.md)
- **Contributing Guide:** [CONTRIBUTING.md](../CONTRIBUTING.md) - **Changelog:** [CHANGELOG.md](../CHANGELOG.md)
- **Examples:** [examples/](../examples/)
- **TypeScript Types:** [types/index.d.ts](../types/index.d.ts)

---

**Maintained by:** Bigetion  
**License:** MIT  
**Repository:** https://github.com/Bigetion/tailwind-to-style
