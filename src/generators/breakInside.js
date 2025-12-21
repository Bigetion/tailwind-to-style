import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = ["auto", "avoid", "avoid-page", "avoid-column"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
        ${prefix}break-inside-${key} {
          break-inside: ${value};
        }
      `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
