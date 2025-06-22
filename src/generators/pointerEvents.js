import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix } = configOptions;

  const responsiveCssString = generateCssString(() => {
    return `
        ${prefix}pointer-events-none {
          pointer-events: none;
        }
        ${prefix}pointer-events-auto {
          pointer-events: auto;
        }
      `;
  }, configOptions);

  return responsiveCssString;
}
