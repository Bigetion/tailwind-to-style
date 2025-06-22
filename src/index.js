import { getConfigOptions } from "./utils/index";

import generateAccentColor from "./generators/accentColor";
import generateAccessibility from "./generators/accessibility";
import generateAlignContent from "./generators/alignContent";
import generateAlignItems from "./generators/alignItems";
import generateAlignSelf from "./generators/alignSelf";
import generateAppearance from "./generators/appearance";
import generateAspect from "./generators/aspect";
import generateBackgroundAttachment from "./generators/backgroundAttachment";
import generateBackgroundClip from "./generators/backgroundClip";
import generateBackgroundColor from "./generators/backgroundColor";
import generateBackgroundImage from "./generators/backgroundImage";
import generateBackgroundOpacity from "./generators/backgroundOpacity";
import generateBackgroundOrigin from "./generators/backgroundOrigin";
import generateBackgroundPosition from "./generators/backgroundPosition";
import generateBackgroundRepeat from "./generators/backgroundRepeat";
import generateBackgroundSize from "./generators/backgroundSize";
import generateBlur from "./generators/blur";
import generateBorderCollapse from "./generators/borderCollapse";
import generateBorderColor from "./generators/borderColor";
import generateBorderOpacity from "./generators/borderOpacity";
import generateBorderRadius from "./generators/borderRadius";
import generateBorderSpacing from "./generators/borderSpacing";
import generateBorderStyle from "./generators/borderStyle";
import generateBorderWidth from "./generators/borderWidth";
import generateBoxDecorationBreak from "./generators/boxDecorationBreak";
import generateBoxShadow from "./generators/boxShadow";
import generateBoxSizing from "./generators/boxSizing";
import generateBrightness from "./generators/brightness";
import generateCaptionSide from "./generators/captionSide";
import generateCaretColor from "./generators/caretColor";
import generateClear from "./generators/clear";
import generateContent from "./generators/content";
import generateContrast from "./generators/contrast";
import generateCursor from "./generators/cursor";
import generateDisplay from "./generators/display";
import generateDivideColor from "./generators/divideColor";
import generateDivideOpacity from "./generators/divideOpacity";
import generateDivideStyle from "./generators/divideStyle";
import generateDivideWidth from "./generators/divideWidth";
import generateDropShadow from "./generators/dropShadow";
import generateFill from "./generators/fill";
import generateFilter from "./generators/filter";
import generateFlex from "./generators/flex";
import generateFlexBasis from "./generators/flexBasis";
import generateFlexDirection from "./generators/flexDirection";
import generateFlexGrow from "./generators/flexGrow";
import generateFlexShrink from "./generators/flexShrink";
import generateFlexWrap from "./generators/flexWrap";
import generateFloat from "./generators/float";
import generateFontSize from "./generators/fontSize";
import generateFontSmoothing from "./generators/fontSmoothing";
import generateFontStyle from "./generators/fontStyle";
import generateFontVariantNumeric from "./generators/fontVariantNumeric";
import generateFontWeight from "./generators/fontWeight";
import generateGap from "./generators/gap";
import generateGradientColorStops from "./generators/gradientColorStops";
import generateGrayscale from "./generators/grayscale";
import generateGridAutoColumns from "./generators/gridAutoColumns";
import generateGridAutoFlow from "./generators/gridAutoFlow";
import generateGridAutoRows from "./generators/gridAutoRows";
import generateGridColumn from "./generators/gridColumn";
import generateGridColumnEnd from "./generators/gridColumnEnd";
import generateGridColumnStart from "./generators/gridColumnStart";
import generateGridRow from "./generators/gridRow";
import generateGridRowEnd from "./generators/gridRowEnd";
import generateGridRowStart from "./generators/gridRowStart";
import generateGridTemplateColumns from "./generators/gridTemplateColumns";
import generateGridTemplateRows from "./generators/gridTemplateRows";
import generateHeight from "./generators/height";
import generateHueRotate from "./generators/hueRotate";
import generateHyphens from "./generators/hyphens";
import generateInset from "./generators/inset";
import generateInvert from "./generators/invert";
import generateIsolation from "./generators/isolation";
import generateJustifyContent from "./generators/justifyContent";
import generateJustifyItems from "./generators/justifyItems";
import generateJustifySelf from "./generators/justifySelf";
import generateLetterSpacing from "./generators/letterSpacing";
import generateLineClamp from "./generators/lineClamp";
import generateLineHeight from "./generators/lineHeight";
import generateListStylePosition from "./generators/listStylePosition";
import generateListStyleType from "./generators/listStyleType";
import generateMargin from "./generators/margin";
import generateMaxHeight from "./generators/maxHeight";
import generateMaxWidth from "./generators/maxWidth";
import generateMinHeight from "./generators/minHeight";
import generateMinWidth from "./generators/minWidth";
import generateMixBlendMode from "./generators/mixBlendMode";
import generateObjectFit from "./generators/objectFit";
import generateObjectPosition from "./generators/objectPosition";
import generateOpacity from "./generators/opacity";
import generateOrder from "./generators/order";
import generateOutlineColor from "./generators/outlineColor";
import generateOutlineOffset from "./generators/outlineOffset";
import generateOutlineOpacity from "./generators/outlineOpacity";
import generateOutlineStyle from "./generators/outlineStyle";
import generateOutlineWidth from "./generators/outlineWidth";
import generateOverflow from "./generators/overflow";
import generateOverscrollBehavior from "./generators/overscrollBehavior";
import generatePadding from "./generators/padding";
import generatePlaceContent from "./generators/placeContent";
import generatePlaceItems from "./generators/placeItems";
import generatePlaceSelf from "./generators/placeSelf";
import generatePointerEvents from "./generators/pointerEvents";
import generatePosition from "./generators/position";
import generateResize from "./generators/resize";
import generateRingColor from "./generators/ringColor";
import generateRingOffsetColor from "./generators/ringOffsetColor";
import generateRingOffsetWidth from "./generators/ringOffsetWidth";
import generateRingOpacity from "./generators/ringOpacity";
import generateRingWidth from "./generators/ringWidth";
import generateSaturate from "./generators/saturate";
import generateRotate from "./generators/rotate";
import generateScale from "./generators/scale";
import generateScrollBehavior from "./generators/scrollBehavior";
import generateScrollMargin from "./generators/scrollMargin";
import generateScrollPadding from "./generators/scrollPadding";
import generateScrollSnapAlign from "./generators/scrollSnapAlign";
import generateScrollSnapStop from "./generators/scrollSnapStop";
import generateScrollSnapType from "./generators/scrollSnapType";
import generateSepia from "./generators/sepia";
import generateSize from "./generators/size";
import generateSkew from "./generators/skew";
import generateSpace from "./generators/space";
import generateStroke from "./generators/stroke";
import generateStrokeWidth from "./generators/strokeWidth";
import generateTableLayout from "./generators/tableLayout";
import generateTextAlign from "./generators/textAlign";
import generateTextColor from "./generators/textColor";
import generateTextDecoration from "./generators/textDecoration";
import generateTextDecorationColor from "./generators/textDecorationColor";
import generateTextDecorationStyle from "./generators/textDecorationStyle";
import generateTextDecorationThickness from "./generators/textDecorationThickness";
import generateTextIndent from "./generators/textIndent";
import generateTextOpacity from "./generators/textOpacity";
import generateTextOverflow from "./generators/textOverflow";
import generateTextShadowBlur from "./generators/textShadowBlur";
import generateTextShadowColor from "./generators/textShadowColor";
import generateTextShadowOpacity from "./generators/textShadowOpacity";
import generateTextShadowX from "./generators/textShadowX";
import generateTextShadowY from "./generators/textShadowY";
import generateTextTransform from "./generators/textTransform";
import generateTextUnderlineOffset from "./generators/textUnderlineOffset";
import generateTextWrap from "./generators/textWrap";
import generateTouchAction from "./generators/touchAction";
import generateTransform from "./generators/transform";
import generateTransformOrigin from "./generators/transformOrigin";
import generateTranslate from "./generators/translate";
import generateUserSelect from "./generators/userSelect";
import generateVerticalAlign from "./generators/verticalAlign";
import generateVisibility from "./generators/visibility";
import generateWhitespace from "./generators/whitespace";
import generateWidth from "./generators/width";
import generateWordBreak from "./generators/wordBreak";
import generateWillChange from "./generators/willChange";
import generateZIndex from "./generators/zIndex";

import patterns from "./patterns/index";

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

// Cache untuk getConfigOptions
const configOptionsCache = new Map();
const cacheKey = (options) => JSON.stringify(options);

function generateTailwindCssString(options = {}) {
  const pluginKeys = Object.keys(plugins);
  // Menggunakan cache untuk mencegah pemrosesan ulang yang tidak perlu
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

if (!twString) {
  twString = generateTailwindCssString().replace(/\s\s+/g, " ");
}

if (!cssObject) {
  cssObject = convertCssToObject(twString);
}

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
};

const selectorVariants = {
  first: () => `> :first-child`,
  last: () => `> :last-child`,
  odd: () => `> :nth-child(odd)`,
  even: () => `> :nth-child(even)`,
  not: (arg) => `> :not(${arg})`,
  number: (arg) => `> :nth-child(${arg})`,
};

// Mengoptimalkan encoding/decoding bracket values dengan memoization
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

// Cache untuk CSS resolusi
const cssResolutionCache = new Map();

function separateAndResolveCSS(arr) {
  // Membuat kunci cache  const cacheKey = arr.join('|');
  if (cssResolutionCache.has(cacheKey)) {
    return cssResolutionCache.get(cacheKey);
  }

  // Batasi ukuran cache untuk menghindari memory leak
  limitCacheSize(cssResolutionCache);

  const cssProperties = {};
  arr.forEach((item) => {
    if (!item) return;

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
        // Prioritaskan nilai yang lebih spesifik (misalnya !important)
        if (value.includes("!important") || !cssProperties[key]) {
          cssProperties[key] = value;
        }
      }
    });
  });

  const resolvedProperties = { ...cssProperties };

  const resolveValue = (value, variables) => {
    if (!value || !value.includes("var(")) return value;

    return value.replace(
      /var\((--[a-zA-Z0-9-]+)(?:,\s*([^)]+))?\)/g,
      (match, variable, fallback) => {
        return variables[variable] || fallback || match;
      }
    );
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
  return result;
}

// Fungsi untuk membatasi ukuran cache untuk mencegah memory leak
function limitCacheSize(cache, maxSize = 1000) {
  if (cache.size > maxSize) {
    // Hapus 20% entri yang paling lama
    const entriesToRemove = Math.floor(cache.size * 0.2);
    const keys = Array.from(cache.keys()).slice(0, entriesToRemove);
    keys.forEach((key) => cache.delete(key));
  }
}

// Implementasi fungsi debounce untuk mengoptimalkan panggilan berulang
function debounce(func, wait = 100) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

/**
 * Mengkonversi string kelas Tailwind menjadi inline styles CSS atau objek JSON
 * @param {string} classNames - String berisi kelas Tailwind yang akan dikonversi
 * @param {boolean} convertToJson - Jika true, hasil akan menjadi objek JSON, jika false menjadi string CSS
 * @returns {string|Object} String CSS inline atau objek style JSON
 */
export function tws(classNames, convertToJson) {
  if (
    [
      !classNames,
      typeof classNames !== "string",
      classNames.trim() === "",
    ].includes(true)
  ) {
    return convertToJson ? {} : "";
  }

  let classes;
  try {
    classes = classNames.match(/[\w-]+\[[^\]]+\]|[\w-]+\.\d+|[\w-]+/g);

    // Jika tidak ada class yang valid ditemukan
    if (!classes || classes.length === 0) {
      console.warn(`No valid Tailwind classes found in input: "${classNames}"`);
      return convertToJson ? {} : "";
    }
  } catch (error) {
    console.error(`Error parsing Tailwind classes: ${error.message}`);
    return convertToJson ? {} : "";
  }

  let cssResult = classes.map((className) => {
    if (cssObject[className]) {
      return cssObject[className];
    } else if (className.includes("[")) {
      const match = className.match(/\[([^\]]+)\]/);
      if (match) {
        const customValue = match[1];
        const baseKey = className.split("[")[0];
        if (cssObject[`${baseKey}custom`]) {
          return cssObject[`${baseKey}custom`].replace(
            /custom_value/g,
            customValue
          );
        }
      }
    }
    return "";
  });

  cssResult = separateAndResolveCSS(cssResult);

  if (convertToJson) {
    cssResult = inlineStyleToJson(cssResult);
  }

  return cssResult;
}

/**
 * Menghasilkan string CSS dari objek style dengan sintaks mirip SCSS
 * Mendukung nested selectors, state variants, responsive variants, dan @css directives
 * @param {Object} obj - Objek dengan format style mirip SCSS
 * @returns {string} String CSS yang dihasilkan
 */
export function twsx(obj) {
  if (!obj || typeof obj !== "object") {
    console.warn("twsx: Expected an object but received:", obj);
    return "";
  }

  const styles = {};

  function expandGroupedClass(input) {
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
                return expandVariants(
                  c,
                  parent ? `${parent}:${variant}` : variant
                );
              }
              return `${parent ? `${parent}:${variant}` : variant}:${c}`;
            })
            .join(" ");
        }
      );
    }

    let result = encodeBracketValues(input);
    let prev;

    do {
      prev = result;
      result = expandVariants(result);
      result = expandDirectiveGroups(result);
    } while (result !== prev);

    return result;
  }
  function walk(selector, val) {
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

      for (const cls of base.split(" ")) {
        if (cls.trim() === "") continue;

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

        let declarations =
          cssObject[pureClassName] ||
          cssObject[pureClassName.replace(/(\/)/g, "\\$1")] ||
          cssObject[pureClassName.replace(/\./g, "\\.")];

        if (!declarations && pureClassName.includes("[")) {
          const match = pureClassName.match(/^(.+?)\[(.+)\]$/);
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
          declarations = parseCustomClassWithPatterns(pureClassName);
        }

        if (!declarations) {
          continue;
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
        ].some((prefix) => pureClassName.startsWith(prefix));

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

  // Menambahkan memoization untuk parseSelector
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

  function isSelectorObject(val) {
    return typeof val === "object" && val !== null && !Array.isArray(val);
  }

  function flatten(obj, parentSelector = "") {
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
            const nested = flatten(item, currentSelector);
            Object.assign(result, nested);
          }
        }
        if (flatArray.length > 0) {
          result[currentSelector] = result[currentSelector] || [];
          result[currentSelector].push(...flatArray);
        }
      } else if (isSelectorObject(val)) {
        const nested = flatten(val, currentSelector);
        Object.assign(result, nested);
      }
    }

    return result;
  }

  const flattened = flatten(obj);

  for (const selector in flattened) {
    let val = flattened[selector];
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

  let cssString = "";

  const baseStyles = [];
  const mediaStyles = [];

  for (const sel in styles) {
    if (!sel.startsWith("@media")) {
      baseStyles.push({ sel, css: styles[sel] });
    } else {
      mediaStyles.push({ sel, content: styles[sel] });
    }
  }

  for (const { sel, css } of baseStyles) {
    cssString += `${sel}{${css.trim().replace(/\n/g, "")}}`;
  }

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

// Daftarkan versi debounced dari fungsi-fungsi export
/**
 * Versi debounced dari fungsi tws
 * Membantu mengoptimalkan performa ketika memanggil tws berulang kali
 * @param {string} classNames - String berisi kelas Tailwind yang akan dikonversi
 * @param {boolean} convertToJson - Jika true, hasil akan menjadi objek JSON, jika false menjadi string CSS
 * @returns {string|Object} String CSS inline atau objek style JSON
 */
export const debouncedTws = debounce(tws);

/**
 * Versi debounced dari fungsi twsx
 * Membantu mengoptimalkan performa ketika memanggil twsx berulang kali
 * @param {Object} obj - Objek dengan format style mirip SCSS
 * @returns {string} String CSS yang dihasilkan
 */
export const debouncedTwsx = debounce(twsx);
