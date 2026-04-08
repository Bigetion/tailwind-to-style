# Arbitrary Value Formats

This guide explains how to use arbitrary values in `tailwind-to-style` to apply custom CSS values beyond the predefined theme utilities.

## Overview

Arbitrary values use square bracket syntax `[value]` to specify custom CSS values directly in your class names. This is similar to Tailwind CSS's arbitrary value syntax.

## Supported Formats

### Length Values

```javascript
import { tws } from 'tailwind-to-style';

// Pixels
tws('w-[200px]', true)  // { width: '200px' }
tws('h-[50px]', true)   // { height: '50px' }

// Rem
tws('p-[2.5rem]', true) // { padding: '2.5rem' }

// Em
tws('m-[1.5em]', true)  // { margin: '1.5em' }

// Percentage
tws('w-[50%]', true)    // { width: '50%' }

// Viewport units
tws('h-[100vh]', true)  // { height: '100vh' }
tws('w-[50vw]', true)   // { width: '50vw' }

// Character units
tws('w-[20ch]', true)   // { width: '20ch' }
```

### CSS Variables

```javascript
// Basic CSS variable
tws('text-[var(--my-color)]', true)
// { color: 'var(--my-color)' }

// CSS variable with fallback
tws('bg-[var(--bg,#ffffff)]', true)
// { backgroundColor: 'var(--bg,#ffffff)' }

// CSS variable for spacing
tws('p-[var(--spacing)]', true)
// { padding: 'var(--spacing)' }
```

### Calc Expressions

```javascript
// Simple calc
tws('w-[calc(100%-16px)]', true)
// { width: 'calc(100%-16px)' }

// Complex calc
tws('h-[calc(100vh-64px)]', true)
// { height: 'calc(100vh-64px)' }

// Nested calc (may have limited support)
tws('w-[calc(100vw-calc(100%-16px))]', true)
```

### CSS Functions

```javascript
// min/max/clamp
tws('w-[min(100%,400px)]', true)
// { width: 'min(100%,400px)' }

tws('w-[max(200px,50%)]', true)
// { width: 'max(200px,50%)' }

tws('w-[clamp(200px,50%,400px)]', true)
// { width: 'clamp(200px,50%,400px)' }
```

## Property-Specific Arbitrary Values

### Width/Height

| Class | Output |
|-------|--------|
| `w-[200px]` | `{ width: '200px' }` |
| `h-[100vh]` | `{ height: '100vh' }` |
| `min-w-[300px]` | `{ minWidth: '300px' }` |
| `max-h-[500px]` | `{ maxHeight: '500px' }` |

### Spacing (Padding/Margin)

| Class | Output |
|-------|--------|
| `p-[20px]` | `{ padding: '20px' }` |
| `m-[1.5rem]` | `{ margin: '1.5rem' }` |
| `px-[10px]` | `{ paddingLeft: '10px', paddingRight: '10px' }` |
| `mt-[2em]` | `{ marginTop: '2em' }` |

### Colors

Note: Arbitrary color values may have limited support. Use theme colors when possible.

```javascript
// Use theme colors (recommended)
tws('bg-blue-500', true)

// CSS variables for colors
tws('text-[var(--primary-color)]', true)
// { color: 'var(--primary-color)' }
```

### Border Radius

| Class | Output |
|-------|--------|
| `rounded-[4px]` | `{ borderRadius: '4px' }` |
| `rounded-[0.5rem]` | `{ borderRadius: '0.5rem' }` |
| `rounded-t-[8px]` | `{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }` |

### Gap

| Class | Output |
|-------|--------|
| `gap-[20px]` | `{ gap: '20px' }` |
| `gap-x-[10px]` | `{ columnGap: '10px' }` |
| `gap-y-[1rem]` | `{ rowGap: '1rem' }` |

## Notes and Limitations

### What Works

- ✅ Length values (px, rem, em, %, vh, vw, ch)
- ✅ CSS variables with `var(--name)`
- ✅ `calc()` expressions
- ✅ `min()`, `max()`, `clamp()` functions
- ✅ All spacing properties (padding, margin, gap)
- ✅ All sizing properties (width, height, min/max variants)
- ✅ Border radius

### Limitations

- ⚠️ Arbitrary colors with `bg-[#hex]` may not be supported for all properties
- ⚠️ Complex expressions should be tested for compatibility
- ⚠️ Some edge cases may not parse correctly

### Best Practices

1. **Use theme values when possible** - They're tested and guaranteed to work
2. **Use CSS variables for dynamic values** - Better SSR and theming support
3. **Test arbitrary values** - Verify output matches expectations
4. **Avoid overly complex expressions** - May have edge case issues

## Examples

### Responsive Layout

```javascript
const container = tws('w-full max-w-[1200px] mx-auto px-[20px]', true);
// {
//   width: '100%',
//   maxWidth: '1200px',
//   marginLeft: 'auto',
//   marginRight: 'auto',
//   paddingLeft: '20px',
//   paddingRight: '20px'
// }
```

### Dynamic Spacing

```javascript
const card = tws('p-[var(--card-padding,1rem)] rounded-[var(--card-radius,8px)]', true);
// {
//   padding: 'var(--card-padding,1rem)',
//   borderRadius: 'var(--card-radius,8px)'
// }
```

### Calculated Sizes

```javascript
const sidebar = tws('w-[calc(100%-64px)] h-[calc(100vh-80px)]', true);
// {
//   width: 'calc(100%-64px)',
//   height: 'calc(100vh-80px)'
// }
```

## See Also

- [README.md](../README.md) - Main documentation
- [ARCHITECTURE.md](../ARCHITECTURE.md) - Technical architecture
- [Animation System](./ANIMATION_GUIDE.md) - Animation features
