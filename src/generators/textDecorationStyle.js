import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}decoration`;

  const propertyOptions = ["solid", "double", "dotted", "dashed", "wavy"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            text-decoration-style: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
