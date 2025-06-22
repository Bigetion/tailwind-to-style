import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}outline`;

  const propertyOptions = ["none", "solid", "dashed", "dotted", "double"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(propertyOptions, (keyTmp, value) => {
      const key = keyTmp !== "solid" ? `-${keyTmp}` : "";
      if (key === "none") {
        return `
            ${prefix}-${key} {
              outline: 2px solid transparent;
              outline-offset: 2px;
            }
          `;
      }
      return `
          ${prefix}${key} {
            outline-style: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
