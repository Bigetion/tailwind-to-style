import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {}, vars = {} } = configOptions;

  const prefix = `${globalPrefix}invert`;
  const basePrefix = prefix.replace(globalPrefix, "");

  const { invert = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(invert, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --invert: ${value};
            ${vars.filter}
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-invert: ${value};
            ${vars.backdropFilter}
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
