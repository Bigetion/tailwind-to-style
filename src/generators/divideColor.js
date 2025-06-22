import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}divide`;

  const { divideColor = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(divideColor, (key, value, rgbValue) => {
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `border-color: rgba(${rgbValue}, var(--divide-opacity));`;
      }
      return `
            ${prefix}-${key} {
              --divide-opacity: 1;
              border-color: ${value};${rgbPropertyValue}
            }
          `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
