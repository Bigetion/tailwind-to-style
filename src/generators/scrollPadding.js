import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { scrollPadding = {} } = theme;

  Object.entries(scrollPadding).forEach(([key, value]) => {
    scrollPadding[`-${key}`] = `-${value}`.replace("--", "-");
  });

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(scrollPadding, (keyTmp, value) => {
      let prefix = `${globalPrefix}scroll-p`;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-p`;
      }
      return `
          ${prefix}-${key} {
            scroll-padding: ${value};
          }
          ${prefix}y-${key} {
            scroll-padding-top: ${value};
            scroll-padding-bottom: ${value};
          }
          ${prefix}x-${key} {
            scroll-padding-left: ${value};
            scroll-padding-right: ${value};
          }
          ${prefix}t-${key} {
            scroll-padding-top: ${value};
          }
          ${prefix}r-${key} {
            scroll-padding-right: ${value};
          }
          ${prefix}b-${key} {
            scroll-padding-bottom: ${value};
          }
          ${prefix}l-${key} {
            scroll-padding-left: ${value};
          }
          ${prefix}s-${key} {
            scroll-padding-inline-start: ${value};
          }
          ${prefix}e-${key} {
            scroll-padding-inline-end: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
