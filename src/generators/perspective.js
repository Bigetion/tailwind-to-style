import { generateCssString } from "../utils/index";

/**
 * Generates perspective-* utility classes (Tailwind v4)
 *
 * Maps perspective theme tokens to CSS perspective declarations for 3D transforms.
 * Usage: perspective-none, perspective-dramatic, perspective-near, perspective-normal,
 *        perspective-midrange, perspective-distant
 */
export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;
  const prefix = `${globalPrefix}perspective`;
  const { perspective = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByOptions }) => {
      return getCssByOptions(perspective, (key, value) => {
        if (value === "custom_value") return "";
        return `
          .${prefix}-${key} {
            perspective: ${value};
          }
        `;
      });
    },
    configOptions
  );

  return responsiveCssString;
}
