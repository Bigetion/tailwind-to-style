import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {}, vars = {} } = configOptions;

  const prefix = `${globalPrefix}backdrop-saturate`;

  const { backdropSaturate = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(backdropSaturate, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
        ${prefix}${key} {
          --tw-backdrop-saturate: saturate(${value});
          ${vars.backdropFilter}
        }
      `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
