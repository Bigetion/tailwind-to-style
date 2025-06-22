import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}snap`;

  const propertyOptions = ["normal", "always"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            scroll-snap-stop: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
