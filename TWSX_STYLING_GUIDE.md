# TWSX Styling Guide - AI Agent Reference

> **Purpose**: This guide provides comprehensive examples and patterns for AI agents to understand and use `twsx()` function effectively for advanced CSS styling with Tailwind CSS.

## Installation & Import

### NPM/Yarn Installation
```bash
# Using npm
npm install tailwind-to-style

# Using yarn
yarn add tailwind-to-style
```

### Import Methods

#### ES6 Modules (Recommended)
```javascript
import { twsx } from 'tailwind-to-style';

// Usage
const styles = twsx({
  ".my-component": "bg-blue-500 text-white p-4"
});
```

#### CommonJS (Node.js)
```javascript
const { twsx } = require('tailwind-to-style');

// Usage
const styles = twsx({
  ".my-component": "bg-blue-500 text-white p-4"
});
```

#### CDN Usage (Browser)
```html
<!-- Include the library via CDN -->
<script src="https://unpkg.com/tailwind-to-style@latest/dist/index.browser.js"></script>

<script>
  // Access via global object
  const { twsx } = tailwindToStyle;
  
  // Usage
  const styles = twsx({
    ".my-component": "bg-blue-500 text-white p-4"
  });
  
  // CSS is automatically injected into <head>
  console.log(styles);
</script>
```

#### CDN with Module (Modern Browsers)
```html
<script type="module">
  import { twsx } from 'https://unpkg.com/tailwind-to-style@latest/dist/index.esm.js';
  
  const styles = twsx({
    ".my-component": "bg-blue-500 text-white p-4"
  });
</script>
```

### Quick Start Example
```javascript
import { twsx } from 'tailwind-to-style';

// Simple component styling
const buttonStyles = twsx({
  ".btn": [
    "bg-blue-500 text-white px-4 py-2 rounded",
    "hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
  ]
});

// The generated CSS is automatically injected in browser
// Or you can use it in your build process
console.log(buttonStyles);
```

## Table of Contents
1. [Nested Styles (SCSS-like)](#1-nested-styles-scss-like)
2. [Grouping with Parentheses](#2-grouping-with-parentheses)
3. [Responsive Selector Syntax](#3-responsive-selector-syntax-v290)
4. [Dark Mode Support](#4-dark-mode-support)
5. [Enhanced @css Directive](#5-enhanced-css-directive-v290)
6. [State Variants & Pseudo-selectors](#6-state-variants--pseudo-selectors)
7. [Dynamic/Arbitrary Values](#7-dynamicarbitrary-values)
8. [!important Support](#8-important-support)

---

## 1. Nested Styles (SCSS-like)

**Purpose**: Create hierarchical CSS structures with nested selectors, similar to SCSS/Sass.

### Basic Pattern:
```javascript
const styles = twsx({
  ".parent": [
    "base-classes-here",
    {
      "&:pseudo-selector": "modifier-classes",
      ".child-element": "child-classes",
      ".nested": {
        ".deep-nested": "deep-classes"
      }
    }
  ]
});
```

### Practical Examples:

#### Card Component:
```javascript
const cardStyles = twsx({
  ".card": [
    "bg-white rounded-lg shadow-md p-6 border border-gray-200",
    {
      "&:hover": "shadow-xl transform scale-105",
      ".card-header": [
        "border-b border-gray-100 pb-4 mb-4",
        {
          ".card-title": "text-xl font-bold text-gray-900",
          ".card-subtitle": "text-sm text-gray-500 mt-1"
        }
      ],
      ".card-body": [
        "text-gray-700 leading-relaxed",
        {
          "p": "mb-4 last:mb-0",
          "a": "text-blue-600 hover:text-blue-800 underline",
          ".highlight": "bg-yellow-100 px-2 py-1 rounded"
        }
      ],
      ".card-footer": [
        "border-t border-gray-100 pt-4 mt-6",
        {
          ".btn": "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        }
      ]
    }
  ]
});
```

#### Navigation Menu:
```javascript
const navStyles = twsx({
  ".navbar": [
    "bg-white shadow-lg border-b border-gray-200",
    {
      ".nav-container": [
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        {
          ".nav-brand": [
            "flex items-center",
            {
              "img": "h-8 w-auto mr-3",
              "span": "text-xl font-bold text-gray-900"
            }
          ],
          ".nav-links": [
            "hidden md:flex space-x-8",
            {
              "a": [
                "text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium",
                {
                  "&.active": "text-blue-600 border-b-2 border-blue-600"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});
```

---

## 2. Grouping with Parentheses

**Purpose**: Group related utility classes together for better organization and readability.

### Basic Pattern:
```javascript
const styles = twsx({
  ".element": [
    "base-classes",
    "state:(grouped-classes-for-state)",
    "breakpoint:(grouped-responsive-classes)"
  ]
});
```

### Practical Examples:

#### Interactive Button:
```javascript
const buttonStyles = twsx({
  ".btn-primary": [
    "bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg",
    "hover:(bg-blue-600 scale-105 shadow-lg)",
    "focus:(ring-4 ring-blue-200 outline-none)",
    "active:(bg-blue-700 scale-95)",
    "disabled:(bg-gray-300 cursor-not-allowed scale-100)"
  ]
});
```

#### Form Input with Multiple States:
```javascript
const inputStyles = twsx({
  ".form-input": [
    "w-full px-4 py-2 border rounded-lg transition-all duration-200",
    "border-gray-300 bg-white text-gray-900",
    "focus:(border-blue-500 ring-4 ring-blue-100 outline-none)",
    "hover:(border-gray-400)",
    "invalid:(border-red-500 ring-4 ring-red-100)",
    "disabled:(bg-gray-100 cursor-not-allowed opacity-60)"
  ]
});
```

#### Responsive Grid Layout:
```javascript
const gridStyles = twsx({
  ".responsive-grid": [
    "grid gap-6 p-6",
    "grid-cols-1",
    "sm:(grid-cols-2 gap-4 p-4)",
    "md:(grid-cols-3 gap-6 p-6)",
    "lg:(grid-cols-4 gap-8 p-8)",
    "xl:(grid-cols-5 gap-10 p-10)"
  ]
});
```

---

## 3. Responsive Selector Syntax (v2.9.0+)

**Purpose**: More intuitive way to define responsive styles using breakpoint prefixes in selectors.

### Basic Pattern:
```javascript
const styles = twsx({
  ".element": "base-classes",
  "sm:.element": "small-screen-classes",
  "md:.element": "medium-screen-classes",
  "lg:.element": "large-screen-classes",
  "xl:.element": "extra-large-classes"
});
```

### Practical Examples:

#### Typography Scaling:
```javascript
const typographyStyles = twsx({
  ".hero-title": "text-2xl font-bold text-center",
  "sm:.hero-title": "text-3xl",
  "md:.hero-title": "text-4xl text-left",
  "lg:.hero-title": "text-5xl",
  "xl:.hero-title": "text-6xl",
  
  ".hero-subtitle": "text-base text-gray-600 mt-2",
  "md:.hero-subtitle": "text-lg mt-4",
  "lg:.hero-subtitle": "text-xl mt-6"
});
```

#### Layout Components:
```javascript
const layoutStyles = twsx({
  ".sidebar": "w-full bg-gray-100 p-4",
  "md:.sidebar": "w-64 h-screen fixed left-0 top-0",
  "lg:.sidebar": "w-80",
  
  ".main-content": "p-4",
  "md:.main-content": "ml-64 p-8",
  "lg:.main-content": "ml-80 p-12",
  
  ".mobile-menu": "block",
  "md:.mobile-menu": "hidden"
});
```

#### Card Grid Responsive:
```javascript
const cardGridStyles = twsx({
  ".card-grid": "grid gap-4 p-4",
  ".card-grid": "grid-cols-1",
  "sm:.card-grid": "grid-cols-2 gap-6",
  "lg:.card-grid": "grid-cols-3",
  "xl:.card-grid": "grid-cols-4 gap-8 p-8"
});
```

---

## 4. Dark Mode Support

**Purpose**: Implement dark/light theme support with automatic CSS generation.

### Basic Patterns:
```javascript
// Method 1: Using dark: prefix
".element": "light-classes dark:dark-classes"

// Method 2: Using .dark selector
".element": {
  ".dark &": "dark-classes"
}

// Method 3: Grouping syntax
".element": "light-classes dark:(dark-classes)"
```

### Practical Examples:

#### Complete Theme System:
```javascript
const themeStyles = twsx({
  ".app": [
    "min-h-screen transition-colors duration-300",
    "bg-white text-gray-900",
    "dark:(bg-gray-900 text-gray-100)"
  ],
  
  ".navbar": [
    "bg-white border-b border-gray-200 shadow-sm",
    "dark:(bg-gray-800 border-gray-700)"
  ],
  
  ".card": [
    "bg-white border border-gray-200 shadow-md",
    "dark:(bg-gray-800 border-gray-700 shadow-gray-900/20)"
  ],
  
  ".btn-primary": [
    "bg-blue-600 text-white hover:bg-blue-700",
    "dark:(bg-blue-500 hover:bg-blue-400)"
  ]
});
```

#### Form Elements Dark Mode:
```javascript
const formDarkStyles = twsx({
  ".form-input": [
    "bg-white border-gray-300 text-gray-900 placeholder-gray-500",
    "focus:(border-blue-500 ring-blue-200)",
    "dark:(bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400)",
    "dark:focus:(border-blue-400 ring-blue-800)"
  ],
  
  ".form-label": [
    "text-gray-700 font-medium",
    "dark:text-gray-300"
  ],
  
  ".form-error": [
    "text-red-600 text-sm mt-1",
    "dark:text-red-400"
  ]
});
```

#### Dashboard Dark Theme:
```javascript
const dashboardDarkStyles = twsx({
  ".dashboard": [
    "min-h-screen bg-gray-50 dark:bg-gray-900",
    {
      ".sidebar": [
        "bg-white border-r border-gray-200",
        "dark:(bg-gray-800 border-gray-700)",
        {
          ".nav-item": [
            "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
            "dark:(text-gray-300 hover:text-white hover:bg-gray-700)"
          ]
        }
      ],
      
      ".main-panel": [
        "bg-white",
        "dark:bg-gray-800",
        {
          ".stats-card": [
            "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
            "dark:(from-blue-600 to-purple-700)"
          ]
        }
      ]
    }
  ]
});
```

---

## 5. Enhanced @css Directive (v2.9.0+)

**Purpose**: Add custom CSS properties that aren't available as Tailwind utilities, with perfect preservation of CSS functions and variables.

### Basic Patterns:
```javascript
// Method 1: Nested @css object
".element": {
  "@css": {
    "property": "value",
    "custom-property": "complex-value"
  }
}

// Method 2: Direct property syntax
".element @css property": "value"
```

### Practical Examples:

#### Advanced Animations:
```javascript
const animationStyles = twsx({
  ".fade-in-up": {
    "@css": {
      "opacity": "0",
      "transform": "translateY(30px)",
      "animation": "fadeInUp 0.6s ease-out forwards",
      "animation-delay": "var(--delay, 0ms)"
    }
  },
  
  ".floating-element": [
    "relative",
    {
      "@css": {
        "animation": "float 3s ease-in-out infinite",
        "transform-origin": "center center"
      }
    }
  ],
  
  "@keyframes fadeInUp": {
    "@css": {
      "to": {
        "opacity": "1",
        "transform": "translateY(0)"
      }
    }
  }
});
```

#### CSS Variables & Functions:
```javascript
const cssVariablesStyles = twsx({
  ":root": {
    "@css": {
      "--primary-color": "#3b82f6",
      "--secondary-color": "#8b5cf6",
      "--spacing-unit": "1rem",
      "--border-radius": "0.5rem",
      "--shadow-color": "rgba(0, 0, 0, 0.1)"
    }
  },
  
  ".theme-component": {
    "@css": {
      "background": "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
      "border-radius": "var(--border-radius)",
      "padding": "calc(var(--spacing-unit) * 2)",
      "box-shadow": "0 4px 20px var(--shadow-color)",
      "transform": "translateY(calc(-1 * var(--spacing-unit)))",
      "width": "clamp(200px, 50vw, 800px)"
    }
  }
});
```

#### Complex Grid Layouts:
```javascript
const gridAdvancedStyles = twsx({
  ".masonry-grid": {
    "@css": {
      "display": "grid",
      "grid-template-columns": "repeat(auto-fit, minmax(250px, 1fr))",
      "grid-auto-rows": "minmax(200px, auto)",
      "gap": "clamp(1rem, 5vw, 3rem)",
      "grid-auto-flow": "row dense"
    }
  },
  
  ".sticky-header": [
    "bg-white shadow-md",
    {
      "@css": {
        "position": "sticky",
        "top": "0",
        "z-index": "1000",
        "backdrop-filter": "blur(10px)",
        "background": "rgba(255, 255, 255, 0.9)"
      }
    }
  ]
});
```

#### Custom Properties with Hover Effects:
```javascript
const customHoverStyles = twsx({
  ".interactive-card": [
    "p-6 rounded-lg cursor-pointer",
    {
      "@css": {
        "--scale": "1",
        "--shadow": "0 4px 6px rgba(0, 0, 0, 0.1)",
        "transform": "scale(var(--scale))",
        "box-shadow": "var(--shadow)",
        "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      },
      
      "&:hover": {
        "@css": {
          "--scale": "1.05",
          "--shadow": "0 20px 25px rgba(0, 0, 0, 0.15)"
        }
      }
    }
  ]
});
```

---

## 6. State Variants & Pseudo-selectors

**Purpose**: Handle various CSS states and pseudo-selectors with Tailwind classes.

### Common Patterns:
```javascript
"&:hover": "hover-classes",
"&:focus": "focus-classes", 
"&:active": "active-classes",
"&:disabled": "disabled-classes",
"&::before": "before-pseudo-classes",
"&::after": "after-pseudo-classes",
"&:nth-child(odd)": "nth-classes"
```

### Practical Examples:

#### Interactive Form Elements:
```javascript
const formInteractiveStyles = twsx({
  ".form-group": [
    "relative mb-6",
    {
      ".form-input": [
        "w-full px-4 py-3 border-2 border-gray-300 rounded-lg",
        "bg-white text-gray-900 placeholder-transparent",
        "transition-all duration-200 peer",
        {
          "&:focus": "border-blue-500 outline-none ring-4 ring-blue-100",
          "&:invalid": "border-red-500 ring-4 ring-red-100",
          "&:valid": "border-green-500",
          "&:disabled": "bg-gray-100 cursor-not-allowed opacity-60"
        }
      ],
      
      ".form-label": [
        "absolute left-4 top-3 text-gray-500 transition-all duration-200",
        "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base",
        "peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-blue-500",
        "peer-valid:-top-2 peer-valid:left-2 peer-valid:text-sm peer-valid:text-green-500"
      ]
    }
  ]
});
```

#### Advanced Button States:
```javascript
const buttonAdvancedStyles = twsx({
  ".btn-advanced": [
    "relative px-6 py-3 font-semibold rounded-lg overflow-hidden",
    "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
    "transform transition-all duration-300",
    {
      "&::before": [
        "absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500",
        "opacity-0 transition-opacity duration-300"
      ],
      
      "&:hover": [
        "scale-105 shadow-xl",
        {
          "&::before": "opacity-100"
        }
      ],
      
      "&:active": "scale-95",
      
      "&:focus": [
        "outline-none ring-4 ring-blue-300",
        {
          "&:not(:hover)": "scale-100"
        }
      ],
      
      "&:disabled": [
        "scale-100 opacity-50 cursor-not-allowed",
        "bg-gray-400 from-gray-400 to-gray-400",
        {
          "&:hover": "scale-100 shadow-none",
          "&::before": "opacity-0"
        }
      ]
    }
  ]
});
```

#### List and Table States:
```javascript
const listTableStyles = twsx({
  ".data-table": [
    "w-full border-collapse",
    {
      "tr": [
        "border-b border-gray-200 transition-colors",
        {
          "&:hover": "bg-gray-50",
          "&:nth-child(even)": "bg-gray-25",
          "&:first-child": "border-t-2 border-blue-500",
          "&:last-child": "border-b-2 border-gray-300"
        }
      ],
      
      "td": [
        "px-4 py-3 text-sm",
        {
          "&:first-child": "font-semibold text-gray-900",
          "&:last-child": "text-right"
        }
      ]
    }
  ],
  
  ".navigation-list": [
    "space-y-2",
    {
      "li": [
        "relative",
        {
          "a": [
            "block px-4 py-2 rounded-lg text-gray-700 transition-all",
            {
              "&:hover": "bg-blue-50 text-blue-700 pl-6",
              "&.active": "bg-blue-100 text-blue-800 font-semibold",
              "&::after": [
                "absolute right-4 top-1/2 transform -translate-y-1/2",
                "opacity-0 transition-opacity",
                {
                  "&:hover": "opacity-100"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});
```

---

## 7. Dynamic/Arbitrary Values

**Purpose**: Use custom values that aren't predefined in Tailwind's design system using square bracket notation.

### Basic Pattern:
```javascript
"w-[300px]"           // Custom width
"h-[calc(100vh-80px)]" // Calculated height  
"bg-[#ff5500]"        // Custom color
"text-[18px]"         // Custom font size
"bg-[rgba(255,0,0,0.5)]" // Custom RGBA
"rounded-[12px]"      // Custom border radius
```

### Practical Examples:

#### Custom Sizing and Spacing:
```javascript
const customSizingStyles = twsx({
  ".hero-banner": [
    "w-full h-[calc(100vh-80px)]",
    "bg-[url('/images/hero-bg.jpg')] bg-cover bg-center",
    "flex items-center justify-center"
  ],
  
  ".sidebar": [
    "w-[280px] h-[calc(100vh-60px)]",
    "bg-[#f8fafc] border-r-[3px] border-r-[#e2e8f0]"
  ],
  
  ".content-area": [
    "min-h-[600px] max-w-[1200px] mx-auto",
    "p-[clamp(1rem,5vw,3rem)]"
  ]
});
```

#### Custom Colors and Gradients:
```javascript
const customColorStyles = twsx({
  ".brand-card": [
    "bg-[#1a365d] text-[#ffffff]",
    "border-[2px] border-[#2d3748]",
    "shadow-[0_10px_25px_rgba(26,54,93,0.3)]"
  ],
  
  ".gradient-text": [
    "bg-gradient-to-r from-[#ff6b6b] via-[#4ecdc4] to-[#45b7d1]",
    "bg-clip-text text-transparent text-[clamp(2rem,5vw,4rem)]"
  ],
  
  ".glass-effect": [
    "bg-[rgba(255,255,255,0.1)]",
    "backdrop-blur-[12px]",
    "border-[1px] border-[rgba(255,255,255,0.2)]"
  ]
});
```

#### Complex Layouts:
```javascript
const customLayoutStyles = twsx({
  ".masonry-item": [
    "break-inside-avoid mb-[1.5rem]",
    "min-h-[200px] max-h-[800px]"
  ],
  
  ".grid-complex": [
    "grid gap-[2rem]",
    "grid-template-columns-[repeat(auto-fit,minmax(300px,1fr))]",
    "grid-auto-rows-[minmax(250px,auto)]"
  ],
  
  ".sticky-container": [
    "sticky top-[80px]",
    "max-h-[calc(100vh-100px)]",
    "overflow-y-auto"
  ]
});
```

#### Custom Animations:
```javascript
const customAnimationStyles = twsx({
  ".pulse-custom": [
    "animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
  ],
  
  ".slide-in": [
    "transform translate-x-[-100%]",
    "animate-[slideIn_0.5s_ease-out_forwards]"
  ],
  
  ".rotate-custom": [
    "animate-[spin_3s_linear_infinite]",
    "transform-origin-[center_center]"
  ]
});
```

---

## 8. !important Support

**Purpose**: Override other CSS rules by adding `!important` to specific utilities.

### Basic Pattern:
```javascript
"!property-value"  // Adds !important to the property
```

### Practical Examples:

#### Override Existing Styles:
```javascript
const overrideStyles = twsx({
  ".force-styles": [
    "!bg-red-500 !text-white !p-6",
    "!border-none !shadow-none"
  ],
  
  ".override-framework": [
    "!font-bold !text-[24px] !leading-tight",
    "!m-0 !p-0"
  ]
});
```

#### Critical UI Elements:
```javascript
const criticalStyles = twsx({
  ".error-message": [
    "!bg-red-100 !border-red-500 !text-red-700",
    "!p-4 !rounded-lg !border-2",
    "!font-semibold !text-center"
  ],
  
  ".success-notification": [
    "!fixed !top-4 !right-4 !z-[9999]",
    "!bg-green-500 !text-white !p-4 !rounded-lg",
    "!shadow-xl !transform !translate-x-0"
  ]
});
```

#### Framework Override:
```javascript
const frameworkOverrideStyles = twsx({
  ".bootstrap-override": [
    "!bg-blue-600 !border-blue-600",
    "!text-white !font-normal",
    {
      "&:hover": "!bg-blue-700 !border-blue-700",
      "&:focus": "!ring-4 !ring-blue-200 !outline-none"
    }
  ],
  
  ".material-override": [
    "!rounded-lg !shadow-md",
    "!transition-all !duration-300",
    {
      ".mat-button": "!text-transform-none !font-medium"
    }
  ]
});
```

---

## Best Practices for AI Agents

### 1. **Structure Organization**
- Always group related styles together
- Use nested objects for component hierarchies
- Keep base styles separate from state modifications

### 2. **Responsive Design**
- Use the new responsive selector syntax for clearer breakpoint management
- Start with mobile-first approach
- Group responsive utilities when they're related

### 3. **State Management**
- Group state variants (hover, focus, active) together
- Use meaningful state combinations
- Consider accessibility states (disabled, invalid, etc.)

### 4. **Performance Considerations**
- Use the debounced versions for high-frequency updates
- Leverage auto-injection for browser environments
- Consider using build-time generation for production

### 5. **Dark Mode Implementation**
- Always provide both light and dark variants
- Use consistent color schemes across components
- Test contrast ratios for accessibility

### 6. **Custom CSS Integration**
- Use @css directive for properties not available in Tailwind
- Preserve CSS variables and functions for dynamic theming
- Combine with Tailwind utilities for optimal results

This guide provides the foundation for AI agents to effectively use `twsx()` for advanced styling scenarios while maintaining clean, maintainable, and performant CSS output.
