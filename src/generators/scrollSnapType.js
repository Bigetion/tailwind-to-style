import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}snap`;

  const propertyOptions = {
    none: "none",
    x: "x var(--scroll-snap-strictness)",
    y: "y var(--scroll-snap-strictness)",
    both: "both var(--scroll-snap-strictness)",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    let cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            --scroll-snap-strictness: proximity;
            scroll-snap-type: ${value};
          }
        `
    );
    cssString += getCssByOptions(
      ["mandatory", "proximity"],
      (key, value) => `
          ${prefix}-${key} {
            --scroll-snap-strictness: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
