import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}list`;

  const propertyOptions = ["inside", "outside"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            list-style-position: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
