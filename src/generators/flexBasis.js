import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}basis`;

  const { flexBasis = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      flexBasis,
      (key, value) => `
          ${prefix}-${key} {
            flex-basis: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
