import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}hyphens`;

  const propertyOptions = ["none", "manual", "auto"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            -webkit-hyphens: ${value};
            hyphens: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
