import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {}, vars = {} } = configOptions;

  const prefix = `${globalPrefix}contrast`;
  const basePrefix = prefix.replace(globalPrefix, "");

  const { contrast = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(contrast, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --contrast: ${value};
            ${vars.filter}
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-contrast: ${value};
            ${vars.backdropFilter}
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
