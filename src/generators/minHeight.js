import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}min-h`;

  const { minHeight = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      minHeight,
      (key, value) => `
          ${prefix}-${key} {
            min-height: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
