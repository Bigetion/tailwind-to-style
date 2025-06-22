import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}leading`;

  const { lineHeight = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      lineHeight,
      (key, value) => `
          ${prefix}-${key} {
            line-height: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
