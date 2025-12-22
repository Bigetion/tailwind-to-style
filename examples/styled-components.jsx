/**
 * Example: styled() + tv() + nested usage
 * Demonstrates the power of combining all three approaches
 */

import React, { useState } from 'react';
import { styled, tv, TwsxProvider } from 'tailwind-to-style';

// ============================================
// 1. DESIGN SYSTEM: Shared Variants with tv()
// ============================================

// Button variants - reusable across the app
export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center font-medium transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    variant: {
      solid: 'border-transparent',
      outline: 'border-2 bg-transparent',
      ghost: 'border-transparent bg-transparent hover:bg-opacity-10',
      link: 'underline-offset-4 hover:underline bg-transparent',
    },
    color: {
      primary: '',
      secondary: '',
      success: '',
      danger: '',
      warning: '',
    },
    size: {
      xs: 'text-xs px-2.5 py-1.5',
      sm: 'text-sm px-3 py-2',
      md: 'text-base px-4 py-2.5',
      lg: 'text-lg px-5 py-3',
      xl: 'text-xl px-6 py-3.5',
    },
  },
  compoundVariants: [
    // Solid variants
    {
      variant: 'solid',
      color: 'primary',
      class: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    },
    {
      variant: 'solid',
      color: 'success',
      class: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    },
    {
      variant: 'solid',
      color: 'danger',
      class: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    },
    // Outline variants
    {
      variant: 'outline',
      color: 'primary',
      class: 'border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    },
    {
      variant: 'outline',
      color: 'danger',
      class: 'border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
    },
    // Ghost variants
    {
      variant: 'ghost',
      color: 'primary',
      class: 'text-blue-600 hover:bg-blue-500 focus:ring-blue-500',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
});

// ============================================
// 2. STYLED COMPONENTS: Build with styled()
// ============================================

// Simple Button using variants
export const Button = styled('button', {
  ...buttonVariants,
});

// Advanced Card with nested styles
export const Card = styled('div', {
  base: 'bg-white rounded-lg shadow-md overflow-hidden transition-shadow',
  hover: 'shadow-xl',
  
  // Complex nested styling
  nested: {
    '.card-header': {
      'padding': '1.5rem',
      'border-bottom': '1px solid #e5e7eb',
      'background': 'linear-gradient(to bottom, #ffffff, #f9fafb)',
      
      'h3': 'text-xl font-semibold text-gray-900',
      'p': 'text-sm text-gray-500 mt-1',
      
      '.badge': {
        'display': 'inline-block',
        'padding': '0.25rem 0.75rem',
        'border-radius': '9999px',
        'font-size': '0.75rem',
        'font-weight': '600',
        'background': '#3b82f6',
        'color': '#ffffff',
      },
    },
    
    '.card-body': {
      'padding': '1.5rem',
      
      'p': 'text-gray-600 leading-relaxed',
      'p + p': 'mt-4',
      
      'ul': {
        'li': 'mb-2',
        'li::before': {
          '@css': {
            content: '"→"',
            marginRight: '0.5rem',
            color: '#3b82f6',
            fontWeight: 'bold',
          },
        },
      },
      
      '@media (min-width: 768px)': {
        'padding': '2rem',
      },
    },
    
    '.card-footer': {
      'padding': '1rem 1.5rem',
      'background': '#f9fafb',
      'border-top': '1px solid #e5e7eb',
      'display': 'flex',
      'justify-content': 'space-between',
      'align-items': 'center',
    },
  },
  
  variants: {
    elevation: {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
  },
});

// Input with complex states
export const Input = styled('input', {
  base: 'w-full px-3 py-2 border rounded-lg transition-all focus:outline-none',
  focus: 'ring-2 ring-blue-200',
  disabled: 'bg-gray-100 cursor-not-allowed',
  
  nested: {
    '&::placeholder': {
      '@css': {
        color: '#9ca3af',
      },
    },
  },
  
  variants: {
    variant: {
      outline: 'border-gray-300 focus:border-blue-500',
      filled: 'bg-gray-100 border-transparent focus:bg-white focus:border-blue-500',
      flushed: 'border-0 border-b-2 rounded-none focus:border-blue-500 px-0',
    },
    size: {
      sm: 'text-sm px-2 py-1.5',
      md: 'text-base px-3 py-2',
      lg: 'text-lg px-4 py-3',
    },
    state: {
      error: 'border-red-500 focus:border-red-500 focus:ring-red-200',
      success: 'border-green-500 focus:border-green-500 focus:ring-green-200',
    },
  },
  
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
});

// Stack layout component
export const Stack = styled('div', {
  base: 'flex',
  
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
    },
    spacing: {
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      6: 'gap-6',
      8: 'gap-8',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
  
  defaultVariants: {
    direction: 'column',
    spacing: 4,
  },
});

// ============================================
// 3. USAGE EXAMPLE
// ============================================

export function StyledComponentsExample() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('normal');

  return (
    <TwsxProvider>
      <div className="p-8 bg-gray-50 min-h-screen">
        <Stack spacing={8} align="center">
          
          {/* Card Example */}
          <Card elevation="lg" style={{ maxWidth: '600px', width: '100%' }}>
            <div className="card-header">
              <h3>Styled Components Demo</h3>
              <p>Powered by styled() + tv() + nested</p>
              <span className="badge">New</span>
            </div>
            
            <div className="card-body">
              <p>
                This card demonstrates the power of combining:
              </p>
              <ul>
                <li>styled() for component creation</li>
                <li>tv() for type-safe variants</li>
                <li>nested styles for complex selectors</li>
              </ul>
              
              <p>
                All with zero build step and full TypeScript support!
              </p>
            </div>
            
            <div className="card-footer">
              <span className="text-sm text-gray-500">v2.10.4</span>
              <Button size="sm" variant="ghost" color="primary">
                Learn More
              </Button>
            </div>
          </Card>

          {/* Button Variants Example */}
          <Card style={{ maxWidth: '600px', width: '100%' }}>
            <div className="card-header">
              <h3>Button Variants</h3>
            </div>
            
            <div className="card-body">
              <Stack spacing={3}>
                <Stack direction="row" spacing={2} justify="center">
                  <Button color="primary" size="sm">Primary</Button>
                  <Button color="secondary" size="sm">Secondary</Button>
                  <Button color="success" size="sm">Success</Button>
                  <Button color="danger" size="sm">Danger</Button>
                </Stack>
                
                <Stack direction="row" spacing={2} justify="center">
                  <Button variant="outline" color="primary" size="md">Outline</Button>
                  <Button variant="ghost" color="primary" size="md">Ghost</Button>
                  <Button variant="link" color="primary" size="md">Link</Button>
                </Stack>
                
                <Stack direction="row" spacing={2} justify="center">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </Stack>
              </Stack>
            </div>
          </Card>

          {/* Form Example */}
          <Card style={{ maxWidth: '600px', width: '100%' }}>
            <div className="card-header">
              <h3>Form Components</h3>
            </div>
            
            <div className="card-body">
              <Stack spacing={4}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    state={status === 'error' ? 'error' : status === 'success' ? 'success' : undefined}
                  />
                </div>
                
                <Stack direction="row" spacing={2}>
                  <Input variant="filled" placeholder="Filled variant" />
                  <Input variant="flushed" placeholder="Flushed variant" />
                </Stack>
                
                <Stack direction="row" spacing={2} justify="end">
                  <Button variant="outline" color="secondary">
                    Cancel
                  </Button>
                  <Button color="primary">
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </div>
          </Card>

        </Stack>
      </div>
    </TwsxProvider>
  );
}

export default StyledComponentsExample;
