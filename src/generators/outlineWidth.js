import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}outline`;
  const customPrefix = `${globalPrefix}outline-width`;

  const { outlineWidth = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(outlineWidth, (key, value) => {
      if (value === "custom_value") {
        return `
          ${customPrefix}-${key} {
            outline-width: ${value};
          }
        `;
      }
      return `
        ${prefix}-${key} {
          outline-width: ${value};
        }
      `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
