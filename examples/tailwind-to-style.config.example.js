/**
 * Example Configuration File
 * Save this as tailwind-to-style.config.js in your project root
 */

import { createPlugin, createUtilityPlugin } from 'tailwind-to-style';

// Custom text shadow plugin
const textShadowPlugin = createUtilityPlugin('text-shadow', {
  prefix: 'text-shadow',
  values: {
    sm: '1px 1px 2px rgba(0,0,0,0.1)',
    md: '2px 2px 4px rgba(0,0,0,0.15)',
    lg: '4px 4px 8px rgba(0,0,0,0.2)',
    xl: '6px 6px 12px rgba(0,0,0,0.25)',
    none: 'none',
  },
  formatter: (value) => ({
    'text-shadow': value,
  }),
});

// Glass morphism plugin
const glassmorphismPlugin = createPlugin('glassmorphism', {
  utilities: {
    '.glass': {
      'backdrop-filter': 'blur(10px)',
      '-webkit-backdrop-filter': 'blur(10px)',
      'background-color': 'rgba(255, 255, 255, 0.1)',
      'border': '1px solid rgba(255, 255, 255, 0.2)',
    },
    '.glass-dark': {
      'backdrop-filter': 'blur(10px)',
      '-webkit-backdrop-filter': 'blur(10px)',
      'background-color': 'rgba(0, 0, 0, 0.1)',
      'border': '1px solid rgba(255, 255, 255, 0.1)',
    },
  },
});

export default {
  // Theme customization
  theme: {
    extend: {
      // Custom colors
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
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
      
      // Custom spacing
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      
      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      
      // Custom font sizes
      fontSize: {
        '2xs': '0.625rem',
        '3xs': '0.5rem',
      },
      
      // Custom breakpoints (if supported)
      screens: {
        'xs': '480px',
        '3xl': '1920px',
      },
    },
  },
  
  // Plugins
  plugins: [
    textShadowPlugin,
    glassmorphismPlugin,
  ],
  
  // Optional: Disable specific core plugins
  // corePlugins: {
  //   float: false,
  //   clear: false,
  // },
  
  // Optional: Add prefix to all classes
  // prefix: 'tw-',
};
