import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}max-w`;

  const { maxWidth = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      maxWidth,
      (key, value) => `
          ${prefix}-${key} {
            max-width: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
