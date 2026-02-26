#!/usr/bin/env node

/**
 * Quick library test in Node.js
 * Usage: node test-quick.js
 * 
 * Note: Requires built dist/ files. Run `npm run build` first if needed.
 */

import { tws, twsx, twsxVariants } from './dist/index.esm.js';

console.log('\n🎮 tailwind-to-style Quick Test\n');
console.log('━'.repeat(60));

// Test 1: tws()
console.log('\n✅ Test 1: tws() - Basic Usage');
console.log('━'.repeat(60));
const styles = tws('bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600');
console.log('Input:', 'bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600');
console.log('Output:', JSON.stringify(styles, null, 2));

// Test 2: tws() with responsive
console.log('\n✅ Test 2: tws() - Responsive Classes');
console.log('━'.repeat(60));
const responsive = tws('text-sm md:text-lg lg:text-xl');
console.log('Input:', 'text-sm md:text-lg lg:text-xl');
console.log('Output:', JSON.stringify(responsive, null, 2));

// Test 3: tws() with arbitrary values
console.log('\n✅ Test 3: tws() - Arbitrary Values');
console.log('━'.repeat(60));
const arbitrary = tws('w-[123px] text-[#abc] bg-[url(/image.png)]');
console.log('Input:', 'w-[123px] text-[#abc] bg-[url(/image.png)]');
console.log('Output:', JSON.stringify(arbitrary, null, 2));

// Test 4: twsx() - Nested styles
console.log('\n✅ Test 4: twsx() - Nested Styles');
console.log('━'.repeat(60));
const css = twsx({
  '.button': [
    'bg-blue-500 text-white px-6 py-3 rounded-lg font-bold',
    {
      '&:hover': 'bg-blue-600 transform scale-105',
      '&:active': 'bg-blue-700',
      '&.large': 'px-8 py-4 text-xl'
    }
  ]
});
console.log('Input: Nested object with .button selector');
console.log('Output CSS:');
console.log(css);

// Test 5: twsxVariants()
console.log('\n✅ Test 5: twsxVariants() - Variant System');
console.log('━'.repeat(60));
const button = twsxVariants('.btn', {
  base: 'px-4 py-2 rounded-lg font-medium transition-all',
  variants: {
    variant: {
      solid: 'border-transparent',
      outline: 'bg-transparent border-2'
    },
    color: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      danger: 'bg-red-500 text-white hover:bg-red-600'
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }
  },
  compoundVariants: [
    { variant: 'outline', color: 'primary', class: 'border-blue-500 text-blue-600' },
    { variant: 'outline', color: 'danger', class: 'border-red-500 text-red-600' }
  ],
  defaultVariants: { variant: 'solid', color: 'primary', size: 'md' }
});

console.log('Variant function created!');
console.log('');
console.log('button()                                  →', button());
console.log('button({ color: "danger" })               →', button({ color: 'danger' }));
console.log('button({ size: "lg" })                    →', button({ size: 'lg' }));
console.log('button({ variant: "outline" })            →', button({ variant: 'outline' }));
console.log('button({ variant: "outline", color: "danger" })  →', button({ variant: 'outline', color: 'danger' }));

// Performance test
console.log('\n✅ Test 6: Performance - Caching');
console.log('━'.repeat(60));
const testClass = 'bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold shadow-2xl';

console.time('First parse (uncached)');
for (let i = 0; i < 1000; i++) {
  tws(testClass);
}
console.timeEnd('First parse (uncached)');

console.time('Cached parse');
for (let i = 0; i < 1000; i++) {
  tws(testClass);
}
console.timeEnd('Cached parse');

// Summary
console.log('\n━'.repeat(60));
console.log('✅ All tests completed successfully!');
console.log('━'.repeat(60));
console.log('\n💡 Next steps:');
console.log('   1. Open sandbox.html in browser for interactive testing');
console.log('   2. Check examples/ folder for more use cases');
console.log('   3. Run "npm test" for full test suite');
console.log('   4. See ARCHITECTURE.md for technical details\n');
