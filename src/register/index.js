/**
 * tailwind-to-style/register
 *
 * Semantic class registration API — Bootstrap-style clean HTML,
 * Tailwind power under the hood.
 *
 * @example
 * import { register, cx, cn } from 'tailwind-to-style/register'
 *
 * register('btn', {
 *   tw: 'px-6 py-3 rounded-lg font-medium transition-all cursor-pointer',
 *   'background-color': '#3b82f6',
 *   color: '#fff',
 *   '&:hover': { 'background-color': '#2563eb' }
 * })
 *
 * // With modifiers — auto-generates btn-blue, btn-sm, btn-pill, etc.
 * register('btn', {
 *   base: { tw: 'px-4 py-2 rounded font-medium' },
 *   modifiers: {
 *     blue:  { tw: 'bg-blue-600 text-white hover:bg-blue-700' },
 *     sm:    { tw: 'px-3 py-1.5 text-sm' },
 *     pill:  { 'border-radius': '9999px' },
 *   }
 * })
 *
 * // Group — auto-generates card, card-title, card-text
 * register.group('card', {
 *   root:  { tw: 'rounded-xl border bg-white shadow-sm p-6' },
 *   title: { tw: 'text-xl font-bold mb-2' },
 *   text:  { tw: 'text-gray-600' },
 * })
 *
 * // Extend — inherits all styles from another registered class
 * register('icon-btn', {
 *   extend: 'btn',
 *   tw: 'w-12 h-12 p-0 flex items-center justify-center',
 * })
 */

import { twsx } from "../index.js";
import { cx } from "../cx.js";
import { isSSRCollecting, collectSSRCSS } from "../utils/ssr.js";

// ─────────────────────────────────────────────────────────────────────────────
// Environment
// ─────────────────────────────────────────────────────────────────────────────

const IS_BROWSER =
  typeof window !== "undefined" && typeof document !== "undefined";

// ─────────────────────────────────────────────────────────────────────────────
// Constants — mirrors className/index.js
// ─────────────────────────────────────────────────────────────────────────────

const PSEUDO_SHORTHANDS = {
  hover: "&:hover", focus: "&:focus", active: "&:active",
  disabled: "&:disabled", visited: "&:visited", checked: "&:checked",
  required: "&:required", invalid: "&:invalid", valid: "&:valid",
  empty: "&:empty", enabled: "&:enabled", indeterminate: "&:indeterminate",
  "focus-within": "&:focus-within", "focus-visible": "&:focus-visible",
  first: "&:first-child", last: "&:last-child",
  odd: "&:nth-child(odd)", even: "&:nth-child(even)",
  placeholder: "&::placeholder", before: "&::before", after: "&::after",
  selection: "&::selection", marker: "&::marker",
  file: "&::file-selector-button", backdrop: "&::backdrop",
  dark: "@media (prefers-color-scheme: dark)",
  light: "@media (prefers-color-scheme: light)",
  "motion-safe": "@media (prefers-reduced-motion: no-preference)",
  "motion-reduce": "@media (prefers-reduced-motion: reduce)",
  print: "@media print",
  "contrast-more": "@media (prefers-contrast: more)",
  "contrast-less": "@media (prefers-contrast: less)",
  portrait: "@media (orientation: portrait)",
  landscape: "@media (orientation: landscape)",
};

const GROUP_PEER_STATES = {
  "group-hover": ".group:hover &", "group-focus": ".group:focus &",
  "group-active": ".group:active &", "group-focus-within": ".group:focus-within &",
  "group-focus-visible": ".group:focus-visible &", "group-disabled": ".group:disabled &",
  "group-checked": ".group:checked &",
  "peer-hover": ".peer:hover ~ &", "peer-focus": ".peer:focus ~ &",
  "peer-active": ".peer:active ~ &", "peer-focus-within": ".peer:focus-within ~ &",
  "peer-focus-visible": ".peer:focus-visible ~ &", "peer-disabled": ".peer:disabled ~ &",
  "peer-checked": ".peer:checked ~ &", "peer-placeholder-shown": ".peer:placeholder-shown ~ &",
};

const BREAKPOINTS = {
  sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px",
};

// ─────────────────────────────────────────────────────────────────────────────
// Raw CSS property detection (same logic as className/index.js)
// ─────────────────────────────────────────────────────────────────────────────

const CSS_PROP_RE = /^(-webkit-|-moz-|-ms-|-o-)?[a-z]+(-[a-z]+)*$/;

function isCssProperty(key) {
  if (key.startsWith("--")) return true;
  if (PSEUDO_SHORTHANDS[key] || GROUP_PEER_STATES[key] || BREAKPOINTS[key]) return false;
  if (key.startsWith("&") || key.startsWith(".") || key.startsWith("@")) return false;
  // camelCase (has uppercase) → CSS property
  if (/[A-Z]/.test(key)) return true;
  // kebab-case that looks like a CSS property
  if (CSS_PROP_RE.test(key)) return true;
  return false;
}

function toCssPropertyName(key) {
  if (key.includes("-")) return key;
  return key.replace(/([A-Z])/g, "-$1").toLowerCase();
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS injection
// ─────────────────────────────────────────────────────────────────────────────

let _styleTag = null;
const _registry = new Map(); // className → css string

function _ensureStyleTag() {
  if (_styleTag && _styleTag.parentNode) return _styleTag;
  _styleTag = document.getElementById("tvs-style");
  if (!_styleTag) {
    _styleTag = document.createElement("style");
    _styleTag.id = "tvs-style";
    _styleTag.setAttribute("data-tvs", "");
    // Use documentElement as fallback if head not ready yet
    const parent = document.head || document.documentElement;
    parent.appendChild(_styleTag);
  }
  return _styleTag;
}

function _flushRegistry() {
  if (_registry.size === 0) return;
  try {
    _ensureStyleTag();
    _styleTag.textContent = [..._registry.values()].join("\n");
  } catch (e) {
    // DOM not ready — will retry on DOMContentLoaded
  }
}

function _inject(key, css) {
  if (!css) return;
  // Merge: if key already exists, append — never silently override
  const existing = _registry.get(key);
  _registry.set(key, existing ? existing + '\n' + css : css);
  _flushRegistry();
  if (!IS_BROWSER && isSSRCollecting()) {
    collectSSRCSS(css);
  }
}

// Flush on DOMContentLoaded in case register() was called before <head> parsed
if (IS_BROWSER && document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", _flushRegistry, { once: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// Keyframes builder
// Handles register('@keyframes fadeUp', { from: {...}, to: {...}, '50%': {...} })
// Values inside each stop are treated as raw CSS declarations (not Tailwind).
// ─────────────────────────────────────────────────────────────────────────────

function buildKeyframesCss(atRule, stops) {
  if (typeof stops !== "object" || stops === null) return "";

  let css = `${atRule} {\n`;

  for (const [stop, declarations] of Object.entries(stops)) {
    if (typeof declarations !== "object" || declarations === null) continue;

    const decls = Object.entries(declarations)
      .map(([k, v]) => `  ${toCssPropertyName(k)}: ${v};`)
      .join("\n");

    css += `  ${stop} {\n${decls}\n  }\n`;
  }

  css += "}";
  return css;
}

// ─────────────────────────────────────────────────────────────────────────────
// Style builder
// Converts a mixed config value into a CSS string directly.
// Calls twsx twice when needed: once for tw classes, once for raw CSS.
// This avoids the flattenStyleObject issue with @css object keys.
// ─────────────────────────────────────────────────────────────────────────────

function buildCssForSelector(selector, config) {
  if (typeof config === "string") {
    // Plain Tailwind class string
    return twsx({ [selector]: config }, { inject: false });
  }

  if (typeof config !== "object" || config === null) return "";

  let css = "";

  // 1. Tailwind classes from `tw` or `_`
  const twClasses = [config.tw, config._].filter(Boolean).join(" ");
  if (twClasses) {
    css += twsx({ [selector]: twClasses }, { inject: false });
  }

  // 2. Raw CSS properties — generate CSS declarations directly (no twsx needed)
  const rawDecls = [];
  for (const [k, v] of Object.entries(config)) {
    if (k === "tw" || k === "_") continue;
    if (typeof v !== "string" && typeof v !== "number") continue;
    if (isCssProperty(k)) {
      rawDecls.push(`${toCssPropertyName(k)}: ${v};`);
    }
  }
  if (rawDecls.length > 0) {
    css += `${selector}{${rawDecls.join("")}}`;
  }

  // 3. Pseudo shorthands, breakpoints, nested selectors
  for (const [k, v] of Object.entries(config)) {
    if (k === "tw" || k === "_") continue;
    if (isCssProperty(k) && (typeof v === "string" || typeof v === "number")) continue;
    if (typeof v !== "string" && typeof v !== "object") continue;

    if (PSEUDO_SHORTHANDS[k]) {
      const mapping = PSEUDO_SHORTHANDS[k];
      const nestedConfig = typeof v === "string" ? { tw: v } : v;
      if (mapping.startsWith("@media")) {
        // Wrap inner css in media query
        const innerCss = buildCssForSelector(selector, nestedConfig);
        if (innerCss) css += `${mapping}{${innerCss}}`;
      } else {
        const resolvedSel = mapping.replace("&", selector);
        css += buildCssForSelector(resolvedSel, nestedConfig);
      }
    } else if (GROUP_PEER_STATES[k]) {
      const resolvedSel = GROUP_PEER_STATES[k].replace("&", selector);
      css += buildCssForSelector(resolvedSel, typeof v === "string" ? { tw: v } : v);
    } else if (BREAKPOINTS[k]) {
      const innerCss = buildCssForSelector(selector, typeof v === "string" ? { tw: v } : v);
      if (innerCss) css += `@media (min-width: ${BREAKPOINTS[k]}){${innerCss}}`;
    } else if (k.startsWith("&") || k.startsWith(".") || k.startsWith("@")) {
      const resolvedSel = k.replace(/^&/, selector);
      css += buildCssForSelector(resolvedSel, typeof v === "string" ? { tw: v } : v);
    }
  }

  return css;
}

/**
 * Generate CSS from a buildStyleObj result.
 * Handles the __raw suffix trick: replaces `.sel__raw { @css {...} }` with `.sel { ... }`
 */
function buildCss(styleObj) {
  // Separate raw entries from normal entries
  const normalObj = {};
  const rawMap = {}; // suffixed_key → real_selector

  for (const [k, v] of Object.entries(styleObj)) {
    if (k.startsWith("__raw_map__")) {
      rawMap[k.slice("__raw_map__".length) + "__raw"] = v;
    } else {
      normalObj[k] = v;
    }
  }

  // Replace __raw keys with their real selector before passing to twsx
  const fixedObj = {};
  for (const [k, v] of Object.entries(normalObj)) {
    if (rawMap[k]) {
      const realSel = rawMap[k];
      // Merge with existing real selector entry
      if (fixedObj[realSel]) {
        // Already have entry — append @css as additional entry with unique key
        fixedObj[`${realSel}__css${Object.keys(fixedObj).length}`] = v;
      } else {
        fixedObj[realSel] = v;
      }
    } else {
      fixedObj[k] = v;
    }
  }

  return twsx(fixedObj, { inject: false });
}

// ─────────────────────────────────────────────────────────────────────────────
// Extend system
// ─────────────────────────────────────────────────────────────────────────────

// Registry of raw configs by class name for extend resolution
const _rawConfigs = new Map();

function _resolveExtend(config) {
  if (!config.extend) return config;

  const baseNames = Array.isArray(config.extend)
    ? config.extend
    : [config.extend];

  let merged = {};
  for (const name of baseNames) {
    const baseConfig = _rawConfigs.get(name);
    if (baseConfig) {
      merged = _deepMergeConfig(merged, baseConfig);
    }
  }
  // Extension overrides base
  return _deepMergeConfig(merged, { ...config, extend: undefined });
}

function _deepMergeConfig(base, override) {
  const result = { ...base };
  for (const [k, v] of Object.entries(override)) {
    if (v === undefined) continue;
    if (
      typeof v === "object" && v !== null && !Array.isArray(v) &&
      typeof result[k] === "object" && result[k] !== null && !Array.isArray(result[k])
    ) {
      result[k] = _deepMergeConfig(result[k], v);
    } else if (typeof v === "string" && typeof result[k] === "string" && k === "tw") {
      // Merge tw class strings
      result[k] = `${result[k]} ${v}`.trim();
    } else {
      result[k] = v;
    }
  }
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// Core: register()
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Register a semantic CSS class.
 *
 * Simple form — injects CSS for `.className`:
 * ```js
 * register('btn', {
 *   tw: 'px-6 py-3 rounded-lg font-medium',
 *   'background-color': '#3b82f6',
 *   color: '#fff',
 *   '&:hover': { 'background-color': '#2563eb' }
 * })
 * ```
 *
 * With `base` + `modifiers` — also injects `.className-modifier` for each:
 * ```js
 * register('btn', {
 *   base: { tw: 'px-4 py-2 rounded font-medium' },
 *   modifiers: {
 *     blue: { tw: 'bg-blue-600 text-white' },
 *     sm:   { tw: 'px-3 py-1.5 text-sm' },
 *   }
 * })
 * // → .btn + .btn-blue + .btn-sm
 * ```
 *
 * With `extend` — inherits all styles from another registered class:
 * ```js
 * register('icon-btn', { extend: 'btn', tw: 'w-12 h-12 p-0' })
 * ```
 *
 * @param {string} className
 * @param {Object} config
 */
function register(className, config = {}) {
  if (typeof className !== "string" || !className.trim()) {
    throw new Error("[tvs] register: className must be a non-empty string");
  }

  // Store raw config for extend resolution
  _rawConfigs.set(className, config);

  // Resolve extend
  const resolved = _resolveExtend(config);

  // Raw CSS selectors (*, :root, body, html, element tags like 'input') are used as-is.
  // Class names get the . prefix.
  // Rule: if className starts with * , : , or is a known HTML tag → raw selector
  const HTML_TAGS = new Set([
    'a','abbr','address','article','aside','audio','b','blockquote','body',
    'br','button','canvas','caption','cite','code','col','colgroup','data',
    'datalist','dd','del','details','dfn','dialog','div','dl','dt','em',
    'embed','fieldset','figcaption','figure','footer','form','h1','h2','h3',
    'h4','h5','h6','head','header','hr','html','i','iframe','img','input',
    'ins','kbd','label','legend','li','link','main','map','mark','menu',
    'meta','meter','nav','noscript','object','ol','optgroup','option',
    'output','p','picture','pre','progress','q','rp','rt','ruby','s',
    'samp','script','section','select','small','source','span','strong',
    'style','sub','summary','sup','table','tbody','td','template','textarea',
    'tfoot','th','thead','time','title','tr','track','u','ul','var','video',
    'wbr',
  ]);
  const isRawSelector =
    className === '*' ||
    className.startsWith(':') ||
    className.startsWith('[') ||
    HTML_TAGS.has(className.toLowerCase());
  const selector = isRawSelector ? className : `.${className}`;
  let allCss = "";

  // ── @keyframes — special handling: generate keyframe CSS directly
  if (className.startsWith('@keyframes')) {
    allCss = buildKeyframesCss(className, resolved);
    _inject(className, allCss.trim());
    return;
  }

  // ── Simple form: no `base` key — the whole config IS the base style
  const hasBase = "base" in resolved;
  const hasModifiers = "modifiers" in resolved;

  if (!hasBase && !hasModifiers) {
    // Simple form: register('btn', { tw, css, '&:hover': ... })
    allCss = buildCssForSelector(selector, resolved);
  } else {
    // Complex form: base + modifiers
    if (resolved.base) {
      allCss += buildCssForSelector(selector, resolved.base) + "\n";
    }

    if (resolved.modifiers && typeof resolved.modifiers === "object") {
      for (const [modKey, modValue] of Object.entries(resolved.modifiers)) {
        const modSelector = `.${className}-${modKey}`;
        allCss += buildCssForSelector(modSelector, modValue) + "\n";
      }
    }
  }

  _inject(className, allCss.trim());
}

// ─────────────────────────────────────────────────────────────────────────────
// register.group()
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Register multiple related classes at once.
 *
 * The first key (`root` or matching `baseName`) maps to `.baseName`.
 * All other keys map to `.baseName-key`.
 *
 * ```js
 * register.group('card', {
 *   root:   { tw: 'rounded-xl border bg-white shadow-sm' },
 *   header: { tw: 'px-6 py-4 border-b font-semibold bg-gray-50' },
 *   body:   { tw: 'px-6 py-4' },
 *   footer: { tw: 'px-6 py-4 border-t text-sm text-gray-500' },
 * })
 * // → .card + .card-header + .card-body + .card-footer
 * ```
 *
 * @param {string} baseName
 * @param {Object} components
 */
register.group = function group(baseName, components = {}) {
  if (typeof baseName !== "string" || !baseName.trim()) {
    throw new Error("[tvs] register.group: baseName must be a non-empty string");
  }

  let allCss = "";

  for (const [key, config] of Object.entries(components)) {
    // `root` key → .baseName, others → .baseName-key
    const selector = key === "root" ? `.${baseName}` : `.${baseName}-${key}`;
    allCss += buildCssForSelector(selector, config) + "\n";
  }

  _inject(baseName, allCss.trim());
};

// ─────────────────────────────────────────────────────────────────────────────
// register.all()
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Register multiple classes at once from a plain object map.
 * Sugar syntax for calling register() on each key — each class still gets
 * its own entry in the registry so individual updates stay isolated.
 *
 * @param {Object} map - { className: config, ... }
 *
 * @example
 * register.all({
 *   ':root':     { '--brand': '#6366f1', '--brand-dark': '#4f46e5' },
 *   '*':         { 'box-sizing': 'border-box', margin: '0', padding: '0' },
 *   'body':      { tw: 'text-slate-900 antialiased' },
 *   'container': { tw: 'mx-auto w-full px-6', 'max-width': '1100px' },
 *   'btn':       { base: { tw: 'px-4 py-2 rounded' }, modifiers: { primary: { tw: 'bg-blue-600 text-white' } } },
 * })
 */
register.all = function all(map = {}) {
  if (typeof map !== "object" || Array.isArray(map) || map === null) {
    throw new Error("[tvs] register.all: expected a plain object map");
  }
  for (const [name, config] of Object.entries(map)) {
    register(name, config);
  }
};

/**
 * Extract all registered CSS as a single string (useful for SSR).
 * @returns {string}
 */
register.extractCSS = function extractCSS() {
  return [..._registry.values()].join("\n");
};

/**
 * Clear all registered styles (useful for testing).
 */
register.reset = function reset() {
  _registry.clear();
  _rawConfigs.clear();
  if (IS_BROWSER && _styleTag) {
    _styleTag.textContent = "";
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// cx / cn
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Conditionally merge class names.
 * Identical to the core `cx` utility.
 *
 * @example
 * cx('btn', isActive && 'btn-active', { 'btn-lg': isLarge })
 */
export { cx };

/**
 * Alias of `cx` — for shadcn/ui fans.
 *
 * @example
 * cn('btn', isLoading && 'opacity-50')
 */
export const cn = cx;

// ─────────────────────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────────────────────

export { register };
export default register;
