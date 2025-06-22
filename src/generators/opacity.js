import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}opacity`;
  const basePrefix = prefix.replace(globalPrefix, "");

  const { opacity = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      opacity,
      (key, value) => `
          ${prefix}-${key} {
            opacity: ${value};
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}-${key} {
            --backdrop-opacity: opacity(${value});
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
