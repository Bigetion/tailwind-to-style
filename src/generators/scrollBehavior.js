import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = ["auto", "smooth"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}scroll-${key} {
            scroll-behavior: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
