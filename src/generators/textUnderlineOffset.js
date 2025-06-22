import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}underline-offset`;

  const { textUnderlineOffset = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      textUnderlineOffset,
      (key, value) => `
          ${prefix}-${key} {
            text-underline-offset: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
