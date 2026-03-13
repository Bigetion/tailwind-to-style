import { generateCssString } from "../utils/index";

/**
 * Generates inset-shadow-* utility classes (Tailwind v4)
 *
 * Maps insetShadow theme tokens to box-shadow: inset ... declarations.
 * Usage: inset-shadow-sm, inset-shadow-md, inset-shadow-lg, inset-shadow-none
 */
export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;
  const prefix = `${globalPrefix}inset-shadow`;
  const { insetShadow = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByOptions }) => {
      return getCssByOptions(insetShadow, (key, value) => {
        if (value === "custom_value") return "";
        const className = key === "DEFAULT" ? prefix : `${prefix}-${key}`;
        return `
          .${className} {
            box-shadow: ${value};
          }
        `;
      });
    },
    configOptions
  );

  return responsiveCssString;
}
