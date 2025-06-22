import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}ring-offset`;

  const { ringOffsetColor = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(
      ringOffsetColor,
      (key, value) => `
          ${prefix}-${key} {
            --ring-offset-color: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
