import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { textIndent = {} } = theme;

  Object.entries(textIndent).forEach(([key, value]) => {
    textIndent[`-${key}`] = `-${value}`.replace("--", "-");
  });

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(textIndent, (keyTmp, value) => {
      let prefix = `${globalPrefix}indent`;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-indent`;
      }

      return `
          ${prefix}-${key} {
            text-indent: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
