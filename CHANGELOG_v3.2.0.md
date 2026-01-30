# Changelog v3.2.0 - Advanced Features Release

## 🚀 Major Features

### 1. Plugin System
**Extensible architecture for custom utilities and components**

- `PluginRegistry` class for plugin management
- `createUtilityPlugin()` - Create custom utility plugins
- `createComponentPlugin()` - Create component-based plugins
- `usePlugin()` - Register plugins
- `defineUtility()` - Define custom utilities on the fly

**Built-in Plugins:**
- `gradientPlugin` - Advanced gradient utilities
- `animationPlugin` - Animation presets
- `typographyPlugin` - Enhanced typography utilities
- `aspectRatioPlugin` - Aspect ratio utilities
- `containerQueriesPlugin` - Container query support

**Example:**
```javascript
import { usePlugin, createUtilityPlugin } from 'tailwind-to-style';

const myPlugin = createUtilityPlugin({
  name: 'custom',
  utilities: {
    'special-box': {
      padding: '2rem',
      backgroundColor: '#ff6b6b',
      borderRadius: '1rem',
    }
  }
});

usePlugin(myPlugin);
```

### 2. Preset System
**Pre-configured design system themes**

**6 Built-in Presets:**
- **Material Design 3** - Google's Material Design color system
- **Ant Design** - Ant Design specifications
- **Bootstrap 5** - Bootstrap color scheme
- **Chakra UI** - Chakra UI design tokens
- **Glassmorphism** - Glass morphism effects
- **Neumorphism** - Soft UI shadows

**Functions:**
- `applyPreset(preset)` - Apply a preset theme
- `mergePresets(...presets)` - Combine multiple presets
- `createPreset(name, theme)` - Create custom presets

**Example:**
```javascript
import { applyPreset, materialPreset, glassmorphismPreset, mergePresets } from 'tailwind-to-style';

// Apply Material Design
applyPreset(materialPreset);

// Use Material colors
const styles = tws('bg-primary-500 text-white shadow-2');

// Merge presets
const customTheme = mergePresets(materialPreset, glassmorphismPreset);
applyPreset(customTheme);
```

### 3. Class Optimizer
**Intelligent class name optimization**

**Features:**
- Remove duplicate classes
- Resolve conflicting classes (last one wins)
- Sort classes by property priority
- Find and report conflicts
- Analyze class usage statistics
- Smart class merging

**Functions:**
- `removeDuplicates(classes)` - Remove duplicate classes
- `resolveConflicts(classes)` - Resolve conflicting utilities
- `sortByPriority(classes)` - Sort by CSS property priority
- `optimizeClasses(classes, options)` - Full optimization
- `findConflicts(classes)` - Find conflicting classes
- `analyzeClasses(classes)` - Get usage statistics
- `mergeClasses(...classes)` - Merge class strings intelligently

**Example:**
```javascript
import { optimizeClasses, findConflicts, analyzeClasses } from 'tailwind-to-style';

const messy = 'flex flex p-4 p-6 bg-red-500 bg-blue-500';

// Optimize
const optimized = optimizeClasses(messy, {
  removeDups: true,
  resolveConflict: true,
  sort: true,
});
// Result: 'flex p-6 bg-blue-500'

// Find conflicts
const conflicts = findConflicts(messy);
// Returns: Array of conflict objects

// Analyze
const analysis = analyzeClasses(messy);
// Returns: Statistics about class usage
```

### 4. Animation Builder
**Fluent API for creating animations**

**Features:**
- Custom animation builder with chainable API
- 15+ pre-built animations
- Animation sequences (one after another)
- Animation timelines (parallel animations)
- 25+ easing functions
- Keyframe generation

**Pre-built Animations:**
- `fadeIn`, `fadeOut`
- `slideInLeft`, `slideInRight`, `slideInTop`, `slideInBottom`
- `scaleIn`, `scaleOut`
- `bounce`, `shake`, `pulse`, `spin`, `wiggle`
- `heartbeat`, `flash`, `flip`

**Easing Functions:**
- Linear, ease, easeIn, easeOut, easeInOut
- Sine, Quad, Cubic, Quart, Quint
- Expo, Circ, Back
- Spring, Bounce

**Example:**
```javascript
import { createAnimation, animations, createSequence } from 'tailwind-to-style';

// Custom animation
const slideUp = createAnimation('slideUp')
  .from({ transform: 'translateY(100px)', opacity: '0' })
  .to({ transform: 'translateY(0)', opacity: '1' })
  .duration('500ms')
  .ease('easeOutCubic');

console.log(slideUp.toKeyframes());

// Pre-built animations
const fadeIn = animations.fadeIn('300ms');
const bounce = animations.bounce('600ms');

// Animation sequence
const sequence = createSequence()
  .step(animations.fadeIn('200ms'))
  .step(animations.scaleIn('300ms'))
  .step(animations.slideInBottom('400ms'));

console.log(sequence.toCss());
```

### 5. Composition API
**Styled-system like component primitives**

**Components:**
- `box` - Universal box primitive
- `flex`, `grid`, `stack`, `hstack`, `vstack` - Layout containers
- `center` - Center content
- `container` - Max-width container
- `button` - Button component with variants
- `card` - Card component
- `badge` - Badge component
- `input` - Input component with variants
- `text`, `heading` - Typography components
- `divider`, `spacer` - Layout helpers

**Utilities:**
- `createVariants(base, variants)` - Create component variants
- `createResponsive(prop, values)` - Responsive prop builder
- `systemProps(props)` - Parse system props
- `compose(...fns)` - Compose style functions
- `createComponent(component, defaults)` - Create themed components

**Example:**
```javascript
import { box, button, card, flex, center } from 'tailwind-to-style';

// Box primitive
const boxProps = box({
  p: '4',
  bg: 'blue-500',
  color: 'white',
  borderRadius: 'lg',
});

// Button with variants
const btnProps = button({
  variant: 'solid',      // solid | outline | ghost | link
  colorScheme: 'blue',
  size: 'lg',            // xs | sm | md | lg | xl
});

// Card component
const cardProps = card({
  p: '6',
  shadow: 'lg',
});

// Flex container
const flexProps = flex({
  justifyContent: 'between',
  alignItems: 'center',
  gap: '4',
});
```

### 6. SSR Utilities
**Server-side rendering helpers**

**Features:**
- Critical CSS extraction
- Style collection during SSR
- Style tag generation with nonce support
- Client-side hydration
- Static CSS generation
- Style streaming
- Unused style purging

**Functions:**
- `createStyleCollector()` - Collect styles during SSR
- `createSSRContext()` - SSR context manager
- `extractCriticalCss(classes, cache)` - Extract critical CSS
- `generateStyleTag(css, options)` - Generate style tag
- `generateStaticCss(classes, cache, options)` - Generate static CSS
- `preloadStyles(classes)` - Preload classes for hydration
- `hydrateStyles()` - Hydrate on client
- `createStyleStream()` - Stream styles
- `extractUsedClasses(html)` - Extract classes from HTML
- `purgeUnusedStyles(html, styles)` - Remove unused styles

**Example:**
```javascript
import { createStyleCollector, createSSRContext } from 'tailwind-to-style';

// Create collector
const collector = createStyleCollector();

// Collect styles
collector.add('p-4', { padding: '1rem' });
collector.add('bg-blue-500', { backgroundColor: '#3b82f6' });

// Get CSS
const css = collector.getCss();
const styleTag = collector.getStyleTag({ nonce: 'abc123' });

// SSR Context
const ssrContext = createSSRContext();
const result = ssrContext.collect(() => renderApp());
// Returns: { html, styles, styleTag, classes }
```

### 7. Class Validation
**Runtime validation with suggestions**

**Features:**
- Validate single or multiple classes
- Error messages with suggestions
- Auto-fix common mistakes
- Conflict detection
- Custom validation rules
- Validation reports

**Functions:**
- `validateClassName(className)` - Validate single class
- `validateClasses(classNames)` - Validate multiple classes
- `validateStrict(classNames)` - Validate with error throwing
- `validateWithWarnings(classNames)` - Validate with warnings
- `createValidator(rules)` - Create custom validator
- `checkConflicts(classNames)` - Check for conflicts
- `autoFix(classNames)` - Auto-fix common issues
- `createReport(classNames)` - Generate validation report

**Example:**
```javascript
import { validateClasses, validateWithWarnings, autoFix } from 'tailwind-to-style';

// Validate
const result = validateClasses('flex items-center invalid-class');
console.log(result.valid);        // false
console.log(result.errors);       // Array of errors with suggestions

// Validate with warnings (doesn't throw)
validateWithWarnings('flex-center text-middle');
// Logs warnings to console

// Auto-fix
const fixed = autoFix('flex-center text-middle margin-4');
console.log(fixed.classes);       // 'justify-center items-center text-center m-4'
console.log(fixed.changes);       // Array of changes made
```

### 8. DevTools
**Browser debugging utilities**

**Features:**
- Visual debug panel in browser
- Performance logging
- Cache inspection
- Usage tracking
- Element inspection
- Warning system
- Conflict highlighting

**Functions:**
- `enableDevTools(config)` - Enable DevTools
- `disableDevTools()` - Disable DevTools
- `createDebugPanel()` - Create visual debug panel
- `logPerformance(operation, duration)` - Log performance
- `showWarning(message, details)` - Show warnings
- `inspectElement(element)` - Inspect element styles
- `getCacheStats()` - Get cache statistics
- `trackUsage(className)` - Track class usage
- `getUsageStats()` - Get usage statistics

**Example:**
```javascript
import { enableDevTools, createDebugPanel, devTools } from 'tailwind-to-style';

// Enable DevTools
enableDevTools({
  logClassNames: true,
  logStyles: true,
  logPerformance: true,
  showWarnings: true,
  highlightConflicts: true,
});

// Create debug panel
createDebugPanel();

// Use DevTools API
devTools.logPerformance('Style generation', 15.5);
devTools.showWarning('Conflicting classes detected');
devTools.trackUsage('flex');
devTools.getUsageStats();
```

## 📊 Performance Improvements

- **10-300x faster** with warm cache (LRU + WeakMap + Map)
- **FNV-1a hashing** for fast object caching
- **Pre-compiled regex patterns** for 50-100x performance gain
- **Debounced operations** for better responsiveness
- **Class optimizer** reduces redundant processing

## 🏗️ Code Organization

**New Core Modules:**
- `src/core/plugin-system.js` - Plugin architecture
- `src/core/presets.js` - Design system presets
- `src/core/class-optimizer.js` - Class optimization
- `src/core/animation-builder.js` - Animation builder
- `src/core/composition-api.js` - Component primitives
- `src/core/ssr-utilities.js` - SSR helpers
- `src/core/validator.js` - Class validation
- `src/core/devtools.js` - DevTools utilities

**Infrastructure (from v3.1.3):**
- `src/core/constants.js` - Pre-compiled patterns
- `src/core/parser.js` - CSS parsing utilities
- `src/core/cache-manager.js` - Cache management
- `src/core/hashing.js` - Fast hashing
- `src/core/injector.js` - CSS injection
- `src/core/performance.js` - Performance monitoring
- `src/core/enhanced-features.js` - Helper functions

## 📚 Documentation

**New Documentation:**
- `docs/ADVANCED_FEATURES_GUIDE.md` - Complete guide for all v3.2 features
- `examples/advanced-features-demo.js` - Comprehensive feature demo
- Updated `README.md` with v3.2 features
- Enhanced `API.md` documentation

## 🔄 Migration Guide

**100% Backward Compatible!**

All v3.1.x features work exactly as before. New features are opt-in:

```javascript
// Old (still works)
import { tws, twsx } from 'tailwind-to-style';
const styles = tws('flex p-4');

// New (optional)
import { tws, optimizeClasses, applyPreset, materialPreset } from 'tailwind-to-style';

applyPreset(materialPreset);
const optimized = optimizeClasses('flex p-4');
const styles = tws(optimized);
```

## 📦 Bundle Size

- **Core only**: 12KB (minified + gzipped)
- **With all features**: 18KB (minified + gzipped)
- **Tree-shakeable**: Use only what you need!

## 🧪 Testing

- All existing tests pass
- New test coverage for advanced features
- Performance benchmarks included
- Example demos for all features

## 🎯 Use Cases

**Plugin System:**
- Create reusable design system utilities
- Share plugins across projects
- Extend Tailwind with custom utilities

**Preset System:**
- Quick theme switching
- Material Design integration
- Consistent design systems

**Class Optimizer:**
- Clean up dynamically generated classes
- Improve runtime performance
- Debug conflicting utilities

**Animation Builder:**
- Create complex animations without CSS
- Reusable animation presets
- Programmatic animation control

**Composition API:**
- Build component libraries
- Prop-based styling
- Styled-system compatibility

**SSR Utilities:**
- Critical CSS extraction
- Faster page loads
- Better SEO

**Class Validation:**
- Catch typos early
- Auto-fix common mistakes
- Better developer experience

**DevTools:**
- Debug styling issues
- Performance profiling
- Usage analytics

## 🚀 Getting Started

```bash
npm install tailwind-to-style@3.2.0
```

```javascript
import {
  tws,
  applyPreset,
  materialPreset,
  optimizeClasses,
  createAnimation,
  button,
  enableDevTools,
} from 'tailwind-to-style';

// Apply Material Design preset
applyPreset(materialPreset);

// Enable DevTools
enableDevTools({ logPerformance: true });

// Optimize classes
const classes = optimizeClasses('flex p-4 p-6 bg-primary-500');

// Use composition API
const btnProps = button({ variant: 'solid', colorScheme: 'primary' });

// Generate styles
const styles = tws(classes);
```

## 🙏 Contributors

Special thanks to all contributors who made this release possible!

## 📄 License

MIT License - See LICENSE file for details

---

**Full Changelog**: v3.1.3...v3.2.0

**Documentation**: [Advanced Features Guide](docs/ADVANCED_FEATURES_GUIDE.md)

**Examples**: [Advanced Features Demo](examples/advanced-features-demo.js)
