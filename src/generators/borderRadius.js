import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}rounded`;

  const { borderRadius = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(borderRadius, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            border-radius: ${value};
          }
          ${prefix}-s${key} {
            border-start-start-radius: ${value};
            border-end-start-radius: ${value};
          }
          ${prefix}-e${key} {
            border-start-end-radius: ${value};
            border-end-end-radius: ${value};
          }
          ${prefix}-t${key} {
            border-top-left-radius: ${value};
            border-top-right-radius: ${value};
          }
          ${prefix}-r${key} {
            border-top-right-radius: ${value};
            border-bottom-right-radius: ${value};
          }
          ${prefix}-b${key} {
            border-bottom-right-radius: ${value};
            border-bottom-left-radius: ${value};
          }
          ${prefix}-l${key} {
            border-top-left-radius: ${value};
            border-bottom-left-radius: ${value};
          }
          ${prefix}-ss${key} {
            border-start-start-radius: ${value};
          }
          ${prefix}-se${key} {
            border-start-end-radius: ${value};
          }
          ${prefix}-ee${key} {
            border-end-end-radius: ${value};
          }
          ${prefix}-es${key} {
            border-end-start-radius: ${value};
          }
          ${prefix}-tl${key} {
            border-top-left-radius: ${value};
          }
          ${prefix}-tr${key} {
            border-top-right-radius: ${value};
          }
          ${prefix}-br${key} {
            border-bottom-right-radius: ${value};
          }
          ${prefix}-bl${key} {
            border-bottom-left-radius: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
