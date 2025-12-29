/**
 * Example: Custom Prefix Configuration for Styled Components
 * Shows how to customize classname generation in styled()
 */

import React from 'react';
import { styled, configure } from 'tailwind-to-style/react';

// ============================================
// 1. GLOBAL CONFIGURATION
// ============================================

// Set global prefix for all styled components
configure({
  styled: {
    prefix: 'myapp',           // Change from 'twsx' to 'myapp'
    separator: '_',            // Change from '-' to '_'
    hashLength: 4,             // Shorter hash (4 chars instead of 6)
    includeComponentName: true // Include component type in classname
  }
});

// ============================================
// 2. COMPONENTS WITH GLOBAL CONFIG
// ============================================

// This will generate: myapp_button_a3k9
const Button = styled('button', {
  base: 'px-4 py-2 rounded-lg font-medium',
  variants: {
    color: {
      // Generates: myapp_color_primary
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      // Generates: myapp_color_danger
      danger: 'bg-red-500 text-white hover:bg-red-600'
    }
  }
});

// This will generate: myapp_div_f8d2
const Card = styled('div', {
  base: 'bg-white rounded-xl shadow-lg p-6',
  variants: {
    size: {
      sm: 'p-4',
      lg: 'p-8'
    }
  }
});

// ============================================
// 3. PER-COMPONENT OVERRIDE
// ============================================

// Override global config for specific component
const CustomButton = styled('button', {
  base: 'px-4 py-2 rounded',
  variants: {
    variant: {
      solid: 'bg-blue-500',
      outline: 'border border-blue-500'
    }
  }
}, {
  // Component-specific naming (overrides global)
  prefix: 'btn',              // Custom prefix just for this component
  separator: '-',             // Use dash separator
  hashLength: 8,              // Longer hash
  includeComponentName: false // Don't include 'button' in classname
});
// Generates: btn-a3k9x2f1 (no component name)
// Variants: btn-variant-solid

// ============================================
// 4. MINIMAL CLASSNAMES (No component name)
// ============================================

configure({
  styled: {
    prefix: 'c',                 // Very short prefix
    separator: '',               // No separator
    hashLength: 4,               // Short hash
    includeComponentName: false  // Skip component type
  }
});

// Generates: c1a2b (super minimal!)
const MinimalButton = styled('button', {
  base: 'px-4 py-2 bg-blue-500'
});

// ============================================
// 5. SCOPED DESIGN SYSTEM
// ============================================

// Create design system with custom prefix
configure({
  styled: {
    prefix: 'ds',  // Design System prefix
    separator: '-'
  }
});

const DSButton = styled('button', {
  base: 'px-4 py-2 rounded-lg font-medium transition-all',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      success: 'bg-green-500 text-white hover:bg-green-600',
      danger: 'bg-red-500 text-white hover:bg-red-600'
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});
// Generates:
// Base: ds-button-a3k9x2
// Variants: ds-color-primary ds-size-md

const DSCard = styled('div', {
  base: 'bg-white rounded-xl shadow-sm',
  variants: {
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    },
    elevated: {
      true: 'shadow-xl'
    }
  }
});
// Generates:
// Base: ds-div-f8d2k1
// Variants: ds-padding-md ds-elevated-true

// ============================================
// 6. MULTIPLE APPS IN MONOREPO
// ============================================

// App 1 - Admin Dashboard
configure({
  styled: {
    prefix: 'admin',
    separator: '__'
  }
});

const AdminButton = styled('button', {
  base: 'px-4 py-2 bg-indigo-600 text-white'
});
// Generates: admin__button__a3k9x2

// App 2 - Customer Portal
configure({
  styled: {
    prefix: 'portal',
    separator: '__'
  }
});

const PortalButton = styled('button', {
  base: 'px-4 py-2 bg-blue-600 text-white'
});
// Generates: portal__button__f8d2k1

// ============================================
// 7. DEBUGGING-FRIENDLY NAMES
// ============================================

configure({
  styled: {
    prefix: 'debug',
    separator: '-',
    hashLength: 8,  // Longer hash for better uniqueness
    includeComponentName: true
  }
});

const DebugButton = styled('button', {
  base: 'px-4 py-2'
}, {
  displayName: 'PrimaryButton'  // Custom display name for React DevTools
});
// Generates: debug-button-a3k9x2f1
// React DevTools: Styled(PrimaryButton)

// ============================================
// 8. PRACTICAL EXAMPLE - E-COMMERCE
// ============================================

// Configure for e-commerce site
configure({
  styled: {
    prefix: 'shop',
    separator: '-',
    hashLength: 5,
    includeComponentName: true
  }
});

const ProductCard = styled('div', {
  base: 'bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow',
  variants: {
    featured: {
      true: 'ring-2 ring-yellow-400'
    },
    discount: {
      true: 'relative'
    }
  },
  nested: {
    '.product-image': 'w-full h-48 object-cover',
    '.product-title': 'text-lg font-semibold px-4 pt-4',
    '.product-price': 'text-2xl font-bold text-blue-600 px-4 pb-4'
  }
});
// Generates:
// Base: shop-div-a3k9x
// Variants: shop-featured-true shop-discount-true
// Nested: shop-div-a3k9x .product-image, etc.

const AddToCartButton = styled('button', {
  base: 'w-full px-6 py-3 font-semibold rounded-b-lg transition-colors',
  variants: {
    state: {
      available: 'bg-blue-600 text-white hover:bg-blue-700',
      soldout: 'bg-gray-300 text-gray-500 cursor-not-allowed',
      preorder: 'bg-yellow-500 text-white hover:bg-yellow-600'
    }
  },
  defaultVariants: {
    state: 'available'
  }
});
// Generates:
// Base: shop-button-f8d2k
// Variants: shop-state-available

// ============================================
// 9. USAGE EXAMPLES
// ============================================

export function ExampleApp() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Global Config Examples</h2>
        
        {/* Generated classnames: myapp_button_a3k9 myapp_color_primary */}
        <Button color="primary">Primary Button</Button>
        
        {/* Generated classnames: myapp_button_a3k9 myapp_color_danger */}
        <Button color="danger">Danger Button</Button>
        
        {/* Generated classnames: myapp_div_f8d2 myapp_size_lg */}
        <Card size="lg">
          <h3>Card Content</h3>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Per-Component Override</h2>
        
        {/* Generated classnames: btn-a3k9x2f1 btn-variant-solid */}
        <CustomButton variant="solid">Custom Solid</CustomButton>
        
        {/* Generated classnames: btn-a3k9x2f1 btn-variant-outline */}
        <CustomButton variant="outline">Custom Outline</CustomButton>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Design System</h2>
        
        {/* Generated classnames: ds-button-a3k9x2 ds-color-primary ds-size-md */}
        <DSButton>Default Button</DSButton>
        
        {/* Generated classnames: ds-button-a3k9x2 ds-color-success ds-size-lg */}
        <DSButton color="success" size="lg">Large Success</DSButton>
        
        {/* Generated classnames: ds-div-f8d2k1 ds-padding-lg ds-elevated-true */}
        <DSCard padding="lg" elevated>
          <h3>Elevated Card</h3>
        </DSCard>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">E-commerce Example</h2>
        
        {/* Generated classnames: shop-div-a3k9x shop-featured-true */}
        <ProductCard featured>
          <img 
            className="product-image" 
            src="/product.jpg" 
            alt="Product" 
          />
          <h3 className="product-title">Amazing Product</h3>
          <p className="product-price">$99.99</p>
          
          {/* Generated classnames: shop-button-f8d2k shop-state-available */}
          <AddToCartButton state="available">
            Add to Cart
          </AddToCartButton>
        </ProductCard>
      </section>
    </div>
  );
}

// ============================================
// 10. INSPECTOR OUTPUT
// ============================================

/*
HTML Output Examples:

1. Global Config:
<button class="myapp_button_a3k9 myapp_color_primary">
  Primary Button
</button>

2. Custom Prefix:
<button class="btn-a3k9x2f1 btn-variant-solid">
  Custom Solid
</button>

3. Minimal:
<button class="c1a2b">
  Minimal
</button>

4. Design System:
<button class="ds-button-a3k9x2 ds-color-primary ds-size-md">
  Default Button
</button>

5. E-commerce:
<div class="shop-div-a3k9x shop-featured-true">
  <img class="product-image" />
  <h3 class="product-title">Amazing Product</h3>
  <button class="shop-button-f8d2k shop-state-available">
    Add to Cart
  </button>
</div>
*/

// ============================================
// 11. CSS OUTPUT EXAMPLES
// ============================================

/*
Generated CSS with global config (prefix: 'myapp', separator: '_'):

.myapp_button_a3k9 {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
}

.myapp_button_a3k9.myapp_color_primary {
  background-color: rgb(59 130 246);
  color: rgb(255 255 255);
}

.myapp_button_a3k9.myapp_color_primary:hover {
  background-color: rgb(37 99 235);
}

Generated CSS with custom config (prefix: 'btn', no component name):

.btn-a3k9x2f1 {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.btn-a3k9x2f1.btn-variant-solid {
  background-color: rgb(59 130 246);
}
*/

export default ExampleApp;
