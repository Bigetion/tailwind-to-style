import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {}, vars = {} } = configOptions;

  const prefix = `${globalPrefix}scale`;

  const { scale = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      scale,
      (key, value) => `
          ${prefix}-${key} {
            --transform-scale-x: ${value};
            --transform-scale-y: ${value};
            ${vars.transform}
          }
          ${prefix}-x-${key} {
            --transform-scale-x: ${value};
            ${vars.transform}
          }
          ${prefix}-y-${key} {
            --transform-scale-y: ${value};
            ${vars.transform}
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
