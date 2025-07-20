// Type definitions for tailwind-to-style
// Project: https://github.com/your-username/tailwind-to-style
// Definitions by: Your Name <https://github.com/your-username>

export interface TwsxOptions {
  inject?: boolean;
  [key: string]: any;
}

export interface GlobalConfig {
  theme: {
    extend: {
      colors: Record<string, string | Record<string, string>>;
      [key: string]: any;
    };
    screens: Record<string, string>;
    [key: string]: any;
  };
  inject: boolean;
}

export interface PerformanceStats {
  cacheStats: {
    cssResolution: number;
    configOptions: number;
    parseSelector: number;
    encodeBracket: number;
    decodeBracket: number;
  };
  injectionStats: {
    uniqueStylesheets: number;
  };
}

export interface PerformanceUtils {
  getStats(): PerformanceStats;
  clearCaches(): void;
  enablePerformanceLogging(enabled?: boolean): void;
}

export interface StyleObject {
  [selector: string]: string | StyleObject | Array<string | StyleObject>;
}

/**
 * Converts Tailwind CSS classes to inline styles or JSON object
 * @param classNames - String containing Tailwind classes to convert
 * @param convertToJson - If true, returns JSON object, if false returns CSS string
 * @returns CSS inline string or style JSON object
 */
export function tws(classNames: string, convertToJson?: false): string;
export function tws(classNames: string, convertToJson: true): Record<string, string>;
export function tws(classNames: string, convertToJson?: boolean): string | Record<string, string>;

/**
 * Generates CSS string from style object with SCSS-like syntax
 * Supports nested selectors, state variants, responsive variants, and @css directives
 * @param obj - Object with SCSS-like style format
 * @param options - Additional options, merges with global config
 * @returns Generated CSS string
 */
export function twsx(obj: StyleObject, options?: TwsxOptions): string;

/**
 * Set global configuration for both tws and twsx
 * @param config - Global configuration object
 * @returns Current global configuration
 */
export function setConfig(config: Partial<GlobalConfig>): GlobalConfig;

/**
 * Get current global configuration for both tws and twsx
 * @returns Current global configuration
 */
export function getConfig(): GlobalConfig;

/**
 * Reset global configuration to default
 * @returns Default configuration
 */
export function resetConfig(): GlobalConfig;

/**
 * Debounced version of tws function with performance monitoring
 */
export const debouncedTws: typeof tws;

/**
 * Debounced version of twsx function with performance monitoring
 */
export const debouncedTwsx: typeof twsx;

/**
 * Performance utilities for debugging and monitoring
 */
export const performanceUtils: PerformanceUtils;

// Default export (if needed)
declare const tailwindToStyle: {
  tws: typeof tws;
  twsx: typeof twsx;
  debouncedTws: typeof debouncedTws;
  debouncedTwsx: typeof debouncedTwsx;
  performanceUtils: typeof performanceUtils;
};

export default tailwindToStyle;
