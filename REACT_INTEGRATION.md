# TWSX React Integration

After publishing to npm, users can use TWSX with React in the following ways:

## Installation

```bash
npm install tailwind-to-style
```

## Usage Options

### Option 1: Import from main package (Recommended)
```javascript
import { useTwsx, TwsxProvider } from 'tailwind-to-style'
```

### Option 2: Import from React subpath
```javascript
import { useTwsx, TwsxProvider } from 'tailwind-to-style/react'
```

## Basic Usage

### 1. Auto-inject CSS (Default)
```javascript
import { useTwsx } from 'tailwind-to-style'

function MyComponent() {
  // CSS automatically injected into document head
  useTwsx({
    '.card': [
      'bg-white rounded-lg shadow-md p-6',
      {
        '&:hover': 'shadow-lg transform scale-105',
        '.title': 'text-xl font-bold text-gray-900'
      }
    ]
  })

  return (
    <div className="card">
      <h2 className="title">Card Title</h2>
    </div>
  )
}
```

### 2. Manual CSS Control
```javascript
import { useTwsx } from 'tailwind-to-style'

function MyComponent() {
  // Get CSS without auto-injection
  const css = useTwsx({
    '.button': 'px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
  }, { inject: false })

  return (
    <>
      <style>{css}</style>
      <button className="button">Click me</button>
    </>
  )
}
```

### 3. With Provider for Theme Configuration
```javascript
import { TwsxProvider, useTwsx } from 'tailwind-to-style'

const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#3b82f6',
          600: '#2563eb'
        }
      }
    }
  }
}

function App() {
  return (
    <TwsxProvider config={config}>
      <MyThemedComponent />
    </TwsxProvider>
  )
}

function MyThemedComponent() {
  useTwsx({
    '.brand-button': 'bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded'
  })

  return <button className="brand-button">Branded Button</button>
}
```

## TypeScript Support

Full TypeScript support is included:

```typescript
import { useTwsx, TwsxProvider, TwsxConfig } from 'tailwind-to-style'

const config: TwsxConfig = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6'
      }
    }
  }
}

function TypedComponent() {
  const css: string = useTwsx({
    '.typed-component': 'bg-primary text-white p-4'
  }, { inject: false })

  return <div style={{ /* ... */ }}>Typed Component</div>
}
```

## Available Exports

### From `tailwind-to-style`:
- `tws` - Core function for class conversion
- `twsx` - Advanced function with nested selectors
- `configure` - Global configuration
- `useTwsx` - React hook
- `TwsxProvider` - React context provider
- `useTwsxContext` - Access provider context
- `useTwsxConfig` - Get current config
- `useUpdateTwsxConfig` - Update config

### From `tailwind-to-style/react`:
- `useTwsx` - React hook
- `TwsxProvider` - React context provider
- `useTwsxContext` - Access provider context
- `useTwsxConfig` - Get current config
- `useUpdateTwsxConfig` - Update config
- All core functions re-exported for convenience

## Performance

- ✅ Automatic memoization with `useMemo`
- ✅ Smart re-rendering optimization
- ✅ CSS deduplication
- ✅ Minimal DOM manipulation
- ✅ Tree-shakable imports

## Bundle Size

- Core library: ~50KB (minified)
- React hooks: ~5KB additional
- Tree-shakable: Import only what you need