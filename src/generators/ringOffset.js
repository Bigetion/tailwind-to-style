import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}ring-offset`;

  const { ringOffsetWidth = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      ringOffsetWidth,
      (key, value) => `
          ${prefix}-${key} {
            --ring-offset-width: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
