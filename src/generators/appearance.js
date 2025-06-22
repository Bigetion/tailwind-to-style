import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = ["auto", "none"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}appearance-${key} {
            appearance: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
