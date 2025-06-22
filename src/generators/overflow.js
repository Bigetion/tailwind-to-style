import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}overflow`;

  const propertyOptions = ["auto", "hidden", "visible", "scroll"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    let cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            overflow: ${value};
          }
          ${prefix}-x-${key} {
            overflow-x: ${value};
          }
          ${prefix}-y-${key} {
            overflow-y: ${value};
          }
        `
    );
    cssString += `
        ${globalPrefix}scrolling-touch {
          -webkit-overflow-scrolling: touch;
        }
        ${globalPrefix}scrolling-auto {
          -webkit-overflow-scrolling: auto;
        }
      `;
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
