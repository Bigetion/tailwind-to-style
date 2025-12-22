import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}accent`;

  const { accentColor, opacity = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByColors, getCssByOptions }) => {
      let cssString = getCssByColors(accentColor, (key, value, rgbValue) => {
        if (value === "custom_value") {
          return `
            ${prefix}-${key} {
              accent-color: ${value};
            }
          `;
        }

        let rgbPropertyValue = "";
        if (rgbValue) {
          rgbPropertyValue = `accent-color: rgba(${rgbValue}, var(--accent-opacity));`;
        }

        return `
            ${prefix}-${key} {
              --accent-opacity: 1;
              accent-color: ${value};
              ${rgbPropertyValue}
            }
          `;
      });
      cssString += getCssByOptions(opacity, (key, value) => {
        // Skip 'custom' to avoid overwriting accent-custom from colors
        if (key === "custom") return "";

        return `
            ${prefix}-${key} {
              --accent-opacity: ${value};
            }
          `;
      });
      return cssString;
    },
    configOptions
  );

  return responsiveCssString;
}
