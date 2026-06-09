/**
 * Test: Verify Button CSS generation
 * Run: node --experimental-vm-modules examples/react-demo/test-button-css.mjs
 */

import { twsxClassName } from '../../dist/className/index.esm.js';

// Same config as Button component
const button = twsxClassName({
  name: 'btn',
  base: 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer select-none',
  hover: 'opacity-90',
  focus: 'outline-none ring-2 ring-offset-2',
  active: 'scale-95',
  variants: {
    color: {
      primary: 'bg-blue-600 text-white shadow-sm',
      secondary: 'bg-gray-200 text-gray-900',
      danger: 'bg-red-600 text-white shadow-sm',
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
  },
  defaultVariants: { color: 'primary', size: 'md' },
});

console.log('=== Button FULL CSS Test ===\n');

// Test 1: What does button() return?
const defaultClass = button();
console.log('1. button() =>', defaultClass);

// Test 2: Extract ALL CSS
const allCSS = twsxClassName.extractCSS();

// Strip <style> tags for clean output
const cleanCSS = allCSS.replace(/<\/?style[^>]*>/g, '');

console.log('\n2. FULL generated CSS:\n');
console.log(cleanCSS);

// Test 3: Check for hover/focus/active pseudo-class rules
console.log('\n3. Pseudo-class checks:');
console.log('  Contains ":hover":', cleanCSS.includes(':hover'));
console.log('  Contains ":focus":', cleanCSS.includes(':focus'));
console.log('  Contains ":active":', cleanCSS.includes(':active'));
console.log('  Contains "opacity":', cleanCSS.includes('opacity'));
console.log('  Contains "ring":', cleanCSS.includes('ring'));
console.log('  Contains "scale":', cleanCSS.includes('scale'));

// Test 4: Try with hover classes directly in variant
console.log('\n\n=== Test: Hover in variant value ===\n');
const btn2 = twsxClassName({
  name: 'btn2',
  base: 'px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2',
  variants: {
    color: {
      primary: 'bg-blue-600 text-white hover:bg-blue-800',
    },
  },
  defaultVariants: { color: 'primary' },
});
const css2 = twsxClassName.extractCSS().replace(allCSS, '').replace(/<\/?style[^>]*>/g, '');
console.log('btn2 classname:', btn2());
console.log('btn2 CSS:', css2);
