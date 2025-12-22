import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}text`;
  const customPrefix = `${globalPrefix}text-color`;

  const { textColor } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(textColor, (key, value, rgbValue) => {
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `color: rgba(${rgbValue}, var(--text-opacity));`;
      }
      if (value === "custom_value") {
        return `
          ${customPrefix}-${key} {
            color: ${value};
          }
          ${prefix}-${key} {
            color: ${value};
          }
        `;
      }
      return `
        ${prefix}-${key} {
          --text-opacity: 1;
          color: ${value};
          ${rgbPropertyValue}
        }
      `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
