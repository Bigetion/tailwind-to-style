// Test script for tailwind-to-style library
const { tws, twsx } = require('../../index');

console.log('=== TAILWIND-TO-STYLE NODE.JS TESTS ===');

// Test 1: Basic tws function
console.log('\n1. Basic tws test');
console.log('Input: bg-blue-500 text-white p-4 rounded');
console.log('Output:', tws('bg-blue-500 text-white p-4 rounded'));

// Test 2: JSON output
console.log('\n2. JSON output test');
console.log('Input: bg-blue-500 text-white p-4 rounded');
const jsonOutput = tws('bg-blue-500 text-white p-4 rounded', 1);
console.log('Output:', JSON.stringify(jsonOutput, null, 2));

// Test 3: Responsive variants
console.log('\n3. Responsive variants test');
console.log('Input: text-sm md:text-base lg:text-lg');
console.log('Output:', tws('text-sm md:text-base lg:text-lg'));

// Test 4: State variants
console.log('\n4. State variants test');
console.log('Input: bg-gray-200 hover:bg-blue-500 focus:bg-green-500');
console.log('Output:', tws('bg-gray-200 hover:bg-blue-500 focus:bg-green-500'));

// Test 5: Complex styles with twsx
console.log('\n5. Complex styles with twsx');
console.log('Input: Complex nested object');
const complexStyles = twsx({
    '.card': [
        'bg-white p-4 rounded-lg shadow',
        {
            '&:hover': 'shadow-lg',
            '.title': 'text-lg font-bold text-gray-800',
            '.desc': 'text-sm text-gray-500'
        }
    ]
});
console.log('Output:', complexStyles);
