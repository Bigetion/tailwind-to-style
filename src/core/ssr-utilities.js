/**
 * SSR Utilities - Server-side rendering helpers
 */

/**
 * Extract critical CSS from class names
 */
export function extractCriticalCss(classNames, styleCache) {
  const classes = classNames.trim().split(/\s+/);
  const criticalCss = [];
  const seen = new Set();

  for (const cls of classes) {
    if (!seen.has(cls) && styleCache.has(cls)) {
      seen.add(cls);
      const styles = styleCache.get(cls);

      // Convert inline styles to CSS
      const cssRules = Object.entries(styles)
        .map(([prop, value]) => {
          const cssProp = prop.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
          return `${cssProp}: ${value}`;
        })
        .join("; ");

      criticalCss.push(`.${cls} { ${cssRules}; }`);
    }
  }

  return criticalCss.join("\n");
}

/**
 * Generate style tag for SSR
 */
export function generateStyleTag(css, options = {}) {
  const { nonce, id = "tws-critical-css" } = options;

  return `<style id="${id}"${nonce ? ` nonce="${nonce}"` : ""}>${css}</style>`;
}

/**
 * Collect styles during SSR
 */
export class StyleCollector {
  constructor() {
    this.styles = new Map();
    this.classes = new Set();
  }

  /**
   * Add style
   */
  add(className, styles) {
    this.classes.add(className);
    this.styles.set(className, styles);
  }

  /**
   * Get collected CSS
   */
  getCss() {
    const cssRules = [];

    for (const [className, styles] of this.styles.entries()) {
      const cssProps = Object.entries(styles)
        .map(([prop, value]) => {
          const cssProp = prop.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
          return `${cssProp}: ${value}`;
        })
        .join("; ");

      cssRules.push(`.${className} { ${cssProps}; }`);
    }

    return cssRules.join("\n");
  }

  /**
   * Get style tag
   */
  getStyleTag(options = {}) {
    return generateStyleTag(this.getCss(), options);
  }

  /**
   * Clear collected styles
   */
  clear() {
    this.styles.clear();
    this.classes.clear();
  }

  /**
   * Get class list
   */
  getClasses() {
    return Array.from(this.classes);
  }
}

/**
 * Create style collector
 */
export function createStyleCollector() {
  return new StyleCollector();
}

/**
 * SSR Context for React-like frameworks
 */
export class SSRContext {
  constructor() {
    this.collector = new StyleCollector();
    this.isServerSide = typeof window === "undefined";
  }

  /**
   * Wrap component with style collection
   */
  collect(renderFn) {
    if (!this.isServerSide) {
      return renderFn();
    }

    // Clear previous styles
    this.collector.clear();

    // Render component
    const result = renderFn();

    // Return result with styles
    return {
      html: result,
      styles: this.collector.getCss(),
      styleTag: this.collector.getStyleTag(),
      classes: this.collector.getClasses(),
    };
  }

  /**
   * Get collector
   */
  getCollector() {
    return this.collector;
  }
}

/**
 * Create SSR context
 */
export function createSSRContext() {
  return new SSRContext();
}

/**
 * Inline critical styles in HTML
 */
export function inlineCriticalStyles(html, styles) {
  // Find head tag
  const headMatch = html.match(/<head[^>]*>/i);
  if (!headMatch) {
    return html;
  }

  const styleTag = generateStyleTag(styles);
  const headEnd = headMatch.index + headMatch[0].length;

  return html.slice(0, headEnd) + styleTag + html.slice(headEnd);
}

/**
 * Preload styles for hydration
 */
export function preloadStyles(classes) {
  if (typeof window === "undefined") {
    return;
  }

  // Store classes for hydration
  if (!window.__TWS_PRELOADED_CLASSES__) {
    window.__TWS_PRELOADED_CLASSES__ = new Set();
  }

  classes.forEach((cls) => window.__TWS_PRELOADED_CLASSES__.add(cls));
}

/**
 * Get preloaded classes
 */
export function getPreloadedClasses() {
  if (typeof window === "undefined") {
    return [];
  }

  return Array.from(window.__TWS_PRELOADED_CLASSES__ || []);
}

/**
 * Hydrate styles on client
 */
export function hydrateStyles() {
  if (typeof window === "undefined") {
    return;
  }

  const preloadedClasses = getPreloadedClasses();

  // Mark as hydrated
  if (preloadedClasses.length > 0) {
    console.log(`[TWS] Hydrated ${preloadedClasses.length} classes`);
  }

  return preloadedClasses;
}

/**
 * Generate static CSS file
 */
export function generateStaticCss(classNames, styleCache, options = {}) {
  const { minify = false, banner = "" } = options;

  const css = extractCriticalCss(classNames, styleCache);

  let output = banner ? `/* ${banner} */\n` : "";
  output += css;

  if (minify) {
    output = output
      .replace(/\s+/g, " ")
      .replace(/\s*{\s*/g, "{")
      .replace(/\s*}\s*/g, "}")
      .replace(/\s*:\s*/g, ":")
      .replace(/\s*;\s*/g, ";")
      .replace(/;\}/g, "}")
      .trim();
  }

  return output;
}

/**
 * Stream styles during SSR
 */
export class StyleStream {
  constructor() {
    this.chunks = [];
    this.flushed = new Set();
  }

  /**
   * Add style chunk
   */
  add(className, styles) {
    if (this.flushed.has(className)) {
      return;
    }

    const cssProps = Object.entries(styles)
      .map(([prop, value]) => {
        const cssProp = prop.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
        return `${cssProp}: ${value}`;
      })
      .join("; ");

    this.chunks.push(`.${className} { ${cssProps}; }`);
    this.flushed.add(className);
  }

  /**
   * Flush pending chunks
   */
  flush() {
    if (this.chunks.length === 0) {
      return "";
    }

    const css = this.chunks.join("\n");
    this.chunks = [];
    return css;
  }

  /**
   * Get style tag for flushed chunks
   */
  flushStyleTag(options = {}) {
    const css = this.flush();
    if (!css) {
      return "";
    }
    return generateStyleTag(css, options);
  }
}

/**
 * Create style stream
 */
export function createStyleStream() {
  return new StyleStream();
}

/**
 * Extract used classes from HTML
 */
export function extractUsedClasses(html) {
  const classPattern = /class(?:Name)?=["']([^"']+)["']/gi;
  const classes = new Set();

  let match;
  while ((match = classPattern.exec(html)) !== null) {
    const classList = match[1].split(/\s+/);
    classList.forEach((cls) => classes.add(cls));
  }

  return Array.from(classes);
}

/**
 * Purge unused styles
 */
export function purgeUnusedStyles(html, allStyles) {
  const usedClasses = new Set(extractUsedClasses(html));
  const purgedStyles = new Map();

  for (const [className, styles] of allStyles.entries()) {
    if (usedClasses.has(className)) {
      purgedStyles.set(className, styles);
    }
  }

  return purgedStyles;
}

/**
 * Get style statistics
 */
export function getStyleStats(styleCache) {
  const stats = {
    totalClasses: styleCache.size,
    totalBytes: 0,
    properties: {},
    variants: {},
  };

  for (const [className, styles] of styleCache.entries()) {
    // Calculate size
    const cssString = Object.entries(styles)
      .map(([prop, value]) => `${prop}:${value}`)
      .join(";");
    stats.totalBytes += cssString.length;

    // Count properties
    for (const prop of Object.keys(styles)) {
      stats.properties[prop] = (stats.properties[prop] || 0) + 1;
    }

    // Count variants
    if (className.includes(":")) {
      const variant = className.split(":")[0];
      stats.variants[variant] = (stats.variants[variant] || 0) + 1;
    }
  }

  return stats;
}

/**
 * Create SSR-safe cache
 */
export function createSSRCache() {
  // Use Map instead of WeakMap for SSR
  const cache = new Map();

  return {
    get(key) {
      return cache.get(key);
    },
    set(key, value) {
      cache.set(key, value);
    },
    has(key) {
      return cache.has(key);
    },
    clear() {
      cache.clear();
    },
    size() {
      return cache.size;
    },
  };
}

/**
 * Render with style collection (React helper)
 */
export function renderWithStyles(renderFn, options = {}) {
  const collector = createStyleCollector();

  // Override console methods to track style additions
  const originalLog = console.log;
  let currentClassName = null;
  let currentStyles = null;

  // Render
  const html = renderFn();

  // Collect styles
  const styles = collector.getCss();
  const styleTag = collector.getStyleTag(options);

  return {
    html,
    styles,
    styleTag,
    classes: collector.getClasses(),
  };
}
