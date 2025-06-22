import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}box`;

  const propertyOptions = {
    border: "border-box",
    content: "content-box",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            box-sizing: ${value};
          }
        `
    );
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
