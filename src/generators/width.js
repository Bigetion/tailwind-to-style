import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}w`;

  const { width = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      width,
      (key, value) => `
          ${prefix}-${key} {
            width: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
