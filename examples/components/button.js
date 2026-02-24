/**
 * Component Variants Example - Button Component
 * 
 * Demonstrates twsxVariants() for creating flexible component variants
 */

import { twsxVariants } from 'tailwind-to-style';

console.log('='.repeat(60));
console.log('🎨 TWSXVARIANTS - BUTTON COMPONENT');
console.log('='.repeat(60));

// Define button variants
const button = twsxVariants('.btn', {
  base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  
  variants: {
    // Visual variant (solid, outline, ghost)
    variant: {
      solid: 'border-transparent shadow-sm',
      outline: 'bg-transparent border-2',
      ghost: 'bg-transparent border-transparent',
    },
    
    // Color theme
    color: {
      primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
      success: 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500',
      danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
      warning: 'text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
    },
    
    // Size variations
    size: {
      xs: 'px-2.5 py-1.5 text-xs rounded',
      sm: 'px-3 py-2 text-sm rounded-md',
      md: 'px-4 py-2.5 text-base rounded-md',
      lg: 'px-6 py-3 text-lg rounded-lg',
      xl: 'px-8 py-4 text-xl rounded-lg',
    },
    
    // Full width option
    fullWidth: {
      true: 'w-full',
      false: 'w-auto',
    },
    
    // Loading state
    loading: {
      true: 'opacity-75 cursor-wait',
      false: '',
    },
    
    // Disabled state
    disabled: {
      true: 'opacity-50 cursor-not-allowed pointer-events-none',
      false: 'cursor-pointer',
    },
  },
  
  // Compound variants for specific combinations
  compoundVariants: [
    // Outline + Primary
    {
      variant: 'outline',
      color: 'primary',
      class: 'text-blue-600 border-blue-600 hover:bg-blue-50',
    },
    // Outline + Secondary
    {
      variant: 'outline',
      color: 'secondary',
      class: 'text-gray-600 border-gray-600 hover:bg-gray-50',
    },
    // Outline + Success
    {
      variant: 'outline',
      color: 'success',
      class: 'text-green-600 border-green-600 hover:bg-green-50',
    },
    // Outline + Danger
    {
      variant: 'outline',
      color: 'danger',
      class: 'text-red-600 border-red-600 hover:bg-red-50',
    },
    // Outline + Warning
    {
      variant: 'outline',
      color: 'warning',
      class: 'text-yellow-600 border-yellow-600 hover:bg-yellow-50',
    },
    
    // Ghost + Primary
    {
      variant: 'ghost',
      color: 'primary',
      class: 'text-blue-600 hover:bg-blue-100',
    },
    // Ghost + Danger
    {
      variant: 'ghost',
      color: 'danger',
      class: 'text-red-600 hover:bg-red-100',
    },
    
    // Large + Full Width = Extra padding
    {
      size: 'lg',
      fullWidth: true,
      class: 'py-4',
    },
  ],
  
  // Default values
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    fullWidth: false,
    loading: false,
    disabled: false,
  },
});

// Example usage
console.log('\n📝 Usage Examples:\n');

console.log('1. Default button:');
console.log(button());
console.log('   → Uses all default variants\n');

console.log('2. Primary solid button (medium):');
console.log(button({ color: 'primary', size: 'md' }));
console.log('   → Explicit variants (same as default)\n');

console.log('3. Danger outline button (large):');
console.log(button({ variant: 'outline', color: 'danger', size: 'lg' }));
console.log('   → Triggers compound variant for outline + danger\n');

console.log('4. Success ghost button (small):');
console.log(button({ variant: 'ghost', color: 'success', size: 'sm' }));
console.log('   → Ghost variant with success color\n');

console.log('5. Full-width primary button:');
console.log(button({ fullWidth: true }));
console.log('   → Stretches to full width\n');

console.log('6. Loading state:');
console.log(button({ loading: true }));
console.log('   → Shows loading cursor and reduced opacity\n');

console.log('7. Disabled button:');
console.log(button({ disabled: true }));
console.log('   → Disabled appearance and pointer events\n');

console.log('8. Large danger button (full width):');
console.log(button({ 
  variant: 'solid',
  color: 'danger', 
  size: 'lg', 
  fullWidth: true 
}));
console.log('   → Triggers compound variant for lg + fullWidth\n');

// React component example
console.log('='.repeat(60));
console.log('⚛️  REACT COMPONENT EXAMPLE');
console.log('='.repeat(60));
console.log(`
import { twsxVariants } from 'tailwind-to-style';

// Define button variants (same as above)
const button = twsxVariants('.btn', { ... });

// React component
function Button({ 
  variant, 
  color, 
  size, 
  fullWidth, 
  loading, 
  disabled, 
  children,
  ...props 
}) {
  return (
    <button
      className={button({ variant, color, size, fullWidth, loading, disabled })}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner className="mr-2" />}
      {children}
    </button>
  );
}

// Usage
<Button color="primary" size="lg">
  Click Me
</Button>

<Button variant="outline" color="danger">
  Delete
</Button>

<Button variant="ghost" color="secondary" fullWidth>
  Cancel
</Button>

<Button loading={isLoading}>
  Submit Form
</Button>
`);

console.log('='.repeat(60));
console.log('✅ Component variants example completed!');
console.log('='.repeat(60) + '\n');

// Export for testing
export { button };
