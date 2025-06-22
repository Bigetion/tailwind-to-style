import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}snap`;

  const propertyOptions = {
    start: "start",
    end: "end",
    center: "center",
    "align-none": "none",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            scroll-snap-align: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
