import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}divide-opacity`;

  const { divideOpacity = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      divideOpacity,
      (key, value) => `
          ${prefix}-${key} {
            --divide-opacity: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
