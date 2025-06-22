import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}ring`;

  const { ringColor = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(ringColor, (keyTmp, value, rgbValue) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `--ring-color: rgba(${rgbValue}, var(--ring-opacity));`;
      }
      return `
            ${prefix}${key} {
              --ring-opacity: 1;
              --ring-color: ${value};
              ${rgbPropertyValue}
            }
          `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
