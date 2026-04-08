/**
 * Type definitions for tailwind-to-style/classname
 * Tree-shakeable import for twsxClassName and tw
 */

export {
  // Main functions
  twsxClassName,
  tw,
  
  // Types
  TwsxClassNameBasicConfig,
  TwsxClassNameVariantsConfig,
  TwsxClassNameSlotsConfig,
  TwsxClassNameVariantsDefinition,
  TwsxClassNameSlotsDefinition,
  TwsxClassNameVariantFunction,
  TwsxClassNameSlotsFunction,
  TwsxClassNameVariantProps,
  TwsxClassNameCompoundVariant,
  TwsxClassNameVariantValue,
  TwsxClassNameGlobalConfig,
  
  // Utility types
  InferVariantProps,
  InferSlotNames,
  
  // Animation types
  AnimationPreset,
  AnimationConfig,
  
  // Design token types
  DesignTokens,
  ThemeTokens,
  
  // Pseudo/responsive types
  PseudoShorthand,
  GroupPeerState,
  ResponsiveBreakpoint,
  ResponsiveVariantValue,
} from '../index';
