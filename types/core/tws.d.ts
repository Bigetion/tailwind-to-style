// Type definitions for tailwind-to-style/tws
// Tree-shakeable import: import { tws } from 'tailwind-to-style/tws'

/**
 * Converts Tailwind CSS classes to inline styles or JSON object
 */
export function tws(classNames: string, convertToJson?: false): string;
export function tws(classNames: string, convertToJson: true): Record<string, string>;
export function tws(classNames: string, convertToJson?: boolean): string | Record<string, string>;

/**
 * Debounced version of tws function (50ms delay)
 */
export const debouncedTws: typeof tws;
