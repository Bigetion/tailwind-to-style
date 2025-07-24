import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}border`;
  const customPrefix = `${globalPrefix}border-width`;

  const { borderWidth = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(borderWidth, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";

      if (value === "custom_value") {
        return `
          ${customPrefix}-${key} {
            border-width: ${value};
          }
        `;
      }
      return `
        ${prefix}${key} {
          border-style: solid;
          border-top-width: ${value};
          border-bottom-width: ${value};
          border-left-width: ${value};
          border-right-width: ${value};
        }
        ${prefix}-x${key} {
          border-left-width: ${value};
          border-right-width: ${value};
        }
        ${prefix}-y${key} {
          border-top-width: ${value};
          border-bottom-width: ${value};
        }
        ${prefix}-s${key} {
          border-inline-start-width: ${value};
        }
        ${prefix}-e${key} {
          border-inline-end-width: ${value};
        }
        ${prefix}-t${key} {
          border-top-width: ${value};
        }
        ${prefix}-r${key} {
          border-right-width: ${value};
        }
        ${prefix}-b${key} {
          border-bottom-width: ${value};
        }
        ${prefix}-l${key} {
          border-left-width: ${value};
        }
      `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
