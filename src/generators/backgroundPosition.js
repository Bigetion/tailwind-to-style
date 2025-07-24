import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}bg`;
  const customPrefix = `${globalPrefix}bg-position`;

  const { backgroundPosition = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(backgroundPosition, (key, value) => {
      if (value === "custom_value") {
        return `
            ${customPrefix}-${key} {
              background-position: ${value};
            }
          `;
      }
      return `
          ${prefix}-${key} {
            background-position: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
