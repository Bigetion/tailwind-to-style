import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}shrink`;

  const { flexShrink = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      flexShrink,
      (key, value) => `
          ${key.toLowerCase() === "default" ? prefix : `${prefix}-${key}`} {
            flex-shrink: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
