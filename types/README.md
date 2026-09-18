# TypeScript Type Definitions

This directory contains manually maintained TypeScript type definitions for `tailwind-to-style`.

## Structure

```
types/
├── index.d.ts           # Main entry point (re-exports from v4.d.ts)
├── v4.d.ts              # v4 unified API types (tw, tws, cx, SSR)
├── cx.d.ts              # Conditional class name builder
├── react/
│   └── index.d.ts       # React bindings (styled, ThemeProvider, hooks)
├── tokens/
│   └── index.d.ts       # Design token system
├── animations/
│   └── index.d.ts       # Animation presets and utilities
├── core/
│   ├── tws.d.ts         # Inline style converter
│   ├── twsx.d.ts        # SCSS-like CSS-in-JS
│   └── twsxVariants.d.ts # Variant system
└── utils/
    └── index.d.ts       # Utility types and helpers
```

## Maintenance Guidelines

### 1. Keep Types in Sync with Implementation

When adding new features to the JavaScript source:

1. **Add corresponding types** in the appropriate `.d.ts` file
2. **Export from main** `index.d.ts` if it's a public API
3. **Run validation** with `npm run validate:types`
4. **Test with TypeScript** projects to ensure autocomplete works

### 2. Type Safety Best Practices

- Use **generics** for type-safe variants and slots
- Provide **JSDoc comments** with examples for better IDE experience
- Use **union types** for string literals (e.g., `'sm' | 'md' | 'lg'`)
- Mark optional parameters with `?`
- Provide **function overloads** for different usage patterns

### 3. Examples in JSDoc

Every exported function/type should have at least one `@example`:

```typescript
/**
 * Conditional class name builder
 * 
 * @example
 * cx('bg-blue-500', isActive && 'ring-2')
 * // → 'bg-blue-500 ring-2'
 */
export function cx(...args: ClassValue[]): string;
```

### 4. Test Type Inference

Create test files to verify type inference works:

```typescript
// types/__tests__/variants.test-d.ts
import { tw } from 'tailwind-to-style';

const button = tw({
  name: 'btn',
  variants: {
    color: { primary: '...', secondary: '...' }
  }
});

// This should autocomplete 'primary' | 'secondary'
button({ color: 'primary' });

// This should error
button({ color: 'invalid' }); // ❌
```

## Type Coverage

- **Core API**: tw, tws, cx ✅
- **Variants System**: twsxVariants, twsxClassName ✅
- **React Bindings**: styled, ThemeProvider, hooks ✅
- **Design Tokens**: createTheme, tokenRegistry ✅
- **Animations**: animate, defineAnimation ✅
- **SSR Support**: createSSRCollector ✅

## Common Patterns

### 1. Variant Props Type Inference

```typescript
import { InferVariantProps } from 'tailwind-to-style';

const button = tw({
  variants: {
    size: { sm: '...', lg: '...' },
    variant: { solid: '...', outline: '...' }
  }
});

// Infer props type
type ButtonProps = InferVariantProps<typeof button>;
// Result: { size?: 'sm' | 'lg'; variant?: 'solid' | 'outline' }
```

### 2. Slot Names Type Inference

```typescript
import { InferSlotNames } from 'tailwind-to-style';

const card = tw({
  slots: {
    root: '...',
    header: '...',
    body: '...'
  }
});

type CardSlots = InferSlotNames<typeof card>;
// Result: 'root' | 'header' | 'body'
```

### 3. React Component with Variants

```typescript
import { styled, InferVariantProps } from 'tailwind-to-style/react';

const Button = styled('button', {
  variants: {
    size: { sm: '...', lg: '...' }
  }
});

// Props are automatically typed:
// size?: 'sm' | 'lg'
<Button size="sm">Click me</Button>
```

## Validation

Run type validation to check for:
- Missing type definitions for exports
- Broken import references
- Inconsistent type signatures

```bash
npm run validate:types
```

## Build Process

Types are copied to `dist/` during build:

```bash
npm run build
```

This copies:
- `types/index.d.ts` → `dist/index.d.ts`
- `types/react/*` → `dist/react/*`
- `types/tokens/*` → `dist/tokens/*`
- etc.

Configured in `rollup.config.js`:

```js
plugins: [
  copy({
    targets: [
      { src: 'types/index.d.ts', dest: 'dist/' },
      { src: 'types/core', dest: 'dist/' },
      // ...
    ]
  })
]
```

## Publishing Checklist

Before publishing a new version:

- [ ] Update types for new features
- [ ] Run `npm run validate:types`
- [ ] Test types with example TypeScript project
- [ ] Verify autocomplete works in VS Code
- [ ] Check no breaking changes in type signatures
- [ ] Update version in type comments if needed

## Contributing

When contributing types:

1. Follow existing naming conventions
2. Add comprehensive JSDoc comments
3. Include usage examples
4. Test with real TypeScript code
5. Run validation before committing

## Resources

- [TypeScript Handbook - Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
- [Definitely Typed Best Practices](https://github.com/DefinitelyTyped/DefinitelyTyped#best-practices)
- [Type Utilities](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## Support

For type-related issues:
- Open an issue with `[types]` prefix
- Provide TypeScript version and error message
- Include minimal reproduction code
