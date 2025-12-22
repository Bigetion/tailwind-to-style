import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}caret`;

  const { caretColor, opacity = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByColors, getCssByOptions }) => {
      let cssString = getCssByColors(caretColor, (key, value, rgbValue) => {
        if (value === "custom_value") {
          return `
            ${prefix}-${key} {
              caret-color: ${value};
            }
          `;
        }

        let rgbPropertyValue = "";
        if (rgbValue) {
          rgbPropertyValue = `caret-color: rgba(${rgbValue}, var(--caret-opacity));`;
        }
        return `
            ${prefix}-${key} {
              --caret-opacity: 1;
              caret-color: ${value};
              ${rgbPropertyValue}
            }
          `;
      });
      cssString += getCssByOptions(opacity, (key, value) => {
        // Skip 'custom' to avoid overwriting caret-custom from colors
        if (key === "custom") return "";

        return `
            ${prefix}-${key} {
              --caret-opacity: ${value};
            }
          `;
      });
      return cssString;
    },
    configOptions
  );

  return responsiveCssString;
}
