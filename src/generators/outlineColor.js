import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}outline`;
  const customPrefix = `${globalPrefix}outline-color`;

  const { outlineColor = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(
      outlineColor,
      (keyTmp, value, rgbValue) => {
        if (keyTmp.toLowerCase() === "default") {
          return "";
        }
        const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
        let rgbPropertyValue = "";
        if (rgbValue) {
          rgbPropertyValue = `outline-color: rgba(${rgbValue}, var(--outline-opacity));`;
        }
        if (value === "custom_value") {
          return `
            ${customPrefix}${key} {
              outline-color: ${value};
            }
          `;
        }
        return `
            ${prefix}${key} {
              --outline-opacity: 1;
              outline-color: ${value};
              ${rgbPropertyValue}
            }
          `;
      }
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
