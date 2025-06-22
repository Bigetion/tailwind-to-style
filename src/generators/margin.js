import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { margin = {} } = theme;

  Object.entries(margin).forEach(([key, value]) => {
    margin[`-${key}`] = `-${value}`.replace("--", "-");
  });

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(margin, (keyTmp, value) => {
      let prefix = `${globalPrefix}m`;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-m`;
      }
      return `
          ${prefix}-${key} {
            margin: ${value};
          }
          ${prefix}y-${key} {
            margin-top: ${value};
            margin-bottom: ${value};
          }
          ${prefix}x-${key} {
            margin-left: ${value};
            margin-right: ${value};
          }
          ${prefix}t-${key} {
            margin-top: ${value};
          }
          ${prefix}r-${key} {
            margin-right: ${value};
          }
          ${prefix}b-${key} {
            margin-bottom: ${value};
          }
          ${prefix}l-${key} {
            margin-left: ${value};
          }
          ${prefix}s-${key} {
            margin-inline-start: ${value};
          }
          ${prefix}e-${key} {
            margin-inline-end: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
