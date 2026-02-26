// Type definitions for tailwind-to-style/twsx-variants
// Tree-shakeable import: import { twsxVariants } from 'tailwind-to-style/twsx-variants'

/**
 * Variant option values - string Tailwind classes
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
 * Compound variant with class targeting
 */
export interface CompoundVariantWithClass<V extends VariantsDefinition = VariantsDefinition> {
  [K: string]: any;
  class?: string;
  className?: string;
}

/**
 * Default variants - ensures only valid variant keys and values
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
  /** Nested selectors for child elements */
  nested?: Record<string, string>;
}

/**
 * Variant function returned by twsxVariants
 */
export type VariantFunction<V extends VariantsDefinition = VariantsDefinition> = 
  (props?: Partial<VariantProps<V>>) => string;

/**
 * Create a variant-based style generator with full type safety
 */
export function twsxVariants<V extends VariantsDefinition>(
  className: string, 
  config?: TwsxVariantsConfig<V>
): VariantFunction<V>;

/**
 * Extract variant props type from a twsxVariants return value
 * 
 * @example
 * const button = twsxVariants('.btn', { variants: { size: { sm: '...', lg: '...' } } })
 * type ButtonProps = InferVariantProps<typeof button>
 * // → { size?: 'sm' | 'lg' }
 */
export type InferVariantProps<T extends VariantFunction<any>> = 
  T extends VariantFunction<infer V> ? Partial<VariantProps<V>> : never;
