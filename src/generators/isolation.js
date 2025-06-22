import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}`;

  const propertyOptions = {
    isolate: "isolate",
    "isolation-auto": "no-repeat",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}${key} {
            isolation: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
