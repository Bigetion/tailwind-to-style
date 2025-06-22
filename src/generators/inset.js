import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { inset = {} } = theme;

  Object.entries(inset).forEach(([key, value]) => {
    inset[`-${key}`] = `-${value}`.replace("--", "-");
  });

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(inset, (keyTmp, value) => {
      let prefix = globalPrefix;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix += "-";
      }
      return `
          ${prefix}inset-${key} {
            right: ${value};
            left: ${value};
            top: ${value};
            bottom: ${value};
          }
          ${prefix}inset-x-${key} {
            right: ${value};
            left: ${value};
          }
          ${prefix}inset-y-${key} {
            top: ${value};
            bottom: ${value};
          }
          ${prefix}right-${key} {
            right: ${value};
          }
          ${prefix}left-${key} {
            left: ${value};
          }
          ${prefix}top-${key} {
            top: ${value};
          }
          ${prefix}bottom-${key} {
            bottom: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
