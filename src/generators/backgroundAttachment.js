import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}bg`;

  const propertyOptions = ["fixed", "local", "scroll"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            background-attachment: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
