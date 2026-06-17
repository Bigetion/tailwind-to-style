import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { scrollMargin = {} } = theme;

  Object.entries(scrollMargin).forEach(([key, value]) => {
    scrollMargin[`-${key}`] = `-${value}`.replace("--", "-");
  });

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(scrollMargin, (keyTmp, value) => {
      let prefix = `${globalPrefix}scroll-m`;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-scroll-m`;
      }
      return `
          ${prefix}-${key} {
            scroll-margin: ${value};
          }
          ${prefix}y-${key} {
            scroll-margin-top: ${value};
            scroll-margin-bottom: ${value};
          }
          ${prefix}x-${key} {
            scroll-margin-left: ${value};
            scroll-margin-right: ${value};
          }
          ${prefix}t-${key} {
            scroll-margin-top: ${value};
          }
          ${prefix}r-${key} {
            scroll-margin-right: ${value};
          }
          ${prefix}b-${key} {
            scroll-margin-bottom: ${value};
          }
          ${prefix}l-${key} {
            scroll-margin-left: ${value};
          }
          ${prefix}s-${key} {
            scroll-margin-inline-start: ${value};
          }
          ${prefix}e-${key} {
            scroll-margin-inline-end: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
