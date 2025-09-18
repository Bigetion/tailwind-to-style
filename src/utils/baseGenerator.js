/**
 * Base Generator Class - Abstraksi untuk semua generator
 * Mengurangi boilerplate code dan meningkatkan konsistensi
 */

// Import generateCssString dari utils yang sudah ada
import { generateCssString } from "./index.js";

/**
 * Base class untuk semua CSS generators
 * Menyediakan common functionality dan mengurangi code duplication
 */
class BaseGenerator {
  constructor(generatorName, cssProperty, configOptions = {}) {
    this.generatorName = generatorName;
    this.cssProperty = cssProperty;
    this.configOptions = configOptions;
    this.globalPrefix = configOptions.prefix || "";
    this.theme = configOptions.theme || {};
  }

  /**
   * Generate CSS prefix untuk generator ini
   * @param {string} suffix - Optional suffix untuk prefix
   * @returns {string} CSS prefix
   */
  getPrefix(suffix = "") {
    const base = `${this.globalPrefix}${this.generatorName}`;
    return suffix ? `${base}-${suffix}` : base;
  }

  /**
   * Generate CSS rule dengan format standard
   * @param {string} selector - CSS selector
   * @param {Object} properties - CSS properties object
   * @returns {string} CSS rule string
   */
  generateRule(selector, properties) {
    const props = Object.entries(properties)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join("\n");
    return `${selector} {\n${props}\n}`;
  }

  /**
   * Generate color-based CSS dengan opacity support
   * @param {string} key - Color key
   * @param {string} value - Color value
   * @param {string} rgbValue - RGB value untuk opacity
   * @param {string} opacityVar - CSS variable name untuk opacity
   * @returns {string} CSS rule
   */
  generateColorRule(key, value, rgbValue = null, opacityVar = null) {
    const selector = `${this.getPrefix()}-${key}`;
    const properties = {};

    if (opacityVar) {
      properties[`--${opacityVar}-opacity`] = "1";
    }

    properties[this.cssProperty] = value;

    if (rgbValue && opacityVar) {
      properties[this.cssProperty] =
        `rgba(${rgbValue}, var(--${opacityVar}-opacity))`;
    }

    return this.generateRule(selector, properties);
  }

  /**
   * Generate opacity modifier rules
   * @param {Object} opacityConfig - Opacity configuration
   * @param {string} opacityVar - CSS variable name
   * @returns {string} CSS rules
   */
  generateOpacityRules(opacityConfig, opacityVar) {
    if (!opacityConfig) return "";

    return Object.entries(opacityConfig)
      .map(([key, value]) => {
        const selector = `${this.getPrefix()}-${key}`;
        return this.generateRule(selector, {
          [`--${opacityVar}-opacity`]: value,
        });
      })
      .join("\n");
  }

  /**
   * Generate standard spacing rules (padding, margin, etc)
   * @param {Object} spacingConfig - Spacing configuration
   * @param {string} property - CSS property name
   * @returns {string} CSS rules
   */
  generateSpacingRules(spacingConfig, property) {
    if (!spacingConfig) return "";

    return Object.entries(spacingConfig)
      .map(([key, value]) => {
        const rules = [];
        const prefix = this.getPrefix();

        // Base rule
        rules.push(
          this.generateRule(`${prefix}-${key}`, { [property]: value })
        );

        // Directional rules for padding/margin
        if (["padding", "margin"].includes(property)) {
          const shortProp = property === "padding" ? "padding" : "margin";

          rules.push(
            this.generateRule(`${prefix}x-${key}`, {
              [`${shortProp}-left`]: value,
              [`${shortProp}-right`]: value,
            }),
            this.generateRule(`${prefix}y-${key}`, {
              [`${shortProp}-top`]: value,
              [`${shortProp}-bottom`]: value,
            }),
            this.generateRule(`${prefix}t-${key}`, {
              [`${shortProp}-top`]: value,
            }),
            this.generateRule(`${prefix}r-${key}`, {
              [`${shortProp}-right`]: value,
            }),
            this.generateRule(`${prefix}b-${key}`, {
              [`${shortProp}-bottom`]: value,
            }),
            this.generateRule(`${prefix}l-${key}`, {
              [`${shortProp}-left`]: value,
            })
          );
        }

        return rules.join("\n");
      })
      .join("\n");
  }

  /**
   * Generate custom value rules (arbitrary values)
   * @param {string} key - Key name
   * @param {string} customValue - Custom CSS value
   * @param {string} fallbackProperty - Fallback CSS property
   * @returns {string} CSS rule
   */
  generateCustomRule(key, customValue, fallbackProperty = null) {
    const selector = `${this.getPrefix()}-${key}`;
    const property = fallbackProperty || this.cssProperty;
    return this.generateRule(selector, { [property]: customValue });
  }
}

/**
 * Factory function untuk membuat color generator dengan opacity support
 * Mengikuti pattern yang sama dengan generator original
 * @param {string} name - Generator name (untuk prefix)
 * @param {string} cssProperty - CSS property utama
 * @param {Object} options - Additional options
 * @returns {Function} Generator function
 */
export function createColorGenerator(name, cssProperty, options = {}) {
  return function generator(configOptions = {}) {
    const { prefix: globalPrefix, theme = {} } = configOptions;
    const prefix = `${globalPrefix}${name}`;
    const customPrefix = options.customPrefix
      ? `${globalPrefix}${options.customPrefix}`
      : prefix;

    const themeKey = options.themeKey || `${name}Color`;
    const opacityKey = options.opacityKey || name;

    const colorConfig = theme[themeKey] || {};
    const opacityConfig = theme.opacity || {};

    return generateCssString(
      ({ getCssByColors, getCssByOptions, isValidCssColor }) => {
        let cssString = "";

        // Generate color rules - mengikuti pattern original
        cssString += getCssByColors(colorConfig, (key, value, rgbValue) => {
          let rgbPropertyValue = "";
          if (rgbValue) {
            rgbPropertyValue = `${cssProperty}: rgba(${rgbValue}, var(--${opacityKey}-opacity));`;
          }

          // Handle custom values menggunakan callback jika ada
          if (value === "custom_value") {
            if (options.customValueHandler) {
              return options.customValueHandler(
                key,
                value,
                customPrefix,
                cssProperty,
                isValidCssColor
              );
            }

            // Default custom value handling
            return `
            ${customPrefix}-${key} {
              ${cssProperty}: ${value};
            }
          `;
          }

          return `
          ${prefix}-${key} {
            --${opacityKey}-opacity: 1;
            ${cssProperty}: ${value};
            ${rgbPropertyValue}
          }
        `;
        });

        // Generate opacity rules - hanya jika tidak di-disable
        if (!options.disableOpacity && Object.keys(opacityConfig).length > 0) {
          cssString += getCssByOptions(
            opacityConfig,
            (key, value) => `
            ${prefix}-${key} {
              --${opacityKey}-opacity: ${value};
            }
          `
          );
        }

        return cssString;
      },
      configOptions
    );
  };
}

/**
 * Factory function untuk spacing generators (padding, margin)
 * @param {string} name - Generator name
 * @param {string} cssProperty - CSS property
 * @param {string} shortName - Short prefix (e.g., 'p' for padding, 'm' for margin)
 * @param {Object} options - Additional options
 * @returns {Function} Generator function
 */
export function createSpacingGenerator(
  name,
  cssProperty,
  shortName,
  options = {}
) {
  return function generator(configOptions = {}) {
    const { prefix: globalPrefix, theme = {} } = configOptions;

    let spacingConfig = theme[name] || {};

    // Handle negative values for margin
    if (name === "margin") {
      Object.entries(spacingConfig).forEach(([key, value]) => {
        spacingConfig[`-${key}`] = `-${value}`.replace("--", "-");
      });
    }

    return generateCssString(({ getCssByOptions }) => {
      return getCssByOptions(spacingConfig, (keyTmp, value) => {
        let prefix = `${globalPrefix}${shortName}`;
        let key = keyTmp;

        // Handle negative margin prefix
        if (name === "margin" && `${key}`.indexOf("-") >= 0) {
          key = key.split("-").join("");
          prefix = `${globalPrefix}-${shortName}`;
        }

        // Generate all directional variants
        return `
          ${prefix}-${key} {
            ${cssProperty}: ${value};
          }
          ${prefix}y-${key} {
            ${cssProperty}-top: ${value};
            ${cssProperty}-bottom: ${value};
          }
          ${prefix}x-${key} {
            ${cssProperty}-left: ${value};
            ${cssProperty}-right: ${value};
          }
          ${prefix}t-${key} {
            ${cssProperty}-top: ${value};
          }
          ${prefix}r-${key} {
            ${cssProperty}-right: ${value};
          }
          ${prefix}b-${key} {
            ${cssProperty}-bottom: ${value};
          }
          ${prefix}l-${key} {
            ${cssProperty}-left: ${value};
          }
          ${prefix}s-${key} {
            ${cssProperty}-inline-start: ${value};
          }
          ${prefix}e-${key} {
            ${cssProperty}-inline-end: ${value};
          }
        `;
      });
    }, configOptions);
  };
}

/**
 * Factory function untuk simple property generators
 * @param {string} name - Generator name
 * @param {string} cssProperty - CSS property
 * @param {Object} options - Additional options
 * @returns {Function} Generator function
 */
export function createSimpleGenerator(name, cssProperty, options = {}) {
  return function generator(configOptions = {}) {
    const { prefix: globalPrefix, theme = {} } = configOptions;
    const prefix = `${globalPrefix}${name}`;
    const customPrefix = options.customPrefix
      ? `${globalPrefix}${options.customPrefix}`
      : prefix;

    const themeKey = options.themeKey || name;
    const config = theme[themeKey] || {};

    return generateCssString(({ getCssByOptions, isValidCssColor }) => {
      return getCssByOptions(config, (key, value) => {
        // Handle custom values
        if (value === "custom_value") {
          return `
            ${customPrefix}-${key} {
              ${options.customProperty || cssProperty}: ${value};
            }
          `;
        }

        // Handle default key case (like grow, shrink)
        const selector =
          key.toLowerCase() === "default" ? prefix : `${prefix}-${key}`;

        return `
          ${selector} {
            ${cssProperty}: ${value};
          }
        `;
      });
    }, configOptions);
  };
}

/**
 * Factory function untuk border color generator dengan directional variants
 * @param {string} name - Generator name
 * @param {string} cssProperty - CSS property
 * @param {Object} options - Additional options
 * @returns {Function} Generator function
 */
export function createBorderColorGenerator(name, cssProperty, options = {}) {
  return function generator(configOptions = {}) {
    const { prefix: globalPrefix, theme = {} } = configOptions;
    const prefix = `${globalPrefix}${name}`;
    const customPrefix = options.customPrefix
      ? `${globalPrefix}${options.customPrefix}`
      : prefix;

    const themeKey = options.themeKey || `${name}Color`;
    const opacityKey = options.opacityKey || name;

    const colorConfig = theme[themeKey] || {};

    return generateCssString(({ getCssByColors }) => {
      return getCssByColors(colorConfig, (keyTmp, value, rgbValue) => {
        if (keyTmp.toLowerCase() === "default") {
          return "";
        }

        const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
        let rgbPropertyValue = "";
        if (rgbValue) {
          rgbPropertyValue = `${cssProperty}: rgba(${rgbValue}, var(--${opacityKey}-opacity));`;
        }

        if (value === "custom_value") {
          return `
            ${customPrefix}${key} {
              ${cssProperty}: ${value};
            }
          `;
        }

        return `
          ${prefix}${key} {
            --${opacityKey}-opacity: 1;
            ${cssProperty}: ${value};
            ${rgbPropertyValue}
          }
          ${prefix}-x${key} {
            --${opacityKey}-opacity: 1;
            border-left-color: ${value};
            border-right-color: ${value};
            ${
              rgbValue
                ? `border-left-color: rgba(${rgbValue}, var(--${opacityKey}-opacity));
            border-right-color: rgba(${rgbValue}, var(--${opacityKey}-opacity));`
                : ""
            }
          }
          ${prefix}-y${key} {
            --${opacityKey}-opacity: 1;
            border-top-color: ${value};
            border-bottom-color: ${value};
            ${
              rgbValue
                ? `border-top-color: rgba(${rgbValue}, var(--${opacityKey}-opacity));
            border-bottom-color: rgba(${rgbValue}, var(--${opacityKey}-opacity));`
                : ""
            }
          }
          ${prefix}-t${key} {
            --${opacityKey}-opacity: 1;
            border-top-color: ${value};
            ${
              rgbValue
                ? `border-top-color: rgba(${rgbValue}, var(--${opacityKey}-opacity));`
                : ""
            }
          }
          ${prefix}-r${key} {
            --${opacityKey}-opacity: 1;
            border-right-color: ${value};
            ${
              rgbValue
                ? `border-right-color: rgba(${rgbValue}, var(--${opacityKey}-opacity));`
                : ""
            }
          }
          ${prefix}-b${key} {
            --${opacityKey}-opacity: 1;
            border-bottom-color: ${value};
            ${
              rgbValue
                ? `border-bottom-color: rgba(${rgbValue}, var(--${opacityKey}-opacity));`
                : ""
            }
          }
          ${prefix}-l${key} {
            --${opacityKey}-opacity: 1;
            border-left-color: ${value};
            ${
              rgbValue
                ? `border-left-color: rgba(${rgbValue}, var(--${opacityKey}-opacity));`
                : ""
            }
          }
          ${prefix}-s${key} {
            --${opacityKey}-opacity: 1;
            border-inline-start-color: ${value};
            ${
              rgbValue
                ? `border-inline-start-color: rgba(${rgbValue}, var(--${opacityKey}-opacity));`
                : ""
            }
          }
          ${prefix}-e${key} {
            --${opacityKey}-opacity: 1;
            border-inline-end-color: ${value};
            ${
              rgbValue
                ? `border-inline-end-color: rgba(${rgbValue}, var(--${opacityKey}-opacity));`
                : ""
            }
          }
        `;
      });
    }, configOptions);
  };
}

/**
 * Factory function untuk static options generators (alignment, display, dll)
 * @param {string} name - Generator prefix name
 * @param {string} cssProperty - CSS property name
 * @param {Object} options - Static options mapping
 * @returns {Function} Generator function
 */
export function createStaticOptionsGenerator(name, cssProperty, options = {}) {
  return function generator(configOptions = {}) {
    const { prefix: globalPrefix } = configOptions;
    const prefix = `${globalPrefix}${name}`;

    const staticOptions = options.values || {};

    return generateCssString(({ getCssByOptions }) => {
      return getCssByOptions(staticOptions, (key, value) => {
        const selector = key === "" ? prefix : `${prefix}-${key}`;

        if (options.customHandler) {
          return options.customHandler(selector, key, value, cssProperty);
        }

        return `
          ${selector} {
            ${cssProperty}: ${value};
          }
        `;
      });
    }, configOptions);
  };
}

/**
 * Factory function untuk generators dengan array values (key = value)
 * @param {string} name - Generator prefix name
 * @param {string} cssProperty - CSS property name
 * @param {Array} values - Array of values
 * @param {Object} options - Additional options like customHandler
 * @returns {Function} Generator function
 */
export function createArrayOptionsGenerator(
  name,
  cssProperty,
  values = [],
  options = {}
) {
  return function generator(configOptions = {}) {
    const { prefix: globalPrefix } = configOptions;
    const prefix = `${globalPrefix}${name}`;

    return generateCssString(({ getCssByOptions }) => {
      return getCssByOptions(values, (key, value) => {
        const selector = `${prefix}-${key}`;

        if (options.customHandler) {
          return options.customHandler(selector, key, value, cssProperty);
        }

        return `
          ${selector} {
            ${cssProperty}: ${value};
          }
        `;
      });
    }, configOptions);
  };
}

/**
 * Factory function untuk menangani generator dengan negative key handling
 * Khusus untuk generator seperti zIndex, translate, rotate, dll yang memiliki nilai negatif
 * @param {Object} config - Configuration object
 * @param {string} config.prefix - Base prefix (e.g., "z" for z-index)
 * @param {string} config.property - CSS property name
 * @param {string} config.themeKey - Theme key untuk mengambil values
 * @param {Function} config.customHandler - Optional custom handler
 * @returns {Function} Generator function
 */
export function createNegativeKeyGenerator(config) {
  const {
    prefix: basePrefix,
    property: cssProperty,
    themeKey,
    customHandler,
  } = config;

  return function generator(configOptions = {}) {
    const { prefix: globalPrefix, theme = {} } = configOptions;
    const themeValues = theme[themeKey] || {};

    return generateCssString(({ getCssByOptions }) => {
      return getCssByOptions(themeValues, (keyTmp, value) => {
        let prefix = `${globalPrefix}${basePrefix}`;
        let key = keyTmp;

        // Handle negative keys (keys that start with "-")
        if (`${key}`.indexOf("-") >= 0) {
          key = key.split("-").join("");
          prefix = `${globalPrefix}-${basePrefix}`;
        }

        const selector = `${prefix}-${key}`;

        if (customHandler) {
          return customHandler(selector, key, value, keyTmp);
        }

        return `
          ${selector} {
            ${cssProperty}: ${value};
          }
        `;
      });
    }, configOptions);
  };
}

/**
 * Factory function untuk multi-property static generators
 * Khusus untuk generator seperti wordBreak, transform, dll yang memiliki kombinasi properties berbeda per class
 * @param {Object} config - Configuration object
 * @param {Object} config.classes - Object mapping class suffixes to their CSS properties
 * @param {string} config.basePrefix - Base prefix untuk semua classes (optional)
 * @returns {Function} Generator function
 */
export function createMultiPropertyStaticGenerator(config) {
  const { classes, basePrefix = "" } = config;

  return function generator(configOptions = {}) {
    const { prefix: globalPrefix = "" } = configOptions;

    return generateCssString(() => {
      return Object.entries(classes)
        .map(([classSuffix, properties]) => {
          const className = basePrefix
            ? `${globalPrefix}${basePrefix}-${classSuffix}`
            : `${globalPrefix}${classSuffix}`;

          const cssProperties = Object.entries(properties)
            .map(([prop, value]) => `  ${prop}: ${value};`)
            .join("\n");

          return `${className} {\n${cssProperties}\n}`;
        })
        .join("\n");
    }, configOptions);
  };
}

/**
 * Factory function untuk generator dengan default key handling
 * Khusus untuk generator yang memiliki key "default" tanpa suffix
 * @param {Object} config - Configuration object
 * @param {string} config.prefix - CSS prefix
 * @param {string} config.property - CSS property name
 * @param {string} config.themeKey - Theme key untuk mengambil values
 * @param {Function} config.customHandler - Optional custom handler
 * @returns {Function} Generator function
 */
export function createDefaultKeyGenerator(config) {
  const {
    prefix: prefixName,
    property: cssProperty,
    themeKey,
    customHandler,
  } = config;

  return function generator(configOptions = {}) {
    const { prefix: globalPrefix, theme = {} } = configOptions;
    const prefix = `${globalPrefix}${prefixName}`;
    const themeValues = theme[themeKey] || {};

    return generateCssString(({ getCssByOptions }) => {
      return getCssByOptions(themeValues, (keyTmp, value) => {
        // Handle default key - no suffix for "default"
        const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
        const selector = `${prefix}${key}`;

        if (customHandler) {
          return customHandler(selector, keyTmp, value, key);
        }

        return `
          ${selector} {
            ${cssProperty}: ${value};
          }
        `;
      });
    }, configOptions);
  };
}

/**
 * Factory function untuk generator dengan custom value handling
 * Khusus untuk generator yang memiliki dual prefix (standard + custom) seperti background generators
 * @param {Object} config - Configuration object
 * @param {string} config.prefix - Standard prefix (e.g., "bg")
 * @param {string} config.customPrefix - Custom prefix untuk custom_value (e.g., "bg-size")
 * @param {string} config.property - CSS property name (e.g., "background-size")
 * @param {string} config.themeKey - Theme key untuk mengambil values
 * @returns {Function} Generator function
 */
export function createCustomValueGenerator(config) {
  const { prefix, customPrefix, property, themeKey } = config;

  return function generator(configOptions = {}) {
    const { prefix: globalPrefix, theme = {} } = configOptions;
    const standardPrefix = `${globalPrefix}${prefix}`;
    const customPrefixFull = `${globalPrefix}${customPrefix}`;
    const themeValues = theme[themeKey] || {};

    return generateCssString(({ getCssByOptions }) => {
      return getCssByOptions(themeValues, (key, value) => {
        if (value === "custom_value") {
          return `
            ${customPrefixFull}-${key} {
              ${property}: ${value};
            }
          `;
        }
        return `
          ${standardPrefix}-${key} {
            ${property}: ${value};
          }
        `;
      });
    }, configOptions);
  };
}

/**
 * Factory function untuk generator dengan mixed static + dynamic classes
 * Khusus untuk generator yang memiliki 1 static class + multiple dynamic classes dari array
 * @param {Object} config - Configuration object
 * @param {Object} config.staticClass - Static class definition
 * @param {string} config.staticClass.name - Static class name
 * @param {Object} config.staticClass.properties - Static class CSS properties
 * @param {string} config.dynamicPrefix - Prefix for dynamic classes
 * @param {string} config.dynamicProperty - CSS property for dynamic classes
 * @param {Array} config.values - Array of values for dynamic classes
 * @returns {Function} Generator function
 */
export function createMixedStaticGenerator(config) {
  const { staticClass, dynamicPrefix, dynamicProperty, values } = config;

  return function generator(configOptions = {}) {
    const { prefix: globalPrefix = "" } = configOptions;

    return generateCssString(() => {
      let cssString = "";

      // Generate static class (only once)
      const staticClassName = `${globalPrefix}${staticClass.name}`;
      const staticProps = Object.entries(staticClass.properties)
        .map(([prop, value]) => `  ${prop}: ${value};`)
        .join("\n");
      cssString += `${staticClassName} {\n${staticProps}\n}\n`;

      // Generate dynamic classes
      values.forEach((value) => {
        const dynamicClassName = `${globalPrefix}${dynamicPrefix}-${value}`;
        cssString += `${dynamicClassName} {\n  ${dynamicProperty}: ${value};\n}\n`;
      });

      return cssString;
    }, configOptions);
  };
}

/**
 * Factory function untuk multi-axis generator dengan static classes
 * Khusus untuk generator seperti overflow yang memiliki multiple axis (x, y) per value + static classes
 * @param {Object} config - Configuration object
 * @param {string} config.prefix - Base prefix untuk classes
 * @param {string} config.mainProperty - Main CSS property (e.g., "overflow")
 * @param {string} config.xProperty - X-axis CSS property (e.g., "overflow-x")
 * @param {string} config.yProperty - Y-axis CSS property (e.g., "overflow-y")
 * @param {Array} config.values - Array of values untuk generate classes
 * @param {Array} config.staticClasses - Array of additional static classes
 * @returns {Function} Generator function
 */
export function createMultiAxisGenerator(config) {
  const {
    prefix,
    mainProperty,
    xProperty,
    yProperty,
    values,
    staticClasses = [],
  } = config;

  return function generator(configOptions = {}) {
    const { prefix: globalPrefix = "" } = configOptions;

    return generateCssString(({ getCssByOptions }) => {
      // Generate multi-axis classes from values
      let cssString = getCssByOptions(
        values,
        (key, value) => `
          ${globalPrefix}${prefix}-${key} {
            ${mainProperty}: ${value};
          }
          ${globalPrefix}${prefix}-x-${key} {
            ${xProperty}: ${value};
          }
          ${globalPrefix}${prefix}-y-${key} {
            ${yProperty}: ${value};
          }
        `
      );

      // Add static classes
      staticClasses.forEach((staticClass) => {
        const className = `${globalPrefix}${staticClass.name}`;
        const cssProps = Object.entries(staticClass.properties)
          .map(([prop, value]) => `  ${prop}: ${value};`)
          .join("\n");
        cssString += `\n${className} {\n${cssProps}\n}`;
      });

      return cssString;
    }, configOptions);
  };
}

/**
 * Factory function untuk conditional suffix generator
 * Khusus untuk generator seperti outlineStyle yang memiliki logic conditional untuk suffix dan properties
 * @param {Object} config - Configuration object
 * @param {string} config.prefix - Base prefix untuk classes
 * @param {string} config.defaultProperty - Default CSS property
 * @param {Array} config.values - Array of values untuk generate classes
 * @param {Object} config.specialCases - Special case handling untuk values tertentu
 * @param {string} config.defaultValue - Default value yang tidak perlu suffix
 * @returns {Function} Generator function
 */
export function createConditionalSuffixGenerator(config) {
  const {
    prefix,
    defaultProperty,
    values,
    specialCases = {},
    defaultValue,
  } = config;

  return function generator(configOptions = {}) {
    const { prefix: globalPrefix = "" } = configOptions;

    return generateCssString(({ getCssByOptions }) => {
      return getCssByOptions(values, (keyTmp, value) => {
        const key = keyTmp !== defaultValue ? `-${keyTmp}` : "";

        // Check for special cases
        if (specialCases[keyTmp]) {
          const specialCase = specialCases[keyTmp];
          const className = `${globalPrefix}${prefix}${specialCase.suffix || key}`;
          const cssProps = Object.entries(specialCase.properties)
            .map(([prop, val]) => `  ${prop}: ${val};`)
            .join("\n");
          return `\n${className} {\n${cssProps}\n}`;
        }

        // Default case
        const className = `${globalPrefix}${prefix}${key}`;
        return `\n${className} {\n  ${defaultProperty}: ${value};\n}`;
      });
    }, configOptions);
  };
}

/**
 * Factory function untuk dual class generator
 * Khusus untuk generator seperti opacity yang menghasilkan 2 class per value
 * @param {Object} config - Configuration object
 * @param {string} config.prefix - Base prefix untuk classes
 * @param {string} config.themeKey - Theme key untuk mengambil values
 * @param {Object} config.mainClass - Main class configuration
 * @param {Object} config.secondaryClass - Secondary class configuration
 * @param {boolean} config.handleDefaultKey - Whether to handle "default" key without suffix
 * @returns {Function} Generator function
 */
export function createDualClassGenerator(config) {
  const {
    prefix,
    themeKey,
    mainClass,
    secondaryClass,
    handleDefaultKey = false,
  } = config;

  return function generator(configOptions = {}) {
    const { prefix: globalPrefix = "", theme = {}, vars = {} } = configOptions;

    const basePrefix = prefix;
    const fullPrefix = `${globalPrefix}${prefix}`;
    const themeValues = theme[themeKey] || {};

    return generateCssString(({ getCssByOptions }) => {
      return getCssByOptions(themeValues, (keyTmp, value) => {
        const key =
          handleDefaultKey && keyTmp.toLowerCase() === "default"
            ? ""
            : `-${keyTmp}`;
        const mainClassName = `${fullPrefix}${key}`;
        const secondaryClassName = `${globalPrefix}${secondaryClass.prefix}${key}`;

        let mainProperties = `${mainClass.property}: ${value};`;
        if (mainClass.varsKey && vars[mainClass.varsKey]) {
          mainProperties += `\n            ${vars[mainClass.varsKey]}`;
        }

        let secondaryProperties = `${secondaryClass.property}: ${value};`;
        if (secondaryClass.varsKey && vars[secondaryClass.varsKey]) {
          secondaryProperties += `\n            ${vars[secondaryClass.varsKey]}`;
        }

        return `
          ${mainClassName} {
            ${mainProperties}
          }
          ${secondaryClassName} {
            ${secondaryProperties}
          }
        `;
      });
    }, configOptions);
  };
}

export { BaseGenerator };
