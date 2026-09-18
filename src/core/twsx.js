/**
 * Core TWSX Re-export
 * 
 * This module breaks the circular dependency between:
 * - src/index.js (exports twsx)
 * - src/className/index.js (imports twsx, exported by index.js)
 * 
 * By re-exporting twsx from index.js here, className can import
 * from this intermediate module instead of directly from index.js.
 * 
 * @module core/twsx
 */

export { twsx } from "../index.js";
