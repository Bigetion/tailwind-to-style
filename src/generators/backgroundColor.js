import { createColorGenerator } from "../utils/baseGenerator.js";

export default createColorGenerator("bg", "background-color", {
  themeKey: "backgroundColor",
  opacityKey: "bg",
  customValueHandler: (key, value, prefix, cssProperty, isValidCssColor) => {
    return `
      ${prefix}-${key} {
        ${isValidCssColor(value) ? "background-color" : "background"}: ${value};
      }
    `;
  }
});
