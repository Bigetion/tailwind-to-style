import { generateCssString } from "../utils/index";

/**
 * Generates color-scheme-* utility classes (Tailwind v4)
 *
 * Controls the OS color scheme hint for form elements and browser UI.
 * Usage: color-scheme-normal, color-scheme-light, color-scheme-dark, color-scheme-light-dark
 */
export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;
  const p = `${globalPrefix}color-scheme`;

  return generateCssString(
    () => `
      .${p}-normal { color-scheme: normal; }
      .${p}-light { color-scheme: light; }
      .${p}-dark { color-scheme: dark; }
      .${p}-light-dark { color-scheme: light dark; }
    `,
    configOptions
  );
}
