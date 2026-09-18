# TypeScript Type Checking Tests

This directory contains TypeScript integration tests to verify that all type definitions work correctly.

## Purpose

- Verify type definitions are accurate
- Test type inference for variants and slots
- Ensure autocomplete works properly
- Catch type regressions before publishing

## Usage

```bash
# Install dependencies (from this directory)
npm install

# Run type checking
npm run typecheck
```

## What's Tested

### Core API
- `tw()` - Atomic CSS class generator
- `tws()` - Inline style converter
- `cx()` - Conditional class names

### Variant System
- Basic variants with type inference
- Slot-based multi-part components
- Default variants
- Compound variants

### React Bindings
- `styled()` component with variant props
- `ThemeProvider` and `useTheme` hook
- `useTws()` hook

### Design Tokens
- `createTheme()` with nested tokens
- `tokenRegistry` get/set operations
- `token()` CSS variable reference

### Animations
- Preset animations
- Custom animation definitions
- Animation name exports

### SSR
- `createSSRCollector()` API
- CSS extraction
- Critical CSS extraction

### Type Utilities
- `InferVariantProps` - Extract variant props type
- `InferSlotNames` - Extract slot names
- `ExtractVariantNames` - Extract variant keys
- `ExtractVariantOptions` - Extract variant values
- `RequiredVariantProps` - Make all variants required
- `PickVariantProps` - Pick specific variants
- `OmitVariantProps` - Omit specific variants

## Expected Behavior

If all types are correct, `npm run typecheck` should:
- ✅ Pass with no errors
- ✅ Show proper autocomplete in VS Code
- ✅ Catch intentional type errors (marked with `@ts-expect-error`)

## Adding New Tests

When adding new features:

1. Add corresponding test to `test-types.ts`
2. Include positive and negative test cases
3. Test type inference works
4. Verify autocomplete in IDE
5. Run `npm run typecheck` to verify

## CI Integration

This test runs automatically in CI to prevent type regressions:

```yaml
# .github/workflows/ci.yml
- name: Type Check
  run: |
    cd examples/typescript-test
    npm install
    npm run typecheck
```

## Troubleshooting

### Error: Cannot find module 'tailwind-to-style'

Make sure you've built the project first:

```bash
# From project root
npm run build
```

### Type errors in test file

This is expected! The test file intentionally includes some `@ts-expect-error` comments to verify that invalid usage is caught.

### Autocomplete not working in VS Code

1. Reload VS Code window: `Cmd+Shift+P` → "Reload Window"
2. Check `tsconfig.json` paths are correct
3. Verify `dist/` directory exists with `.d.ts` files
