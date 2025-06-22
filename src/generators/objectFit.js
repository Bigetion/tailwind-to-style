import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}object`;

  const propertyOptions = ["contain", "cover", "fill", "none", "scale-down"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            object-fit: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
