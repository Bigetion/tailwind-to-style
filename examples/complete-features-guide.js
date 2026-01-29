/**
 * Complete Feature Examples - v3.2
 * Shows how to use all new and enhanced features
 */

import { tws, twsx, twsxVariants, configure } from '../src/index.js';
import {
  autoPrefixStyles,
  smartMerge,
  classVariants,
  responsive,
  stateVariants,
  conditionalClasses,
  themeClasses,
} from '../src/core/enhanced-features.js';
import { cacheManager } from '../src/core/cache-manager.js';

console.log('🎨 tailwind-to-style v3.2 - Complete Feature Guide\n');
console.log('='.repeat(70));

// ============================================================================
// 1. BASIC TWS USAGE (Unchanged - Works as before)
// ============================================================================
console.log('\n📘 1. Basic tws() Usage\n');

const basicStyles = tws('bg-blue-500 text-white p-4 rounded-lg');
console.log('Basic:', basicStyles);
// → { backgroundColor: '#3b82f6', color: '#fff', padding: '1rem', borderRadius: '0.5rem' }

const jsonFormat = tws('p-4 m-2', { format: 'json' });
console.log('JSON format:', jsonFormat);
// → '{"padding":"1rem","margin":"0.5rem"}'

// ============================================================================
// 2. NEW: AUTO-PREFIXER
// ============================================================================
console.log('\n🔧 2. NEW: Auto-Prefixer\n');

const styles = tws('flex items-center');
const prefixed = autoPrefixStyles(styles);
console.log('Without prefix:', styles);
console.log('With prefix:', prefixed);
// Adds: -webkit-box, -ms-flexbox, -webkit-flex, flex

// ============================================================================
// 3. NEW: SMART MERGE (Conflict Resolution)
// ============================================================================
console.log('\n🔀 3. NEW: Smart Merge\n');

const merged = smartMerge(
  'bg-blue-500 text-white p-4',
  'bg-red-500 m-2',        // bg-red overrides bg-blue
  'p-8'                     // p-8 overrides p-4
);
console.log('Smart merge result:', merged);
// → 'bg-red-500 text-white p-8 m-2'

// ============================================================================
// 4. NEW: CLASS VARIANTS
// ============================================================================
console.log('\n🎭 4. NEW: Class Variants Generator\n');

const buttonVariants = classVariants('px-4 py-2 rounded font-medium', {
  color: {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
    danger: 'bg-red-500 text-white',
  },
  size: {
    sm: 'text-sm px-2 py-1',
    lg: 'text-lg px-6 py-3',
  }
});

console.log('Generated variants:', buttonVariants);
/*
{
  'primary-sm': 'px-2 py-1 rounded font-medium bg-blue-500 text-white text-sm',
  'primary-lg': 'px-6 py-3 rounded font-medium bg-blue-500 text-white text-lg',
  'secondary-sm': '...',
  'danger-lg': '...',
  ...
}
*/

// ============================================================================
// 5. NEW: RESPONSIVE HELPER
// ============================================================================
console.log('\n📱 5. NEW: Responsive Helper\n');

const responsiveClasses = responsive({
  default: 'text-sm p-2',
  md: 'text-base p-4',
  lg: 'text-lg p-6',
  xl: 'text-xl p-8'
});

console.log('Responsive classes:', responsiveClasses);
// → 'text-sm p-2 md:text-base md:p-4 lg:text-lg lg:p-6 xl:text-xl xl:p-8'

const responsiveStyles = tws(responsiveClasses);
console.log('Applied:', responsiveStyles);

// ============================================================================
// 6. NEW: STATE VARIANTS
// ============================================================================
console.log('\n✨ 6. NEW: State Variants Helper\n');

const interactiveClasses = stateVariants('bg-blue-500 text-white px-4 py-2', {
  hover: 'bg-blue-600 shadow-md',
  focus: 'ring-2 ring-blue-300',
  active: 'bg-blue-700',
  disabled: 'opacity-50 cursor-not-allowed'
});

console.log('State variants:', interactiveClasses);
// → 'bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 hover:shadow-md focus:ring-2 focus:ring-blue-300...'

// ============================================================================
// 7. NEW: CONDITIONAL CLASSES
// ============================================================================
console.log('\n🎯 7. NEW: Conditional Classes\n');

const isActive = true;
const isDisabled = false;
const hasError = true;

const conditionalResult = conditionalClasses({
  'bg-blue-500 text-white': isActive,
  'bg-gray-300 text-gray-600': !isActive,
  'p-4 rounded': true,
  'opacity-50 cursor-not-allowed': isDisabled,
  'border-2 border-red-500': hasError
});

console.log('Conditional result:', conditionalResult);
// → 'bg-blue-500 text-white p-4 rounded border-2 border-red-500'

// ============================================================================
// 8. NEW: THEME HELPER (Dark Mode)
// ============================================================================
console.log('\n🌓 8. NEW: Theme Helper\n');

const themedClasses = themeClasses(
  'bg-white text-gray-900 border-gray-200',
  'bg-gray-900 text-white border-gray-700'
);

console.log('Themed classes:', themedClasses);
// → 'bg-white text-gray-900 border-gray-200 dark:bg-gray-900 dark:text-white dark:border-gray-700'

// ============================================================================
// 9. ENHANCED TWSX (With New Features)
// ============================================================================
console.log('\n🎨 9. Enhanced twsx() Usage\n');

const css = twsx({
  // Regular nested styles
  '.button': [
    'px-4 py-2 rounded-lg font-medium transition-all',
    {
      '&:hover': 'transform scale-105',
      '&:active': 'scale-95',
      '&.primary': 'bg-blue-500 text-white',
      '&.secondary': 'bg-gray-200 text-gray-900'
    }
  ],
  
  // Responsive at root level
  '@media (max-width: 768px)': {
    '.button': 'px-2 py-1 text-sm'
  },
  
  // Dark mode support
  '.card': themeClasses('bg-white', 'bg-gray-800')
}, { inject: false });

console.log('Generated CSS length:', css.length, 'bytes');

// ============================================================================
// 10. ENHANCED TWSXVARIANTS
// ============================================================================
console.log('\n🎭 10. Enhanced twsxVariants() Usage\n');

const alert = twsxVariants('.alert', {
  base: 'p-4 rounded-lg border flex gap-3',
  variants: {
    status: {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800'
    },
    size: {
      sm: 'p-2 text-sm',
      md: 'p-4 text-base',
      lg: 'p-6 text-lg'
    }
  },
  compoundVariants: [
    {
      status: 'error',
      size: 'lg',
      class: 'font-bold shadow-lg'
    }
  ],
  defaultVariants: {
    status: 'info',
    size: 'md'
  },
  nested: {
    '.alert-icon': 'flex-shrink-0 mt-0.5',
    '.alert-content': 'flex-1',
    '.alert-title': 'font-semibold mb-1',
    '.alert-message': 'text-sm opacity-90'
  }
});

console.log('\nAlert variant examples:');
console.log('Default:', alert());
console.log('Error large:', alert({ status: 'error', size: 'lg' }));
console.log('Success small:', alert({ status: 'success', size: 'sm' }));

// ============================================================================
// 11. REAL-WORLD EXAMPLE: Button Component
// ============================================================================
console.log('\n💼 11. Real-World Example: Complete Button System\n');

// Create comprehensive button system
const button = twsxVariants('.btn', {
  base: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
  variants: {
    variant: {
      solid: 'border-transparent shadow-sm',
      outline: 'bg-transparent border-2',
      ghost: 'bg-transparent border-transparent',
      link: 'bg-transparent border-transparent underline-offset-4 hover:underline'
    },
    color: {
      primary: '',
      secondary: '',
      success: '',
      danger: '',
      warning: ''
    },
    size: {
      xs: 'text-xs px-2 py-1 gap-1',
      sm: 'text-sm px-3 py-1.5 gap-1.5',
      md: 'text-base px-4 py-2 gap-2',
      lg: 'text-lg px-6 py-3 gap-3',
      xl: 'text-xl px-8 py-4 gap-4'
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-auto'
    },
    loading: {
      true: 'cursor-wait opacity-70',
      false: ''
    }
  },
  compoundVariants: [
    // Solid variants
    { variant: 'solid', color: 'primary', class: 'bg-blue-600 text-white hover:bg-blue-700' },
    { variant: 'solid', color: 'success', class: 'bg-green-600 text-white hover:bg-green-700' },
    { variant: 'solid', color: 'danger', class: 'bg-red-600 text-white hover:bg-red-700' },
    
    // Outline variants
    { variant: 'outline', color: 'primary', class: 'border-blue-600 text-blue-600 hover:bg-blue-50' },
    { variant: 'outline', color: 'danger', class: 'border-red-600 text-red-600 hover:bg-red-50' },
    
    // Ghost variants
    { variant: 'ghost', color: 'primary', class: 'text-blue-600 hover:bg-blue-50' },
    { variant: 'ghost', color: 'danger', class: 'text-red-600 hover:bg-red-50' },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    fullWidth: false,
    loading: false
  }
});

// Usage examples
console.log('Examples:');
console.log('1. Primary button:', button());
console.log('2. Outline danger:', button({ variant: 'outline', color: 'danger' }));
console.log('3. Large ghost:', button({ variant: 'ghost', size: 'lg' }));
console.log('4. Full width loading:', button({ fullWidth: true, loading: true }));

// ============================================================================
// 12. PERFORMANCE MONITORING
// ============================================================================
console.log('\n⚡ 12. Performance Statistics\n');

console.log('Cache stats:', cacheManager.getStats());
console.log('Hit rate:', `${cacheManager.getHitRate().toFixed(2)}%`);

// ============================================================================
// 13. CONFIGURATION
// ============================================================================
console.log('\n⚙️  13. Custom Configuration\n');

configure({
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a'
        }
      },
      spacing: {
        '128': '32rem'
      }
    }
  }
});

const customStyles = tws('bg-brand-500 text-brand-50 p-128');
console.log('Custom theme styles:', customStyles);

console.log('\n✅ All features demonstrated!\n');
console.log('📚 Documentation:');
console.log('  - API Reference: docs/API.md');
console.log('  - Performance Guide: docs/PERFORMANCE.md');
console.log('  - Improvements: IMPROVEMENTS.md');
console.log('\n🏃 Run benchmarks: npm run bench:all');
