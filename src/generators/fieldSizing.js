import { generateCssString } from "../utils/index";

/**
 * Generates field-sizing-* utility classes (Tailwind v4)
 *
 * Controls whether form elements size to their content or use fixed sizing.
 * Usage: field-sizing-fixed, field-sizing-content
 */
export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;
  const p = `${globalPrefix}field-sizing`;

  return generateCssString(
    () => `
      .${p}-fixed { field-sizing: fixed; }
      .${p}-content { field-sizing: content; }
    `,
    configOptions
  );
}
