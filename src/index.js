import { getConfigOptions } from "./utils/index.js";
import { getConfig, setClearConfigCache } from "./config/userConfig.js";

// Global registry to track injected keyframes (prevents duplication)
const _injectedKeyframes = new Set();

// Mapping of animation names to their keyframe definitions
const BUILTIN_KEYFRAMES = {
  spin: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  ping: {
    "75%, 100%": { transform: "scale(2)", opacity: "0" },
  },
  pulse: {
    "50%": { opacity: ".5" },
  },
  bounce: {
    "0%, 100%": {
      transform: "translateY(-25%)",
      animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
    },
    "50%": {
      transform: "none",
      animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
    },
  },
  fadeIn: {
    "0%": { opacity: "0" },
    "50%": { opacity: "1" },
    "100%": { opacity: "0" },
  },
  slideUp: {
    "0%": { transform: "translateY(20px)", opacity: "0" },
    "50%": { transform: "translateY(0)", opacity: "1" },
    "100%": { transform: "translateY(-20px)", opacity: "0" },
  },
};

// Generate minified keyframes CSS
function generateMinifiedKeyframes(animationNames) {
  let css = "";
  for (const name of animationNames) {
    const keyframe = BUILTIN_KEYFRAMES[name];
    if (!keyframe) continue;

    css += `@keyframes ${name}{`;
    for (const [percentage, styles] of Object.entries(keyframe)) {
      css += `${percentage}{`;
      for (const [prop, value] of Object.entries(styles)) {
        const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
        css += `${cssProp}:${value};`;
      }
      css += "}";
    }
    css += "}";
  }
  return css;
}

import generateAccentColor from "./generators/accentColor.js";
import generateAccessibility from "./generators/accessibility.js";
import generateAlignContent from "./generators/alignContent.js";
import generateAlignItems from "./generators/alignItems.js";
import generateAlignSelf from "./generators/alignSelf.js";
import generateAnimation from "./generators/animation.js";
import generateAppearance from "./generators/appearance.js";
import generateAspect from "./generators/aspect.js";
import generateBackgroundAttachment from "./generators/backgroundAttachment.js";
import generateBackgroundClip from "./generators/backgroundClip.js";
import generateBackgroundColor from "./generators/backgroundColor.js";
import generateBackgroundImage from "./generators/backgroundImage.js";
import generateBackgroundOpacity from "./generators/backgroundOpacity.js";
import generateBackgroundOrigin from "./generators/backgroundOrigin.js";
import generateBackgroundPosition from "./generators/backgroundPosition.js";
import generateBackgroundRepeat from "./generators/backgroundRepeat.js";
import generateBackgroundSize from "./generators/backgroundSize.js";
import generateBackdropBlur from "./generators/backdropBlur.js";
import generateBackdropBrightness from "./generators/backdropBrightness.js";
import generateBackdropContrast from "./generators/backdropContrast.js";
import generateBackdropFilter from "./generators/backdropFilter.js";
import generateBackdropGrayscale from "./generators/backdropGrayscale.js";
import generateBackdropHueRotate from "./generators/backdropHueRotate.js";
import generateBackdropInvert from "./generators/backdropInvert.js";
import generateBackdropOpacity from "./generators/backdropOpacity.js";
import generateBackdropSaturate from "./generators/backdropSaturate.js";
import generateBackdropSepia from "./generators/backdropSepia.js";
import generateBlur from "./generators/blur.js";
import generateBorderCollapse from "./generators/borderCollapse.js";
import generateBorderColor from "./generators/borderColor.js";
import generateBorderOpacity from "./generators/borderOpacity.js";
import generateBorderRadius from "./generators/borderRadius.js";
import generateBorderSpacing from "./generators/borderSpacing.js";
import generateBorderStyle from "./generators/borderStyle.js";
import generateBorderWidth from "./generators/borderWidth.js";
import generateBoxDecorationBreak from "./generators/boxDecorationBreak.js";
import generateBoxShadow from "./generators/boxShadow.js";
import generateBoxSizing from "./generators/boxSizing.js";
import generateBreakAfter from "./generators/breakAfter.js";
import generateBreakBefore from "./generators/breakBefore.js";
import generateBreakInside from "./generators/breakInside.js";
import generateBrightness from "./generators/brightness.js";
import generateCaptionSide from "./generators/captionSide.js";
import generateCaretColor from "./generators/caretColor.js";
import generateClear from "./generators/clear.js";
import generateColumns from "./generators/columns.js";
import generateContainer from "./generators/container.js";
import generateContent from "./generators/content.js";
import generateContrast from "./generators/contrast.js";
import generateCursor from "./generators/cursor.js";
import generateDisplay from "./generators/display.js";
import generateDivideColor from "./generators/divideColor.js";
import generateDivideOpacity from "./generators/divideOpacity.js";
import generateDivideStyle from "./generators/divideStyle.js";
import generateDivideWidth from "./generators/divideWidth.js";
import generateDropShadow from "./generators/dropShadow.js";
import generateFill from "./generators/fill.js";
import generateFilter from "./generators/filter.js";
import generateFlex from "./generators/flex.js";
import generateFlexBasis from "./generators/flexBasis.js";
import generateFlexDirection from "./generators/flexDirection.js";
import generateFlexGrow from "./generators/flexGrow.js";
import generateFlexShrink from "./generators/flexShrink.js";
import generateFlexWrap from "./generators/flexWrap.js";
import generateFloat from "./generators/float.js";
import generateFontFamily from "./generators/fontFamily.js";
import generateFontSize from "./generators/fontSize.js";
import generateFontSmoothing from "./generators/fontSmoothing.js";
import generateFontStyle from "./generators/fontStyle.js";
import generateFontVariantNumeric from "./generators/fontVariantNumeric.js";
import generateFontWeight from "./generators/fontWeight.js";
import generateGap from "./generators/gap.js";
import generateGradientColorStops from "./generators/gradientColorStops.js";
import generateGrayscale from "./generators/grayscale.js";
import generateGridAutoColumns from "./generators/gridAutoColumns.js";
import generateGridAutoFlow from "./generators/gridAutoFlow.js";
import generateGridAutoRows from "./generators/gridAutoRows.js";
import generateGridColumn from "./generators/gridColumn.js";
import generateGridColumnEnd from "./generators/gridColumnEnd.js";
import generateGridColumnStart from "./generators/gridColumnStart.js";
import generateGridRow from "./generators/gridRow.js";
import generateGridRowEnd from "./generators/gridRowEnd.js";
import generateGridRowStart from "./generators/gridRowStart.js";
import generateGridTemplateColumns from "./generators/gridTemplateColumns.js";
import generateGridTemplateRows from "./generators/gridTemplateRows.js";
import generateHeight from "./generators/height.js";
import generateHueRotate from "./generators/hueRotate.js";
import generateHyphens from "./generators/hyphens.js";
import generateInset from "./generators/inset.js";
import generateInvert from "./generators/invert.js";
import generateIsolation from "./generators/isolation.js";
import generateJustifyContent from "./generators/justifyContent.js";
import generateJustifyItems from "./generators/justifyItems.js";
import generateJustifySelf from "./generators/justifySelf.js";
import generateLetterSpacing from "./generators/letterSpacing.js";
import generateLineClamp from "./generators/lineClamp.js";
import generateLineHeight from "./generators/lineHeight.js";
import generateListStyleImage from "./generators/listStyleImage.js";
import generateListStylePosition from "./generators/listStylePosition.js";
import generateListStyleType from "./generators/listStyleType.js";
import generateMargin from "./generators/margin.js";
import generateMaxHeight from "./generators/maxHeight.js";
import generateMaxWidth from "./generators/maxWidth.js";
import generateMinHeight from "./generators/minHeight.js";
import generateMinWidth from "./generators/minWidth.js";
import generateMixBlendMode from "./generators/mixBlendMode.js";
import generateObjectFit from "./generators/objectFit.js";
import generateObjectPosition from "./generators/objectPosition.js";
import generateOpacity from "./generators/opacity.js";
import generateOrder from "./generators/order.js";
import generateOutlineColor from "./generators/outlineColor.js";
import generateOutlineOffset from "./generators/outlineOffset.js";
import generateOutlineOpacity from "./generators/outlineOpacity.js";
import generateOutlineStyle from "./generators/outlineStyle.js";
import generateOutlineWidth from "./generators/outlineWidth.js";
import generateOverflow from "./generators/overflow.js";
import generateOverscrollBehavior from "./generators/overscrollBehavior.js";
import generatePadding from "./generators/padding.js";
import generatePlaceContent from "./generators/placeContent.js";
import generatePlaceItems from "./generators/placeItems.js";
import generatePlaceSelf from "./generators/placeSelf.js";
import generatePointerEvents from "./generators/pointerEvents.js";
import generatePosition from "./generators/position.js";
import generateResize from "./generators/resize.js";
import generateRingColor from "./generators/ringColor.js";
import generateRingOffsetColor from "./generators/ringOffsetColor.js";
import generateRingOffsetWidth from "./generators/ringOffsetWidth.js";
import generateRingOpacity from "./generators/ringOpacity.js";
import generateRingWidth from "./generators/ringWidth.js";
import generateSaturate from "./generators/saturate.js";
import generateRotate from "./generators/rotate.js";
import generateScale from "./generators/scale.js";
import generateScrollBehavior from "./generators/scrollBehavior.js";
import generateScrollMargin from "./generators/scrollMargin.js";
import generateScrollPadding from "./generators/scrollPadding.js";
import generateScrollSnapAlign from "./generators/scrollSnapAlign.js";
import generateScrollSnapStop from "./generators/scrollSnapStop.js";
import generateScrollSnapType from "./generators/scrollSnapType.js";
import generateSepia from "./generators/sepia.js";
import generateSize from "./generators/size.js";
import generateSkew from "./generators/skew.js";
import generateSpace from "./generators/space.js";
import generateStroke from "./generators/stroke.js";
import generateStrokeWidth from "./generators/strokeWidth.js";
import generateTableLayout from "./generators/tableLayout.js";
import generateTextAlign from "./generators/textAlign.js";
import generateTextColor from "./generators/textColor.js";
import generateTextDecoration from "./generators/textDecoration.js";
import generateTextDecorationColor from "./generators/textDecorationColor.js";
import generateTextDecorationStyle from "./generators/textDecorationStyle.js";
import generateTextDecorationThickness from "./generators/textDecorationThickness.js";
import generateTextIndent from "./generators/textIndent.js";
import generateTextOpacity from "./generators/textOpacity.js";
import generateTextOverflow from "./generators/textOverflow.js";
import generateTextShadowBlur from "./generators/textShadowBlur.js";
import generateTextShadowColor from "./generators/textShadowColor.js";
import generateTextShadowOpacity from "./generators/textShadowOpacity.js";
import generateTextShadowX from "./generators/textShadowX.js";
import generateTextShadowY from "./generators/textShadowY.js";
import generateTextTransform from "./generators/textTransform.js";
import generateTextUnderlineOffset from "./generators/textUnderlineOffset.js";
import generateTextWrap from "./generators/textWrap.js";
import generateTouchAction from "./generators/touchAction.js";
import generateTransform from "./generators/transform.js";
import generateTransformOrigin from "./generators/transformOrigin.js";
import generateTransitionDelay from "./generators/transitionDelay.js";
import generateTransitionDuration from "./generators/transitionDuration.js";
import generateTransitionProperty from "./generators/transitionProperty.js";
import generateTransitionTimingFunction from "./generators/transitionTimingFunction.js";
import generateTranslate from "./generators/translate.js";
import generateUserSelect from "./generators/userSelect.js";
import generateVerticalAlign from "./generators/verticalAlign.js";
import generateVisibility from "./generators/visibility.js";
import generateWhitespace from "./generators/whitespace.js";
import generateWidth from "./generators/width.js";
import generateWordBreak from "./generators/wordBreak.js";
import generateWillChange from "./generators/willChange.js";
import generateZIndex from "./generators/zIndex.js";

import { logger } from "./utils/logger.js";
import { LRUCache } from "./utils/lruCache.js";
import { handleError } from "./utils/errorHandler.js";
import { getTailwindCache } from "./utils/tailwindCache.js";
import { getPlugins } from "./config/userConfig.js";
import { pluginToLookup } from "./plugins/pluginAPI.js";
import patterns from "./patterns/index.js";

const plugins = {
  accentColor: generateAccentColor,
  accessibility: generateAccessibility,
  alignContent: generateAlignContent,
  alignItems: generateAlignItems,
  alignSelf: generateAlignSelf,
  animation: generateAnimation,
  appearance: generateAppearance,
  aspect: generateAspect,
  backgroundAttachment: generateBackgroundAttachment,
  backgroundClip: generateBackgroundClip,
  backgroundColor: generateBackgroundColor,
  backgroundImage: generateBackgroundImage,
  backgroundOpacity: generateBackgroundOpacity,
  backgroundOrigin: generateBackgroundOrigin,
  backgroundPosition: generateBackgroundPosition,
  backgroundRepeat: generateBackgroundRepeat,
  backgroundSize: generateBackgroundSize,
  backdropBlur: generateBackdropBlur,
  backdropBrightness: generateBackdropBrightness,
  backdropContrast: generateBackdropContrast,
  backdropFilter: generateBackdropFilter,
  backdropGrayscale: generateBackdropGrayscale,
  backdropHueRotate: generateBackdropHueRotate,
  backdropInvert: generateBackdropInvert,
  backdropOpacity: generateBackdropOpacity,
  backdropSaturate: generateBackdropSaturate,
  backdropSepia: generateBackdropSepia,
  blur: generateBlur,
  borderCollapse: generateBorderCollapse,
  borderColor: generateBorderColor,
  borderOpacity: generateBorderOpacity,
  borderRadius: generateBorderRadius,
  borderSpacing: generateBorderSpacing,
  borderStyle: generateBorderStyle,
  borderWidth: generateBorderWidth,
  boxDecorationBreak: generateBoxDecorationBreak,
  boxShadow: generateBoxShadow,
  boxSizing: generateBoxSizing,
  breakAfter: generateBreakAfter,
  breakBefore: generateBreakBefore,
  breakInside: generateBreakInside,
  brightness: generateBrightness,
  captionSide: generateCaptionSide,
  caretColor: generateCaretColor,
  clear: generateClear,
  columns: generateColumns,
  container: generateContainer,
  content: generateContent,
  contrast: generateContrast,
  cursor: generateCursor,
  display: generateDisplay,
  divideColor: generateDivideColor,
  divideOpacity: generateDivideOpacity,
  divideStyle: generateDivideStyle,
  divideWidth: generateDivideWidth,
  dropShadow: generateDropShadow,
  fill: generateFill,
  filter: generateFilter,
  flex: generateFlex,
  flexBasis: generateFlexBasis,
  flexDirection: generateFlexDirection,
  flexGrow: generateFlexGrow,
  flexShrink: generateFlexShrink,
  flexWrap: generateFlexWrap,
  float: generateFloat,
  fontFamily: generateFontFamily,
  fontSize: generateFontSize,
  fontSmoothing: generateFontSmoothing,
  fontStyle: generateFontStyle,
  fontVariantNumeric: generateFontVariantNumeric,
  fontWeight: generateFontWeight,
  gap: generateGap,
  gradientColorStops: generateGradientColorStops,
  grayscale: generateGrayscale,
  gridAutoColumns: generateGridAutoColumns,
  gridAutoFlow: generateGridAutoFlow,
  gridAutoRows: generateGridAutoRows,
  gridColumn: generateGridColumn,
  gridColumnEnd: generateGridColumnEnd,
  gridColumnStart: generateGridColumnStart,
  gridRow: generateGridRow,
  gridRowEnd: generateGridRowEnd,
  gridRowStart: generateGridRowStart,
  gridTemplateColumns: generateGridTemplateColumns,
  gridTemplateRows: generateGridTemplateRows,
  height: generateHeight,
  hueRotate: generateHueRotate,
  hyphens: generateHyphens,
  inset: generateInset,
  invert: generateInvert,
  isolation: generateIsolation,
  justifyContent: generateJustifyContent,
  justifyItems: generateJustifyItems,
  justifySelf: generateJustifySelf,
  letterSpacing: generateLetterSpacing,
  lineClamp: generateLineClamp,
  lineHeight: generateLineHeight,
  listStyleImage: generateListStyleImage,
  listStylePosition: generateListStylePosition,
  listStyleType: generateListStyleType,
  margin: generateMargin,
  maxHeight: generateMaxHeight,
  maxWidth: generateMaxWidth,
  minHeight: generateMinHeight,
  minWidth: generateMinWidth,
  objectFit: generateObjectFit,
  mixBlendMode: generateMixBlendMode,
  objectPosition: generateObjectPosition,
  opacity: generateOpacity,
  order: generateOrder,
  outlineColor: generateOutlineColor,
  outlineOffset: generateOutlineOffset,
  outlineOpacity: generateOutlineOpacity,
  outlineStyle: generateOutlineStyle,
  outlineWidth: generateOutlineWidth,
  overflow: generateOverflow,
  overscrollBehavior: generateOverscrollBehavior,
  padding: generatePadding,
  placeContent: generatePlaceContent,
  placeItems: generatePlaceItems,
  placeSelf: generatePlaceSelf,
  pointerEvents: generatePointerEvents,
  position: generatePosition,
  resize: generateResize,
  ringColor: generateRingColor,
  ringOffsetColor: generateRingOffsetColor,
  ringOffsetWidth: generateRingOffsetWidth,
  ringOpacity: generateRingOpacity,
  ringWidth: generateRingWidth,
  rotate: generateRotate,
  saturate: generateSaturate,
  scale: generateScale,
  scrollBehavior: generateScrollBehavior,
  scrollMargin: generateScrollMargin,
  scrollPadding: generateScrollPadding,
  scrollSnapAlign: generateScrollSnapAlign,
  scrollSnapStop: generateScrollSnapStop,
  scrollSnapType: generateScrollSnapType,
  sepia: generateSepia,
  size: generateSize,
  skew: generateSkew,
  space: generateSpace,
  stroke: generateStroke,
  strokeWidth: generateStrokeWidth,
  tableLayout: generateTableLayout,
  textAlign: generateTextAlign,
  textColor: generateTextColor,
  textDecoration: generateTextDecoration,
  textDecorationColor: generateTextDecorationColor,
  textDecorationStyle: generateTextDecorationStyle,
  textDecorationThickness: generateTextDecorationThickness,
  textIndent: generateTextIndent,
  textOpacity: generateTextOpacity,
  textOverflow: generateTextOverflow,
  textShadowBlur: generateTextShadowBlur,
  textShadowColor: generateTextShadowColor,
  textShadowOpacity: generateTextShadowOpacity,
  textShadowX: generateTextShadowX,
  textShadowY: generateTextShadowY,
  textTransform: generateTextTransform,
  textUnderlineOffset: generateTextUnderlineOffset,
  textWrap: generateTextWrap,
  touchAction: generateTouchAction,
  transform: generateTransform,
  transformOrigin: generateTransformOrigin,
  transitionDelay: generateTransitionDelay,
  transitionDuration: generateTransitionDuration,
  transitionProperty: generateTransitionProperty,
  transitionTimingFunction: generateTransitionTimingFunction,
  translate: generateTranslate,
  userSelect: generateUserSelect,
  verticalAlign: generateVerticalAlign,
  visibility: generateVisibility,
  whitespace: generateWhitespace,
  width: generateWidth,
  willChange: generateWillChange,
  wordBreak: generateWordBreak,
  zIndex: generateZIndex,
};

function parseCustomClassWithPatterns(className) {
  for (const key in patterns) {
    const { regex, cssProp, formatter } = patterns[key];
    const match = className.match(regex);
    if (match) {
      const value = formatter(match[1]);
      return `${cssProp}: ${value};`;
    }
  }
  return null;
}

/**
 * Resolve all CSS custom properties (var) in a CSS string and output only clear CSS (no custom property)
 * @param {string} cssString
 * @returns {string} e.g. 'color: rgba(255,255,255,1); background: #fff;'
 */
function resolveCssToClearCss(cssString) {
  const customVars = {};
  const props = {};
  cssString.split(";").forEach((decl) => {
    const [key, value] = decl.split(":").map((s) => s && s.trim());
    if (!key || !value) return;
    if (key.startsWith("--")) {
      customVars[key] = value;
    } else {
      props[key] = value;
    }
  });
  // Replace var(--foo) in all values
  Object.keys(props).forEach((key) => {
    let val = props[key];
    val = val.replace(/var\((--[a-zA-Z0-9-_]+)\)/g, (m, v) =>
      customVars[v] !== undefined ? customVars[v] : m
    );
    props[key] = val;
  });
  // Build CSS string - INCLUDE CSS variables so they can be resolved later
  const allProps = { ...customVars, ...props };
  return Object.entries(allProps)
    .map(([k, v]) => `${k}: ${v};`)
    .join(" ");
}

// Cache for getConfigOptions - use LRU cache
const configOptionsCache = new LRUCache(500);

/**
 * Clear config options cache (internal use)
 * Called when user configuration changes
 */
export function clearConfigCache() {
  configOptionsCache.clear();
}

// Register clearConfigCache with userConfig module
setClearConfigCache(clearConfigCache);

function generateTailwindCssString(options = {}) {
  const pluginKeys = Object.keys(plugins);

  // Merge user config with options
  const userConfigData = getConfig();
  const mergedOptions = {
    ...options,
    theme: {
      ...options.theme,
      ...userConfigData.theme,
      extend: {
        ...options.theme?.extend,
        ...userConfigData.theme?.extend,
      },
    },
  };

  // Use cache to prevent unnecessary reprocessing
  // Include user config in cache key to ensure cache invalidation
  const key = JSON.stringify({
    options: mergedOptions,
    userConfigHash: JSON.stringify(userConfigData),
  });

  if (!configOptionsCache.has(key)) {
    const configOptions = getConfigOptions(mergedOptions, pluginKeys);
    configOptionsCache.set(key, configOptions);
  }

  const configOptions = configOptionsCache.get(key);
  const { corePlugins = {} } = configOptions;
  const corePluginKeys = Object.keys(corePlugins);

  let cssString = "";
  Object.keys(plugins).forEach((key) => {
    if (corePluginKeys.indexOf(key) >= 0 && !corePlugins[key]) {
      cssString += "";
    } else {
      cssString += plugins[key](configOptions);
    }
  });
  return cssString;
}

function convertCssToObject(cssString) {
  const obj = {};
  const regex = /([a-zA-Z0-9\-_\\/.]+)\s*{\s*([^}]+)\s*}/g;
  let match;

  while ((match = regex.exec(cssString)) !== null) {
    const className = match[1].replace(/\\\\/g, "\\").replace(/^_/, "");
    const cssRules = match[2].trim().replace(/\s+/g, " ");
    obj[className] = cssRules;
  }

  // Add plugin utilities to the lookup object
  const plugins = getPlugins();
  const configOptions = getConfigOptions();
  const prefix = configOptions.prefix || "";

  plugins.forEach((plugin) => {
    const pluginLookup = pluginToLookup(plugin, prefix);
    Object.assign(obj, pluginLookup);
  });

  return obj;
}

// Use singleton cache instead of global variables
const tailwindCache = getTailwindCache();

const fractionDenominators = [2, 3, 4, 5, 6, 12];
const fractionPrefixes = [
  "w-",
  "h-",
  "max-w-",
  "max-h-",
  "min-w-",
  "min-h-",
  "top-",
  "bottom-",
  "left-",
  "right-",
  "inset-",
  "inset-x-",
  "inset-y-",
  "translate-x-",
  "translate-y-",
  "rounded-t-",
  "rounded-b-",
  "rounded-l-",
  "rounded-r-",
  "rounded-bl-",
  "rounded-br-",
  "rounded-tl-",
  "rounded-tr-",
  "flex-basis-",
  "z-",
];

const breakpoints = {
  sm: "@media (min-width: 640px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)",
  "2xl": "@media (min-width: 1536px)",
};

const pseudoVariants = new Set([
  "hover",
  "focus",
  "focus-within",
  "active",
  "visited",
  "disabled",
  "first",
  "last",
  "checked",
  "invalid",
  "required",
]);

const specialVariants = {
  group: (state, sel) => `.group:${state} ${sel}`,
  peer: (state, sel) => `.peer:${state} ~ ${sel}`,
  dark: (state, sel) => `.dark ${sel}`,
};

const selectorVariants = {
  first: () => "> :first-child",
  last: () => "> :last-child",
  odd: () => "> :nth-child(odd)",
  even: () => "> :nth-child(even)",
  not: (arg) => `> :not(${arg})`,
  number: (arg) => `> :nth-child(${arg})`,
};

// Optimize encoding/decoding bracket values with memoization
const encodeBracketCache = new LRUCache(1000);
function encodeBracketValues(input) {
  if (!input) return input;
  if (encodeBracketCache.has(input)) return encodeBracketCache.get(input);

  const result = input.replace(/\[([^\]]+)\]/g, (_, content) => {
    const encoded = encodeURIComponent(content)
      .replace(/\(/g, "__P__")
      .replace(/\)/g, "__C__");
    return `[${encoded}]`;
  });

  encodeBracketCache.set(input, result);
  return result;
}

const decodeBracketCache = new LRUCache(1000);
function decodeBracketValues(input) {
  if (!input) return input;
  if (decodeBracketCache.has(input)) return decodeBracketCache.get(input);

  const result = decodeURIComponent(input)
    .replace(/__P__/g, "(")
    .replace(/__C__/g, ")");

  decodeBracketCache.set(input, result);
  return result;
}

function replaceSelector(selector) {
  return selector.replace(
    /c-(first|last|odd|even|\d+|not\([^)]+\))/g,
    (_, raw) => {
      if (/^\d+$/.test(raw)) return selectorVariants.number(raw);
      const notMatch = raw.match(/^not\(([^)]+)\)$/);
      if (notMatch) return selectorVariants.not(notMatch[1]);
      if (selectorVariants[raw]) return selectorVariants[raw]();
      return raw;
    }
  );
}

function resolveVariants(selector, variants) {
  let media = null;
  let finalSelector = selector;

  for (const v of variants) {
    if (breakpoints[v]) {
      media = breakpoints[v];
    } else if (pseudoVariants.has(v)) {
      finalSelector += `:${v}`;
    } else if (v === "dark") {
      // Special handling for dark variant
      finalSelector = `.dark ${finalSelector}`;
    } else {
      for (const key in specialVariants) {
        if (v.startsWith(`${key}-`)) {
          const state = v.slice(key.length + 1);
          finalSelector = specialVariants[key](state, finalSelector);
          break;
        }
      }
    }
  }

  return { media, finalSelector };
}

function inlineStyleToJson(styleString) {
  const styles = styleString.split(";").filter((style) => style.trim() !== "");
  const styleObject = {};
  const cssVariables = {};

  // First pass: collect CSS variables
  styles.forEach((style) => {
    const [key, value] = style.split(":").map((s) => s.trim());
    if (key && key.startsWith("--")) {
      cssVariables[key] = value;
    }
  });

  // Helper to resolve CSS variables recursively
  const resolveVariables = (value) => {
    if (!value || !value.includes("var(")) return value;

    let resolved = value;
    let maxIterations = 10; // Prevent infinite loops

    while (resolved.includes("var(") && maxIterations-- > 0) {
      resolved = resolved.replace(
        /var\((--[a-zA-Z0-9-]+)(?:,\s*([^)]+))?\)/g,
        (match, variable, fallback) => {
          return cssVariables[variable] || fallback || match;
        }
      );
    }

    return resolved;
  };

  // Second pass: create style object with resolved values
  styles.forEach((style) => {
    const [key, value] = style.split(":").map((s) => s.trim());
    if (key && value && !key.startsWith("--")) {
      const camelCaseKey = key.replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      styleObject[camelCaseKey] = resolveVariables(value);
    }
  });

  return styleObject;
}

// Cache for CSS resolution
const cssResolutionCache = new LRUCache(1000);

// Enhanced debounce with performance tracking
function debounce(func, wait = 100) {
  let timeout;
  let callCount = 0;

  return function (...args) {
    const context = this;
    callCount++;

    // eslint-disable-next-line no-undef
    clearTimeout(timeout);
    // eslint-disable-next-line no-undef
    timeout = setTimeout(() => {
      const marker = performanceMonitor.start(
        `debounced:${func.name || "anonymous"}`
      );
      try {
        const result = func.apply(context, args);
        performanceMonitor.end(marker);
        return result;
      } catch (error) {
        performanceMonitor.end(marker);
        logger.error(`Debounced function error (call #${callCount}):`, error);
        throw error;
      }
    }, wait);
  };
}

// Enhanced CSS resolution with better error handling
function separateAndResolveCSS(arr) {
  const marker = performanceMonitor.start("css:resolve");

  try {
    // Fix: cacheKey must be unique for each input array
    const cacheKey = Array.isArray(arr) ? arr.join("|") : String(arr);
    if (cssResolutionCache.has(cacheKey)) {
      performanceMonitor.end(marker);
      return cssResolutionCache.get(cacheKey);
    }

    // Process CSS resolution
    const cssProperties = {};
    arr.forEach((item) => {
      if (!item) return;

      try {
        const declarations = item
          .split(";")
          .map((decl) => decl.trim())
          .filter((decl) => decl);

        declarations.forEach((declaration) => {
          const colonIndex = declaration.indexOf(":");
          if (colonIndex === -1) return;

          const key = declaration.substring(0, colonIndex).trim();
          const value = declaration.substring(colonIndex + 1).trim();

          if (key && value) {
            // Prioritize more specific values (e.g., !important)
            if (value.includes("!important") || !cssProperties[key]) {
              cssProperties[key] = value;
            }
          }
        });
      } catch (error) {
        logger.warn("Error processing CSS declaration:", item, error);
      }
    });

    const resolvedProperties = { ...cssProperties };

    const resolveValue = (value, variables, maxDepth = 10) => {
      if (!value || !value.includes("var(") || maxDepth <= 0) return value;

      try {
        let resolved = value;
        let hasVariables = true;
        let depth = 0;

        // Keep resolving until no more variables or max depth reached
        while (hasVariables && depth < maxDepth) {
          const before = resolved;

          // Manual parsing to handle nested parentheses in fallback values
          let result = "";
          let i = 0;

          while (i < resolved.length) {
            // Look for var(
            if (resolved.substr(i, 4) === "var(") {
              i += 4;

              // Extract variable name
              let varName = "";
              while (
                i < resolved.length &&
                resolved[i] !== "," &&
                resolved[i] !== ")"
              ) {
                varName += resolved[i];
                i++;
              }

              // Check for fallback
              let fallback = "";
              if (resolved[i] === ",") {
                i++; // skip comma
                // Parse fallback - count parentheses
                let parenCount = 1; // We're inside var()
                while (i < resolved.length && parenCount > 0) {
                  if (resolved[i] === "(") parenCount++;
                  else if (resolved[i] === ")") {
                    parenCount--;
                    if (parenCount === 0) break;
                  }
                  fallback += resolved[i];
                  i++;
                }
              }

              // Skip closing )
              if (resolved[i] === ")") i++;

              // Resolve variable
              const resolvedVar = variables[varName.trim()];
              if (resolvedVar) {
                result += resolvedVar;
              } else if (fallback) {
                result += fallback.trim();
              } else {
                // Keep original if can't resolve
                result += `var(${varName}`;
                if (fallback) result += `,${fallback}`;
                result += ")";
              }
            } else {
              result += resolved[i];
              i++;
            }
          }

          resolved = result;
          hasVariables = resolved.includes("var(");
          depth++;

          // If nothing changed, break to avoid infinite loop
          if (before === resolved) break;
        }

        return resolved;
      } catch (error) {
        logger.warn("Error resolving CSS variable:", value, error);
        return value;
      }
    };

    // Resolve variables recursively - multiple passes
    let maxPasses = 5;
    let hasUnresolved = true;

    while (hasUnresolved && maxPasses-- > 0) {
      hasUnresolved = false;

      Object.keys(resolvedProperties).forEach((key) => {
        const resolved = resolveValue(
          resolvedProperties[key],
          resolvedProperties
        );

        if (resolved !== resolvedProperties[key]) {
          resolvedProperties[key] = resolved;
          hasUnresolved = true;
        }
      });
    }

    // Remove CSS variables after resolution
    Object.keys(resolvedProperties).forEach((key) => {
      if (key.startsWith("--")) {
        delete resolvedProperties[key];
      }
    });

    const result = Object.entries(resolvedProperties)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ");

    cssResolutionCache.set(cacheKey, result);
    performanceMonitor.end(marker);
    return result;
  } catch (error) {
    performanceMonitor.end(marker);
    logger.error("Critical error in CSS resolution:", error);
    return "";
  }
}

/**
 * Process opacity modifier from class name (e.g., text-red-500/50 -> 50% opacity)
 * @param {string} className - Class name with potential opacity modifier
 * @param {string} cssDeclaration - CSS declaration to modify
 * @returns {string} Modified CSS declaration with opacity applied
 */
function processOpacityModifier(className, cssDeclaration) {
  const opacityMatch = className.match(/\/(\d+)$/);
  if (!opacityMatch) return cssDeclaration;

  const opacityValue = parseInt(opacityMatch[1], 10);
  if (opacityValue < 0 || opacityValue > 100) return cssDeclaration;

  const alphaValue = (opacityValue / 100).toString();

  // Handle Tailwind's CSS custom property pattern
  let modifiedDeclaration = cssDeclaration;

  // Replace opacity custom properties
  const opacityProperties = [
    "--text-opacity",
    "--bg-opacity",
    "--border-opacity",
    "--ring-opacity",
    "--divide-opacity",
    "--placeholder-opacity",
    "--text-decoration-opacity",
    "--outline-opacity",
    "--accent-opacity",
    "--caret-opacity",
  ];

  opacityProperties.forEach((prop) => {
    const propRegex = new RegExp(`${prop}\\s*:\\s*[\\d.]+`, "gi");
    modifiedDeclaration = modifiedDeclaration.replace(
      propRegex,
      `${prop}: ${alphaValue}`
    );
  });

  // Also handle direct color values that might not use CSS variables
  const colorProperties = [
    "color",
    "background-color",
    "border-color",
    "text-decoration-color",
    "outline-color",
    "fill",
    "stroke",
    "caret-color",
    "accent-color",
  ];

  colorProperties.forEach((prop) => {
    // Match rgb(), rgba(), hsl(), hsla() functions
    const rgbRegex = new RegExp(
      `(${prop}\\s*:\\s*)rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)`,
      "gi"
    );
    const rgbaRegex = new RegExp(
      `(${prop}\\s*:\\s*)rgba\\((\\d+),\\s*(\\d+),\\s*(\\d+),\\s*[\\d.]+\\)`,
      "gi"
    );
    const hslRegex = new RegExp(
      `(${prop}\\s*:\\s*)hsl\\((\\d+),\\s*([\\d.]+%),\\s*([\\d.]+%)\\)`,
      "gi"
    );
    const hslaRegex = new RegExp(
      `(${prop}\\s*:\\s*)hsla\\((\\d+),\\s*([\\d.]+%),\\s*([\\d.]+%),\\s*[\\d.]+\\)`,
      "gi"
    );

    // Convert rgb to rgba with opacity
    modifiedDeclaration = modifiedDeclaration.replace(
      rgbRegex,
      `$1rgba($2, $3, $4, ${alphaValue})`
    );

    // Update existing rgba opacity
    modifiedDeclaration = modifiedDeclaration.replace(
      rgbaRegex,
      `$1rgba($2, $3, $4, ${alphaValue})`
    );

    // Convert hsl to hsla with opacity
    modifiedDeclaration = modifiedDeclaration.replace(
      hslRegex,
      `$1hsla($2, $3, $4, ${alphaValue})`
    );

    // Update existing hsla opacity
    modifiedDeclaration = modifiedDeclaration.replace(
      hslaRegex,
      `$1hsla($2, $3, $4, ${alphaValue})`
    );

    // Handle hex colors
    const hexRegex = new RegExp(`(${prop}\\s*:\\s*)(#[0-9a-fA-F]{3,6})`, "gi");
    modifiedDeclaration = modifiedDeclaration.replace(
      hexRegex,
      (match, propPart, hexColor) => {
        // Convert hex to rgba
        const hex = hexColor.replace("#", "");
        let r, g, b;

        if (hex.length === 3) {
          r = parseInt(hex[0] + hex[0], 16);
          g = parseInt(hex[1] + hex[1], 16);
          b = parseInt(hex[2] + hex[2], 16);
        } else {
          r = parseInt(hex.substring(0, 2), 16);
          g = parseInt(hex.substring(2, 4), 16);
          b = parseInt(hex.substring(4, 6), 16);
        }

        return `${propPart}rgba(${r}, ${g}, ${b}, ${alphaValue})`;
      }
    );
  });

  return modifiedDeclaration;
}

/**
 * Convert Tailwind class string to inline CSS styles or JSON object
 * @param {string} classNames - String containing Tailwind classes to convert
 * @param {boolean} convertToJson - If true, result will be JSON object, if false becomes CSS string
 * @returns {string|Object} Inline CSS string or style JSON object
 */
export function tws(classNames, convertToJson) {
  const totalMarker = performanceMonitor.start("tws:total");

  try {
    // Initialize CSS object using singleton cache
    const cssObject = tailwindCache.getOrGenerate(
      generateTailwindCssString,
      convertCssToObject
    );

    if (
      [
        !classNames,
        typeof classNames !== "string",
        classNames.trim() === "",
      ].includes(true)
    ) {
      performanceMonitor.end(totalMarker);
      return convertToJson ? {} : "";
    }

    let classes;
    try {
      const parseMarker = performanceMonitor.start("tws:parse");
      classes = classNames.match(/[\w-\/]+(?:\/\d+)?(?:\[[^\]]+\])?/g);
      performanceMonitor.end(parseMarker);

      // If no valid classes are found
      if (!classes || classes.length === 0) {
        logger.warn(
          `No valid Tailwind classes found in input: "${classNames}"`
        );
        performanceMonitor.end(totalMarker);
        return convertToJson ? {} : "";
      }
    } catch (error) {
      logger.error(`Error parsing Tailwind classes: ${error.message}`);
      performanceMonitor.end(totalMarker);
      return convertToJson ? {} : "";
    }

    // Process classes with performance monitoring
    const processMarker = performanceMonitor.start("tws:process");
    let cssResult = classes.map((className) => {
      // Extract base class name without opacity modifier
      // Only remove /digits if it's an opacity modifier (not a fraction like w-2/3)
      // Opacity modifiers are typically /0-100, fractions are /2, /3, /4, /5, /6, /12
      const opacityMatch = className.match(/\/(\d+)$/);
      let baseClassName = className;
      let hasOpacityModifier = false;

      if (opacityMatch) {
        const opacityValue = parseInt(opacityMatch[1], 10);
        // If it's a valid opacity value (0-100), treat it as opacity modifier
        if (opacityValue >= 0 && opacityValue <= 100) {
          // Check if this could be a fraction (e.g., w-2/3, h-1/2)
          // Fractions typically have denominators of 2, 3, 4, 5, 6, 12
          const couldBeFraction =
            fractionDenominators.includes(opacityValue) &&
            fractionPrefixes.some(
              (prefix) =>
                className.startsWith(prefix) ||
                className.startsWith(`-${prefix}`)
            );
          if (!couldBeFraction) {
            baseClassName = className.replace(/\/\d+$/, "");
            hasOpacityModifier = true;
          }
        }
      }

      let result =
        cssObject[baseClassName] ||
        cssObject[baseClassName.replace(/\//g, "\\/")] ||
        cssObject[baseClassName.replace(/\./g, "\\.")];

      if (result) {
        // Apply opacity modifier if present
        if (
          hasOpacityModifier &&
          className.includes("/") &&
          /\/\d+$/.test(className)
        ) {
          result = processOpacityModifier(className, result);
        }
        return resolveCssToClearCss(result);
      } else if (baseClassName.includes("[")) {
        const match = baseClassName.match(/\[([^\]]+)\]/);
        if (match) {
          const customValue = match[1];
          const baseKey = baseClassName.split("[")[0];
          if (cssObject[`${baseKey}custom`]) {
            let customResult = cssObject[`${baseKey}custom`].replace(
              /custom_value/g,
              customValue
            );
            // Apply opacity modifier to custom values too
            if (
              hasOpacityModifier &&
              className.includes("/") &&
              /\/\d+$/.test(className)
            ) {
              customResult = processOpacityModifier(className, customResult);
            }
            return customResult;
          }
        }
      }
      return "";
    });
    performanceMonitor.end(processMarker);

    // Resolve CSS
    cssResult = performanceMonitor.measure(
      () => separateAndResolveCSS(cssResult),
      "tws:resolve"
    );

    // Convert to JSON if needed
    if (convertToJson) {
      cssResult = performanceMonitor.measure(
        () => inlineStyleToJson(cssResult),
        "tws:json"
      );
    }

    performanceMonitor.end(totalMarker);
    return cssResult;
  } catch (error) {
    performanceMonitor.end(totalMarker);
    handleError(error, { classNames, convertToJson });
    return convertToJson ? {} : "";
  }
}

// Performance monitoring utilities
const performanceMonitor = {
  enabled: typeof performance !== "undefined",

  start(label) {
    if (!this.enabled) return null;
    return {
      label,
      startTime: performance.now(),
    };
  },

  end(marker) {
    if (!this.enabled || !marker) return;
    const duration = performance.now() - marker.startTime;
    if (duration > 5) {
      // Only log if > 5ms
      logger.warn(`Slow ${marker.label}: ${duration.toFixed(2)}ms`);
    }
  },

  measure(fn, label) {
    const marker = this.start(label);
    try {
      const result = fn();
      this.end(marker);
      return result;
    } catch (error) {
      this.end(marker);
      throw error;
    }
  },
};

// Utility functions for class expansion
function expandDirectiveGroups(str) {
  return str.replace(/(\w+)\(([^()]+)\)/g, (_, directive, content) => {
    // Special handling for dark mode syntax: dark:(classes)
    if (directive === "dark") {
      return content
        .trim()
        .split(/\s+/)
        .map((cls) => `dark:${cls}`)
        .join(" ");
    }

    return content
      .trim()
      .split(/\s+/)
      .map((val) => {
        if (val.includes(":")) {
          const [variant, v] = val.split(":");
          const prefix = v.startsWith("-") ? "-" : "";
          const value = v.startsWith("-") ? v.slice(1) : v;
          return `${variant}:${prefix}${directive}-${value}`;
        }
        const prefix = val.startsWith("-") ? "-" : "";
        const value = val.startsWith("-") ? val.slice(1) : val;
        return `${prefix}${directive}-${value}`;
      })
      .join(" ");
  });
}

function expandVariants(str, parent = "") {
  return str.replace(
    /(\w+):\(([^()]+(?:\((?:[^()]+)\))?[^()]*)\)/g,
    (_, variant, content) => {
      return content
        .trim()
        .split(/\s+/)
        .map((c) => {
          if (/\w+:\(.*\)/.test(c)) {
            return expandVariants(c, parent ? `${parent}:${variant}` : variant);
          }
          return `${parent ? `${parent}:${variant}` : variant}:${c}`;
        })
        .join(" ");
    }
  );
}

function expandGroupedClass(input) {
  let result = encodeBracketValues(input);
  let prev;

  do {
    prev = result;
    result = expandVariants(result);
    result = expandDirectiveGroups(result);
  } while (result !== prev);

  return result;
}
// CSS Processing utilities
const parseSelectorCache = new LRUCache(500);

function parseSelector(selector) {
  if (parseSelectorCache.has(selector)) {
    return parseSelectorCache.get(selector);
  }

  let result;
  if (selector.includes("@css")) {
    const parts = selector.split("@css");
    const baseSelector = parts[0].trim();
    const cssProperty = parts[1]?.trim();
    result = { baseSelector, cssProperty };
  } else {
    result = { baseSelector: selector, cssProperty: null };
  }

  parseSelectorCache.set(selector, result);
  return result;
}

function processClass(cls, selector, styles) {
  if (cls.trim() === "") return;

  const [rawVariants, className] = cls.includes(":")
    ? [cls.split(":").slice(0, -1), cls.split(":").slice(-1)[0]]
    : [[], cls];

  let isImportant = false;
  let pureClassName = className;

  if (className.startsWith("!")) {
    isImportant = true;
    pureClassName = className.slice(1);
  }

  const { media, finalSelector } = resolveVariants(selector, rawVariants);

  // Extract base class name without opacity modifier for CSS lookup
  // Only remove /digits if it's an opacity modifier (not a fraction like w-2/3)
  const opacityMatch = pureClassName.match(/\/(\d+)$/);
  let baseClassName = pureClassName;
  let hasOpacityModifier = false;

  if (opacityMatch) {
    const opacityValue = parseInt(opacityMatch[1], 10);
    // If it's a valid opacity value (0-100), treat it as opacity modifier
    if (opacityValue >= 0 && opacityValue <= 100) {
      // Check if this could be a fraction (e.g., w-2/3, h-1/2, top-1/2, etc.)
      const couldBeFraction =
        fractionDenominators.includes(opacityValue) &&
        fractionPrefixes.some(
          (prefix) =>
            pureClassName.startsWith(prefix) ||
            pureClassName.startsWith(`-${prefix}`)
        );
      if (!couldBeFraction) {
        baseClassName = pureClassName.replace(/\/\d+$/, "");
        hasOpacityModifier = true;
      }
    }
  }

  // Get cssObject from singleton cache
  const cssObject = tailwindCache.getOrGenerate(
    generateTailwindCssString,
    convertCssToObject
  );

  let declarations =
    cssObject[baseClassName] ||
    cssObject[baseClassName.replace(/(\/)/g, "\\$1")] ||
    cssObject[baseClassName.replace(/\./g, "\\.")];

  if (!declarations && baseClassName.includes("[")) {
    const match = baseClassName.match(/^(.+?)\[(.+)\]$/);
    if (match) {
      const [, prefix, dynamicValue] = match;
      const customKey = `${prefix}custom`;
      const template = cssObject[customKey];
      if (template) {
        declarations = template.replace(
          /custom_value/g,
          decodeBracketValues(dynamicValue)
        );
      }
    }
  }

  if (!declarations) {
    declarations = parseCustomClassWithPatterns(baseClassName);
  }

  if (!declarations) {
    return;
  }

  // Apply opacity modifier if present
  if (
    hasOpacityModifier &&
    pureClassName.includes("/") &&
    /\/\d+$/.test(pureClassName)
  ) {
    declarations = processOpacityModifier(pureClassName, declarations);
  }

  if (isImportant) {
    declarations = declarations.replace(
      /([^:;]+):([^;]+)(;?)/g,
      (_, prop, value) => {
        return prop.trim().startsWith("--")
          ? `${prop}:${value};`
          : `${prop}:${value.trim()} !important;`;
      }
    );
  }

  const isSpaceOrDivide = [
    "space-x-",
    "-space-x-",
    "space-y-",
    "-space-y-",
    "divide-",
  ].some((prefix) => baseClassName.startsWith(prefix));

  const expandedSelector = replaceSelector(finalSelector);
  const targetSelector = isSpaceOrDivide
    ? `${expandedSelector} > :not([hidden]) ~ :not([hidden])`
    : expandedSelector;

  if (media) {
    styles[media] = styles[media] || {};
    styles[media][targetSelector] = styles[media][targetSelector] || "";
    styles[media][targetSelector] += declarations + "\n";
  } else {
    styles[targetSelector] = styles[targetSelector] || "";
    styles[targetSelector] += declarations + "\n";
  }
}

function processNestedSelectors(nested, selector, styles, walk) {
  for (const nestedSel in nested) {
    const nestedVal = nested[nestedSel];
    if (nestedSel === "@css" && typeof nestedVal === "object") {
      // For @css directive, use raw CSS values without any processing
      const cssDeclarations = Object.entries(nestedVal)
        .map(([key, value]) => {
          // Convert camelCase to kebab-case (e.g., borderTopColor -> border-top-color)
          const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
          // Ensure CSS values are properly formatted and not processed through Tailwind conversion
          const cleanValue =
            typeof value === "string" ? value.trim() : String(value);
          return `${cssKey}: ${cleanValue};`;
        })
        .join(" ");

      if (selector in styles) {
        styles[selector] += cssDeclarations + "\n";
      } else {
        styles[selector] = cssDeclarations + "\n";
      }
      continue;
    }

    const combinedSel = nestedSel.includes("&")
      ? nestedSel.replace(/&/g, selector)
      : `${selector} ${nestedSel}`;
    walk(combinedSel, nestedVal);
  }
}

function walkStyleTree(selector, val, styles, walk) {
  if (!selector || typeof selector !== "string") {
    logger.warn("Invalid selector in walk function:", selector);
    return;
  }

  const { baseSelector, cssProperty } = parseSelector(selector);
  if (
    cssProperty &&
    typeof val === "object" &&
    Array.isArray(val) &&
    val.length > 0
  ) {
    const cssValue = val[0];
    if (typeof cssValue === "string") {
      styles[baseSelector] = styles[baseSelector] || "";
      styles[baseSelector] += `${cssProperty}: ${cssValue};\n`;
      return;
    }
  }

  if (Array.isArray(val)) {
    const [base, nested] = val;

    if (typeof base !== "string") {
      return;
    }

    // Process base classes
    for (const cls of base.split(" ")) {
      processClass(cls, selector, styles);
    }

    // Process nested selectors
    processNestedSelectors(nested, selector, styles, walk);
  } else if (typeof val === "string") {
    if (val.trim() === "") return;
    walk(selector, [expandGroupedClass(val)]);
  } else if (typeof val === "object" && val !== null) {
    const { baseSelector, cssProperty } = parseSelector(selector);
    if (cssProperty) {
      const cssValue = Object.values(val).join(" ");
      styles[baseSelector] = styles[baseSelector] || "";
      styles[baseSelector] += `${cssProperty}: ${cssValue};\n`;
      return;
    }

    // Check if this is a @css object within the current object
    if (val["@css"] && typeof val["@css"] === "object") {
      // Handle object with @css directive - process the @css part specially
      const cssDeclarations = Object.entries(val["@css"])
        .map(([key, value]) => {
          // Convert camelCase to kebab-case (e.g., borderTopColor -> border-top-color)
          const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
          // Keep CSS values intact without any processing
          const cleanValue =
            typeof value === "string" ? value.trim() : String(value);
          return `${cssKey}: ${cleanValue};`;
        })
        .join(" ");

      if (selector in styles) {
        styles[selector] += cssDeclarations + "\n";
      } else {
        styles[selector] = cssDeclarations + "\n";
      }

      // Process other properties in the object (non-@css)
      const otherProps = { ...val };
      delete otherProps["@css"];

      if (Object.keys(otherProps).length > 0) {
        processNestedSelectors(otherProps, selector, styles, walk);
      }
    } else {
      // Regular object processing - use processNestedSelectors to handle properly
      processNestedSelectors(val, selector, styles, walk);
    }
  }
}

// Object flattening utilities
function isSelectorObject(val) {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

function flattenStyleObject(obj, parentSelector = "") {
  const result = {};

  for (const selector in obj) {
    const val = obj[selector];

    // Handle media queries specially - don't concatenate with parent
    if (selector.startsWith("@media")) {
      if (isSelectorObject(val)) {
        // Initialize media query in result if not exists
        if (!result[selector]) {
          result[selector] = {};
        }

        // Process nested selectors within media query
        for (const innerSel in val) {
          const innerVal = val[innerSel];

          // Calculate the target selector within media query context
          let targetSelector;
          if (parentSelector) {
            if (innerSel === "." || innerSel === "&") {
              // Self-reference - use parent selector
              targetSelector = parentSelector;
            } else if (innerSel.includes("&")) {
              // Replace & with parent
              targetSelector = innerSel.replace(/&/g, parentSelector);
            } else {
              // Descendant selector
              targetSelector = `${parentSelector} ${innerSel}`;
            }
          } else {
            targetSelector = innerSel;
          }

          // Recursively flatten inner value
          if (typeof innerVal === "string") {
            result[selector][targetSelector] = innerVal;
          } else if (isSelectorObject(innerVal)) {
            const nested = flattenStyleObject(
              { [innerSel]: innerVal },
              parentSelector
            );
            // Merge nested results into media query
            for (const nestedSel in nested) {
              if (nestedSel.startsWith("@media")) {
                // Nested media query - merge at top level
                Object.assign(result, nested);
              } else {
                result[selector][nestedSel] = nested[nestedSel];
              }
            }
          }
        }
      }
      continue;
    }

    const currentSelector = parentSelector
      ? selector.includes("&")
        ? selector.replace(/&/g, parentSelector)
        : `${parentSelector} ${selector}`
      : selector;

    if (typeof val === "string") {
      result[currentSelector] = val;
    } else if (Array.isArray(val)) {
      const flatArray = [];
      for (const item of val) {
        if (typeof item === "string") {
          flatArray.push(item);
        } else if (isSelectorObject(item)) {
          const nested = flattenStyleObject(item, currentSelector);
          Object.assign(result, nested);
        }
      }
      if (flatArray.length > 0) {
        result[currentSelector] = result[currentSelector] || [];
        result[currentSelector].push(...flatArray);
      }
    } else if (isSelectorObject(val)) {
      const nested = flattenStyleObject(val, currentSelector);
      Object.assign(result, nested);
    }
  }

  return result;
}

// CSS Generation utilities
function generateCssString(styles) {
  const baseStyles = [];
  const mediaStyles = [];

  for (const sel in styles) {
    if (!sel.startsWith("@media")) {
      baseStyles.push({ sel, css: styles[sel] });
    } else {
      mediaStyles.push({ sel, content: styles[sel] });
    }
  }

  let cssString = "";

  // Add base styles
  for (const { sel, css } of baseStyles) {
    cssString += `${sel}{${css.trim().replace(/\n/g, "")}}`;
  }

  // Sort and add media queries
  function mediaPriority(sel) {
    const match = sel.match(/@media \(min-width: (\d+)px\)/);
    return match ? parseInt(match[1], 10) : 99999;
  }

  mediaStyles.sort((a, b) => mediaPriority(a.sel) - mediaPriority(b.sel));

  for (const { sel, content } of mediaStyles) {
    cssString += `${sel}{`;
    for (const subSel in content) {
      cssString += `${subSel}{${content[subSel].trim().replace(/\n/g, "")}}`;
    }
    cssString += "}";
  }

  return cssString.trim();
}

/**
 * Generate CSS string from style object with SCSS-like syntax
 * Supports nested selectors, state variants, responsive variants, and @css directives
 * @param {Object} obj - Object with SCSS-like style format
 * @param {Object} [options] - Additional options, e.g. { inject: true/false }
 * @returns {string} Generated CSS string
 */
export function twsx(obj, options = {}) {
  const totalMarker = performanceMonitor.start("twsx:total");

  try {
    if (!obj || typeof obj !== "object") {
      logger.warn("twsx: Expected an object but received:", obj);
      return "";
    }

    const { inject = true } = options;
    const styles = {};

    // Create walk function with closure over styles
    function walk(selector, val) {
      walkStyleTree(selector, val, styles, walk);
    }

    // Enhanced selector processing to handle responsive breakpoints
    const enhancedObj = {};

    for (const selector in obj) {
      const val = obj[selector];

      // Check if selector starts with breakpoint (e.g., 'md:.title')
      const breakpointMatch = selector.match(/^(sm|md|lg|xl|2xl):(.+)$/);

      if (breakpointMatch) {
        const [, breakpoint, baseSelector] = breakpointMatch;

        if (typeof val === "string") {
          // Convert 'md:.title': 'text-lg' to '.title': 'md:text-lg'
          if (!enhancedObj[baseSelector]) {
            enhancedObj[baseSelector] = "";
          }

          // Add responsive classes to the base selector
          const responsiveClasses = val
            .split(" ")
            .map((cls) => `${breakpoint}:${cls}`)
            .join(" ");
          enhancedObj[baseSelector] +=
            (enhancedObj[baseSelector] ? " " : "") + responsiveClasses;
        } else {
          // For non-string values (objects, arrays), keep original structure
          enhancedObj[selector] = val;
        }
      } else {
        // Regular selector - keep as is
        enhancedObj[selector] = val;
      }
    }

    // Flatten the enhanced input object
    const flattered = performanceMonitor.measure(
      () => flattenStyleObject(enhancedObj),
      "twsx:flatten"
    );

    // Process each selector
    const processMarker = performanceMonitor.start("twsx:process");
    for (const selector in flattered) {
      const val = flattered[selector];

      // Handle media queries specially - don't process through walk
      if (selector.startsWith("@media")) {
        // Media query should have nested selectors with Tailwind classes
        if (typeof val === "object" && !Array.isArray(val)) {
          // Initialize media query in styles
          if (!styles[selector]) {
            styles[selector] = {};
          }

          // Process each selector within the media query
          for (const innerSelector in val) {
            const innerVal = val[innerSelector];
            const baseClass =
              typeof innerVal === "string" ? expandGroupedClass(innerVal) : "";

            // Process Tailwind classes for this selector
            if (baseClass) {
              for (const cls of baseClass.split(" ")) {
                if (cls.trim()) {
                  processClass(cls, innerSelector, styles[selector]);
                }
              }
            }
          }
        }
        continue;
      }

      let baseClass = "";
      const nested = {};

      if (typeof val === "string") {
        // Check if this is a @css property value - if so, don't process through expandGroupedClass
        if (selector.includes(" @css ")) {
          // This is a CSS property value from @css flattening - keep as-is
          baseClass = val;
        } else {
          // Regular Tailwind class - process normally
          baseClass = expandGroupedClass(val);
        }
      } else if (Array.isArray(val)) {
        for (const item of val) {
          if (typeof item === "string") {
            baseClass += (baseClass ? " " : "") + expandGroupedClass(item);
          } else if (typeof item === "object" && item !== null) {
            Object.assign(nested, item);
          }
        }
      }

      walk(selector, [baseClass, nested]);
    }
    performanceMonitor.end(processMarker);

    // Generate CSS string
    const cssString = performanceMonitor.measure(
      () => generateCssString(styles),
      "twsx:generate"
    );

    // Smart keyframe injection - only inject what's used and not already injected
    const keyframesMarker = performanceMonitor.start("twsx:keyframes");

    // Scan CSS for animation names (support camelCase like fadeIn, slideUp)
    const usedAnimations = new Set();
    const animationRegex = /animation(?:-name)?:\s*([a-zA-Z0-9-]+)/gi;
    let match;
    while ((match = animationRegex.exec(cssString)) !== null) {
      const animName = match[1];
      // Check both original case and lowercase
      if (BUILTIN_KEYFRAMES[animName]) {
        usedAnimations.add(animName);
      } else if (BUILTIN_KEYFRAMES[animName.toLowerCase()]) {
        usedAnimations.add(animName.toLowerCase());
      }
    }

    // Filter out already injected keyframes
    const newKeyframes = [...usedAnimations].filter(
      (name) => !_injectedKeyframes.has(name)
    );

    // Mark as injected
    newKeyframes.forEach((name) => _injectedKeyframes.add(name));

    // Generate minified keyframes CSS only for new ones
    const keyframesCSS = generateMinifiedKeyframes(newKeyframes);

    // Also check for custom keyframes from user config
    const userConfigData = getConfig();
    const mergedOptions = {
      ...options,
      theme: {
        ...options.theme,
        ...userConfigData.theme,
        extend: {
          ...options.theme?.extend,
          ...userConfigData.theme?.extend,
        },
      },
    };
    const configOptions = getConfigOptions(mergedOptions, Object.keys(plugins));
    const { keyframes = {} } = configOptions.theme || {};

    let customKeyframesCSS = "";
    for (const [name, keyframe] of Object.entries(keyframes)) {
      // Skip if already in built-in keyframes or already injected
      if (BUILTIN_KEYFRAMES[name] || _injectedKeyframes.has(name)) continue;

      // Check if this custom keyframe is used
      const customRegex = new RegExp(`animation(?:-name)?:\\s*${name}`, "i");
      if (!customRegex.test(cssString)) continue;

      _injectedKeyframes.add(name);

      // Generate minified custom keyframe
      customKeyframesCSS += `@keyframes ${name}{`;
      for (const [percentage, styles] of Object.entries(keyframe)) {
        customKeyframesCSS += `${percentage}{`;
        for (const [prop, value] of Object.entries(styles)) {
          const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
          customKeyframesCSS += `${cssProp}:${value};`;
        }
        customKeyframesCSS += "}";
      }
      customKeyframesCSS += "}";
    }
    performanceMonitor.end(keyframesMarker);

    // Combine keyframes and regular CSS
    const finalCSS = keyframesCSS + customKeyframesCSS + cssString;

    // Auto-inject if needed
    if (
      inject &&
      typeof window !== "undefined" &&
      typeof document !== "undefined"
    ) {
      performanceMonitor.measure(() => autoInjectCss(finalCSS), "twsx:inject");
    }

    performanceMonitor.end(totalMarker);
    return finalCSS;
  } catch (error) {
    performanceMonitor.end(totalMarker);
    handleError(error, { obj, options });
    return "";
  }
}

/**
 * Create a variant-based style generator (similar to tailwind-variants)
 * Supports base styles, variants, compound variants, and default variants
 *
 * @param {Object} config - Configuration object
 * @param {string} config.base - Base Tailwind classes applied to all variants
 * @param {Object} config.variants - Variant definitions with their options
 * @param {Array} config.compoundVariants - Compound variant rules for multi-variant combinations
 * @param {Object} config.defaultVariants - Default variant values
 * @returns {Function} A function that accepts variant props and returns merged classes
 *
 * @example
 * const button = twsxVariants({
 *   base: 'px-4 py-2 rounded font-medium',
 *   variants: {
 *     color: {
 *       primary: 'bg-blue-500 text-white',
 *       secondary: 'bg-gray-500 text-white'
 *     },
 *     size: {
 *       sm: 'text-sm',
 *       lg: 'text-lg'
 *     }
 *   },
 *   compoundVariants: [
 *     { color: 'primary', size: 'lg', class: 'font-bold shadow-lg' }
 *   ],
 *   defaultVariants: {
 *     color: 'primary',
 *     size: 'sm'
 *   }
 * });
 *
 * // Usage:
 * button({ color: 'primary', size: 'lg' }) // Returns merged classes
 */
export function twsxVariants(config) {
  const {
    className,
    base = "",
    variants = {},
    compoundVariants = [],
    defaultVariants = {},
  } = config;

  /**
   * Check if a compound variant matches the current props
   * @param {Object} compound - Compound variant definition
   * @param {Object} props - Current variant props
   * @returns {boolean}
   */
  function matchesCompoundVariant(compound, props) {
    for (const key in compound) {
      if (key === "class" || key === "className") continue;

      const compoundValue = compound[key];
      const propValue = props[key];

      // Handle array values in compound (match any)
      if (Array.isArray(compoundValue)) {
        if (!compoundValue.includes(propValue)) return false;
      } else {
        // Handle boolean variants - convert string 'true'/'false' to boolean
        const normalizedCompound =
          compoundValue === "true"
            ? true
            : compoundValue === "false"
              ? false
              : compoundValue;
        const normalizedProp =
          propValue === "true"
            ? true
            : propValue === "false"
              ? false
              : propValue;

        if (normalizedCompound !== normalizedProp) return false;
      }
    }
    return true;
  }

  /**
   * Merge multiple class strings with conflict resolution
   * Later classes override earlier ones for the same CSS property
   * @param  {...string} classStrings - Class strings to merge
   * @returns {string}
   */
  function mergeClasses(...classStrings) {
    const result = [];
    const propertyMap = new Map(); // Track index by conflict key

    /**
     * Extract conflict key from Tailwind class
     * Classes that affect the same CSS property should have the same key
     */
    function getConflictKey(cls) {
      // Extract variant prefix (hover:, focus:, etc.)
      const variantMatch = cls.match(/^((?:[a-z-]+:)*)/);
      const variant = variantMatch ? variantMatch[1] : "";
      const baseClass = cls.slice(variant.length);

      // Check if it's a prefixed standalone (e.g., bg-transparent, text-transparent)
      const prefixedStandalone = baseClass.match(
        /^([a-z]+)-(transparent|current|inherit|auto)$/
      );
      if (prefixedStandalone) {
        const prefix = prefixedStandalone[1];
        return variant + prefix;
      }

      // Handle standalone utilities (no prefix)
      const standaloneGroups = {
        "inline-flex": "display",
        "inline-block": "display",
        inline: "display",
        block: "display",
        flex: "display",
        grid: "display",
        hidden: "display",
        static: "position",
        fixed: "position",
        absolute: "position",
        relative: "position",
        sticky: "position",
        visible: "visibility",
        invisible: "visibility",
        underline: "text-decoration",
        "line-through": "text-decoration",
        "no-underline": "text-decoration",
        uppercase: "text-transform",
        lowercase: "text-transform",
        capitalize: "text-transform",
        "normal-case": "text-transform",
        truncate: "text-overflow",
        italic: "font-style",
        "not-italic": "font-style",
        antialiased: "font-smoothing",
        "subpixel-antialiased": "font-smoothing",
      };

      if (standaloneGroups[baseClass]) {
        return variant + standaloneGroups[baseClass];
      }

      // Match pattern: prefix-value or prefix-modifier-value
      // bg-blue-500, text-xl, px-4, rounded-lg, shadow-md, border-2, etc.
      const match = baseClass.match(/^([a-z]+)-(.+)$/);

      if (match) {
        const prefix = match[1];
        const value = match[2];

        // Group related prefixes
        const prefixGroups = {
          // Background
          bg: "bg",
          // Text color vs text size
          text: /^(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/.test(
            value
          )
            ? "text-size"
            : "text-color",
          // Padding
          p: "p",
          px: "px",
          py: "py",
          pt: "pt",
          pb: "pb",
          pl: "pl",
          pr: "pr",
          // Margin
          m: "m",
          mx: "mx",
          my: "my",
          mt: "mt",
          mb: "mb",
          ml: "ml",
          mr: "mr",
          // Sizing
          w: "w",
          h: "h",
          min: baseClass.startsWith("min-w") ? "min-w" : "min-h",
          max: baseClass.startsWith("max-w") ? "max-w" : "max-h",
          // Border width vs color
          border: /^(\d|t-|b-|l-|r-|x-|y-)/.test(value)
            ? "border-width"
            : /^(solid|dashed|dotted|double|none|hidden)$/.test(value)
              ? "border-style"
              : "border-color",
          rounded: "rounded",
          // Effects
          shadow: "shadow",
          opacity: "opacity",
          // Typography
          font: /^(sans|serif|mono)$/.test(value)
            ? "font-family"
            : "font-weight",
          leading: "leading",
          tracking: "tracking",
          // Layout
          flex: "flex",
          grid: "grid",
          gap: "gap",
          justify: "justify",
          items: "items",
          self: "self",
          place: "place",
          // Position
          top: "top",
          bottom: "bottom",
          left: "left",
          right: "right",
          inset: "inset",
          z: "z",
          // Cursor
          cursor: "cursor",
          // Pointer events
          pointer: "pointer-events",
          // Transform
          scale: "scale",
          rotate: "rotate",
          translate: "translate",
          skew: "skew",
          // Transition
          transition: "transition",
          duration: "duration",
          ease: "ease",
          delay: "delay",
          // Ring
          ring: /^(\d|inset)/.test(value)
            ? "ring-width"
            : /^offset/.test(value)
              ? "ring-offset"
              : "ring-color",
          // Outline
          outline: /^(\d|none)/.test(value)
            ? "outline-width"
            : /^(dashed|dotted|double|solid)$/.test(value)
              ? "outline-style"
              : /^offset/.test(value)
                ? "outline-offset"
                : "outline-color",
          // Overflow
          overflow: "overflow",
          // Object
          object: "object",
          // Aspect
          aspect: "aspect",
          // Underline
          underline: "underline-offset",
          // Decoration
          decoration: "decoration",
          // Accent
          accent: "accent",
          // Caret
          caret: "caret",
          // Fill & Stroke
          fill: "fill",
          stroke: /^\d/.test(value) ? "stroke-width" : "stroke-color",
          // Backdrop
          backdrop: "backdrop",
          // Columns
          columns: "columns",
          col: "col",
          row: "row",
          // Order
          order: "order",
          // Grow/Shrink
          grow: "grow",
          shrink: "shrink",
          basis: "basis",
          // Content
          content: "content",
          // List
          list: "list",
          // Scroll
          scroll: "scroll",
          // Snap
          snap: "snap",
          // Touch
          touch: "touch",
          // Select
          select: "select",
          // Will change
          will: "will-change",
          // Appearance
          appearance: "appearance",
          // Break
          break: "break",
          // Hyphens
          hyphens: "hyphens",
          // Whitespace
          whitespace: "whitespace",
          // Word break
          word: "word-break",
          // Overscroll
          overscroll: "overscroll",
          // Resize
          resize: "resize",
          // Float
          float: "float",
          // Clear
          clear: "clear",
          // Isolation
          isolation: "isolation",
          // Mix blend
          mix: "mix-blend",
          // Background blend
          bg: "bg",
          // Filter
          filter: "filter",
          blur: "blur",
          brightness: "brightness",
          contrast: "contrast",
          grayscale: "grayscale",
          hue: "hue-rotate",
          invert: "invert",
          saturate: "saturate",
          sepia: "sepia",
          drop: "drop-shadow",
        };

        const group = prefixGroups[prefix] || prefix;
        return variant + group;
      }

      return null; // No conflict tracking
    }

    for (const str of classStrings) {
      if (!str) continue;

      const classes = str.trim().split(/\s+/);
      for (const cls of classes) {
        if (!cls) continue;

        const conflictKey = getConflictKey(cls);

        if (conflictKey) {
          // Remove previous class with same conflict key
          const prevIndex = propertyMap.get(conflictKey);
          if (prevIndex !== undefined) {
            result[prevIndex] = null; // Mark for removal
          }
          propertyMap.set(conflictKey, result.length);
        }

        result.push(cls);
      }
    }

    return result.filter(Boolean).join(" ");
  }

  /**
   * Generate classes for a specific variant combination
   * @param {Object} props - Variant props
   * @returns {string} Merged Tailwind classes
   */
  function generateClasses(props = {}) {
    // Merge props with defaults
    const mergedProps = { ...defaultVariants, ...props };

    // Start with base classes
    const classes = [base];

    // Add variant classes
    for (const variantKey in variants) {
      const variantValue = mergedProps[variantKey];
      const variantOptions = variants[variantKey];

      if (variantValue !== undefined && variantOptions[variantValue]) {
        classes.push(variantOptions[variantValue]);
      }
    }

    // Add compound variant classes
    for (const compound of compoundVariants) {
      if (matchesCompoundVariant(compound, mergedProps)) {
        classes.push(compound.class || compound.className || "");
      }
    }

    // Merge all classes
    return mergeClasses(...classes);
  }

  // If className is provided, auto-generate and inject CSS
  if (className) {
    const baseClassName = className.startsWith(".")
      ? className.slice(1)
      : className;
    const cssObj = {};

    // Get all variant keys and their options
    const variantKeys = Object.keys(variants);

    // Helper to generate all combinations
    function generateCombinations(keys, current = {}) {
      if (keys.length === 0) {
        // Generate class name from current combination
        const parts = [baseClassName];
        for (const key of variantKeys) {
          if (
            current[key] !== undefined &&
            current[key] !== defaultVariants[key]
          ) {
            // Skip boolean 'false' values
            if (current[key] === false || current[key] === "false") continue;
            // For boolean 'true', just add the key name
            if (current[key] === true || current[key] === "true") {
              parts.push(key);
            } else {
              parts.push(current[key]);
            }
          }
        }

        const selector = "." + parts.join("-");
        const classes = generateClasses(current);
        cssObj[selector] = classes;
        return;
      }

      const [firstKey, ...restKeys] = keys;
      const options = variants[firstKey];

      for (const optionValue of Object.keys(options)) {
        generateCombinations(restKeys, { ...current, [firstKey]: optionValue });
      }
    }

    // Generate all combinations
    generateCombinations(variantKeys);

    // Inject CSS using twsx
    twsx(cssObj);

    // No return value
    return;
  }

  // If no className, return the variant function (backward compatible)
  return function variantFn(props = {}) {
    return generateClasses(props);
  };
}

// Simple hashCode function for CSS deduplication
function getCssHash(str) {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

// Enhanced auto-inject CSS with performance monitoring
const injectedCssHashSet = new Set();
function autoInjectCss(cssString) {
  const marker = performanceMonitor.start("css:inject");

  try {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const cssHash = getCssHash(cssString);
      if (injectedCssHashSet.has(cssHash)) {
        performanceMonitor.end(marker);
        return;
      }

      injectedCssHashSet.add(cssHash);
      let styleTag = document.getElementById("twsx-auto-style");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "twsx-auto-style";
        document.head.appendChild(styleTag);
      }
      styleTag.textContent += `\n${cssString}`;

      // Log injection stats periodically
      if (injectedCssHashSet.size % 10 === 0) {
        logger.debug(
          `CSS injection stats: ${injectedCssHashSet.size} unique stylesheets injected`
        );
      }
    }
    performanceMonitor.end(marker);
  } catch (error) {
    performanceMonitor.end(marker);
    logger.error("Error injecting CSS:", error);
  }
}

// Enhanced debounced functions with performance monitoring configuration
/**
 * Debounced version of tws function with performance monitoring
 * @param {string} classNames - String containing Tailwind classes to convert
 * @param {boolean} convertToJson - If true, result will be JSON object, if false becomes CSS string
 * @returns {string|Object} Inline CSS string or style JSON object
 */
export const debouncedTws = debounce(tws, 50); // Faster debounce for tws

/**
 * Debounced version of twsx function with performance monitoring
 * @param {Object} obj - Object with SCSS-like style format
 * @param {Object} [options] - Additional options
 * @returns {string} Generated CSS string
 */
export const debouncedTwsx = debounce(twsx, 100); // Standard debounce for twsx

// Export performance utilities for debugging
export const performanceUtils = {
  getStats() {
    return {
      cacheStats: {
        cssResolution: cssResolutionCache.size,
        configOptions: configOptionsCache.size,
        parseSelector: parseSelectorCache.size,
        encodeBracket: encodeBracketCache.size,
        decodeBracket: decodeBracketCache.size,
      },
      injectionStats: {
        uniqueStylesheets: injectedCssHashSet.size,
      },
    };
  },

  clearCaches() {
    const marker = performanceMonitor.start("performance:clearCaches");
    cssResolutionCache.clear();
    parseSelectorCache.clear();
    encodeBracketCache.clear();
    decodeBracketCache.clear();
    logger.info("All caches cleared");
    performanceMonitor.end(marker);
  },

  enablePerformanceLogging(enabled = true) {
    performanceMonitor.enabled = enabled && typeof performance !== "undefined";
    logger.info(`Performance monitoring ${enabled ? "enabled" : "disabled"}`);
  },
};

// Export utility classes and functions
export { logger, Logger } from "./utils/logger.js";
export { LRUCache } from "./utils/lruCache.js";
export { TwsError, onError, handleError } from "./utils/errorHandler.js";
export { getTailwindCache, resetTailwindCache } from "./utils/tailwindCache.js";

// Export configuration and plugin system
export { configure, getConfig, resetConfig } from "./config/userConfig.js";
export {
  createPlugin,
  createUtilityPlugin,
  createVariantPlugin,
} from "./plugins/pluginAPI.js";

// Export dynamic animation utilities
export { applyWebAnimation, initWebAnimations } from "./utils/webAnimations.js";

export {
  createDynamicAnimation,
  createTemplateAnimation,
  applyDynamicAnimation,
  DYNAMIC_TEMPLATES,
} from "./utils/dynamicAnimations.js";

export {
  applyInlineAnimation,
  animateElement,
  chainAnimations,
  staggerAnimations,
  INLINE_ANIMATIONS,
} from "./utils/inlineAnimations.js";

// End of exports - v3.0.0 core only (tws, twsx, twsxVariants, configure)
