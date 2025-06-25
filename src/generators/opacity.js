import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {}, vars = {} } = configOptions;

  const prefix = `${globalPrefix}opacity`;
  const basePrefix = prefix.replace(globalPrefix, "");

  const { opacity = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      opacity,
      (key, value) => `
          ${prefix}-${key} {
            opacity: ${value};
            ${vars.filter}
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}-${key} {
            --backdrop-opacity: ${value};
            ${vars.backdropFilter}
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
