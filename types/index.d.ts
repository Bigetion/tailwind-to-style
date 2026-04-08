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

// ============================================================================
// Type Inference Utilities
// ============================================================================

/**
 * Infer variant props from a variant function or config.
 * Use this when you need to type component props based on your variants.
 * 
 * @example
 * const button = twsxVariants('.btn', {
 *   variants: {
 *     size: { sm: 'text-sm', lg: 'text-lg' },
 *     variant: { primary: 'bg-blue-500', secondary: 'bg-gray-200' }
 *   }
 * });
 * 
 * // Extract props type
 * type ButtonProps = InferVariantProps<typeof button>;
 * // Result: { size?: 'sm' | 'lg'; variant?: 'primary' | 'secondary' }
 */
export type InferVariantProps<T> = T extends VariantFunction<infer V>
  ? VariantProps<V>
  : T extends TwsxClassNameVariantFunction<infer V>
  ? TwsxClassNameVariantProps<V>
  : T extends TwsxVariantsConfig<infer V>
  ? VariantProps<V>
  : T extends TwsxClassNameVariantsConfig<infer V>
  ? TwsxClassNameVariantProps<V>
  : never;

/**
 * Infer slot names from a slots function.
 * 
 * @example
 * const card = twsxClassName({
 *   slots: { root: 'card', header: 'card-header', body: 'card-body' },
 *   variants: {}
 * });
 * 
 * type CardSlots = InferSlotNames<typeof card>;
 * // Result: 'root' | 'header' | 'body'
 */
export type InferSlotNames<T> = T extends TwsxClassNameSlotsFunction<infer S, any>
  ? keyof S
  : never;

/**
 * Extract variant names from a variants definition.
 * 
 * @example
 * const config = {
 *   variants: { size: { sm: '...', lg: '...' }, variant: { primary: '...' } }
 * };
 * type VariantNames = ExtractVariantNames<typeof config>;
 * // Result: 'size' | 'variant'
 */
export type ExtractVariantNames<T extends { variants?: VariantsDefinition }> = 
  T['variants'] extends VariantsDefinition ? keyof T['variants'] : never;

/**
 * Extract variant options for a specific variant.
 * 
 * @example
 * const config = {
 *   variants: { size: { sm: '...', md: '...', lg: '...' } }
 * };
 * type SizeOptions = ExtractVariantOptions<typeof config, 'size'>;
 * // Result: 'sm' | 'md' | 'lg'
 */
export type ExtractVariantOptions<
  T extends { variants?: VariantsDefinition },
  K extends keyof NonNullable<T['variants']>
> = T['variants'] extends VariantsDefinition
  ? keyof T['variants'][K]
  : never;

/**
 * Make all variant props required.
 * Useful when you want to enforce all variants are specified.
 */
export type RequiredVariantProps<V extends VariantsDefinition> = {
  [K in keyof V]: keyof V[K];
};

/**
 * Pick only specific variants from props.
 */
export type PickVariantProps<V extends VariantsDefinition, K extends keyof V> = {
  [P in K]?: keyof V[P];
};

/**
 * Omit specific variants from props.
 */
export type OmitVariantProps<V extends VariantsDefinition, K extends keyof V> = {
  [P in Exclude<keyof V, K>]?: keyof V[P];
};

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

// ============================================================================
// twsxClassName - Advanced Unified CSS-in-JS API
// ============================================================================

/**
 * Pseudo-class shorthands for twsxClassName
 */
export type PseudoShorthand =
  | "hover" | "focus" | "active" | "disabled" | "visited" | "checked"
  | "required" | "invalid" | "valid" | "empty" | "enabled" | "indeterminate"
  | "focus-within" | "focus-visible" | "first" | "last" | "odd" | "even"
  | "first-of-type" | "last-of-type" | "only" | "only-of-type"
  | "placeholder" | "before" | "after" | "selection" | "marker" | "file" | "backdrop"
  // Dark/Light mode
  | "dark" | "light"
  // Motion preferences
  | "motion-safe" | "motion-reduce"
  // Print
  | "print"
  // Contrast
  | "contrast-more" | "contrast-less"
  // Orientation
  | "portrait" | "landscape";

/**
 * Group/Peer state shorthands
 */
export type GroupPeerState =
  | "group-hover" | "group-focus" | "group-active" | "group-focus-within"
  | "group-focus-visible" | "group-disabled" | "group-checked" | "group-invalid" | "group-required"
  | "peer-hover" | "peer-focus" | "peer-active" | "peer-focus-within"
  | "peer-focus-visible" | "peer-disabled" | "peer-checked" | "peer-invalid"
  | "peer-required" | "peer-placeholder-shown";

/**
 * Responsive breakpoint shorthands
 */
export type ResponsiveBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Animation preset names
 */
export type AnimationPreset =
  | "fadeIn" | "fadeOut" | "slideInUp" | "slideInDown" | "slideInLeft" | "slideInRight"
  | "scaleIn" | "scaleOut" | "bounce" | "pulse" | "spin" | "ping" | "shake";

/**
 * Custom animation configuration
 */
export interface AnimationConfig {
  keyframes: Record<string, string>;
  duration?: string;
  timing?: string;
  delay?: string;
  iteration?: string | number;
}

/**
 * Design tokens structure
 */
export interface DesignTokens {
  colors?: Record<string, string | Record<string, string>>;
  spacing?: Record<string, string>;
  fontSize?: Record<string, string>;
  fontWeight?: Record<string, string>;
  borderRadius?: Record<string, string>;
  shadow?: Record<string, string>;
  animation?: Record<string, AnimationConfig>;
  custom?: Record<string, string>;
}

/**
 * Theme tokens
 */
export interface ThemeTokens {
  [key: string]: string | Record<string, string>;
}

/**
 * Basic twsxClassName config (returns className string)
 */
export interface TwsxClassNameBasicConfig {
  /** Base Tailwind classes */
  _?: string;
  /** Component name (for readable className) */
  name?: string;
  /** Custom prefix (default: "twsx") */
  prefix?: string;
  /** Include hash in className (default: true) */
  hash?: boolean;
  /** Hash length (default: 8) */
  hashLength?: number;
  /** Auto-inject CSS to DOM (default: true) */
  inject?: boolean;
  /** Extend from another twsxClassName config */
  extend?: TwsxClassNameVariantFunction<any> | TwsxClassNameBasicConfig;
  /** Animation preset or custom config */
  animation?: AnimationPreset | AnimationConfig;
  /** Enter transition classes */
  enter?: string;
  /** Enter from state */
  enterFrom?: string;
  /** Enter to state */
  enterTo?: string;
  /** Exit/leave transition classes */
  exit?: string;
  /** Leave from state */
  leaveFrom?: string;
  /** Leave to state */
  leaveTo?: string;
  /** Pseudo-class shorthands, responsive, and custom selectors */
  [key: string]: string | TwsxClassNameBasicConfig | AnimationPreset | AnimationConfig | boolean | number | undefined | any;
}

/**
 * Variant value - string classes or nested object with pseudo states
 */
export type TwsxClassNameVariantValue = string | {
  _?: string;
  [key: string]: string | undefined;
};

/**
 * Variants definition for twsxClassName
 */
export interface TwsxClassNameVariantsDefinition {
  [variantName: string]: {
    [optionKey: string]: TwsxClassNameVariantValue;
  };
}

/**
 * Compound variant for twsxClassName
 */
export interface TwsxClassNameCompoundVariant<V extends TwsxClassNameVariantsDefinition = TwsxClassNameVariantsDefinition> {
  class?: string;
  className?: string;
  [K: string]: string | string[] | boolean | undefined;
}

/**
 * Responsive variant value - allows different values per breakpoint
 */
export type ResponsiveVariantValue<T> = T | {
  initial?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
};

/**
 * twsxClassName variants config
 */
export interface TwsxClassNameVariantsConfig<V extends TwsxClassNameVariantsDefinition = TwsxClassNameVariantsDefinition> {
  /** Component name */
  name?: string;
  /** Custom prefix */
  prefix?: string;
  /** Include hash */
  hash?: boolean;
  /** Hash length */
  hashLength?: number;
  /** Auto-inject CSS */
  inject?: boolean;
  /** Extend from another config */
  extend?: TwsxClassNameVariantFunction<any> | TwsxClassNameVariantsConfig<any>;
  /** Base Tailwind classes or nested object */
  base?: string | { _?: string; [key: string]: string | undefined };
  /** Variant definitions */
  variants: V;
  /** Compound variants */
  compoundVariants?: TwsxClassNameCompoundVariant<V>[];
  /** Default variant values */
  defaultVariants?: { [K in keyof V]?: keyof V[K] | boolean };
  /** Enable responsive variants for specified variant keys */
  responsiveVariants?: (keyof V)[];
}

/**
 * Slots definition for multi-part components
 */
export interface TwsxClassNameSlotsDefinition {
  [slotName: string]: string | { _?: string; [key: string]: string | undefined };
}

/**
 * twsxClassName slots config
 */
export interface TwsxClassNameSlotsConfig<
  S extends TwsxClassNameSlotsDefinition = TwsxClassNameSlotsDefinition,
  V extends TwsxClassNameVariantsDefinition = TwsxClassNameVariantsDefinition
> {
  /** Component name */
  name?: string;
  /** Custom prefix */
  prefix?: string;
  /** Include hash */
  hash?: boolean;
  /** Hash length */
  hashLength?: number;
  /** Auto-inject CSS */
  inject?: boolean;
  /** Extend from another config */
  extend?: TwsxClassNameSlotsFunction<any, any>;
  /** Slot definitions */
  slots: S;
  /** Variant definitions (with slot-specific styles) */
  variants?: V;
  /** Compound variants */
  compoundVariants?: TwsxClassNameCompoundVariant<V>[];
  /** Default variant values */
  defaultVariants?: { [K in keyof V]?: keyof V[K] | boolean };
}

/**
 * Variant props with responsive support
 */
export type TwsxClassNameVariantProps<V extends TwsxClassNameVariantsDefinition> = {
  [K in keyof V]?: keyof V[K] | boolean | ResponsiveVariantValue<keyof V[K]>;
};

/**
 * Variant selector function return type
 */
export interface TwsxClassNameVariantFunction<V extends TwsxClassNameVariantsDefinition> {
  (props?: TwsxClassNameVariantProps<V>): string;
  /** Merge with additional classes */
  merge(props?: TwsxClassNameVariantProps<V>, ...additionalClasses: ClassValue[]): string;
  merge(...additionalClasses: ClassValue[]): string;
  /** Get raw config */
  raw(): TwsxClassNameVariantsConfig<V>;
}

/**
 * Slots generator function return type
 */
export interface TwsxClassNameSlotsFunction<
  S extends TwsxClassNameSlotsDefinition,
  V extends TwsxClassNameVariantsDefinition
> {
  (props?: TwsxClassNameVariantProps<V>): { [K in keyof S]: string };
  /** Merge with additional classes per slot */
  merge(props?: TwsxClassNameVariantProps<V>, slotOverrides?: Partial<{ [K in keyof S]: string }>): { [K in keyof S]: string };
  /** Get raw config */
  raw(): TwsxClassNameSlotsConfig<S, V>;
}

/**
 * Global configuration options
 */
export interface TwsxClassNameGlobalConfig {
  /** Default prefix (default: "twsx") */
  prefix?: string;
  /** Include hash by default (default: true) */
  hash?: boolean;
  /** Default hash length (default: 8) */
  hashLength?: number;
  /** Auto-inject CSS by default (default: true) */
  inject?: boolean;
  /** Deduplication (default: true) */
  deduplicate?: boolean;
  /** Custom breakpoints */
  breakpoints?: Record<string, string>;
}

/**
 * Unified CSS-in-JS API with smart mode detection.
 *
 * @example
 * // Basic mode - returns className string
 * const btn = twsxClassName({ _: 'bg-blue-500 p-4', hover: 'bg-blue-600' })
 *
 * // With dark mode
 * const card = twsxClassName({ _: 'bg-white', dark: 'bg-gray-900' })
 *
 * // With group/peer states
 * const icon = twsxClassName({ _: 'opacity-0', 'group-hover': 'opacity-100' })
 *
 * // Variants mode with boolean variants
 * const btn = twsxClassName({
 *   base: 'px-4 py-2',
 *   variants: {
 *     disabled: { true: 'opacity-50', false: '' }
 *   }
 * })
 * btn({ disabled: true })
 *
 * // Responsive variants
 * const btn = twsxClassName({
 *   variants: { size: { sm: '...', lg: '...' } },
 *   responsiveVariants: ['size']
 * })
 * btn({ size: { initial: 'sm', md: 'lg' } })
 *
 * // With design tokens
 * twsxClassName.defineTokens({ colors: { primary: '#3b82f6' } })
 * const btn = twsxClassName({ _: 'bg-$colors.primary' })
 *
 * // Extend existing config
 * const primaryBtn = twsxClassName.extend(btn, { _: 'text-white' })
 */
export function twsxClassName(config: TwsxClassNameBasicConfig): string;
export function twsxClassName(name: string, config: TwsxClassNameBasicConfig): string;
export function twsxClassName<V extends TwsxClassNameVariantsDefinition>(
  config: TwsxClassNameVariantsConfig<V>
): TwsxClassNameVariantFunction<V>;
export function twsxClassName<
  S extends TwsxClassNameSlotsDefinition,
  V extends TwsxClassNameVariantsDefinition
>(
  config: TwsxClassNameSlotsConfig<S, V>
): TwsxClassNameSlotsFunction<S, V>;

export namespace twsxClassName {
  /**
   * Configure global settings
   */
  function config(options: TwsxClassNameGlobalConfig): TwsxClassNameGlobalConfig;

  /**
   * Get current configuration
   */
  function getConfig(): TwsxClassNameGlobalConfig;

  /**
   * Extend an existing twsxClassName config
   */
  function extend<V extends TwsxClassNameVariantsDefinition>(
    base: TwsxClassNameVariantFunction<V> | TwsxClassNameVariantsConfig<V>,
    extension: Partial<TwsxClassNameVariantsConfig<V>>
  ): TwsxClassNameVariantFunction<V>;

  /**
   * Define design tokens
   */
  function defineTokens(tokens: DesignTokens): DesignTokens;

  /**
   * Get all defined tokens
   */
  function getTokens(): DesignTokens;

  /**
   * Set a single token value
   */
  function setToken(path: string, value: string): void;

  /**
   * Create a named theme
   */
  function createTheme(name: string, tokens: ThemeTokens): ThemeTokens;

  /**
   * Set the active theme
   */
  function setTheme(name: string): string;

  /**
   * Get the active theme name
   */
  function getTheme(): string;

  /**
   * Get all defined themes
   */
  function getThemes(): Record<string, ThemeTokens>;

  /**
   * Define a custom animation preset
   */
  function defineAnimation(name: string, animation: AnimationConfig): void;

  /**
   * Get all animation presets
   */
  function getAnimations(): Record<string, AnimationConfig>;

  /**
   * Clear all caches
   */
  function clearCache(): void;

  /**
   * Get cache statistics
   */
  function getCacheStats(): {
    classNameCacheSize: number;
    cssCacheSize: number;
    styleRegistrySize: number;
  };

  /**
   * Get generated CSS for a className (useful for SSR)
   */
  function getCSS(className: string): string;

  /**
   * Get all generated CSS (useful for SSR)
   */
  function getAllCSS(): string;

  /**
   * Extract CSS as a style tag string (for SSR)
   */
  function extractCSS(): string;

  /**
   * Merge multiple class values (alias for cx)
   */
  function merge(...args: ClassValue[]): string;

  /**
   * Compose multiple configs into one
   */
  function compose<V extends TwsxClassNameVariantsDefinition>(
    ...configs: (TwsxClassNameVariantFunction<any> | TwsxClassNameVariantsConfig<any>)[]
  ): TwsxClassNameVariantsConfig<V>;

  /**
   * Atomic CSS class generator.
   * Generates reusable atomic CSS classes from Tailwind utilities.
   * Unlike tws() which returns inline styles, tw() returns class names
   * with auto-injected CSS that supports pseudo-classes and responsive.
   *
   * @example
   * tw('flex gap-3')
   * // → "tw-flex tw-gap-3"
   *
   * tw('hover:bg-blue-500 md:flex-row')
   * // → "tw-hover-bg-blue-500 tw-md-flex-row"
   *
   * // Usage in templates
   * <div class="${tw('flex gap-3 hover:bg-gray-100')}">
   */
  function tw(classString: string): string;
}

// ============================================================================
// tw() - Atomic CSS Class Generator (standalone export)
// ============================================================================

/**
 * Atomic CSS class generator.
 * Generates reusable atomic CSS classes from Tailwind utilities.
 * Unlike tws() which returns inline styles, tw() returns class names
 * with auto-injected CSS that supports pseudo-classes and responsive breakpoints.
 *
 * @param classString - Space-separated Tailwind utility classes
 * @returns Space-separated atomic class names (e.g., "tw-flex tw-gap-3")
 *
 * @example
 * // Basic usage
 * tw('flex gap-3 items-center')
 * // → "tw-flex tw-gap-3 tw-items-center"
 *
 * // With pseudo-classes (unlike tws, these work!)
 * tw('bg-gray-100 hover:bg-gray-200 focus:ring-2')
 * // → "tw-bg-gray-100 tw-hover-bg-gray-200 tw-focus-ring-2"
 *
 * // With responsive breakpoints
 * tw('flex flex-col md:flex-row lg:gap-8')
 * // → "tw-flex tw-flex-col tw-md-flex-row tw-lg-gap-8"
 *
 * // Combined modifiers
 * tw('md:hover:bg-blue-500')
 * // → "tw-md-hover-bg-blue-500"
 *
 * // In HTML/JSX
 * <div class={tw('flex gap-3 hover:bg-gray-100')}>...</div>
 */
export function tw(classString: string): string;

// ============================================================================
// SSR Collector (Modern API)
// ============================================================================

/**
 * SSR Collector options
 */
export interface SSRCollectorOptions {
  /** Enable CSS deduplication (default: true) */
  dedupe?: boolean;
  /** Enable CSS minification (default: false) */
  minify?: boolean;
  /** Sort CSS by specificity (default: true) */
  sort?: boolean;
}

/**
 * Extract options for SSR
 */
export interface SSRExtractOptions {
  /** Style tag ID (default: "twsx-ssr") */
  id?: string;
  /** CSP nonce value */
  nonce?: string;
  /** Minify output CSS */
  minify?: boolean;
}

/**
 * Critical CSS extraction result
 */
export interface SSRCriticalResult {
  /** Critical CSS wrapped in style tag */
  critical: string;
  /** Remaining non-critical CSS */
  rest: string;
  /** Extraction statistics */
  stats: {
    criticalSize: number;
    criticalCount: number;
    totalCount: number;
  };
}

/**
 * SSR statistics
 */
export interface SSRStats {
  ruleCount: number;
  uniqueCount: number;
  totalSize: number;
  minifiedSize: number;
}

/**
 * SSR Collector instance
 */
export interface SSRCollector {
  /** Check if currently collecting */
  readonly isCollecting: boolean;
  /** Get collected CSS rule count */
  readonly count: number;
  /** Get unique CSS rule count */
  readonly uniqueCount: number;

  /** Peek at collected CSS without stopping */
  peek(): string;
  /** Extract CSS as raw string and stop collecting */
  extractRaw(options?: { shouldMinify?: boolean }): string;
  /** Extract CSS wrapped in <style> tag and stop collecting */
  extract(options?: SSRExtractOptions): string;
  /** Extract critical CSS (above-the-fold) */
  extractCritical(options?: { maxSize?: number; nonce?: string; id?: string }): SSRCriticalResult;
  /** Clear collected CSS and optionally restart */
  clear(restart?: boolean): void;
  /** Get collection statistics */
  getStats(): SSRStats;
  /** @internal Add CSS to collection */
  _collect(css: string): void;
}

/**
 * Create an SSR collector for collecting CSS during server-side rendering.
 * 
 * @example
 * const ssr = createSSRCollector({ dedupe: true, minify: true })
 * const html = renderToString(<App />)
 * const css = ssr.extract()
 * 
 * // With critical CSS extraction
 * const { critical, rest } = ssr.extractCritical({ maxSize: 14000 })
 */
export function createSSRCollector(options?: SSRCollectorOptions): SSRCollector;

// ============================================================================
// Animation System (Unified API)
// ============================================================================

/**
 * Animation keyframe definition
 */
export interface AnimationKeyframe {
  [property: string]: string | number;
}

/**
 * Animation options (Web Animations API compatible)
 */
export interface AnimationOptions {
  duration?: number;
  easing?: string;
  delay?: number;
  iterations?: number | "infinite";
  fill?: "none" | "forwards" | "backwards" | "both" | "auto";
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
  /** Called when animation starts */
  onStart?: (animation: Animation) => void;
  /** Called when animation completes */
  onComplete?: (animation: Animation) => void;
  /** Called when animation is cancelled */
  onCancel?: (animation: Animation) => void;
  /** Custom animation ID */
  id?: string;
}

/**
 * Animation preset configuration
 */
export interface AnimationPresetConfig {
  keyframes: AnimationKeyframe[];
  options: AnimationOptions;
}

/**
 * Animation controller returned by animate()
 */
export interface AnimationController {
  /** Animation ID */
  readonly id: string | null;
  /** Native Animation object */
  readonly animation: Animation | null;
  /** Current play state */
  readonly playState: AnimationPlayState;
  /** Current time in milliseconds */
  currentTime: number;
  /** Promise that resolves when animation finishes */
  readonly finished: Promise<Animation>;
  /** Whether animation is pending */
  readonly pending: boolean;

  /** Play the animation */
  play(): AnimationController;
  /** Pause the animation */
  pause(): AnimationController;
  /** Cancel the animation */
  cancel(): AnimationController;
  /** Finish the animation immediately */
  finish(): AnimationController;
  /** Reverse the animation */
  reverse(): AnimationController;
  /** Seek to specific progress (0-1) */
  seek(progress: number): AnimationController;
  /** Set playback speed */
  setSpeed(rate: number): AnimationController;
  /** Replay animation from start */
  replay(): AnimationController;
  /** Promise interface */
  then<T>(resolve?: (value: Animation) => T, reject?: (reason: any) => T): Promise<T>;
}

/**
 * Chain controller for sequential animations
 */
export interface ChainController {
  /** Current step index */
  readonly currentStep: number;
  /** Total number of steps */
  readonly totalSteps: number;
  /** Progress (0-1) */
  readonly progress: number;
  /** Cancel the chain */
  cancel(): void;
  /** Promise that resolves when chain completes */
  readonly finished: Promise<void>;
  then<T>(resolve?: () => T, reject?: (reason: any) => T): Promise<T>;
}

/**
 * Stagger controller for parallel staggered animations
 */
export interface StaggerController {
  /** Individual animation controllers */
  readonly controllers: AnimationController[];
  /** Number of elements */
  readonly count: number;
  /** Cancel all animations */
  cancelAll(): StaggerController;
  /** Pause all animations */
  pauseAll(): StaggerController;
  /** Play all animations */
  playAll(): StaggerController;
  /** Reverse all animations */
  reverseAll(): StaggerController;
  /** Set speed for all animations */
  setSpeedAll(rate: number): StaggerController;
  /** Wait for all animations to complete */
  waitAll(): Promise<void>;
  then<T>(resolve?: () => T, reject?: (reason: any) => T): Promise<T>;
}

/**
 * Stagger options
 */
export interface StaggerOptions extends AnimationOptions {
  /** Delay between each element (default: 50ms) */
  delay?: number;
  /** Direction to start stagger */
  from?: "start" | "end" | "center" | "random";
  /** Called for each element */
  onEach?: (index: number, element: HTMLElement) => void;
  /** Called when all animations complete */
  onAllComplete?: () => void;
}

/**
 * Chain animation item
 */
export type ChainAnimationItem = 
  | string 
  | { name: string; delay?: number; options?: AnimationOptions };

/**
 * Animation preset names
 */
export type AnimationPresetName =
  | "fadeIn" | "fadeOut"
  | "slideUp" | "slideDown" | "slideLeft" | "slideRight"
  | "zoomIn" | "zoomOut"
  | "bounce" | "shake" | "pulse" | "spin"
  | "flipX" | "flipY"
  | "enterScale" | "exitScale"
  | "wiggle" | "heartbeat";

/**
 * Easing preset names
 */
export type EasingPresetName =
  | "linear" | "ease" | "easeIn" | "easeOut" | "easeInOut"
  | "spring" | "springLight" | "springMedium" | "springHeavy"
  | "smooth" | "smoothIn" | "smoothOut"
  | "bounce" | "elastic"
  | "anticipate" | "overshoot";

/**
 * Animation presets object
 */
export const ANIMATION_PRESETS: Record<AnimationPresetName, AnimationPresetConfig>;

/**
 * Easing presets object
 */
export const EASING: Record<EasingPresetName, string>;

/**
 * Apply animation to an element
 * 
 * @example
 * // Using preset
 * const ctrl = animate(element, 'fadeIn')
 * 
 * // With options
 * animate(element, 'slideUp', { duration: 600, easing: 'spring' })
 * 
 * // With callbacks
 * animate(element, 'bounce', {
 *   onComplete: () => console.log('done!')
 * })
 * 
 * // Control animation
 * ctrl.pause()
 * ctrl.reverse()
 * await ctrl.finished
 */
export function animate(
  element: HTMLElement,
  animation: AnimationPresetName | { keyframes: AnimationKeyframe[]; options?: AnimationOptions },
  options?: AnimationOptions
): AnimationController;

/**
 * Chain multiple animations sequentially
 * 
 * @example
 * await chain(element, ['fadeIn', 'pulse', 'fadeOut'])
 * 
 * // With delays
 * chain(element, [
 *   'fadeIn',
 *   { name: 'pulse', delay: 100 },
 *   'fadeOut'
 * ])
 */
export function chain(
  element: HTMLElement,
  animations: ChainAnimationItem[],
  options?: { onStepComplete?: (step: number, name: string) => void; onComplete?: () => void; onCancel?: (step: number) => void }
): ChainController;

/**
 * Apply staggered animation to multiple elements
 * 
 * @example
 * // Basic stagger
 * stagger(listItems, 'slideUp', { delay: 50 })
 * 
 * // Wait for all
 * await stagger(items, 'fadeIn').waitAll()
 * 
 * // From center
 * stagger(items, 'zoomIn', { from: 'center' })
 */
export function stagger(
  elements: HTMLElement[] | NodeListOf<HTMLElement>,
  animation: AnimationPresetName | { keyframes: AnimationKeyframe[]; options?: AnimationOptions },
  options?: StaggerOptions
): StaggerController;

/**
 * Run multiple animations in parallel
 * 
 * @example
 * await parallel([
 *   { element: el1, animation: 'fadeIn' },
 *   { element: el2, animation: 'slideUp' }
 * ])
 */
export function parallel(
  configs: Array<{ element: HTMLElement; animation: AnimationPresetName | AnimationPresetConfig; options?: AnimationOptions }>
): Promise<AnimationController[]>;

/**
 * Apply CSS transition to element
 * 
 * @example
 * await transition(element, { opacity: 0, transform: 'scale(0.9)' }, { duration: 300 })
 */
export function transition(
  element: HTMLElement,
  properties: Record<string, string | number>,
  options?: { duration?: number; easing?: string; delay?: number }
): Promise<void>;

/**
 * Create CSS keyframes and return animation CSS value
 * 
 * @example
 * const animation = createKeyframes('myAnim', {
 *   '0%': { opacity: 0 },
 *   '100%': { opacity: 1 }
 * })
 * // → "myAnim 500ms ease-out forwards"
 */
export function createKeyframes(
  name: string,
  frames: Record<string, Record<string, string | number>>,
  options?: { duration?: number; easing?: string; fill?: string; iterations?: number | "infinite"; inject?: boolean }
): string;

/**
 * Clear all injected keyframes from document
 */
export function clearKeyframes(): void;

/**
 * Cancel all active animations
 */
export function cancelAllAnimations(): void;

/**
 * Get count of currently active animations
 */
export function getActiveAnimationCount(): number;

/**
 * Register a custom animation preset
 * 
 * @example
 * registerPreset('myFade', {
 *   keyframes: [{ opacity: 0 }, { opacity: 1 }],
 *   options: { duration: 400 }
 * })
 */
export function registerPreset(name: string, config: AnimationPresetConfig): void;

/**
 * Get all available preset names
 */
export function getPresetNames(): string[];

/**
 * Check if Web Animations API is supported
 */
export function isAnimationSupported(): boolean;

// Default export (if needed)
declare const tailwindToStyle: {
  tws: typeof tws;
  twsx: typeof twsx;
  twsxVariants: typeof twsxVariants;
  twsxClassName: typeof twsxClassName;
  tw: typeof tw;
  debouncedTws: typeof debouncedTws;
  debouncedTwsx: typeof debouncedTwsx;
  performanceUtils: typeof performanceUtils;
  // SSR
  createSSRCollector: typeof createSSRCollector;
  // Animation
  animate: typeof animate;
  chain: typeof chain;
  stagger: typeof stagger;
  parallel: typeof parallel;
  transition: typeof transition;
  createKeyframes: typeof createKeyframes;
  ANIMATION_PRESETS: typeof ANIMATION_PRESETS;
  EASING: typeof EASING;
};

export default tailwindToStyle;
