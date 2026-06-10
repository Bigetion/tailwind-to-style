/**
 * tailwind-to-style/tokens — Design Token System
 *
 * Provides CSS variable-based theming with a globalThis singleton registry.
 * Tokens are injected as CSS custom properties on :root.
 *
 * @module tailwind-to-style/tokens
 */

// ============================================================================
// Singleton Registry (globalThis)
// ============================================================================

const REGISTRY_KEY = '__TWS_TOKEN_REGISTRY__';

function getRegistry() {
  if (!globalThis[REGISTRY_KEY]) {
    globalThis[REGISTRY_KEY] = {
      tokens: {},
      themes: {},
      activeTheme: null,
      subscribers: new Set(),
      styleElement: null,
    };
  }
  return globalThis[REGISTRY_KEY];
}

// ============================================================================
// Token Registry API
// ============================================================================

/**
 * The token registry — get, set, subscribe to token changes.
 */
export const tokenRegistry = {
  /**
   * Get a token value by path (dot notation).
   * @param {string} path - Token path, e.g. "colors.primary"
   * @returns {string|undefined} Token value
   */
  get(path) {
    const registry = getRegistry();
    const keys = path.split('.');
    let current = registry.tokens;
    for (const key of keys) {
      if (current === undefined || current === null) return undefined;
      current = current[key];
    }
    return current;
  },

  /**
   * Set a token value by path. Triggers subscribers and updates CSS.
   * @param {string} path - Token path, e.g. "colors.primary"
   * @param {string} value - Token value
   */
  set(path, value) {
    const registry = getRegistry();
    const keys = path.split('.');
    let current = registry.tokens;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current) || typeof current[keys[i]] !== 'object') {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    notifySubscribers();
    injectTokenCSS();
  },

  /**
   * Subscribe to token changes.
   * @param {Function} callback - Called when tokens change
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    const registry = getRegistry();
    registry.subscribers.add(callback);
    return () => registry.subscribers.delete(callback);
  },

  /**
   * Get all tokens as a flat CSS custom properties string.
   * @returns {string} CSS string with custom properties
   */
  toCSS() {
    const registry = getRegistry();
    const vars = flattenTokens(registry.tokens, '--tws');
    if (vars.length === 0) return '';
    return `:root {\n${vars.map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`;
  },

  /**
   * Get all registered tokens as a plain object.
   * @returns {Object} Token tree
   */
  getAll() {
    return { ...getRegistry().tokens };
  },

  /**
   * Clear all tokens.
   */
  clear() {
    const registry = getRegistry();
    registry.tokens = {};
    registry.activeTheme = null;
    notifySubscribers();
    injectTokenCSS();
  },
};

// ============================================================================
// createTheme()
// ============================================================================

/**
 * Create and activate a theme by injecting CSS custom properties.
 *
 * @param {Object} tokens - Token definition object (nested)
 * @param {Object} [options] - Options
 * @param {string} [options.name] - Theme name for reference
 * @param {string} [options.selector] - CSS selector to scope theme (default: ":root")
 * @returns {Object} Theme object with name and token values
 *
 * @example
 * createTheme({
 *   colors: { primary: '#3b82f6', secondary: '#8b5cf6' },
 *   spacing: { sm: '0.5rem', md: '1rem', lg: '1.5rem' },
 *   radius: { sm: '0.25rem', md: '0.5rem' },
 * });
 * // Injects: --tws-colors-primary: #3b82f6; --tws-colors-secondary: #8b5cf6; ...
 */
export function createTheme(tokens, options = {}) {
  const { name = 'default', selector = ':root' } = options;
  const registry = getRegistry();

  // Merge tokens into registry
  deepMerge(registry.tokens, tokens);
  registry.activeTheme = name;
  registry.themes[name] = { tokens: { ...tokens }, selector };

  notifySubscribers();
  injectTokenCSS(selector);

  return {
    name,
    tokens,
    selector,
    /** Get a CSS variable reference for use in styles */
    var(path) {
      return `var(--tws-${path.replace(/\./g, '-')})`;
    },
  };
}

/**
 * Switch to a previously defined theme.
 * @param {string} name - Theme name
 */
export function activateTheme(name) {
  const registry = getRegistry();
  const theme = registry.themes[name];
  if (!theme) {
    throw new Error(`[tailwind-to-style/tokens] Theme "${name}" not found.`);
  }

  registry.tokens = { ...theme.tokens };
  registry.activeTheme = name;
  notifySubscribers();
  injectTokenCSS(theme.selector);
}

/**
 * Get a CSS variable reference string for a token path.
 * @param {string} path - Token path (dot notation)
 * @param {string} [fallback] - Fallback value
 * @returns {string} CSS var() expression
 */
export function token(path, fallback) {
  const varName = `--tws-${path.replace(/\./g, '-')}`;
  return fallback ? `var(${varName}, ${fallback})` : `var(${varName})`;
}

// ============================================================================
// Internal Helpers
// ============================================================================

function flattenTokens(obj, prefix) {
  const result = [];
  for (const [key, value] of Object.entries(obj)) {
    const varName = `${prefix}-${key}`;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result.push(...flattenTokens(value, varName));
    } else {
      result.push([varName, value]);
    }
  }
  return result;
}

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      typeof target[key] === 'object' &&
      target[key] !== null
    ) {
      deepMerge(target[key], value);
    } else {
      // Deep clone objects to avoid mutating the source
      target[key] = (typeof value === 'object' && value !== null && !Array.isArray(value))
        ? deepMerge({}, value)
        : value;
    }
  }
  return target;
}

function notifySubscribers() {
  const registry = getRegistry();
  for (const fn of registry.subscribers) {
    try {
      fn(registry.tokens);
    } catch (e) {
      // Ignore subscriber errors
    }
  }
}

function injectTokenCSS(selector = ':root') {
  if (typeof document === 'undefined') return;

  const registry = getRegistry();
  const vars = flattenTokens(registry.tokens, '--tws');

  if (vars.length === 0) {
    if (registry.styleElement) {
      registry.styleElement.textContent = '';
    }
    return;
  }

  const css = `${selector} {\n${vars.map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`;

  if (!registry.styleElement) {
    registry.styleElement = document.createElement('style');
    registry.styleElement.setAttribute('data-tws-tokens', '');
    document.head.appendChild(registry.styleElement);
  }

  registry.styleElement.textContent = css;
}
