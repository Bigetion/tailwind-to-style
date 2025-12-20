/**
 * Example: Theme Customization
 * This example shows how to extend the default Tailwind theme
 */

import { configure, tws } from '../dist/index.esm.js';

// Configure custom theme
configure({
  theme: {
    extend: {
      // Add custom colors
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',  // Primary brand color
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: '#ff6b6b',
        success: '#51cf66',
        warning: '#ffd43b',
        danger: '#ff6b6b',
      },
      
      // Add custom spacing
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      
      // Add custom border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      
      // Add custom font sizes
      fontSize: {
        '2xs': '0.625rem',
        '3xs': '0.5rem',
      },
    },
  },
});

// Now use custom theme values
console.log('=== Theme Customization Examples ===\n');

// Custom brand colors
const brandButton = tws('bg-brand-500 hover:bg-brand-600 text-white p-4 rounded', 1);
console.log('Brand Button:', brandButton);

// Custom accent color
const accentText = tws('text-accent font-bold', 1);
console.log('Accent Text:', accentText);

// Custom spacing
const largeContainer = tws('p-128 m-144', 1);
console.log('Large Spacing:', largeContainer);

// Custom border radius
const superRounded = tws('rounded-5xl', 1);
console.log('Super Rounded:', superRounded);

// Custom font size
const tinyText = tws('text-3xs', 1);
console.log('Tiny Text:', tinyText);

// Combine multiple custom values
const customCard = tws('bg-brand-500 p-128 rounded-4xl text-2xs', 1);
console.log('Custom Card:', customCard);
