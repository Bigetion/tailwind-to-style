import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}bg`;

  const { backgroundColor = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByColors, isValidCssColor }) => {
      const cssString = getCssByColors(
        backgroundColor,
        (key, value, rgbValue) => {
          let rgbPropertyValue = "";
          if (rgbValue) {
            rgbPropertyValue = `background-color: rgba(${rgbValue}, var(--bg-opacity));`;
          }

          if (value === "custom_value") {
            return `
              ${prefix}-${key} {
                ${
                  isValidCssColor(value) ? "background-color" : "background"
                }: ${value};
              }
            `;
          }

          return `
            ${prefix}-${key} {
              --bg-opacity: 1;
              background-color: ${value};
              ${rgbPropertyValue}
            }
          `;
        }
      );
      return cssString;
    },
    configOptions
  );

  return responsiveCssString;
}
