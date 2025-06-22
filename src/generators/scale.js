import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}scale`;

  const { scale = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      scale,
      (key, value) => `
          ${prefix}-${key} {
            --transform-scale-x: ${value};
            --transform-scale-y: ${value};
          }
          ${prefix}-x-${key} {
            --transform-scale-x: ${value};
          }
          ${prefix}-y-${key} {
            --transform-scale-y: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
