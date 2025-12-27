import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}col`;

  const { gridColumn = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridColumn,
      (key, value) => `
          ${prefix}-${key} {
            grid-column: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
