import defaultConfigOptions from "../config/index.js";
import { getExtendedTheme, getPrefix } from "../config/userConfig.js";

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}

function getConfigOptions(options = {}) {
  const { theme = {} } = options;

  const { extend: themeExtend = {} } = theme;

  const newTheme = {};
  const themeKeys = Object.keys(defaultConfigOptions.theme);

  themeKeys.forEach((key) => {
    newTheme[key] = theme[key] || defaultConfigOptions.theme[key];
    if (isFunction(newTheme[key])) {
      newTheme[key] = newTheme[key]({
        theme: (keyRef) => {
          return defaultConfigOptions.theme[keyRef];
        },
      });
    }
  });

  themeKeys.forEach((key) => {
    if (isFunction(newTheme[key])) {
      newTheme[key] = newTheme[key]({
        theme: (keyRef) => {
          return newTheme[keyRef];
        },
      });
    }
    if (themeExtend[key]) {
      newTheme[key] = Object.assign({}, newTheme[key], themeExtend[key]);
    }
  });

  // Apply user config theme extensions
  const userThemeExtensions = {};
  themeKeys.forEach((key) => {
    const extended = getExtendedTheme(key);
    if (extended && Object.keys(extended).length > 0) {
      userThemeExtensions[key] = extended;
      newTheme[key] = Object.assign({}, newTheme[key], extended);
    }
  });

  // Re-resolve theme functions after all extensions are applied
  // This ensures that theme functions like backgroundColor: ({ theme }) => theme("colors")
  // get the updated colors including custom theme extensions
  themeKeys.forEach((key) => {
    if (isFunction(defaultConfigOptions.theme[key])) {
      newTheme[key] = defaultConfigOptions.theme[key]({
        theme: (keyRef) => {
          return newTheme[keyRef];
        },
      });
    }
  });

  // Get user prefix
  const userPrefix = getPrefix();
  const finalPrefix = userPrefix || options.prefix || "";

  return {
    prefix: finalPrefix,
    ...defaultConfigOptions,
    ...options,
    theme: newTheme,
  };
}

function generateCssString(getCssString = () => {}) {
  const orientationPrefix = "";

  const hexToRgb = (hex) => {
    const rgba = hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (...args) =>
          "#" + args[1] + args[1] + args[2] + args[2] + args[3] + args[3]
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16))
      .join(",");

    if (rgba.indexOf("NaN") >= 0) return "";
    return rgba;
  };

  const getCssByOptions = (options = {}, getStr = () => {}) => {
    let nOptions = Object.assign({}, options);
    if (Array.isArray(options)) {
      nOptions = options.reduce(
        (currentObj, value) =>
          Object.assign({}, currentObj, { [value]: value }),
        {}
      );
    }
    let str = "";
    Object.entries(nOptions).forEach(([key, value]) => {
      str += getStr(key.replace("/", "\\/").replace(".", "\\."), value);
    });
    return str;
  };

  const getCssByColors = (colors, getStr = () => {}) => {
    let str = "";
    Object.entries(colors).forEach(([key1, value1]) => {
      if (typeof value1 === "string") {
        str += `${getStr(key1, value1, hexToRgb(value1))} `;
      } else if (typeof value1 === "object") {
        Object.entries(value1).forEach(([key2, value2]) => {
          str += `${getStr(`${key1}-${key2}`, value2, hexToRgb(value2))} `;
        });
      }
    });
    return str;
  };

  const isValidCssColor = (value) => {
    if (typeof value !== "string") return false;

    const hexColor = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    const rgbColor = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
    const rgbaColor =
      /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\)$/;
    const hslColor = /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/;
    const hslaColor =
      /^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*(0|1|0?\.\d+)\s*\)$/;

    return [
      hexColor.test(value),
      rgbColor.test(value),
      rgbaColor.test(value),
      hslColor.test(value),
      hslaColor.test(value),
    ].includes(true);
  };

  const cssString = getCssString({
    orientationPrefix,
    getCssByOptions,
    getCssByColors,
    isValidCssColor,
  });

  return cssString;
}

export { getConfigOptions, generateCssString };
