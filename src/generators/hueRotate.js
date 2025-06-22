import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { hueRotate = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(hueRotate, (keyTmp, value) => {
      let prefix = `${globalPrefix}hue-rotate`;
      const basePrefix = prefix.replace(globalPrefix, "");
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-hue-rotate`;
      }
      return `
          ${prefix}-${key} {
            --hue-rotate: hue-rotate(${value}) !important;
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}-${key} {
            --backdrop-hue-rotate: hue-rotate(${value}) !important;
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
