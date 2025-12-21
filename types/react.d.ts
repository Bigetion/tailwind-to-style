import { ReactNode } from 'react';

// Re-export core types
export * from './index';

/**
 * TWSX React Hook Options
 */
export interface UseTwsxOptions {
  inject?: boolean;
  [key: string]: any;
}

/**
 * TWSX Configuration for Provider
 */
export interface TwsxConfig {
  theme?: {
    extend?: {
      colors?: Record<string, any>;
      [key: string]: any;
    };
    [key: string]: any;
  };
  plugins?: any[];
  [key: string]: any;
}

/**
 * TWSX Provider Props
 */
export interface TwsxProviderProps {
  children: ReactNode;
  config?: TwsxConfig;
  onConfigChange?: (config: TwsxConfig) => void;
}

/**
 * TWSX Context Value
 */
export interface TwsxContextValue {
  config: TwsxConfig | null;
  updateConfig: (config: TwsxConfig) => void;
  isConfigured: boolean;
}

/**
 * React hook for using TWSX in components
 */
export declare function useTwsx(
  styles: any,
  options?: UseTwsxOptions
): string;

/**
 * TWSX Provider Component
 */
export declare function TwsxProvider(props: TwsxProviderProps): JSX.Element;

/**
 * Hook to access TWSX context
 */
export declare function useTwsxContext(): TwsxContextValue;

/**
 * Hook to get current TWSX configuration
 */
export declare function useTwsxConfig(): {
  config: TwsxConfig | null;
  isConfigured: boolean;
};

/**
 * Hook to update TWSX configuration
 */
export declare function useUpdateTwsxConfig(): (config: TwsxConfig) => void;