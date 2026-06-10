// Type definitions for tailwind-to-style v4
// Unified API type declarations

// ============================================================================
// Core Types
// ============================================================================

type ClassValue = string | number | boolean | null | undefined | ClassObject | ClassArray;
type ClassObject = Record<string, any>;
type ClassArray = ClassValue[];

// ============================================================================
// tw() — The Main Function
// ============================================================================

/**
 * Variants definition for tw()
 */
interface TwVariantsDefinition {
  [variantName: string]: {
    [optionKey: string]: string | { _?: string; [key: string]: string | undefined };
  };
}

/**
 * Variant props inferred from definition
 */
type TwVariantProps<V extends TwVariantsDefinition> = {
  [K in keyof V]?: keyof V[K] | boolean;
};

/**
 * Variant selector function returned by tw() in Mode 3
 */
interface TwVariantFunction<V extends TwVariantsDefinition> {
  (props?: TwVariantProps<V>): string;
  merge(props?: TwVariantProps<V>, ...additionalClasses: ClassValue[]): string;
  merge(...additionalClasses: ClassValue[]): string;
  raw(): TwVariantsConfig<V>;
}

/**
 * Slots definition for tw()
 */
interface TwSlotsDefinition {
  [slotName: string]: string | { _?: string; [key: string]: string | undefined };
}

/**
 * Slots function returned by tw() in Mode 4
 */
interface TwSlotsFunction<S extends TwSlotsDefinition, V extends TwVariantsDefinition> {
  (props?: TwVariantProps<V>): { [K in keyof S]: string };
  merge(props?: TwVariantProps<V>, slotOverrides?: Partial<{ [K in keyof S]: string }>): { [K in keyof S]: string };
  raw(): TwSlotsConfig<S, V>;
}

/**
 * Config for tw() Mode 3 (variants)
 */
interface TwVariantsConfig<V extends TwVariantsDefinition = TwVariantsDefinition> {
  name?: string;
  base?: string | { _?: string; [key: string]: string | undefined };
  variants: V;
  compoundVariants?: Array<{ class?: string; className?: string; [key: string]: any }>;
  defaultVariants?: { [K in keyof V]?: keyof V[K] | boolean };
  responsiveVariants?: (keyof V)[];
  prefix?: string;
  hash?: boolean;
  hashLength?: number;
  inject?: boolean;
}

/**
 * Config for tw() Mode 4 (slots)
 */
interface TwSlotsConfig<
  S extends TwSlotsDefinition = TwSlotsDefinition,
  V extends TwVariantsDefinition = TwVariantsDefinition
> {
  name?: string;
  slots: S;
  variants?: V;
  compoundVariants?: Array<{ class?: string; className?: string; [key: string]: any }>;
  defaultVariants?: { [K in keyof V]?: keyof V[K] | boolean };
  prefix?: string;
  hash?: boolean;
  hashLength?: number;
  inject?: boolean;
}

/**
 * Config for tw() Mode 2 (named class — object form)
 */
interface TwBasicConfig {
  name?: string;
  _?: string;
  prefix?: string;
  hash?: boolean;
  hashLength?: number;
  inject?: boolean;
  [key: string]: any;
}

/**
 * The unified tw() function.
 */
interface TwFunction {
  /** Mode 1: String → atomic CSS classes */
  (classes: string): string;

  /** Mode 2: Named class → scoped className */
  (name: string, classes: string): string;

  /** Mode 3: Variants config → variant selector function */
  <V extends TwVariantsDefinition>(config: TwVariantsConfig<V>): TwVariantFunction<V>;

  /** Mode 4: Slots config → slots generator function */
  <S extends TwSlotsDefinition, V extends TwVariantsDefinition>(config: TwSlotsConfig<S, V>): TwSlotsFunction<S, V>;

  /** Mode 2/3/4: Generic object config */
  (config: TwBasicConfig): string;

  /** Extract all generated CSS (for SSR) */
  extractCSS(): string;

  /** Clear internal caches */
  clearCache(): void;

  /** Configure global settings */
  config(options: {
    prefix?: string;
    hash?: boolean;
    hashLength?: number;
    inject?: boolean;
    deduplicate?: boolean;
  }): void;
}

export declare const tw: TwFunction;

// ============================================================================
// tws() — Inline Style Converter
// ============================================================================

/**
 * Convert Tailwind classes to inline CSS string or JSON object.
 */
export declare function tws(classNames: string, convertToJson?: false): string;
export declare function tws(classNames: string, convertToJson: true): Record<string, string>;
export declare function tws(classNames: string, convertToJson?: boolean): string | Record<string, string>;

// ============================================================================
// cx() — Conditional Class Names
// ============================================================================

/**
 * Conditionally join class names.
 */
export declare function cx(...args: ClassValue[]): string;

export declare namespace cx {
  function with_(...baseArgs: ClassValue[]): (...args: ClassValue[]) => string;
  export { with_ as with };
}

// ============================================================================
// SSR
// ============================================================================

export interface SSRCollectorOptions {
  dedupe?: boolean;
  minify?: boolean;
  sort?: boolean;
}

export interface SSRCollector {
  extract(options?: { id?: string; nonce?: string; minify?: boolean }): string;
  getCSS(): string;
  getStyleTag(options?: { id?: string; nonce?: string }): string;
  reset(): void;
  stats(): { ruleCount: number; uniqueCount: number; totalSize: number };
}

export declare function createSSRCollector(options?: SSRCollectorOptions): SSRCollector;

// ============================================================================
// Default Export
// ============================================================================

export default tw;
