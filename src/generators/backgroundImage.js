import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}bg`;
  const customPrefix = `${globalPrefix}bg-image`;

  const { backgroundImage = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(backgroundImage, (key, value) => {
      if (value === "custom_value") {
        return `
            ${customPrefix}-${key} {
              background-image: ${value};
            }
          `;
      }
      return `
          ${prefix}-${key} {
            background-image: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
