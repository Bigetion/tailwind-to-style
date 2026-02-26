// Type definitions for tailwind-to-style/cx
// Conditional class name builder
// import { cx } from 'tailwind-to-style/cx'

type ClassValue = string | number | boolean | null | undefined | ClassObject | ClassArray;
type ClassObject = Record<string, any>;
type ClassArray = ClassValue[];

/**
 * Conditionally join class names into a single string.
 * 
 * Accepts strings, objects (key=className, value=condition), arrays, and nested combinations.
 * Falsy values (null, undefined, false, 0, '') are ignored.
 * 
 * @example
 * cx('bg-blue-500', 'text-white')
 * // → 'bg-blue-500 text-white'
 * 
 * @example
 * cx('p-4', isActive && 'bg-blue-500', { 'opacity-50': isDisabled })
 * // → 'p-4 bg-blue-500' (when isActive=true, isDisabled=false)
 * 
 * @example
 * cx(['p-4', 'bg-white'], isActive && ['ring-2', 'ring-blue-500'])
 * // → 'p-4 bg-white ring-2 ring-blue-500'
 */
export function cx(...args: ClassValue[]): string;

export namespace cx {
  /**
   * Create a cx function pre-filled with base classes.
   * 
   * @example
   * const btnClasses = cx.with('px-4 py-2 rounded font-medium')
   * btnClasses('bg-blue-500') // → 'px-4 py-2 rounded font-medium bg-blue-500'
   */
  function with_(...baseArgs: ClassValue[]): (...args: ClassValue[]) => string;
  export { with_ as with };
}

export default cx;
