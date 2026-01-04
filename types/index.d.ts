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

// Variant System Types (similar to tailwind-variants)

/**
 * Variant option values - can be string classes or nested object
 */
export type VariantValue = string;

/**
 * Variant options definition
 */
export interface VariantOptions {
  [optionKey: string]: VariantValue;
}

/**
 * Variants definition object
 */
export interface VariantsDefinition {
  [variantName: string]: VariantOptions;
}

/**
 * Compound variant definition
 */
export interface CompoundVariant {
  [variantName: string]: string | boolean | string[];
  class?: string;
  className?: string;
}

/**
 * Default variants definition
 */
export interface DefaultVariants {
  [variantName: string]: string | boolean;
}

/**
 * Configuration for twsxVariants
 */
export interface TwsxVariantsConfig {
  /** 
   * CSS class name for auto-injection mode.
   * When provided, CSS is auto-generated for all variant combinations.
   * Class names follow pattern: .{className}-{variant}-{color}-{size}
   * Default values are omitted from class name.
   * @example className: '.btn' generates .btn, .btn-outline, .btn-danger, etc.
   */
  className?: string;
  /** Base Tailwind classes applied to all variants */
  base?: string;
  /** Variant definitions with their options */
  variants?: VariantsDefinition;
  /** Compound variant rules for multi-variant combinations */
  compoundVariants?: CompoundVariant[];
  /** Default variant values */
  defaultVariants?: DefaultVariants;
  /**
   * Nested selectors for child elements.
   * Keys are CSS selectors relative to the parent className.
   * Use '&' prefix for attached selectors (e.g., '&.active' -> '.alert.active')
   * Without '&', creates descendant selector (e.g., '.icon' -> '.alert .icon')
   * @example
   * nested: {
   *   '.icon': 'flex-shrink-0 mt-0.5',
   *   '.content': 'flex-1',
   *   '&.dismissable': 'pr-10'
   * }
   */
  nested?: Record<string, string>;
}

/**
 * Props type for variant function
 */
export interface VariantProps {
  [variantName: string]: string | boolean | undefined;
}

/**
 * Variant function returned by twsxVariants
 */
export type VariantFunction = (props?: VariantProps) => string;

/**
 * Create a variant-based style generator (similar to tailwind-variants)
 * Supports base styles, variants, compound variants, and default variants
 * 
 * When className is provided: Auto-injects CSS for all variant combinations
 * Always returns a function to build class names from props
 * 
 * @param config - Configuration object with base, variants, compoundVariants, defaultVariants
 * @returns A function that accepts variant props and returns the class name string
 * 
 * @example
 * // With className: Auto-inject CSS + return class builder
 * const btn = twsxVariants({
 *   className: '.btn',
 *   base: 'px-4 py-2 rounded font-medium',
 *   variants: {
 *     variant: { solid: 'bg-blue-500', outline: 'bg-transparent border-2' },
 *     size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' }
 *   },
 *   defaultVariants: { variant: 'solid', size: 'md' }
 * });
 * // CSS generated: .btn, .btn-sm, .btn-lg, .btn-outline, .btn-outline-sm, etc.
 * btn({ variant: 'outline', size: 'lg' }) // Returns: "btn-outline-lg"
 * 
 * @example
 * // Without className: Return class string generator
 * const button = twsxVariants({
 *   base: 'px-4 py-2 rounded font-medium',
 *   variants: {
 *     color: { primary: 'bg-blue-500', secondary: 'bg-gray-500' }
 *   },
 *   defaultVariants: { color: 'primary' }
 * });
 * button({ color: 'secondary' }) // Returns: "px-4 py-2 rounded font-medium bg-gray-500"
 */
export function twsxVariants(config: TwsxVariantsConfig): VariantFunction;

/**
 * Performance utilities for debugging and monitoring
 */
export const performanceUtils: PerformanceUtils;

// Default export (if needed)
declare const tailwindToStyle: {
  tws: typeof tws;
  twsx: typeof twsx;
  twsxVariants: typeof twsxVariants;
  debouncedTws: typeof debouncedTws;
  debouncedTwsx: typeof debouncedTwsx;
  performanceUtils: typeof performanceUtils;
};

export default tailwindToStyle;
