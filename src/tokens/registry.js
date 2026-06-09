/**
 * Token Registry — Central design token store with pub/sub reactivity.
 *
 * When tokens change, all subscribers (including React components) are notified,
 * triggering re-render and CSS regeneration with new token values.
 */

let _tokens = {
  colors: {},
  spacing: {},
  fontSize: {},
  fontWeight: {},
  borderRadius: {},
  shadow: {},
  animation: {},
  custom: {},
};

const _subscribers = new Set();

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] =
        target[key] && typeof target[key] === "object"
          ? deepMerge(target[key], source[key])
          : { ...source[key] };
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

export const tokenRegistry = {
  get() {
    return _tokens;
  },

  set(newTokens) {
    _tokens = deepMerge(_tokens, newTokens);
    _subscribers.forEach((fn) => fn(_tokens));
  },

  subscribe(fn) {
    _subscribers.add(fn);
    return () => _subscribers.delete(fn);
  },

  /** Replace entire token set (used for theme switching) */
  replace(tokens) {
    _tokens = { ...tokens };
    _subscribers.forEach((fn) => fn(_tokens));
  },

  /** Get a single token value by path, e.g. "colors.primary" */
  getByPath(path) {
    const parts = path.split(".");
    let current = _tokens;
    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else {
        return undefined;
      }
    }
    return current;
  },
};
