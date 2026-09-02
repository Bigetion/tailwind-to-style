/**
 * ThemeProvider & useTheme — React context for theming with tokens.
 *
 * @module tailwind-to-style/react/ThemeProvider
 */

import React from 'react';
import { createTheme, tokenRegistry } from '../tokens/index.js';

// ============================================================================
// Theme Context
// ============================================================================

const ThemeContext = React.createContext({
  theme: {},
  setTheme: () => {},
  tokens: {},
});

/**
 * ThemeProvider — Wraps your app with a token-based theme context.
 *
 * @param {Object} props
 * @param {Object} props.theme - Token object (same shape as createTheme)
 * @param {string} [props.name] - Theme name
 * @param {React.ReactNode} props.children
 *
 * @example
 * import { ThemeProvider } from 'tailwind-to-style/react';
 *
 * const myTheme = {
 *   colors: { primary: '#3b82f6', secondary: '#8b5cf6' },
 *   spacing: { sm: '0.5rem', md: '1rem' },
 * };
 *
 * function App() {
 *   return (
 *     <ThemeProvider theme={myTheme} name="light">
 *       <MyComponent />
 *     </ThemeProvider>
 *   );
 * }
 */
export function ThemeProvider(props) {
  const { theme: themeProp, name = 'default', children } = props;
  const [tokens, setTokens] = React.useState(themeProp);

  // Re-inject only when the theme's *content* actually changes, not merely
  // its object identity. `useEffect([themeProp])` alone would re-run (and
  // re-inject CSS) on every render for callers who pass an inline object
  // literal (e.g. <ThemeProvider theme={{ colors: {...} }}>), which is the
  // common/natural way to use this component.
  const themeSignature = JSON.stringify(themeProp);

  React.useEffect(() => {
    createTheme(themeProp, { name });
    // themeSignature is the real dependency here; themeProp is read fresh
    // from the closure so the injected theme always reflects the latest object.
  }, [themeSignature, name]);

  // Subscribe to token changes
  React.useEffect(() => {
    const unsubscribe = tokenRegistry.subscribe((newTokens) => {
      setTokens({ ...newTokens });
    });
    return unsubscribe;
  }, []);

  const setTheme = React.useCallback(
    (newTheme) => {
      createTheme(newTheme, { name });
      setTokens(newTheme);
    },
    [name]
  );

  const contextValue = React.useMemo(
    () => ({ theme: tokens, setTheme, tokens }),
    [tokens, setTheme]
  );

  return React.createElement(ThemeContext.Provider, { value: contextValue }, children);
}

/**
 * useTheme — Access the current theme tokens and setTheme function.
 *
 * @returns {{ theme: Object, setTheme: Function, tokens: Object }}
 *
 * @example
 * import { useTheme } from 'tailwind-to-style/react';
 *
 * function MyComponent() {
 *   const { theme, setTheme } = useTheme();
 *   return <div style={{ color: `var(--tws-colors-primary)` }}>Hello</div>;
 * }
 */
export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('[tailwind-to-style/react] useTheme must be used within a ThemeProvider.');
  }
  return context;
}
