/**
 * useStyled — React hook for theme-aware styled components.
 *
 * Automatically re-creates the styled component when tokens change,
 * ensuring CSS is regenerated with new design token values.
 */

import { useMemo } from "react";
import { useTheme } from "./ThemeProvider.jsx";
import { styled } from "../className/index.js";

export function useStyled(config) {
  const { theme } = useTheme();

  return useMemo(() => {
    // Force cache bust by including theme in memo dependency
    return styled(config);
  }, [config, theme]);
}
