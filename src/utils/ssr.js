/**
 * SSR (Server-Side Rendering) Collector
 * 
 * Simplified API for collecting CSS during server-side rendering.
 * Replaces the imperative startSSR/stopSSR/getSSRStyles with a context-based approach.
 * 
 * Features:
 * - Instance-based state (safe for concurrent requests)
 * - CSS deduplication
 * - Critical CSS extraction
 * - Minification support
 * - Nonce support for CSP
 * 
 * @module ssr
 */

// ============================================================================
// Global State (for backward compatibility with legacy API)
// ============================================================================

let _globalCollectedCSS = [];
let _globalIsCollecting = false;
let _globalSeenCSS = new Set();

// Active collector instance (for internal use by twsx)
let _activeCollector = null;

// ============================================================================
// CSS Utilities
// ============================================================================

/**
 * Minify CSS (simple minification)
 */
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ')              // Collapse whitespace
    .replace(/\s*([{}:;,])\s*/g, '$1') // Remove space around punctuation
    .replace(/;}/g, '}')               // Remove trailing semicolons
    .trim();
}

/**
 * Sort CSS by specificity (critical first)
 */
function sortBySpecificity(cssArray) {
  return cssArray.sort((a, b) => {
    // Prioritize reset/base styles
    const aIsBase = a.includes('*') || a.includes(':root') || a.includes('html') || a.includes('body');
    const bIsBase = b.includes('*') || b.includes(':root') || b.includes('html') || b.includes('body');
    if (aIsBase && !bIsBase) return -1;
    if (!aIsBase && bIsBase) return 1;
    
    // Prioritize @keyframes and @font-face
    const aIsAtRule = a.startsWith('@');
    const bIsAtRule = b.startsWith('@');
    if (aIsAtRule && !bIsAtRule) return -1;
    if (!aIsAtRule && bIsAtRule) return 1;
    
    return 0;
  });
}

// ============================================================================
// SSR Collector Factory
// ============================================================================

/**
 * Create an SSR collector context
 * 
 * @param {object} options - Collector options
 * @returns {SSRCollector} Collector instance
 * 
 * @example
 * // Modern approach (recommended)
 * const ssr = createSSRCollector()
 * 
 * // ... render your app ...
 * const html = renderToString(<App />)
 * 
 * // Extract collected CSS
 * const css = ssr.extract()
 * 
 * // Inject into HTML
 * const fullHtml = `
 *   <html>
 *     <head>${css}</head>
 *     <body>${html}</body>
 *   </html>
 * `
 * 
 * // Cleanup
 * ssr.clear()
 * 
 * @example
 * // With options
 * const ssr = createSSRCollector({ 
 *   dedupe: true, 
 *   minify: true 
 * })
 */
export function createSSRCollector(options = {}) {
  const {
    dedupe = true,
    minify = false,
    sort = true,
  } = options;

  // Instance state (isolated per collector)
  const collectedCSS = [];
  const seenCSS = new Set();
  let isCollecting = true;

  // Also update global state for backward compatibility
  _globalCollectedCSS = [];
  _globalIsCollecting = true;
  _globalSeenCSS = new Set();

  const collector = {
    /**
     * Check if currently collecting
     */
    get isCollecting() {
      return isCollecting;
    },

    /**
     * Get currently collected CSS count
     */
    get count() {
      return collectedCSS.length;
    },

    /**
     * Get unique CSS count (after deduplication)
     */
    get uniqueCount() {
      return seenCSS.size;
    },

    /**
     * Peek at collected CSS without stopping
     * @returns {string} Currently collected CSS
     */
    peek() {
      const css = sort ? sortBySpecificity([...collectedCSS]) : collectedCSS;
      return css.join('\n');
    },

    /**
     * Extract CSS as a raw string and stop collecting
     * @param {object} extractOptions - Extract options
     * @returns {string} All collected CSS
     */
    extractRaw(extractOptions = {}) {
      const { shouldMinify = minify } = extractOptions;
      isCollecting = false;
      _activeCollector = null;
      
      const sorted = sort ? sortBySpecificity([...collectedCSS]) : collectedCSS;
      let css = sorted.join('\n');
      
      if (shouldMinify) {
        css = minifyCSS(css);
      }
      
      return css;
    },

    /**
     * Extract CSS wrapped in a <style> tag and stop collecting
     * @param {object} extractOptions - Options for the style tag
     * @returns {string} CSS wrapped in <style> tag
     */
    extract(extractOptions = {}) {
      const { 
        id = 'twsx-ssr', 
        nonce,
        minify: shouldMinify = minify,
        injectPosition = 'head', // 'head' | 'body' | 'inline'
      } = extractOptions;
      
      const css = this.extractRaw({ shouldMinify });
      
      if (!css) return '';
      
      const nonceAttr = nonce ? ` nonce="${nonce}"` : '';
      const dataAttr = ` data-twsx-ssr="${this.uniqueCount}"`;
      
      return `<style id="${id}"${nonceAttr}${dataAttr}>${css}</style>`;
    },

    /**
     * Extract critical CSS (above-the-fold styles)
     * @param {object} options - Critical CSS options
     * @returns {string} Critical CSS
     */
    extractCritical(options = {}) {
      const { 
        maxSize = 14000, // ~14KB for inlining
        nonce,
        id = 'twsx-critical'
      } = options;
      
      const sorted = sortBySpecificity([...collectedCSS]);
      const critical = [];
      let size = 0;
      
      for (const css of sorted) {
        const cssSize = new TextEncoder().encode(css).length;
        if (size + cssSize <= maxSize) {
          critical.push(css);
          size += cssSize;
        } else {
          break;
        }
      }
      
      const css = minifyCSS(critical.join('\n'));
      if (!css) return { critical: '', rest: this.extractRaw() };
      
      const nonceAttr = nonce ? ` nonce="${nonce}"` : '';
      
      // Return both critical and rest
      const restCSS = sorted.slice(critical.length).join('\n');
      
      return {
        critical: `<style id="${id}"${nonceAttr}>${css}</style>`,
        rest: restCSS,
        stats: {
          criticalSize: size,
          criticalCount: critical.length,
          totalCount: collectedCSS.length,
        }
      };
    },

    /**
     * Clear collected CSS and optionally restart collecting
     * @param {boolean} restart - Whether to restart collecting (default: false)
     */
    clear(restart = false) {
      collectedCSS.length = 0;
      seenCSS.clear();
      isCollecting = restart;
      
      if (restart) {
        _activeCollector = collector;
      } else {
        _activeCollector = null;
      }
      
      // Also clear global state
      _globalCollectedCSS = [];
      _globalSeenCSS = new Set();
      _globalIsCollecting = restart;
    },

    /**
     * Add CSS to the collection (used internally by twsx)
     * @internal
     */
    _collect(css) {
      if (!isCollecting || !css) return;
      
      // Deduplication
      if (dedupe) {
        const hash = css.trim();
        if (seenCSS.has(hash)) return;
        seenCSS.add(hash);
      }
      
      collectedCSS.push(css);
      
      // Also update global for backward compatibility
      _globalCollectedCSS.push(css);
      _globalSeenCSS.add(css.trim());
    },

    /**
     * Get stats about collected CSS
     */
    getStats() {
      const css = collectedCSS.join('\n');
      return {
        ruleCount: collectedCSS.length,
        uniqueCount: seenCSS.size,
        totalSize: new TextEncoder().encode(css).length,
        minifiedSize: new TextEncoder().encode(minifyCSS(css)).length,
      };
    },
  };

  // Set as active collector for internal use
  _activeCollector = collector;

  return collector;
}

// ============================================================================
// Internal Helpers (used by twsx/tws)
// ============================================================================

/**
 * Check if SSR collecting is active
 * @internal
 */
export function isSSRCollecting() {
  return _globalIsCollecting;
}

/**
 * Add CSS to SSR collection (prefers active collector if available)
 * @internal
 */
export function collectSSRCSS(css) {
  if (!css) return;
  
  // Use active collector if available (modern API)
  if (_activeCollector && _activeCollector.isCollecting) {
    _activeCollector._collect(css);
    return;
  }
  
  // Fallback to global state (legacy API)
  if (_globalIsCollecting) {
    // Deduplication
    const hash = css.trim();
    if (!_globalSeenCSS.has(hash)) {
      _globalSeenCSS.add(hash);
      _globalCollectedCSS.push(css);
    }
  }
}

/**
 * Get collected CSS (for backward compatibility)
 * @internal
 */
export function getCollectedCSS() {
  return _globalCollectedCSS.join('\n');
}

/**
 * Clear SSR state
 * @internal
 */
export function clearSSRState() {
  _globalCollectedCSS = [];
  _globalIsCollecting = false;
  _globalSeenCSS = new Set();
  _activeCollector = null;
}

/**
 * Get active collector (for advanced usage)
 * @internal
 */
export function getActiveCollector() {
  return _activeCollector;
}

// ============================================================================
// Legacy API (deprecated - use createSSRCollector instead)
// ============================================================================

/**
 * @deprecated Use createSSRCollector() instead
 */
export function startSSR() {
  console.warn('[tailwind-to-style] startSSR() is deprecated. Use createSSRCollector() instead.');
  _globalCollectedCSS = [];
  _globalSeenCSS = new Set();
  _globalIsCollecting = true;
}

/**
 * @deprecated Use createSSRCollector().extract() instead
 */
export function stopSSR() {
  console.warn('[tailwind-to-style] stopSSR() is deprecated. Use createSSRCollector().extract() instead.');
  _globalIsCollecting = false;
  const css = _globalCollectedCSS.join('\n');
  _globalCollectedCSS = [];
  _globalSeenCSS = new Set();
  return css;
}

/**
 * @deprecated Use createSSRCollector().peek() instead
 */
export function getSSRStyles() {
  console.warn('[tailwind-to-style] getSSRStyles() is deprecated. Use createSSRCollector().peek() instead.');
  return _globalCollectedCSS.join('\n');
}

// ============================================================================
// Export
// ============================================================================

export default { 
  createSSRCollector,
  isSSRCollecting,
  collectSSRCSS,
  getActiveCollector,
};
