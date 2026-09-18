/**
 * Debounce Utility
 * 
 * Limits function execution frequency for performance optimization.
 * Extracted from monolithic index.js.
 * 
 * @module utils/debounce
 */

/**
 * Debounce a function to limit execution frequency.
 * Useful for expensive operations triggered by rapid events.
 * 
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds (default: 100)
 * @returns {Function} Debounced function
 * 
 * @example
 * const expensiveOp = () => console.log('Executed!');
 * const debounced = debounce(expensiveOp, 300);
 * 
 * // Rapid calls
 * debounced(); // Pending...
 * debounced(); // Pending...
 * debounced(); // Executes after 300ms
 */
export function debounce(func, wait = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
