/**
 * User Configuration Management
 * Handles theme extensions and custom plugin registration
 */

import { resetTailwindCache } from "../utils/tailwindCache.js";
import { logger } from "../utils/logger.js";

/**
 * User configuration state
 */
let userConfig = {
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {},
  prefix: "",
};

/**
 * Deep merge two objects
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} Merged object
 */
function deepMerge(target, source) {
  const result = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

/**
 * Configure tailwind-to-style with custom theme and plugins
 * @param {Object} config - Configuration object
 * @param {Object} [config.theme] - Theme configuration
 * @param {Object} [config.theme.extend] - Theme extensions
 * @param {Array} [config.plugins] - Array of plugins
 * @param {Object} [config.corePlugins] - Core plugins to enable/disable
 * @param {string} [config.prefix] - Prefix for all classes
 * 
 * @example
 * configure({
 *   theme: {
 *     extend: {
 *       colors: {
 *         brand: {
 *           500: '#3B82F6',
 *         },
 *       },
 *       spacing: {
 *         128: '32rem',
 *       },
 *     },
 *   },
 *   plugins: [myCustomPlugin],
 * });
 */
export function configure(config = {}) {
  try {
    // Validate config
    if (!config || typeof config !== "object") {
      logger.warn("configure: Expected an object but received:", config);
      return;
    }

    // Merge user config with defaults
    if (config.theme) {
      if (config.theme.extend) {
        userConfig.theme.extend = deepMerge(
          userConfig.theme.extend,
          config.theme.extend
        );
      }

      // Support direct theme overrides (not recommended, but allowed)
      if (config.theme.colors) {
        userConfig.theme.colors = config.theme.colors;
      }
      if (config.theme.spacing) {
        userConfig.theme.spacing = config.theme.spacing;
      }
    }

    // Register plugins
    if (config.plugins && Array.isArray(config.plugins)) {
      userConfig.plugins = [...userConfig.plugins, ...config.plugins];
      logger.info(`Registered ${config.plugins.length} plugin(s)`);
    }

    // Core plugins configuration
    if (config.corePlugins) {
      userConfig.corePlugins = {
        ...userConfig.corePlugins,
        ...config.corePlugins,
      };
    }

    // Prefix configuration
    if (config.prefix !== undefined) {
      userConfig.prefix = config.prefix;
    }

    // Reset cache to apply new configuration
    resetTailwindCache();
    
    logger.info("Configuration applied successfully");
  } catch (error) {
    logger.error("Error applying configuration:", error);
    throw error;
  }
}

/**
 * Get current user configuration
 * @returns {Object} Current configuration
 */
export function getConfig() {
  return { ...userConfig };
}

/**
 * Reset configuration to defaults
 */
export function resetConfig() {
  userConfig = {
    theme: {
      extend: {},
    },
    plugins: [],
    corePlugins: {},
    prefix: "",
  };
  resetTailwindCache();
  logger.info("Configuration reset to defaults");
}

/**
 * Get extended theme value
 * @param {string} key - Theme key (e.g., 'colors', 'spacing')
 * @returns {Object} Extended theme values
 */
export function getExtendedTheme(key) {
  return userConfig.theme.extend[key] || {};
}

/**
 * Get all registered plugins
 * @returns {Array} Array of plugins
 */
export function getPlugins() {
  return userConfig.plugins;
}

/**
 * Check if a core plugin is enabled
 * @param {string} pluginName - Name of the core plugin
 * @returns {boolean} True if enabled (or not explicitly disabled)
 */
export function isCorePluginEnabled(pluginName) {
  if (userConfig.corePlugins[pluginName] !== undefined) {
    return userConfig.corePlugins[pluginName];
  }
  return true; // Enabled by default
}

/**
 * Get configured prefix
 * @returns {string} Prefix string
 */
export function getPrefix() {
  return userConfig.prefix;
}
