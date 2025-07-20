import { getConfigOptions } from "./utils/index.js";

import generateAccentColor from "./generators/accentColor.js";
import generateAccessibility from "./generators/accessibility.js";
import generateAlignContent from "./generators/alignContent.js";
import generateAlignItems from "./generators/alignItems.js";
import generateAlignSelf from "./generators/alignSelf.js";
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
import generateBrightness from "./generators/brightness.js";
import generateCaptionSide from "./generators/captionSide.js";
import generateCaretColor from "./generators/caretColor.js";
import generateClear from "./generators/clear.js";
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
import generateTranslate from "./generators/translate.js";
import generateUserSelect from "./generators/userSelect.js";
import generateVerticalAlign from "./generators/verticalAlign.js";
import generateVisibility from "./generators/visibility.js";
import generateWhitespace from "./generators/whitespace.js";
import generateWidth from "./generators/width.js";
import generateWordBreak from "./generators/wordBreak.js";
import generateWillChange from "./generators/willChange.js";
import generateZIndex from "./generators/zIndex.js";

import patterns from "./patterns/index.js";

const plugins = {
  accentColor: generateAccentColor,
  accessibility: generateAccessibility,
  alignContent: generateAlignContent,
  alignItems: generateAlignItems,
  alignSelf: generateAlignSelf,
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
  brightness: generateBrightness,
  captionSide: generateCaptionSide,
  caretColor: generateCaretColor,
  clear: generateClear,
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
  // Build CSS string
  return Object.entries(props)
    .map(([k, v]) => `${k}: ${v};`)
    .join(" ");
}

// Cache for getConfigOptions
const configOptionsCache = new Map();
const cacheKey = (options) => JSON.stringify(options);

function generateTailwindCssString(options = {}) {
  const pluginKeys = Object.keys(plugins);
  // Use cache to prevent unnecessary reprocessing
  const key = cacheKey(options);
  if (!configOptionsCache.has(key)) {
    configOptionsCache.set(key, getConfigOptions(options, pluginKeys));
    limitCacheSize(configOptionsCache);
  }

  const configOptions = configOptionsCache.get(key);
  const { corePlugins = {} } = configOptions;
  const corePluginKeys = Object.keys(corePlugins);

  let cssString = ``;
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

  return obj;
}

let twString = null;
let cssObject = null;

let globalConfig = {
  theme: {
    extend: {
      colors: {},
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  inject: true,
};

function initializeCss() {
  if (!twString) {
    const configForGeneration = {
      ...globalConfig,
      theme: {
        ...globalConfig.theme,
      },
    };

    twString = generateTailwindCssString(configForGeneration).replace(
      /\s\s+/g,
      " "
    );
  }

  if (!cssObject) {
    cssObject = convertCssToObject(twString);
  }
}

initializeCss();

function convertScreensToBreakpoints(screens) {
  const breakpoints = {};
  for (const [key, value] of Object.entries(screens)) {
    breakpoints[key] = `@media (min-width: ${value})`;
  }
  return breakpoints;
}

/**
 * Set global configuration for both tws and twsx functions
 * @param {Object} config - Global configuration object
 * @returns {Object} Current global configuration
 */
export function setConfig(config) {
  // Reset CSS object cache when config changes
  twString = null;
  cssObject = null;
  configOptionsCache.clear();

  globalConfig = {
    ...globalConfig,
    ...config,
    theme: {
      ...globalConfig.theme,
      ...(config.theme || {}),
      extend: {
        ...globalConfig.theme.extend,
        ...(config.theme?.extend || {}),
        colors: {
          ...globalConfig.theme.extend.colors,
          ...(config.theme?.extend?.colors || {}),
        },
      },
    },
  };

  // Handle screens configuration
  if (config.theme?.screens) {
    globalConfig.theme.screens = {
      ...globalConfig.theme.screens,
      ...config.theme.screens,
    };
  }

  initializeCss();

  return globalConfig;
}

/**
 * Get current global configuration
 * @returns {Object} Current global configuration
 */
export function getConfig() {
  return { ...globalConfig };
}

/**
 * Reset global configuration to default
 * @returns {Object} Default configuration
 */
export function resetConfig() {
  twString = null;
  cssObject = null;
  configOptionsCache.clear();

  globalConfig = {
    theme: {
      extend: {
        colors: {},
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    inject: true,
  };

  twString = generateTailwindCssString(globalConfig).replace(/\s\s+/g, " ");
  cssObject = convertCssToObject(twString);

  return globalConfig;
}

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
};

const selectorVariants = {
  first: () => `> :first-child`,
  last: () => `> :last-child`,
  odd: () => `> :nth-child(odd)`,
  even: () => `> :nth-child(even)`,
  not: (arg) => `> :not(${arg})`,
  number: (arg) => `> :nth-child(${arg})`,
};

// Optimize encoding/decoding bracket values with memoization
const encodeBracketCache = new Map();
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
  limitCacheSize(encodeBracketCache);
  return result;
}

const decodeBracketCache = new Map();
function decodeBracketValues(input) {
  if (!input) return input;
  if (decodeBracketCache.has(input)) return decodeBracketCache.get(input);

  const result = decodeURIComponent(input)
    .replace(/__P__/g, "(")
    .replace(/__C__/g, ")");

  decodeBracketCache.set(input, result);
  limitCacheSize(decodeBracketCache);
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
    const breakpoints = convertScreensToBreakpoints(
      globalConfig.theme.screens || {}
    );

    if (breakpoints[v]) {
      media = breakpoints[v];
    } else if (pseudoVariants.has(v)) {
      finalSelector += `:${v}`;
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

  styles.forEach((style) => {
    const [key, value] = style.split(":").map((s) => s.trim());
    if (key && value) {
      const camelCaseKey = key.replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      styleObject[camelCaseKey] = value;
    }
  });

  return styleObject;
}

// Cache for CSS resolution
const cssResolutionCache = new Map();

// Enhanced cache management with performance monitoring
function limitCacheSize(cache, maxSize = 1000) {
  if (cache.size > maxSize) {
    const cleanupMarker = performanceMonitor.start("cache:cleanup");
    // Remove 20% of the oldest entries
    const entriesToRemove = Math.floor(cache.size * 0.2);
    const keys = Array.from(cache.keys()).slice(0, entriesToRemove);
    keys.forEach((key) => cache.delete(key));
    performanceMonitor.end(cleanupMarker);
  }
}

// Enhanced debounce with performance tracking
function debounce(func, wait = 100) {
  let timeout;
  let callCount = 0;

  return function (...args) {
    const context = this;
    callCount++;

    clearTimeout(timeout);
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
        console.error(`Debounced function error (call #${callCount}):`, error);
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

    // Limit cache size to avoid memory leaks
    limitCacheSize(cssResolutionCache);

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
        console.warn("Error processing CSS declaration:", item, error);
      }
    });

    const resolvedProperties = { ...cssProperties };

    const resolveValue = (value, variables) => {
      if (!value || !value.includes("var(")) return value;

      try {
        return value.replace(
          /var\((--[a-zA-Z0-9-]+)(?:,\s*([^)]+))?\)/g,
          (match, variable, fallback) => {
            return variables[variable] || fallback || match;
          }
        );
      } catch (error) {
        console.warn("Error resolving CSS variable:", value, error);
        return value;
      }
    };

    // Resolve variables
    Object.keys(resolvedProperties).forEach((key) => {
      resolvedProperties[key] = resolveValue(
        resolvedProperties[key],
        resolvedProperties
      );
    });

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
    console.error("Critical error in CSS resolution:", error);
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
      (_, propPart, hexColor) => {
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
    // Ensure CSS is initialized with current global config
    initializeCss();

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
        console.warn(
          `No valid Tailwind classes found in input: "${classNames}"`
        );
        performanceMonitor.end(totalMarker);
        return convertToJson ? {} : "";
      }
    } catch (error) {
      console.error(`Error parsing Tailwind classes: ${error.message}`);
      performanceMonitor.end(totalMarker);
      return convertToJson ? {} : "";
    }

    // Process classes with performance monitoring
    const processMarker = performanceMonitor.start("tws:process");
    let cssResult = classes.map((className) => {
      // Extract base class name without opacity modifier
      const baseClassName = className.replace(/\/\d+$/, "");

      let result =
        cssObject[baseClassName] ||
        cssObject[baseClassName.replace(/(\/)/g, "\\$1")] ||
        cssObject[baseClassName.replace(/\./g, "\\.")];

      if (result) {
        // Apply opacity modifier if present
        if (className.includes("/") && /\/\d+$/.test(className)) {
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
            if (className.includes("/") && /\/\d+$/.test(className)) {
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
    console.error("tws error:", error);
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
      console.warn(`Slow ${marker.label}: ${duration.toFixed(2)}ms`);
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
const parseSelectorCache = new Map();

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
  limitCacheSize(parseSelectorCache);
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
  const baseClassName = pureClassName.replace(/\/\d+$/, "");

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
  if (pureClassName.includes("/") && /\/\d+$/.test(pureClassName)) {
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
      const cssDeclarations = Object.entries(nestedVal)
        .map(([key, value]) => `${key}: ${value};`)
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
    console.warn("Invalid selector in walk function:", selector);
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

    const cssDeclarations = Object.entries(val)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ");

    if (selector in styles) {
      styles[selector] += cssDeclarations + "\n";
    } else {
      styles[selector] = cssDeclarations + "\n";
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
    cssString += `}`;
  }

  return cssString.trim();
}

/**
 * Generate CSS string from style object with SCSS-like syntax
 * Supports nested selectors, state variants, responsive variants, and @css directives
 * @param {Object} obj - Object with SCSS-like style format
 * @param {Object} [options] - Additional options, merges with global config
 * @returns {string} Generated CSS string
 */
export function twsx(obj, options = {}) {
  const totalMarker = performanceMonitor.start("twsx:total");

  try {
    if (!obj || typeof obj !== "object") {
      console.warn("twsx: Expected an object but received:", obj);
      return "";
    }

    const mergedOptions = {
      ...globalConfig,
      ...options,
    };

    const { inject = true } = mergedOptions;
    const styles = {};

    // Create walk function with closure over styles
    function walk(selector, val) {
      walkStyleTree(selector, val, styles, walk);
    }

    // Flatten the input object
    const flattered = performanceMonitor.measure(
      () => flattenStyleObject(obj),
      "twsx:flatten"
    );

    // Process each selector
    const processMarker = performanceMonitor.start("twsx:process");
    for (const selector in flattered) {
      let val = flattered[selector];
      let baseClass = "";
      let nested = {};

      if (typeof val === "string") {
        baseClass = expandGroupedClass(val);
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

    // Auto-inject if needed
    if (
      inject &&
      typeof window !== "undefined" &&
      typeof document !== "undefined"
    ) {
      performanceMonitor.measure(() => autoInjectCss(cssString), "twsx:inject");
    }

    performanceMonitor.end(totalMarker);
    return cssString;
  } catch (error) {
    performanceMonitor.end(totalMarker);
    console.error("twsx error:", error);
    return "";
  }
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
        console.debug(
          `CSS injection stats: ${injectedCssHashSet.size} unique stylesheets injected`
        );
      }
    }
    performanceMonitor.end(marker);
  } catch (error) {
    performanceMonitor.end(marker);
    console.error("Error injecting CSS:", error);
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
    console.log("All caches cleared");
    performanceMonitor.end(marker);
  },

  enablePerformanceLogging(enabled = true) {
    performanceMonitor.enabled = enabled && typeof performance !== "undefined";
    console.log(`Performance monitoring ${enabled ? "enabled" : "disabled"}`);
  },
};
