// Browser-only entry point (excludes Node.js optimization APIs)

// Import only safe functions that don't require Node.js modules
export { tv, createVariants } from "./tv.js";

// Export React utilities for browser usage
export { useTwsx } from "./react/useTwsx.js";
export {
  TwsxProvider,
  useTwsxContext,
  useTwsxConfig,
  useUpdateTwsxConfig,
} from "./react/TwsxProvider.jsx";
export { styled, isolatedStyled, createScopedStyled } from "./react/styled.js";

// Export core TWSX functions that are browser-safe
export { tws, twsx } from "./index.js";
