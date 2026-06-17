import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}text-shadow`;

  const { textShadowColor = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(
      textShadowColor,
      (keyTmp, value, rgbValue) => {
        if (keyTmp.toLowerCase() === "default") {
          return "";
        }
        const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
        let rgbPropertyValue = "";
        if (rgbValue) {
          rgbPropertyValue = `text-shadow: var(--text-shadow-x) var(--text-shadow-y) var(--text-shadow-blur, 0) rgba(${rgbValue}, var(--text-shadow-opacity));`;
        }
        return `
            ${prefix}${key} {
              --text-shadow-opacity: 1;
              --text-shadow-x: 1px;
              --text-shadow-y: 1px;
              text-shadow: var(--text-shadow-x) var(--text-shadow-y) var(--text-shadow-blur, 0) ${value};
              ${rgbPropertyValue}
            }
          `;
      }
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
