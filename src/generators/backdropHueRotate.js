import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {}, vars = {} } = configOptions;

  const prefix = `${globalPrefix}backdrop-hue-rotate`;

  const { backdropHueRotate = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(backdropHueRotate, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
        ${prefix}${key} {
          --tw-backdrop-hue-rotate: hue-rotate(${value});
          ${vars.backdropFilter}
        }
      `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
