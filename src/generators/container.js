import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix } = configOptions;

  const responsiveCssString = generateCssString(() => {
    const cssString = `
      ${prefix}container {
        width: 100%;
      }
    `;
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
