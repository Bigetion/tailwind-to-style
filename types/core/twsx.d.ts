// Type definitions for tailwind-to-style/twsx
// Tree-shakeable import: import { twsx } from 'tailwind-to-style/twsx'

export interface StyleObject {
  [selector: string]: string | StyleObject | Array<string | StyleObject>;
}

export interface TwsxOptions {
  /** Whether to auto-inject CSS into the DOM (default: true in browser, false in SSR) */
  inject?: boolean;
  /** Enable minified output */
  minify?: boolean;
  /** Output format */
  format?: 'pretty' | 'minified';
  [key: string]: any;
}

/**
 * Generates CSS string from style object with SCSS-like syntax
 */
export function twsx(obj: StyleObject, options?: TwsxOptions): string;

/**
 * Debounced version of twsx function (100ms delay)
 */
export const debouncedTwsx: typeof twsx;
