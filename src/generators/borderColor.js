import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}border`;
  const customPrefix = `${globalPrefix}border-color`;

  const { borderColor = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(borderColor, (keyTmp, value, rgbValue) => {
      if (keyTmp.toLowerCase() === "default") {
        return "";
      }
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `border-color: rgba(${rgbValue}, var(--border-opacity));`;
      }
      if (value === "custom_value") {
        return `
          ${customPrefix}${key} {
            border-color: ${value};
          }
          ${prefix}${key} {
            border-color: ${value};
          }
        `;
      }
      return `
        ${prefix}${key} {
          --border-opacity: 1;
          border-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-x${key} {
          --border-opacity: 1;
          border-left-color: ${value};
          ${rgbPropertyValue}
          border-right-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-y${key} {
          --border-opacity: 1;
          border-top-color: ${value};
          ${rgbPropertyValue}
          border-bottom-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-s${key} {
          --border-opacity: 1;
          border-inline-start-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-e${key} {
          --border-opacity: 1;
          border-inline-end-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-t${key} {
          --border-opacity: 1;
          border-top-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-r${key} {
          --border-opacity: 1;
          border-right-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-b${key} {
          --border-opacity: 1;
          border-bottom-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-l${key} {
          --border-opacity: 1;
          border-left-color: ${value};
          ${rgbPropertyValue}
        }
      `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
