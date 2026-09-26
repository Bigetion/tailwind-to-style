// Type definitions for tailwind-to-style/register
// Semantic class registration API

import type { MixedStyleValue } from './v4';

// ─────────────────────────────────────────────────────────────────────────────
// Modifier map
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Modifier map for `register()` complex form.
 * Each key generates a `.className-key` CSS class.
 *
 * @example
 * modifiers: {
 *   blue:  { tw: 'bg-blue-600 text-white' },   // → .btn-blue
 *   sm:    { tw: 'px-3 py-1.5 text-sm' },       // → .btn-sm
 *   pill:  { 'border-radius': '9999px' },        // → .btn-pill
 * }
 */
export interface ModifierMap {
  [modifierName: string]: string | MixedStyleValue;
}

// ─────────────────────────────────────────────────────────────────────────────
// Register configs
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Simple register config — the whole object defines styles for `.className`.
 *
 * @example
 * register('btn', {
 *   tw: 'px-6 py-3 rounded-lg font-medium',
 *   'background-color': '#3b82f6',
 *   color: '#fff',
 *   '&:hover': { 'background-color': '#2563eb' },
 *   hover: 'shadow-lg',
 * })
 */
export type RegisterSimpleConfig = MixedStyleValue;

/**
 * Complex register config — separates base styles from named modifiers.
 *
 * @example
 * register('btn', {
 *   base: { tw: 'px-4 py-2 rounded font-medium transition-all' },
 *   modifiers: {
 *     blue:    { tw: 'bg-blue-600 text-white hover:bg-blue-700' },
 *     sm:      { tw: 'px-3 py-1.5 text-sm' },
 *     lg:      { tw: 'px-6 py-3 text-lg' },
 *     pill:    { 'border-radius': '9999px' },
 *     outline: { tw: 'bg-transparent border-2' },
 *   }
 * })
 * // Generates: .btn + .btn-blue + .btn-sm + .btn-lg + .btn-pill + .btn-outline
 */
export interface RegisterComplexConfig {
  /**
   * Base styles applied to the root `.className` element.
   * Accepts Tailwind utilities (`tw`), raw CSS properties, and pseudo shorthands.
   */
  base?: string | MixedStyleValue;

  /**
   * Named modifier map.
   * Each key generates `.className-{key}` with the given styles.
   */
  modifiers?: ModifierMap;

  /**
   * Extend from one or more already-registered class names.
   * The extended class's styles are merged as the base, then overridden by this config.
   *
   * @example
   * register('icon-btn', { extend: 'btn', tw: 'w-12 h-12 p-0' })
   * register('fab', { extend: ['btn', 'icon-btn'], tw: 'rounded-full shadow-lg' })
   */
  extend?: string | string[];
}

export type RegisterConfig = RegisterSimpleConfig | RegisterComplexConfig;

// ─────────────────────────────────────────────────────────────────────────────
// Group config
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Component map for `register.group()`.
 *
 * The `root` key maps to `.baseName`.
 * All other keys map to `.baseName-{key}`.
 *
 * @example
 * register.group('card', {
 *   root:   { tw: 'rounded-xl border bg-white shadow-sm' },
 *   header: { tw: 'px-6 py-4 border-b font-semibold' },
 *   body:   { tw: 'px-6 py-4' },
 *   footer: { tw: 'px-6 py-4 border-t text-sm text-gray-500' },
 * })
 * // → .card + .card-header + .card-body + .card-footer
 */
export interface GroupComponentMap {
  /** Maps to `.baseName` */
  root?: string | MixedStyleValue;
  [componentName: string]: string | MixedStyleValue | undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// register() function
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Register a semantic CSS class. Injects CSS into the DOM automatically.
 *
 * @param className - The CSS class name to register (without the `.` prefix)
 * @param config    - Style configuration
 *
 * @example
 * // Simple form
 * register('btn', {
 *   tw: 'px-6 py-3 rounded-lg font-medium transition-all cursor-pointer',
 *   'background-color': '#3b82f6',
 *   color: '#fff',
 *   '&:hover': { 'background-color': '#2563eb' },
 * })
 *
 * @example
 * // With modifiers
 * register('btn', {
 *   base: { tw: 'px-4 py-2 rounded font-medium' },
 *   modifiers: {
 *     blue: { tw: 'bg-blue-600 text-white hover:bg-blue-700' },
 *     sm:   { tw: 'px-3 py-1.5 text-sm' },
 *   }
 * })
 * // <button class="btn btn-blue btn-sm">
 *
 * @example
 * // Extend another class
 * register('icon-btn', { extend: 'btn', tw: 'w-12 h-12 p-0 flex items-center justify-center' })
 */
export declare function register(className: string, config?: RegisterConfig): void;

export declare namespace register {
  /**
   * Register multiple related classes at once.
   * `root` key → `.baseName`, others → `.baseName-{key}`.
   *
   * @example
   * register.group('card', {
   *   root:   { tw: 'rounded-xl bg-white shadow-sm' },
   *   header: { tw: 'px-6 py-4 border-b font-semibold' },
   *   body:   { tw: 'px-6 py-4' },
   *   footer: { tw: 'px-6 py-4 border-t text-sm' },
   * })
   */
  function group(baseName: string, components: GroupComponentMap): void;

  /**
   * Extract all registered CSS as a single string (for SSR).
   */
  function extractCSS(): string;

  /**
   * Clear all registered styles. Useful for testing.
   */
  function reset(): void;
}

// ─────────────────────────────────────────────────────────────────────────────
// cx / cn
// ─────────────────────────────────────────────────────────────────────────────

type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, any>
  | ClassValue[];

/**
 * Conditionally merge class names.
 *
 * @example
 * cx('btn', isActive && 'btn-active', { 'btn-lg': isLarge })
 * // → "btn btn-active btn-lg"
 */
export declare function cx(...args: ClassValue[]): string;

export declare namespace cx {
  function with_(...baseArgs: ClassValue[]): (...args: ClassValue[]) => string;
  export { with_ as with };
}

/**
 * Alias of `cx` — for shadcn/ui fans.
 *
 * @example
 * cn('btn btn-blue', isLoading && 'opacity-50 cursor-not-allowed')
 */
export declare const cn: typeof cx;

// ─────────────────────────────────────────────────────────────────────────────
// Default export
// ─────────────────────────────────────────────────────────────────────────────

export default register;
