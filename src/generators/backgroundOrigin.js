import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}bg-origin`;

  const propertyOptions = {
    border: "border-box",
    padding: "padding-box",
    content: "content-box",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            -webkit-background-origin: ${value};
            background-origin: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
