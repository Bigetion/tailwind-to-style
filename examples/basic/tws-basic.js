/**
 * Basic tws() Usage Examples
 * 
 * Demonstrates simple Tailwind class conversion to inline styles
 */

import { tws } from 'tailwind-to-style';

console.log('='.repeat(60));
console.log('📘 BASIC TWS() EXAMPLES');
console.log('='.repeat(60));

// Example 1: Simple utility classes
console.log('\n1️⃣  Simple Utilities:');
const example1 = tws('bg-blue-500 text-white p-4 rounded-lg');
console.log('Input: "bg-blue-500 text-white p-4 rounded-lg"');
console.log('Output:', example1);

// Example 2: Flexbox layout
console.log('\n2️⃣  Flexbox Layout:');
const example2 = tws('flex items-center justify-between gap-4');
console.log('Input: "flex items-center justify-between gap-4"');
console.log('Output:', example2);

// Example 3: Typography
console.log('\n3️⃣  Typography:');
const example3 = tws('text-2xl font-bold text-gray-900 leading-tight');
console.log('Input: "text-2xl font-bold text-gray-900 leading-tight"');
console.log('Output:', example3);

// Example 4: Responsive classes (md:, lg:)
console.log('\n4️⃣  Responsive Classes:');
const example4 = tws('text-sm md:text-base lg:text-lg');
console.log('Input: "text-sm md:text-base lg:text-lg"');
console.log('Output:', example4);
console.log('Note: Media queries require CSS injection via twsx()');

// Example 5: Pseudo-states
console.log('\n5️⃣  Pseudo-States:');
const example5 = tws('bg-blue-500 hover:bg-blue-600 focus:ring-2');
console.log('Input: "bg-blue-500 hover:bg-blue-600 focus:ring-2"');
console.log('Output:', example5);
console.log('Note: Pseudo-states work best with CSS injection');

// Example 6: Arbitrary values
console.log('\n6️⃣  Arbitrary Values:');
const example6 = tws('w-[123px] h-[456px] text-[#abc123]');
console.log('Input: "w-[123px] h-[456px] text-[#abc123]"');
console.log('Output:', example6);

// Example 7: Opacity modifiers
console.log('\n7️⃣  Opacity Modifiers:');
const example7 = tws('text-red-500/50 bg-blue-500/25');
console.log('Input: "text-red-500/50 bg-blue-500/25"');
console.log('Output:', example7);

// Example 8: Important modifier
console.log('\n8️⃣  Important Modifier:');
const example8 = tws('!bg-red-500 !text-white');
console.log('Input: "!bg-red-500 !text-white"');
console.log('Output:', example8);

// Example 9: JSON output
console.log('\n9️⃣  JSON Output (convertToJson = true):');
const example9 = tws('flex items-center gap-4 p-6', true);
console.log('Input: "flex items-center gap-4 p-6"');
console.log('Output:', JSON.stringify(example9, null, 2));

// Example 10: Negative values
console.log('\n🔟 Negative Values:');
const example10 = tws('-mt-4 -ml-2 -rotate-45');
console.log('Input: "-mt-4 -ml-2 -rotate-45"');
console.log('Output:', example10);

console.log('\n' + '='.repeat(60));
console.log('✅ All examples completed!');
console.log('='.repeat(60) + '\n');

// Practical example: Button styles
console.log('💡 PRACTICAL EXAMPLE: Button Component\n');

const buttonStyles = tws(
  'inline-flex items-center justify-center px-6 py-3 ' +
  'bg-blue-500 text-white font-medium rounded-lg ' +
  'shadow-md transition-all duration-200 ' +
  'hover:bg-blue-600 hover:shadow-lg ' +
  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed',
  true
);

console.log('Button Styles Object:');
console.log(JSON.stringify(buttonStyles, null, 2));

// Usage in HTML/React
console.log('\nUsage in React:');
console.log(`
<button style={buttonStyles}>
  Click Me
</button>
`);

console.log('\nUsage in Vanilla JS:');
console.log(`
const button = document.createElement('button');
Object.assign(button.style, buttonStyles);
button.textContent = 'Click Me';
document.body.appendChild(button);
`);

// Export for testing
export {
  example1,
  example2,
  example3,
  example4,
  example5,
  example6,
  example7,
  example8,
  example9,
  example10,
  buttonStyles,
};
