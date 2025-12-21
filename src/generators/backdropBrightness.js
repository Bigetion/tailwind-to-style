import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {}, vars = {} } = configOptions;

  const prefix = `${globalPrefix}backdrop-brightness`;

  const { backdropBrightness = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(backdropBrightness, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
        ${prefix}${key} {
          --tw-backdrop-brightness: brightness(${value});
          ${vars.backdropFilter}
        }
      `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
