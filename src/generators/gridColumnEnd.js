import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}col-end`;

  const { gridColumnEnd = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridColumnEnd,
      (key, value) => `
          ${prefix}-${key} {
            grid-column-end: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
