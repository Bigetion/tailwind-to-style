import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}fill`;

  const { fill = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(fill, (key, value) => {
      return `
            ${prefix}-${key} {
              fill: ${value};
            }
          `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
