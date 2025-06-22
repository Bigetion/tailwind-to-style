import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = ["wrap", "nowrap", "balance", "pretty"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}text-${key} {
            text-wrap: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
