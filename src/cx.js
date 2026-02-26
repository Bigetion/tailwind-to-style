/**
 * CX - Conditional Class Name Builder
 * 
 * A lightweight utility for conditionally joining Tailwind class names.
 * Similar to `clsx`/`classnames` but designed specifically for tailwind-to-style.
 * 
 * @module cx
 */

/**
 * Conditionally join class names into a single string.
 * 
 * Accepts strings, objects (key=className, value=condition), arrays, and nested combinations.
 * Falsy values (null, undefined, false, 0, '') are ignored.
 * 
 * @param {...(string|Object|Array|boolean|null|undefined)} args - Class name inputs
 * @returns {string} Joined class names string
 * 
 * @example
 * // Strings
 * cx('bg-blue-500', 'text-white')
 * // → 'bg-blue-500 text-white'
 * 
 * @example
 * // Conditionals
 * cx('p-4', isActive && 'bg-blue-500', isDisabled && 'opacity-50')
 * // → 'p-4 bg-blue-500' (if isActive=true, isDisabled=false)
 * 
 * @example
 * // Object syntax
 * cx('p-4', { 'bg-blue-500': isActive, 'opacity-50': isDisabled, 'cursor-pointer': true })
 * // → 'p-4 bg-blue-500 cursor-pointer'
 * 
 * @example
 * // Arrays (nested)
 * cx(['p-4', 'bg-white'], isActive && ['ring-2', 'ring-blue-500'])
 * // → 'p-4 bg-white ring-2 ring-blue-500'
 * 
 * @example
 * // Mixed
 * cx(
 *   'base-class',
 *   condition && 'conditional-class',
 *   { 'object-class': true, 'ignored-class': false },
 *   ['array-class-1', 'array-class-2']
 * )
 */
export function cx(...args) {
  const classes = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    // Skip falsy values
    if (!arg) continue;

    const type = typeof arg;

    if (type === 'string') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      // Recursively process arrays
      const inner = cx(...arg);
      if (inner) classes.push(inner);
    } else if (type === 'object') {
      // Object: keys are class names, values are conditions
      const keys = Object.keys(arg);
      for (let j = 0; j < keys.length; j++) {
        if (arg[keys[j]]) {
          classes.push(keys[j]);
        }
      }
    }
  }

  return classes.join(' ');
}

/**
 * Create a cx function bound with base classes.
 * Useful for component-level class composition.
 * 
 * @param {...(string|Object|Array)} baseArgs - Base class arguments always included
 * @returns {Function} A cx function pre-filled with base classes
 * 
 * @example
 * const btnClasses = cx.with('px-4 py-2 rounded font-medium transition-colors')
 * 
 * btnClasses('bg-blue-500 text-white')
 * // → 'px-4 py-2 rounded font-medium transition-colors bg-blue-500 text-white'
 * 
 * btnClasses({ 'opacity-50 cursor-not-allowed': isDisabled })
 * // → 'px-4 py-2 rounded font-medium transition-colors opacity-50 cursor-not-allowed'
 */
cx.with = function (...baseArgs) {
  return function (...args) {
    return cx(...baseArgs, ...args);
  };
};

export default cx;
