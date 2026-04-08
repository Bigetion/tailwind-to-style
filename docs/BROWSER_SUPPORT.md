# Browser Compatibility

This document outlines browser support and compatibility considerations for `tailwind-to-style`.

## Browser Support Matrix

### Core Features

| Feature | Chrome | Firefox | Safari | Edge | IE |
|---------|--------|---------|--------|------|----|
| `tws()` basic conversion | ✅ 60+ | ✅ 55+ | ✅ 10.1+ | ✅ 79+ | ❌ |
| `twsx()` CSS generation | ✅ 60+ | ✅ 55+ | ✅ 10.1+ | ✅ 79+ | ❌ |
| `twsxClassName()` | ✅ 60+ | ✅ 55+ | ✅ 10.1+ | ✅ 79+ | ❌ |
| `twsxVariants()` | ✅ 60+ | ✅ 55+ | ✅ 10.1+ | ✅ 79+ | ❌ |
| CSS Variable support | ✅ 49+ | ✅ 31+ | ✅ 9.1+ | ✅ 15+ | ❌ |

### Animation Features

| Feature | Chrome | Firefox | Safari | Edge | IE |
|---------|--------|---------|--------|------|----|
| CSS Transitions | ✅ All | ✅ All | ✅ All | ✅ All | ⚠️ 10+ |
| CSS Animations | ✅ All | ✅ All | ✅ All | ✅ All | ⚠️ 10+ |
| Web Animations API | ✅ 84+ | ✅ 75+ | ✅ 13.1+ | ✅ 84+ | ❌ |
| `animate()` function | ✅ 84+ | ✅ 75+ | ✅ 13.1+ | ✅ 84+ | ❌ |
| `chain()` / `stagger()` | ✅ 84+ | ✅ 75+ | ✅ 13.1+ | ✅ 84+ | ❌ |

### SSR Support

| Environment | Support | Notes |
|-------------|---------|-------|
| Node.js 14+ | ✅ | Full support |
| Node.js 16+ | ✅ | Full support |
| Node.js 18+ | ✅ | Full support |
| Node.js 20+ | ✅ | Recommended |
| Deno | ⚠️ | Untested |
| Bun | ⚠️ | Untested |

## CSS Property Support

### Widely Supported (All Modern Browsers)

These CSS properties work everywhere:

- `display`, `position`, `z-index`
- `width`, `height`, `min-*`, `max-*`
- `padding`, `margin`
- `color`, `background-color`
- `border`, `border-radius`
- `font-size`, `font-weight`, `line-height`
- `flex`, `flex-direction`, `flex-wrap`
- `justify-content`, `align-items`
- `transform`, `opacity`
- `transition`

### Modern Properties (May Need Fallbacks)

| Property | Browsers | Fallback |
|----------|----------|----------|
| `gap` in Flexbox | Chrome 84+, Firefox 63+, Safari 14.1+ | Use `margin` |
| `aspect-ratio` | Chrome 88+, Firefox 89+, Safari 15+ | Use padding trick |
| `backdrop-filter` | Chrome 76+, Firefox 103+, Safari 9+ | Skip on Firefox < 103 |
| `scroll-behavior` | Chrome 61+, Firefox 36+, Safari 15.4+ | JS polyfill |
| `color-scheme` | Chrome 81+, Firefox 96+, Safari 12.1+ | Manual dark mode |
| `accent-color` | Chrome 93+, Firefox 92+, Safari 15.4+ | Browser default |

### Grid-Specific

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Basic Grid | ✅ 57+ | ✅ 52+ | ✅ 10.1+ | ✅ 16+ |
| `gap` (Grid) | ✅ 66+ | ✅ 61+ | ✅ 12+ | ✅ 16+ |
| Subgrid | ✅ 117+ | ✅ 71+ | ✅ 16+ | ✅ 117+ |

## JavaScript Requirements

### Required Features

`tailwind-to-style` uses these JavaScript features:

| Feature | Usage | Polyfill Needed For |
|---------|-------|---------------------|
| `Map` / `Set` | Caching | IE 11 |
| `Object.assign` | Object merging | IE 11 |
| `Array.from` | Array operations | IE 11 |
| `String.includes` | String parsing | IE 11 |
| `Template literals` | String building | IE 11 |
| `ES Modules` | Import/export | IE 11, old bundlers |

### For Animation Features

| Feature | Usage | Available In |
|---------|-------|--------------|
| `Element.animate()` | Animation API | Modern browsers only |
| `Promise` | Async animations | All modern + IE 11 (polyfill) |
| `requestAnimationFrame` | Animation timing | All browsers |

## Bundle Size Considerations

| Import | Size (gzipped) | Notes |
|--------|----------------|-------|
| `tws` only | ~5KB | Minimal |
| `tws` + `twsx` | ~8KB | Common setup |
| Full library | ~15KB | All features |
| With animations | ~18KB | Animation system |

### Tree-Shaking

The library supports tree-shaking. Import only what you need:

```javascript
// ✅ Good - tree-shakeable
import { tws } from 'tailwind-to-style';

// ✅ Good - explicit imports
import { tws, twsx } from 'tailwind-to-style';

// ⚠️ Consider - includes everything
import tailwindToStyle from 'tailwind-to-style';
```

## Known Issues

### Safari

1. **Backdrop Filter**: May require `-webkit-backdrop-filter` prefix
2. **Sticky positioning**: Within an overflow container has issues
3. **Animation interrupt**: Some edge cases with rapid animation changes

### Firefox

1. **Backdrop blur**: Only supported in Firefox 103+
2. **Subgrid**: Display varies from Chrome/Safari

### iOS Safari

1. **100vh**: Doesn't account for browser chrome
   - Use `dvh` unit or CSS variable fallback
2. **Smooth scrolling**: May be blocked by user settings
3. **Position fixed**: Complex behavior in scrollable containers

### Edge (Legacy)

- Edge 18 and below (EdgeHTML): Limited support
- Edge 79+ (Chromium): Full support

## Polyfills

If you need to support older browsers, consider these polyfills:

### For IE 11 / Legacy Edge

```html
<!-- Core-js for ES features -->
<script src="https://cdn.jsdelivr.net/npm/core-js@3/stable/index.js"></script>

<!-- CSS Variable polyfill -->
<script src="https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2"></script>
```

### For Animation API

```javascript
// Only if using animate()/chain()/stagger()
import 'web-animations-js';
```

## Testing Recommendations

### Manual Testing Checklist

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Safari iOS (latest)
- [ ] Chrome Android (latest)
- [ ] Chrome (oldest supported)

### Automated Testing

```javascript
// Example: Feature detection
function supportsWebAnimations() {
  return typeof Element.prototype.animate === 'function';
}

function supportsCSSVariables() {
  return window.CSS && window.CSS.supports && 
         window.CSS.supports('color', 'var(--test)');
}
```

## Recommended Configuration

### Browserslist

Add to `package.json` or `.browserslistrc`:

```json
{
  "browserslist": [
    "> 0.5%",
    "last 2 versions",
    "Firefox ESR",
    "not dead",
    "not IE 11"
  ]
}
```

### PostCSS Autoprefixer

If generating CSS to files:

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};
```

## See Also

- [Can I Use](https://caniuse.com/) - Browser support data
- [ANIMATION_GUIDE.md](./ANIMATION_GUIDE.md) - Animation features
- [README.md](../README.md) - Main documentation
