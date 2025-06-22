import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}table`;

  const propertyOptions = ["auto", "fixed"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            table-layout: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
