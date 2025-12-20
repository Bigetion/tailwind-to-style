/**
 * Example: Custom Plugins
 * This example shows how to create and use custom plugins
 */

import { configure, createPlugin, createUtilityPlugin, tws, twsx } from '../dist/index.esm.js';

// Example 1: Simple utility plugin
const textGradientPlugin = createPlugin('text-gradient', {
  utilities: {
    '.text-gradient': {
      'background-clip': 'text',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      'background-image': 'linear-gradient(to right, #3b82f6, #8b5cf6)',
    },
    '.text-gradient-red': {
      'background-clip': 'text',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      'background-image': 'linear-gradient(to right, #ef4444, #f97316)',
    },
  },
});

// Example 2: Glass morphism plugin
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

// Example 3: Dynamic utility plugin with values
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

// Example 4: Scroll snap plugin
const scrollSnapPlugin = createPlugin('scroll-snap', {
  utilities: {
    '.snap-container': {
      'scroll-snap-type': 'x mandatory',
      'overflow-x': 'scroll',
      'scrollbar-width': 'none',
      '-ms-overflow-style': 'none',
    },
    '.snap-item': {
      'scroll-snap-align': 'start',
    },
    '.snap-center': {
      'scroll-snap-align': 'center',
    },
  },
});

// Configure with all plugins
configure({
  plugins: [
    textGradientPlugin,
    glassmorphismPlugin,
    textShadowPlugin,
    scrollSnapPlugin,
  ],
});

console.log('=== Custom Plugin Examples ===\n');

// Use text gradient
const gradientText = tws('text-gradient text-4xl font-bold', 1);
console.log('Gradient Text:', gradientText);

// Use glassmorphism
const glassCard = tws('glass p-6 rounded-lg', 1);
console.log('Glass Card:', glassCard);

// Use text shadow
const shadowedText = tws('text-shadow-lg text-2xl', 1);
console.log('Shadowed Text:', shadowedText);

// Use scroll snap
const scrollContainer = tws('snap-container snap-item', 1);
console.log('Scroll Container:', scrollContainer);

// Combine custom utilities with standard Tailwind
const complexExample = tws('glass text-gradient p-8 rounded-2xl text-shadow-md', 1);
console.log('Complex Example:', complexExample);

// Use in twsx
const complexStyles = twsx({
  '.hero': [
    'glass text-center p-12',
    {
      '.title': 'text-gradient text-6xl font-bold text-shadow-xl',
      '.subtitle': 'text-gray-300 text-xl mt-4',
    },
  ],
}, { inject: false });

console.log('\ntwsx with plugins:\n', complexStyles);
