/**
 * Plugin API for tailwind-to-style
 * Allows users to create custom utilities and extend functionality
 */

import { logger } from "../utils/logger.js";

// ============================================================================
// Global Plugin Registry
// ============================================================================

const pluginRegistry = new Map();
const pluginLoadOrder = [];

/**
 * Register a plugin globally
 * @private
 */
function registerPlugin(plugin) {
  if (!plugin || !plugin.name) {
    logger.warn('[tailwind-to-style/plugins] Plugin must have a name');
    return false;
  }

  if (pluginRegistry.has(plugin.name)) {
    logger.warn(`[tailwind-to-style/plugins] Plugin "${plugin.name}" is already registered`);
    return false;
  }

  pluginRegistry.set(plugin.name, {
    ...plugin,
    registeredAt: Date.now(),
  });
  pluginLoadOrder.push(plugin.name);
  
  logger.debug(`[tailwind-to-style/plugins] Registered plugin: ${plugin.name}`);
  return true;
}

/**
 * Create a plugin for tailwind-to-style
 *
 * @param {string} name - Plugin name
 * @param {Object} definition - Plugin definition
 * @param {Object} [definition.utilities] - Custom utility classes
 * @param {Object} [definition.components] - Custom component classes
 * @param {Function} [definition.handler] - Custom handler function
 * @param {boolean} [definition.autoRegister] - Auto-register plugin globally (default: true)
 * @returns {Object} Plugin object
 *
 * @example
 * const myPlugin = createPlugin('my-plugin', {
 *   utilities: {
 *     '.text-gradient': {
 *       'background-clip': 'text',
 *       '-webkit-background-clip': 'text',
 *       '-webkit-text-fill-color': 'transparent',
 *     },
 *     '.glass': {
 *       'backdrop-filter': 'blur(10px)',
 *       'background-color': 'rgba(255, 255, 255, 0.1)',
 *     },
 *   },
 * });
 */
export function createPlugin(name, definition) {
  if (!name || typeof name !== "string") {
    throw new Error("Plugin name must be a non-empty string");
  }

  if (!definition || typeof definition !== "object") {
    throw new Error("Plugin definition must be an object");
  }

  const { autoRegister = true, ...restDefinition } = definition;

  const plugin = {
    name,
    type: "user-plugin",
    utilities: restDefinition.utilities || {},
    components: restDefinition.components || {},
    handler: restDefinition.handler || null,
    version: restDefinition.version || '1.0.0',
    description: restDefinition.description || '',
  };

  // Auto-register plugin if enabled
  if (autoRegister) {
    registerPlugin(plugin);
  }

  logger.debug(`Created plugin: ${name}`);
  return plugin;
}

/**
 * Create a utility plugin with dynamic values
 *
 * @param {string} name - Plugin name
 * @param {Object} config - Configuration
 * @param {string} config.prefix - Class prefix (e.g., 'text', 'bg')
 * @param {Object} config.values - Values object
 * @param {Function} config.formatter - Function to format CSS properties
 * @returns {Object} Plugin object
 *
 * @example
 * const textShadowPlugin = createUtilityPlugin('text-shadow', {
 *   prefix: 'text-shadow',
 *   values: {
 *     sm: '1px 1px 2px rgba(0,0,0,0.1)',
 *     md: '2px 2px 4px rgba(0,0,0,0.1)',
 *     lg: '4px 4px 8px rgba(0,0,0,0.1)',
 *   },
 *   formatter: (value) => ({
 *     'text-shadow': value,
 *   }),
 * });
 */
export function createUtilityPlugin(name, config) {
  const { prefix, values, formatter } = config;

  if (!prefix || !values || !formatter) {
    throw new Error(
      "createUtilityPlugin requires prefix, values, and formatter"
    );
  }

  const utilities = {};

  for (const [key, value] of Object.entries(values)) {
    const className = `.${prefix}-${key}`;
    const cssProps = formatter(value, key);

    utilities[className] = cssProps;
  }

  return createPlugin(name, { utilities });
}

/**
 * Create a variant plugin
 *
 * @param {string} name - Plugin name
 * @param {Function} handler - Variant handler function
 * @returns {Object} Plugin object
 *
 * @example
 * const hoverParentPlugin = createVariantPlugin('hover-parent', (selector) => {
 *   return `.parent:hover ${selector}`;
 * });
 */
export function createVariantPlugin(name, handler) {
  if (!handler || typeof handler !== "function") {
    throw new Error("Variant handler must be a function");
  }

  return createPlugin(name, {
    handler: {
      type: "variant",
      fn: handler,
    },
  });
}

/**
 * Generate CSS string from plugin utilities
 * @param {Object} plugin - Plugin object
 * @param {string} [prefix] - Optional prefix for all classes
 * @returns {string} CSS string
 */
export function generatePluginCSS(plugin, prefix = "") {
  let css = "";

  // Generate utilities
  if (plugin.utilities) {
    for (const [className, props] of Object.entries(plugin.utilities)) {
      const prefixedClass = prefix
        ? `.${prefix}${className.slice(1)}`
        : className;
      css += `${prefixedClass}{`;

      if (typeof props === "string") {
        css += props;
      } else {
        for (const [prop, value] of Object.entries(props)) {
          css += `${prop}:${value};`;
        }
      }

      css += "}";
    }
  }

  // Generate components
  if (plugin.components) {
    for (const [className, props] of Object.entries(plugin.components)) {
      const prefixedClass = prefix
        ? `.${prefix}${className.slice(1)}`
        : className;
      css += `${prefixedClass}{`;

      if (typeof props === "string") {
        css += props;
      } else {
        for (const [prop, value] of Object.entries(props)) {
          css += `${prop}:${value};`;
        }
      }

      css += "}";
    }
  }

  return css;
}

/**
 * Convert plugin utilities to lookup object
 * @param {Object} plugin - Plugin object
 * @param {string} [prefix] - Optional prefix for all classes
 * @returns {Object} Lookup object
 */
export function pluginToLookup(plugin, prefix = "") {
  const lookup = {};

  // Process utilities
  if (plugin.utilities) {
    for (const [className, props] of Object.entries(plugin.utilities)) {
      // Remove leading dot and add prefix
      const key = prefix
        ? `${prefix}${className.slice(1)}`
        : className.slice(1);

      if (typeof props === "string") {
        lookup[key] = props;
      } else {
        let cssString = "";
        for (const [prop, value] of Object.entries(props)) {
          cssString += `${prop}: ${value}; `;
        }
        lookup[key] = cssString.trim();
      }
    }
  }

  // Process components
  if (plugin.components) {
    for (const [className, props] of Object.entries(plugin.components)) {
      const key = prefix
        ? `${prefix}${className.slice(1)}`
        : className.slice(1);

      if (typeof props === "string") {
        lookup[key] = props;
      } else {
        let cssString = "";
        for (const [prop, value] of Object.entries(props)) {
          cssString += `${prop}: ${value}; `;
        }
        lookup[key] = cssString.trim();
      }
    }
  }

  return lookup;
}

/**
 * Validate plugin structure
 * @param {Object} plugin - Plugin to validate
 * @returns {boolean} True if valid
 */
export function validatePlugin(plugin) {
  if (!plugin || typeof plugin !== "object") {
    logger.error("Plugin must be an object");
    return false;
  }

  if (!plugin.name || typeof plugin.name !== "string") {
    logger.error("Plugin must have a name property (string)");
    return false;
  }

  if (!plugin.utilities && !plugin.components && !plugin.handler) {
    logger.warn(
      `Plugin "${plugin.name}" has no utilities, components, or handler`
    );
  }

  return true;
}

// ============================================================================
// Plugin Registry API
// ============================================================================

/**
 * Get all registered plugins
 * @returns {Array<Object>} Array of plugin objects
 * 
 * @example
 * import { getPlugins } from 'tailwind-to-style/plugins';
 * 
 * const plugins = getPlugins();
 * console.log(`Loaded ${plugins.length} plugins`);
 */
export function getPlugins() {
  return Array.from(pluginRegistry.values());
}

/**
 * Get a specific plugin by name
 * @param {string} name - Plugin name
 * @returns {Object|undefined} Plugin object or undefined if not found
 * 
 * @example
 * import { getPlugin } from 'tailwind-to-style/plugins';
 * 
 * const myPlugin = getPlugin('my-plugin');
 * if (myPlugin) {
 *   console.log('Plugin found:', myPlugin.description);
 * }
 */
export function getPlugin(name) {
  return pluginRegistry.get(name);
}

/**
 * Check if a plugin is registered
 * @param {string} name - Plugin name
 * @returns {boolean} True if plugin exists
 * 
 * @example
 * import { hasPlugin } from 'tailwind-to-style/plugins';
 * 
 * if (hasPlugin('my-plugin')) {
 *   console.log('Plugin is available');
 * }
 */
export function hasPlugin(name) {
  return pluginRegistry.has(name);
}

/**
 * Unregister a plugin
 * @param {string} name - Plugin name
 * @returns {boolean} True if successfully unregistered
 * 
 * @example
 * import { unregisterPlugin } from 'tailwind-to-style/plugins';
 * 
 * if (unregisterPlugin('my-plugin')) {
 *   console.log('Plugin unregistered');
 * }
 */
export function unregisterPlugin(name) {
  if (!pluginRegistry.has(name)) {
    logger.warn(`[tailwind-to-style/plugins] Plugin "${name}" not found`);
    return false;
  }

  pluginRegistry.delete(name);
  const index = pluginLoadOrder.indexOf(name);
  if (index > -1) {
    pluginLoadOrder.splice(index, 1);
  }

  logger.debug(`[tailwind-to-style/plugins] Unregistered plugin: ${name}`);
  return true;
}

/**
 * Get plugin load order
 * @returns {Array<string>} Array of plugin names in load order
 */
export function getPluginLoadOrder() {
  return [...pluginLoadOrder];
}

/**
 * Get plugin registry stats
 * @returns {Object} Stats about registered plugins
 * 
 * @example
 * import { getPluginStats } from 'tailwind-to-style/plugins';
 * 
 * const stats = getPluginStats();
 * console.log(`Total plugins: ${stats.totalPlugins}`);
 * console.log(`With utilities: ${stats.withUtilities}`);
 */
export function getPluginStats() {
  const plugins = Array.from(pluginRegistry.values());
  
  return {
    totalPlugins: plugins.length,
    withUtilities: plugins.filter(p => Object.keys(p.utilities || {}).length > 0).length,
    withComponents: plugins.filter(p => Object.keys(p.components || {}).length > 0).length,
    withHandler: plugins.filter(p => p.handler !== null).length,
    loadOrder: [...pluginLoadOrder],
  };
}

/**
 * Clear all plugins from registry
 * @returns {number} Number of plugins removed
 * 
 * @example
 * import { clearPlugins } from 'tailwind-to-style/plugins';
 * 
 * const removed = clearPlugins();
 * console.log(`Cleared ${removed} plugins`);
 */
export function clearPlugins() {
  const count = pluginRegistry.size;
  pluginRegistry.clear();
  pluginLoadOrder.length = 0;
  logger.debug(`[tailwind-to-style/plugins] Cleared ${count} plugins`);
  return count;
}
