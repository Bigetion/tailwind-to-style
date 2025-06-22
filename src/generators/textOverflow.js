import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = ["ellipsis", "clip"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}truncate {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          ${prefix}text-${key} {
            text-overflow: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
