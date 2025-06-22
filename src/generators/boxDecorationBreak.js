import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}box-decoration`;

  const propertyOptions = ["slice", "clone"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            box-decoration-break: ${value};
            -webkit-box-decoration-break: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
