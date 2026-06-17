import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = {
    italic: "italic",
    "not-italic": "normal",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}${key} {
            font-style: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
