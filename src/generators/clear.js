import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}clear`;

  const propertyOptions = ["left", "right", "both", "none"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            clear: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
