import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}drop-shadow`;

  const { dropShadow = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(dropShadow, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      const values = value.split(",").map((o) => `drop-shadow(${o.trim()})`);
      return `
          ${prefix}${key} {
            --drop-shadow:  ${values.join(" ")} !important;
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
