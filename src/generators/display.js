import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator(
  "",
  "display",
  [
    "block",
    "inline-block",
    "inline",
    "flex",
    "inline-flex",
    "table",
    "table-caption",
    "table-cell",
    "table-column",
    "table-column-group",
    "table-header-group",
    "table-footer-group",
    "table-row-group",
    "table-row",
    "flow-root",
    "grid",
    "inline-grid",
    "contents",
    "none",
  ],
  {
    customHandler: (selector, key, value, cssProperty) => {
      const className =
        key === "none" ? selector.replace("none", "hidden") : selector;
      return `
          ${className} {
            ${cssProperty}: ${value};
          }
        `;
    },
  }
);
