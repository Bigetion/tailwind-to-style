import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {}, vars = {} } = configOptions;

  const prefix = `${globalPrefix}backdrop-grayscale`;

  const { backdropGrayscale = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(backdropGrayscale, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
        ${prefix}${key} {
          --tw-backdrop-grayscale: grayscale(${value});
          ${vars.backdropFilter}
        }
      `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
