# v3.2.0 Quick Reference

One-page reference for all v3.2.0 features.

---

## 🔌 Plugin System

```javascript
import { usePlugin, createUtilityPlugin, gradientPlugin } from 'tailwind-to-style';

// Use built-in plugin
usePlugin(gradientPlugin);

// Create custom plugin
const myPlugin = createUtilityPlugin({
  name: 'custom',
  utilities: { 'my-box': { padding: '2rem', bg: 'blue' } }
});
usePlugin(myPlugin);
```

**Built-in**: gradientPlugin, animationPlugin, typographyPlugin, aspectRatioPlugin, containerQueriesPlugin

---

## 🎨 Preset System

```javascript
import { applyPreset, materialPreset, mergePresets } from 'tailwind-to-style';

// Apply preset
applyPreset(materialPreset);

// Merge presets
const custom = mergePresets(materialPreset, glassmorphismPreset);
applyPreset(custom);
```

**Built-in**: materialPreset, antDesignPreset, bootstrapPreset, chakraPreset, glassmorphismPreset, neumorphismPreset

---

## ⚡ Class Optimizer

```javascript
import { optimizeClasses, findConflicts, mergeClasses } from 'tailwind-to-style';

// Optimize
const optimized = optimizeClasses('flex flex p-4 p-6', {
  removeDups: true,
  resolveConflict: true,
  sort: true
});

// Find conflicts
const conflicts = findConflicts('p-4 p-6 bg-red bg-blue');

// Merge
const merged = mergeClasses('flex p-4', 'bg-blue', 'text-white');
```

---

## 🎬 Animation Builder

```javascript
import { createAnimation, animations, createSequence } from 'tailwind-to-style';

// Custom animation
const slide = createAnimation('slide')
  .from({ transform: 'translateY(100px)' })
  .to({ transform: 'translateY(0)' })
  .duration('500ms')
  .ease('easeOut');

// Pre-built
const fadeIn = animations.fadeIn('300ms');

// Sequence
const seq = createSequence()
  .step(animations.fadeIn('200ms'))
  .step(animations.scaleIn('300ms'));
```

**Pre-built**: fadeIn, fadeOut, slideInLeft/Right/Top/Bottom, scaleIn/Out, bounce, shake, pulse, spin, wiggle, heartbeat, flash, flip

---

## 🧩 Composition API

```javascript
import { box, button, card, flex } from 'tailwind-to-style';

// Box primitive
const boxProps = box({ p: '4', bg: 'blue-500', color: 'white' });

// Button
const btnProps = button({ variant: 'solid', colorScheme: 'blue', size: 'lg' });

// Card
const cardProps = card({ p: '6', shadow: 'lg' });

// Flex
const flexProps = flex({ justifyContent: 'between', alignItems: 'center' });
```

**Components**: box, flex, grid, stack, hstack, vstack, center, container, button, card, badge, input, text, heading, divider, spacer

---

## 🖥️ SSR Utilities

```javascript
import { createStyleCollector, extractCriticalCss } from 'tailwind-to-style';

// Collect styles
const collector = createStyleCollector();
collector.add('p-4', { padding: '1rem' });

// Get CSS
const css = collector.getCss();
const styleTag = collector.getStyleTag({ nonce: 'abc123' });

// Extract critical
const critical = extractCriticalCss(classNames, styleCache);
```

**Functions**: createStyleCollector, createSSRContext, extractCriticalCss, generateStyleTag, generateStaticCss, preloadStyles, hydrateStyles, createStyleStream, purgeUnusedStyles

---

## ✅ Class Validation

```javascript
import { validateClasses, validateWithWarnings, autoFix } from 'tailwind-to-style';

// Validate
const result = validateClasses('flex items-center invalid');
console.log(result.valid, result.errors);

// Warn
validateWithWarnings('flex-center text-middle');

// Auto-fix
const fixed = autoFix('flex-center margin-4');
console.log(fixed.classes);  // 'justify-center items-center m-4'
```

---

## 🛠️ DevTools

```javascript
import { enableDevTools, createDebugPanel, devTools } from 'tailwind-to-style';

// Enable
enableDevTools({
  logClassNames: true,
  logPerformance: true,
  showWarnings: true
});

// Debug panel
createDebugPanel();

// API
devTools.logPerformance('Operation', 15.5);
devTools.trackUsage('flex');
devTools.getUsageStats();
```

---

## 📊 Quick Comparison

| Feature | Description | Use Case |
|---------|-------------|----------|
| **Plugins** | Custom utilities | Reusable design systems |
| **Presets** | Theme switching | Material/Ant Design integration |
| **Optimizer** | Clean classes | Performance & debugging |
| **Animations** | Animation builder | Complex animations |
| **Composition** | Component API | Component libraries |
| **SSR** | Critical CSS | SSR/SSG frameworks |
| **Validation** | Error detection | Developer experience |
| **DevTools** | Debug panel | Performance profiling |

---

## 🎯 Common Workflows

### Design System Setup
```javascript
import { applyPreset, materialPreset, usePlugin, gradientPlugin } from 'tailwind-to-style';

applyPreset(materialPreset);
usePlugin(gradientPlugin);
```

### Performance Optimization
```javascript
import { optimizeClasses, enableDevTools } from 'tailwind-to-style';

enableDevTools({ logPerformance: true });
const optimized = optimizeClasses(classes, { resolveConflict: true });
```

### Component Library
```javascript
import { button, card, box } from 'tailwind-to-style';

export const Button = (props) => button({ variant: 'solid', ...props });
export const Card = (props) => card({ shadow: 'lg', ...props });
```

### SSR Setup
```javascript
import { createStyleCollector } from 'tailwind-to-style';

const collector = createStyleCollector();
// ... render app
const styleTag = collector.getStyleTag();
```

### Validation
```javascript
import { validateWithWarnings, autoFix } from 'tailwind-to-style';

validateWithWarnings(classes);  // Development
const fixed = autoFix(classes);  // Production build
```

---

## 💡 Pro Tips

1. **Use presets** for quick theme setup
2. **Enable DevTools** in development only
3. **Optimize classes** for dynamic content
4. **Validate classes** during build
5. **Use SSR utilities** for better performance
6. **Create plugins** for reusable utilities
7. **Use composition API** for component libraries
8. **Track usage** to identify unused styles

---

## 🚀 Installation

```bash
npm install tailwind-to-style@3.2.0
```

---

## 📖 Full Documentation

- [Advanced Features Guide](docs/ADVANCED_FEATURES_GUIDE.md)
- [Changelog](CHANGELOG_v3.2.0.md)
- [API Reference](docs/API.md)
- [Performance Guide](docs/PERFORMANCE.md)
