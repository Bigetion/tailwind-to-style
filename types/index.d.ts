// Type definitions for tailwind-to-style
// Project: https://github.com/Bigetion/tailwind-to-style
// Definitions by: Bigetion

// ============================================================================
// Environment Detection
// ============================================================================

/** True when running in a browser environment (window & document available) */
export const IS_BROWSER: boolean;
/** True when running in a server/Node.js environment */
export const IS_SERVER: boolean;

// ============================================================================
// SSR (Server-Side Rendering) Support
// ============================================================================

/**
 * Start collecting CSS for server-side rendering.
 * Call before rendering your application.
 */
export function startSSR(): void;

/**
 * Stop collecting CSS and return all collected CSS as a single string.
 * Call after rendering your application.
 */
export function stopSSR(): string;

/**
 * Get currently collected CSS without stopping collection.
 */
export function getSSRStyles(): string;

// ============================================================================
// Conditional Class Name Builder
// ============================================================================

type ClassValue = string | number | boolean | null | undefined | ClassObject | ClassArray;
type ClassObject = Record<string, any>;
type ClassArray = ClassValue[];

/**
 * Conditionally join class names into a single string.
 * Similar to clsx/classnames but built-in.
 * 
 * @example
 * cx('bg-blue-500', isActive && 'ring-2', { 'opacity-50': isDisabled })
 */
export function cx(...args: ClassValue[]): string;

export namespace cx {
  function with_(...baseArgs: ClassValue[]): (...args: ClassValue[]) => string;
  export { with_ as with };
}

// ============================================================================
// Logger types
// ============================================================================
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

/** * Compound variant definition - strict typing for better autocomplete
 */
export interface CompoundVariant<V extends VariantsDefinition = VariantsDefinition> {
  [K in keyof V]?: keyof V[K] | (keyof V[K])[];
}

export interface CompoundVariantWithClass<V extends VariantsDefinition = VariantsDefinition> 
  extends CompoundVariant<V> {
  class?: string;
  className?: string;
}

/**
 * Default variants definition - ensures only valid variant keys and values
 */
export type DefaultVariants<V extends VariantsDefinition> = {
  [K in keyof V]?: keyof V[K];
};

/**
 * Variant props - infers types from variants definition
 */
export type VariantProps<V extends VariantsDefinition> = {
  [K in keyof V]?: keyof V[K] | (keyof V[K])[];
};

/**
 * Configuration for twsxVariants with strict typing
 */
export interface TwsxVariantsConfig<V extends VariantsDefinition = VariantsDefinition> {
  /** Base Tailwind classes applied to all variants */
  base?: string;
  /** Variant definitions with their options */
  variants?: V;
  /** Compound variant rules for multi-variant combinations */
  compoundVariants?: CompoundVariantWithClass<V>[];
  /** Default variant values */
  defaultVariants?: DefaultVariants<V>;
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
 * Props type for variant function - DEPRECATED, use VariantProps<V> instead
 */
export interface VariantPropsLegacy {
  [variantName: string]: string | boolean | undefined;
}

/**
 * Variant function returned by twsxVariants
 * Generic type V allows for type-safe variant props
 */
export type VariantFunction<V extends VariantsDefinition = VariantsDefinition> = 
  (props?: Partial<VariantProps<V>>) => string;

/**
 * Create a variant-based style generator with full type safety
 * Supports base styles, variants, compound variants, and default variants
 * 
 * Auto-injects CSS for all variant combinations and returns a function to build class names
 * 
 * @template V - Variants definition type for type-safe props
 * @param className - CSS class name (e.g., '.btn' or 'btn')
 * @param config - Configuration object with base, variants, compoundVariants, defaultVariants
 * @returns A type-safe function that accepts variant props and returns the class name string
 * 
 * @example
 * const btn = twsxVariants('.btn', {
 *   base: 'px-4 py-2 rounded font-medium',
 *   variants: {
 *     variant: { solid: 'bg-blue-500', outline: 'bg-transparent border-2' },
 *     size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' }
 *   },
 *   compoundVariants: [
 *     { variant: 'outline', size: 'lg', class: 'border-4' }
 *   ],
 *   defaultVariants: { variant: 'solid', size: 'md' }
 * });
 * 
 * // CSS auto-generated for all combinations
 * // Type-safe usage with autocomplete:
 * btn({ variant: 'outline', size: 'lg' }) // Returns: "btn btn-outline-lg"
 * btn({ variant: 'solid' })                // Returns: "btn btn-solid"
 * btn()                                    // Returns: "btn" (uses defaults)
 */
export function twsxVariants<V extends VariantsDefinition>(
  className: string, 
  config?: TwsxVariantsConfig<V>
): VariantFunction<V>;

// Overload for legacy support without generics
export function twsxVariants(
  className: string, 
  config?: TwsxVariantsConfig
): VariantFunction;

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
