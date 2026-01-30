## v3.2.0 Advanced Features Guide

Comprehensive guide for all advanced features in tailwind-to-style v3.2.0.

---

## Table of Contents

1. [Plugin System](#1-plugin-system)
2. [Preset System](#2-preset-system)
3. [Class Optimizer](#3-class-optimizer)
4. [Animation Builder](#4-animation-builder)
5. [Composition API](#5-composition-api)
6. [SSR Utilities](#6-ssr-utilities)
7. [Class Validation](#7-class-validation)
8. [DevTools](#8-devtools)

---

## 1. Plugin System

Extend the library with custom utilities and components.

### Basic Usage

```javascript
import { usePlugin, createUtilityPlugin } from 'tailwind-to-style';

// Create custom plugin
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

// Register plugin
usePlugin(myPlugin);

// Use custom utility
const styles = tws('special-box text-white');
```

### Built-in Plugins

```javascript
import {
  gradientPlugin,
  animationPlugin,
  typographyPlugin,
  aspectRatioPlugin,
  containerQueriesPlugin,
  usePlugin
} from 'tailwind-to-style';

// Use all built-in plugins
usePlugin(gradientPlugin);
usePlugin(animationPlugin);
usePlugin(typographyPlugin);
usePlugin(aspectRatioPlugin);
usePlugin(containerQueriesPlugin);
```

### Creating Component Plugins

```javascript
import { createComponentPlugin } from 'tailwind-to-style';

const buttonPlugin = createComponentPlugin({
  name: 'button',
  components: {
    'btn-primary': {
      base: {
        padding: '0.5rem 1rem',
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        borderRadius: '0.375rem',
        fontWeight: '600',
        cursor: 'pointer',
      },
      variants: {
        hover: {
          backgroundColor: '#2563eb',
        },
        disabled: {
          opacity: '0.5',
          cursor: 'not-allowed',
        }
      }
    }
  }
});

usePlugin(buttonPlugin);
```

---

## 2. Preset System

Pre-configured design system themes.

### Available Presets

```javascript
import {
  applyPreset,
  materialPreset,
  antDesignPreset,
  bootstrapPreset,
  chakraPreset,
  glassmorphismPreset,
  neumorphismPreset
} from 'tailwind-to-style';

// Apply Material Design
applyPreset(materialPreset);

// Now use Material Design colors
const styles = tws('bg-primary-500 text-white shadow-2');
```

### Merging Presets

```javascript
import { mergePresets, materialPreset, glassmorphismPreset } from 'tailwind-to-style';

// Combine Material Design with Glassmorphism
const customTheme = mergePresets(materialPreset, glassmorphismPreset);
applyPreset(customTheme);

// Use combined features
const styles = tws('bg-glass backdrop-blur-md border-glass bg-primary-500');
```

### Creating Custom Presets

```javascript
import { createPreset, applyPreset } from 'tailwind-to-style';

const myPreset = createPreset('My Theme', {
  extend: {
    colors: {
      brand: {
        50: '#f0f9ff',
        500: '#0ea5e9',
        900: '#0c4a6e',
      }
    },
    borderRadius: {
      huge: '3rem',
    }
  }
});

applyPreset(myPreset);
```

### Preset Features

#### Material Design
- Primary/Secondary color palettes
- Material shadows (1-5)
- Material border radius
- Roboto font family

#### Ant Design
- Ant Design color system
- Success/Warning/Error states
- 13-level neutral scale
- System font stack

#### Bootstrap
- Bootstrap 5 colors
- Bootstrap shadows
- Bootstrap border radius
- Bootstrap spacing

#### Chakra UI
- Chakra color scales
- Chakra shadows
- Chakra border radius
- Comprehensive gray scale

#### Glassmorphism
- Glass backgrounds
- Backdrop blur utilities
- Glass borders

#### Neumorphism
- Neumorphic shadows
- Light/Dark mode support
- Soft UI effects

---

## 3. Class Optimizer

Optimize class names for better performance and maintainability.

### Remove Duplicates

```javascript
import { removeDuplicates } from 'tailwind-to-style';

const classes = 'flex flex items-center items-center p-4';
const result = removeDuplicates(classes);
// Result: 'flex items-center p-4'
```

### Resolve Conflicts

```javascript
import { resolveConflicts } from 'tailwind-to-style';

const classes = 'p-4 p-6 bg-red-500 bg-blue-500 text-white';
const result = resolveConflicts(classes);
// Result: 'p-6 bg-blue-500 text-white' (last one wins)
```

### Find Conflicts

```javascript
import { findConflicts } from 'tailwind-to-style';

const classes = 'p-4 p-6 bg-red-500 bg-blue-500';
const conflicts = findConflicts(classes);

conflicts.forEach(conflict => {
  console.log(`Property: ${conflict.property}`);
  console.log(`Conflicting classes: ${conflict.classes.join(', ')}`);
  console.log(`Winner: ${conflict.winner}`);
});
```

### Optimize Classes

```javascript
import { optimizeClasses } from 'tailwind-to-style';

const messy = 'flex flex p-4 p-6 p-4 bg-red-500 bg-blue-500 text-white text-white';

const optimized = optimizeClasses(messy, {
  removeDups: true,        // Remove duplicates
  resolveConflict: true,   // Resolve conflicts (last wins)
  sort: true,              // Sort by priority
  minify: true,            // Remove extra whitespace
});

// Result: 'flex p-6 bg-blue-500 text-white'
```

### Analyze Classes

```javascript
import { analyzeClasses } from 'tailwind-to-style';

const classes = 'flex p-4 p-6 bg-blue-500 hover:bg-blue-600 text-white';
const analysis = analyzeClasses(classes);

console.log(analysis);
// {
//   total: 6,
//   unique: 5,
//   duplicates: 0,
//   conflicts: 1,
//   variants: { hover: 1 },
//   properties: { display: 1, padding: 2, backgroundColor: 1, color: 1 }
// }
```

### Merge Classes

```javascript
import { mergeClasses } from 'tailwind-to-style';

const merged = mergeClasses(
  'flex items-center p-4',
  'justify-between bg-blue-500',
  'text-white hover:bg-blue-600',
  null,  // Null values are filtered out
  undefined,
  'rounded-lg'
);

// Result: Optimized merged classes with conflicts resolved
```

---

## 4. Animation Builder

Create custom animations with a fluent API.

### Basic Animation

```javascript
import { createAnimation } from 'tailwind-to-style';

const fadeIn = createAnimation('fadeIn')
  .from({ opacity: '0' })
  .to({ opacity: '1' })
  .duration('300ms')
  .ease('easeOut');

// Get CSS
console.log(fadeIn.toKeyframes());
console.log(fadeIn.toCss());

// Get inline styles
const styles = fadeIn.toStyles();
// { animation: 'fadeIn 300ms ease-out 0s 1 normal none' }
```

### Advanced Animation

```javascript
const bounce = createAnimation('bounce')
  .from({ transform: 'translateY(0)' })
  .at(25, { transform: 'translateY(-20px)' })
  .at(50, { transform: 'translateY(0)' })
  .at(75, { transform: 'translateY(-10px)' })
  .to({ transform: 'translateY(0)' })
  .duration('600ms')
  .ease('easeInOutCubic')
  .repeat('infinite')
  .direction('normal')
  .fillMode('both');
```

### Pre-built Animations

```javascript
import { animations } from 'tailwind-to-style';

// All available animations
animations.fadeIn('300ms')
animations.fadeOut('300ms')
animations.slideInLeft('300ms', '100%')
animations.slideInRight('300ms', '100%')
animations.slideInTop('300ms', '100%')
animations.slideInBottom('300ms', '100%')
animations.scaleIn('300ms')
animations.scaleOut('300ms')
animations.bounce('600ms')
animations.shake('500ms')
animations.pulse('600ms')
animations.spin('1000ms')
animations.wiggle('500ms')
animations.heartbeat('1200ms')
animations.flash('500ms')
animations.flip('600ms')
```

### Animation Sequences

```javascript
import { createSequence, animations } from 'tailwind-to-style';

const sequence = createSequence()
  .step(animations.fadeIn('200ms'))
  .step(animations.scaleIn('300ms'))
  .step(animations.slideInBottom('400ms', '50px'));

// Animations play one after another
const styles = sequence.toStyles();
```

### Animation Timeline (Parallel)

```javascript
import { createTimeline, animations } from 'tailwind-to-style';

const timeline = createTimeline()
  .add(animations.fadeIn('500ms'), 0)        // Start at 0ms
  .add(animations.scaleIn('500ms'), 100)    // Start at 100ms
  .add(animations.bounce('600ms'), 200);    // Start at 200ms

// All animations play in parallel with different start times
const styles = timeline.toStyles();
```

### Easing Functions

25+ easing functions available:

```javascript
import { easings } from 'tailwind-to-style';

// Available easings
easings.linear
easings.ease
easings.easeIn
easings.easeOut
easings.easeInOut
easings.easeInSine
easings.easeOutSine
easings.easeInOutSine
easings.easeInQuad
easings.easeOutQuad
easings.easeInOutQuad
easings.easeInCubic
easings.easeOutCubic
easings.easeInOutCubic
easings.easeInQuart
easings.easeOutQuart
easings.easeInOutQuart
easings.easeInQuint
easings.easeOutQuint
easings.easeInOutQuint
easings.easeInExpo
easings.easeOutExpo
easings.easeInOutExpo
easings.easeInCirc
easings.easeOutCirc
easings.easeInOutCirc
easings.easeInBack
easings.easeOutBack
easings.easeInOutBack
easings.spring
easings.bounce
```

---

## 5. Composition API

Styled-system like utilities for building design systems.

### Box Primitive

```javascript
import { box } from 'tailwind-to-style';

const boxStyles = box({
  // Spacing
  p: '4',
  m: '2',
  
  // Sizing
  w: 'full',
  h: '64',
  
  // Layout
  display: 'flex',
  position: 'relative',
  
  // Colors
  bg: 'blue-500',
  color: 'white',
  
  // Border
  borderRadius: 'lg',
  border: true,
  borderColor: 'blue-600',
  
  // Effects
  shadow: 'md',
  opacity: '90',
});

// Returns: { style: {...}, ...otherProps }
```

### Layout Components

```javascript
import { flex, grid, stack, hstack, vstack, center } from 'tailwind-to-style';

// Flex container
const flexProps = flex({
  justifyContent: 'between',
  alignItems: 'center',
  gap: '4',
});

// Grid container
const gridProps = grid({
  gridTemplateColumns: '3',
  gap: '4',
});

// Vertical stack
const stackProps = stack({
  gap: '4',
  p: '4',
});

// Horizontal stack
const hstackProps = hstack({
  gap: '2',
  alignItems: 'center',
});

// Center content
const centerProps = center({
  h: 'screen',
  bg: 'gray-100',
});
```

### Component Primitives

```javascript
import { button, card, badge, input, text, heading, container } from 'tailwind-to-style';

// Button
const btnProps = button({
  variant: 'solid',      // solid | outline | ghost | link
  colorScheme: 'blue',
  size: 'md',            // xs | sm | md | lg | xl
});

// Card
const cardProps = card({
  p: '6',
  shadow: 'lg',
  borderRadius: 'xl',
});

// Badge
const badgeProps = badge({
  variant: 'solid',      // solid | subtle | outline
  colorScheme: 'green',
});

// Input
const inputProps = input({
  size: 'md',            // sm | md | lg
  variant: 'outline',    // outline | filled | flushed
});

// Text
const textProps = text({
  size: 'lg',
  weight: 'medium',
});

// Heading
const h1Props = heading({
  level: '1',            // 1 | 2 | 3 | 4 | 5 | 6
  weight: 'bold',
});

// Container
const containerProps = container({
  maxW: '7xl',
  px: '4',
});
```

### Responsive Props

```javascript
import { createResponsive } from 'tailwind-to-style';

const responsive = createResponsive('w', {
  base: 'full',
  md: '1/2',
  lg: '1/3',
});
// Result: 'w-full md:w-1/2 lg:w-1/3'
```

### Component Variants

```javascript
import { createVariants } from 'tailwind-to-style';

const MyButton = createVariants(
  'px-4 py-2 rounded font-medium',
  {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }
);

// Use it
const primaryBtn = MyButton({ variant: 'primary' });
const dangerBtn = MyButton({ variant: 'danger' });
```

---

## 6. SSR Utilities

Server-side rendering helpers for critical CSS extraction and hydration.

### Style Collector

```javascript
import { createStyleCollector } from 'tailwind-to-style';

const collector = createStyleCollector();

// Add styles during SSR
collector.add('p-4', { padding: '1rem' });
collector.add('bg-blue-500', { backgroundColor: '#3b82f6' });

// Get collected CSS
const css = collector.getCss();

// Get style tag
const styleTag = collector.getStyleTag({ nonce: 'abc123' });

// Get collected classes
const classes = collector.getClasses();
```

### SSR Context

```javascript
import { createSSRContext } from 'tailwind-to-style';

const ssrContext = createSSRContext();

// Collect styles during render
const result = ssrContext.collect(() => {
  return renderYourApp();
});

// Result contains:
// {
//   html: '...',
//   styles: '...',
//   styleTag: '<style>...</style>',
//   classes: ['p-4', 'bg-blue-500']
// }
```

### Critical CSS Extraction

```javascript
import { extractCriticalCss } from 'tailwind-to-style';

const classNames = 'flex items-center p-4 bg-blue-500 text-white';
const styleCache = new Map([
  ['flex', { display: 'flex' }],
  ['items-center', { alignItems: 'center' }],
  // ... more styles
]);

const criticalCss = extractCriticalCss(classNames, styleCache);
```

### Static CSS Generation

```javascript
import { generateStaticCss } from 'tailwind-to-style';

const css = generateStaticCss(classNames, styleCache, {
  minify: true,
  banner: 'Generated by TWS v3.2.0',
});
```

### Hydration

```javascript
import { preloadStyles, hydrateStyles } from 'tailwind-to-style';

// Server: Preload classes
preloadStyles(['flex', 'p-4', 'bg-blue-500']);

// Client: Hydrate
const preloadedClasses = hydrateStyles();
console.log('Hydrated classes:', preloadedClasses);
```

### Style Streaming

```javascript
import { createStyleStream } from 'tailwind-to-style';

const stream = createStyleStream();

// Add styles as they're generated
stream.add('flex', { display: 'flex' });
stream.add('p-4', { padding: '1rem' });

// Flush pending styles
const css = stream.flush();
const styleTag = stream.flushStyleTag({ nonce: 'abc123' });
```

### Purge Unused Styles

```javascript
import { purgeUnusedStyles, extractUsedClasses } from 'tailwind-to-style';

const html = '<div class="flex p-4">...</div>';

// Extract classes used in HTML
const usedClasses = extractUsedClasses(html);

// Purge unused styles
const purgedStyles = purgeUnusedStyles(html, allStyles);
```

---

## 7. Class Validation

Runtime validation for Tailwind class names.

### Validate Single Class

```javascript
import { validateClassName } from 'tailwind-to-style';

const result = validateClassName('flex');
// { valid: true, category: 'flex' }

const invalid = validateClassName('flex-center');
// {
//   valid: false,
//   error: 'Unknown utility class: flex-center',
//   suggestions: ['justify-center items-center']
// }
```

### Validate Multiple Classes

```javascript
import { validateClasses } from 'tailwind-to-style';

const result = validateClasses('flex items-center p-4 bg-blue-500');

console.log(result);
// {
//   valid: true,
//   errors: [],
//   warnings: [],
//   classes: [...]
// }
```

### Strict Validation (Throws)

```javascript
import { validateStrict } from 'tailwind-to-style';

try {
  validateStrict('flex invalid-class p-4');
} catch (error) {
  console.error(error.message);
  console.log('Suggestions:', error.suggestions);
}
```

### Validation with Warnings

```javascript
import { validateWithWarnings } from 'tailwind-to-style';

const result = validateWithWarnings('flex flex-center text-middle');
// Logs warnings to console for invalid classes
```

### Auto-fix

```javascript
import { autoFix } from 'tailwind-to-style';

const result = autoFix('flex-center text-middle margin-4');

console.log(result);
// {
//   classes: 'justify-center items-center text-center m-4',
//   changes: [
//     { original: 'flex-center', fixed: 'justify-center items-center' },
//     { original: 'text-middle', fixed: 'text-center' },
//     { original: 'margin-4', fixed: 'm-4' }
//   ]
// }
```

### Validation Report

```javascript
import { createReport } from 'tailwind-to-style';

const report = createReport('flex p-4 p-6 invalid-class bg-blue-500');

console.log(report);
// {
//   valid: false,
//   errors: [...],
//   warnings: [...],
//   conflicts: [...],
//   summary: {
//     total: 5,
//     valid: 4,
//     invalid: 1,
//     conflicts: 1
//   }
// }
```

### Custom Validator

```javascript
import { createValidator } from 'tailwind-to-style';

const validator = createValidator({
  myCustomPattern: /^custom-\w+$/
});

// Add rule
validator.addRule('special', /^special-\w+$/);

// Remove rule
validator.removeRule('myCustomPattern');

// Validate
const result = validator.validate('custom-box');
```

---

## 8. DevTools

Browser debugging utilities with visual debug panel.

### Enable DevTools

```javascript
import { enableDevTools } from 'tailwind-to-style';

enableDevTools({
  logClassNames: true,       // Log class processing
  logStyles: true,           // Log style generation
  logPerformance: true,      // Log performance metrics
  showWarnings: true,        // Show warnings
  highlightConflicts: true,  // Highlight conflicts
});
```

### Debug Panel

```javascript
import { createDebugPanel } from 'tailwind-to-style';

// Creates a floating debug panel in bottom-right
createDebugPanel();
```

The debug panel includes:
- **Stats tab**: Total classes, cache hits/misses
- **Cache tab**: View cached styles
- **Usage tab**: Most used classes

### DevTools API

```javascript
import { devTools } from 'tailwind-to-style';

// Log class processing
devTools.logClassName('flex', { display: 'flex' });

// Log style generation
devTools.logStyles('flex items-center', {...});

// Log performance
devTools.logPerformance('tws() execution', 15.5);

// Show warning
devTools.showWarning('Conflicting classes detected', {...});

// Inspect element
const info = devTools.inspectElement(element);

// Get cache stats
const stats = devTools.getCacheStats();

// Track usage
devTools.trackUsage('flex');
devTools.trackUsage('p-4');

// Get usage statistics
const usage = devTools.getUsageStats();

// Clear cache
devTools.clearCache();
```

### Performance Tracking

```javascript
import { logPerformance } from 'tailwind-to-style';

const start = performance.now();
const styles = tws('complex class names...');
const duration = performance.now() - start;

logPerformance('Style generation', duration);
```

### Usage Tracking

```javascript
import { trackUsage, getUsageStats } from 'tailwind-to-style';

// Track usage
trackUsage('flex');
trackUsage('p-4');
trackUsage('bg-blue-500');

// Get statistics
const stats = getUsageStats();
// Returns sorted array of classes by usage count
```

---

## Complete Example

```javascript
import {
  tws,
  
  // Apply preset
  applyPreset,
  materialPreset,
  
  // Optimize classes
  optimizeClasses,
  
  // Create animation
  createAnimation,
  animations,
  
  // Composition
  button,
  card,
  
  // SSR
  createStyleCollector,
  
  // Validation
  validateWithWarnings,
  
  // DevTools
  enableDevTools,
  createDebugPanel,
} from 'tailwind-to-style';

// 1. Apply Material Design
applyPreset(materialPreset);

// 2. Enable DevTools
enableDevTools({ logPerformance: true });
createDebugPanel();

// 3. Create custom animation
const slideIn = createAnimation('slideIn')
  .from({ transform: 'translateX(-100%)', opacity: '0' })
  .to({ transform: 'translateX(0)', opacity: '1' })
  .duration('500ms')
  .ease('easeOutCubic');

// 4. Use composition API
const btnProps = button({
  variant: 'solid',
  colorScheme: 'primary',
  size: 'lg',
});

const cardProps = card({
  p: '6',
  shadow: '2',
});

// 5. Validate and optimize
const classes = 'flex flex items-center p-4 p-6 bg-primary-500 text-white';
validateWithWarnings(classes);
const optimized = optimizeClasses(classes, { 
  resolveConflict: true 
});

// 6. Generate styles
const styles = tws(optimized);

// 7. SSR
const collector = createStyleCollector();
const criticalCss = collector.getCss();

console.log('All features working! 🚀');
```

---

## Migration from v3.1.x

All v3.1.x features remain **100% backward compatible**. New features are opt-in:

```javascript
// Old (still works)
import { tws, twsx } from 'tailwind-to-style';
const styles = tws('flex p-4');

// New (optional enhancements)
import { tws, optimizeClasses } from 'tailwind-to-style';
const optimized = optimizeClasses('flex p-4');
const styles = tws(optimized);
```

---

## Performance Tips

1. **Use class optimizer** for large class strings
2. **Enable DevTools** only in development
3. **Preload critical styles** for SSR
4. **Use presets** instead of individual theme config
5. **Validate classes** in development only

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Node.js 14+

---

## Bundle Size

- Core: 12KB (minified + gzipped)
- With all advanced features: 18KB (minified + gzipped)
- Tree-shakeable: Use only what you need!

---

## License

MIT License - See LICENSE file for details
