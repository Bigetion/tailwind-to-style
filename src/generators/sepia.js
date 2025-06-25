import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {}, vars = {} } = configOptions;

  const prefix = `${globalPrefix}sepia`;
  const basePrefix = prefix.replace(globalPrefix, "");

  const { sepia = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(sepia, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --sepia: ${value};
            ${vars.filter}
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-sepia: ${value};
            ${vars.backdropFilter}
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
