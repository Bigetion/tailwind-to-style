import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}float`;

  const propertyOptions = ["left", "right", "none"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    let cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            float: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
