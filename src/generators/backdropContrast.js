import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {}, vars = {} } = configOptions;

  const prefix = `${globalPrefix}backdrop-contrast`;

  const { backdropContrast = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(backdropContrast, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
        ${prefix}${key} {
          --tw-backdrop-contrast: contrast(${value});
          ${vars.backdropFilter}
        }
      `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
