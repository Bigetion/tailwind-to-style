import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}border`;

  const propertyOptions = ["collapse", "separate"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            border-collapse: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
