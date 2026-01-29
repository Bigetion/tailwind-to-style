// Enhanced Type definitions for tailwind-to-style v3.2+
// Project: https://github.com/Bigetion/tailwind-to-style
// Definitions by: Bigetion

/// <reference types="react" />

/**
 * ============================================================================
 * CORE API TYPES
 * ============================================================================
 */

/**
 * Style object returned by tws()
 */
export type StyleObject = React.CSSProperties;

/**
 * Options for tws() function
 */
export interface TwsOptions {
  /**
   * Output format
   * - 'object': Returns style object (default)
   * - 'json': Returns JSON string
   * - 'css': Returns CSS string
   */
  format?: 'object' | 'json' | 'css';
}

/**
 * Convert Tailwind classes to inline styles
 * 
 * @param classNames - Tailwind class names
 * @param options - Conversion options
 * @returns Style object or string based on format
 * 
 * @example
 * ```ts
 * const styles = tws('bg-blue-500 text-white p-4')
 * // → { backgroundColor: '#3b82f6', color: '#fff', padding: '1rem' }
 * 
 * const json = tws('p-4', { format: 'json' })
 * // → '{"padding":"1rem"}'
 * ```
 */
export function tws(classNames: string): StyleObject;
export function tws(classNames: string, options: { format: 'object' }): StyleObject;
export function tws(classNames: string, options: { format: 'json' }): string;
export function tws(classNames: string, options: { format: 'css' }): string;
export function tws(classNames: string, options?: TwsOptions): StyleObject | string;

/**
 * ============================================================================
 * TWSX TYPES
 * ============================================================================
 */

/**
 * Nested style value
 */
export type StyleValue = string | [string, NestedStyles?];

/**
 * Nested styles object
 */
export interface NestedStyles {
  [selector: string]: StyleValue | NestedStyles;
}

/**
 * Style object for twsx()
 */
export interface StylesObject {
  [selector: string]: StyleValue | NestedStyles;
}

/**
 * Options for twsx() function
 */
export interface TwsxOptions {
  /**
   * Auto-inject CSS into DOM (default: true)
   */
  inject?: boolean;
  
  /**
   * Minify output CSS (default: true)
   */
  minify?: boolean;
  
  /**
   * CSS formatting
   */
  format?: 'minified' | 'pretty';
}

/**
 * Generate CSS from nested style definitions
 * 
 * @param styleObject - Nested style definitions
 * @param options - Generation options
 * @returns Generated CSS string
 * 
 * @example
 * ```ts
 * const css = twsx({
 *   '.button': [
 *     'bg-blue-500 text-white px-4 py-2',
 *     {
 *       '&:hover': 'bg-blue-600',
 *       '&:active': 'bg-blue-700'
 *     }
 *   ]
 * })
 * ```
 */
export function twsx(styleObject: StylesObject, options?: TwsxOptions): string;

/**
 * ============================================================================
 * VARIANTS SYSTEM TYPES
 * ============================================================================
 */

/**
 * Variant definition - maps variant keys to Tailwind classes
 */
export type VariantOptions = Record<string, string>;

/**
 * All variants definition
 */
export type Variants = Record<string, VariantOptions>;

/**
 * Compound variant rule
 */
export interface CompoundVariant {
  /**
   * Variant conditions (all must match)
   */
  [variantKey: string]: string | boolean | string[] | undefined;
  
  /**
   * Classes to apply when conditions match
   */
  class?: string;
  className?: string;
}

/**
 * Nested selector styles
 */
export type NestedSelectors = Record<string, string>;

/**
 * Variant configuration
 */
export interface VariantConfig<V extends Variants = Variants> {
  /**
   * Base Tailwind classes applied to all variants
   */
  base?: string;
  
  /**
   * Variant definitions
   */
  variants?: V;
  
  /**
   * Compound variant rules
   */
  compoundVariants?: CompoundVariant[];
  
  /**
   * Default variant values
   */
  defaultVariants?: Partial<VariantProps<V>>;
  
  /**
   * Nested child selectors
   */
  nested?: NestedSelectors;
}

/**
 * Extract variant props from variant definitions
 */
export type VariantProps<V extends Variants> = {
  [K in keyof V]?: keyof V[K] | (string & {});
};

/**
 * Variant function - builds class names from props
 */
export type VariantFunction<V extends Variants> = (props?: VariantProps<V>) => string;

/**
 * Create variant-based component styles
 * 
 * @param className - Base class name
 * @param config - Variant configuration
 * @returns Function that builds class names from props
 * 
 * @example
 * ```ts
 * const button = twsxVariants('.btn', {
 *   base: 'px-4 py-2 rounded',
 *   variants: {
 *     color: {
 *       primary: 'bg-blue-500 text-white',
 *       secondary: 'bg-gray-500 text-white'
 *     },
 *     size: {
 *       sm: 'text-sm',
 *       lg: 'text-lg'
 *     }
 *   },
 *   defaultVariants: {
 *     color: 'primary',
 *     size: 'sm'
 *   }
 * })
 * 
 * // Type-safe usage
 * button({ color: 'primary', size: 'lg' }) // ✅ OK
 * button({ color: 'invalid' }) // ❌ Type error
 * ```
 */
export function twsxVariants<V extends Variants>(
  className: string,
  config: VariantConfig<V>
): VariantFunction<V>;

/**
 * ============================================================================
 * CONFIGURATION TYPES
 * ============================================================================
 */

/**
 * Theme color definition
 */
export type ThemeColor = string | Record<string, string>;

/**
 * Theme extension
 */
export interface ThemeExtension {
  colors?: Record<string, ThemeColor>;
  spacing?: Record<string, string>;
  borderRadius?: Record<string, string>;
  fontSize?: Record<string, string | [string, string | { lineHeight?: string; letterSpacing?: string }]>;
  fontFamily?: Record<string, string | string[]>;
  fontWeight?: Record<string, string | number>;
  lineHeight?: Record<string, string>;
  letterSpacing?: Record<string, string>;
  boxShadow?: Record<string, string>;
  zIndex?: Record<string, string | number>;
  [key: string]: any;
}

/**
 * Tailwind configuration
 */
export interface TailwindConfig {
  theme?: {
    extend?: ThemeExtension;
    colors?: Record<string, ThemeColor>;
    spacing?: Record<string, string>;
    [key: string]: any;
  };
  plugins?: Plugin[];
  corePlugins?: Record<string, boolean> | string[];
  prefix?: string;
}

/**
 * Configure Tailwind theme
 * 
 * @param config - Theme configuration
 * 
 * @example
 * ```ts
 * configure({
 *   theme: {
 *     extend: {
 *       colors: {
 *         brand: {
 *           500: '#3b82f6',
 *           600: '#2563eb'
 *         }
 *       }
 *     }
 *   }
 * })
 * ```
 */
export function configure(config: TailwindConfig): void;

/**
 * Clear configuration cache
 */
export function clearConfigCache(): void;

/**
 * ============================================================================
 * CACHE MANAGEMENT TYPES
 * ============================================================================
 */

/**
 * Cache statistics
 */
export interface CacheStats {
  hits: number;
  misses: number;
  invalidations: number;
  sizes: {
    injectedKeyframes: number;
    twsxInputCache: number;
    twsxVariantsResultCache: number;
    configOptionsCache: number;
    cssResolutionCache: number;
    encodeBracketCache: number;
    decodeBracketCache: number;
    parseSelectorCache: number;
    injectedCssHashSet: number;
  };
}

/**
 * Cache size limits
 */
export interface CacheLimits {
  configOptions?: number;
  cssResolution?: number;
  encodeBracket?: number;
  decodeBracket?: number;
  parseSelector?: number;
}

/**
 * Cache Manager class
 */
export class CacheManager {
  /**
   * Clear all caches
   */
  clearAll(): void;
  
  /**
   * Clear config-related caches
   */
  clearConfigCache(): void;
  
  /**
   * Clear CSS-related caches
   */
  clearCssCache(): void;
  
  /**
   * Get cache statistics
   */
  getStats(): CacheStats;
  
  /**
   * Log cache statistics
   */
  logStats(): void;
  
  /**
   * Set cache size limits
   */
  setLimits(limits: CacheLimits): void;
  
  /**
   * Track cache hit
   */
  trackHit(): void;
  
  /**
   * Track cache miss
   */
  trackMiss(): void;
  
  /**
   * Get cache hit rate percentage
   */
  getHitRate(): number;
}

/**
 * Singleton cache manager instance
 */
export const cacheManager: CacheManager;

/**
 * Debug cache state
 */
export function debugCache(): void;

/**
 * ============================================================================
 * LOGGER TYPES
 * ============================================================================
 */

/**
 * Log levels
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';

/**
 * Logger class
 */
export class Logger {
  constructor(level?: LogLevel);
  
  /**
   * Set log level
   */
  setLevel(level: LogLevel): void;
  
  /**
   * Get current log level
   */
  getLevel(): LogLevel;
  
  /**
   * Log debug message
   */
  debug(message: string, ...args: any[]): void;
  
  /**
   * Log info message
   */
  info(message: string, ...args: any[]): void;
  
  /**
   * Log warning message
   */
  warn(message: string, ...args: any[]): void;
  
  /**
   * Log error message
   */
  error(message: string, ...args: any[]): void;
}

/**
 * Singleton logger instance
 */
export const logger: Logger;

/**
 * ============================================================================
 * PLUGIN SYSTEM TYPES
 * ============================================================================
 */

/**
 * Plugin definition
 */
export interface Plugin {
  name: string;
  type: 'utility' | 'component';
  utilities?: Record<string, string | Record<string, string>>;
  components?: Record<string, string | Record<string, string>>;
  handler?: (config: any) => void;
}

/**
 * Utility plugin configuration
 */
export interface UtilityPluginConfig {
  prefix?: string;
  values?: Record<string, any>;
  respectPrefix?: boolean;
  respectImportant?: boolean;
}

/**
 * Create utility plugin
 */
export function plugin(
  name: string,
  utilities: Record<string, string>,
  config?: UtilityPluginConfig
): Plugin;

/**
 * ============================================================================
 * UTILITY TYPES
 * ============================================================================
 */

/**
 * LRU Cache class
 */
export class LRUCache<K = any, V = any> {
  constructor(maxSize?: number);
  get(key: K): V | undefined;
  set(key: K, value: V): void;
  has(key: K): boolean;
  clear(): void;
  delete(key: K): boolean;
  readonly size: number;
}

/**
 * Custom error class
 */
export class TwsError extends Error {
  constructor(message: string, context?: Record<string, any>);
  context: Record<string, any>;
  timestamp: string;
}

/**
 * Error handler
 */
export function handleError(error: Error, context?: Record<string, any>): TwsError;

/**
 * Register error handler
 */
export function onError(handler: (error: TwsError) => void): () => void;

/**
 * ============================================================================
 * PERFORMANCE MONITORING TYPES
 * ============================================================================
 */

/**
 * Performance marker
 */
export interface PerformanceMarker {
  label: string;
  startTime: number;
}

/**
 * Performance monitor
 */
export interface PerformanceMonitor {
  enabled: boolean;
  start(label: string): PerformanceMarker | null;
  end(marker: PerformanceMarker | null): void;
  measure<T>(fn: () => T, label: string): T;
}

export const performanceMonitor: PerformanceMonitor;

/**
 * ============================================================================
 * RE-EXPORTS FOR CONVENIENCE
 * ============================================================================
 */

export {
  // Core
  tws as default,
  twsx,
  twsxVariants,
  configure,
  
  // Cache
  clearConfigCache,
  cacheManager,
  debugCache,
  
  // Logger
  logger,
  
  // Performance
  performanceMonitor,
  
  // Utilities
  LRUCache,
  handleError,
  onError,
};
