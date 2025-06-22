import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}stroke`;

  const { stroke } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(stroke, (key, value) => {
      return `
            ${prefix}-${key} {
              stroke: ${value};
            }
          `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
