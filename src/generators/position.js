import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = ["static", "fixed", "absolute", "relative", "sticky"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}${key} {
            position: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
