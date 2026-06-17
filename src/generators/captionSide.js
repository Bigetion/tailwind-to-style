import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}caption`;

  const propertyOptions = ["top", "bottom"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            caption-side: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
