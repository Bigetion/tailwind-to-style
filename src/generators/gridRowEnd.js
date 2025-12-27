import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}row-end`;

  const { gridRowEnd = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridRowEnd,
      (key, value) => `
          ${prefix}-${key} {
            grid-row-end: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
