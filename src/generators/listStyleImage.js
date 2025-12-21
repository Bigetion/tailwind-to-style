import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix } = configOptions;

  const responsiveCssString = generateCssString(() => {
    const cssString = `
      ${prefix}list-image-none {
        list-style-image: none;
      }
    `;
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
