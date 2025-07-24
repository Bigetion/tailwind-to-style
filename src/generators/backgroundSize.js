import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}bg`;
  const customPrefix = `${globalPrefix}bg-size`;

  const { backgroundSize = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(backgroundSize, (key, value) => {
      if (value === "custom_value") {
        return `
            ${customPrefix}-${key} {
              background-size: ${value};
            }
          `;
      }
      return `
          ${prefix}-${key} {
            background-size: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
