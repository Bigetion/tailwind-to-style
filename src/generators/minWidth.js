import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}min-w`;

  const { minWidth = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      minWidth,
      (key, value) => `
          ${prefix}-${key} {
            min-width: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
