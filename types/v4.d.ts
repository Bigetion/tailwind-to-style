// Type definitions for tailwind-to-style v4
// Unified API type declarations

// ============================================================================
// Core Types
// ============================================================================

type ClassValue = string | number | boolean | null | undefined | ClassObject | ClassArray;
type ClassObject = Record<string, any>;
type ClassArray = ClassValue[];

// ============================================================================
// Raw CSS Properties
// ============================================================================

/**
 * Standard CSS properties that can be used alongside Tailwind classes
 * in any tw() style config object. Both camelCase and kebab-case are accepted.
 */
export interface RawCSSProperties {
  // Box model
  width?: string | number; height?: string | number;
  minWidth?: string | number; minHeight?: string | number;
  maxWidth?: string | number; maxHeight?: string | number;
  "min-width"?: string | number; "min-height"?: string | number;
  "max-width"?: string | number; "max-height"?: string | number;
  margin?: string | number; padding?: string | number;
  marginTop?: string | number; marginRight?: string | number;
  marginBottom?: string | number; marginLeft?: string | number;
  paddingTop?: string | number; paddingRight?: string | number;
  paddingBottom?: string | number; paddingLeft?: string | number;
  boxSizing?: string; "box-sizing"?: string;
  // Display & positioning
  display?: string; position?: string; overflow?: string;
  overflowX?: string; overflowY?: string;
  top?: string | number; right?: string | number;
  bottom?: string | number; left?: string | number;
  zIndex?: string | number; "z-index"?: string | number;
  opacity?: string | number; visibility?: string; float?: string; clear?: string;
  // Flexbox
  flex?: string | number; flexGrow?: string | number; flexShrink?: string | number;
  flexBasis?: string | number; flexDirection?: string; flexWrap?: string;
  alignItems?: string; alignContent?: string; alignSelf?: string;
  justifyContent?: string; justifyItems?: string; justifySelf?: string;
  gap?: string | number; rowGap?: string | number; columnGap?: string | number;
  order?: string | number;
  "flex-direction"?: string; "flex-wrap"?: string;
  "align-items"?: string; "align-content"?: string; "align-self"?: string;
  "justify-content"?: string; "justify-items"?: string; "justify-self"?: string;
  // Grid
  grid?: string; gridTemplate?: string;
  gridTemplateColumns?: string; gridTemplateRows?: string; gridTemplateAreas?: string;
  gridColumn?: string; gridRow?: string; gridArea?: string;
  gridAutoFlow?: string; gridAutoColumns?: string; gridAutoRows?: string;
  "grid-template-columns"?: string; "grid-template-rows"?: string;
  "grid-column"?: string; "grid-row"?: string; "grid-area"?: string;
  // Typography
  color?: string; fontSize?: string | number; fontWeight?: string | number;
  fontFamily?: string; fontStyle?: string; lineHeight?: string | number;
  letterSpacing?: string | number; wordSpacing?: string | number;
  textAlign?: string; textDecoration?: string; textTransform?: string;
  textOverflow?: string; whiteSpace?: string; wordBreak?: string;
  textIndent?: string | number; verticalAlign?: string;
  "font-size"?: string | number; "font-weight"?: string | number;
  "font-family"?: string; "font-style"?: string; "line-height"?: string | number;
  "letter-spacing"?: string | number; "text-align"?: string;
  "text-decoration"?: string; "text-transform"?: string;
  "text-overflow"?: string; "white-space"?: string; "word-break"?: string;
  // Backgrounds
  background?: string; backgroundColor?: string; backgroundImage?: string;
  backgroundSize?: string; backgroundPosition?: string; backgroundRepeat?: string;
  backgroundAttachment?: string; backgroundOrigin?: string; backgroundClip?: string;
  "background-color"?: string; "background-image"?: string;
  "background-size"?: string; "background-position"?: string;
  // Borders
  border?: string; borderTop?: string; borderRight?: string;
  borderBottom?: string; borderLeft?: string;
  borderWidth?: string | number; borderStyle?: string; borderColor?: string;
  borderRadius?: string | number;
  "border-width"?: string | number; "border-style"?: string;
  "border-color"?: string; "border-radius"?: string | number;
  outline?: string; outlineWidth?: string | number; outlineStyle?: string;
  outlineColor?: string; outlineOffset?: string | number;
  // Transforms & transitions
  transform?: string; transformOrigin?: string; perspective?: string | number;
  transition?: string; transitionProperty?: string;
  transitionDuration?: string; transitionTimingFunction?: string; transitionDelay?: string;
  "transform-origin"?: string; "transition-property"?: string;
  "transition-duration"?: string; "transition-timing-function"?: string;
  // Effects
  boxShadow?: string; textShadow?: string; filter?: string;
  backdropFilter?: string; mixBlendMode?: string; isolation?: string;
  "box-shadow"?: string; "text-shadow"?: string;
  "backdrop-filter"?: string; "mix-blend-mode"?: string;
  // Object
  objectFit?: string; objectPosition?: string;
  "object-fit"?: string; "object-position"?: string;
  // SVG
  fill?: string; stroke?: string; strokeWidth?: string | number;
  "stroke-width"?: string | number;
  // Misc
  content?: string; cursor?: string; pointerEvents?: string;
  userSelect?: string; resize?: string; appearance?: string;
  willChange?: string; scrollBehavior?: string;
  caretColor?: string; clipPath?: string;
  "pointer-events"?: string; "user-select"?: string;
  "will-change"?: string; "scroll-behavior"?: string;
  "caret-color"?: string; "clip-path"?: string;
  // CSS custom properties
  [cssVar: `--${string}`]: string | number | undefined;
}

// ============================================================================
// Mixed Style Value — Tailwind + Raw CSS + Pseudo/Responsive shorthands
// ============================================================================

/**
 * A style value object that can contain:
 * - `tw` or `_`  → Tailwind utility classes (string)
 * - Any CSS property (camelCase or kebab-case) → raw CSS value
 * - Pseudo-class shorthands (`hover`, `focus`, `dark`, …) → nested style string
 * - Responsive breakpoints (`sm`, `md`, `lg`, …) → nested style string
 * - Nested selectors (`&:hover`, `.child`, …) → nested style string
 *
 * @example
 * tw({
 *   tw: 'flex items-center gap-2',   // Tailwind classes
 *   fontSize: '13px',                 // raw CSS
 *   lineHeight: 1.6,                  // raw CSS
 *   color: 'var(--text-primary)',     // raw CSS
 *   hover: 'bg-gray-50',             // pseudo shorthand
 *   md: 'flex-col',                  // responsive shorthand
 *   '&:focus-within': 'ring-2',      // nested selector
 * })
 */
export type MixedStyleValue = RawCSSProperties & {
  /** Tailwind utility classes for this selector (preferred, alias of `_`) */
  tw?: string;
  /** Tailwind utility classes for this selector (legacy alias) */
  _?: string;
  // Pseudo-class / state shorthands
  hover?: string | MixedStyleValue; focus?: string | MixedStyleValue;
  active?: string | MixedStyleValue; disabled?: string | MixedStyleValue;
  visited?: string | MixedStyleValue; checked?: string | MixedStyleValue;
  placeholder?: string | MixedStyleValue;
  before?: string | MixedStyleValue; after?: string | MixedStyleValue;
  selection?: string | MixedStyleValue; marker?: string | MixedStyleValue;
  first?: string | MixedStyleValue; last?: string | MixedStyleValue;
  odd?: string | MixedStyleValue; even?: string | MixedStyleValue;
  "focus-within"?: string | MixedStyleValue; "focus-visible"?: string | MixedStyleValue;
  // Dark / motion / print
  dark?: string | MixedStyleValue; light?: string | MixedStyleValue;
  print?: string | MixedStyleValue;
  "motion-safe"?: string | MixedStyleValue; "motion-reduce"?: string | MixedStyleValue;
  // Group / peer states
  "group-hover"?: string | MixedStyleValue; "group-focus"?: string | MixedStyleValue;
  "peer-hover"?: string | MixedStyleValue; "peer-focus"?: string | MixedStyleValue;
  "peer-checked"?: string | MixedStyleValue;
  // Responsive breakpoints
  sm?: string | MixedStyleValue; md?: string | MixedStyleValue;
  lg?: string | MixedStyleValue; xl?: string | MixedStyleValue;
  "2xl"?: string | MixedStyleValue;
  // Arbitrary nested selectors
  [selector: string]: string | number | MixedStyleValue | undefined;
};

// ============================================================================
// tw() — The Main Function
// ============================================================================

/**
 * Variants definition for tw()
 */
interface TwVariantsDefinition {
  [variantName: string]: {
    [optionKey: string]: string | MixedStyleValue;
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
  [slotName: string]: string | MixedStyleValue;
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
  /** Base styles — Tailwind string or mixed Tailwind + raw CSS object */
  base?: string | MixedStyleValue;
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
