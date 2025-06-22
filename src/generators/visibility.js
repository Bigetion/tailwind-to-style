import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = {
    visible: "visible",
    collapse: "collapse",
    invisible: "hidden",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}${key} {
            visibility: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
