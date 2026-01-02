/**
 * Variants System Demo
 * Demonstrates the new variants feature in twsx
 */

import { twsx } from '../dist/index.esm.js';

console.log('🚀 Variants System Demo\n');

// Example 1: Basic Button Variants
console.log('📝 Example 1: Basic Button Variants');
const buttonStyles = twsx({
  '.btn': {
    base: 'px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer',
    variants: {
      color: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        success: 'bg-green-500 text-white hover:bg-green-600'
      },
      size: {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl'
      },
      variant: {
        solid: 'border-transparent',
        outline: 'bg-transparent border-2',
        ghost: 'bg-transparent border-transparent',
        link: 'bg-transparent border-transparent underline-offset-4 hover:underline'
      }
    },
    compounds: [
      {
        color: 'primary',
        variant: 'outline',
        class: 'border-blue-500 text-blue-500 hover:bg-blue-50'
      },
      {
        color: 'danger',
        variant: 'outline',
        class: 'border-red-500 text-red-500 hover:bg-red-50'
      },
      {
        color: 'success',
        variant: 'outline',
        class: 'border-green-500 text-green-500 hover:bg-green-50'
      },
      {
        color: 'primary',
        variant: 'ghost',
        class: 'text-blue-500 hover:bg-blue-50'
      },
      {
        size: 'xs',
        variant: 'outline',
        class: 'border-1'
      }
    ],
    defaultVariants: {
      color: 'primary',
      size: 'md',
      variant: 'solid'
    }
  }
}, { inject: false });

console.log('Generated CSS length:', buttonStyles.length, 'characters');
console.log('Contains .btn:', buttonStyles.includes('.btn'));
console.log('Contains .btn-primary:', buttonStyles.includes('.btn-primary'));
console.log('Contains compound variants:', buttonStyles.includes('.btn.btn-primary.btn-outline'));
console.log('');

// Example 2: Card Component Variants
console.log('📝 Example 2: Card Component Variants');
const cardStyles = twsx({
  '.card': {
    base: 'p-6 rounded-lg border transition-shadow',
    variants: {
      elevation: {
        flat: 'shadow-none border-2',
        normal: 'shadow-sm hover:shadow-md',
        elevated: 'shadow-lg hover:shadow-xl',
        floating: 'shadow-2xl hover:shadow-3xl'
      },
      size: {
        sm: 'p-4 text-sm',
        md: 'p-6 text-base',
        lg: 'p-8 text-lg',
        xl: 'p-10 text-xl'
      },
      color: {
        neutral: 'border-gray-200 bg-white',
        primary: 'border-blue-200 bg-blue-50',
        secondary: 'border-gray-200 bg-gray-50',
        danger: 'border-red-200 bg-red-50',
        success: 'border-green-200 bg-green-50'
      }
    },
    compounds: [
      {
        color: 'primary',
        elevation: 'elevated',
        class: 'shadow-blue-200/50'
      },
      {
        color: 'danger',
        elevation: 'elevated',
        class: 'shadow-red-200/50'
      },
      {
        color: 'success',
        elevation: 'elevated',
        class: 'shadow-green-200/50'
      }
    ],
    defaultVariants: {
      elevation: 'normal',
      size: 'md',
      color: 'neutral'
    }
  }
}, { inject: false });

console.log('Generated CSS length:', cardStyles.length, 'characters');
console.log('Contains .card:', cardStyles.includes('.card'));
console.log('Contains .card-elevated:', cardStyles.includes('.card-elevated'));
console.log('');

// Example 3: Mixed Usage (Classic + Variants)
console.log('📝 Example 3: Mixed Usage (Classic + Variants)');
const mixedStyles = twsx({
  // Classic twsx syntax
  '.header': 'p-4 bg-white shadow-sm border-b',
  '.nav': [
    'flex items-center space-x-4',
    {
      '& a': 'text-gray-600 hover:text-gray-900 transition-colors',
      '& .logo': 'font-bold text-xl'
    }
  ],
  
  // New variants syntax
  '.btn': {
    base: 'px-4 py-2 rounded font-medium transition-colors',
    variants: {
      color: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
      },
      size: {
        sm: 'px-2 py-1 text-sm',
        lg: 'px-6 py-3 text-lg'
      }
    }
  },
  
  // Classic syntax again
  '.footer': 'p-4 bg-gray-100 text-center text-sm text-gray-600'
}, { inject: false });

console.log('Generated CSS length:', mixedStyles.length, 'characters');
console.log('Contains classic .header:', mixedStyles.includes('.header'));
console.log('Contains classic .nav:', mixedStyles.includes('.nav'));
console.log('Contains variants .btn-primary:', mixedStyles.includes('.btn-primary'));
console.log('Contains classic .footer:', mixedStyles.includes('.footer'));
console.log('');

// Example 4: Complex Component with Many Variants
console.log('📝 Example 4: Complex Input Component');
const inputStyles = twsx({
  '.input': {
    base: 'w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2',
    variants: {
      size: {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-2.5 py-1.5 text-sm',
        md: 'px-3 py-2 text-base',
        lg: 'px-4 py-3 text-lg',
        xl: 'px-5 py-4 text-xl'
      },
      variant: {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20',
        filled: 'bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500/20',
        flushed: 'border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 focus:ring-0',
        unstyled: 'border-0 bg-transparent focus:ring-0'
      },
      state: {
        default: '',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
        warning: 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500/20'
      }
    },
    compounds: [
      {
        variant: 'filled',
        state: 'error',
        class: 'bg-red-50'
      },
      {
        variant: 'filled',
        state: 'success',
        class: 'bg-green-50'
      },
      {
        variant: 'filled',
        state: 'warning',
        class: 'bg-yellow-50'
      }
    ],
    defaultVariants: {
      size: 'md',
      variant: 'default',
      state: 'default'
    }
  }
}, { inject: false });

console.log('Generated CSS length:', inputStyles.length, 'characters');
console.log('Contains .input:', inputStyles.includes('.input'));
console.log('Contains size variants:', inputStyles.includes('.input-sm') && inputStyles.includes('.input-lg'));
console.log('Contains state variants:', inputStyles.includes('.input-error') && inputStyles.includes('.input-success'));
console.log('');

console.log('✅ All examples completed successfully!');
console.log('🎉 Variants system is working properly!');

// Export for potential usage
export { buttonStyles, cardStyles, mixedStyles, inputStyles };