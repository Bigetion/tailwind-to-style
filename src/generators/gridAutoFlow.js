import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}grid-flow`;

  const propertyOptions = {
    row: "row",
    col: "column",
    "row-dense": "row dense",
    "col-dense": "column dense",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            grid-auto-flow: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
