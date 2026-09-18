/**
 * TypeScript Type Checking Tests
 * 
 * This file verifies that all type definitions work correctly
 * and provide proper autocomplete/inference.
 * 
 * Run: npm run typecheck (from this directory)
 */

// ============================================================================
// Core API Tests
// ============================================================================

import { tw, tws, cx } from 'tailwind-to-style';

// tw() - Should return string
const atomicClasses: string = tw('flex gap-4 hover:bg-blue-500');
const responsiveClasses: string = tw('md:flex-row lg:gap-8');

// tws() - Inline styles
const cssString: string = tws('bg-blue-500 p-4 rounded');
const cssObject: Record<string, string> = tws('flex items-center', true);

// cx() - Conditional classes
const mergedClasses: string = cx('base', true && 'active', { disabled: false });
const withArray: string = cx(['p-4', 'bg-white'], ['ring-2']);

// ============================================================================
// Variant System Tests
// ============================================================================

import type { InferVariantProps } from 'tailwind-to-style';

// Named class variant
const buttonVariant = tw('button', 'px-4 py-2 rounded font-medium hover:opacity-90');
const buttonClass: string = buttonVariant;

// Full variant config
const button = tw({
  name: 'btn',
  base: 'px-4 py-2 rounded font-medium transition-all',
  variants: {
    color: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: '',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});

// Type inference should work
type ButtonProps = InferVariantProps<typeof button>;

// These should have proper autocomplete
const btn1: string = button({ color: 'primary', size: 'lg' });
const btn2: string = button({ color: 'danger' });
const btn3: string = button(); // Uses defaults

// @ts-expect-error - Invalid variant value
const btnError = button({ color: 'invalid' });

// ============================================================================
// Slots Tests
// ============================================================================

import type { InferSlotNames } from 'tailwind-to-style';

const card = tw({
  name: 'card',
  slots: {
    root: 'bg-white rounded-xl shadow-lg overflow-hidden',
    header: 'px-6 py-4 border-b border-gray-100',
    body: 'px-6 py-4',
    footer: 'px-6 py-4 bg-gray-50',
  },
  variants: {
    elevated: {
      true: {
        root: 'shadow-2xl',
        header: 'bg-gray-50',
      },
      false: '',
    },
  },
});

const cardClasses = card({ elevated: true });

// Should have all slot properties
const rootClass: string = cardClasses.root;
const headerClass: string = cardClasses.header;
const bodyClass: string = cardClasses.body;
const footerClass: string = cardClasses.footer;

type CardSlots = InferSlotNames<typeof card>;

// ============================================================================
// React Bindings Tests
// ============================================================================

import React from 'react';
import { styled, ThemeProvider, useTheme, useTws } from 'tailwind-to-style/react';

// styled() component
const StyledButton = styled('button', {
  name: 'styled-btn',
  base: 'px-4 py-2 rounded',
  variants: {
    variant: {
      solid: 'bg-blue-500 text-white',
      outline: 'border-2 border-blue-500 text-blue-500',
    },
    size: {
      sm: 'text-sm',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'sm',
  },
});

// Component usage - variant props should be typed
const buttonComponent = (
  <StyledButton variant="solid" size="lg" onClick={() => {}}>
    Click me
  </StyledButton>
);

// @ts-expect-error - Invalid variant
const invalidButton = <StyledButton variant="invalid" />;

// ThemeProvider
const theme = {
  colors: { primary: '#3b82f6', secondary: '#8b5cf6' },
  spacing: { sm: '0.5rem', md: '1rem' },
};

const App = () => (
  <ThemeProvider theme={theme}>
    <div>Content</div>
  </ThemeProvider>
);

// useTheme hook
function ThemedComponent() {
  const { theme, setTheme, tokens } = useTheme();
  
  const primaryColor: any = theme.colors?.primary;
  
  return <div>Themed</div>;
}

// useTws hook
function StyledDiv() {
  const style = useTws('bg-blue-500 p-4 rounded');
  
  const styles: Record<string, string> = style;
  
  return <div style={style}>Styled</div>;
}

// ============================================================================
// Design Tokens Tests
// ============================================================================

import { createTheme, tokenRegistry, token } from 'tailwind-to-style/tokens';

// Create theme
const myTheme = createTheme({
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
});

// Token registry
const primaryColor: string | undefined = tokenRegistry.get('colors.brand.primary');
tokenRegistry.set('colors.brand.primary', '#2563eb');

const allTokens = tokenRegistry.toCSS();

// Token function
const cssVar: string = token('colors.brand.primary');
const cssVarWithFallback: string = token('colors.brand.primary', '#000');

// ============================================================================
// Animations Tests
// ============================================================================

import { animate, defineAnimation, getAnimationNames } from 'tailwind-to-style/animations';

// Preset animations
const fadeInClass: string = animate('fadeIn');
const customDurationClass: string = animate('slideInUp', {
  duration: '500ms',
  delay: '100ms',
});

// Define custom animation
defineAnimation('wiggle', {
  keyframes: [
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(-3deg)' },
    { transform: 'rotate(3deg)' },
    { transform: 'rotate(0deg)' },
  ],
  duration: '300ms',
  easing: 'ease-in-out',
});

const wiggleClass: string = animate('wiggle');

// Get all animation names
const animationNames: string[] = getAnimationNames();

// ============================================================================
// SSR Tests
// ============================================================================

import { createSSRCollector } from 'tailwind-to-style';

// Create collector
const collector = createSSRCollector({ dedupe: true, minify: false });

// Run in SSR context
const ssrResult = collector.run(() => {
  const classes = tw('flex gap-4');
  return `<div class="${classes}">Content</div>`;
});

// Extract CSS
const css: string = collector.extract();
const criticalCSS = collector.extractCritical(['.btn', '.card']);

// ============================================================================
// cx Utility Tests
// ============================================================================

import { cx as cxUtil } from 'tailwind-to-style/cx';

const classes1: string = cxUtil('base', true && 'active');
const classes2: string = cxUtil(['p-4'], { disabled: false });

// cx.with()
const btnCx = cxUtil.with('px-4 py-2 rounded');
const extendedClasses: string = btnCx('bg-blue-500');

// ============================================================================
// Type Utilities Tests
// ============================================================================

import type {
  ExtractVariantNames,
  ExtractVariantOptions,
  RequiredVariantProps,
  PickVariantProps,
  OmitVariantProps,
} from 'tailwind-to-style';

const testVariants = {
  variants: {
    size: { sm: '...', md: '...', lg: '...' },
    variant: { solid: '...', outline: '...' },
    disabled: { true: '...', false: '...' },
  },
};

// Extract variant names
type VariantNames = ExtractVariantNames<typeof testVariants>;
// Should be: 'size' | 'variant' | 'disabled'

// Extract variant options
type SizeOptions = ExtractVariantOptions<typeof testVariants, 'size'>;
// Should be: 'sm' | 'md' | 'lg'

// Required variant props
type RequiredProps = RequiredVariantProps<typeof testVariants['variants']>;

// Pick specific variants
type SizeAndVariant = PickVariantProps<typeof testVariants['variants'], 'size' | 'variant'>;

// Omit specific variants
type WithoutDisabled = OmitVariantProps<typeof testVariants['variants'], 'disabled'>;

// ============================================================================
// Success Message
// ============================================================================

console.log('✓ All type definitions are valid and provide proper inference!');

export {};
