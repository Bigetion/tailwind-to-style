import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}tracking`;

  const { letterSpacing = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      letterSpacing,
      (key, value) => `
          ${prefix}-${key} {
            letter-spacing: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
