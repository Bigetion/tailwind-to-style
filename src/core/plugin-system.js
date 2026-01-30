/**
 * Plugin System - Extensible Architecture
 * Allow users to create custom utilities and extend functionality
 */

import { logger } from "../utils/logger.js";

/**
 * Plugin registry
 */
class PluginRegistry {
  constructor() {
    this.plugins = new Map();
    this.utilities = new Map();
    this.components = new Map();
  }

  /**
   * Register a plugin
   * @param {Object} plugin - Plugin definition
   */
  register(plugin) {
    if (!plugin.name) {
      throw new Error("Plugin must have a name");
    }

    if (this.plugins.has(plugin.name)) {
      logger.warn(`Plugin "${plugin.name}" already registered. Overwriting.`);
    }

    this.plugins.set(plugin.name, plugin);

    // Register utilities
    if (plugin.utilities) {
      for (const [key, value] of Object.entries(plugin.utilities)) {
        this.utilities.set(key, value);
      }
    }

    // Register components
    if (plugin.components) {
      for (const [key, value] of Object.entries(plugin.components)) {
        this.components.set(key, value);
      }
    }

    logger.debug(`Plugin "${plugin.name}" registered`);
    return this;
  }

  /**
   * Get plugin by name
   */
  get(name) {
    return this.plugins.get(name);
  }

  /**
   * Get utility by key
   */
  getUtility(key) {
    return this.utilities.get(key);
  }

  /**
   * Get component by key
   */
  getComponent(key) {
    return this.components.get(key);
  }

  /**
   * Check if plugin exists
   */
  has(name) {
    return this.plugins.has(name);
  }

  /**
   * Unregister plugin
   */
  unregister(name) {
    const plugin = this.plugins.get(name);
    if (!plugin) return false;

    // Remove utilities
    if (plugin.utilities) {
      for (const key of Object.keys(plugin.utilities)) {
        this.utilities.delete(key);
      }
    }

    // Remove components
    if (plugin.components) {
      for (const key of Object.keys(plugin.components)) {
        this.components.delete(key);
      }
    }

    this.plugins.delete(name);
    logger.debug(`Plugin "${name}" unregistered`);
    return true;
  }

  /**
   * Get all registered plugins
   */
  list() {
    return Array.from(this.plugins.keys());
  }

  /**
   * Clear all plugins
   */
  clear() {
    this.plugins.clear();
    this.utilities.clear();
    this.components.clear();
  }
}

// Singleton registry
export const pluginRegistry = new PluginRegistry();

/**
 * Create a utility plugin
 * @param {string} name - Plugin name
 * @param {Object} utilities - Utility definitions
 * @returns {Object} Plugin object
 */
export function createUtilityPlugin(name, utilities, options = {}) {
  return {
    name,
    type: "utility",
    utilities,
    options,
    install(registry) {
      registry.register(this);
    },
  };
}

/**
 * Create a component plugin
 * @param {string} name - Plugin name
 * @param {Object} components - Component definitions
 * @returns {Object} Plugin object
 */
export function createComponentPlugin(name, components, options = {}) {
  return {
    name,
    type: "component",
    components,
    options,
    install(registry) {
      registry.register(this);
    },
  };
}

/**
 * Use plugin
 * @param {Object} plugin - Plugin to use
 */
export function usePlugin(plugin) {
  if (typeof plugin.install === "function") {
    plugin.install(pluginRegistry);
  } else {
    pluginRegistry.register(plugin);
  }
}

/**
 * Create a custom utility function
 * @param {string} prefix - Utility prefix (e.g., 'custom')
 * @param {Function} handler - Handler function (value) => css
 */
export function defineUtility(prefix, handler) {
  return {
    prefix,
    handler,
    matcher: new RegExp(`^${prefix}-(.+)$`),
  };
}

/**
 * Example built-in plugins
 */

// Gradient utilities plugin
export const gradientPlugin = createUtilityPlugin("gradients", {
  "gradient-radial": "background-image: radial-gradient(var(--tw-gradient-stops))",
  "gradient-conic": "background-image: conic-gradient(var(--tw-gradient-stops))",
});

// Animation utilities plugin
export const animationPlugin = createUtilityPlugin("animations", {
  "animate-wiggle": "animation: wiggle 1s ease-in-out infinite",
  "animate-bounce-in": "animation: bounceIn 0.5s ease-out",
  "animate-fade-in": "animation: fadeIn 0.3s ease-in",
});

// Typography plugin
export const typographyPlugin = createUtilityPlugin("typography", {
  prose: "max-width: 65ch; font-size: 1rem; line-height: 1.75;",
  "prose-sm": "max-width: 65ch; font-size: 0.875rem; line-height: 1.7;",
  "prose-lg": "max-width: 65ch; font-size: 1.125rem; line-height: 1.8;",
});

// Aspect ratio plugin
export const aspectRatioPlugin = createUtilityPlugin("aspect", {
  "aspect-video": "aspect-ratio: 16 / 9",
  "aspect-square": "aspect-ratio: 1 / 1",
  "aspect-auto": "aspect-ratio: auto",
});

// Container queries plugin (future CSS)
export const containerQueriesPlugin = createUtilityPlugin("container-queries", {
  "@container": "container-type: inline-size",
  "@container-normal": "container-type: normal",
});
