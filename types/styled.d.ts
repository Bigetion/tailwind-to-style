/**
 * TypeScript definitions for React integration
 */

import * as React from 'react';

// Variant Configuration Types
export type VariantValue = string | number | boolean;

export type VariantConfig<T extends Record<string, any>> = {
  [K in keyof T]: Record<string, string>;
};

export type CompoundVariant<T extends Record<string, any>> = Partial<T> & {
  class: string;
};

export interface TVConfig<T extends Record<string, any> = {}> {
  base?: string;
  variants?: VariantConfig<T>;
  compoundVariants?: CompoundVariant<T>[];
  defaultVariants?: Partial<T>;
}

export type TVFunction<T extends Record<string, any>> = (
  props?: Partial<T>
) => string;

export function tv<T extends Record<string, any> = {}>(
  config: TVConfig<T>
): TVFunction<T>;

export function createVariants<T extends Record<string, TVConfig<any>>>(
  configs: T
): { [K in keyof T]: TVFunction<any> };

// Styled Component Types
export type NestedStyles = {
  [selector: string]: string | NestedStyles | { '@css': Record<string, string> };
};

export interface StyledConfig<T extends Record<string, any> = {}> {
  base?: string;
  hover?: string;
  active?: string;
  focus?: string;
  disabled?: string;
  variants?: VariantConfig<T>;
  nested?: NestedStyles;
  compoundVariants?: CompoundVariant<T>[];
  defaultVariants?: Partial<T>;
}

export type StyledProps<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  V extends Record<string, any> = {}
> = (C extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[C]
  : C extends React.ComponentType<infer P>
  ? P
  : {}) &
  Partial<V> & {
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  };

export type StyledComponent<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  V extends Record<string, any> = {}
> = React.ForwardRefExoticComponent<
  StyledProps<C, V> & React.RefAttributes<any>
>;

export function styled<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  V extends Record<string, any> = {}
>(
  component: C,
  config?: StyledConfig<V>
): StyledComponent<C, V>;

// Styled tag helpers
export interface StyledTags {
  div: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'div', V>;
  span: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'span', V>;
  p: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'p', V>;
  a: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'a', V>;
  button: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'button', V>;
  input: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'input', V>;
  textarea: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'textarea', V>;
  select: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'select', V>;
  label: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'label', V>;
  h1: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'h1', V>;
  h2: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'h2', V>;
  h3: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'h3', V>;
  h4: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'h4', V>;
  h5: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'h5', V>;
  h6: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'h6', V>;
  section: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'section', V>;
  article: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'article', V>;
  nav: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'nav', V>;
  header: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'header', V>;
  footer: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'footer', V>;
  main: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'main', V>;
  aside: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'aside', V>;
  ul: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'ul', V>;
  ol: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'ol', V>;
  li: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'li', V>;
  form: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'form', V>;
  table: <V extends Record<string, any> = {}>(
    config?: StyledConfig<V>
  ) => StyledComponent<'table', V>;
}

declare module 'tailwind-to-style' {
  export function styled<
    C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    V extends Record<string, any> = {}
  >(
    component: C,
    config?: StyledConfig<V>
  ): StyledComponent<C, V> & StyledTags;
}
