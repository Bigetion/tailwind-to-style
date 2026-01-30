/**
 * DevTools - Browser debugging utilities
 */

/**
 * DevTools configuration
 */
let devToolsEnabled = false;
let devToolsConfig = {
  logClassNames: false,
  logStyles: false,
  logPerformance: false,
  showWarnings: true,
  highlightConflicts: false,
};

/**
 * Enable DevTools
 */
export function enableDevTools(config = {}) {
  devToolsEnabled = true;
  devToolsConfig = { ...devToolsConfig, ...config };
  
  if (typeof window !== "undefined") {
    window.__TWS_DEVTOOLS__ = {
      enabled: true,
      config: devToolsConfig,
      cache: {},
      stats: {},
    };
    
    console.log("[TWS DevTools] Enabled", devToolsConfig);
  }
}

/**
 * Disable DevTools
 */
export function disableDevTools() {
  devToolsEnabled = false;
  
  if (typeof window !== "undefined") {
    delete window.__TWS_DEVTOOLS__;
    console.log("[TWS DevTools] Disabled");
  }
}

/**
 * Check if DevTools is enabled
 */
export function isDevToolsEnabled() {
  return devToolsEnabled;
}

/**
 * Log class name processing
 */
export function logClassName(className, styles) {
  if (!devToolsEnabled || !devToolsConfig.logClassNames) return;
  
  console.group(`[TWS] Class: ${className}`);
  console.log("Styles:", styles);
  console.groupEnd();
}

/**
 * Log style generation
 */
export function logStyles(classNames, finalStyles) {
  if (!devToolsEnabled || !devToolsConfig.logStyles) return;
  
  console.group(`[TWS] Styles Generated`);
  console.log("Classes:", classNames);
  console.log("Final Styles:", finalStyles);
  console.groupEnd();
}

/**
 * Log performance metrics
 */
export function logPerformance(operation, duration) {
  if (!devToolsEnabled || !devToolsConfig.logPerformance) return;
  
  console.log(`[TWS Performance] ${operation}: ${duration.toFixed(2)}ms`);
}

/**
 * Show warning
 */
export function showWarning(message, details = {}) {
  if (!devToolsEnabled || !devToolsConfig.showWarnings) return;
  
  console.warn(`[TWS Warning] ${message}`, details);
}

/**
 * Highlight conflicts in console
 */
export function highlightConflicts(conflicts) {
  if (!devToolsEnabled || !devToolsConfig.highlightConflicts) return;
  
  if (conflicts.length === 0) return;
  
  console.group(`[TWS] ${conflicts.length} Conflicts Detected`);
  conflicts.forEach((conflict) => {
    console.warn(
      `Property: ${conflict.property}`,
      `\nClasses: ${conflict.classes.join(", ")}`,
      `\nWinner: ${conflict.winner}`
    );
  });
  console.groupEnd();
}

/**
 * Inspect element styles
 */
export function inspectElement(element) {
  if (!devToolsEnabled) {
    console.warn("[TWS] DevTools not enabled");
    return;
  }
  
  const className = element.className;
  const computedStyles = window.getComputedStyle(element);
  
  console.group(`[TWS] Element Inspector`);
  console.log("Element:", element);
  console.log("Class Name:", className);
  console.log("Computed Styles:", computedStyles);
  console.groupEnd();
  
  return {
    element,
    className,
    computedStyles,
  };
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  if (!devToolsEnabled) {
    console.warn("[TWS] DevTools not enabled");
    return null;
  }
  
  if (typeof window === "undefined") return null;
  
  const stats = window.__TWS_DEVTOOLS__?.stats || {};
  
  console.table(stats);
  return stats;
}

/**
 * Clear cache
 */
export function clearDevCache() {
  if (!devToolsEnabled) {
    console.warn("[TWS] DevTools not enabled");
    return;
  }
  
  if (typeof window === "undefined") return;
  
  if (window.__TWS_DEVTOOLS__) {
    window.__TWS_DEVTOOLS__.cache = {};
    window.__TWS_DEVTOOLS__.stats = {};
    console.log("[TWS] Cache cleared");
  }
}

/**
 * Track style usage
 */
export function trackUsage(className) {
  if (!devToolsEnabled) return;
  
  if (typeof window === "undefined") return;
  
  if (!window.__TWS_DEVTOOLS__) return;
  
  if (!window.__TWS_DEVTOOLS__.stats) {
    window.__TWS_DEVTOOLS__.stats = {};
  }
  
  if (!window.__TWS_DEVTOOLS__.stats[className]) {
    window.__TWS_DEVTOOLS__.stats[className] = { count: 0, lastUsed: null };
  }
  
  window.__TWS_DEVTOOLS__.stats[className].count++;
  window.__TWS_DEVTOOLS__.stats[className].lastUsed = new Date().toISOString();
}

/**
 * Get usage statistics
 */
export function getUsageStats() {
  if (!devToolsEnabled) {
    console.warn("[TWS] DevTools not enabled");
    return null;
  }
  
  if (typeof window === "undefined") return null;
  
  const stats = window.__TWS_DEVTOOLS__?.stats || {};
  
  // Sort by usage count
  const sorted = Object.entries(stats)
    .map(([className, data]) => ({ className, ...data }))
    .sort((a, b) => b.count - a.count);
  
  console.table(sorted);
  return sorted;
}

/**
 * Debug panel UI
 */
export function createDebugPanel() {
  if (typeof window === "undefined") return;
  
  // Check if panel already exists
  if (document.getElementById("tws-debug-panel")) {
    return;
  }
  
  const panel = document.createElement("div");
  panel.id = "tws-debug-panel";
  panel.innerHTML = `
    <style>
      #tws-debug-panel {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 400px;
        max-height: 600px;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
        z-index: 999999;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      #tws-debug-header {
        background: #3b82f6;
        color: white;
        padding: 12px 16px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      #tws-debug-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
      }
      #tws-debug-content {
        padding: 16px;
        overflow-y: auto;
        flex: 1;
      }
      #tws-debug-tabs {
        display: flex;
        border-bottom: 1px solid #e5e7eb;
        margin: -16px -16px 16px;
        padding: 0 16px;
      }
      .tws-debug-tab {
        padding: 12px 16px;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        color: #6b7280;
        font-weight: 500;
      }
      .tws-debug-tab.active {
        color: #3b82f6;
        border-bottom-color: #3b82f6;
      }
      .tws-debug-section {
        display: none;
      }
      .tws-debug-section.active {
        display: block;
      }
      .tws-stat {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #f3f4f6;
      }
      .tws-stat-label {
        color: #6b7280;
      }
      .tws-stat-value {
        font-weight: 600;
      }
      .tws-button {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        margin-top: 8px;
        width: 100%;
      }
      .tws-button:hover {
        background: #2563eb;
      }
    </style>
    <div id="tws-debug-header">
      <div>TWS DevTools</div>
      <button id="tws-debug-close">&times;</button>
    </div>
    <div id="tws-debug-content">
      <div id="tws-debug-tabs">
        <div class="tws-debug-tab active" data-tab="stats">Stats</div>
        <div class="tws-debug-tab" data-tab="cache">Cache</div>
        <div class="tws-debug-tab" data-tab="usage">Usage</div>
      </div>
      
      <div id="tab-stats" class="tws-debug-section active">
        <div class="tws-stat">
          <span class="tws-stat-label">Total Classes</span>
          <span class="tws-stat-value" id="stat-total">0</span>
        </div>
        <div class="tws-stat">
          <span class="tws-stat-label">Cache Hits</span>
          <span class="tws-stat-value" id="stat-hits">0</span>
        </div>
        <div class="tws-stat">
          <span class="tws-stat-label">Cache Misses</span>
          <span class="tws-stat-value" id="stat-misses">0</span>
        </div>
        <button class="tws-button" id="refresh-stats">Refresh Stats</button>
      </div>
      
      <div id="tab-cache" class="tws-debug-section">
        <div id="cache-list"></div>
        <button class="tws-button" id="clear-cache">Clear Cache</button>
      </div>
      
      <div id="tab-usage" class="tws-debug-section">
        <div id="usage-list"></div>
        <button class="tws-button" id="refresh-usage">Refresh Usage</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(panel);
  
  // Event handlers
  document.getElementById("tws-debug-close").addEventListener("click", () => {
    panel.remove();
  });
  
  // Tab switching
  document.querySelectorAll(".tws-debug-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.getAttribute("data-tab");
      
      // Update tabs
      document.querySelectorAll(".tws-debug-tab").forEach((t) => {
        t.classList.remove("active");
      });
      tab.classList.add("active");
      
      // Update sections
      document.querySelectorAll(".tws-debug-section").forEach((section) => {
        section.classList.remove("active");
      });
      document.getElementById(`tab-${tabName}`).classList.add("active");
    });
  });
  
  // Refresh stats
  document.getElementById("refresh-stats").addEventListener("click", () => {
    updateStats();
  });
  
  // Clear cache
  document.getElementById("clear-cache").addEventListener("click", () => {
    clearDevCache();
    updateCache();
  });
  
  // Refresh usage
  document.getElementById("refresh-usage").addEventListener("click", () => {
    updateUsage();
  });
  
  // Initial update
  updateStats();
  updateCache();
  updateUsage();
}

/**
 * Update stats in debug panel
 */
function updateStats() {
  const stats = window.__TWS_DEVTOOLS__?.stats || {};
  const totalClasses = Object.keys(stats).length;
  
  document.getElementById("stat-total").textContent = totalClasses;
}

/**
 * Update cache in debug panel
 */
function updateCache() {
  const cache = window.__TWS_DEVTOOLS__?.cache || {};
  const cacheList = document.getElementById("cache-list");
  
  if (Object.keys(cache).length === 0) {
    cacheList.innerHTML = "<div>Cache is empty</div>";
    return;
  }
  
  cacheList.innerHTML = Object.keys(cache)
    .map((key) => `<div class="tws-stat"><span>${key}</span></div>`)
    .join("");
}

/**
 * Update usage in debug panel
 */
function updateUsage() {
  const stats = getUsageStats();
  const usageList = document.getElementById("usage-list");
  
  if (!stats || stats.length === 0) {
    usageList.innerHTML = "<div>No usage data</div>";
    return;
  }
  
  usageList.innerHTML = stats
    .slice(0, 20)
    .map(
      (stat) =>
        `<div class="tws-stat">
          <span class="tws-stat-label">${stat.className}</span>
          <span class="tws-stat-value">${stat.count}</span>
        </div>`
    )
    .join("");
}

/**
 * Export DevTools API
 */
export const devTools = {
  enable: enableDevTools,
  disable: disableDevTools,
  isEnabled: isDevToolsEnabled,
  logClassName,
  logStyles,
  logPerformance,
  showWarning,
  highlightConflicts,
  inspectElement,
  getCacheStats,
  clearCache: clearDevCache,
  trackUsage,
  getUsageStats,
  createDebugPanel,
};
