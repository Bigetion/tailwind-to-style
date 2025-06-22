"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debouncedTwsx = exports.debouncedTws = void 0;
exports.tws = tws;
exports.twsx = twsx;
var _index = require("./utils/index");
var _accentColor = _interopRequireDefault(require("./generators/accentColor"));
var _accessibility = _interopRequireDefault(require("./generators/accessibility"));
var _alignContent = _interopRequireDefault(require("./generators/alignContent"));
var _alignItems = _interopRequireDefault(require("./generators/alignItems"));
var _alignSelf = _interopRequireDefault(require("./generators/alignSelf"));
var _appearance = _interopRequireDefault(require("./generators/appearance"));
var _aspect = _interopRequireDefault(require("./generators/aspect"));
var _backgroundAttachment = _interopRequireDefault(require("./generators/backgroundAttachment"));
var _backgroundClip = _interopRequireDefault(require("./generators/backgroundClip"));
var _backgroundColor = _interopRequireDefault(require("./generators/backgroundColor"));
var _backgroundImage = _interopRequireDefault(require("./generators/backgroundImage"));
var _backgroundOpacity = _interopRequireDefault(require("./generators/backgroundOpacity"));
var _backgroundOrigin = _interopRequireDefault(require("./generators/backgroundOrigin"));
var _backgroundPosition = _interopRequireDefault(require("./generators/backgroundPosition"));
var _backgroundRepeat = _interopRequireDefault(require("./generators/backgroundRepeat"));
var _backgroundSize = _interopRequireDefault(require("./generators/backgroundSize"));
var _blur = _interopRequireDefault(require("./generators/blur"));
var _borderCollapse = _interopRequireDefault(require("./generators/borderCollapse"));
var _borderColor = _interopRequireDefault(require("./generators/borderColor"));
var _borderOpacity = _interopRequireDefault(require("./generators/borderOpacity"));
var _borderRadius = _interopRequireDefault(require("./generators/borderRadius"));
var _borderSpacing = _interopRequireDefault(require("./generators/borderSpacing"));
var _borderStyle = _interopRequireDefault(require("./generators/borderStyle"));
var _borderWidth = _interopRequireDefault(require("./generators/borderWidth"));
var _boxDecorationBreak = _interopRequireDefault(require("./generators/boxDecorationBreak"));
var _boxShadow = _interopRequireDefault(require("./generators/boxShadow"));
var _boxSizing = _interopRequireDefault(require("./generators/boxSizing"));
var _brightness = _interopRequireDefault(require("./generators/brightness"));
var _captionSide = _interopRequireDefault(require("./generators/captionSide"));
var _caretColor = _interopRequireDefault(require("./generators/caretColor"));
var _clear = _interopRequireDefault(require("./generators/clear"));
var _content = _interopRequireDefault(require("./generators/content"));
var _contrast = _interopRequireDefault(require("./generators/contrast"));
var _cursor = _interopRequireDefault(require("./generators/cursor"));
var _display = _interopRequireDefault(require("./generators/display"));
var _divideColor = _interopRequireDefault(require("./generators/divideColor"));
var _divideOpacity = _interopRequireDefault(require("./generators/divideOpacity"));
var _divideStyle = _interopRequireDefault(require("./generators/divideStyle"));
var _divideWidth = _interopRequireDefault(require("./generators/divideWidth"));
var _dropShadow = _interopRequireDefault(require("./generators/dropShadow"));
var _fill = _interopRequireDefault(require("./generators/fill"));
var _filter = _interopRequireDefault(require("./generators/filter"));
var _flex = _interopRequireDefault(require("./generators/flex"));
var _flexBasis = _interopRequireDefault(require("./generators/flexBasis"));
var _flexDirection = _interopRequireDefault(require("./generators/flexDirection"));
var _flexGrow = _interopRequireDefault(require("./generators/flexGrow"));
var _flexShrink = _interopRequireDefault(require("./generators/flexShrink"));
var _flexWrap = _interopRequireDefault(require("./generators/flexWrap"));
var _float = _interopRequireDefault(require("./generators/float"));
var _fontSize = _interopRequireDefault(require("./generators/fontSize"));
var _fontSmoothing = _interopRequireDefault(require("./generators/fontSmoothing"));
var _fontStyle = _interopRequireDefault(require("./generators/fontStyle"));
var _fontVariantNumeric = _interopRequireDefault(require("./generators/fontVariantNumeric"));
var _fontWeight = _interopRequireDefault(require("./generators/fontWeight"));
var _gap = _interopRequireDefault(require("./generators/gap"));
var _gradientColorStops = _interopRequireDefault(require("./generators/gradientColorStops"));
var _grayscale = _interopRequireDefault(require("./generators/grayscale"));
var _gridAutoColumns = _interopRequireDefault(require("./generators/gridAutoColumns"));
var _gridAutoFlow = _interopRequireDefault(require("./generators/gridAutoFlow"));
var _gridAutoRows = _interopRequireDefault(require("./generators/gridAutoRows"));
var _gridColumn = _interopRequireDefault(require("./generators/gridColumn"));
var _gridColumnEnd = _interopRequireDefault(require("./generators/gridColumnEnd"));
var _gridColumnStart = _interopRequireDefault(require("./generators/gridColumnStart"));
var _gridRow = _interopRequireDefault(require("./generators/gridRow"));
var _gridRowEnd = _interopRequireDefault(require("./generators/gridRowEnd"));
var _gridRowStart = _interopRequireDefault(require("./generators/gridRowStart"));
var _gridTemplateColumns = _interopRequireDefault(require("./generators/gridTemplateColumns"));
var _gridTemplateRows = _interopRequireDefault(require("./generators/gridTemplateRows"));
var _height = _interopRequireDefault(require("./generators/height"));
var _hueRotate = _interopRequireDefault(require("./generators/hueRotate"));
var _hyphens = _interopRequireDefault(require("./generators/hyphens"));
var _inset = _interopRequireDefault(require("./generators/inset"));
var _invert = _interopRequireDefault(require("./generators/invert"));
var _isolation = _interopRequireDefault(require("./generators/isolation"));
var _justifyContent = _interopRequireDefault(require("./generators/justifyContent"));
var _justifyItems = _interopRequireDefault(require("./generators/justifyItems"));
var _justifySelf = _interopRequireDefault(require("./generators/justifySelf"));
var _letterSpacing = _interopRequireDefault(require("./generators/letterSpacing"));
var _lineClamp = _interopRequireDefault(require("./generators/lineClamp"));
var _lineHeight = _interopRequireDefault(require("./generators/lineHeight"));
var _listStylePosition = _interopRequireDefault(require("./generators/listStylePosition"));
var _listStyleType = _interopRequireDefault(require("./generators/listStyleType"));
var _margin = _interopRequireDefault(require("./generators/margin"));
var _maxHeight = _interopRequireDefault(require("./generators/maxHeight"));
var _maxWidth = _interopRequireDefault(require("./generators/maxWidth"));
var _minHeight = _interopRequireDefault(require("./generators/minHeight"));
var _minWidth = _interopRequireDefault(require("./generators/minWidth"));
var _mixBlendMode = _interopRequireDefault(require("./generators/mixBlendMode"));
var _objectFit = _interopRequireDefault(require("./generators/objectFit"));
var _objectPosition = _interopRequireDefault(require("./generators/objectPosition"));
var _opacity = _interopRequireDefault(require("./generators/opacity"));
var _order = _interopRequireDefault(require("./generators/order"));
var _outlineColor = _interopRequireDefault(require("./generators/outlineColor"));
var _outlineOffset = _interopRequireDefault(require("./generators/outlineOffset"));
var _outlineOpacity = _interopRequireDefault(require("./generators/outlineOpacity"));
var _outlineStyle = _interopRequireDefault(require("./generators/outlineStyle"));
var _outlineWidth = _interopRequireDefault(require("./generators/outlineWidth"));
var _overflow = _interopRequireDefault(require("./generators/overflow"));
var _overscrollBehavior = _interopRequireDefault(require("./generators/overscrollBehavior"));
var _padding = _interopRequireDefault(require("./generators/padding"));
var _placeContent = _interopRequireDefault(require("./generators/placeContent"));
var _placeItems = _interopRequireDefault(require("./generators/placeItems"));
var _placeSelf = _interopRequireDefault(require("./generators/placeSelf"));
var _pointerEvents = _interopRequireDefault(require("./generators/pointerEvents"));
var _position = _interopRequireDefault(require("./generators/position"));
var _resize = _interopRequireDefault(require("./generators/resize"));
var _ringColor = _interopRequireDefault(require("./generators/ringColor"));
var _ringOffsetColor = _interopRequireDefault(require("./generators/ringOffsetColor"));
var _ringOffsetWidth = _interopRequireDefault(require("./generators/ringOffsetWidth"));
var _ringOpacity = _interopRequireDefault(require("./generators/ringOpacity"));
var _ringWidth = _interopRequireDefault(require("./generators/ringWidth"));
var _saturate = _interopRequireDefault(require("./generators/saturate"));
var _rotate = _interopRequireDefault(require("./generators/rotate"));
var _scale = _interopRequireDefault(require("./generators/scale"));
var _scrollBehavior = _interopRequireDefault(require("./generators/scrollBehavior"));
var _scrollMargin = _interopRequireDefault(require("./generators/scrollMargin"));
var _scrollPadding = _interopRequireDefault(require("./generators/scrollPadding"));
var _scrollSnapAlign = _interopRequireDefault(require("./generators/scrollSnapAlign"));
var _scrollSnapStop = _interopRequireDefault(require("./generators/scrollSnapStop"));
var _scrollSnapType = _interopRequireDefault(require("./generators/scrollSnapType"));
var _sepia = _interopRequireDefault(require("./generators/sepia"));
var _size = _interopRequireDefault(require("./generators/size"));
var _skew = _interopRequireDefault(require("./generators/skew"));
var _space = _interopRequireDefault(require("./generators/space"));
var _stroke = _interopRequireDefault(require("./generators/stroke"));
var _strokeWidth = _interopRequireDefault(require("./generators/strokeWidth"));
var _tableLayout = _interopRequireDefault(require("./generators/tableLayout"));
var _textAlign = _interopRequireDefault(require("./generators/textAlign"));
var _textColor = _interopRequireDefault(require("./generators/textColor"));
var _textDecoration = _interopRequireDefault(require("./generators/textDecoration"));
var _textDecorationColor = _interopRequireDefault(require("./generators/textDecorationColor"));
var _textDecorationStyle = _interopRequireDefault(require("./generators/textDecorationStyle"));
var _textDecorationThickness = _interopRequireDefault(require("./generators/textDecorationThickness"));
var _textIndent = _interopRequireDefault(require("./generators/textIndent"));
var _textOpacity = _interopRequireDefault(require("./generators/textOpacity"));
var _textOverflow = _interopRequireDefault(require("./generators/textOverflow"));
var _textShadowBlur = _interopRequireDefault(require("./generators/textShadowBlur"));
var _textShadowColor = _interopRequireDefault(require("./generators/textShadowColor"));
var _textShadowOpacity = _interopRequireDefault(require("./generators/textShadowOpacity"));
var _textShadowX = _interopRequireDefault(require("./generators/textShadowX"));
var _textShadowY = _interopRequireDefault(require("./generators/textShadowY"));
var _textTransform = _interopRequireDefault(require("./generators/textTransform"));
var _textUnderlineOffset = _interopRequireDefault(require("./generators/textUnderlineOffset"));
var _textWrap = _interopRequireDefault(require("./generators/textWrap"));
var _touchAction = _interopRequireDefault(require("./generators/touchAction"));
var _transform = _interopRequireDefault(require("./generators/transform"));
var _transformOrigin = _interopRequireDefault(require("./generators/transformOrigin"));
var _translate = _interopRequireDefault(require("./generators/translate"));
var _userSelect = _interopRequireDefault(require("./generators/userSelect"));
var _verticalAlign = _interopRequireDefault(require("./generators/verticalAlign"));
var _visibility = _interopRequireDefault(require("./generators/visibility"));
var _whitespace = _interopRequireDefault(require("./generators/whitespace"));
var _width = _interopRequireDefault(require("./generators/width"));
var _wordBreak = _interopRequireDefault(require("./generators/wordBreak"));
var _willChange = _interopRequireDefault(require("./generators/willChange"));
var _zIndex = _interopRequireDefault(require("./generators/zIndex"));
var _index2 = _interopRequireDefault(require("./patterns/index"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const plugins = {
  accentColor: _accentColor.default,
  accessibility: _accessibility.default,
  alignContent: _alignContent.default,
  alignItems: _alignItems.default,
  alignSelf: _alignSelf.default,
  appearance: _appearance.default,
  aspect: _aspect.default,
  backgroundAttachment: _backgroundAttachment.default,
  backgroundClip: _backgroundClip.default,
  backgroundColor: _backgroundColor.default,
  backgroundImage: _backgroundImage.default,
  backgroundOpacity: _backgroundOpacity.default,
  backgroundOrigin: _backgroundOrigin.default,
  backgroundPosition: _backgroundPosition.default,
  backgroundRepeat: _backgroundRepeat.default,
  backgroundSize: _backgroundSize.default,
  blur: _blur.default,
  borderCollapse: _borderCollapse.default,
  borderColor: _borderColor.default,
  borderOpacity: _borderOpacity.default,
  borderRadius: _borderRadius.default,
  borderSpacing: _borderSpacing.default,
  borderStyle: _borderStyle.default,
  borderWidth: _borderWidth.default,
  boxDecorationBreak: _boxDecorationBreak.default,
  boxShadow: _boxShadow.default,
  boxSizing: _boxSizing.default,
  brightness: _brightness.default,
  captionSide: _captionSide.default,
  caretColor: _caretColor.default,
  clear: _clear.default,
  content: _content.default,
  contrast: _contrast.default,
  cursor: _cursor.default,
  display: _display.default,
  divideColor: _divideColor.default,
  divideOpacity: _divideOpacity.default,
  divideStyle: _divideStyle.default,
  divideWidth: _divideWidth.default,
  dropShadow: _dropShadow.default,
  fill: _fill.default,
  filter: _filter.default,
  flex: _flex.default,
  flexBasis: _flexBasis.default,
  flexDirection: _flexDirection.default,
  flexGrow: _flexGrow.default,
  flexShrink: _flexShrink.default,
  flexWrap: _flexWrap.default,
  float: _float.default,
  fontSize: _fontSize.default,
  fontSmoothing: _fontSmoothing.default,
  fontStyle: _fontStyle.default,
  fontVariantNumeric: _fontVariantNumeric.default,
  fontWeight: _fontWeight.default,
  gap: _gap.default,
  gradientColorStops: _gradientColorStops.default,
  grayscale: _grayscale.default,
  gridAutoColumns: _gridAutoColumns.default,
  gridAutoFlow: _gridAutoFlow.default,
  gridAutoRows: _gridAutoRows.default,
  gridColumn: _gridColumn.default,
  gridColumnEnd: _gridColumnEnd.default,
  gridColumnStart: _gridColumnStart.default,
  gridRow: _gridRow.default,
  gridRowEnd: _gridRowEnd.default,
  gridRowStart: _gridRowStart.default,
  gridTemplateColumns: _gridTemplateColumns.default,
  gridTemplateRows: _gridTemplateRows.default,
  height: _height.default,
  hueRotate: _hueRotate.default,
  hyphens: _hyphens.default,
  inset: _inset.default,
  invert: _invert.default,
  isolation: _isolation.default,
  justifyContent: _justifyContent.default,
  justifyItems: _justifyItems.default,
  justifySelf: _justifySelf.default,
  letterSpacing: _letterSpacing.default,
  lineClamp: _lineClamp.default,
  lineHeight: _lineHeight.default,
  listStylePosition: _listStylePosition.default,
  listStyleType: _listStyleType.default,
  margin: _margin.default,
  maxHeight: _maxHeight.default,
  maxWidth: _maxWidth.default,
  minHeight: _minHeight.default,
  minWidth: _minWidth.default,
  objectFit: _objectFit.default,
  mixBlendMode: _mixBlendMode.default,
  objectPosition: _objectPosition.default,
  opacity: _opacity.default,
  order: _order.default,
  outlineColor: _outlineColor.default,
  outlineOffset: _outlineOffset.default,
  outlineOpacity: _outlineOpacity.default,
  outlineStyle: _outlineStyle.default,
  outlineWidth: _outlineWidth.default,
  overflow: _overflow.default,
  overscrollBehavior: _overscrollBehavior.default,
  padding: _padding.default,
  placeContent: _placeContent.default,
  placeItems: _placeItems.default,
  placeSelf: _placeSelf.default,
  pointerEvents: _pointerEvents.default,
  position: _position.default,
  resize: _resize.default,
  ringColor: _ringColor.default,
  ringOffsetColor: _ringOffsetColor.default,
  ringOffsetWidth: _ringOffsetWidth.default,
  ringOpacity: _ringOpacity.default,
  ringWidth: _ringWidth.default,
  rotate: _rotate.default,
  saturate: _saturate.default,
  scale: _scale.default,
  scrollBehavior: _scrollBehavior.default,
  scrollMargin: _scrollMargin.default,
  scrollPadding: _scrollPadding.default,
  scrollSnapAlign: _scrollSnapAlign.default,
  scrollSnapStop: _scrollSnapStop.default,
  scrollSnapType: _scrollSnapType.default,
  sepia: _sepia.default,
  size: _size.default,
  skew: _skew.default,
  space: _space.default,
  stroke: _stroke.default,
  strokeWidth: _strokeWidth.default,
  tableLayout: _tableLayout.default,
  textAlign: _textAlign.default,
  textColor: _textColor.default,
  textDecoration: _textDecoration.default,
  textDecorationColor: _textDecorationColor.default,
  textDecorationStyle: _textDecorationStyle.default,
  textDecorationThickness: _textDecorationThickness.default,
  textIndent: _textIndent.default,
  textOpacity: _textOpacity.default,
  textOverflow: _textOverflow.default,
  textShadowBlur: _textShadowBlur.default,
  textShadowColor: _textShadowColor.default,
  textShadowOpacity: _textShadowOpacity.default,
  textShadowX: _textShadowX.default,
  textShadowY: _textShadowY.default,
  textTransform: _textTransform.default,
  textUnderlineOffset: _textUnderlineOffset.default,
  textWrap: _textWrap.default,
  touchAction: _touchAction.default,
  transform: _transform.default,
  transformOrigin: _transformOrigin.default,
  translate: _translate.default,
  userSelect: _userSelect.default,
  verticalAlign: _verticalAlign.default,
  visibility: _visibility.default,
  whitespace: _whitespace.default,
  width: _width.default,
  willChange: _willChange.default,
  wordBreak: _wordBreak.default,
  zIndex: _zIndex.default
};
function parseCustomClassWithPatterns(className) {
  for (const key in _index2.default) {
    const {
      regex,
      cssProp,
      formatter
    } = _index2.default[key];
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
const cacheKey = options => JSON.stringify(options);
function generateTailwindCssString() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const pluginKeys = Object.keys(plugins);
  // Menggunakan cache untuk mencegah pemrosesan ulang yang tidak perlu
  const key = cacheKey(options);
  if (!configOptionsCache.has(key)) {
    configOptionsCache.set(key, (0, _index.getConfigOptions)(options, pluginKeys));
    limitCacheSize(configOptionsCache);
  }
  const configOptions = configOptionsCache.get(key);
  const {
    corePlugins = {}
  } = configOptions;
  const corePluginKeys = Object.keys(corePlugins);
  let cssString = ``;
  Object.keys(plugins).forEach(key => {
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
  "2xl": "@media (min-width: 1536px)"
};
const pseudoVariants = new Set(["hover", "focus", "focus-within", "active", "visited", "disabled", "first", "last", "checked", "invalid", "required"]);
const specialVariants = {
  group: (state, sel) => `.group:${state} ${sel}`,
  peer: (state, sel) => `.peer:${state} ~ ${sel}`
};
const selectorVariants = {
  first: () => `> :first-child`,
  last: () => `> :last-child`,
  odd: () => `> :nth-child(odd)`,
  even: () => `> :nth-child(even)`,
  not: arg => `> :not(${arg})`,
  number: arg => `> :nth-child(${arg})`
};

// Mengoptimalkan encoding/decoding bracket values dengan memoization
const encodeBracketCache = new Map();
function encodeBracketValues(input) {
  if (!input) return input;
  if (encodeBracketCache.has(input)) return encodeBracketCache.get(input);
  const result = input.replace(/\[([^\]]+)\]/g, (_, content) => {
    const encoded = encodeURIComponent(content).replace(/\(/g, "__P__").replace(/\)/g, "__C__");
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
  const result = decodeURIComponent(input).replace(/__P__/g, "(").replace(/__C__/g, ")");
  decodeBracketCache.set(input, result);
  limitCacheSize(decodeBracketCache);
  return result;
}
function replaceSelector(selector) {
  return selector.replace(/c-(first|last|odd|even|\d+|not\([^)]+\))/g, (_, raw) => {
    if (/^\d+$/.test(raw)) return selectorVariants.number(raw);
    const notMatch = raw.match(/^not\(([^)]+)\)$/);
    if (notMatch) return selectorVariants.not(notMatch[1]);
    if (selectorVariants[raw]) return selectorVariants[raw]();
    return raw;
  });
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
  return {
    media,
    finalSelector
  };
}
function inlineStyleToJson(styleString) {
  const styles = styleString.split(";").filter(style => style.trim() !== "");
  const styleObject = {};
  styles.forEach(style => {
    const [key, value] = style.split(":").map(s => s.trim());
    if (key && value) {
      const camelCaseKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
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
  arr.forEach(item => {
    if (!item) return;
    const declarations = item.split(";").map(decl => decl.trim()).filter(decl => decl);
    declarations.forEach(declaration => {
      const colonIndex = declaration.indexOf(':');
      if (colonIndex === -1) return;
      const key = declaration.substring(0, colonIndex).trim();
      const value = declaration.substring(colonIndex + 1).trim();
      if (key && value) {
        // Prioritaskan nilai yang lebih spesifik (misalnya !important)
        if (value.includes('!important') || !cssProperties[key]) {
          cssProperties[key] = value;
        }
      }
    });
  });
  const resolvedProperties = {
    ...cssProperties
  };
  const resolveValue = (value, variables) => {
    if (!value || !value.includes('var(')) return value;
    return value.replace(/var\((--[a-zA-Z0-9-]+)(?:,\s*([^)]+))?\)/g, (match, variable, fallback) => {
      return variables[variable] || fallback || match;
    });
  };

  // Resolve variables
  Object.keys(resolvedProperties).forEach(key => {
    resolvedProperties[key] = resolveValue(resolvedProperties[key], resolvedProperties);
  });

  // Remove CSS variables after resolution
  Object.keys(resolvedProperties).forEach(key => {
    if (key.startsWith("--")) {
      delete resolvedProperties[key];
    }
  });
  const result = Object.entries(resolvedProperties).map(_ref => {
    let [key, value] = _ref;
    return `${key}: ${value};`;
  }).join(" ");
  cssResolutionCache.set(cacheKey, result);
  return result;
}

// Fungsi untuk membatasi ukuran cache untuk mencegah memory leak
function limitCacheSize(cache) {
  let maxSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  if (cache.size > maxSize) {
    // Hapus 20% entri yang paling lama
    const entriesToRemove = Math.floor(cache.size * 0.2);
    const keys = Array.from(cache.keys()).slice(0, entriesToRemove);
    keys.forEach(key => cache.delete(key));
  }
}

// Implementasi fungsi debounce untuk mengoptimalkan panggilan berulang
function debounce(func) {
  let wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  let timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
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
function tws(classNames, convertToJson) {
  if ([!classNames, typeof classNames !== "string", classNames.trim() === ""].includes(true)) {
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
  let cssResult = classes.map(className => {
    if (cssObject[className]) {
      return cssObject[className];
    } else if (className.includes("[")) {
      const match = className.match(/\[([^\]]+)\]/);
      if (match) {
        const customValue = match[1];
        const baseKey = className.split("[")[0];
        if (cssObject[`${baseKey}custom`]) {
          return cssObject[`${baseKey}custom`].replace(/custom_value/g, customValue);
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
function twsx(obj) {
  if (!obj || typeof obj !== 'object') {
    console.warn('twsx: Expected an object but received:', obj);
    return '';
  }
  const styles = {};
  function expandGroupedClass(input) {
    function expandDirectiveGroups(str) {
      return str.replace(/(\w+)\(([^()]+)\)/g, (_, directive, content) => {
        return content.trim().split(/\s+/).map(val => {
          if (val.includes(":")) {
            const [variant, v] = val.split(":");
            const prefix = v.startsWith("-") ? "-" : "";
            const value = v.startsWith("-") ? v.slice(1) : v;
            return `${variant}:${prefix}${directive}-${value}`;
          }
          const prefix = val.startsWith("-") ? "-" : "";
          const value = val.startsWith("-") ? val.slice(1) : val;
          return `${prefix}${directive}-${value}`;
        }).join(" ");
      });
    }
    function expandVariants(str) {
      let parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      return str.replace(/(\w+):\(([^()]+(?:\((?:[^()]+)\))?[^()]*)\)/g, (_, variant, content) => {
        return content.trim().split(/\s+/).map(c => {
          if (/\w+:\(.*\)/.test(c)) {
            return expandVariants(c, parent ? `${parent}:${variant}` : variant);
          }
          return `${parent ? `${parent}:${variant}` : variant}:${c}`;
        }).join(" ");
      });
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
    if (!selector || typeof selector !== 'string') {
      console.warn('Invalid selector in walk function:', selector);
      return;
    }
    const {
      baseSelector,
      cssProperty
    } = parseSelector(selector);
    if (cssProperty && typeof val === "object" && Array.isArray(val) && val.length > 0) {
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
        const [rawVariants, className] = cls.includes(":") ? [cls.split(":").slice(0, -1), cls.split(":").slice(-1)[0]] : [[], cls];
        let isImportant = false;
        let pureClassName = className;
        if (className.startsWith("!")) {
          isImportant = true;
          pureClassName = className.slice(1);
        }
        const {
          media,
          finalSelector
        } = resolveVariants(selector, rawVariants);
        let declarations = cssObject[pureClassName] || cssObject[pureClassName.replace(/(\/)/g, "\\$1")] || cssObject[pureClassName.replace(/\./g, "\\.")];
        if (!declarations && pureClassName.includes("[")) {
          const match = pureClassName.match(/^(.+?)\[(.+)\]$/);
          if (match) {
            const [, prefix, dynamicValue] = match;
            const customKey = `${prefix}custom`;
            const template = cssObject[customKey];
            if (template) {
              declarations = template.replace(/custom_value/g, decodeBracketValues(dynamicValue));
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
          declarations = declarations.replace(/([^:;]+):([^;]+)(;?)/g, (_, prop, value) => {
            return prop.trim().startsWith("--") ? `${prop}:${value};` : `${prop}:${value.trim()} !important;`;
          });
        }
        const isSpaceOrDivide = ["space-x-", "-space-x-", "space-y-", "-space-y-", "divide-"].some(prefix => pureClassName.startsWith(prefix));
        const expandedSelector = replaceSelector(finalSelector);
        const targetSelector = isSpaceOrDivide ? `${expandedSelector} > :not([hidden]) ~ :not([hidden])` : expandedSelector;
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
          const cssDeclarations = Object.entries(nestedVal).map(_ref2 => {
            let [key, value] = _ref2;
            return `${key}: ${value};`;
          }).join(" ");
          if (selector in styles) {
            styles[selector] += cssDeclarations + "\n";
          } else {
            styles[selector] = cssDeclarations + "\n";
          }
          continue;
        }
        const combinedSel = nestedSel.includes("&") ? nestedSel.replace(/&/g, selector) : `${selector} ${nestedSel}`;
        walk(combinedSel, nestedVal);
      }
    } else if (typeof val === "string") {
      if (val.trim() === "") return;
      walk(selector, [expandGroupedClass(val)]);
    } else if (typeof val === "object" && val !== null) {
      const {
        baseSelector,
        cssProperty
      } = parseSelector(selector);
      if (cssProperty) {
        const cssValue = Object.values(val).join(" ");
        styles[baseSelector] = styles[baseSelector] || "";
        styles[baseSelector] += `${cssProperty}: ${cssValue};\n`;
        return;
      }
      const cssDeclarations = Object.entries(val).map(_ref3 => {
        let [key, value] = _ref3;
        return `${key}: ${value};`;
      }).join(" ");
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
    if (selector.includes('@css')) {
      var _parts$;
      const parts = selector.split('@css');
      const baseSelector = parts[0].trim();
      const cssProperty = (_parts$ = parts[1]) === null || _parts$ === void 0 ? void 0 : _parts$.trim();
      result = {
        baseSelector,
        cssProperty
      };
    } else {
      result = {
        baseSelector: selector,
        cssProperty: null
      };
    }
    parseSelectorCache.set(selector, result);
    limitCacheSize(parseSelectorCache);
    return result;
  }
  function isSelectorObject(val) {
    return typeof val === "object" && val !== null && !Array.isArray(val);
  }
  function flatten(obj) {
    let parentSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    const result = {};
    for (const selector in obj) {
      const val = obj[selector];
      const currentSelector = parentSelector ? selector.includes("&") ? selector.replace(/&/g, parentSelector) : `${parentSelector} ${selector}` : selector;
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
      baseStyles.push({
        sel,
        css: styles[sel]
      });
    } else {
      mediaStyles.push({
        sel,
        content: styles[sel]
      });
    }
  }
  for (const {
    sel,
    css
  } of baseStyles) {
    cssString += `${sel}{${css.trim().replace(/\n/g, "")}}`;
  }
  function mediaPriority(sel) {
    const match = sel.match(/@media \(min-width: (\d+)px\)/);
    return match ? parseInt(match[1], 10) : 99999;
  }
  mediaStyles.sort((a, b) => mediaPriority(a.sel) - mediaPriority(b.sel));
  for (const {
    sel,
    content
  } of mediaStyles) {
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
const debouncedTws = exports.debouncedTws = debounce(tws);

/**
 * Versi debounced dari fungsi twsx
 * Membantu mengoptimalkan performa ketika memanggil twsx berulang kali
 * @param {Object} obj - Objek dengan format style mirip SCSS
 * @returns {string} String CSS yang dihasilkan
 */
const debouncedTwsx = exports.debouncedTwsx = debounce(twsx);