# tailwind-to-style

[📦 View on npm](https://www.npmjs.com/package/tailwind-to-style)

[![npm version](https://img.shields.io/npm/v/tailwind-to-style.svg)](https://www.npmjs.com/package/tailwind-to-style)
[![Build Status](https://github.com/Bigetion/tailwind-to-style/workflows/CI%2FCD/badge.svg)](https://github.com/Bigetion/tailwind-to-style/actions)
[![npm downloads](https://img.shields.io/npm/dm/tailwind-to-style.svg)](https://www.npmjs.com/package/tailwind-to-style)
[![license](https://img.shields.io/npm/l/tailwind-to-style.svg)](https://github.com/Bigetion/tailwind-to-style/blob/main/LICENSE)

`tailwind-to-style` is a JavaScript library designed to convert Tailwind CSS utility classes into inline styles or JavaScript objects. This is especially useful when you need to dynamically apply styles to elements in frameworks like React, where inline styles or style objects are frequently used.

The library exposes two main functions and a CLI tool:

1. **`tws`**: Converts Tailwind CSS classes into inline CSS styles or JavaScript objects (JSON).
2. **`twsx`**: A more advanced function that allows you to define nested and complex styles similar to SCSS, including support for responsive design, state variants, grouping, and enhanced CSS capabilities.
3. **`twsx-cli`**: A command-line tool for generating CSS files from `twsx.*.js` files with watch mode support.

## ✨ What's New in v2.11.0

- **🎨 Styled Components System**: Create reusable components with `styled()` factory
  - Variant-based styling inspired by styled-components and twin.macro
  - Tag helpers: `styled.div()`, `styled.button()`, etc.
  - Pseudo-state support: hover, focus, active, disabled
  - Nested styles with SCSS-like syntax
  - Polymorphic "as" prop for component flexibility
  - Full TypeScript support with type inference
  
- **🎭 Type-safe Variants**: Framework-agnostic `tv()` for design systems
  - Compound variants for complex conditions
  - Default variants support
  - Full TypeScript integration
  - Works with any framework or vanilla JS
  - `createVariants()` for batch variant creation

### Previous Updates (v2.10.5)

- **🎬 Complete Animation System**: Full support for Tailwind animations and transitions
  - Built-in animations: `animate-spin`, `animate-ping`, `animate-pulse`, `animate-bounce`
  - Complete transition utilities with duration, delay, and easing controls
  - Custom animations via theme configuration
  - Keyframes system with built-in and custom support
  
- **🎨 Theme Customization**: Extend default theme with custom colors, spacing, and more!
  - Deep merge support for nested theme values
  - Works seamlessly with existing Tailwind utilities
  - Brand-specific design systems
  
- **🔌 Plugin API**: Create custom utilities with `createPlugin()` and `createUtilityPlugin()`
  - Simple utility plugins for custom styles
  - Dynamic utilities with multiple values
  - Unlimited custom utility classes
  
- **⚙️ Configuration System**: Use `configure()` to set up theme and plugins
  - Support for `tailwind-to-style.config.js`
  - Prefix support and core plugin control
  - Easy configuration management
  
- **🚀 Infrastructure Improvements**: 
  - Updated dependencies (ESLint 9, Jest 30, Rollup 4)
  - LRU Cache for better memory management
  - Configurable logger system (production-safe)
  - Event-based error handling
  - Complete TypeScript definitions
  - Node.js 18.x, 20.x, 22.x LTS support

- **📱 Responsive Selector Syntax**: Intuitive `'md:.title': 'text-lg'` format
- **🐛 Enhanced @css Directive**: Perfect CSS variables and functions preservation

All changes are **backward compatible** - your existing code continues to work!

## Quick Start: v2.11.0+ Features

### Styled Components

```javascript
import { styled } from 'tailwind-to-style/react'

const Button = styled('button', {
  base: 'px-4 py-2 rounded-lg font-medium',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      danger: 'bg-red-500 text-white hover:bg-red-600'
    }
  }
})

<Button color="primary">Click me</Button>
```

### Type-safe Variants

```javascript
import { tv } from 'tailwind-to-style'

const button = tv({
  base: 'px-4 py-2 rounded font-medium',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white'
    }
  }
})

const className = button({ color: 'primary' })
```

**See full documentation:** [Styled Components](#styled-components) | [React Integration](#react-integration)

## Installation

```bash
npm install tailwind-to-style
```

### Optional: Import Tailwind Preflight CSS

For best results and consistent styling, import Tailwind's preflight (base styles):

```javascript
// React (in your main entry file)
import 'tailwind-to-style/preflight.css'
import { TwsxProvider } from 'tailwind-to-style'

function App() {
  return <TwsxProvider>{/* your app */}</TwsxProvider>
}
```

```html
<!-- HTML (in your index.html) -->
<link rel="stylesheet" href="node_modules/tailwind-to-style/preflight.css">
```

The preflight CSS provides Tailwind's base styles including:
- Consistent box-sizing
- Reset margins and paddings
- Normalized form elements
- Better default font rendering

**Note:** If you're already using Tailwind CSS in your project, you don't need to import this.

## React Integration

### Quick Start with React

```javascript
import { useTwsx, TwsxProvider } from 'tailwind-to-style'

// Theme configuration
const config = {
  theme: {
    extend: {
      colors: {
        brand: { 500: '#3b82f6', 600: '#2563eb' }
      }
    }
  }
}

function App() {
  return (
    <TwsxProvider config={config}>
      <MyComponent />
    </TwsxProvider>
  )
}

function MyComponent() {
  // Auto-inject CSS into document head
  useTwsx({
    '.card': [
      'bg-brand-500 text-white p-6 rounded-lg',
      {
        '&:hover': 'bg-brand-600 transform scale-105',
        '.title': 'text-xl font-bold mb-2'
      }
    ]
  })

  return (
    <div className="card">
      <h2 className="title">Interactive Card</h2>
      <p>Hover me to see the effect!</p>
    </div>
  )
}
```

### Import Options

```javascript
// Import from main package (recommended)
import { useTwsx, TwsxProvider } from 'tailwind-to-style'

// Or from React subpath
import { useTwsx, TwsxProvider } from 'tailwind-to-style/react'
```

### `useTwsx()` Hook

The main React hook for component styling:

```javascript
import { useTwsx } from 'tailwind-to-style'

function MyComponent() {
  // Auto-inject CSS (default behavior)
  useTwsx({
    '.button': [
      'bg-blue-500 text-white px-6 py-3 rounded-lg font-medium',
      {
        '&:hover': 'bg-blue-600 transform scale-105',
        '&:active': 'bg-blue-700 scale-95',
        '&:disabled': 'bg-gray-400 cursor-not-allowed'
      }
    ]
  })

  // Get CSS without injection
  const css = useTwsx({
    '.card': 'bg-white p-6 rounded-lg shadow-md'
  }, { inject: false })

  return (
    <>
      <style>{css}</style>
      <div className="card">
        <button className="button">Click me</button>
      </div>
    </>
  )
}
```

### `TwsxProvider` - Theme Configuration

Provide global theme configuration and custom colors:

```javascript
import { TwsxProvider, useTwsx } from 'tailwind-to-style'

const themeConfig = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a'
        },
        accent: '#f59e0b'
      },
      spacing: {
        '128': '32rem',
        '144': '36rem'
      }
    }
  }
}

function App() {
  return (
    <TwsxProvider config={themeConfig}>
      <Header />
      <Main />
      <Footer />
    </TwsxProvider>
  )
}

function Header() {
  useTwsx({
    '.header': [
      'bg-brand-500 text-white p-128', // Uses custom spacing
      {
        '.logo': 'text-accent font-bold text-2xl', // Uses custom color
        '&:hover': 'bg-brand-600'
      }
    ]
  })

  return (
    <header className="header">
      <div className="logo">My Brand</div>
    </header>
  )
}
```

### Dynamic Styling with State

Create dynamic styles that respond to component state:

```javascript
import { useTwsx } from 'tailwind-to-style'
import { useState } from 'react'

function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  
  useTwsx({
    '.theme-container': [
      `bg-${theme === 'dark' ? 'gray-900' : 'white'} p-6 rounded-lg transition-all duration-300`,
      {
        [`&.${theme}`]: theme === 'dark' 
          ? 'text-white border-gray-700' 
          : 'text-gray-900 border-gray-200',
        '.theme-title': 'text-2xl font-bold mb-4',
        '.theme-button': [
          'px-4 py-2 rounded-lg font-medium transition-colors',
          theme === 'dark' 
            ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        ]
      }
    ]
  })

  return (
    <div className={`theme-container ${theme}`}>
      <h2 className="theme-title">🌓 Dynamic Theme</h2>
      <button 
        className="theme-button"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  )
}
```

### Available React Hooks

```javascript
import { 
  useTwsx,           // Main hook for styling
  TwsxProvider,      // Context provider
  useTwsxContext,    // Access provider context
  useTwsxConfig,     // Get current config
  useUpdateTwsxConfig // Update config
} from 'tailwind-to-style'

// Example usage
function ConfigAwareComponent() {
  const { config, isConfigured } = useTwsxConfig()
  const updateConfig = useUpdateTwsxConfig()
  
  if (!isConfigured) {
    return <div>Loading theme...</div>
  }
  
  return (
    <div>
      <p>Current theme: {config.theme?.extend?.colors?.brand ? 'Custom' : 'Default'}</p>
      <button onClick={() => updateConfig({ 
        theme: { extend: { colors: { brand: { 500: '#ef4444' } } } }
      })}>
        Change Brand Color
      </button>
    </div>
  )
}
```

## Styled Components

**New in v2.11.0** - Create reusable, variant-based components inspired by styled-components and tailwind-variants.

### Key Features

- ⚡ **Deterministic Class Names**: Hash-based naming ensures consistent class names across renders and SSR
- 🚀 **Optimized CSS Injection**: Global cache prevents duplicate styles, single `<style>` tag for better performance
- 🎯 **Type-safe Variants**: Full TypeScript support with automatic type inference
- 🔄 **SSR-Compatible**: Same class names on server and client, no hydration mismatches
- 📦 **Zero Runtime Overhead**: Styles are generated once and cached efficiently

### Basic Usage

```javascript
import { styled } from 'tailwind-to-style/react'

const Button = styled('button', {
  base: 'px-4 py-2 rounded-lg font-medium transition-all',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      danger: 'bg-red-500 text-white hover:bg-red-600'
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3'
    },
    outlined: {
      true: 'bg-transparent border-2'
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
})

// Usage
function App() {
  return (
    <>
      <Button>Default Button</Button>
      <Button color="secondary" size="lg">Large Secondary</Button>
      <Button color="danger" outlined>Outlined Danger</Button>
    </>
  )
}
```

### Tag Helpers

Convenient helpers for common HTML elements:

```javascript
import { styled } from 'tailwind-to-style/react'

const Container = styled.div({
  base: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
})

const Title = styled.h1({
  base: 'text-4xl font-bold text-gray-900',
  variants: {
    centered: {
      true: 'text-center'
    }
  }
})

const Card = styled.article({
  base: 'bg-white rounded-lg shadow-md p-6',
  hover: 'shadow-xl transform scale-105',
  active: 'shadow-lg scale-100'
})

function HomePage() {
  return (
    <Container>
      <Title centered>Welcome</Title>
      <Card>
        <p>This card has hover effects!</p>
      </Card>
    </Container>
  )
}
```

**Available tag helpers**: `div`, `span`, `p`, `a`, `button`, `input`, `label`, `form`, `section`, `article`, `header`, `footer`, `nav`, `main`, `aside`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `ul`, `ol`, `li`, `img`, `video`

### Pseudo-state Variants

Define styles for hover, focus, active, and disabled states:

```javascript
const Input = styled.input({
  base: 'w-full px-4 py-2 border border-gray-300 rounded-lg transition-all',
  focus: 'border-blue-500 outline-none ring-2 ring-blue-200',
  disabled: 'bg-gray-100 cursor-not-allowed opacity-60',
  variants: {
    error: {
      true: 'border-red-500 focus:border-red-600 focus:ring-red-200'
    }
  }
})

const LinkButton = styled.a({
  base: 'inline-block px-6 py-3 rounded-lg font-semibold',
  hover: 'transform scale-105',
  active: 'scale-95',
  focus: 'outline-none ring-4 ring-blue-300',
  variants: {
    variant: {
      solid: 'bg-blue-600 text-white',
      ghost: 'bg-transparent text-blue-600 border border-blue-600'
    }
  }
})

// Usage
<Input placeholder="Enter email" />
<Input error placeholder="Invalid email" disabled />
<LinkButton href="/signup" variant="solid">Sign Up</LinkButton>
```

### Nested Styles (SCSS-like)

Create complex components with nested selectors:

```javascript
const Card = styled.div({
  base: 'bg-white rounded-lg shadow-md p-6',
  nested: {
    '.card-header': [
      'border-b border-gray-200 pb-4 mb-4',
      {
        '.card-title': 'text-2xl font-bold text-gray-900',
        '.card-subtitle': 'text-sm text-gray-500 mt-1'
      }
    ],
    '.card-body': 'text-gray-700 leading-relaxed',
    '.card-footer': [
      'border-t border-gray-200 pt-4 mt-4 flex justify-end gap-2',
      {
        'button': 'px-4 py-2 rounded-lg transition-colors',
        'button.primary': 'bg-blue-500 text-white hover:bg-blue-600',
        'button.secondary': 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }
    ]
  }
})

// Usage
function ProfileCard() {
  return (
    <Card>
      <div className="card-header">
        <h2 className="card-title">John Doe</h2>
        <p className="card-subtitle">Software Engineer</p>
      </div>
      <div className="card-body">
        Passionate developer with 10 years of experience...
      </div>
      <div className="card-footer">
        <button className="secondary">Cancel</button>
        <button className="primary">Save</button>
      </div>
    </Card>
  )
}
```

### Compound Variants

Apply styles based on multiple variant combinations:

```javascript
const Button = styled('button', {
  base: 'px-4 py-2 rounded-lg font-medium',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white'
    },
    size: {
      sm: 'text-sm',
      lg: 'text-lg'
    },
    outlined: {
      true: 'bg-transparent border-2'
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      outlined: true,
      class: 'border-blue-500 text-blue-500 hover:bg-blue-50'
    },
    {
      color: 'secondary',
      outlined: true,
      class: 'border-gray-500 text-gray-500 hover:bg-gray-50'
    },
    {
      size: 'lg',
      outlined: true,
      class: 'border-4' // Larger borders for large outlined buttons
    }
  ]
})

// Usage
<Button color="primary" outlined>Outlined Primary</Button>
<Button color="secondary" size="lg" outlined>Large Outlined</Button>
```

### Polymorphic "as" Prop

Change the underlying element while keeping styles:

```javascript
const Button = styled('button', {
  base: 'px-4 py-2 rounded-lg bg-blue-500 text-white font-medium'
})

function Navigation() {
  return (
    <>
      {/* Renders as <button> */}
      <Button onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
      
      {/* Renders as <a> with same styles */}
      <Button as="a" href="/signup">
        Sign Up
      </Button>
      
      {/* Renders as custom component */}
      <Button as={Link} to="/dashboard">
        Dashboard
      </Button>
    </>
  )
}
```

### Extending Styled Components

Extend existing styled components:

```javascript
const BaseButton = styled('button', {
  base: 'px-4 py-2 rounded-lg font-medium transition-colors'
})

const PrimaryButton = styled(BaseButton, {
  base: 'bg-blue-500 text-white hover:bg-blue-600'
})

const IconButton = styled(PrimaryButton, {
  base: 'flex items-center gap-2',
  nested: {
    'svg': 'w-5 h-5'
  }
})

// Usage
<IconButton>
  <svg>...</svg>
  Save Changes
</IconButton>
```

### Type-safe Variants with `tv()`

Framework-agnostic variant system for design systems:

```javascript
import { tv } from 'tailwind-to-style'

// Create a variant function
const buttonVariants = tv({
  base: 'px-4 py-2 rounded-lg font-medium transition-all',
  variants: {
    intent: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      danger: 'bg-red-500 text-white hover:bg-red-600'
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3'
    },
    fullWidth: {
      true: 'w-full'
    }
  },
  compoundVariants: [
    {
      intent: 'primary',
      size: 'lg',
      class: 'shadow-lg hover:shadow-xl'
    }
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'md'
  }
})

// Use in React
function Button({ intent, size, fullWidth, children, ...props }) {
  return (
    <button 
      className={buttonVariants({ intent, size, fullWidth })} 
      {...props}
    >
      {children}
    </button>
  )
}

// Use in vanilla JS
const className = buttonVariants({ intent: 'danger', size: 'lg' })
document.querySelector('.my-button').className = className

// Use in Vue
<template>
  <button :class="buttonVariants({ intent: 'primary', fullWidth: true })">
    Click me
  </button>
</template>
```

### Batch Variant Creation

Create multiple variant functions at once:

```javascript
import { createVariants } from 'tailwind-to-style'

const components = createVariants({
  button: {
    base: 'px-4 py-2 rounded font-medium',
    variants: {
      color: {
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-500 text-white'
      }
    }
  },
  badge: {
    base: 'px-2 py-1 text-xs rounded-full font-semibold',
    variants: {
      color: {
        success: 'bg-green-100 text-green-800',
        error: 'bg-red-100 text-red-800',
        warning: 'bg-yellow-100 text-yellow-800'
      }
    }
  },
  input: {
    base: 'w-full px-3 py-2 border rounded',
    variants: {
      error: {
        true: 'border-red-500',
        false: 'border-gray-300'
      }
    }
  }
})

// Use the variants
const buttonClass = components.button({ color: 'primary' })
const badgeClass = components.badge({ color: 'success' })
const inputClass = components.input({ error: true })
```

### TypeScript Support

Full type inference for variants and props:

```typescript
import { styled, tv } from 'tailwind-to-style/react'
import type { StyledProps } from 'tailwind-to-style/react'

// Styled components have inferred types
const Button = styled('button', {
  variants: {
    color: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500'
    },
    size: {
      sm: 'text-sm',
      lg: 'text-lg'
    }
  }
})

// Props are fully typed
function App() {
  return (
    <>
      <Button color="primary" size="lg">Typed!</Button>
      {/* @ts-expect-error - invalid variant */}
      <Button color="invalid">Error</Button>
    </>
  )
}

// Extract prop types
type ButtonProps = StyledProps<typeof Button>
// { color?: 'primary' | 'secondary', size?: 'sm' | 'lg', as?: any, ... }

// tv() also has full type inference
const cardVariants = tv({
  variants: {
    elevated: {
      true: 'shadow-lg',
      false: 'shadow-none'
    }
  }
})

// Type-safe variant props
const className = cardVariants({ elevated: true }) // ✅
const invalid = cardVariants({ elevated: 'yes' }) // ❌ Type error
```

### Performance & Class Naming

#### Deterministic Hash-based Class Names

`styled()` components generate **deterministic class names** based on the component's configuration. This ensures:

- **Stability**: Same config = same class name across all renders
- **SSR Compatibility**: Server and client generate identical class names, preventing hydration mismatches
- **Predictability**: Class names are consistent across environments and builds

```javascript
const Button = styled('button', {
  base: 'px-4 py-2 rounded bg-blue-500'
})
// Generates: twsx-button-a1b2c3 (deterministic hash)
```

#### Optimized CSS Injection

The library uses a **global CSS cache** with hash-based deduplication:

- **Single Style Tag**: All component styles are injected into one `<style data-twsx-global>` tag
- **No Duplicate CSS**: Same styles are cached and reused across components
- **Efficient Updates**: Only new styles are added, existing styles are preserved
- **Memory Efficient**: CSS content hashing prevents redundant injections

```javascript
// Multiple instances share the same cached styles
function App() {
  return (
    <>
      <Button>First</Button>   {/* Injects CSS */}
      <Button>Second</Button>  {/* Reuses cached CSS */}
      <Button>Third</Button>   {/* Reuses cached CSS */}
    </>
  )
}
```

#### Best Practices

1. **Define components outside render** - Component definitions should be at module level:
```javascript
// ✅ Good - defined once at module level
const Button = styled('button', { base: 'px-4 py-2' })

function App() {
  return <Button>Click</Button>
}

// ❌ Bad - redefined on every render
function App() {
  const Button = styled('button', { base: 'px-4 py-2' })
  return <Button>Click</Button>
}
```

2. **Use `tv()` for dynamic variants** - When you need runtime flexibility:
```javascript
const buttonVariants = tv({
  variants: { color: { primary: '...', secondary: '...' } }
})

function DynamicButton({ color }) {
  return <button className={buttonVariants({ color })}>Click</button>
}
```

3. **SSR Considerations** - Class names are deterministic, ensuring proper hydration:
```javascript
// Server renders: <button class="twsx-button-a1b2c3">
// Client hydrates: <button class="twsx-button-a1b2c3"> ✅ No mismatch!
```



### 1. `tws`

The `tws` function is designed to convert Tailwind CSS utility classes into either **inline CSS** or **JSON style objects**. This makes it particularly useful for applying styles dynamically in React or similar frameworks where inline styles or style objects are often needed.

#### Features of `tws`:

- Converts Tailwind utility classes into **inline CSS** or **JSON style objects**.

#### Usage

```javascript
import { tws } from "tailwind-to-style";

// Convert Tailwind classes to inline CSS
const styleInline = tws("bg-white mx-auto");
// Output: background-color:rgba(255, 255, 255, 1); margin-left:auto; margin-right:auto;

// Convert Tailwind classes to JSON style object
const styleJSON = tws("bg-white mx-auto", 1);
// Output: { backgroundColor: 'rgba(255, 255, 255, 1)', marginLeft: 'auto', marginRight: 'auto' }
```

- **First argument**: The string of Tailwind classes to convert.
- **Second argument (optional)**: Pass `1` to get the result as a JSON object (default is inline CSS when omitted).

#### Example in React:

```javascript
import React from "react";
import { tws } from "tailwind-to-style";

const App = () => {
  return (
    <div style={tws("text-red-500 bg-blue-200 p-4", 1)}>
      Hello, this is styled using tailwind-to-style
    </div>
  );
};

export default App;
```

This will apply the Tailwind classes directly as inline styles in the React component.

## Advanced Features (v2.10.0+)

### Logger Configuration

Control logging behavior for production environments:

```javascript
import { logger } from "tailwind-to-style";

// Set log level (debug, info, warn, error, silent)
logger.setLevel('error'); // Only show errors in production

// Default is 'warn' in development, 'error' in production
```

### Error Handling

Subscribe to errors for monitoring and debugging:

```javascript
import { onError, TwsError } from "tailwind-to-style";

// Subscribe to errors
const unsubscribe = onError((error) => {
  console.log(error.message);
  console.log(error.context);  // Additional context
  console.log(error.timestamp); // When it occurred
  
  // Send to error tracking service
  // Sentry.captureException(error);
});

// Unsubscribe when done
unsubscribe();
```

### Cache Management

For testing or memory management:

```javascript
import { getTailwindCache, resetTailwindCache } from "tailwind-to-style";

// Get cache instance
const cache = getTailwindCache();

// Check if initialized
if (cache.isInitialized()) {
  console.log("Cache is ready");
}

// Reset cache (useful for testing)
resetTailwindCache();
```

### Custom Logger Instance

Create your own logger with custom settings:

```javascript
import { Logger } from "tailwind-to-style";

const customLogger = new Logger('debug');
customLogger.debug('Custom message');
customLogger.setLevel('silent'); // Disable all logging
```

## Animations & Transitions (v2.10.0+)

Full support for Tailwind CSS animations and transitions!

### Built-in Animations

```javascript
import { tws } from "tailwind-to-style";

// Spin animation (loading spinners)
const spinner = tws("animate-spin", 1);
// { animation: "spin 1s linear infinite" }

// Ping animation (notification badges)
const badge = tws("animate-ping", 1);
// { animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite" }

// Pulse animation (breathing effect)
const pulse = tws("animate-pulse", 1);
// { animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }

// Bounce animation
const bounce = tws("animate-bounce", 1);
// { animation: "bounce 1s infinite" }

// Disable animation
const none = tws("animate-none", 1);
// { animation: "none" }
```

### Transition Utilities

```javascript
// Basic transition
const button = tws("transition duration-300 ease-in-out", 1);
// {
//   transitionProperty: "color, background-color, border-color, ...",
//   transitionDuration: "300ms",
//   transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
// }

// Transition specific properties
tws("transition-colors", 1); // Only colors
tws("transition-opacity", 1); // Only opacity
tws("transition-shadow", 1); // Only box-shadow
tws("transition-transform", 1); // Only transform
tws("transition-all", 1); // All properties

// Duration
tws("duration-75", 1);   // 75ms
tws("duration-150", 1);  // 150ms
tws("duration-300", 1);  // 300ms
tws("duration-500", 1);  // 500ms
tws("duration-1000", 1); // 1000ms

// Timing functions
tws("ease-linear", 1);   // linear
tws("ease-in", 1);       // cubic-bezier(0.4, 0, 1, 1)
tws("ease-out", 1);      // cubic-bezier(0, 0, 0.2, 1)
tws("ease-in-out", 1);   // cubic-bezier(0.4, 0, 0.2, 1)

// Delay
tws("delay-75", 1);   // 75ms
tws("delay-150", 1);  // 150ms
tws("delay-300", 1);  // 300ms
tws("delay-500", 1);  // 500ms
```

### Custom Animations

Create your own animations using `configure()`:

```javascript
import { configure, tws } from "tailwind-to-style";

configure({
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-in forwards',
        'slide-up': 'slideUp 0.5s ease-out',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
});

// Use custom animations
const modal = tws("animate-fade-in", 1);
// { animation: "fadeIn 1s ease-in forwards" }

const notification = tws("animate-slide-up", 1);
// { animation: "slideUp 0.5s ease-out" }
```

### Real-World Examples

```javascript
// Button with hover transition
const button = tws(
  "bg-blue-500 hover:bg-blue-600 transition-colors duration-200",
  1
);

// Loading spinner
const spinner = tws(
  "animate-spin w-8 h-8 border-2 border-blue-500 rounded-full",
  1
);

// Notification with fade in
const notification = tws(
  "animate-fade-in bg-green-500 text-white p-4 rounded shadow-lg",
  1
);

// Menu with slide transition
const menu = tws(
  "transition-transform duration-300 ease-out transform translate-x-0",
  1
);

// Icon with hover wiggle
const icon = tws("hover:animate-wiggle cursor-pointer", 1);
```

See [examples/animations.js](examples/animations.js) for more examples!

## Theme Customization (v2.10.0+)

Extend the default Tailwind theme with your own custom values:

### Basic Theme Extension

```javascript
import { configure, tws } from "tailwind-to-style";

// Configure custom theme
configure({
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#0ea5e9',
          600: '#0284c7',
        },
        accent: '#ff6b6b',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
});

// Now use your custom values
const button = tws('bg-brand-500 hover:bg-brand-600 p-128 rounded-4xl', 1);
// Works! Uses your custom colors, spacing, and border radius
```

### Theme Configuration Options

```javascript
configure({
  theme: {
    extend: {
      colors: { /* custom colors */ },
      spacing: { /* custom spacing */ },
      borderRadius: { /* custom border radius */ },
      fontSize: { /* custom font sizes */ },
      // ... any Tailwind theme property
    },
  },
  
  // Optional: Add prefix to all classes
  prefix: 'tw-',
  
  // Optional: Disable specific core plugins
  corePlugins: {
    float: false,
    clear: false,
  },
});
```

### Using Config File

Create `tailwind-to-style.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#0ea5e9',
        },
      },
    },
  },
};
```

Then import and use it:

```javascript
import { configure } from "tailwind-to-style";
import config from "./tailwind-to-style.config.js";

configure(config);
```

## Custom Plugins (v2.10.0+)

Create custom utility classes with the plugin API:

### Simple Utility Plugin

```javascript
import { createPlugin, configure, tws } from "tailwind-to-style";

// Create a text gradient plugin
const textGradientPlugin = createPlugin('text-gradient', {
  utilities: {
    '.text-gradient': {
      'background-clip': 'text',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      'background-image': 'linear-gradient(to right, #3b82f6, #8b5cf6)',
    },
  },
});

// Register the plugin
configure({
  plugins: [textGradientPlugin],
});

// Use it!
const heading = tws('text-gradient text-4xl font-bold', 1);
```

### Dynamic Utility Plugin

```javascript
import { createUtilityPlugin, configure } from "tailwind-to-style";

// Create a text-shadow plugin with multiple values
const textShadowPlugin = createUtilityPlugin('text-shadow', {
  prefix: 'text-shadow',
  values: {
    sm: '1px 1px 2px rgba(0,0,0,0.1)',
    md: '2px 2px 4px rgba(0,0,0,0.15)',
    lg: '4px 4px 8px rgba(0,0,0,0.2)',
    xl: '6px 6px 12px rgba(0,0,0,0.25)',
  },
  formatter: (value) => ({
    'text-shadow': value,
  }),
});

configure({
  plugins: [textShadowPlugin],
});

// Use with different sizes
tws('text-shadow-sm'); // Small shadow
tws('text-shadow-lg'); // Large shadow
```

### Glassmorphism Plugin Example

```javascript
const glassmorphismPlugin = createPlugin('glassmorphism', {
  utilities: {
    '.glass': {
      'backdrop-filter': 'blur(10px)',
      '-webkit-backdrop-filter': 'blur(10px)',
      'background-color': 'rgba(255, 255, 255, 0.1)',
      'border': '1px solid rgba(255, 255, 255, 0.2)',
    },
    '.glass-dark': {
      'backdrop-filter': 'blur(10px)',
      '-webkit-backdrop-filter': 'blur(10px)',
      'background-color': 'rgba(0, 0, 0, 0.1)',
      'border': '1px solid rgba(255, 255, 255, 0.1)',
    },
  },
});

configure({
  plugins: [glassmorphismPlugin],
});

// Use glassmorphism effects
const card = tws('glass p-6 rounded-lg', 1);
```

### Complete Configuration Example

```javascript
import { configure, createPlugin, createUtilityPlugin } from "tailwind-to-style";

const textShadowPlugin = createUtilityPlugin('text-shadow', {
  prefix: 'text-shadow',
  values: {
    sm: '1px 1px 2px rgba(0,0,0,0.1)',
    md: '2px 2px 4px rgba(0,0,0,0.15)',
    lg: '4px 4px 8px rgba(0,0,0,0.2)',
  },
  formatter: (value) => ({ 'text-shadow': value }),
});

const glassmorphismPlugin = createPlugin('glassmorphism', {
  utilities: {
    '.glass': {
      'backdrop-filter': 'blur(10px)',
      'background-color': 'rgba(255, 255, 255, 0.1)',
    },
  },
});

configure({
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#0ea5e9',
        },
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [textShadowPlugin, glassmorphismPlugin],
});
```

### 2. `twsx`

`twsx` is an advanced function that builds on `tws` by allowing you to define **nested styles** and more complex CSS structures. It supports **grouping**, **responsive variants**, **state variants**, **dynamic utilities**, and **direct CSS properties** via the `@css` directive, making it ideal for more advanced styling needs.

#### Features of `twsx`:

- ✅ **Nested styles** similar to SCSS, enabling more complex CSS structures
- ✅ **Grouping**: Supports grouping utilities inside parentheses `hover:(bg-blue-600 scale-105)`
- ✅ **Responsive variants** (`sm`, `md`, `lg`, `xl`, `2xl`) in standard and grouping syntax
- ✅ **🆕 Responsive selector syntax** (v2.9.0+): `'md:.title': 'text-lg'` format for intuitive responsive styling
- ✅ **State variants** like `hover`, `focus`, `active`, `disabled`, etc.
- ✅ **Dynamic utilities** such as `w-[300px]`, `bg-[rgba(0,0,0,0.5)]`, `text-[14px]`
- ✅ **!important support** with `!text-red-500`, `!bg-blue-500`
- ✅ **🆕 Enhanced @css directive** (v2.9.0+): Perfect CSS variables, functions, and complex expressions support

#### Basic Usage

```javascript
import { twsx } from "tailwind-to-style";

const styles = twsx({
  ".card": [
    "bg-white p-4 rounded-lg shadow-md",
    {
      "&:hover": "shadow-xl scale-105",
      ".title": "text-lg font-bold text-gray-900",
      ".desc": "text-sm text-gray-600 mt-2",
    },
  ],
});

console.log(styles);
```

**Output**:

```css
.card {
  background-color: rgba(255, 255, 255, var(--bg-opacity));
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.card:hover {
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  transform: scale(1.05);
}
.card .title {
  font-size: 1.125rem;
  font-weight: 700;
  color: rgba(17, 24, 39, var(--text-opacity));
}
.card .desc {
  font-size: 0.875rem;
  color: rgba(75, 85, 99, var(--text-opacity));
  margin-top: 0.5rem;
}
```

#### Grouping Support

Group related utilities together inside parentheses for better readability and organization:

```javascript
const styles = twsx({
  ".button": [
    "bg-blue-500 text-white px-6 py-3 rounded-lg",
    "hover:(bg-blue-600 scale-105 shadow-lg)",
    "focus:(ring-2 ring-blue-300 outline-none)",
    "active:(bg-blue-700 scale-95)",
  ],
});
```

**Output**:

```css
.button {
  background-color: rgba(59, 130, 246, var(--bg-opacity));
  color: rgba(255, 255, 255, var(--text-opacity));
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}
.button:hover {
  background-color: rgba(37, 99, 235, var(--bg-opacity));
  transform: scale(1.05);
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
}
.button:focus {
  box-shadow: var(--ring-offset-shadow), var(--ring-shadow);
  outline: none;
}
.button:active {
  background-color: rgba(29, 78, 216, var(--bg-opacity));
  transform: scale(0.95);
}
```

#### Responsive Variants

Responsive variants work seamlessly with both standard syntax and grouping syntax:

```javascript
const styles = twsx({
  ".hero": [
    // Standard responsive syntax
    "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
    "w-full md:w-1/2 lg:w-1/3 p-4",
    // Grouped responsive syntax
    "sm:(py-16 px-4)",
    "md:(py-20 px-6)",
    "lg:(py-24 px-8)",
    {
      h1: "font-bold text-gray-900",
      p: "text-gray-600 mt-4",
    },
  ],
});
```

**Output**:

```css
.hero {
  font-size: 1.5rem;
  width: 100%;
  padding: 1rem;
}
@media (min-width: 640px) {
  .hero {
    font-size: 1.875rem;
    padding: 4rem 1rem;
  }
}
@media (min-width: 768px) {
  .hero {
    font-size: 2.25rem;
    width: 50%;
    padding: 5rem 1.5rem;
  }
}
@media (min-width: 1024px) {
  .hero {
    font-size: 3rem;
    width: 33.333333%;
    padding: 6rem 2rem;
  }
}
@media (min-width: 1280px) {
  .hero {
    font-size: 3.75rem;
  }
}
.hero h1 {
  font-weight: 700;
  color: rgba(17, 24, 39, var(--text-opacity));
}
.hero p {
  color: rgba(75, 85, 99, var(--text-opacity));
  margin-top: 1rem;
}
```

#### 🆕 Responsive Selector Syntax (v2.9.0+)

**New feature**: You can now use responsive breakpoints directly in selectors for more intuitive responsive styling:

```javascript
const styles = twsx({
  // New responsive selector syntax
  "md:.title": "text-lg font-bold",
  "lg:.title": "text-xl",
  "xl:.title": "text-2xl",
  
  // Equivalent to the traditional syntax:
  ".title": "md:text-lg md:font-bold lg:text-xl xl:text-2xl"
});
```

This new syntax automatically converts responsive selectors to traditional Tailwind responsive classes and generates proper media queries:

```css
.title {
  /* Base styles if any */
}
@media (min-width: 768px) {
  .title {
    font-size: 1.125rem;
    font-weight: 700;
  }
}
@media (min-width: 1024px) {
  .title {
    font-size: 1.25rem;
  }
}
@media (min-width: 1280px) {
  .title {
    font-size: 1.5rem;
  }
}
```

**Benefits of Responsive Selector Syntax:**
- ✅ More intuitive and organized responsive code
- ✅ Better separation of breakpoint-specific styles
- ✅ Easier to maintain complex responsive designs
- ✅ Backward compatible with existing syntax
- ✅ Works with all breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`

#### Handling Dark and Light Mode

`twsx` supports writing styles for dark and light mode easily, similar to Tailwind CSS. You can use the `dark:` prefix, `.dark` selector, grouping, or nested selector.

**Usage Example:**

```javascript
import { twsx } from "tailwind-to-style";

const styles = twsx({
  ".card": [
    "bg-white text-gray-900 dark:bg-gray-900 dark:text-white", // Using dark: prefix
    { ".dark &": "bg-gray-900 text-white border-gray-700" }, // Or .dark selector
  ],
  // Grouping is also supported
  ".button": "bg-blue-500 text-white dark:(bg-gray-900 text-yellow-200)",
});
```

**Explanation:**
- The `dark:` prefix will automatically generate CSS that is only active if the parent has the `dark` class (e.g. `<html class="dark">`).
- The `.dark &` selector can also be used for more flexibility.
- Grouping `dark:(...)` will be automatically expanded into multiple dark classes.

**CSS Output:**
```css
.card {
  background-color: #fff;
  color: #111827;
}
.dark .card {
  background-color: #111827;
  color: #fff;
  border-color: #374151;
}
.button {
  background-color: #3b82f6;
  color: #fff;
}
.dark .button {
  background-color: #111827;
  color: #fde68a;
}
```

**Enable dark mode** by adding the `dark` class to the root element (usually `<html class="dark">`).

### Performance Utilities

The library includes performance optimization features:

#### Inject Option

Control CSS output location with the `inject` option:

```javascript
import { tws, twsx } from "tailwind-to-style";

// Auto-inject into document head (default)
const styles1 = tws("bg-blue-500 text-white p-4");

// Skip injection - returns CSS only
const styles2 = tws("bg-red-500 text-black p-2", { inject: false });

// Custom injection target
const targetElement = document.getElementById("custom-styles");
const styles3 = tws("bg-green-500 text-yellow p-3", { inject: targetElement });
```

#### Performance Monitoring

```javascript
import { tws } from "tailwind-to-style";

// Enable performance logging
const start = performance.now();
const styles = tws("complex-classes here...");
const end = performance.now();
console.log(`Generation time: ${end - start}ms`);
```

## Advanced `@css` Directive

The `@css` directive allows you to write custom CSS properties that aren't available as Tailwind utilities. **Starting from v2.9.0**, the `@css` directive has been significantly enhanced with improved CSS syntax preservation.

### 🆕 Enhanced CSS Support (v2.9.0+)

**Major improvements in CSS handling:**
- ✅ **Perfect CSS Variables**: `var(--custom-property)` syntax fully preserved
- ✅ **CSS Functions**: `calc()`, `rgba()`, `linear-gradient()`, `clamp()` etc. work flawlessly  
- ✅ **Complex Expressions**: Multi-function CSS expressions preserved accurately
- ✅ **Zero Corruption**: Fixed critical bug where CSS values were being corrupted

**Before v2.9.0** (corrupted):
```css
/* This would be corrupted */
background: -var--primary; /* ❌ WRONG */
color: rgba-255,0,0,0.5;   /* ❌ WRONG */
```

**v2.9.0+** (perfect preservation):
```css
/* Now works perfectly */
background: var(--primary);     /* ✅ CORRECT */
color: rgba(255,0,0,0.5);      /* ✅ CORRECT */
transform: calc(100% - 20px);   /* ✅ CORRECT */
```

### Usage Examples

There are several ways to use the `@css` feature:

1. **As a nested object inside selectors**:

```javascript
const styles = twsx({
  ".button": [
    "bg-blue-500 text-white rounded-md",
    {
      "@css": {
        transition: "all 0.3s ease-in-out",
        "will-change": "transform, opacity",
      },
      "&:hover": "bg-blue-600",
    },
  ],
});
```

**Output**:

```css
.button {
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  transition: all 0.3s ease-in-out;
  will-change: transform, opacity;
}
.button:hover {
  background-color: #2563eb;
}
```

2. **As a direct property in the selector**:

```javascript
const styles = twsx({
  ".button @css transition": "all 0.3s ease-in-out",
  ".button": "bg-blue-500 text-white rounded-md",
  ".button:hover": "bg-blue-600",
});
```

This syntax is especially useful when you need to add just a single CSS property that isn't available in Tailwind.

The `@css` feature is particularly helpful for properties that require complex values with spaces (like transitions, animations, and transforms) which can't be represented with standard Tailwind utility classes.

#### Advanced `@css` Examples:

You can combine `@css` with state variants:

```javascript
const styles = twsx({
  ".modal": [
    "bg-white rounded-lg shadow-xl",
    {
      "@css": {
        transform: "translateX(0px)",
        transition: "all 0.3s ease-out",
        "will-change": "transform, opacity",
      },
      "&.hidden": [
        "opacity-0",
        {
          "@css": {
            transform: "translateX(-100px)",
          },
        },
      ],
    },
  ],
});
```

**Output**:

```css
.modal {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateX(0px);
  transition: all 0.3s ease-out;
  will-change: transform, opacity;
}
.modal.hidden {
  opacity: 0;
  transform: translateX(-100px);
}
```

#### 🆕 CSS Variables & Functions Examples (v2.9.0+)

With the enhanced `@css` directive, you can now use complex CSS features:

```javascript
const styles = twsx({
  ".theme-component": {
    "@css": {
      // CSS Variables - now work perfectly!
      "--primary-color": "#3b82f6",
      "--secondary-color": "#8b5cf6", 
      "--border-radius": "0.5rem",
      
      // CSS Functions - fully preserved!
      "background": "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
      "border-radius": "var(--border-radius)",
      "box-shadow": "0 4px 20px rgba(0, 0, 0, 0.15)",
      "transform": "translateY(calc(-1 * var(--spacing, 10px)))",
      
      // Complex CSS expressions
      "width": "clamp(200px, 50vw, 800px)",
      "padding": "calc(1rem + 2vw)",
      "color": "hsl(220, 100%, 50%)"
    }
  },
  
  ".dynamic-grid": {
    "@css": {
      "display": "grid",
      "grid-template-columns": "repeat(auto-fit, minmax(250px, 1fr))",
      "gap": "clamp(1rem, 5vw, 3rem)",
      "grid-auto-rows": "minmax(200px, auto)"
    }
  }
});
```

**Output** (perfectly preserved CSS):

```css
.theme-component {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --border-radius: 0.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: var(--border-radius);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transform: translateY(calc(-1 * var(--spacing, 10px)));
  width: clamp(200px, 50vw, 800px);
  padding: calc(1rem + 2vw);
  color: hsl(220, 100%, 50%);
}
.dynamic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(1rem, 5vw, 3rem);
  grid-auto-rows: minmax(200px, auto);
}
```

For responsive styles, you can use standard Tailwind responsive utilities within your classes:

```javascript
const styles = twsx({
  ".responsive-box": "w-full md:w-1/2 lg:w-1/3 p-4 bg-blue-500",
});
```

The `@css` feature provides a powerful way to bridge the gap between Tailwind's utility classes and custom CSS when needed, without leaving the `twsx` syntax.

### Inject Option (Browser Only)

By default, every call to `twsx` in the browser will automatically inject the generated CSS into a `<style id="twsx-auto-style">` tag in the document `<head>`. This makes it easy to use dynamic styles in browser or CDN scenarios without manual CSS management.

You can control this behavior with the `inject` option:

```js
// Auto-inject (default)
twsx({ ... }) // CSS is injected automatically

// Disable auto-inject
twsx({ ... }, { inject: false }) // CSS is NOT injected, just returned as string
```

- **inject: true** (default): CSS is injected into the page (browser only).
- **inject: false**: CSS is only returned as a string, not injected. Useful for SSR, testing, or custom handling.

> Note: This option only affects browser usage. In Node.js or SSR, no injection occurs.

## Performance Monitoring & Debugging (v2.7.0+)

Starting from version 2.7.0, `tailwind-to-style` includes built-in performance monitoring and debugging utilities to help you optimize your application and troubleshoot issues.

### Performance Utils

```javascript
import { performanceUtils } from "tailwind-to-style";

// Enable performance logging (logs operations > 5ms as warnings)
performanceUtils.enablePerformanceLogging(true);

// Get cache and injection statistics
const stats = performanceUtils.getStats();
console.log(stats);
// Output:
// {
//   cacheStats: {
//     cssResolution: 45,
//     configOptions: 2,
//     parseSelector: 23,
//     encodeBracket: 12,
//     decodeBracket: 8
//   },
//   injectionStats: {
//     uniqueStylesheets: 15
//   }
// }

// Clear all caches (useful for memory management)
performanceUtils.clearCaches();
```

### Performance Metrics

The library automatically tracks performance for key operations:

- **tws:total** - Total execution time for `tws()`
- **tws:parse** - Time spent parsing classes
- **tws:process** - Time spent processing classes
- **twsx:total** - Total execution time for `twsx()`
- **twsx:flatten** - Time spent flattening objects
- **twsx:generate** - Time spent generating CSS
- **css:inject** - Time spent injecting CSS to DOM

### Debounced Functions

For high-frequency usage, use the debounced versions:

```javascript
import { debouncedTws, debouncedTwsx } from "tailwind-to-style";

// Debounced versions (50ms for tws, 100ms for twsx)
const styles = debouncedTws("bg-red-500 p-4");
const complexStyles = debouncedTwsx({ ".card": "bg-white p-6" });
```

### Example: Performance Monitoring

```javascript
import { tws, twsx, performanceUtils } from "tailwind-to-style";

// Enable monitoring
performanceUtils.enablePerformanceLogging(true);

// Your code that uses tws/twsx
const styles = tws("bg-gradient-to-r from-purple-400 to-pink-500 p-8");
const complexStyles = twsx({
  ".hero": [
    "bg-gradient-to-br from-indigo-900 to-purple-900 min-h-screen",
    {
      h1: "text-6xl font-bold text-white md:text-4xl",
      "@css": {
        transition: "font-size 0.3s ease-in-out",
      },
    },
  ],
});

// Check performance stats
console.log(performanceUtils.getStats());
```

This will automatically log warnings for operations taking longer than 5ms and provide insights into cache usage and performance bottlenecks.

# Build-Time Plugins: Vite & Webpack

### Automated Modular CSS Generation

1. Create JS files with `twsx.` prefix in your project (e.g., `twsx.card.js`, `twsx.button.js`) anywhere in your `src/` folder.
2. Use the Vite/Webpack plugin from the `plugins/` folder to automatically generate CSS on every build/rebuild.
3. Each JS file will generate its own CSS file in the specified output directory (default: `src/styles/`).
4. Import the generated CSS files directly in your components or bundle them as needed.

#### Vite Plugin Usage Example

Add the plugin to your `vite.config.js`:
```js
import twsxPlugin from 'tailwind-to-style/plugins/vite-twsx';

export default {
  plugins: [
    twsxPlugin({
      inputDir: 'src',
      outputDir: 'src/styles',
      preserveStructure: false  // Set to true to generate CSS next to JS files
    })
  ]
};
```

**Configuration Options:**
- `inputDir`: Directory to scan for `twsx.*.js` files (default: `'src'`)
- `outputDir`: Directory where CSS files will be generated (default: `'src/styles'`)
- `preserveStructure`: Whether to generate CSS files next to their JS counterparts (default: `false`)

**Default mode:** CSS files created in `src/styles/` (e.g., `twsx.card.css`, `twsx.button.css`).
**Preserve structure mode:** CSS files created next to JS files (e.g., `src/components/Card/twsx.card.css`).

Import in your components:
```js
// Default mode
import './styles/twsx.card.css';
import './styles/twsx.button.css';

// Preserve structure mode
import './twsx.card.css';  // If in same directory
```

#### Webpack Plugin Usage Example

Add the plugin to your `webpack.config.js`:
```js
import TwsxPlugin from 'tailwind-to-style/plugins/webpack-twsx';

module.exports = {
  plugins: [
    new TwsxPlugin({
      inputDir: 'src',
      outputDir: 'src/styles',
      preserveStructure: false  // Set to true to generate CSS next to JS files
    })
  ]
};
```

**Configuration Options:**
- `inputDir`: Directory to scan for `twsx.*.js` files (default: `'src'`)
- `outputDir`: Directory where CSS files will be generated (default: `'src/styles'`)
- `preserveStructure`: Whether to generate CSS files next to their JS counterparts (default: `false`)

**Default mode:** CSS files created in `src/styles/` (e.g., `twsx.card.css`, `twsx.button.css`).
**Preserve structure mode:** CSS files created next to JS files (e.g., `src/components/Card/twsx.card.css`).

Import in your components:
```js
// Default mode
import './styles/twsx.card.css';
import './styles/twsx.button.css';

// Preserve structure mode
import './twsx.card.css';  // If in same directory
```

## Build-Time CSS Generation via Script

In addition to using the Vite/Webpack plugin, you can also use a Node.js script to generate CSS files from `twsx.*.js` files manually or as part of your build workflow.

### Script: tailwind-to-style/lib/twsx-cli.js (Legacy)

> **💡 Recommended:** Use `npx twsx-cli` instead of calling the script directly.

This script will recursively scan for all `twsx.*.js` files in your project, generate CSS using the `twsx` function, and write individual CSS files to the specified output directory.

#### How to Use

1. Create JS files with `twsx.` prefix containing style objects anywhere in your `src/` folder (e.g., `src/components/twsx.card.js`).

2. **One-time Build:**
```bash
node tailwind-to-style/lib/twsx-cli.js
```

3. **Watch Mode (Auto-rebuild on file changes):**
```bash
node tailwind-to-style/lib/twsx-cli.js --watch
```

4. **Preserve Structure Mode (Generate CSS next to JS files):**
```bash
# One-time build with preserve structure
node tailwind-to-style/lib/twsx-cli.js --preserve-structure

# Watch mode with preserve structure
node tailwind-to-style/lib/twsx-cli.js --watch --preserve-structure
```

You can configure input and output directories using environment variables:
```bash
TWSX_INPUT_DIR=src TWSX_OUTPUT_DIR=dist/styles node tailwind-to-style/lib/twsx-cli.js --watch
```

Or use environment variables for preserve structure:
```bash
TWSX_PRESERVE_STRUCTURE=true node tailwind-to-style/lib/twsx-cli.js --watch
```

5. **Output locations:**

**Default mode:** CSS files will be in the output directory (default: `src/styles/`):
```
src/styles/twsx.card.css
src/styles/twsx.button.css
```

**Preserve structure mode:** CSS files will be generated next to their JS counterparts:
```
src/components/Button/twsx.button.js  →  src/components/Button/twsx.button.css
src/components/Card/twsx.card.js      →  src/components/Card/twsx.card.css
```

5. Import the generated CSS files in your components:

**Default mode:**
```js
import './styles/twsx.card.css';
import './styles/twsx.button.css';
```

**Preserve structure mode:**
```js
// In src/components/Button/Button.jsx
import './twsx.button.css';

// In src/components/Card/Card.jsx
import './twsx.card.css';
```

#### Usage in Different Projects

**React/Next.js/Vue/Any Project:**

1. Install the package:
```bash
npm install tailwind-to-style
```

2. Add to your `package.json`:
```json
{
  "scripts": {
    "twsx:build": "node node_modules/tailwind-to-style/lib/twsx-cli.js",
    "twsx:watch": "node node_modules/tailwind-to-style/lib/twsx-cli.js --watch",
    "twsx:preserve": "node node_modules/tailwind-to-style/lib/twsx-cli.js --preserve-structure",
    "twsx:dev": "node node_modules/tailwind-to-style/lib/twsx-cli.js --watch --preserve-structure",
    "dev": "npm run twsx:watch & next dev"
  }
}
```

3. For development with auto-rebuild:
```bash
npm run twsx:watch
```

4. For production build:
```bash
npm run twsx:build
```

**VS Code Integration:**
Add to your workspace settings (`.vscode/settings.json`):
```json
{
  "emeraldwalk.runonsave": {
    "commands": [
      {
        "match": "twsx\\..*\\.js$",
        "cmd": "npm run twsx:build"
      }
    ]
  }
}
```

#### Automatic Integration

You can add this script to the build section in your `package.json`:

```json
{
  "scripts": {
    "build-css": "node tailwind-to-style/lib/twsx-cli.js"
  }
}
```

Then run:

```bash
npm run build-css
```

This script is suitable for CI/CD workflows, pre-build steps, or manually generating CSS without a bundler plugin.

## License

## Support

If you find this library helpful and want to support its development, consider buying me a coffee:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/bigetion)

Your support helps maintain and improve this library! ❤️

### Why Support?

- 🔧 **Active Maintenance**: Regular updates and bug fixes
- ⚡ **New Features**: Continuous improvement based on community feedback
- 📚 **Documentation**: Better examples and tutorials
- 🚀 **Performance**: Optimization and new capabilities
- 💬 **Support**: Responsive community support

Every contribution, no matter how small, is greatly appreciated and helps keep this project alive and growing!

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to contribute or raise issues on the [GitHub repository](https://github.com/Bigetion/tailwind-to-style).
