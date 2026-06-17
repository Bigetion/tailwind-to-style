import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}gap`;

  const { gap = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gap,
      (key, value) => `
          ${prefix}-${key} {
            gap: ${value};
          }
          ${prefix}-x-${key} {
            column-gap: ${value};
          }
          ${prefix}-y-${key} {
            row-gap: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
