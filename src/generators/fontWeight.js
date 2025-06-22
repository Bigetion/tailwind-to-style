import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}font`;

  const { fontWeight = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      fontWeight,
      (key, value) => `
          ${prefix}-${key} {
            font-weight: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
