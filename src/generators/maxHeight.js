import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}max-h`;

  const { maxHeight = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      maxHeight,
      (key, value) => `
          ${prefix}-${key} {
            max-height: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
