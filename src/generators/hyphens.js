import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator(
  "hyphens",
  "hyphens",
  ["none", "manual", "auto"],
  {
    customHandler: (selector, key, value, cssProperty) => `
          ${selector} {
            -webkit-hyphens: ${value};
            ${cssProperty}: ${value};
          }
        `,
  }
);
