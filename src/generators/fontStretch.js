import { generateCssString } from "../utils/index";

/**
 * Generates font-stretch-* utility classes (Tailwind v4)
 *
 * Maps fontStretch theme tokens to font-stretch declarations.
 * Usage: font-stretch-condensed, font-stretch-expanded, font-stretch-normal, etc.
 */
export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;
  const prefix = `${globalPrefix}font-stretch`;
  const { fontStretch = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByOptions }) => {
      return getCssByOptions(fontStretch, (key, value) => {
        if (value === "custom_value") return "";
        return `
          .${prefix}-${key} {
            font-stretch: ${value};
          }
        `;
      });
    },
    configOptions
  );

  return responsiveCssString;
}
