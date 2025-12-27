import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}col-start`;

  const { gridColumnStart = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridColumnStart,
      (key, value) => `
          ${prefix}-${key} {
            grid-column-start: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
