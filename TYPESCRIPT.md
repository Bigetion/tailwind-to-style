# TypeScript Support Guide

`tailwind-to-style` provides comprehensive TypeScript support with full type inference, autocomplete, and type safety for all APIs.

## Installation

```bash
npm install tailwind-to-style
```

TypeScript definitions are included automatically — no need for `@types` packages.

## Quick Start

```typescript
import { tw, tws, cx } from 'tailwind-to-style';

// All functions are fully typed
const classes: string = tw('flex items-center gap-4');
const styles: Record<string, string> = tws('bg-blue-500 p-4', true);
const merged: string = cx('base', condition && 'active');
```

## Type-Safe Variants

### Basic Variants

```typescript
import { tw } from 'tailwind-to-style';

const button = tw({
  name: 'btn',
  base: 'px-4 py-2 rounded font-medium',
  variants: {
    color: {
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-gray-200 text-gray-800',
      danger: 'bg-red-600 text-white',
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});

// ✅ Valid - autocomplete works!
button({ color: 'primary', size: 'lg' });

// ❌ TypeScript error - invalid variant value
button({ color: 'invalid' }); // Type error!
```

### Inferring Variant Props

Extract variant types for component props:

```typescript
import { tw, type InferVariantProps } from 'tailwind-to-style';

const button = tw({
  variants: {
    color: { primary: '...', secondary: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
});

// Infer props type from variant config
type ButtonProps = InferVariantProps<typeof button>;
// Result: { color?: 'primary' | 'secondary'; size?: 'sm' | 'md' | 'lg' }

// Use in your component
interface MyButtonProps extends ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

function MyButton({ color, size, children, onClick }: MyButtonProps) {
  return (
    <button className={button({ color, size })} onClick={onClick}>
      {children}
    </button>
  );
}
```

## Type-Safe Slots

### Multi-Part Components

```typescript
import { tw, type InferSlotNames } from 'tailwind-to-style';

const card = tw({
  name: 'card',
  slots: {
    root: 'bg-white rounded-xl shadow-lg',
    header: 'px-6 py-4 border-b',
    body: 'px-6 py-4',
    footer: 'px-6 py-4 bg-gray-50',
  },
  variants: {
    elevated: {
      true: { root: 'shadow-2xl' },
      false: '',
    },
  },
});

const classes = card({ elevated: true });

// ✅ All slots are typed
classes.root;    // string
classes.header;  // string
classes.body;    // string
classes.footer;  // string

// ❌ TypeScript error - slot doesn't exist
classes.nonexistent; // Type error!

// Extract slot names as union type
type CardSlots = InferSlotNames<typeof card>;
// Result: 'root' | 'header' | 'body' | 'footer'
```

## React Components with Type Safety

### styled() Component

```typescript
import { styled } from 'tailwind-to-style/react';

const Button = styled('button', {
  base: 'px-4 py-2 rounded font-medium',
  variants: {
    variant: {
      solid: 'bg-blue-600 text-white',
      outline: 'border-2 border-blue-600 text-blue-600',
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      lg: 'text-lg px-6 py-3',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'sm',
  },
});

// ✅ Variant props are typed automatically
<Button variant="solid" size="lg" onClick={() => {}}>
  Click me
</Button>

// ✅ Native button props work too
<Button type="submit" disabled aria-label="Submit">
  Submit
</Button>

// ❌ TypeScript error - invalid variant
<Button variant="invalid" /> // Type error!
```

### Custom Components

```typescript
import { styled } from 'tailwind-to-style/react';
import { Link } from 'react-router-dom';

// Wrap any component
const StyledLink = styled(Link, {
  base: 'text-blue-600 hover:underline',
  variants: {
    active: {
      true: 'font-bold text-blue-800',
      false: '',
    },
  },
});

// ✅ Both Link props and variant props are typed
<StyledLink to="/home" active={true}>
  Home
</StyledLink>
```

### Theme Provider

```typescript
import { ThemeProvider, useTheme } from 'tailwind-to-style/react';

// Define your theme type
interface Theme {
  colors: {
    primary: string;
    secondary: string;
  };
  spacing: {
    sm: string;
    md: string;
    lg: string;
  };
}

const theme: Theme = {
  colors: { primary: '#3b82f6', secondary: '#8b5cf6' },
  spacing: { sm: '0.5rem', md: '1rem', lg: '1.5rem' },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MyComponent />
    </ThemeProvider>
  );
}

function MyComponent() {
  const { theme, setTheme } = useTheme<Theme>();
  
  // ✅ Typed theme access
  const primary: string = theme.colors.primary;
  
  return <div>...</div>;
}
```

## Design Tokens with Types

```typescript
import { createTheme, tokenRegistry, token } from 'tailwind-to-style/tokens';

// Define token structure
interface MyTokens {
  colors: {
    brand: {
      primary: string;
      secondary: string;
    };
  };
  spacing: Record<string, string>;
}

const tokens: MyTokens = {
  colors: {
    brand: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
  },
};

createTheme(tokens);

// ✅ Type-safe token access
const primary = tokenRegistry.get('colors.brand.primary');

// ✅ CSS variable with autocomplete (if using typed paths)
const cssVar = token('colors.brand.primary');
```

## Advanced Type Utilities

### Extract Variant Information

```typescript
import type {
  ExtractVariantNames,
  ExtractVariantOptions,
  RequiredVariantProps,
  PickVariantProps,
  OmitVariantProps,
} from 'tailwind-to-style';

const config = {
  variants: {
    size: { sm: '...', md: '...', lg: '...' },
    variant: { solid: '...', outline: '...' },
    disabled: { true: '...', false: '...' },
  },
};

// Extract all variant names
type Names = ExtractVariantNames<typeof config>;
// Result: 'size' | 'variant' | 'disabled'

// Extract options for specific variant
type SizeOptions = ExtractVariantOptions<typeof config, 'size'>;
// Result: 'sm' | 'md' | 'lg'

// Make all variants required
type Required = RequiredVariantProps<typeof config['variants']>;
// Result: { size: 'sm' | 'md' | 'lg'; variant: 'solid' | 'outline'; disabled: true | false }

// Pick only specific variants
type Picked = PickVariantProps<typeof config['variants'], 'size' | 'variant'>;
// Result: { size?: 'sm' | 'md' | 'lg'; variant?: 'solid' | 'outline' }

// Omit specific variants
type Omitted = OmitVariantProps<typeof config['variants'], 'disabled'>;
// Result: { size?: 'sm' | 'md' | 'lg'; variant?: 'solid' | 'outline' }
```

### Custom Component Props

```typescript
import { tw, type InferVariantProps } from 'tailwind-to-style';

const alert = tw({
  name: 'alert',
  variants: {
    variant: { info: '...', warning: '...', error: '...' },
    dismissible: { true: '...', false: '...' },
  },
});

// Create component props type
interface AlertProps extends InferVariantProps<typeof alert> {
  title: string;
  message: string;
  onDismiss?: () => void;
}

function Alert({ variant, dismissible, title, message, onDismiss }: AlertProps) {
  return (
    <div className={alert({ variant, dismissible })}>
      <h3>{title}</h3>
      <p>{message}</p>
      {dismissible && <button onClick={onDismiss}>×</button>}
    </div>
  );
}

// ✅ Full type safety
<Alert variant="error" dismissible={true} title="Error" message="Something went wrong" />
```

## SSR with TypeScript

```typescript
import { createSSRCollector } from 'tailwind-to-style';
import { renderToString } from 'react-dom/server';

interface SSROptions {
  dedupe?: boolean;
  minify?: boolean;
}

function renderApp(options: SSROptions = {}) {
  const collector = createSSRCollector(options);
  
  // Run app rendering within collector context
  const html: string = collector.run(() => {
    return renderToString(<App />);
  });
  
  // Extract CSS
  const css: string = collector.extract({ minify: true });
  
  // Extract critical CSS for specific selectors
  const { critical, rest } = collector.extractCritical([
    '.btn',
    '.card',
    '.nav',
  ]);
  
  return { html, css, critical, rest };
}
```

## Animation Types

```typescript
import { animate, defineAnimation } from 'tailwind-to-style/animations';

// Preset animations are typed
const fadeIn: string = animate('fadeIn');
const slideUp: string = animate('slideInUp', {
  duration: '500ms',
  delay: '100ms',
});

// Define custom animations with proper typing
interface AnimationConfig {
  keyframes: Array<Record<string, string>>;
  duration?: string;
  easing?: string;
  delay?: string;
  iteration?: string | number;
}

const customConfig: AnimationConfig = {
  keyframes: [
    { transform: 'scale(1)' },
    { transform: 'scale(1.1)' },
    { transform: 'scale(1)' },
  ],
  duration: '300ms',
  easing: 'ease-in-out',
};

defineAnimation('pulse', customConfig);
```

## Testing Types

We provide a comprehensive TypeScript test suite to verify all types work correctly:

```bash
# Run type checking tests
cd examples/typescript-test
npm install
npm run typecheck
```

This ensures:
- ✅ Type inference works correctly
- ✅ Autocomplete functions as expected
- ✅ Invalid usage is caught by TypeScript
- ✅ No regressions in type definitions

## IDE Support

### VS Code

Autocomplete and IntelliSense work out of the box:

1. Hover over any function to see JSDoc documentation
2. Autocomplete for variant options
3. Type errors highlighted inline
4. Go-to-definition for type imports

### WebStorm / IntelliJ

Full TypeScript support with:
- Parameter hints
- Type inference
- Refactoring support
- Import auto-completion

## Common Patterns

### Reusable Component Library

```typescript
// components/Button.tsx
import { tw, type InferVariantProps } from 'tailwind-to-style';

export const buttonVariants = tw({
  base: 'px-4 py-2 rounded font-medium transition-all',
  variants: {
    variant: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonVariantProps = InferVariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  isLoading?: boolean;
}

export function Button({
  variant,
  size,
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size })}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
```

### Form Components with Validation States

```typescript
const input = tw({
  name: 'input',
  base: 'w-full px-3 py-2 border rounded',
  variants: {
    state: {
      default: 'border-gray-300 focus:border-blue-500',
      error: 'border-red-500 focus:border-red-600',
      success: 'border-green-500 focus:border-green-600',
    },
    size: {
      sm: 'text-sm py-1',
      md: 'text-base py-2',
      lg: 'text-lg py-3',
    },
  },
  defaultVariants: {
    state: 'default',
    size: 'md',
  },
});

type InputVariants = InferVariantProps<typeof input>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, InputVariants {
  error?: string;
}

function Input({ state, size, error, ...props }: InputProps) {
  return (
    <div>
      <input
        className={input({ state: error ? 'error' : state, size })}
        {...props}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
```

## Troubleshooting

### Types not working

1. **Check TypeScript version**: Requires TypeScript 4.5+
2. **Rebuild project**: Run `npm run build` to regenerate dist files
3. **Restart IDE**: Reload VS Code or WebStorm
4. **Check node_modules**: Ensure `tailwind-to-style` is properly installed

### Autocomplete not showing variant options

1. **Verify type definitions**: Check `node_modules/tailwind-to-style/dist/index.d.ts` exists
2. **Check imports**: Use named imports, not default
3. **Update IDE**: Make sure you're using latest VS Code/WebStorm

### Type errors in valid code

1. **Check package version**: Ensure you're using latest version
2. **Verify tsconfig**: `strict` mode may require additional type annotations
3. **Report issue**: Open GitHub issue with minimal reproduction

## Migration from JavaScript

Converting existing JavaScript code to TypeScript:

```typescript
// Before (JavaScript)
const button = tw({
  variants: {
    size: { sm: '...', lg: '...' }
  }
});

button({ size: 'sm' });

// After (TypeScript) - same code, but with type safety!
const button = tw({
  variants: {
    size: { sm: '...', lg: '...' }
  }
});

button({ size: 'sm' }); // ✅ Typed
button({ size: 'invalid' }); // ❌ Type error!
```

No code changes needed — just add type annotations where beneficial!

## Resources

- [Type Definitions Source](./types/)
- [TypeScript Test Suite](./examples/typescript-test/)
- [API Reference](./README.md#api-reference)
- [React TypeScript Examples](./examples/react-demo/)

## Contributing

Help improve our types:

1. Add tests to `examples/typescript-test/test-types.ts`
2. Run `npm run validate:types` to check consistency
3. Submit PR with type improvements
4. Include JSDoc examples for new exports

Type definitions are manually maintained in `types/` directory.
