// Type definitions for tailwind-to-style/react

import { ComponentType, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';

// ============================================================================
// styled()
// ============================================================================

type IntrinsicElement = keyof JSX.IntrinsicElements;

interface StyledConfig<V extends Record<string, Record<string, string>> = {}> {
  name?: string;
  base?: string;
  variants?: V;
  defaultVariants?: { [K in keyof V]?: keyof V[K] };
  compoundVariants?: Array<{ class?: string; className?: string; [key: string]: any }>;
  slots?: Record<string, string>;
}

type VariantProps<V extends Record<string, Record<string, string>>> = {
  [K in keyof V]?: keyof V[K];
};

type StyledComponent<
  T extends IntrinsicElement | ComponentType<any>,
  V extends Record<string, Record<string, string>>
> = ForwardRefExoticComponent<
  PropsWithoutRef<
    (T extends IntrinsicElement ? JSX.IntrinsicElements[T] : T extends ComponentType<infer P> ? P : never) &
    VariantProps<V> & { className?: string }
  > &
  RefAttributes<T extends IntrinsicElement ? HTMLElement : any>
> & {
  variants: any;
  raw: StyledConfig<V>;
};

export declare function styled<
  T extends IntrinsicElement | ComponentType<any>,
  V extends Record<string, Record<string, string>> = {}
>(
  element: T,
  config?: StyledConfig<V>
): StyledComponent<T, V>;

// ============================================================================
// ThemeProvider & useTheme
// ============================================================================

interface ThemeProviderProps {
  theme: Record<string, any>;
  name?: string;
  children: React.ReactNode;
}

interface ThemeContextValue {
  theme: Record<string, any>;
  setTheme: (newTheme: Record<string, any>) => void;
  tokens: Record<string, any>;
}

export declare function ThemeProvider(props: ThemeProviderProps): JSX.Element;
export declare function useTheme(): ThemeContextValue;

// ============================================================================
// useTws
// ============================================================================

export declare function useTws(classes: string): Record<string, string>;
