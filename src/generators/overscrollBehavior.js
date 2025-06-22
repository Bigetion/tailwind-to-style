import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}overscroll`;

  const propertyOptions = ["auto", "contain", "none"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            overscroll-behavior: ${value};
          }
          ${prefix}-x-${key} {
            overscroll-behavior-x: ${value};
          }
          ${prefix}-y-${key} {
            overscroll-behavior-y: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
