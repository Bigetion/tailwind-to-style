/**
 * ThemeProvider — React context for runtime design tokens.
 *
 * Wrap your app with ThemeProvider to enable token-driven styling.
 * When tokens change, all styled components update automatically.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { tokenRegistry } from "../tokens/registry.js";

const ThemeContext = createContext({
  theme: {},
  setTheme: () => {},
});

export function ThemeProvider({ children, tokens = {} }) {
  const [theme, setThemeState] = useState(() => {
    tokenRegistry.set(tokens);
    return tokenRegistry.get();
  });

  const setTheme = useCallback((newTokens) => {
    tokenRegistry.set(newTokens);
    setThemeState(tokenRegistry.get());
  }, []);

  // Subscribe to external token changes (e.g. from outside React)
  useEffect(() => {
    return tokenRegistry.subscribe((updatedTokens) => {
      setThemeState(updatedTokens);
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
