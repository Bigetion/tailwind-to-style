// Type definitions for tailwind-to-style/tokens

export interface TokenRegistry {
  get(path: string): string | undefined;
  set(path: string, value: string): void;
  subscribe(callback: (tokens: Record<string, any>) => void): () => void;
  toCSS(): string;
  getAll(): Record<string, any>;
  clear(): void;
}

export interface ThemeResult {
  name: string;
  tokens: Record<string, any>;
  selector: string;
  var(path: string): string;
}

export interface CreateThemeOptions {
  name?: string;
  selector?: string;
}

export declare const tokenRegistry: TokenRegistry;

export declare function createTheme(
  tokens: Record<string, any>,
  options?: CreateThemeOptions
): ThemeResult;

export declare function activateTheme(name: string): void;

export declare function token(path: string, fallback?: string): string;
