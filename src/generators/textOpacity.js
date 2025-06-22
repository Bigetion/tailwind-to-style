import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}text-opacity`;

  const { textOpacity = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      textOpacity,
      (key, value) => `
          ${prefix}-${key} {
            --text-opacity: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
