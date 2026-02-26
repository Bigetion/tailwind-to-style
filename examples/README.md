# Examples

This directory contains real-world usage examples for `tailwind-to-style`.

## 📁 Structure

```
examples/
├── basic/                 # Basic usage examples
│   ├── tws-basic.js      # Simple tws() conversion
│   ├── tws-variants.js   # Responsive & pseudo-states
│   └── tws-opacity.js    # Opacity modifiers
├── advanced/              # Advanced features
│   ├── twsx-nesting.js   # SCSS-like nesting
│   ├── twsx-media.js     # Media queries
│   └── custom-theme.js   # Theme customization
├── components/            # Component examples
│   ├── button.js         # Button with variants
│   ├── card.js           # Card component
│   └── alert.js          # Alert with nested styles
├── frameworks/            # Framework-specific examples
│   ├── react/            # React examples
│   ├── vue/              # Vue examples
│   └── vanilla/          # Vanilla JS examples
└── performance/           # Performance demos
    ├── benchmark.js      # Performance benchmarks
    └── caching-demo.js   # Cache demonstration
```

## 🚀 Running Examples

### Node.js Examples
```bash
node examples/basic/tws-basic.js
```

### React Examples
```bash
cd examples/frameworks/react
npm install
npm start
```

### Vue Examples
```bash
cd examples/frameworks/vue
npm install
npm run dev
```

## 💡 Quick Examples

### Basic Conversion
```javascript
import { tws } from 'tailwind-to-style';

const styles = tws('bg-blue-500 text-white p-4 rounded-lg');
// → { backgroundColor: 'rgb(59, 130, 246)', color: 'rgb(255, 255, 255)', padding: '1rem', borderRadius: '0.5rem' }
```

### Nested Styles
```javascript
import { twsx } from 'tailwind-to-style';

const css = twsx({
  '.button': [
    'bg-blue-500 text-white px-6 py-3 rounded-lg',
    {
      '&:hover': 'bg-blue-600 transform scale-105',
      '&:active': 'bg-blue-700'
    }
  ]
});
```

### Component Variants
```javascript
import { twsxVariants } from 'tailwind-to-style';

const button = twsxVariants('.btn', {
  base: 'px-4 py-2 rounded font-medium',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      danger: 'bg-red-500 text-white'
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      lg: 'px-6 py-3 text-lg'
    }
  },
  defaultVariants: { color: 'primary', size: 'sm' }
});

// Usage
button({ color: 'danger', size: 'lg' }) // → "btn btn-danger-lg"
```
