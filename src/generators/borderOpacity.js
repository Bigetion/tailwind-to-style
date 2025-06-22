import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}border-opacity`;

  const { borderOpacity = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      borderOpacity,
      (key, value) => `
          ${prefix}-${key} {
            --border-opacity: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
