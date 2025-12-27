import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}row`;

  const { gridRow = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridRow,
      (key, value) => `
          ${prefix}-${key} {
            grid-row: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
