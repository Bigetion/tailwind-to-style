import { ReactNode } from "react";

export interface ThemeContextValue {
  theme: Record<string, any>;
  setTheme: (tokens: Record<string, any>) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  tokens?: Record<string, any>;
}

export function ThemeProvider(props: ThemeProviderProps): JSX.Element;
export function useTheme(): ThemeContextValue;

export function useStyled<TConfig>(config: TConfig): any;
