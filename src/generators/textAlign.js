import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}text`;

  const propertyOptions = ["left", "center", "right", "justify"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            text-align: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
