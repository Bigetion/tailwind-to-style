import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}order`;

  const { order = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      order,
      (key, value) => `
          ${prefix}-${key} {
            order: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
