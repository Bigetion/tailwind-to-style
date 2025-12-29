# Custom Prefix Configuration - Quick Reference

## 🚀 Quick Start

```javascript
import { configure, styled } from 'tailwind-to-style/react'

// Global config
configure({
  styled: {
    prefix: 'myapp',
    separator: '_',
    hashLength: 5
  }
})

const Button = styled('button', { base: 'px-4 py-2' })
// Result: myapp_button_a3k9x
```

## 📋 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `prefix` | `string` | `'twsx'` | Prefix for classnames |
| `separator` | `string` | `'-'` | Separator character |
| `hashLength` | `number` | `6` | Hash length (4-8) |
| `includeComponentName` | `boolean` | `true` | Include component type |

## 💡 Common Patterns

### Minimal (Short)
```javascript
configure({ 
  styled: { 
    prefix: 'c',
    separator: '',
    hashLength: 4,
    includeComponentName: false
  }
})
// Result: c1a2b
```

### BEM-like
```javascript
configure({ styled: { separator: '__' }})
// Result: twsx__button__a3k9x2
```

### Design System
```javascript
configure({ styled: { prefix: 'ds' }})
// Result: ds-button-a3k9x2
```

### Monorepo
```javascript
// App 1
configure({ styled: { prefix: 'admin' }})

// App 2
configure({ styled: { prefix: 'portal' }})
```

## 🎯 Per-Component Override

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
// Result: btn-a3k9x2f1
```

## 📊 Output Comparison

| Config | Generated Classname |
|--------|-------------------|
| Default | `twsx-button-a3k9x2` |
| `prefix: 'app'` | `app-button-a3k9x2` |
| `separator: '_'` | `twsx_button_a3k9x2` |
| `hashLength: 4` | `twsx-button-a3k9` |
| `includeComponentName: false` | `twsx-a3k9x2` |
| Minimal | `c1a2b` |

## ✅ Best Practices

**DO:**
- ✅ Set config once at app initialization
- ✅ Use short prefixes (3-6 chars)
- ✅ Keep separator consistent
- ✅ Use per-component override sparingly

**DON'T:**
- ❌ Change config frequently
- ❌ Use special characters in separator
- ❌ Make hash too short (< 4)
- ❌ Use empty prefix

## 🔗 Links

- **Full Documentation**: [README.md](README.md#custom-classname-prefix-configuration)
- **Examples**: [examples/custom-prefix.js](examples/custom-prefix.js)
- **Release Notes**: [RELEASE_v2.12.4.md](RELEASE_v2.12.4.md)
