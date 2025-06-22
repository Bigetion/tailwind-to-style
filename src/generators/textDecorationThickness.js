import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}decoration`;

  const { textDecorationThickness = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      textDecorationThickness,
      (key, value) => `
          ${prefix}-${key} {
            text-decoration-thickness: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
