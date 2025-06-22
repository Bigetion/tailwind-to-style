import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}p`;

  const { padding = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      padding,
      (key, value) => `
          ${prefix}-${key} {
            padding: ${value};
          }
          ${prefix}y-${key} {
            padding-top: ${value};
            padding-bottom: ${value};
          }
          ${prefix}x-${key} {
            padding-left: ${value};
            padding-right: ${value};
          }
          ${prefix}t-${key} {
            padding-top: ${value};
          }
          ${prefix}r-${key} {
            padding-right: ${value};
          }
          ${prefix}b-${key} {
            padding-bottom: ${value};
          }
          ${prefix}l-${key} {
            padding-left: ${value};
          }
          ${prefix}s-${key} {
            padding-inline-start: ${value};
          }
          ${prefix}e-${key} {
            padding-inline-end: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
