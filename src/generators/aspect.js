import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}aspect`;

  const { spacing = {} } = theme;

  let responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      spacing,
      (key) => `
          ${prefix}-h-${key} {
            --aspect-h: ${key};
          }
          ${prefix}-w-${key} {
            position: relative;
            padding-bottom: calc(var(--aspect-h) / var(--aspect-w) * 100%);
            --aspect-w: ${key};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
