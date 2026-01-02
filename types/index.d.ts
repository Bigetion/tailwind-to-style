// Type definitions for tailwind-to-style
// Project: https://github.com/Bigetion/tailwind-to-style
// Definitions by: Bigetion

// Logger types
export class Logger {
  constructor(level?: 'debug' | 'info' | 'warn' | 'error' | 'silent');
  setLevel(level: 'debug' | 'info' | 'warn' | 'error' | 'silent'): void;
  getLevel(): string;
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

export const logger: Logger;

// LRU Cache types
export class LRUCache<K = any, V = any> {
  constructor(maxSize?: number);
  get(key: K): V | undefined;
  set(key: K, value: V): void;
  has(key: K): boolean;
  clear(): void;
  delete(key: K): boolean;
  readonly size: number;
}

// Error handling types
export class TwsError extends Error {
  constructor(message: string, context?: Record<string, any>);
  context: Record<string, any>;
  timestamp: string;
}

export function onError(handler: (error: TwsError) => void): () => void;
export function handleError(error: Error, context?: Record<string, any>): TwsError;

// Tailwind cache types
export class TailwindCache {
  getOrGenerate(generateFn: Function, convertFn: Function): any;
  getCssString(): string | null;
  getCssObject(): Record<string, string> | null;
  isInitialized(): boolean;
  reset(): void;
}

export function getTailwindCache(): TailwindCache;
export function resetTailwindCache(): void;

// Configuration and Plugin System
export interface ThemeExtension {
  colors?: Record<string, string | Record<string, string>>;
  spacing?: Record<string, string>;
  borderRadius?: Record<string, string>;
  fontSize?: Record<string, string>;
  [key: string]: any;
}

export interface TailwindConfig {
  theme?: {
    extend?: ThemeExtension;
    colors?: Record<string, string | Record<string, string>>;
    spacing?: Record<string, string>;
    [key: string]: any;
  };
  plugins?: Plugin[];
  corePlugins?: Record<string, boolean>;
  prefix?: string;
}

export interface Plugin {
  name: string;
  type: string;
  utilities?: Record<string, string | Record<string, string>>;
  components?: Record<string, string | Record<string, string>>;
  handler?: any;
}

export interface UtilityPluginConfig {
  prefix: string;
  values: Record<string, string>;
  formatter: (value: string, key: string) => Record<string, string>;
}

/**
 * Configure tailwind-to-style with custom theme and plugins
 */
export function configure(config: TailwindConfig): void;

/**
 * Get current configuration
 */
export function getConfig(): TailwindConfig;

/**
 * Reset configuration to defaults
 */
export function resetConfig(): void;

/**
 * Create a custom plugin
 */
export function createPlugin(name: string, definition: {
  utilities?: Record<string, string | Record<string, string>>;
  components?: Record<string, string | Record<string, string>>;
  handler?: Function;
}): Plugin;

/**
 * Create a utility plugin with dynamic values
 */
export function createUtilityPlugin(name: string, config: UtilityPluginConfig): Plugin;

/**
 * Create a variant plugin
 */
export function createVariantPlugin(name: string, handler: (selector: string) => string): Plugin;

// Main function types
export interface TwsxOptions {
  inject?: boolean;
  [key: string]: any;
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

// Variants System Types
export interface VariantOptions {
  [optionName: string]: string;
}

export interface Variants {
  [variantType: string]: VariantOptions;
}

export interface CompoundVariant {
  [variantType: string]: string;
  class: string;
}

export interface DefaultVariants {
  [variantType: string]: string;
}

export interface VariantsStructure {
  base: string;
  variants?: Variants;
  compounds?: CompoundVariant[];
  defaultVariants?: DefaultVariants;
}

export interface StyleObject {
  [selector: string]: string | StyleObject | Array<string | StyleObject> | VariantsStructure;
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
 * @param options - Additional options
 * @returns Generated CSS string
 */
export function twsx(obj: StyleObject, options?: TwsxOptions): string;

/**
 * Debounced version of tws function with performance monitoring
 * @param classNames - String containing Tailwind classes to convert
 * @param convertToJson - If true, returns JSON object, if false returns CSS string
 * @returns CSS inline string or style JSON object
 */
export const debouncedTws: typeof tws;

/**
 * Debounced version of twsx function with performance monitoring
 * @param obj - Object with SCSS-like style format
 * @param options - Additional options
 * @returns Generated CSS string
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
