# Release Notes - v2.12.4

**Release Date:** December 29, 2025

## 🏷️ Custom Classname Prefix Configuration

This release introduces comprehensive classname customization for styled components, giving developers full control over how component classnames are generated.

### What's New

#### ✨ Global Configuration API

Configure naming conventions for all styled components in your application:

```javascript
import { configure } from 'tailwind-to-style'

configure({
  styled: {
    prefix: 'myapp',           // Change prefix from 'twsx' to 'myapp'
    separator: '_',            // Use underscore instead of dash
    hashLength: 5,             // Shorter hash (5 chars vs 6)
    includeComponentName: true // Include component type in classname
  }
})

const Button = styled('button', { base: 'px-4 py-2' })
// Generated: myapp_button_a3k9x
// Variants: myapp_color_primary
```

#### 🎯 Per-Component Override

Override global settings for specific components:

```javascript
const CustomButton = styled('button', 
  { base: 'px-4 py-2' },
  {
    prefix: 'btn',
    separator: '-',
    hashLength: 8,
    includeComponentName: false
  }
)
// Generated: btn-a3k9x2f1 (no component name)
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `prefix` | `string` | `'twsx'` | Global prefix for all styled components |
| `separator` | `string` | `'-'` | Separator between parts (prefix, component, hash) |
| `hashLength` | `number` | `6` | Length of generated hash (4-8 recommended) |
| `includeComponentName` | `boolean` | `true` | Include component type in classname |

### Use Cases

#### 1. Brand-Specific Prefix
```javascript
configure({ styled: { prefix: 'shopify' }})
// shopify-button-a3k9x2, shopify-card-f8d2k1
```

#### 2. Minimal Classnames
```javascript
configure({ 
  styled: { 
    prefix: 'c',
    separator: '',
    hashLength: 4,
    includeComponentName: false
  }
})
// c1a2b (super compact!)
```

#### 3. Monorepo Isolation
```javascript
// Admin app
configure({ styled: { prefix: 'admin' }})

// Customer portal  
configure({ styled: { prefix: 'portal' }})
```

#### 4. BEM-like Convention
```javascript
configure({ styled: { separator: '__' }})
// twsx__button__a3k9x2
```

#### 5. Design Systems
```javascript
configure({ styled: { prefix: 'ds' }})
// ds-button-a3k9x2, ds-card-f8d2k1
```

### HTML Output Examples

```html
<!-- Default (prefix: 'twsx', separator: '-') -->
<button class="twsx-button-a3k9x2 twsx-color-primary">Click</button>

<!-- Custom (prefix: 'myapp', separator: '_') -->
<button class="myapp_button_a3k9 myapp_color_primary">Click</button>

<!-- Minimal (prefix: 'c', no component name) -->
<button class="c-1a2b c-color-primary">Click</button>

<!-- BEM-like (separator: '__') -->
<button class="twsx__button__a3k9x2 twsx__color__primary">Click</button>
```

### CSS Output Examples

**Default Config:**
```css
.twsx-button-a3k9x2 {
  padding: 1rem;
}

.twsx-button-a3k9x2.twsx-color-primary {
  background-color: rgb(59 130 246);
}
```

**Custom Config (prefix: 'myapp', separator: '_'):**
```css
.myapp_button_a3k9 {
  padding: 1rem;
}

.myapp_button_a3k9.myapp_color_primary {
  background-color: rgb(59 130 246);
}
```

### Benefits

✅ **Brand Identity** - Classnames reflect your brand/app name  
✅ **Monorepo Friendly** - Isolated prefixes prevent collisions  
✅ **Performance** - Shorter classnames = smaller HTML  
✅ **Flexibility** - Global defaults + per-component overrides  
✅ **Developer Experience** - Easier debugging with recognizable names  

### Breaking Changes

None! This is a fully backward-compatible addition. Default behavior remains unchanged (`twsx-` prefix with `-` separator).

### Migration Guide

No migration needed. Existing code continues to work without any changes.

To adopt the new configuration:

```javascript
// Add to your app initialization
import { configure } from 'tailwind-to-style'

configure({
  styled: {
    prefix: 'myapp',  // Your custom prefix
    // ... other options
  }
})
```

### Examples

See [examples/custom-prefix.js](examples/custom-prefix.js) for comprehensive examples including:
- Global configuration
- Per-component overrides
- Design system setup
- E-commerce use case
- Monorepo patterns

### Documentation

- **README**: [Custom Classname Prefix Configuration](README.md#custom-classname-prefix-configuration)
- **Configuration Guide**: [Configuration Options](README.md#configuration-options)
- **Examples**: [examples/custom-prefix.js](examples/custom-prefix.js)

## Technical Implementation

### Files Changed

- `src/config/userConfig.js` - Added `styled` configuration object
- `src/react/styled.js` - Updated classname generation with configurable options
- `examples/custom-prefix.js` - Comprehensive examples
- `README.md` - Documentation updates
- `package.json` - Version bump to 2.12.4

### New Functions

- `getVariantPrefix()` - Helper to get variant prefix from config
- Enhanced `generateClassName()` - Now accepts naming options parameter
- Updated `styled()` - Accepts naming options in third parameter

### Cache Compatibility

All caching mechanisms (hash deduplication, global CSS cache) work seamlessly with custom prefixes. Different prefixes generate different hashes, ensuring proper isolation.

## Upgrade Instructions

### NPM
```bash
npm install tailwind-to-style@2.12.4
```

### Yarn
```bash
yarn add tailwind-to-style@2.12.4
```

### PNPM
```bash
pnpm add tailwind-to-style@2.12.4
```

## Feedback & Support

- **Issues**: [GitHub Issues](https://github.com/Bigetion/tailwind-to-style/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Bigetion/tailwind-to-style/discussions)
- **Twitter**: [@Bigetion](https://twitter.com/Bigetion)

## Contributors

Special thanks to all contributors who made this release possible!

---

**Full Changelog**: [v2.12.3...v2.12.4](https://github.com/Bigetion/tailwind-to-style/compare/v2.12.3...v2.12.4)
