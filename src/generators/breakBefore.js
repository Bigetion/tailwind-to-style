import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = [
    "auto",
    "avoid",
    "all",
    "avoid-page",
    "page",
    "left",
    "right",
    "column",
  ];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
        ${prefix}break-before-${key} {
          break-before: ${value};
        }
      `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
